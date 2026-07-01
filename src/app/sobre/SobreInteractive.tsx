"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import ScrollChapter from "@/components/ScrollChapter";

interface Chapter {
  number: string;
  title: string;
  year: string;
  description: string;
}

/* ── Parallax Portrait: scrolls slower for depth effect ── */
export function ParallaxPortrait({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <motion.div ref={ref} style={{ y }} className="w-full">
      {children}
    </motion.div>
  );
}

/* ── Timeline: vertical line that draws itself on scroll + staggered chapter cards ── */
export function Timeline({ chapters }: { chapters: Chapter[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.8", "end 0.6"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div ref={containerRef} className="relative">
      {/* The drawing line */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-white/5">
        <motion.div
          className="w-full bg-gradient-to-b from-red-500 via-red-600 to-accent origin-top"
          style={{ height: lineHeight }}
        />
      </div>

      {/* Chapter cards */}
      <div className="space-y-6">
        {chapters.map((ch, i) => (
          <ScrollChapter
            key={ch.number}
            number={ch.number}
            title={ch.title}
            year={ch.year}
            description={ch.description}
            index={i}
          />
        ))}
      </div>
    </div>
  );
}
