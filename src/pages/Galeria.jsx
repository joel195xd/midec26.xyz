export default function Galeria() {
  const images = Array.from({ length: 9 }, (_, i) => i + 1)

  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="font-cursive text-3xl text-action-blue mb-2">Galería</p>
          <h1 className="font-display text-6xl md:text-7xl font-black text-midnight-ink mb-6">
            Momentos
          </h1>
          <p className="text-body text-charcoal-text max-w-2xl mx-auto">
            Una colección de imágenes que cuentan historias. Cada foto, un recuerdo.
            Cada instante, eterno.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map(i => (
            <div
              key={i}
              className="aspect-square rounded-2xl bg-morning-tint/30 flex items-center justify-center border-2 border-dashed border-morning-tint/40 hover:border-action-blue/30 transition-colors cursor-pointer group"
            >
              <div className="text-center p-8">
                <svg className="w-16 h-16 mx-auto mb-4 text-morning-tint group-hover:text-action-blue/40 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
                </svg>
                <p className="text-body text-charcoal-text/40">Imagen {i}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
