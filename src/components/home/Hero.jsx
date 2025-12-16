import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Hero(){
  const nav = useNavigate()
  return (
    <section className="hero container">
      <div className="left">
        <h1>Soluciones en Vidrio y Aluminio de Alta Calidad</h1>
        <p>Medidas personalizadas, materiales premium y montaje profesional.</p>
        <div style={{display:'flex',gap:8,marginTop:12}}>
          <button className="btn" onClick={()=>nav('/catalog')}>Ver Catálogo</button>
          <button onClick={()=>alert('Cotizador próximamente')} style={{padding:'.6rem 1rem',borderRadius:8}}>Cotizador</button>
        </div>
      </div>
      <div className="right card">
        <img alt="glass" src="https://images.unsplash.com/photo-1581579182041-1a9b0f7b1b6f?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=abc" style={{width:'100%',borderRadius:8}} />
      </div>
    </section>
  )
}
