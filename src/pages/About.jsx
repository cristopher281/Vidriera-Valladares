import React from 'react'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'

export default function About() {
    const features = [
        {
            icon: '🎯',
            title: 'Nuestra Misión',
            desc: 'Proporcionar soluciones en vidrio y aluminio de la más alta calidad, con un servicio personalizado que supere las expectativas de nuestros clientes.'
        },
        {
            icon: '👁️',
            title: 'Nuestra Visión',
            desc: 'Ser la empresa líder en soluciones de vidrio y aluminio, reconocida por nuestra excelencia, innovación y compromiso con la satisfacción del cliente.'
        },
        {
            icon: '⭐',
            title: 'Nuestros Valores',
            desc: 'Calidad, honestidad, puntualidad, profesionalismo y compromiso con cada proyecto que realizamos.'
        }
    ]

    return (
        <div>
            <Navbar />

            {/* Hero Section */}
            <section className="container" style={{ padding: '3rem 0' }}>
                <div style={{ textAlign: 'center', maxWidth: 800, margin: '0 auto' }}>
                    <h1 style={{ fontSize: '2.5rem', marginBottom: 16 }}>Sobre Nosotros</h1>
                    <p style={{ fontSize: '1.1rem', color: '#475569', lineHeight: 1.8 }}>
                        Somos una empresa especializada en la fabricación e instalación de productos de vidrio y aluminio
                        con más de 15 años de experiencia en el mercado. Ofrecemos soluciones personalizadas con los
                        más altos estándares de calidad.
                    </p>
                </div>
            </section>

            {/* Image Section */}
            <section className="container" style={{ padding: '2rem 0' }}>
                <div className="card" style={{ overflow: 'hidden', padding: 0 }}>
                    <img
                        src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=1200&auto=format&fit=crop"
                        alt="Nuestro taller"
                        style={{ width: '100%', height: '400px', objectFit: 'cover' }}
                    />
                </div>
            </section>

            {/* Mission, Vision, Values */}
            <section className="container" style={{ padding: '2rem 0' }}>
                <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 24 }}>
                    {features.map(f => (
                        <div className="card" key={f.title} style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '3rem', marginBottom: 12 }}>{f.icon}</div>
                            <h3 style={{ marginBottom: 8 }}>{f.title}</h3>
                            <p style={{ color: '#475569', lineHeight: 1.6 }}>{f.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="container" style={{ padding: '2rem 0' }}>
                <h2 style={{ textAlign: 'center', marginBottom: 24 }}>¿Por qué elegirnos?</h2>
                <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: 24 }}>
                    <div className="card">
                        <h4>✓ Experiencia Comprobada</h4>
                        <p style={{ color: '#475569' }}>Más de 500 proyectos exitosos en todo el país</p>
                    </div>
                    <div className="card">
                        <h4>✓ Materiales Premium</h4>
                        <p style={{ color: '#475569' }}>Vidrios certificados y herrajes de primera calidad</p>
                    </div>
                    <div className="card">
                        <h4>✓ Garantía Extendida</h4>
                        <p style={{ color: '#475569' }}>Garantía de hasta 5 años en todos nuestros productos</p>
                    </div>
                    <div className="card">
                        <h4>✓ Atención Personalizada</h4>
                        <p style={{ color: '#475569' }}>Asesoramiento profesional en cada etapa del proyecto</p>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    )
}
