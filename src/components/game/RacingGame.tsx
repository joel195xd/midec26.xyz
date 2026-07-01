'use client';

import React, { useEffect, useRef, useState } from 'react';

// ============================================================
// MarkKart - Pseudo-3D Racing Game (OutRun style)
// ============================================================

const WIDTH = 1024;
const HEIGHT = 768;
const LANES = 3;
const SEGMENT_LENGTH = 200;
const RUMBLE_LENGTH = 3;
const TOTAL_SEGMENTS = 500;
const DRAW_DISTANCE = 150;
const ROAD_WIDTH = 2000;
const FOV = 100; // degrees
const CAM_HEIGHT = 1000;
const CAM_DEPTH = 1 / Math.tan(((FOV / 2) * Math.PI) / 180);

const MAX_SPEED = SEGMENT_LENGTH * 60; // 60 segments per second at max
const ACCEL = MAX_SPEED / 5;
const BRAKE = -MAX_SPEED;
const DECEL = -MAX_SPEED / 5;
const OFFROAD_DECEL = -MAX_SPEED / 2;
const OFFROAD_LIMIT = MAX_SPEED / 4;
const CENTRIFUGAL = 0.3;

// ── Neon Colors ──
const COL = {
  LIGHT: { road: '#27272a', grass: '#18181b', rumble: '#06b6d4', lane: '#52525b' },
  DARK:  { road: '#1c1c20', grass: '#111114', rumble: '#ec4899', lane: '' },
};

// ── Types ──
interface ScreenCoord { x: number; y: number; w: number }
interface Seg {
  index: number;
  p1: { world: { z: number }; screen: ScreenCoord; scale: number };
  p2: { world: { z: number }; screen: ScreenCoord; scale: number };
  curve: number;
  color: typeof COL.LIGHT;
  sprites: SpriteObj[];
}
interface SpriteObj {
  offset: number; // -1 to 1 across road
  type: 'coin' | 'obstacle' | 'boost';
  hit: boolean;
}

// ── Helper: project a world-z to screen coords ──
function projectToScreen(
  worldZ: number, camZ: number, playerX: number, xOffset: number,
  out: ScreenCoord, outScale: { scale: number }
) {
  const dz = worldZ - camZ;
  if (dz <= 0) { outScale.scale = 0; return; }
  const scale = CAM_DEPTH / dz;
  outScale.scale = scale;
  out.x = Math.round(WIDTH / 2 + scale * ((-playerX * ROAD_WIDTH) + xOffset) * WIDTH / 2);
  out.y = Math.round(HEIGHT / 2 + scale * CAM_HEIGHT * HEIGHT / 2);
  out.w = Math.round(scale * ROAD_WIDTH * WIDTH / 2);
}

// ── Helper: draw a colored trapezoid ──
function trapezoid(
  ctx: CanvasRenderingContext2D,
  x1: number, y1: number, w1: number,
  x2: number, y2: number, w2: number,
  color: string
) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(x1 - w1, y1);
  ctx.lineTo(x1 + w1, y1);
  ctx.lineTo(x2 + w2, y2);
  ctx.lineTo(x2 - w2, y2);
  ctx.closePath();
  ctx.fill();
}

