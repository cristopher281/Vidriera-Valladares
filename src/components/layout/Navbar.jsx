import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Navbar() {
  const nav = useNavigate()
  return (
    <header className="container navbar">
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ fontWeight: 700, color: '#0b78d1' }}>Vidrieria Valladares</div>
      </div>
      <nav className="nav-links">
        <Link to="/">Inicio</Link>
        <Link to="/catalog">Productos</Link>
        <Link to="/about">Nosotros</Link>
        <Link to="/contact">Contacto</Link>
        <button className="btn" onClick={() => nav('/quote')}>Obtener Presupuesto</button>
      </nav>
    </header>
  )
}
