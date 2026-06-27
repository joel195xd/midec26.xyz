import { Link } from 'react-router-dom'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-cloud-white border-t border-fog/30">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <h3 className="font-control-compressed text-heading font-black text-midnight-ink mb-4">MIDEC26</h3>
            <p className="text-body text-charcoal-text leading-body max-w-xs">
              Música, arte y expresión. Esto es solo el comienzo.
            </p>
          </div>
          <div>
            <h4 className="font-control font-medium text-body text-charcoal-text mb-4">Navegar</h4>
            <div className="flex flex-col gap-2">
              <Link to="/" className="nav-link">Inicio</Link>
              <Link to="/bio" className="nav-link">Bio</Link>
              <Link to="/musica" className="nav-link">Música</Link>
              <Link to="/galeria" className="nav-link">Galería</Link>
              <Link to="/tour" className="nav-link">Tour</Link>
              <Link to="/contacto" className="nav-link">Contacto</Link>
            </div>
          </div>
          <div>
            <h4 className="font-control font-medium text-body text-charcoal-text mb-4">Sígueme</h4>
            <div className="flex flex-col gap-2">
              <a href="#" className="nav-link">Spotify</a>
              <a href="#" className="nav-link">YouTube</a>
              <a href="#" className="nav-link">Instagram</a>
              <a href="#" className="nav-link">TikTok</a>
            </div>
          </div>
        </div>
        <div className="border-t border-fog/30 mt-12 pt-8 text-center">
          <p className="text-caption text-charcoal-text/60">&copy; {year} Midec26. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
