"use client";

import { useState, useCallback } from "react";
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
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const SECRETS = [Music, Star, Headphones, Sparkles, Gift];
const DECOYS = [Heart, Zap, Eye, Crown, Flame, Gem, Trophy];
const TOTAL_TILES = 12;
const REVEAL_THRESHOLD = 7;

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
    revealed: false,
  }));
}

export default function MysteryGamePage() {
  const [tiles, setTiles] = useState(() => generateTiles());
  const [revealedCount, setRevealedCount] = useState(0);
  const [showMessage, setShowMessage] = useState(false);
  const [completed, setCompleted] = useState(false);

  const handleReveal = useCallback(
    (id: number) => {
      if (completed) return;
      setTiles((prev) =>
        prev.map((t) => (t.id === id ? { ...t, revealed: true } : t))
      );
      setRevealedCount((prev) => {
        const next = prev + 1;
        if (next >= REVEAL_THRESHOLD) {
          setShowMessage(true);
          setCompleted(true);
        }
        return next;
      });
    },
    [completed]
  );

  const handleReset = useCallback(() => {
    setTiles(generateTiles());
    setRevealedCount(0);
    setShowMessage(false);
    setCompleted(false);
  }, []);

  return (
    <main className="flex-1 flex flex-col items-center justify-center px-4 py-16">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl md:text-5xl font-bold text-center mb-4 text-white"
      >
        Mystery Game
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-zinc-400 text-center mb-8 max-w-md"
      >
        Descubre cuáles son secretos entre las 12 baldosas.
        <br />
        ¡Si encuentras 7, se desbloquea la sorpresa!
      </motion.p>

      {/* Progress bar */}
      <div className="w-full max-w-md mb-8">
        <div className="flex justify-between text-sm text-zinc-500 mb-2">
          <span>{revealedCount} / {REVEAL_THRESHOLD} secretos</span>
          <span>{Math.min(100, Math.round((revealedCount / REVEAL_THRESHOLD) * 100))}%</span>
        </div>
        <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-fuchsia-500 to-cyan-500"
            initial={{ width: 0 }}
            animate={{
              width: `${Math.min(100, (revealedCount / REVEAL_THRESHOLD) * 100)}%`,
            }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* Tile grid */}
      <div className="grid grid-cols-3 md:grid-cols-4 gap-3 md:gap-4 max-w-lg mb-8">
        {tiles.map((tile) => (
          <motion.button
            key={tile.id}
            whileHover={!tile.revealed ? { scale: 1.05 } : undefined}
            whileTap={!tile.revealed ? { scale: 0.95 } : undefined}
            onClick={() => !tile.revealed && handleReveal(tile.id)}
            className={`relative aspect-square rounded-xl flex items-center justify-center text-3xl transition-all duration-300 ${
              tile.revealed
                ? "bg-gradient-to-br from-fuchsia-600/40 to-cyan-600/40 border border-fuchsia-500/50 shadow-lg shadow-fuchsia-500/20"
                : "bg-zinc-900 border border-zinc-700 hover:border-fuchsia-500/50 hover:bg-zinc-800 cursor-pointer"
            }`}
          >
            <AnimatePresence mode="wait">
              {tile.revealed ? (
                <motion.div
                  key="icon"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                >
                  <tile.Icon className="w-8 h-8 text-fuchsia-300" />
                </motion.div>
              ) : (
                <motion.div
                  key="question"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-zinc-600 text-2xl font-bold"
                >
                  ?
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        ))}
      </div>

      {/* Completion message */}
      <AnimatePresence>
        {showMessage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="text-center"
          >
            <PartyPopper className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
            <p className="text-2xl font-bold text-white mb-2">
              ¡Sorpresa desbloqueada!
            </p>
            <p className="text-zinc-400 mb-6">
              Algo increíble viene el 1 de Septiembre 2026. No te lo pierdas.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleReset}
              className="flex items-center gap-2 mx-auto px-6 py-3 bg-zinc-800 hover:bg-zinc-700 border border-zinc-600 rounded-xl text-white font-medium transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              Jugar de nuevo
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Reset button (before completion) */}
      {!completed && revealedCount > 0 && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleReset}
          className="flex items-center gap-2 mt-4 px-5 py-2.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 rounded-xl text-zinc-400 hover:text-white text-sm transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          Reiniciar
        </motion.button>
      )}
    </main>
  );
}
