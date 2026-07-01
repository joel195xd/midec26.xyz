"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface ScrollProgressBarProps {
  className?: string;
}

export default function ScrollProgressBar({ className = "" }: ScrollProgressBarProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div ref={containerRef} className={`absolute left-6 top-0 bottom-0 w-px bg-white/5 ${className}`}>
      <motion.div
        className="w-full bg-gradient-to-b from-red-500 via-red-600 to-accent origin-top"
        style={{ height }}
      />
    </div>
  );
}
