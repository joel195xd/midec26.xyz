import Section from "./Section";
import { MERCH_ITEMS } from "@/lib/constants";
import Image from "next/image";

export default function Merch() {
  return (
    <Section id="merch">
      <div className="mb-12">
        <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-foreground mb-4">
          Merch
        </h2>
        <div className="w-16 h-1 bg-accent rounded-full" />
        <p className="text-text-secondary mt-4">Ediciones exclusivas. Próximamente disponible.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {MERCH_ITEMS.map((item) => (
          <div
            key={item.name}
            className="bg-surface rounded-2xl border border-white/5 overflow-hidden group hover:border-accent/30 transition-all duration-300"
          >
            {/* Image */}
            <div className="aspect-square bg-gradient-to-br from-surface to-background flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,var(--accent-glow),transparent_50%)]" />
              {item.image ? (
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              ) : (
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  className="w-12 h-12 text-text-secondary/30"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <path d="M21 15l-5-5L5 21" />
                </svg>
              )}
            </div>

            <div className="p-4">
              <h3 className="font-bold text-foreground mb-1">{item.name}</h3>
              <p className="text-accent font-semibold text-sm">{item.price}</p>

              <button
                disabled
                className="mt-3 w-full py-2 bg-white/5 text-text-secondary rounded-full text-sm font-medium cursor-not-allowed"
              >
                Próximamente
              </button>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
