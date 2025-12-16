import React, { useState } from 'react'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'

export default function Contact() {
    const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
    const [submitted, setSubmitted] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        // Aquí se conectaría con un backend o servicio de email
        console.log('Formulario enviado:', form)
        setSubmitted(true)
        setTimeout(() => {
            setSubmitted(false)
            setForm({ name: '', email: '', phone: '', message: '' })
        }, 3000)
    }

    return (
        <div>
            <Navbar />

            <section className="container" style={{ padding: '3rem 0' }}>
                <h1 style={{ textAlign: 'center', marginBottom: 32 }}>Contáctenos</h1>

                <div className="grid" style={{ gridTemplateColumns: '1.2fr 1fr', gap: 32, alignItems: 'start' }}>

                    {/* Contact Form */}
                    <div className="card">
                        <h3 style={{ marginBottom: 16 }}>Envíanos un Mensaje</h3>
                        {submitted && (
                            <div style={{
                                padding: 12,
                                background: '#10b981',
                                color: 'white',
                                borderRadius: 8,
                                marginBottom: 16,
                                textAlign: 'center'
                            }}>
                                ✓ Mensaje enviado con éxito. Te contactaremos pronto.
                            </div>
                        )}
                        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 12 }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: 6, fontWeight: 600 }}>Nombre Completo *</label>
                                <input
                                    required
                                    placeholder="Tu nombre"
                                    value={form.name}
                                    onChange={e => setForm({ ...form, name: e.target.value })}
                                />
                            </div>

                            <div>
                                <label style={{ display: 'block', marginBottom: 6, fontWeight: 600 }}>Email *</label>
                                <input
                                    required
                                    type="email"
                                    placeholder="tu@email.com"
                                    value={form.email}
                                    onChange={e => setForm({ ...form, email: e.target.value })}
                                />
                            </div>

                            <div>
                                <label style={{ display: 'block', marginBottom: 6, fontWeight: 600 }}>Teléfono *</label>
                                <input
                                    required
                                    type="tel"
                                    placeholder="+549 11 1234 5678"
                                    value={form.phone}
                                    onChange={e => setForm({ ...form, phone: e.target.value })}
                                />
                            </div>

                            <div>
                                <label style={{ display: 'block', marginBottom: 6, fontWeight: 600 }}>Mensaje *</label>
                                <textarea
                                    required
                                    rows={5}
                                    placeholder="Cuéntanos sobre tu proyecto..."
                                    value={form.message}
                                    onChange={e => setForm({ ...form, message: e.target.value })}
                                    style={{ resize: 'vertical' }}
                                />
                            </div>

                            <button className="btn" type="submit">Enviar Mensaje</button>
                        </form>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <div className="card" style={{ marginBottom: 24 }}>
                            <h3 style={{ marginBottom: 16 }}>Información de Contacto</h3>
                            <div style={{ display: 'grid', gap: 16 }}>
                                <div style={{ display: 'flex', gap: 12, alignItems: 'start' }}>
                                    <div style={{ fontSize: '1.5rem' }}>📍</div>
                                    <div>
                                        <div style={{ fontWeight: 600 }}>Dirección</div>
                                        <div style={{ color: '#475569' }}>
                                            <a href="https://maps.app.goo.gl/wSVUQH52gTp8iDnQA" target="_blank" rel="noopener noreferrer" style={{ color: '#3b82f6', textDecoration: 'none' }}>
                                                Ver ubicación en Google Maps
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                <div style={{ display: 'flex', gap: 12, alignItems: 'start' }}>
                                    <div style={{ fontSize: '1.5rem' }}>📞</div>
                                    <div>
                                        <div style={{ fontWeight: 600 }}>Teléfono</div>
                                        <div style={{ color: '#475569' }}>+549 11 1234 5678</div>
                                    </div>
                                </div>

                                <div style={{ display: 'flex', gap: 12, alignItems: 'start' }}>
                                    <div style={{ fontSize: '1.5rem' }}>✉️</div>
                                    <div>
                                        <div style={{ fontWeight: 600 }}>Email</div>
                                        <div style={{ color: '#475569' }}>info@vidrieriavalladares.com</div>
                                    </div>
                                </div>

                                <div style={{ display: 'flex', gap: 12, alignItems: 'start' }}>
                                    <div style={{ fontSize: '1.5rem' }}>🕐</div>
                                    <div>
                                        <div style={{ fontWeight: 600 }}>Horario</div>
                                        <div style={{ color: '#475569' }}>
                                            Lun-Vie: 8:00 - 18:00<br />
                                            Sábados: 9:00 - 13:00
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="card">
                            <h3 style={{ marginBottom: 12 }}>Síguenos en Redes</h3>
                            <div style={{ display: 'flex', gap: 12 }}>
                                <button style={{ padding: '8px 16px' }}>Facebook</button>
                                <button style={{ padding: '8px 16px' }}>Instagram</button>
                                <button style={{ padding: '8px 16px' }}>WhatsApp</button>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            {/* Map Section */}
            <section className="container" style={{ padding: '2rem 0' }}>
                <div className="card" style={{ padding: 0, overflow: 'hidden', height: 400 }}>
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3406.2586669767544!2d-64.26278532442795!3d-31.381693674287953!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9432995e98597b91%3A0xa601043dc9e6b80d!2sVIDRIER%C3%8DA%20VALLADARES!5e0!3m2!1ses!2sar!4v1734325000000"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        title="Ubicación"
                    />
                </div>
            </section>

            <Footer />
        </div>
    )
}
