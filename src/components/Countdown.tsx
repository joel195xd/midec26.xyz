"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Timer } from "lucide-react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const RELEASE_DATE = new Date("2026-09-01T00:00:00");

function calculateTimeLeft(): TimeLeft {
  const diff = RELEASE_DATE.getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function TimeUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="w-16 h-16 sm:w-20 sm:h-20 bg-surface border border-white/10 rounded-xl flex items-center justify-center mb-2">
        <span className="text-2xl sm:text-3xl font-black text-accent font-mono tabular-nums">
          {String(value).padStart(2, "0")}
        </span>
      </div>
      <span className="text-xs text-text-secondary uppercase tracking-wider">
        {label}
      </span>
    </div>
  );
}

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-20 px-4 bg-surface/50">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Timer className="w-8 h-8 text-accent mx-auto mb-4" />
          <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">
            Próximo Lanzamiento
          </h2>
          <p className="text-text-secondary mb-10 max-w-md mx-auto">
            Algo nuevo viene el{" "}
            <span className="text-accent font-semibold">1 de Septiembre, 2026</span>.
            No te lo pierdas.
          </p>
        </motion.div>

        {timeLeft ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex justify-center gap-3 sm:gap-5"
          >
            <TimeUnit value={timeLeft.days} label="Días" />
            <div className="flex items-center text-accent text-2xl font-bold pt-0 sm:pt-0">:</div>
            <TimeUnit value={timeLeft.hours} label="Horas" />
            <div className="flex items-center text-accent text-2xl font-bold pt-0 sm:pt-0">:</div>
            <TimeUnit value={timeLeft.minutes} label="Min" />
            <div className="flex items-center text-accent text-2xl font-bold pt-0 sm:pt-0">:</div>
            <TimeUnit value={timeLeft.seconds} label="Seg" />
          </motion.div>
        ) : (
          <div className="flex justify-center gap-3 sm:gap-5">
            {["Días", "Horas", "Min", "Seg"].map((label) => (
              <div key={label} className="flex flex-col items-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-surface border border-white/10 rounded-xl flex items-center justify-center mb-2 animate-pulse">
                  <span className="text-2xl sm:text-3xl font-black text-accent/30">--</span>
                </div>
                <span className="text-xs text-text-secondary uppercase tracking-wider">
                  {label}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
