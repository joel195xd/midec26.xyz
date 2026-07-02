"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, ExternalLink, Play, X, Pause } from "lucide-react";

const VIDEOS = [
  { id: 1, file: "video-01.mp4", alt: "¿Os mola o no?" },
  { id: 2, file: "video-02.mp4", alt: "Entre sombras y luces" },
  { id: 3, file: "video-03.mp4", alt: "Entre sombras y luces - Disponible" },
  { id: 4, file: "video-04.mp4", alt: "Preview - Feliz año" },
  { id: 5, file: "video-05.mp4", alt: "Estad atentos en marzo" },
  { id: 6, file: "video-06.mp4", alt: "Espero que os mole" },
  { id: 7, file: "video-07.mp4", alt: "¿Os mola o qué?" },
  { id: 8, file: "video-08.mp4", alt: "Como si nada - Disponible" },
];

function videoPath(file: string) {
  return `/${file}`;
}

function VideoCard({ video, index, onSelect }: { video: typeof VIDEOS[0]; index: number; onSelect: (v: typeof VIDEOS[0]) => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseEnter = () => {
    setIsHovering(true);
    videoRef.current?.play().catch(() => {});
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      onClick={() => onSelect(video)}
      className={`relative aspect-[9/16] rounded-xl overflow-hidden group cursor-pointer bg-zinc-900 ${
        index === 0 ? "md:col-span-2 md:row-span-2" : ""
      }`}
    >
      <video
        ref={videoRef}
        src={videoPath(video.file)}
        className="absolute inset-0 w-full h-full object-cover"
        muted
        loop
        preload="metadata"
        playsInline
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onTouchStart={(e) => {
          e.stopPropagation();
          if (videoRef.current?.paused) {
            videoRef.current.play().catch(() => {});
          } else {
            videoRef.current?.pause();
          }
        }}
      />
      {/* Play overlay */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center pointer-events-none">
        <div className={`w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center transition-opacity ${isHovering ? "opacity-0" : "opacity-100 group-hover:opacity-100"}`}>
          {isHovering ? (
            <Pause className="w-5 h-5 text-white" fill="white" />
          ) : (
            <Play className="w-5 h-5 text-white ml-0.5" fill="white" />
          )}
        </div>
      </div>
      {/* Label */}
      <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        <p className="text-white text-xs font-medium line-clamp-2">{video.alt}</p>
      </div>
    </motion.div>
  );
}

export default function PhotoGallery() {
  const [selected, setSelected] = useState<typeof VIDEOS[0] | null>(null);

  // Lock body scroll when lightbox is open
  useEffect(() => {
    if (selected) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selected]);

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
            <VideoCard key={video.id} video={video} index={i} onSelect={setSelected} />
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
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
            style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-lg w-full max-h-[85vh] flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelected(null)}
                className="absolute -top-12 right-0 text-white/60 hover:text-white transition-colors z-10"
              >
                <X className="w-8 h-8" />
              </button>
              <video
                key={selected.id}
                src={videoPath(selected.file)}
                className="w-full max-h-[80vh] object-contain rounded-xl"
                controls
                autoPlay
                playsInline
              />
              <p className="text-white text-sm mt-3 text-center">{selected.alt}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
