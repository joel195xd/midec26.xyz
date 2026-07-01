'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';

// --- Constantes del Juego ---
const FPS = 60;
const STEP = 1 / FPS;
const WIDTH = 1024;
const HEIGHT = 768;
const ROAD_WIDTH = 2000;
const SEGMENT_LENGTH = 200;
const RUMBLE_LENGTH = 3;
const TRACK_LENGTH = 1000; // Número de segmentos
const DRAW_DISTANCE = 300;
const FIELD_OF_VIEW = 100;
const CAMERA_HEIGHT = 1000;
const CAMERA_DEPTH = 1 / Math.tan(((FIELD_OF_VIEW / 2) * Math.PI) / 180);
const PLAYER_Z = CAMERA_HEIGHT * CAMERA_DEPTH;

const MAX_SPEED = SEGMENT_LENGTH / STEP;
const ACCEL = MAX_SPEED / 5;
const BREAKING = -MAX_SPEED;
const DECEL = -MAX_SPEED / 5;
const OFF_ROAD_DECEL = -MAX_SPEED / 2;
const OFF_ROAD_LIMIT = MAX_SPEED / 4;

// Colores Neon / Synthwave
const COLORS = {
  sky: '#09090b', // zinc-950
  tree: '#005108',
  fog: '#09090b',
  light: { road: '#27272a', grass: '#18181b', rumble: '#06b6d4', lane: '#71717a' },
  dark: { road: '#18181b', grass: '#09090b', rumble: '#ec4899', lane: '#27272a' },
  start: { road: '#ffffff', grass: '#ffffff', rumble: '#ffffff' },
  finish: { road: '#000000', grass: '#000000', rumble: '#000000' }
};

interface ColorPreset { road: string; grass: string; rumble: string; lane?: string; }
interface Point { x: number; y: number; z: number; camera: { x: number; y: number; z: number }; screen: { x: number; y: number; w: number; scale: number; }; }
interface Segment {
  index: number;
  p1: Point;
  p2: Point;
  curve: number;
  color: ColorPreset;
  looped?: boolean;
}

