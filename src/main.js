import './style.css'
import { renderNav } from './nav.js'
import { renderFooter } from './footer.js'

const currentPage = ({ '/': 'inicio', '/index.html': 'inicio', '/bio.html': 'bio', '/musica.html': 'musica', '/galeria.html': 'galeria', '/tour.html': 'tour', '/contacto.html': 'contacto' })[window.location.pathname] || 'inicio'

renderNav(currentPage)
renderFooter()
