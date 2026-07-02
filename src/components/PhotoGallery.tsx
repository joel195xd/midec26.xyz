"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
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

function VideoCard({
  video,
  index,
  onSelect,
}: {
  video: (typeof VIDEOS)[0];
  index: number;
  onSelect: (v: (typeof VIDEOS)[0]) => void;
}) {
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

  const handleTouch = (e: React.TouchEvent) => {
    e.stopPropagation();
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play().catch(() => {});
      setIsHovering(true);
    } else {
      v.pause();
      setIsHovering(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.08, 0.6) }}
      onClick={() => onSelect(video)}
      className="relative aspect-[9/16] rounded-xl overflow-hidden group cursor-pointer bg-zinc-900"
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
        onTouchStart={handleTouch}
      />
      {/* Play overlay */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center pointer-events-none">
        <div
          className={`w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center transition-opacity ${
            isHovering ? "opacity-0" : "opacity-100 group-hover:opacity-100"
          }`}
        >
          {isHovering ? (
            <Pause className="w-5 h-5 text-white" fill="white" />
          ) : (
            <Play className="w-5 h-5 text-white ml-0.5" fill="white" />
          )}
        </div>
      </div>
      {/* Label */}
      <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        <p className="text-white text-xs font-medium line-clamp-2">
          {video.alt}
        </p>
      </div>
    </motion.div>
  );
}

export default function PhotoGallery() {
  const [selected, setSelected] = useState<(typeof VIDEOS)[0] | null>(null);

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

        <div className="columns-2 md:columns-3 gap-3 md:gap-4 space-y-3 md:space-y-4">
          {VIDEOS.map((video, i) => (
            <div key={video.id} className="break-inside-avoid">
              <VideoCard
                video={video}
                index={i}
                onSelect={setSelected}
              />
            </div>
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
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-600 to-purple-600 text-white rounded-full font-bold uppercase tracking-wider text-xs hover:scale-105 transition-transform shadow-[0_0_20px_rgba(220,38,38,0.3)]"
          >
            <Globe className="w-4 h-4" />
            Seguir en Instagram
          </a>
        </motion.div>
      </div>

      {/* Premium Glassmorphic Lightbox */}
      {selected && (
        <div
          className="fixed inset-0 flex items-center justify-center p-4 z-[9999] bg-background/80 backdrop-blur-xl transition-all duration-300"
          onClick={() => setSelected(null)}
        >
          <div
            className="relative w-full max-w-sm sm:max-w-md flex flex-col items-center bg-white/[0.02] border border-white/[0.05] p-2 rounded-2xl shadow-2xl"
            style={{ maxHeight: "90vh" }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelected(null)}
              className="absolute -top-4 -right-4 w-10 h-10 bg-red-600 text-white rounded-full flex items-center justify-center hover:bg-red-500 hover:scale-110 transition-all shadow-lg z-[10000]"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="w-full rounded-xl overflow-hidden bg-black relative">
              <video
                key={selected.file}
                src={videoPath(selected.file)}
                className="w-full object-cover"
                style={{ maxHeight: "75vh" }}
                controls
                autoPlay
                playsInline
              />
            </div>
            <div className="w-full pt-4 pb-2 px-2 text-center">
              <p className="text-white text-sm font-semibold tracking-wide">
                {selected.alt}
              </p>
              <p className="text-xs text-zinc-500 mt-1 uppercase tracking-widest">Markho Shorts</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
