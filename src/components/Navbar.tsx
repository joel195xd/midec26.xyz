"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_LINKS } from "@/lib/constants";
import { Music, ShoppingBag, User, Gamepad2 } from "lucide-react";

const ICON_MAP: Record<string, React.ElementType> = {
  music: Music,
  shoppingBag: ShoppingBag,
  user: User,
  gamepad2: Gamepad2,
};

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "py-3 bg-background/70 backdrop-blur-md border-b border-white/5 shadow-[0_10px_30px_rgba(0,0,0,0.3)]"
          : "py-6 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="group flex items-center gap-3 select-none">
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="transition-transform duration-300 group-hover:scale-110"
          >
            <defs>
              <linearGradient id="logo-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ef4444" />
                <stop offset="100%" stopColor="#991b1b" />
              </linearGradient>
              <filter id="logo-glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="2" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>
            <path
              d="M4 6H9.5L16 16.5L22.5 6H28V26H23.5V13.5L16 21.5L8.5 13.5V26H4V6Z"
              fill="url(#logo-grad)"
              filter="url(#logo-glow)"
              stroke="#ef4444"
              strokeWidth="1"
              strokeLinejoin="round"
            />
          </svg>
          <span className="text-xl font-black tracking-[0.25em] text-foreground group-hover:text-red-500 transition-colors duration-300">
            MARKHO
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-1 bg-white/5 p-1.5 rounded-full border border-white/5 backdrop-blur-md">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            const Icon = ICON_MAP[link.icon as keyof typeof ICON_MAP];
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold tracking-wide transition-all duration-300 ${
                  isActive
                    ? "text-background bg-accent font-bold shadow-[0_4px_12px_rgba(163,230,53,0.3)]"
                    : "text-text-secondary hover:text-foreground hover:bg-white/5"
                }`}
              >
                {Icon && <Icon size={16} className={isActive ? "text-background" : "text-text-secondary"} />}
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Action Button / Follow (Desktop) */}
        <div className="hidden md:block">
          <a
            href="https://instagram.com/midec26"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 bg-white/5 border border-white/10 hover:border-red-600 hover:text-red-500 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 hover:scale-105"
          >
            Sígueme
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden flex items-center justify-center p-2 rounded-full bg-white/5 border border-white/5 text-foreground hover:text-red-500 transition-colors"
          aria-label="Menú"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-transform duration-300"
          >
            {isOpen ? (
              <path d="M18 6L6 18M6 6l12 12" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-x-0 top-[65px] z-40 md:hidden bg-background/95 backdrop-blur-2xl border-b border-white/5 transition-all duration-300 ease-in-out ${
          isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <div className="px-6 py-6 flex flex-col gap-3">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            const Icon = ICON_MAP[link.icon as keyof typeof ICON_MAP];
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-base font-semibold tracking-wide transition-all ${
                  isActive
                    ? "bg-accent text-background font-bold"
                    : "text-text-secondary hover:text-foreground hover:bg-white/5"
                }`}
              >
                {Icon && <Icon size={20} className={isActive ? "text-background" : "text-text-secondary"} />}
                {link.label}
              </Link>
            );
          })}
          <a
            href="https://instagram.com/midec26"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsOpen(false)}
            className="mt-2 w-full text-center py-3 bg-white/5 border border-white/10 hover:border-red-600 hover:text-red-500 rounded-xl text-sm font-bold uppercase tracking-wider transition-all"
          >
            Sígueme
          </a>
        </div>
      </div>
    </nav>
  );
}
