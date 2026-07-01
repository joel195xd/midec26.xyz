import { Metadata } from 'next';
import GameWrapper from './GameWrapper';

export const metadata: Metadata = {
  title: 'MarkKart | MARKHO',
  description: 'Juega a MarkKart, el juego oficial de MARKHO.',
};


export default function JuegoPage() {
  return (
    <div className="min-h-screen pt-24 pb-12 px-6">
      <div className="max-w-5xl mx-auto space-y-8">
        <header className="text-center space-y-4">
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-purple-500 to-cyan-500">
              MarkKart
            </span>
          </h1>
          <p className="text-zinc-400 text-lg md:text-xl font-medium tracking-wide">
            Esquiva los obstáculos y llega lo más lejos posible.
          </p>
        </header>

        <div className="flex justify-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 rounded-full text-sm font-medium">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
              <line x1="12" y1="9" x2="12" y2="13"/>
              <line x1="12" y1="17" x2="12.01" y2="17"/>
            </svg>
            Juego en desarrollo — pueden haber bugs
          </div>
        </div>

        <GameWrapper />
      </div>
    </div>
  );
}
