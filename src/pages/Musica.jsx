export default function Musica() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <p className="font-cursive text-3xl text-action-blue mb-2">Mi música</p>
          <h1 className="font-display text-6xl md:text-7xl font-black text-midnight-ink mb-6">
            Discografía
          </h1>
          <p className="text-body text-charcoal-text max-w-2xl mx-auto">
            Cada canción es un capítulo, cada álbum un libro. Explora mi música y
            déjate llevar por el sonido.
          </p>
        </div>

        <div className="card p-6 md:p-8 mb-8">
          <h3 className="font-control-compressed text-heading font-black text-midnight-ink mb-4">Escúchame en Spotify</h3>
          <div className="rounded-2xl overflow-hidden">
            <iframe
              style={{ borderRadius: '12px' }}
              src="https://open.spotify.com/embed/artist/62PCBFxD6IB7B3DcVheIJp?utm_source=generator&si=d7069237260a46ab"
              width="100%"
              height="352"
              frameBorder="0"
              allowFullScreen
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              title="Midec26 en Spotify"
            ></iframe>
          </div>
        </div>

        <div className="card p-6 md:p-8">
          <h3 className="font-control-compressed text-heading font-black text-midnight-ink mb-4">Destacados</h3>
          <div className="rounded-2xl overflow-hidden">
            <iframe
              style={{ borderRadius: '12px' }}
              src="https://open.spotify.com/embed/artist/62PCBFxD6IB7B3DcVheIJp?utm_source=generator&si=d7069237260a46ab"
              width="100%"
              height="352"
              frameBorder="0"
              allowFullScreen
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              title="Midec26 destacados"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  )
}
