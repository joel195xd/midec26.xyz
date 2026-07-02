"use client";

import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";

const TESTIMONIALS = [
  {
    text: "Markho es uno de los artistas emergentes más prometedores del año. Su sonido urbano latino rompe esquemas.",
    author: "Revista Musical",
    role: "Crítica de música",
    stars: 5,
  },
  {
    text: "La energía que transmite en cada canción es incomparable. Markho tiene un talento natural para conectar con su audiencia.",
    author: "Blog de Hip-Hop",
    role: "Plataforma digital",
    stars: 5,
  },
  {
    text: "Desde que descubrí su música, no he podido dejar de escucharlo. Cada lanzamiento supera al anterior.",
    author: "Fan de Spotify",
    role: "Comunidad de seguidores",
    stars: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 px-4 bg-surface/50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">
            Lo que dicen
          </h2>
          <div className="w-16 h-1 bg-accent rounded-full mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="bg-background rounded-2xl p-6 border border-white/5 hover:border-accent/30 transition-colors relative"
            >
              <Quote className="w-8 h-8 text-accent/20 absolute top-4 right-4" />
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: t.stars }).map((_, s) => (
                  <Star
                    key={s}
                    className="w-4 h-4 text-accent fill-accent"
                  />
                ))}
              </div>
              <p className="text-text-secondary text-sm leading-relaxed mb-6">
                &ldquo;{t.text}&rdquo;
              </p>
              <div>
                <p className="text-foreground font-semibold text-sm">{t.author}</p>
                <p className="text-text-secondary text-xs">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
