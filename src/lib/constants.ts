export const SITE = {
  name: "Midec26",
  title: "Midec26 — Artista & Cantante",
  description: "Página oficial de Midec26. Escucha su música, conoce su historia y consigue su merch exclusivo.",
  url: "https://midec26.xyz",
} as const;

export const SOCIALS = {
  spotify: "https://open.spotify.com/",
  youtube: "https://youtube.com/",
  tiktok: "https://tiktok.com/@midec26",
  instagram: "https://instagram.com/midec26",
  twitter: "https://x.com/midec26",
} as const;

export const NAV_LINKS = [
  { label: "Música", href: "#musica" },
  { label: "Merch", href: "#merch" },
  { label: "Sobre Midec26", href: "#sobre" },
] as const;

export const TRACKS = [
  {
    title: "Track 1",
    year: "2026",
    image: null,
    spotify: "https://open.spotify.com/embed/track/",
    youtube: "",
  },
  {
    title: "Track 2",
    year: "2026",
    image: null,
    spotify: "https://open.spotify.com/embed/track/",
    youtube: "",
  },
  {
    title: "Track 3",
    year: "2025",
    image: null,
    spotify: "https://open.spotify.com/embed/track/",
    youtube: "",
  },
] as const;

export const MERCH_ITEMS = [
  {
    name: "Playera Midec26",
    price: "$399 MXN",
    image: null,
  },
  {
    name: "Gorra Logo",
    price: "$299 MXN",
    image: null,
  },
  {
    name: "Poster Edición Limitada",
    price: "$199 MXN",
    image: null,
  },
  {
    name: "Hoodie Exclusive",
    price: "$699 MXN",
    image: null,
  },
] as const;
