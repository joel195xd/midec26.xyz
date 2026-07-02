"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, ExternalLink, Play, X } from "lucide-react";

const VIDEOS = [
  { id: 1, src: "/¿Os mola o no✨ #emergente #reggaeton.mp4", alt: "¿Os mola o no?" },
  { id: 2, src: "/Entre sombras y luces 2310. Mi nueva era.mp4", alt: "Entre sombras y luces" },
  { id: 3, src: "/Entre sombras y luces by Markho ya disponible en todas las plataformas #emergente #casialgo🥲💔 #reggaeton.mp4", alt: "Entre sombras y luces - Disponible" },
  { id: 4, src: "/Un preview... Feliz año 🥂🥂.mp4", alt: "Preview - Feliz año" },
  { id: 5, src: "/Estad atentos en marzo #emergente #reggaeton #artistaemergente.mp4", alt: "Estad atentos en marzo" },
  { id: 6, src: "/Espero que os mole!! #emergente #reggaeton #artistaemergente.mp4", alt: "Espero que os mole" },
  { id: 7, src: "/🔒Os mola o que🔒#emergente #reggaeton #artistaemergente #bloqueado #ex.mp4", alt: "¿Os mola o qué?" },
  { id: 8, src: "/¿os mola o no Como si nada by markho ya disponible en todas partes #fyp #emergente #reggaeton #artistaemergente.mp4", alt: "Como si nada - Disponible" },
];

export default function PhotoGallery() {
  const [selected, setSelected] = useState<(typeof VIDEOS)[number] | null>(null);

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
          {VIDEOS.map((video, i) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              onClick={() => setSelected(video)}
              className={`relative aspect-[9/16] rounded-xl overflow-hidden group cursor-pointer bg-zinc-900 ${
                i === 0 ? "md:col-span-2 md:row-span-2" : ""
              }`}
            >
              <video
                src={video.src}
                className="absolute inset-0 w-full h-full object-cover"
                muted
                loop
                preload="metadata"
                onMouseEnter={(e) => (e.target as HTMLVideoElement).play()}
                onMouseLeave={(e) => {
                  const v = e.target as HTMLVideoElement;
                  v.pause();
                  v.currentTime = 0;
                }}
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Play className="w-5 h-5 text-white ml-0.5" fill="white" />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <p className="text-white text-xs font-medium line-clamp-2">{video.alt}</p>
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

      {/* Lightbox */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-lg w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelected(null)}
                className="absolute -top-12 right-0 text-white/60 hover:text-white transition-colors"
              >
                <X className="w-8 h-8" />
              </button>
              <video
                src={selected.src}
                className="w-full rounded-xl"
                controls
                autoPlay
              />
              <p className="text-white text-sm mt-3 text-center">{selected.alt}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
