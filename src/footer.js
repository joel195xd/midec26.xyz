export function renderFooter() {
  const footer = document.createElement('footer')
  footer.className = 'bg-cloud-white border-t border-black/10'
  footer.innerHTML = `
    <div class="max-w-7xl mx-auto px-6 py-16">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-12">
        <div>
          <h3 class="font-control-compressed text-heading font-black text-midnight-ink mb-4">MIDEC26</h3>
          <p class="text-body text-charcoal-text leading-body max-w-xs">
            Música, arte y expresión. Esto es solo el comienzo.
          </p>
        </div>
        <div>
          <h4 class="font-control font-medium text-body text-charcoal-text mb-4">Navegar</h4>
          <div class="flex flex-col gap-2">
            <a href="/index.html" class="nav-link">Inicio</a>
            <a href="/bio.html" class="nav-link">Bio</a>
            <a href="/musica.html" class="nav-link">Música</a>
            <a href="/galeria.html" class="nav-link">Galería</a>
            <a href="/tour.html" class="nav-link">Tour</a>
            <a href="/contacto.html" class="nav-link">Contacto</a>
          </div>
        </div>
        <div>
          <h4 class="font-control font-medium text-body text-charcoal-text mb-4">Sígueme</h4>
          <div class="flex flex-col gap-2">
            <a href="#" class="nav-link">Spotify</a>
            <a href="#" class="nav-link">YouTube</a>
            <a href="#" class="nav-link">Instagram</a>
            <a href="#" class="nav-link">TikTok</a>
          </div>
        </div>
      </div>
      <div class="border-t border-black/10 mt-12 pt-8 text-center">
        <p class="text-caption text-charcoal-text/60">&copy; ${new Date().getFullYear()} Midec26. Todos los derechos reservados.</p>
      </div>
    </div>
  `
  document.body.appendChild(footer)
}
