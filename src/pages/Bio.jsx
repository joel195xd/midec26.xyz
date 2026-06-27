export default function Bio() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="aspect-[3/4] rounded-3xl bg-morning-tint/30 flex items-center justify-center">
              <svg className="w-32 h-32 text-morning-tint" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 rounded-3xl bg-action-blue/10"></div>
          </div>
          <div>
            <p className="font-cursive text-3xl text-action-blue mb-2">Mi historia</p>
            <h1 className="font-display text-6xl md:text-7xl font-black text-midnight-ink mb-6 leading-[1.1]">
              ¿Quién es <span className="text-action-blue">Midec26</span>?
            </h1>
            <div className="space-y-4 text-body text-charcoal-text leading-relaxed">
              <p>
                Midec26 no es solo un nombre, es un manifiesto. Cada letra, cada beat, cada palabra
                lleva consigo la esencia de quien busca expresarse más allá de los límites.
              </p>
              <p>
                Nacido de la necesidad de crear, Midec26 fusiona ritmos urbanos con letras que
                exploran la condición humana, el amor, la lucha y la esperanza.
              </p>
              <p>
                Este proyecto es una carta abierta a quien quiera escuchar, sentir y conectar.
                Porque la música es el puente que une almas.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
