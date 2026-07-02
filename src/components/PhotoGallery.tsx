"use client";

import { motion } from "framer-motion";
import { Globe, ExternalLink } from "lucide-react";
import Image from "next/image";

const PHOTOS = [
  { id: 1, alt: "Midec26 en estudio", color: "from-accent/30 to-accent-dark/30" },
  { id: 2, alt: "Concierto en vivo", color: "from-red-500/30 to-orange-500/30" },
  { id: 3, alt: "Sesión de grabación", color: "from-blue-500/30 to-purple-500/30" },
  { id: 4, alt: "Behind the scenes", color: "from-pink-500/30 to-rose-500/30" },
  { id: 5, alt: "Ensayo", color: "from-emerald-500/30 to-teal-500/30" },
  { id: 6, alt: "Promoción", color: "from-yellow-500/30 to-amber-500/30" },
];

export default function PhotoGallery() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between mb-12"
        >
          <div>
            <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">
              Galería
            </h2>
            <div className="w-16 h-1 bg-accent rounded-full" />
          </div>
          <a
            href="https://www.instagram.com/rial_markho"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-text-secondary hover:text-accent transition-colors"
          >
            <Globe className="w-5 h-5" />
            <span className="hidden sm:inline">@rial_markho</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {PHOTOS.map((photo, i) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className={`relative aspect-square rounded-xl overflow-hidden group cursor-pointer ${
                i === 0 ? "md:col-span-2 md:row-span-2" : ""
              }`}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${photo.color}`}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <Globe className="w-8 h-8 text-white/30 group-hover:text-white/60 transition-colors" />
              </div>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all" />
              <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <p className="text-white text-xs font-medium">{photo.alt}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-8"
        >
          <a
            href="https://www.instagram.com/rial_markho"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-medium hover:opacity-90 transition-opacity text-sm"
          >
            <Globe className="w-4 h-4" />
            Seguir en Instagram
          </a>
        </motion.div>
      </div>
    </section>
  );
}
