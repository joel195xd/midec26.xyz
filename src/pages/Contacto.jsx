export default function Contacto() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <p className="font-cursive text-3xl text-action-blue mb-2">Contáctame</p>
          <h1 className="font-display text-6xl md:text-7xl font-black text-midnight-ink mb-6">
            Hablemos
          </h1>
          <p className="text-body text-charcoal-text max-w-2xl mx-auto">
            ¿Quieres colaborar, contratar un show o simplemente decir hola? 
            Estoy a un mensaje de distancia.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div>
            <form className="space-y-6" onSubmit={e => e.preventDefault()}>
              <div>
                <label htmlFor="name" className="font-control text-body font-medium text-midnight-ink block mb-2">
                  Nombre
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-3 rounded-xl border border-fog/30 bg-paper-white focus:outline-none focus:ring-2 focus:ring-action-blue/50 focus:border-action-blue transition-all text-body text-charcoal-text"
                  placeholder="Tu nombre"
                />
              </div>
              <div>
                <label htmlFor="email" className="font-control text-body font-medium text-midnight-ink block mb-2">
                  Correo electrónico
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-3 rounded-xl border border-fog/30 bg-paper-white focus:outline-none focus:ring-2 focus:ring-action-blue/50 focus:border-action-blue transition-all text-body text-charcoal-text"
                  placeholder="tu@email.com"
                />
              </div>
              <div>
                <label htmlFor="message" className="font-control text-body font-medium text-midnight-ink block mb-2">
                  Mensaje
                </label>
                <textarea
                  id="message"
                  rows={5}
                  className="w-full px-4 py-3 rounded-xl border border-fog/30 bg-paper-white focus:outline-none focus:ring-2 focus:ring-action-blue/50 focus:border-action-blue transition-all text-body text-charcoal-text resize-none"
                  placeholder="Escribe tu mensaje..."
                ></textarea>
              </div>
              <button type="submit" className="btn-primary w-full">
                Enviar mensaje
              </button>
            </form>
          </div>
          <div className="flex flex-col justify-center">
            <div className="space-y-8">
              <div>
                <h4 className="font-control-compressed text-heading font-black text-midnight-ink mb-2">Email</h4>
                <p className="text-body text-charcoal-text">hola@midec26.xyz</p>
              </div>
              <div>
                <h4 className="font-control-compressed text-heading font-black text-midnight-ink mb-2">Booking</h4>
                <p className="text-body text-charcoal-text">booking@midec26.xyz</p>
              </div>
              <div>
                <h4 className="font-control-compressed text-heading font-black text-midnight-ink mb-2">Redes</h4>
                <div className="flex gap-4">
                  {['Spotify', 'YouTube', 'Instagram', 'TikTok'].map(social => (
                    <a key={social} href="#" className="w-12 h-12 rounded-xl bg-action-blue/10 flex items-center justify-center hover:bg-action-blue/20 transition-colors">
                      <span className="text-caption font-medium text-action-blue">{social[0]}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
