"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gift, Sparkles, Eye, Lock, Star, Music, Headphones } from "lucide-react";

const TOTAL_TILES = 12;
const REVEAL_THRESHOLD = 7;

interface Tile {
  id: number;
  revealed: boolean;
  icon: React.ElementType;
  label: string;
}

const SECRET_CONTENT: { icon: React.ElementType; label: string }[] = [
  { icon: Music, label: "Nueva canción" },
  { icon: Star, label: "Edición limitada" },
  { icon: Headphones, label: "Álbum secreto" },
  { icon: Sparkles, label: "Colaboración" },
  { icon: Gift, label: "Merch gratuito" },
];

const DECOY_CONTENT: { icon: React.ElementType; label: string }[] = [
  { icon: Lock, label: "?" },
  { icon: Lock, label: "?" },
  { icon: Lock, label: "?" },
  { icon: Lock, label: "?" },
  { icon: Lock, label: "?" },
  { icon: Lock, label: "?" },
  { icon: Lock, label: "?" },
];

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function buildTiles(): Tile[] {
  const allContent = shuffleArray([...SECRET_CONTENT, ...DECOY_CONTENT]);
  return Array.from({ length: TOTAL_TILES }, (_, i) => ({
    id: i,
    revealed: false,
    icon: allContent[i].icon,
    label: allContent[i].label,
  }));
}

export default function MysteryGame() {
  const [tiles, setTiles] = useState<Tile[]>(buildTiles);
  const [solved, setSolved] = useState(false);
  const [showReveal, setShowReveal] = useState(false);

  const revealedCount = tiles.filter((t) => t.revealed).length;

  const handleReveal = useCallback(
    (id: number) => {
      if (solved) return;
      setTiles((prev) => {
        const next = prev.map((t) => (t.id === id ? { ...t, revealed: true } : t));
        const count = next.filter((t) => t.revealed).length;
        if (count >= REVEAL_THRESHOLD && !solved) {
          setTimeout(() => {
            setSolved(true);
            setShowReveal(true);
          }, 600);
        }
        return next;
      });
    },
    [solved]
  );

  const handleReset = () => {
    setTiles(buildTiles());
    setSolved(false);
    setShowReveal(false);
  };

  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Eye className="w-6 h-6 text-accent" />
            <h2 className="text-3xl md:text-4xl font-black text-foreground">
              ¿Qué se esconde?
            </h2>
          </div>
          <p className="text-text-secondary text-sm max-w-md mx-auto">
            Descubre <span className="text-accent font-bold">{REVEAL_THRESHOLD} de {TOTAL_TILES}</span> casillas para revelar la sorpresa
          </p>
          <div className="mt-4 flex items-center justify-center gap-2">
            <div className="h-1.5 w-48 bg-white/5 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-accent to-lime-300 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${(revealedCount / REVEAL_THRESHOLD) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <span className="text-xs text-text-secondary font-mono">
              {revealedCount}/{REVEAL_THRESHOLD}
            </span>
          </div>
        </motion.div>

        {/* Tile Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 md:gap-4 mb-8">
          {tiles.map((tile) => (
            <motion.button
              key={tile.id}
              onClick={() => !tile.revealed && handleReveal(tile.id)}
              disabled={tile.revealed || solved}
              whileHover={!tile.revealed && !solved ? { scale: 1.05 } : {}}
              whileTap={!tile.revealed && !solved ? { scale: 0.95 } : {}}
              className={`relative aspect-square rounded-xl overflow-hidden transition-all duration-300 ${
                tile.revealed
                  ? "bg-white/5 border border-white/10"
                  : "bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 hover:border-accent/50 cursor-pointer hover:shadow-[0_0_20px_rgba(163,230,53,0.15)]"
              } ${solved ? "cursor-default" : ""}`}
            >
              <AnimatePresence mode="wait">
                {tile.revealed ? (
                  <motion.div
                    key="revealed"
                    initial={{ rotateY: 90, opacity: 0 }}
                    animate={{ rotateY: 0, opacity: 1 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="absolute inset-0 flex flex-col items-center justify-center gap-1"
                  >
                    <tile.icon
                      className={`w-6 h-6 sm:w-8 sm:h-8 ${
                        tile.label !== "?" ? "text-accent" : "text-white/20"
                      }`}
                    />
                    <span
                      className={`text-[10px] sm:text-xs font-medium ${
                        tile.label !== "?" ? "text-accent" : "text-white/20"
                      }`}
                    >
                      {tile.label}
                    </span>
                  </motion.div>
                ) : (
                  <motion.div
                    key="hidden"
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-white/10" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          ))}
        </div>

        {/* Solved reveal */}
        <AnimatePresence>
          {showReveal && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="text-center"
            >
              <div className="inline-flex flex-col items-center gap-4 p-8 rounded-2xl bg-gradient-to-br from-accent/10 to-transparent border border-accent/20">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
                  transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
                >
                  <Gift className="w-12 h-12 text-accent" />
                </motion.div>
                <div>
                  <h3 className="text-xl font-black text-foreground mb-2">
                    ¡Sorpresa desbloqueada!
                  </h3>
                  <p className="text-text-secondary text-sm max-w-xs mx-auto">
                    Markho tiene algo especial preparado para ti. Sigue atento al{" "}
                    <span className="text-accent font-bold">Próximo Lanzamiento</span>.
                    ¡No te lo vas a perder!
                  </p>
                </div>
                <button
                  onClick={handleReset}
                  className="px-5 py-2 bg-white/5 border border-white/10 hover:border-accent hover:text-accent rounded-full text-xs font-bold uppercase tracking-wider transition-all"
                >
                  Jugar de nuevo
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
