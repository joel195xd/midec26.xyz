"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";

const RELEASE_DATE = new Date("2026-09-01T00:00:00");

function getTimeLeft() {
  const now = new Date();
  const diff = RELEASE_DATE.getTime() - now.getTime();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export default function ReleaseBanner() {
  const [time, setTime] = useState(getTimeLeft());
  const [minimized, setMinimized] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(interval);
  }, []);

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <div className="relative z-[60]">
      <AnimatePresence mode="wait">
        {minimized ? (
          <motion.button
            key="minimized"
            initial={{ y: -40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -40, opacity: 0 }}
            onClick={() => setMinimized(false)}
            className="w-full flex items-center justify-center gap-2 py-2 bg-gradient-to-r from-red-900 via-red-600 to-red-900 text-white text-xs font-bold tracking-widest uppercase cursor-pointer hover:brightness-110 transition-all"
          >
            <span className="inline-block w-2 h-2 rounded-full bg-lime-400 animate-pulse" />
            Próximo Lanzamiento
            <ChevronDown size={14} />
          </motion.button>
        ) : (
          <motion.div
            key="expanded"
            initial={{ y: -40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -40, opacity: 0 }}
            className="w-full bg-gradient-to-r from-red-950 via-red-700 to-red-950 border-b border-red-500/30"
          >
            <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="inline-block w-2 h-2 rounded-full bg-lime-400 animate-pulse shrink-0" />
                <span className="text-white/90 text-xs sm:text-sm font-bold tracking-widest uppercase">
                  Próximo Lanzamiento
                </span>
              </div>

              <div className="flex items-center gap-2 sm:gap-3">
                {[
                  { value: time.days, label: "D" },
                  { value: time.hours, label: "H" },
                  { value: time.minutes, label: "M" },
                  { value: time.seconds, label: "S" },
                ].map((unit, i) => (
                  <div key={unit.label} className="flex items-center gap-2 sm:gap-3">
                    <div className="flex flex-col items-center">
                      <span className="text-white text-sm sm:text-lg font-black tabular-nums leading-none">
                        {pad(unit.value)}
                      </span>
                      <span className="text-red-300/70 text-[9px] sm:text-[10px] font-bold uppercase">
                        {unit.label}
                      </span>
                    </div>
                    {i < 3 && (
                      <span className="text-red-400/50 text-sm font-bold animate-pulse">:</span>
                    )}
                  </div>
                ))}
              </div>

              <button
                onClick={() => setMinimized(true)}
                className="text-white/40 hover:text-white transition-colors shrink-0 hidden sm:block"
                aria-label="Minimizar"
              >
                <ChevronUp size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
