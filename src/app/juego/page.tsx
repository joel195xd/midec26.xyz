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
        <GameWrapper />
      </div>
    </div>
  );
}
