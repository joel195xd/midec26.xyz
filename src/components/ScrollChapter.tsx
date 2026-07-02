"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface ScrollChapterProps {
  number: string;
  title: string;
  year: string;
  description: string;
  index: number;
}

export default function ScrollChapter({
  number,
  title,
  year,
  description,
  index,
}: ScrollChapterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -30, scale: 0.95 }}
      animate={
        isInView
          ? { opacity: 1, x: 0, scale: 1 }
          : { opacity: 0, x: -30, scale: 0.95 }
      }
      transition={{
        duration: 0.7,
        delay: index * 0.15,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className="relative pl-10 sm:pl-16"
    >
      {/* Timeline dot */}
      <div className="absolute left-0 top-1 w-3 h-3 rounded-full bg-red-500 border-2 border-red-500/30 shadow-[0_0_12px_rgba(239,68,68,0.5)]" />

      <div className="bg-surface/20 border border-white/5 rounded-3xl p-6 hover:border-red-600/20 transition-all duration-300 group">
        <div className="flex flex-wrap items-baseline gap-2 mb-1">
          <h4 className="text-lg font-bold text-foreground">{title}</h4>
          <span className="text-xs text-text-secondary font-mono bg-white/5 px-2 py-0.5 rounded-full">
            {year}
          </span>
        </div>
        <p className="text-text-secondary text-sm leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  );
}