// ══════════════════════════════════════════════════════════════
// Component
// ══════════════════════════════════════════════════════════════
export default function RacingGame() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const speedRef = useRef<HTMLDivElement>(null);
  const scoreRef = useRef<HTMLDivElement>(null);

  const [screen, setScreen] = useState<'menu' | 'play' | 'over'>('menu');
  const [endScore, setEndScore] = useState(0);

  // Mutable game state (never triggers re-renders)
  const G = useRef({
    segments: [] as Seg[],
    trackLen: 0,
    pos: 0,
    speed: 0,
    playerX: 0,
    score: 0,
    running: false,
    rafId: 0,
    prevTs: 0,
    keys: { up: false, down: false, left: false, right: false },
    touch: { up: false, down: false, left: false, right: false },
  });

  // ── Build track ──
  function buildTrack() {
    const segs: Seg[] = [];
    for (let i = 0; i < TOTAL_SEGMENTS; i++) {
      let curve = 0;
      if      (i >  30 && i < 100) curve =  2;
      else if (i > 130 && i < 200) curve = -3;
      else if (i > 250 && i < 320) curve =  4;
      else if (i > 350 && i < 420) curve = -2;

      const sprites: SpriteObj[] = [];
      if (i > 20 && i % 15 === 0) {
        const r = Math.random();
        const type: SpriteObj['type'] = r < 0.35 ? 'coin' : r < 0.55 ? 'boost' : 'obstacle';
        sprites.push({ offset: (Math.random() * 1.6) - 0.8, type, hit: false });
      }

      const isDark = Math.floor(i / RUMBLE_LENGTH) % 2 === 0;
      segs.push({
        index: i,
        p1: { world: { z: i * SEGMENT_LENGTH }, screen: { x: 0, y: 0, w: 0 }, scale: 0 },
        p2: { world: { z: (i + 1) * SEGMENT_LENGTH }, screen: { x: 0, y: 0, w: 0 }, scale: 0 },
        curve,
        color: isDark ? COL.DARK : COL.LIGHT,
        sprites,
      });
    }
    G.current.segments = segs;
    G.current.trackLen = TOTAL_SEGMENTS * SEGMENT_LENGTH;
  }

  // ── Physics update ──
  function update(dt: number) {
    const g = G.current;
    const up    = g.keys.up    || g.touch.up;
    const down  = g.keys.down  || g.touch.down;
    const left  = g.keys.left  || g.touch.left;
    const right = g.keys.right || g.touch.right;

    // Find the segment we're on
    const segIdx = Math.floor(g.pos / SEGMENT_LENGTH) % TOTAL_SEGMENTS;
    const seg = g.segments[segIdx];

    // Speed
    if (up)        g.speed += ACCEL * dt;
    else if (down) g.speed += BRAKE * dt;
    else           g.speed += DECEL * dt;

    // Offroad slowdown
    if (Math.abs(g.playerX) > 1 && g.speed > OFFROAD_LIMIT) {
      g.speed += OFFROAD_DECEL * dt;
    }
    g.speed = Math.max(0, Math.min(MAX_SPEED, g.speed));

    // Advance position
    g.pos += g.speed * dt;
    while (g.pos >= g.trackLen) g.pos -= g.trackLen;
    while (g.pos < 0) g.pos += g.trackLen;

    // Steering
    const pct = g.speed / MAX_SPEED;
    if (left)  g.playerX -= 2 * dt * pct;
    if (right) g.playerX += 2 * dt * pct;

    // Centrifugal force
    g.playerX -= seg.curve * CENTRIFUGAL * pct * pct * dt;

    // Clamp
    g.playerX = Math.max(-2.5, Math.min(2.5, g.playerX));

    // Collision with sprites
    for (const sp of seg.sprites) {
      if (sp.hit) continue;
      if (Math.abs(g.playerX - sp.offset) < 0.4) {
        sp.hit = true;
        if (sp.type === 'coin')     g.score += 500;
        if (sp.type === 'boost')    g.speed = Math.min(MAX_SPEED * 1.5, g.speed + MAX_SPEED * 0.4);
        if (sp.type === 'obstacle') { g.speed *= 0.25; g.score = Math.max(0, g.score - 300); }
      }
    }

    // Scoring
    g.score += Math.round(g.speed * dt * 0.05);

    // Update DOM HUD directly
    if (speedRef.current) speedRef.current.textContent = `${Math.round(g.speed / 100)} KM/H`;
    if (scoreRef.current) scoreRef.current.textContent = `${g.score.toLocaleString()}`;
  }

  // ── Render ──
  function render() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const g = G.current;

    // Sky
    ctx.fillStyle = '#0a0a0f';
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    // Stars
    ctx.fillStyle = 'rgba(255,255,255,0.4)';
    for (let i = 0; i < 60; i++) {
      const sx = ((i * 137 + 53) % WIDTH);
      const sy = ((i * 97 + 31) % (HEIGHT / 3));
      ctx.fillRect(sx, sy, 1.5, 1.5);
    }

    const baseIdx = Math.floor(g.pos / SEGMENT_LENGTH) % TOTAL_SEGMENTS;
    const baseOff = (g.pos % SEGMENT_LENGTH) / SEGMENT_LENGTH;
    const camZ = g.pos;

    // Collect visible segments
    let minY = HEIGHT / 2; // horizon (nothing above this matters initially)
    let cumulX = 0;
    let curveAcc = 0;

    // We need to do two passes: first project, then draw back-to-front
    const visible: { seg: Seg; xOff: number }[] = [];

    for (let n = 1; n < DRAW_DISTANCE; n++) {
      const idx = (baseIdx + n) % TOTAL_SEGMENTS;
      const seg = g.segments[idx];
      const looped = idx < baseIdx;

      const worldZ1 = seg.p1.world.z + (looped ? g.trackLen : 0);
      const worldZ2 = seg.p2.world.z + (looped ? g.trackLen : 0);

      projectToScreen(worldZ1, camZ, g.playerX, cumulX, seg.p1.screen, seg.p1);
      projectToScreen(worldZ2, camZ, g.playerX, cumulX + curveAcc, seg.p2.screen, seg.p2);

      curveAcc += seg.curve;
      cumulX += curveAcc;

      if (seg.p1.scale <= 0) continue; // behind camera
      // With corrected projection: far segments have y near HEIGHT/2, near ones have y >> HEIGHT/2
      // p2 is the far end (smaller y), p1 is the near end (larger y)
      // Skip if far end is below the last drawn far-end (occluded by nearer hill)
      if (seg.p2.screen.y <= minY) continue;

      visible.push({ seg, xOff: cumulX });
      minY = seg.p2.screen.y;
    }

    // Draw back-to-front
    for (let i = visible.length - 1; i >= 0; i--) {
      const { seg } = visible[i];
      const p1 = seg.p1.screen;
      const p2 = seg.p2.screen;
      const c = seg.color;

      // Grass
      ctx.fillStyle = c.grass;
      ctx.fillRect(0, p2.y, WIDTH, p1.y - p2.y);

      // Road
      trapezoid(ctx, p1.x, p1.y, p1.w, p2.x, p2.y, p2.w, c.road);

      // Rumble strips
      const rw1 = p1.w / 5, rw2 = p2.w / 5;
      trapezoid(ctx, p1.x - p1.w - rw1, p1.y, rw1, p2.x - p2.w - rw2, p2.y, rw2, c.rumble);
      trapezoid(ctx, p1.x + p1.w + rw1, p1.y, rw1, p2.x + p2.w + rw2, p2.y, rw2, c.rumble);

      // Lane markers
      if (c.lane) {
        const lw1 = p1.w / 20, lw2 = p2.w / 20;
        for (let lane = 1; lane < LANES; lane++) {
          const t = lane / LANES;
          const lx1 = p1.x + p1.w * (2 * t - 1);
          const lx2 = p2.x + p2.w * (2 * t - 1);
          trapezoid(ctx, lx1, p1.y, lw1, lx2, p2.y, lw2, c.lane);
        }
      }

      // Sprites on this segment
      for (const sp of seg.sprites) {
        if (sp.hit) continue;
        const scale = seg.p1.scale;
        if (scale <= 0) continue;
        const sprX = p1.x + (sp.offset * p1.w);
        const sprY = p1.y;
        const sz = 600 * scale;
        if (sz < 2) continue;

        if (sp.type === 'coin') {
          // Golden coin
          const bob = Math.sin(Date.now() / 250 + seg.index) * sz * 0.15;
          ctx.fillStyle = '#eab308';
          ctx.beginPath();
          ctx.arc(sprX, sprY - sz + bob, sz * 0.5, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = '#fde047';
          ctx.beginPath();
          ctx.arc(sprX, sprY - sz + bob, sz * 0.3, 0, Math.PI * 2);
          ctx.fill();
          // $ sign
          ctx.fillStyle = '#92400e';
          ctx.font = `bold ${Math.round(sz * 0.5)}px monospace`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText('$', sprX, sprY - sz + bob);
        } else if (sp.type === 'obstacle') {
          // Red crate
          ctx.fillStyle = '#dc2626';
          ctx.fillRect(sprX - sz * 0.5, sprY - sz, sz, sz);
          ctx.strokeStyle = '#fca5a5';
          ctx.lineWidth = Math.max(1, sz * 0.08);
          ctx.strokeRect(sprX - sz * 0.5, sprY - sz, sz, sz);
          // X mark
          ctx.strokeStyle = '#fff';
          ctx.lineWidth = Math.max(1, sz * 0.1);
          ctx.beginPath();
          ctx.moveTo(sprX - sz * 0.3, sprY - sz * 0.8);
          ctx.lineTo(sprX + sz * 0.3, sprY - sz * 0.2);
          ctx.moveTo(sprX + sz * 0.3, sprY - sz * 0.8);
          ctx.lineTo(sprX - sz * 0.3, sprY - sz * 0.2);
          ctx.stroke();
        } else if (sp.type === 'boost') {
          // Cyan arrow
          ctx.fillStyle = '#06b6d4';
          ctx.beginPath();
          ctx.moveTo(sprX, sprY - sz * 1.2);
          ctx.lineTo(sprX - sz * 0.5, sprY);
          ctx.lineTo(sprX - sz * 0.15, sprY);
          ctx.lineTo(sprX - sz * 0.15, sprY - sz * 0.3);
          ctx.lineTo(sprX + sz * 0.15, sprY - sz * 0.3);
          ctx.lineTo(sprX + sz * 0.15, sprY);
          ctx.lineTo(sprX + sz * 0.5, sprY);
          ctx.closePath();
          ctx.fill();
        }
      }
    }

    // ── Draw Kart ──
    const kartY = HEIGHT - 60;
    const kartX = WIDTH / 2;
    const s = 1; // kart scale factor
    const bounce = g.speed > 0 ? (Math.random() - 0.5) * 3 * (g.speed / MAX_SPEED) : 0;
    const steer = (g.keys.left || g.touch.left ? -1 : g.keys.right || g.touch.right ? 1 : 0);
    const tilt = steer * 8 * (g.speed / MAX_SPEED);

    const kx = kartX + tilt;
    const ky = kartY + bounce;

    // Shadow
    ctx.fillStyle = 'rgba(0,0,0,0.5)';
    ctx.beginPath();
    ctx.ellipse(kx, ky + 10 * s, 60 * s, 12 * s, 0, 0, Math.PI * 2);
    ctx.fill();

    // Back wheels
    ctx.fillStyle = '#222';
    ctx.fillRect(kx - 55 * s, ky - 20 * s, 20 * s, 35 * s);
    ctx.fillRect(kx + 35 * s, ky - 20 * s, 20 * s, 35 * s);

    // Kart body
    ctx.fillStyle = '#ef4444';
    ctx.beginPath();
    ctx.moveTo(kx - 45 * s, ky + 5 * s);
    ctx.lineTo(kx - 50 * s, ky - 30 * s);
    ctx.lineTo(kx - 30 * s, ky - 55 * s);
    ctx.lineTo(kx + 30 * s, ky - 55 * s);
    ctx.lineTo(kx + 50 * s, ky - 30 * s);
    ctx.lineTo(kx + 45 * s, ky + 5 * s);
    ctx.closePath();
    ctx.fill();

    // Windshield
    ctx.fillStyle = '#06b6d4';
    ctx.beginPath();
    ctx.moveTo(kx - 25 * s, ky - 30 * s);
    ctx.lineTo(kx - 20 * s, ky - 50 * s);
    ctx.lineTo(kx + 20 * s, ky - 50 * s);
    ctx.lineTo(kx + 25 * s, ky - 30 * s);
    ctx.closePath();
    ctx.fill();

    // Helmet (driver)
    ctx.fillStyle = '#18181b';
    ctx.beginPath();
    ctx.arc(kx, ky - 65 * s, 18 * s, 0, Math.PI * 2);
    ctx.fill();
    // Visor
    ctx.fillStyle = '#06b6d4';
    ctx.fillRect(kx - 12 * s, ky - 70 * s, 24 * s, 8 * s);

    // Engine glow (proportional to speed)
    if (g.speed > 100) {
      const alpha = Math.min(1, g.speed / MAX_SPEED);
      const flameLen = 10 + 30 * alpha + Math.random() * 15;
      const grad = ctx.createLinearGradient(kx, ky, kx, ky + flameLen);
      grad.addColorStop(0, `rgba(6,182,212,${alpha})`);
      grad.addColorStop(0.4, `rgba(236,72,153,${alpha * 0.6})`);
      grad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.moveTo(kx - 15 * s, ky + 5 * s);
      ctx.lineTo(kx + 15 * s, ky + 5 * s);
      ctx.lineTo(kx + 5, ky + flameLen);
      ctx.lineTo(kx - 5, ky + flameLen);
      ctx.closePath();
      ctx.fill();
    }

    // Taillights
    ctx.fillStyle = '#ef4444';
    ctx.shadowColor = '#ef4444';
    ctx.shadowBlur = 10;
    ctx.fillRect(kx - 42 * s, ky - 5 * s, 12 * s, 6 * s);
    ctx.fillRect(kx + 30 * s, ky - 5 * s, 12 * s, 6 * s);
    ctx.shadowBlur = 0;
  }

  // ── Game Loop (runs outside React) ──
  function tick(ts: number) {
    const g = G.current;
    if (!g.running) return;

    if (!g.prevTs) g.prevTs = ts;
    let dt = (ts - g.prevTs) / 1000;
    g.prevTs = ts;
    if (dt > 0.1) dt = 0.1; // cap for tab switches
    if (dt <= 0) dt = 1 / 60;

    update(dt);
    render();

    g.rafId = requestAnimationFrame(tick);
  }

  // ── Build road on mount ──
  useEffect(() => {
    buildTrack();
    render(); // static preview
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Auto-scroll on mount ──
  useEffect(() => {
    const el = containerRef.current;
    if (el) {
      const t = setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'center' }), 400);
      return () => clearTimeout(t);
    }
  }, []);

  // ── Keyboard controls ──
  useEffect(() => {
    function onDown(e: KeyboardEvent) {
      const g = G.current;
      switch (e.code) {
        case 'ArrowUp':    case 'KeyW': g.keys.up    = true; break;
        case 'ArrowDown':  case 'KeyS': g.keys.down  = true; break;
        case 'ArrowLeft':  case 'KeyA': g.keys.left  = true; break;
        case 'ArrowRight': case 'KeyD': g.keys.right = true; break;
        default: return;
      }
      if (g.running) e.preventDefault();
    }
    function onUp(e: KeyboardEvent) {
      const g = G.current;
      switch (e.code) {
        case 'ArrowUp':    case 'KeyW': g.keys.up    = false; break;
        case 'ArrowDown':  case 'KeyS': g.keys.down  = false; break;
        case 'ArrowLeft':  case 'KeyA': g.keys.left  = false; break;
        case 'ArrowRight': case 'KeyD': g.keys.right = false; break;
        default: return;
      }
      if (g.running) e.preventDefault();
    }
    window.addEventListener('keydown', onDown, { passive: false });
    window.addEventListener('keyup', onUp, { passive: false });
    return () => {
      window.removeEventListener('keydown', onDown);
      window.removeEventListener('keyup', onUp);
    };
  }, []);

  // ── Start / Restart ──
  function startGame() {
    const g = G.current;
    buildTrack();
    g.pos = 0;
    g.speed = 0;
    g.playerX = 0;
    g.score = 0;
    g.prevTs = 0;
    g.running = true;
    setScreen('play');
    g.rafId = requestAnimationFrame(tick);
  }

  // ── Cleanup on unmount ──
  useEffect(() => {
    return () => { G.current.running = false; cancelAnimationFrame(G.current.rafId); };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Touch helpers ──
  const tp = (key: 'up' | 'down' | 'left' | 'right', val: boolean) => () => { G.current.touch[key] = val; };

  return (
    <div ref={containerRef} className="relative w-full aspect-[4/3] bg-zinc-950 select-none overflow-hidden touch-none group rounded-2xl">
      <canvas
        ref={canvasRef}
        width={WIDTH}
        height={HEIGHT}
        className="w-full h-full block"
      />

      {/* ── HUD (only during play) ── */}
      {screen === 'play' && (
        <div className="absolute top-0 inset-x-0 p-4 md:p-6 flex justify-between items-start pointer-events-none">
          <div ref={speedRef} className="font-mono text-xl md:text-3xl font-bold text-white drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]">
            0 KM/H
          </div>
          <div className="text-right">
            <div className="font-mono text-xs text-zinc-400 tracking-widest">SCORE</div>
            <div ref={scoreRef} className="font-mono text-xl md:text-3xl font-bold text-white drop-shadow-[0_0_8px_rgba(236,72,153,0.8)]">
              0
            </div>
          </div>
        </div>
      )}

      {/* ── Menu / Game Over Overlay ── */}
      {screen !== 'play' && (
        <div className="absolute inset-0 bg-black/70 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center z-10">
          <div className="bg-zinc-900/80 border border-white/10 p-8 md:p-14 rounded-3xl shadow-2xl flex flex-col items-center max-w-md w-full">
            <h2 className="text-5xl md:text-7xl font-black italic uppercase text-transparent bg-clip-text bg-gradient-to-br from-cyan-400 via-red-500 to-purple-600 mb-4 leading-tight">
              MarkKart
            </h2>

            {screen === 'over' && (
              <div className="mb-6 text-center">
                <p className="text-zinc-400 text-sm uppercase tracking-widest mb-1">Puntuación Final</p>
                <p className="text-4xl font-black text-white">{endScore.toLocaleString()}</p>
              </div>
            )}

            <p className="text-zinc-400 mb-8 max-w-xs text-sm leading-relaxed">
              {screen === 'menu'
                ? 'Usa las flechas (↑↓←→) o WASD para conducir. Pilla monedas y turbos. ¡Esquiva los bloques rojos!'
                : '¿Quieres intentarlo de nuevo?'}
            </p>

            <button
              onClick={startGame}
              className="px-10 py-4 bg-white text-black font-black text-xl rounded-full hover:scale-105 transition-transform active:scale-95 shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_rgba(6,182,212,0.4)]"
            >
              {screen === 'over' ? 'REINTENTAR' : 'INICIAR CARRERA'}
            </button>
          </div>
        </div>
      )}

      {/* ── Mobile Touch Controls ── */}
      {screen === 'play' && (
        <div className="absolute bottom-4 inset-x-0 flex justify-between px-4 md:hidden">
          <div className="flex gap-3">
            <button className="w-14 h-14 bg-white/10 backdrop-blur rounded-full flex items-center justify-center border border-white/20 active:bg-white/30"
              onPointerDown={tp('left', true)} onPointerUp={tp('left', false)} onPointerLeave={tp('left', false)}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><path d="M15 18l-6-6 6-6"/></svg>
            </button>
            <button className="w-14 h-14 bg-white/10 backdrop-blur rounded-full flex items-center justify-center border border-white/20 active:bg-white/30"
              onPointerDown={tp('right', true)} onPointerUp={tp('right', false)} onPointerLeave={tp('right', false)}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><path d="M9 18l6-6-6-6"/></svg>
            </button>
          </div>
          <div className="flex gap-3">
            <button className="w-14 h-14 bg-white/10 backdrop-blur rounded-full flex items-center justify-center border border-white/20 active:bg-white/30"
              onPointerDown={tp('down', true)} onPointerUp={tp('down', false)} onPointerLeave={tp('down', false)}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><path d="M6 9l6 6 6-6"/></svg>
            </button>
            <button className="w-14 h-14 bg-cyan-500/20 backdrop-blur rounded-full flex items-center justify-center border border-cyan-400/30 active:bg-cyan-500/50"
              onPointerDown={tp('up', true)} onPointerUp={tp('up', false)} onPointerLeave={tp('up', false)}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><path d="M18 15l-6-6-6 6"/></svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
