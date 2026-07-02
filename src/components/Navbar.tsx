"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_LINKS, SOCIALS } from "@/lib/constants";
import { Music, ShoppingBag, User, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const ICON_MAP: Record<string, React.ElementType> = {
  music: Music,
  shoppingBag: ShoppingBag,
  user: User,
  sparkles: Sparkles,
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
          ? "py-3 bg-background/60 backdrop-blur-xl border-b border-white/[0.04] shadow-[0_10px_40px_rgba(0,0,0,0.5)]"
          : "py-6 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between relative">
        <Link href="/" className="group flex items-center gap-3 select-none relative z-10">
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12"
          >
            <defs>
              <linearGradient id="logo-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ef4444" />
                <stop offset="100%" stopColor="#991b1b" />
              </linearGradient>
              <filter id="logo-glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>
            <path
              d="M4 6H9.5L16 16.5L22.5 6H28V26H23.5V13.5L16 21.5L8.5 13.5V26H4V6Z"
              fill="url(#logo-grad)"
              filter="url(#logo-glow)"
              stroke="#ef4444"
              strokeWidth="0.5"
              strokeLinejoin="round"
            />
          </svg>
          <span className="text-xl font-black tracking-[0.25em] text-foreground group-hover:text-red-500 transition-colors duration-300">
            MARKHO
          </span>
        </Link>

        {/* Desktop Menu - Absolute center */}
        <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-1 bg-white/[0.03] p-1.5 rounded-full border border-white/[0.06] backdrop-blur-2xl shadow-[0_4px_20px_rgba(0,0,0,0.2)]">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            const Icon = ICON_MAP[link.icon as keyof typeof ICON_MAP];
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold tracking-wide transition-colors duration-300 ${
                  isActive
                    ? "text-red-500"
                    : "text-zinc-400 hover:text-foreground"
                }`}
              >
                {/* Animated active indicator */}
                {isActive && (
                  <motion.div
                    layoutId="navbar-active"
                    className="absolute inset-0 bg-red-500/10 rounded-full border border-red-500/20"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                {/* Animated underline glow */}
                {isActive && (
                  <motion.div
                    layoutId="navbar-glow"
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1/2 h-[2px] bg-red-500 blur-[2px] rounded-full"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                
                <span className="relative z-10 flex items-center gap-2">
                  {Icon && <Icon size={16} className={isActive ? "text-red-500" : "opacity-70"} />}
                  {link.label}
                </span>
              </Link>
            );
          })}
        </div>

        {/* Action Button (Desktop) */}
        <div className="hidden md:block relative z-10">
          <a
            href={SOCIALS.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative px-6 py-2.5 bg-white/[0.02] border border-white/[0.08] hover:border-red-500/50 hover:bg-red-500/[0.03] rounded-full text-xs font-bold uppercase tracking-[0.15em] text-zinc-300 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] overflow-hidden block"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            <span className="relative z-10 group-hover:text-red-400 transition-colors">Sígueme</span>
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden relative z-50 flex items-center justify-center p-2 rounded-full bg-white/[0.03] border border-white/[0.08] text-foreground hover:text-red-500 hover:border-red-500/30 transition-all active:scale-95"
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
            className="transition-transform duration-500"
          >
            {isOpen ? (
              <path d="M18 6L6 18M6 6l12 12" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Drawer (Fullscreen glass) */}
      <div
        className={`fixed inset-0 z-40 md:hidden bg-background/95 backdrop-blur-2xl transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full px-6 gap-6 pt-16">
          {NAV_LINKS.map((link, i) => {
            const isActive = pathname === link.href;
            const Icon = ICON_MAP[link.icon as keyof typeof ICON_MAP];
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-4 text-2xl font-black tracking-wide transition-all duration-300 hover:scale-105 ${
                  isActive
                    ? "text-red-500"
                    : "text-zinc-500 hover:text-foreground"
                }`}
                style={{
                  transitionDelay: isOpen ? `${i * 50}ms` : "0ms",
                  transform: isOpen ? "translateY(0)" : "translateY(20px)",
                  opacity: isOpen ? 1 : 0,
                }}
              >
                {Icon && <Icon size={24} className={isActive ? "text-red-500" : "opacity-50"} />}
                {link.label}
              </Link>
            );
          })}
          
          <div 
            className="w-12 h-[1px] bg-white/10 my-4"
            style={{
              transitionDelay: isOpen ? "250ms" : "0ms",
              transform: isOpen ? "scaleX(1)" : "scaleX(0)",
              opacity: isOpen ? 1 : 0,
            }}
          />

          <a
            href={SOCIALS.instagram}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsOpen(false)}
            className="text-sm font-bold uppercase tracking-[0.2em] text-zinc-400 hover:text-red-500 transition-colors"
            style={{
              transitionDelay: isOpen ? "300ms" : "0ms",
              transform: isOpen ? "translateY(0)" : "translateY(20px)",
              opacity: isOpen ? 1 : 0,
            }}
          >
            Instagram
          </a>
        </div>
      </div>
    </nav>
  );
}
