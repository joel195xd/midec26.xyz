import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <>
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-sky-canvas/10 to-cloud-white">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-action-blue/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-sky-canvas/10 rounded-full blur-3xl"></div>
        </div>
        <div className="relative z-10 text-center px-6 max-w-4xl">
          <p className="font-cursive text-3xl md:text-4xl text-action-blue mb-4">Bienvenido a mi mundo</p>
          <h1 className="font-display text-7xl md:text-9xl font-black tracking-tight text-midnight-ink leading-[0.9] mb-6">
            MIDEC26
          </h1>
          <p className="font-body text-xl md:text-2xl text-charcoal-text/80 mb-10 max-w-2xl mx-auto">
            Cartas a quien quiera escuchar
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/musica" className="btn-primary text-center">Escuchar ahora</Link>
            <Link to="/tour" className="btn-outline text-center">Próximos shows</Link>
          </div>
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card p-8 text-center">
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-action-blue/10 flex items-center justify-center">
                <svg className="w-8 h-8 text-action-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2z" />
                </svg>
              </div>
              <h3 className="font-control-compressed text-heading font-black text-midnight-ink mb-3">Música</h3>
              <p className="text-body text-charcoal-text leading-body">Ritmos que conectan, letras que transforman. Descubre mi último trabajo.</p>
            </div>
            <div className="card p-8 text-center">
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-action-blue/10 flex items-center justify-center">
                <svg className="w-8 h-8 text-action-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-control-compressed text-heading font-black text-midnight-ink mb-3">Galería</h3>
              <p className="text-body text-charcoal-text leading-body">Capturando momentos, creando recuerdos. Una mirada visual a mi viaje.</p>
            </div>
            <div className="card p-8 text-center">
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-action-blue/10 flex items-center justify-center">
                <svg className="w-8 h-8 text-action-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="font-control-compressed text-heading font-black text-midnight-ink mb-3">Tour</h3>
              <p className="text-body text-charcoal-text leading-body">Vive la experiencia en vivo. Conoce dónde estaré este año.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
