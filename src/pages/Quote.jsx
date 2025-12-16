import React, { useState } from 'react'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'

export default function Quote() {
    const [form, setForm] = useState({
        name: '',
        email: '',
        phone: '',
        productType: 'Vidrio templado',
        width: '',
        height: '',
        quantity: 1,
        installation: 'yes',
        urgency: 'normal',
        details: ''
    })
    const [submitted, setSubmitted] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        // Aquí se conectaría con un backend
        console.log('Presupuesto solicitado:', form)
        setSubmitted(true)
        setTimeout(() => {
            setSubmitted(false)
            setForm({
                name: '',
                email: '',
                phone: '',
                productType: 'Vidrio templado',
                width: '',
                height: '',
                quantity: 1,
                installation: 'yes',
                urgency: 'normal',
                details: ''
            })
        }, 4000)
    }

    return (
        <div>
            <Navbar />

            <section className="container" style={{ padding: '3rem 0' }}>
                <div style={{ textAlign: 'center', marginBottom: 32 }}>
                    <h1 style={{ marginBottom: 12 }}>Solicitar Presupuesto</h1>
                    <p style={{ color: '#475569', fontSize: '1.1rem' }}>
                        Completa el formulario y te enviaremos una cotización detallada en menos de 24 horas
                    </p>
                </div>

                <div className="grid" style={{ gridTemplateColumns: '1.5fr 1fr', gap: 32, alignItems: 'start' }}>

                    {/* Quote Form */}
                    <div className="card">
                        {submitted && (
                            <div style={{
                                padding: 16,
                                background: '#10b981',
                                color: 'white',
                                borderRadius: 8,
                                marginBottom: 20,
                                textAlign: 'center',
                                fontSize: '1.1rem'
                            }}>
                                ✓ Solicitud enviada con éxito. Te contactaremos pronto con tu presupuesto.
                            </div>
                        )}

                        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 16 }}>

                            <h3>Información de Contacto</h3>

                            <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: 12 }}>
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
                                    <label style={{ display: 'block', marginBottom: 6, fontWeight: 600 }}>Teléfono *</label>
                                    <input
                                        required
                                        type="tel"
                                        placeholder="+549 11 1234 5678"
                                        value={form.phone}
                                        onChange={e => setForm({ ...form, phone: e.target.value })}
                                    />
                                </div>
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

                            <hr style={{ border: '1px solid rgba(0,0,0,0.05)', margin: '8px 0' }} />

                            <h3>Detalles del Producto</h3>

                            <div>
                                <label style={{ display: 'block', marginBottom: 6, fontWeight: 600 }}>Tipo de Producto *</label>
                                <select
                                    value={form.productType}
                                    onChange={e => setForm({ ...form, productType: e.target.value })}
                                    style={{ width: '100%', padding: '0.6rem', borderRadius: 8, border: '1px solid rgba(0,0,0,0.1)' }}
                                >
                                    <option>Vidrio templado</option>
                                    <option>Vidrio laminado</option>
                                    <option>Espejo</option>
                                    <option>Mampara de baño</option>
                                    <option>Puerta de vidrio</option>
                                    <option>Ventana de aluminio</option>
                                    <option>Cerramiento</option>
                                    <option>Otro (especificar en detalles)</option>
                                </select>
                            </div>

                            <div className="grid" style={{ gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
                                <div>
                                    <label style={{ display: 'block', marginBottom: 6, fontWeight: 600 }}>Ancho (cm)</label>
                                    <input
                                        type="number"
                                        placeholder="100"
                                        value={form.width}
                                        onChange={e => setForm({ ...form, width: e.target.value })}
                                    />
                                </div>

                                <div>
                                    <label style={{ display: 'block', marginBottom: 6, fontWeight: 600 }}>Alto (cm)</label>
                                    <input
                                        type="number"
                                        placeholder="150"
                                        value={form.height}
                                        onChange={e => setForm({ ...form, height: e.target.value })}
                                    />
                                </div>

                                <div>
                                    <label style={{ display: 'block', marginBottom: 6, fontWeight: 600 }}>Cantidad *</label>
                                    <input
                                        required
                                        type="number"
                                        min="1"
                                        value={form.quantity}
                                        onChange={e => setForm({ ...form, quantity: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                                <div>
                                    <label style={{ display: 'block', marginBottom: 6, fontWeight: 600 }}>¿Necesita instalación? *</label>
                                    <select
                                        value={form.installation}
                                        onChange={e => setForm({ ...form, installation: e.target.value })}
                                        style={{ width: '100%', padding: '0.6rem', borderRadius: 8, border: '1px solid rgba(0,0,0,0.1)' }}
                                    >
                                        <option value="yes">Sí, incluir instalación</option>
                                        <option value="no">No, solo el producto</option>
                                    </select>
                                </div>

                                <div>
                                    <label style={{ display: 'block', marginBottom: 6, fontWeight: 600 }}>Urgencia *</label>
                                    <select
                                        value={form.urgency}
                                        onChange={e => setForm({ ...form, urgency: e.target.value })}
                                        style={{ width: '100%', padding: '0.6rem', borderRadius: 8, border: '1px solid rgba(0,0,0,0.1)' }}
                                    >
                                        <option value="normal">Normal (7-15 días)</option>
                                        <option value="urgent">Urgente (3-5 días)</option>
                                        <option value="flexible">Flexible (más de 15 días)</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label style={{ display: 'block', marginBottom: 6, fontWeight: 600 }}>Detalles Adicionales</label>
                                <textarea
                                    rows={4}
                                    placeholder="Especifica color, acabados, medidas exactas, ubicación, o cualquier detalle relevante..."
                                    value={form.details}
                                    onChange={e => setForm({ ...form, details: e.target.value })}
                                    style={{ resize: 'vertical' }}
                                />
                            </div>

                            <button className="btn" type="submit" style={{ marginTop: 8 }}>
                                Solicitar Presupuesto
                            </button>
                        </form>
                    </div>

                    {/* Info Panel */}
                    <div>
                        <div className="card" style={{ background: 'linear-gradient(135deg, #0b78d1 0%, #0ea5e9 100%)', color: 'white', marginBottom: 20 }}>
                            <h3 style={{ marginBottom: 12, color: 'white' }}>📋 ¿Cómo funciona?</h3>
                            <div style={{ display: 'grid', gap: 12, fontSize: '0.95rem' }}>
                                <div>
                                    <div style={{ fontWeight: 700 }}>1. Completa el formulario</div>
                                    <div style={{ opacity: 0.9 }}>Proporciona los detalles de tu proyecto</div>
                                </div>
                                <div>
                                    <div style={{ fontWeight: 700 }}>2. Te contactamos</div>
                                    <div style={{ opacity: 0.9 }}>En menos de 24 horas hábiles</div>
                                </div>
                                <div>
                                    <div style={{ fontWeight: 700 }}>3. Recibe tu presupuesto</div>
                                    <div style={{ opacity: 0.9 }}>Cotización detallada sin compromiso</div>
                                </div>
                            </div>
                        </div>

                        <div className="card">
                            <h3 style={{ marginBottom: 12 }}>💡 Beneficios</h3>
                            <ul style={{ paddingLeft: 20, display: 'grid', gap: 8, color: '#475569' }}>
                                <li>Presupuesto sin costo</li>
                                <li>Asesoramiento profesional</li>
                                <li>Medidas personalizadas</li>
                                <li>Garantía de 5 años</li>
                                <li>Materiales certificados</li>
                                <li>Instalación profesional</li>
                            </ul>
                        </div>

                        <div className="card" style={{ background: '#fef3c7' }}>
                            <div style={{ fontSize: '1.5rem', marginBottom: 8 }}>⚡</div>
                            <div style={{ fontWeight: 700, marginBottom: 4 }}>¿Necesitas ayuda?</div>
                            <div style={{ color: '#78350f', fontSize: '0.9rem', marginBottom: 12 }}>
                                Llámanos al +549 11 1234 5678 y te asesoramos personalmente
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            <Footer />
        </div>
    )
}
