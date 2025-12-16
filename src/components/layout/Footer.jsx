import React from 'react'

export default function Footer(){
  return (
    <footer className="footer">
      <div className="container">
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',gap:20}}>
          <div>
            <h4>Vidrieria Valladares</h4>
            <p>Calidad en vidrio y aluminio. +549 11 1234 5678</p>
          </div>
          <div>
            <h5>Horario</h5>
            <p>Lun-Vie 8:00 - 18:00</p>
          </div>
          <div>
            <h5>Newsletter</h5>
            <form onSubmit={(e)=>{e.preventDefault();alert('Gracias')}}>
              <input placeholder="Tu correo" />
              <button className="btn" style={{marginTop:8}}>Suscribirse</button>
            </form>
          </div>
        </div>
      </div>
    </footer>
  )
}
