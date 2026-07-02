"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Music,
  Star,
  Headphones,
  Sparkles,
  Gift,
  Heart,
  Zap,
  Eye,
  Crown,
  Flame,
  Gem,
  Trophy,
  PartyPopper,
  RotateCcw,
  Volume2,
  VolumeX,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const SECRETS = [Music, Star, Headphones, Sparkles, Gift];
const DECOYS = [Heart, Zap, Eye, Crown, Flame, Gem, Trophy];
const TOTAL_TILES = 12;
const REVEAL_THRESHOLD = 7;

const SECRET_LABELS: Record<string, string> = {
  Music: "¡Música!",
  Star: "¡Estrella!",
  Headphones: "¡Audífonos!",
  Sparkles: "¡Magia!",
  Gift: "¡Regalo!",
};

const DECOY_LABELS: Record<string, string> = {
  Heart: "Corazón",
  Zap: "Trueno",
  Eye: "Ojo",
  Crown: "Corona",
  Flame: "Llama",
  Gem: "Gema",
  Trophy: "Trofeo",
};

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function generateTiles() {
  const shuffled = shuffleArray([...SECRETS, ...DECOYS]);
  return shuffled.map((Icon, index) => ({
    id: index,
    Icon,
    isSecret: SECRETS.includes(Icon),
    revealed: false,
  }));
}

function useAudio(enabled: boolean) {
  const ctxRef = useRef<AudioContext | null>(null);

  const getCtx = useCallback(() => {
    if (!ctxRef.current) {
      ctxRef.current = new AudioContext();
    }
    return ctxRef.current;
  }, []);

  const playClick = useCallback(() => {
    if (!enabled) return;
    try {
      const ctx = getCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.value = 800;
      osc.type = "sine";
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.08);
    } catch {}
  }, [enabled, getCtx]);

  const playSecret = useCallback(() => {
    if (!enabled) return;
    try {
      const ctx = getCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.value = 1200;
      osc.type = "sine";
      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.3);
    } catch {}
  }, [enabled, getCtx]);

  const playDecoy = useCallback(() => {
    if (!enabled) return;
    try {
      const ctx = getCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.value = 300;
      osc.type = "triangle";
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.15);
    } catch {}
  }, [enabled, getCtx]);

  const playWin = useCallback(() => {
    if (!enabled) return;
    try {
      const ctx = getCtx();
      const notes = [523, 659, 784, 1047];
      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.frequency.value = freq;
        osc.type = "sine";
        const start = ctx.currentTime + i * 0.12;
        gain.gain.setValueAtTime(0.2, start);
        gain.gain.exponentialRampToValueAtTime(0.001, start + 0.3);
        osc.start(start);
        osc.stop(start + 0.3);
      });
    } catch {}
  }, [enabled, getCtx]);

  return { playClick, playSecret, playDecoy, playWin };
}

function Confetti({ active }: { active: boolean }) {
  if (!active) return null;
  const pieces = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 0.5,
    color: ["#a3e635", "#f43f5e", "#06b6d4", "#f59e0b", "#8b5cf6"][
      Math.floor(Math.random() * 5)
    ],
    size: 6 + Math.random() * 8,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {pieces.map((p) => (
        <motion.div
          key={p.id}
          initial={{ y: -20, x: `${p.x}vw`, opacity: 1, rotate: 0 }}
          animate={{
            y: "110vh",
            rotate: 360 * (Math.random() > 0.5 ? 1 : -1),
            opacity: 0,
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            delay: p.delay,
            ease: "easeOut",
          }}
          style={{
            position: "absolute",
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            borderRadius: Math.random() > 0.5 ? "50%" : "2px",
          }}
        />
      ))}
    </div>
  );
}

