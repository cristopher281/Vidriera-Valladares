import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 20, flexWrap: 'wrap' }}>
          <div>
            <h4>Vidrieria Valladares</h4>
            <p>Calidad en vidrio y aluminio. +549 11 1234 5678</p>
          </div>

          <div>
            <h5>Enlaces</h5>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <Link to="/" style={{ color: 'var(--muted)' }}>Inicio</Link>
              <Link to="/catalog" style={{ color: 'var(--muted)' }}>Productos</Link>
              <Link to="/about" style={{ color: 'var(--muted)' }}>Nosotros</Link>
              <Link to="/contact" style={{ color: 'var(--muted)' }}>Contacto</Link>
            </div>
          </div>

          <div>
            <h5>Horario</h5>
            <p>Lun-Vie 8:00 - 18:00</p>
            <Link to="/admin" style={{ color: '#475569', fontSize: '0.85rem', marginTop: 8, display: 'block' }}>🔐 Admin</Link>
          </div>

          <div>
            <h5>Newsletter</h5>
            <form onSubmit={(e) => { e.preventDefault(); alert('Gracias por suscribirte!') }}>
              <input placeholder="Tu correo" />
              <button className="btn" style={{ marginTop: 8 }}>Suscribirse</button>
            </form>
          </div>
        </div>
      </div>
    </footer>
  )
}
