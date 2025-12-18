import React, { useState } from 'react'
import { useAuth } from '../../context/AuthContext'

export default function ForgotPassword({ onBack }) {
    const { resetPassword, error } = useAuth()
    const [email, setEmail] = useState('')
    const [localError, setLocalError] = useState('')
    const [loading, setLoading] = useState(false)
    const [emailSent, setEmailSent] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLocalError('')

        if (!email) {
            setLocalError('Por favor ingresa tu email')
            return
        }

        try {
            setLoading(true)
            await resetPassword(email)
            setEmailSent(true)
        } catch (err) {
            setLocalError(err.message)
        } finally {
            setLoading(false)
        }
    }

    if (emailSent) {
        return (
            <div className="login-container">
                <div className="login-card fade-in">
                    <div className="login-icon" style={{ background: 'linear-gradient(135deg, #10b981, #059669)' }}>
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
                            <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" />
                        </svg>
                    </div>
                    <h3>Email Enviado</h3>
                    <p className="subtitle" style={{ marginBottom: 24 }}>
                        Hemos enviado instrucciones para recuperar tu contraseña a:
                    </p>
                    <div style={{
                        background: 'rgba(59, 130, 246, 0.1)',
                        padding: 12,
                        borderRadius: 8,
                        border: '1px solid rgba(59, 130, 246, 0.3)',
                        fontSize: 14,
                        color: '#60a5fa',
                        textAlign: 'center',
                        marginBottom: 24,
                        wordBreak: 'break-all'
                    }}>
                        {email}
                    </div>
                    <p style={{ fontSize: 14, color: 'var(--muted)', marginBottom: 24, textAlign: 'center' }}>
                        Revisa tu bandeja de entrada y sigue las instrucciones del email.
                    </p>
                    <button
                        onClick={onBack}
                        className="btn btn-large"
                    >
                        Volver al Login
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="login-container">
            <div className="login-card fade-in">
                <div className="login-icon" style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)' }}>
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
                        <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
                    </svg>
                </div>
                <h3>Recuperar Contraseña</h3>
                <p className="subtitle">Ingresa tu email para recibir instrucciones</p>

                <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 16 }}>
                    <div className="form-group">
                        <label className="form-label">Email</label>
                        <input
                            className="input"
                            type="email"
                            placeholder="admin@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            autoFocus
                            disabled={loading}
                        />
                    </div>

                    {(localError || error) && (
                        <div style={{ color: '#ff6b6b', fontSize: 14, textAlign: 'center' }}>
                            {localError || error}
                        </div>
                    )}

                    <button
                        className="btn btn-large"
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? 'Enviando...' : 'Enviar Instrucciones'}
                    </button>

                    <div style={{ textAlign: 'center', fontSize: 14, color: 'var(--muted)' }}>
                        <button
                            type="button"
                            onClick={onBack}
                            style={{
                                background: 'none',
                                border: 'none',
                                color: 'var(--primary)',
                                cursor: 'pointer',
                                textDecoration: 'underline',
                                padding: 0
                            }}
                        >
                            ← Volver al Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
