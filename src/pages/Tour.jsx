const tourDates = [
  { date: '15 Mar 2026', venue: 'El Plaza Condesa', city: 'CDMX', tickets: '#' },
  { date: '22 Mar 2026', venue: 'Café Iguana', city: 'Monterrey', tickets: '#' },
  { date: '05 Abr 2026', venue: 'Teatro Metropólitan', city: 'CDMX', tickets: '#' },
  { date: '12 Abr 2026', venue: 'C4 Live', city: 'Guadalajara', tickets: '#' },
  { date: '20 Abr 2026', venue: 'Foro Tims', city: 'Puebla', tickets: '#' },
]

export default function Tour() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <p className="font-cursive text-3xl text-action-blue mb-2">Próximos shows</p>
          <h1 className="font-display text-6xl md:text-7xl font-black text-midnight-ink mb-6">
            Tour 2026
          </h1>
          <p className="text-body text-charcoal-text max-w-2xl mx-auto">
            No hay nada como la energía del directo. Aquí encontrarás todas las fechas
            donde podrás vivir la experiencia Midec26.
          </p>
        </div>
        <div className="space-y-4">
          {tourDates.map((show, i) => (
            <div key={i} className="card p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-6">
                <div className="text-center min-w-[80px]">
                  <p className="font-control-compressed text-sm font-black text-action-blue uppercase tracking-wider">
                    {show.date.split(' ')[1]}
                  </p>
                  <p className="font-display text-3xl font-black text-midnight-ink leading-none">
                    {show.date.split(' ')[0]}
                  </p>
                </div>
                <div>
                  <p className="font-control text-body font-semibold text-midnight-ink">{show.venue}</p>
                  <p className="text-caption text-charcoal-text/60">{show.city}</p>
                </div>
              </div>
              <a href={show.tickets} className="btn-primary text-sm text-center whitespace-nowrap">
                Boletos
              </a>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <p className="text-body text-charcoal-text/60 mb-4">Más fechas próximamente</p>
          <a href="#" className="btn-outline">Suscribirse al newsletter</a>
        </div>
      </div>
    </section>
  )
}
