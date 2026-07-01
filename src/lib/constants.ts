export const SITE = {
  name: "Midec26",
  title: "Midec26 — Artista & Cantante",
  description: "Página oficial de Midec26. Escucha su música, conoce su historia y consigue su merch exclusivo.",
  url: "https://midec26.xyz",
} as const;

export const SOCIALS = {
  spotify: "https://open.spotify.com/embed/artist/62PCBFxD6IB7B3DcVheIJp?utm_source=generator&theme=0&si=2730f589d5cb4ecb",
  youtube: "https://www.youtube.com/@MarkhoES",
  tiktok: "https://www.tiktok.com/@markh0__",
  instagram: "https://www.instagram.com/rial_markho?igsh=OWdiY3I1bXJ4em56",
  twitter: "https://x.com/midec26",
} as const;

export const NAV_LINKS = [
  { label: "Música", href: "/musica", icon: "music" },
  { label: "Merch", href: "/merch", icon: "shoppingBag" },
  { label: "Sobre Markho", href: "/sobre", icon: "user" },
  { label: "MarkKart", href: "/juego", icon: "gamepad2" },
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
    image: "/playera.png",
  },
  {
    name: "Gorra Logo",
    price: "$299 MXN",
    image: "/gorra.png",
  },
  // {
  //   name: "Poster Edición Limitada",
  //   price: "$199 MXN",
  //   image: "/poster.png",
  // },
  {
    name: "Hoodie Exclusive",
    price: "$699 MXN",
    image: "/hoodie.png",
  },
] as const;