export default function RacingGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [speedUI, setSpeedUI] = useState(0);

  // Referencias para el estado mutable del juego sin provocar re-renders
  const state = useRef({
    segments: [] as Segment[],
    trackLength: 0,
    camera: { x: 0, y: CAMERA_HEIGHT, z: 0 },
    player: { x: 0, z: PLAYER_Z },
    position: 0,
    speed: 0,
    keys: { ArrowLeft: false, ArrowRight: false, ArrowUp: false, ArrowDown: false },
    touch: { left: false, right: false, up: false, down: false }
  });

  // --- Funciones de Renderizado (Helpers) ---
  const project = (p: Point, cameraX: number, cameraY: number, cameraZ: number, cameraDepth: number, width: number, height: number, roadWidth: number) => {
    p.camera = { x: (p.x || 0) - cameraX, y: (p.y || 0) - cameraY, z: (p.z || 0) - cameraZ };
    p.screen.scale = cameraDepth / p.camera.z;
    p.screen.x = Math.round((width / 2) + (p.screen.scale * p.camera.x * width / 2));
    p.screen.y = Math.round((height / 2) - (p.screen.scale * p.camera.y * height / 2));
    p.screen.w = Math.round((p.screen.scale * roadWidth * width / 2));
  };

  const drawPolygon = (ctx: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, x4: number, y4: number, color: string) => {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineTo(x3, y3);
    ctx.lineTo(x4, y4);
    ctx.closePath();
    ctx.fill();
  };

  const drawSegment = (ctx: CanvasRenderingContext2D, width: number, lanes: number, x1: number, y1: number, w1: number, x2: number, y2: number, w2: number, color: ColorPreset) => {
    const r1 = w1 / Math.max(6, 2 * lanes), r2 = w2 / Math.max(6, 2 * lanes),
          l1 = w1 / Math.max(32, 8 * lanes), l2 = w2 / Math.max(32, 8 * lanes);

    ctx.fillStyle = color.grass;
    ctx.fillRect(0, y2, width, y1 - y2);

    drawPolygon(ctx, x1 - w1 - r1, y1, x1 - w1, y1, x2 - w2, y2, x2 - w2 - r2, y2, color.rumble);
    drawPolygon(ctx, x1 + w1 + r1, y1, x1 + w1, y1, x2 + w2, y2, x2 + w2 + r2, y2, color.rumble);
    drawPolygon(ctx, x1 - w1, y1, x1 + w1, y1, x2 + w2, y2, x2 - w2, y2, color.road);

    if (color.lane) {
      const lanew1 = w1 * 2 / lanes, lanew2 = w2 * 2 / lanes;
      let lanex1 = x1 - w1 + lanew1, lanex2 = x2 - w2 + lanew2;
      for (let lane = 1; lane < lanes; lanex1 += lanew1, lanex2 += lanew2, lane++) {
        drawPolygon(ctx, lanex1 - l1 / 2, y1, lanex1 + l1 / 2, y1, lanex2 + l2 / 2, y2, lanex2 - l2 / 2, y2, color.lane);
      }
    }
  };

  const drawPlayer = (ctx: CanvasRenderingContext2D, width: number, height: number, resolution: number, roadWidth: number, speedPercent: number, scale: number, destX: number, destY: number) => {
    const bounce = (1.5 * Math.random() * speedPercent * resolution) * (Math.random() > 0.5 ? 1 : -1);
    
    // Auto retro - Rectángulos simples
    const carWidth = 160 * scale;
    const carHeight = 80 * scale;
    const x = destX - (carWidth / 2);
    const y = destY - carHeight + bounce;

    // Sombra
    ctx.fillStyle = 'rgba(0,0,0,0.5)';
    ctx.fillRect(x, destY + bounce - 5 * scale, carWidth, 20 * scale);

    // Chasis
    ctx.fillStyle = '#18181b'; // zinc-900
    ctx.fillRect(x, y, carWidth, carHeight);
    
    // Luces traseras neon
    ctx.fillStyle = '#ef4444'; // red-500
    ctx.fillRect(x + 10 * scale, y + 20 * scale, 30 * scale, 10 * scale);
    ctx.fillRect(x + carWidth - 40 * scale, y + 20 * scale, 30 * scale, 10 * scale);

    // Parabrisas
    ctx.fillStyle = '#06b6d4'; // cyan-500
    ctx.fillRect(x + 20 * scale, y - 30 * scale, carWidth - 40 * scale, 40 * scale);
  };

  // --- Lógica Principal ---
  const resetRoad = () => {
    const segments: Segment[] = [];
    for (let n = 0; n < TRACK_LENGTH; n++) {
      let curve = 0;
      if (n > 100 && n < 300) curve = 2; // Curva derecha
      else if (n > 400 && n < 600) curve = -3; // Curva fuerte izquierda
      else if (n > 700 && n < 900) curve = 1.5;

      segments.push({
        index: n,
        p1: { x: 0, y: 0, z: n * SEGMENT_LENGTH, camera: { x: 0, y: 0, z: 0 }, screen: { x: 0, y: 0, w: 0, scale: 0 } },
        p2: { x: 0, y: 0, z: (n + 1) * SEGMENT_LENGTH, camera: { x: 0, y: 0, z: 0 }, screen: { x: 0, y: 0, w: 0, scale: 0 } },
        curve: curve,
        color: Math.floor(n / RUMBLE_LENGTH) % 2 ? COLORS.dark : COLORS.light
      });
    }
    segments[TRACK_LENGTH - 1].color = COLORS.finish;
    
    state.current.segments = segments;
    state.current.trackLength = segments.length * SEGMENT_LENGTH;
  };

  const update = (dt: number) => {
    const s = state.current;
    
    // Controles
    const up = s.keys.ArrowUp || s.touch.up;
    const down = s.keys.ArrowDown || s.touch.down;
    const left = s.keys.ArrowLeft || s.touch.left;
    const right = s.keys.ArrowRight || s.touch.right;

    const playerSegment = s.segments[Math.floor((s.position + s.player.z) / SEGMENT_LENGTH) % s.segments.length];

    const speedPercent = s.speed / MAX_SPEED;
    const dx = dt * 2 * speedPercent; // at top speed, should be able to cross from left to right in 1 second

    s.position = s.position + (dt * s.speed);

    // Loop
    while (s.position >= s.trackLength) s.position -= s.trackLength;
    while (s.position < 0) s.position += s.trackLength;

    // Steering
    if (left) s.player.x = s.player.x - dx;
    else if (right) s.player.x = s.player.x + dx;

    // Centrifugal force (pushes car outward on curves)
    s.player.x = s.player.x - (dx * speedPercent * playerSegment.curve * 3);

    // Accel / Decel
    if (up) s.speed = s.speed + ACCEL * dt;
    else if (down) s.speed = s.speed + BREAKING * dt;
    else s.speed = s.speed + DECEL * dt;

    // Off-road penalty
    if ((s.player.x < -1 || s.player.x > 1) && (s.speed > OFF_ROAD_LIMIT)) {
      s.speed = s.speed + OFF_ROAD_DECEL * dt;
    }

    // Clamping
    s.player.x = Math.max(-2.5, Math.min(2.5, s.player.x));
    s.speed = Math.max(0, Math.min(MAX_SPEED, s.speed));

    setSpeedUI(Math.round(s.speed / 100));
    setScore(prev => prev + Math.round(s.speed * dt * 0.1));
  };

  const render = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const s = state.current;
    const baseSegment = s.segments[Math.floor(s.position / SEGMENT_LENGTH) % s.segments.length];
    const basePercent = (s.position % SEGMENT_LENGTH) / SEGMENT_LENGTH;

    s.camera.y = CAMERA_HEIGHT;
    s.camera.z = s.position;

    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    
    // Background gradient
    const bgGradient = ctx.createLinearGradient(0, 0, 0, HEIGHT / 2);
    bgGradient.addColorStop(0, '#020617'); // slate-950
    bgGradient.addColorStop(1, '#09090b'); // zinc-950
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    let maxy = HEIGHT;
    let dx = -(baseSegment.curve * basePercent);
    let x = 0;

    for (let n = 0; n < DRAW_DISTANCE; n++) {
      const segment = s.segments[(baseSegment.index + n) % s.segments.length];
      segment.looped = segment.index < baseSegment.index;

      project(segment.p1, (s.player.x * ROAD_WIDTH) - x, s.camera.y, s.camera.z - (segment.looped ? s.trackLength : 0), CAMERA_DEPTH, WIDTH, HEIGHT, ROAD_WIDTH);
      project(segment.p2, (s.player.x * ROAD_WIDTH) - x - dx, s.camera.y, s.camera.z - (segment.looped ? s.trackLength : 0), CAMERA_DEPTH, WIDTH, HEIGHT, ROAD_WIDTH);

      x = x + dx;
      dx = dx + segment.curve;

      if ((segment.p1.camera.z <= CAMERA_DEPTH) || (segment.p2.screen.y >= maxy) || (segment.p2.screen.y >= segment.p1.screen.y)) continue;

      drawSegment(ctx, WIDTH, 3,
        segment.p1.screen.x, segment.p1.screen.y, segment.p1.screen.w,
        segment.p2.screen.x, segment.p2.screen.y, segment.p2.screen.w,
        segment.color
      );
      maxy = segment.p1.screen.y;
    }

    drawPlayer(ctx, WIDTH, HEIGHT, HEIGHT / 480, ROAD_WIDTH, s.speed / MAX_SPEED, 
               CAMERA_DEPTH / s.player.z, 
               WIDTH / 2, 
               (HEIGHT / 2) - (CAMERA_DEPTH / s.player.z * s.camera.y * HEIGHT / 2));
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const gameLoop = useCallback(() => {
    if (!isPlaying || gameOver) return;
    update(STEP);
    render();
    requestAnimationFrame(gameLoop);
  }, [isPlaying, gameOver]);

  // --- Handlers & Lifecycle ---
  useEffect(() => {
    resetRoad();
    render(); // Render inicial
  }, []);

  useEffect(() => {
    if (isPlaying) {
      requestAnimationFrame(gameLoop);
    }
  }, [isPlaying, gameLoop]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => { 
      if (state.current.keys.hasOwnProperty(e.code)) {
        state.current.keys[e.code as keyof typeof state.current.keys] = true;
        // Prevenir scroll de la página al usar las flechas
        if (isPlaying && !gameOver) e.preventDefault();
      } 
    };
    const handleKeyUp = (e: KeyboardEvent) => { 
      if (state.current.keys.hasOwnProperty(e.code)) {
        state.current.keys[e.code as keyof typeof state.current.keys] = false;
        if (isPlaying && !gameOver) e.preventDefault();
      } 
    };
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [isPlaying, gameOver]);

  const startGame = () => {
    setIsPlaying(true);
    setGameOver(false);
    setScore(0);
    state.current.position = 0;
    state.current.speed = 0;
    state.current.player.x = 0;
  };

  return (
    <div className="relative w-full aspect-[4/3] bg-zinc-950 select-none overflow-hidden touch-none group">
      <canvas 
        ref={canvasRef} 
        width={WIDTH} 
        height={HEIGHT} 
        className="w-full h-full object-cover block"
      />
      
      {/* UI Overlay */}
      {isPlaying && !gameOver && (
        <div className="absolute top-0 left-0 w-full p-4 md:p-6 flex justify-between items-start pointer-events-none">
          <div className="font-mono text-xl md:text-3xl font-bold text-white drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]">
            {speedUI} KM/H
          </div>
          <div className="font-mono text-xl md:text-3xl font-bold text-white drop-shadow-[0_0_8px_rgba(236,72,153,0.8)] text-right">
            SCORE<br/>
            {score.toLocaleString()}
          </div>
        </div>
      )}

      {/* Start / Game Over Screen */}
      {(!isPlaying || gameOver) && (
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center z-10">
          <h2 className="text-4xl md:text-6xl font-black italic uppercase text-transparent bg-clip-text bg-gradient-to-br from-cyan-400 to-purple-600 mb-2">
            MarkKart
          </h2>
          <p className="text-zinc-300 mb-8 max-w-sm">
            {gameOver ? `Puntuación final: ${score.toLocaleString()}` : 'Usa las flechas del teclado o los botones en pantalla para conducir.'}
          </p>
          <button 
            onClick={startGame}
            className="px-8 py-4 bg-white text-black font-bold text-xl rounded-full hover:scale-105 transition-transform active:scale-95 shadow-[0_0_30px_rgba(255,255,255,0.3)]"
          >
            {gameOver ? 'JUGAR DE NUEVO' : 'INICIAR CARRERA'}
          </button>
        </div>
      )}

      {/* Touch Controls (Mobile Only) */}
      <div className="absolute bottom-6 left-0 w-full flex justify-between px-6 md:hidden">
        <div className="flex gap-4">
          <button 
            className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 active:bg-white/30"
            onPointerDown={() => state.current.touch.left = true}
            onPointerUp={() => state.current.touch.left = false}
            onPointerLeave={() => state.current.touch.left = false}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
          </button>
          <button 
            className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 active:bg-white/30"
            onPointerDown={() => state.current.touch.right = true}
            onPointerUp={() => state.current.touch.right = false}
            onPointerLeave={() => state.current.touch.right = false}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
          </button>
        </div>
        <div className="flex gap-4">
          <button 
            className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 active:bg-white/30"
            onPointerDown={() => state.current.touch.down = true}
            onPointerUp={() => state.current.touch.down = false}
            onPointerLeave={() => state.current.touch.down = false}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
          </button>
          <button 
            className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 active:bg-cyan-500/50"
            onPointerDown={() => state.current.touch.up = true}
            onPointerUp={() => state.current.touch.up = false}
            onPointerLeave={() => state.current.touch.up = false}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M18 15l-6-6-6 6"/></svg>
          </button>
        </div>
      </div>
    </div>
  );
}
