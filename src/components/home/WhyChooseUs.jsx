import React from 'react'

export default function WhyChooseUs(){
  const items = [
    {title:'Medidas Personalizadas', desc:'Cortamos a medida según tus necesidades.'},
    {title:'Materiales Premium', desc:'Vidrios certificados y herrajes duraderos.'},
    {title:'Instalación Rápida', desc:'Equipo profesional con instalación puntual.'}
  ]
  return (
    <section className="container" id="nosotros" style={{padding:'2rem 0'}}>
      <h2>Por qué elegirnos</h2>
      <div className="grid" style={{gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))',marginTop:12}}>
        {items.map(i=> (
          <div className="card" key={i.title}>
            <h4>{i.title}</h4>
            <p style={{color:'#475569'}}>{i.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
