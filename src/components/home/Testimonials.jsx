import React from 'react'

const TESTS = [
  {name:'María', text:'Excelente trabajo y rápido montaje.'},
  {name:'Jorge', text:'Materiales de primera, muy conforme.'},
  {name:'Lucía', text:'Recomendados, buen precio y atención.'}
]

export default function Testimonials(){
  return (
    <section className="container" style={{padding:'2rem 0'}}>
      <h2>Testimonios</h2>
      <div className="grid" style={{marginTop:12}}>
        {TESTS.map(t=> (
          <div className="card" key={t.name}>
            <div style={{fontWeight:700}}>{t.name}</div>
            <p style={{color:'#475569'}}>{t.text}</p>
            <div>★★★★★</div>
          </div>
        ))}
      </div>
    </section>
  )
}
