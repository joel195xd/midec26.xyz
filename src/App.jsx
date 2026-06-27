import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Bio from './pages/Bio'
import Musica from './pages/Musica'
import Galeria from './pages/Galeria'
import Tour from './pages/Tour'
import Contacto from './pages/Contacto'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/bio" element={<Bio />} />
        <Route path="/musica" element={<Musica />} />
        <Route path="/galeria" element={<Galeria />} />
        <Route path="/tour" element={<Tour />} />
        <Route path="/contacto" element={<Contacto />} />
      </Route>
    </Routes>
  )
}
