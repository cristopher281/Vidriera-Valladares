import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function PrivateRoute({ children }) {
    const { user, loading } = useAuth()
    const location = useLocation()

    // Mostrar loading mientras verifica autenticación
    if (loading) {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                background: 'linear-gradient(135deg, #0a1628 0%, #1a2332 100%)'
            }}>
                <div style={{ textAlign: 'center' }}>
                    <div className="spinner" style={{
                        width: 48,
                        height: 48,
                        border: '4px solid rgba(59, 130, 246, 0.2)',
                        borderTop: '4px solid #3b82f6',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite',
                        margin: '0 auto 16px'
                    }} />
                    <div style={{ color: 'var(--muted)', fontSize: 14 }}>
                        Verificando autenticación...
                    </div>
                </div>
            </div>
        )
    }

    // Si no está autenticado, permitimos renderizar el componente en la ruta base /admin
    // (que contiene el formulario de login). Para rutas anidadas protegidas, redirigir.
    if (!user) {
        const isAdminBase = location.pathname === '/admin' || location.pathname === '/admin/'
        if (isAdminBase) {
            return children
        }
        return <Navigate to="/admin" replace />
    }

    // Si está autenticado, muestra el contenido protegido
    return children
}
