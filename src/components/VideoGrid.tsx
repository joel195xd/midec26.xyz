"use client";

import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Play, Tv } from "lucide-react";
import Image from "next/image";

interface YouTubeVideo {
  id: string;
  title: string;
  thumbnail: string;
  publishedAt: string;
  viewCount?: string;
}

function VideoCardSkeleton() {
  return (
    <div className="bg-zinc-900 rounded-xl overflow-hidden animate-pulse">
      <div className="aspect-video bg-zinc-800" />
      <div className="p-4 space-y-2">
        <div className="h-4 bg-zinc-800 rounded w-3/4" />
        <div className="h-3 bg-zinc-800 rounded w-1/2" />
      </div>
    </div>
  );
}

function VideoCard({ video }: { video: YouTubeVideo }) {
  return (
    <motion.a
      href={`https://www.youtube.com/watch?v=${video.id}`}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="group block bg-zinc-900 rounded-xl overflow-hidden hover:bg-zinc-800 transition-all duration-300 hover:scale-[1.02]"
    >
      <div className="relative aspect-video">
        <Image
          src={video.thumbnail}
          alt={video.title}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all flex items-center justify-center">
          <div className="w-14 h-14 bg-red-600 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity scale-75 group-hover:scale-100">
            <Play className="w-6 h-6 text-white ml-0.5" fill="white" />
          </div>
        </div>
        {video.viewCount && (
          <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
            {video.viewCount} views
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-white font-medium line-clamp-2 group-hover:text-accent transition-colors">
          {video.title}
        </h3>
        <p className="text-zinc-500 text-sm mt-1">
          {new Date(video.publishedAt).toLocaleDateString("es-ES", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </p>
      </div>
    </motion.a>
  );
}

export default function VideoGrid() {
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchVideos = useCallback(async () => {
    try {
      setLoading(true);
      setError(false);
      const res = await fetch("/api/youtube", { next: { revalidate: 3600 } });
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setVideos(data.videos || []);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchVideos();
  }, [fetchVideos]);

  if (loading) {
    return (
      <div>
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-zinc-800 rounded-lg animate-pulse" />
          <div className="h-7 bg-zinc-800 rounded w-48 animate-pulse" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <VideoCardSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <Tv className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
        <p className="text-zinc-400 mb-4">No se pudieron cargar los videos</p>
        <button
          onClick={fetchVideos}
          className="px-4 py-2 bg-zinc-800 text-white rounded-lg hover:bg-zinc-700 transition-colors"
        >
          Reintentar
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-8">
        <Tv className="w-10 h-10 text-red-500" />
        <h2 className="text-2xl md:text-3xl font-bold text-white">
          Últimos Videos
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>
    </div>
  );
}
