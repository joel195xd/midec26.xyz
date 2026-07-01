"use client";

import dynamic from "next/dynamic";

const RacingGame = dynamic(() => import("@/components/game/RacingGame"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[600px] flex items-center justify-center bg-zinc-950 rounded-2xl border border-zinc-800/50">
      <div className="text-cyan-400 animate-pulse font-bold tracking-widest">
        CARGANDO MARKKART...
      </div>
    </div>
  ),
});

export default function GameWrapper() {
  return (
    <main className="relative w-full max-w-4xl mx-auto rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(6,182,212,0.15)] ring-1 ring-white/10">
      <RacingGame />
    </main>
  );
}
