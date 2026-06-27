import { useState } from 'react'
import { NavLink } from 'react-router-dom'

const pages = [
  { id: 'inicio', label: 'Inicio', path: '/' },
  { id: 'bio', label: 'Bio', path: '/bio' },
  { id: 'musica', label: 'Música', path: '/musica' },
  { id: 'galeria', label: 'Galería', path: '/galeria' },
  { id: 'tour', label: 'Tour', path: '/tour' },
  { id: 'contacto', label: 'Contacto', path: '/contacto' },
]

export default function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-cloud-white/80 frosted">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 h-16">
        <NavLink to="/" className="font-control-compressed text-heading font-black tracking-tight text-midnight-ink no-underline">
          MIDEC26
        </NavLink>
        <div className="hidden md:flex items-center gap-8">
          {pages.map(p => (
            <NavLink
              key={p.id}
              to={p.path}
              end={p.path === '/'}
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              {p.label}
            </NavLink>
          ))}
        </div>
        <NavLink to="/contacto" className="btn-outline text-sm hidden md:inline-block">Escríbeme</NavLink>
        <button
          className="md:hidden flex flex-col gap-1 p-2 bg-transparent border-none cursor-pointer"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <span className="block w-6 h-[2px] bg-charcoal-text"></span>
          <span className="block w-6 h-[2px] bg-charcoal-text"></span>
          <span className="block w-6 h-[2px] bg-charcoal-text"></span>
        </button>
      </div>
      {mobileOpen && (
        <div className="md:hidden bg-cloud-white px-6 pb-6">
          {pages.map(p => (
            <NavLink
              key={p.id}
              to={p.path}
              end={p.path === '/'}
              className={({ isActive }) => `block py-3 nav-link ${isActive ? 'active' : ''}`}
              onClick={() => setMobileOpen(false)}
            >
              {p.label}
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  )
}