export default function MysteryGamePage() {
  const [tiles, setTiles] = useState(() => generateTiles());
  const [revealedCount, setRevealedCount] = useState(0);
  const [secretCount, setSecretCount] = useState(0);
  const [showMessage, setShowMessage] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [lastRevealed, setLastRevealed] = useState<number | null>(null);

  const { playClick, playSecret, playDecoy, playWin } = useAudio(soundEnabled);

  const handleReveal = useCallback(
    (id: number) => {
      if (completed) return;
      const tile = tiles.find((t) => t.id === id);
      if (!tile || tile.revealed) return;

      playClick();
      setLastRevealed(id);

      setTiles((prev) =>
        prev.map((t) => (t.id === id ? { ...t, revealed: true } : t))
      );

      const isSecret = SECRETS.includes(tile.Icon);

      setTimeout(() => {
        if (isSecret) {
          playSecret();
          setSecretCount((p) => p + 1);
        } else {
          playDecoy();
        }
      }, 150);

      setRevealedCount((prev) => {
        const next = prev + 1;
        if (next >= REVEAL_THRESHOLD) {
          setTimeout(() => playWin(), 300);
          setShowMessage(true);
          setCompleted(true);
        }
        return next;
      });
    },
    [completed, tiles, playClick, playSecret, playDecoy, playWin]
  );

  const handleReset = useCallback(() => {
    setTiles(generateTiles());
    setRevealedCount(0);
    setSecretCount(0);
    setShowMessage(false);
    setCompleted(false);
    setLastRevealed(null);
  }, []);

  const progress = Math.min(100, (revealedCount / REVEAL_THRESHOLD) * 100);

  return (
    <>
      <Confetti active={showMessage} />

      <main className="flex-1 flex flex-col items-center px-4 pt-24 pb-16 md:pt-28">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <div className="flex items-center justify-center gap-3 mb-3">
            <Sparkles className="w-6 h-6 text-fuchsia-400" />
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-fuchsia-400">
              Minijuego
            </span>
            <Sparkles className="w-6 h-6 text-fuchsia-400" />
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-3 tracking-tight">
            Mystery Game
          </h1>
          <p className="text-zinc-400 text-sm md:text-base max-w-sm mx-auto leading-relaxed">
            Toca las baldosas para descubrir qué se esconde detrás.
            <br />
            <span className="text-fuchsia-400 font-semibold">
              Encuentra los 5 secretos
            </span>{" "}
            antes de que se acaben los intentos.
          </p>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="flex items-center gap-6 mb-6 text-sm"
        >
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-fuchsia-500 shadow-[0_0_8px_rgba(192,132,252,0.6)]" />
            <span className="text-zinc-300">
              <span className="font-bold text-white">{secretCount}</span> / 5 secretos
            </span>
          </div>
          <div className="w-px h-4 bg-zinc-700" />
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-zinc-500" />
            <span className="text-zinc-300">
              <span className="font-bold text-white">{revealedCount - secretCount}</span> engaños
            </span>
          </div>
          <div className="w-px h-4 bg-zinc-700" />
          <div className="flex items-center gap-2">
            <span className="text-zinc-300">
              <span className="font-bold text-white">{TOTAL_TILES - revealedCount}</span> restantes
            </span>
          </div>
        </motion.div>

        {/* Progress bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="w-full max-w-lg mb-8"
        >
          <div className="h-2.5 bg-zinc-800/80 rounded-full overflow-hidden border border-zinc-700/50">
            <motion.div
              className="h-full rounded-full"
              style={{
                background:
                  progress >= 100
                    ? "linear-gradient(90deg, #22c55e, #a3e635)"
                    : "linear-gradient(90deg, #d946ef, #06b6d4)",
              }}
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
          </div>
          <div className="flex justify-between mt-2 text-xs text-zinc-500">
            <span>
              {revealedCount} / {REVEAL_THRESHOLD} para la sorpresa
            </span>
            {completed && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-green-400 font-bold"
              >
                ¡Completado!
              </motion.span>
            )}
          </div>
        </motion.div>

        {/* Tile grid */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="grid grid-cols-3 md:grid-cols-4 gap-3 md:gap-4 w-full max-w-lg mb-8"
        >
          {tiles.map((tile, index) => (
            <motion.div
              key={tile.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.04, duration: 0.4 }}
              className="perspective-[800px]"
            >
              <motion.button
                whileHover={
                  !tile.revealed ? { scale: 1.06, y: -2 } : undefined
                }
                whileTap={!tile.revealed ? { scale: 0.94 } : undefined}
                onClick={() => !tile.revealed && handleReveal(tile.id)}
                className={`relative w-full aspect-square rounded-2xl transition-all duration-500 ${
                  tile.revealed
                    ? tile.isSecret
                      ? "bg-gradient-to-br from-fuchsia-600/30 via-purple-600/20 to-cyan-600/30 border border-fuchsia-400/60 shadow-[0_0_24px_rgba(192,132,252,0.3)]"
                      : "bg-gradient-to-br from-zinc-700/50 to-zinc-800/80 border border-zinc-600/40 shadow-inner"
                    : "bg-zinc-900/90 border border-zinc-700/60 hover:border-fuchsia-500/40 hover:bg-zinc-800/90 cursor-pointer shadow-[0_4px_16px_rgba(0,0,0,0.4)] hover:shadow-[0_4px_24px_rgba(192,132,252,0.15)]"
                }`}
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Unrevealed: pulsing glow */}
                {!tile.revealed && !completed && (
                  <div className="absolute inset-0 rounded-2xl animate-pulse-glow opacity-30" />
                )}

                <AnimatePresence mode="wait">
                  {tile.revealed ? (
                    <motion.div
                      key="revealed"
                      initial={{ scale: 0, rotate: -180, opacity: 0 }}
                      animate={{ scale: 1, rotate: 0, opacity: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 250,
                        damping: 18,
                        duration: 0.5,
                      }}
                      className="flex flex-col items-center justify-center gap-1"
                    >
                      <tile.Icon
                        className={`w-7 h-7 md:w-8 md:h-8 ${
                          tile.isSecret
                            ? "text-fuchsia-300 drop-shadow-[0_0_8px_rgba(192,132,252,0.8)]"
                            : "text-zinc-400"
                        }`}
                      />
                      <span
                        className={`text-[10px] font-semibold tracking-wide ${
                          tile.isSecret ? "text-fuchsia-300/80" : "text-zinc-500"
                        }`}
                      >
                        {tile.isSecret
                          ? SECRET_LABELS[tile.Icon.name] || "Secreto"
                          : DECOY_LABELS[tile.Icon.name] || ""}
                      </span>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="question"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex items-center justify-center"
                    >
                      <span className="text-2xl md:text-3xl font-black text-zinc-600 select-none">
                        ?
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </motion.div>
          ))}
        </motion.div>

        {/* Completion message */}
        <AnimatePresence>
          {showMessage && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="text-center mb-6"
            >
              <div className="relative inline-block mb-4">
                <PartyPopper className="w-14 h-14 text-yellow-400 mx-auto" />
                <motion.div
                  className="absolute inset-0"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 0.5, repeat: 2 }}
                >
                  <PartyPopper className="w-14 h-14 text-yellow-400 opacity-30" />
                </motion.div>
              </div>
              <h2 className="text-2xl md:text-3xl font-black text-white mb-2">
                ¡Sorpresa desbloqueada!
              </h2>
              <p className="text-zinc-400 mb-2 text-sm md:text-base">
                Encontraste{" "}
                <span className="text-fuchsia-400 font-bold">{secretCount}</span>{" "}
                de 5 secretos.
              </p>
              <p className="text-zinc-500 mb-6 text-xs md:text-sm">
                Algo increíble viene el{" "}
                <span className="text-white font-semibold">1 de Septiembre 2026</span>.
                No te lo pierdas.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleReset}
                className="flex items-center gap-2 mx-auto px-7 py-3 bg-gradient-to-r from-fuchsia-600 to-cyan-600 hover:from-fuchsia-500 hover:to-cyan-500 rounded-2xl text-white font-bold text-sm shadow-[0_4px_20px_rgba(192,132,252,0.3)] transition-all"
              >
                <RotateCcw className="w-4 h-4" />
                Jugar de nuevo
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Controls */}
        <div className="flex items-center gap-4">
          {!completed && revealedCount > 0 && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleReset}
              className="flex items-center gap-2 px-5 py-2.5 bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-700/60 rounded-xl text-zinc-400 hover:text-white text-sm transition-all"
            >
              <RotateCcw className="w-4 h-4" />
              Reiniciar
            </motion.button>
          )}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSoundEnabled((p) => !p)}
            className="flex items-center gap-2 px-4 py-2.5 bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-700/60 rounded-xl text-zinc-400 hover:text-white text-sm transition-all"
            title={soundEnabled ? "Silenciar" : "Activar sonido"}
          >
            {soundEnabled ? (
              <Volume2 className="w-4 h-4" />
            ) : (
              <VolumeX className="w-4 h-4" />
            )}
          </motion.button>
        </div>
      </main>
    </>
  );
}
