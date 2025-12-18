import React, { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'

export default function PhoneLogin({ onSwitchToEmail, onBack }) {
    const { loginWithPhone, createRecaptchaVerifier, error } = useAuth()
    const [phoneNumber, setPhoneNumber] = useState('+505 ')
    const [verificationCode, setVerificationCode] = useState('')
    const [confirmationResult, setConfirmationResult] = useState(null)
    const [localError, setLocalError] = useState('')
    const [loading, setLoading] = useState(false)
    const [codeSent, setCodeSent] = useState(false)

    useEffect(() => {
        // Crear reCAPTCHA verifier cuando el componente se monta
        const verifier = createRecaptchaVerifier('recaptcha-container')
        window.recaptchaVerifier = verifier

        return () => {
            if (window.recaptchaVerifier) {
                window.recaptchaVerifier.clear()
            }
        }
    }, [createRecaptchaVerifier])

    const handleSendCode = async (e) => {
        e.preventDefault()
        setLocalError('')

        // Validar número de teléfono
        if (!phoneNumber || phoneNumber.length < 10) {
            setLocalError('Por favor ingresa un número de teléfono válido')
            return
        }

        try {
            setLoading(true)
            const confirmation = await loginWithPhone(phoneNumber, window.recaptchaVerifier)
            setConfirmationResult(confirmation)
            setCodeSent(true)
        } catch (err) {
            setLocalError(err.message)
            // Recrear reCAPTCHA en caso de error
            if (window.recaptchaVerifier) {
                window.recaptchaVerifier.clear()
            }
            window.recaptchaVerifier = createRecaptchaVerifier('recaptcha-container')
        } finally {
            setLoading(false)
        }
    }

    const handleVerifyCode = async (e) => {
        e.preventDefault()
        setLocalError('')

        if (!verificationCode || verificationCode.length < 6) {
            setLocalError('Por favor ingresa el código de 6 dígitos')
            return
        }

        try {
            setLoading(true)
            await confirmationResult.confirm(verificationCode)
            // El redirect lo manejará automáticamente el AuthContext
        } catch (err) {
            setLocalError('Código incorrecto. Intenta de nuevo')
        } finally {
            setLoading(false)
        }
    }

    const handleResendCode = async () => {
        setVerificationCode('')
        setCodeSent(false)
        setConfirmationResult(null)
        // Recrear reCAPTCHA
        if (window.recaptchaVerifier) {
            window.recaptchaVerifier.clear()
        }
        window.recaptchaVerifier = createRecaptchaVerifier('recaptcha-container')
    }

    return (
        <div className="login-container">
            <div className="login-card fade-in">
                <div className="login-icon">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
                        <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                    </svg>
                </div>
                <h3>Administración</h3>
                <p className="subtitle">Ingresa con tu teléfono</p>

                {!codeSent ? (
                    <form onSubmit={handleSendCode} style={{ display: 'grid', gap: 16 }}>
                        <div className="form-group">
                            <label className="form-label">Número de Teléfono</label>
                            <input
                                className="input"
                                type="tel"
                                placeholder="+505 8357 4654"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                autoFocus
                                disabled={loading}
                            />
                            <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 4 }}>
                                Formato: +505 XXXX XXXX
                            </div>
                        </div>

                        {(localError || error) && (
                            <div style={{ color: '#ff6b6b', fontSize: 14, textAlign: 'center' }}>
                                {localError || error}
                            </div>
                        )}

                        <div id="recaptcha-container"></div>

                        <button
                            className="btn btn-large"
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? 'Enviando código...' : 'Enviar Código SMS'}
                        </button>

                        <div style={{ textAlign: 'center', fontSize: 14, color: 'var(--muted)' }}>
                            <button
                                type="button"
                                onClick={onSwitchToEmail}
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    color: 'var(--primary)',
                                    cursor: 'pointer',
                                    textDecoration: 'underline',
                                    padding: 0
                                }}
                            >
                                Entrar con Email
                            </button>
                        </div>
                    </form>
                ) : (
                    <form onSubmit={handleVerifyCode} style={{ display: 'grid', gap: 16 }}>
                        <div style={{
                            background: 'rgba(59, 130, 246, 0.1)',
                            padding: 12,
                            borderRadius: 8,
                            border: '1px solid rgba(59, 130, 246, 0.3)',
                            fontSize: 14,
                            color: '#60a5fa',
                            textAlign: 'center'
                        }}>
                            Código enviado a {phoneNumber}
                        </div>

                        <div className="form-group">
                            <label className="form-label">Código de Verificación</label>
                            <input
                                className="input"
                                type="text"
                                placeholder="123456"
                                value={verificationCode}
                                onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                                maxLength={6}
                                autoFocus
                                disabled={loading}
                                style={{ fontSize: 20, letterSpacing: 4, textAlign: 'center' }}
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
                            {loading ? 'Verificando...' : 'Verificar Código'}
                        </button>

                        <div style={{ textAlign: 'center', fontSize: 14, color: 'var(--muted)' }}>
                            ¿No recibiste el código?{' '}
                            <button
                                type="button"
                                onClick={handleResendCode}
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    color: 'var(--primary)',
                                    cursor: 'pointer',
                                    textDecoration: 'underline',
                                    padding: 0
                                }}
                                disabled={loading}
                            >
                                Reenviar
                            </button>
                        </div>

                        <div style={{ textAlign: 'center' }}>
                            <button
                                type="button"
                                onClick={onBack}
                                className="btn-secondary"
                                style={{ width: '100%' }}
                            >
                                ← Cambiar Número
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    )
}
