const pages = [
  { id: 'inicio', label: 'Inicio', path: '/' },
  { id: 'bio', label: 'Bio', path: '/bio' },
  { id: 'musica', label: 'Música', path: '/musica' },
  { id: 'galeria', label: 'Galería', path: '/galeria' },
  { id: 'tour', label: 'Tour', path: '/tour' },
  { id: 'contacto', label: 'Contacto', path: '/contacto' },
]

export function renderNav(currentPage) {
  const nav = document.createElement('nav')
  nav.className = 'sticky top-0 z-50 bg-cloud-white/80 frosted'
  nav.innerHTML = `
    <div class="max-w-7xl mx-auto flex items-center justify-between px-6 h-16">
      <a href="/" class="font-control-compressed text-heading font-black tracking-tight text-midnight-ink no-underline">
        MIDEC26
      </a>
      <div class="hidden md:flex items-center gap-8">
        ${pages.map(p => `
          <a href="${p.path === '/' ? '/index.html' : p.path + '.html'}"
             class="nav-link ${p.id === currentPage ? 'active' : ''}">
            ${p.label}
          </a>
        `).join('')}
      </div>
      <a href="/contacto.html" class="btn-outline text-sm hidden md:inline-block">Escríbeme</a>
      <button id="mobile-menu-btn" class="md:hidden flex flex-col gap-1 p-2 bg-transparent border-none cursor-pointer">
        <span class="block w-6 h-[2px] bg-charcoal-text"></span>
        <span class="block w-6 h-[2px] bg-charcoal-text"></span>
        <span class="block w-6 h-[2px] bg-charcoal-text"></span>
      </button>
    </div>
    <div id="mobile-menu" class="hidden md:hidden bg-cloud-white px-6 pb-6">
      ${pages.map(p => `
        <a href="${p.path === '/' ? '/index.html' : p.path + '.html'}"
           class="block py-3 nav-link ${p.id === currentPage ? 'active' : ''}">
          ${p.label}
        </a>
      `).join('')}
    </div>
  `
  document.body.prepend(nav)

  document.getElementById('mobile-menu-btn')?.addEventListener('click', () => {
    const menu = document.getElementById('mobile-menu')
    menu?.classList.toggle('hidden')
  })
}
