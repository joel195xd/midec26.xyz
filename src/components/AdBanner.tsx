"use client";

import { useEffect, useRef, useState } from "react";

interface AdBannerProps {
  slot: string;
  format?: string;
  responsive?: boolean;
  className?: string;
}

export default function AdBanner({
  slot,
  format = "auto",
  responsive = true,
  className = "",
}: AdBannerProps) {
  const adRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    try {
      if (adRef.current && typeof window !== "undefined") {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
      }
    } catch {
      // AdSense not loaded yet
    }
  }, [mounted]);

  if (!mounted) return null;

  return (
    <div className={`ad-container my-8 flex justify-center ${className}`}>
      <div ref={adRef}>
        <ins
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client="ca-pub-1833177286907117"
          data-ad-slot={slot}
          data-ad-format={format}
          data-full-width-responsive={responsive ? "true" : "false"}
        />
      </div>
    </div>
  );
}
