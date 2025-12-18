/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useEffect, useState } from 'react'
import {
    signInWithEmailAndPassword,
    signOut,
    sendPasswordResetEmail,
    createUserWithEmailAndPassword,
    RecaptchaVerifier,
    signInWithPhoneNumber,
    onAuthStateChanged
} from 'firebase/auth'
import { auth } from '../firebase/config'

const AuthContext = createContext()

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        // Listener para cambios en el estado de autenticación
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            setLoading(false)
        })

        return unsubscribe
    }, [])

    // Login con email y contraseña
    const loginWithEmail = async (email, password) => {
        try {
            setError(null)
            const userCredential = await signInWithEmailAndPassword(auth, email, password)
            return userCredential.user
        } catch (err) {
            const errorMessage = getErrorMessage(err.code)
            setError(errorMessage)
            throw new Error(errorMessage)
        }
    }

    // Login con teléfono (SMS)
    const loginWithPhone = async (phoneNumber, appVerifier) => {
        try {
            setError(null)
            const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier)
            return confirmationResult
        } catch (err) {
            const errorMessage = getErrorMessage(err.code)
            setError(errorMessage)
            throw new Error(errorMessage)
        }
    }

    // Crear reCAPTCHA verifier
    const createRecaptchaVerifier = (containerId) => {
        return new RecaptchaVerifier(auth, containerId, {
            size: 'invisible',
            callback: () => {
                // reCAPTCHA resuelto
            }
        })
    }

    // Cerrar sesión
    const logout = async () => {
        try {
            await signOut(auth)
        } catch (err) {
            console.error('Error al cerrar sesión:', err)
            throw err
        }
    }

    // Recuperar contraseña
    const resetPassword = async (email) => {
        try {
            setError(null)
            await sendPasswordResetEmail(auth, email)
        } catch (err) {
            const errorMessage = getErrorMessage(err.code)
            setError(errorMessage)
            throw new Error(errorMessage)
        }
    }

    // Registrar nuevo usuario (solo para admin crear otros admins)
    const register = async (email, password) => {
        try {
            setError(null)
            const userCredential = await createUserWithEmailAndPassword(auth, email, password)
            return userCredential.user
        } catch (err) {
            const errorMessage = getErrorMessage(err.code)
            setError(errorMessage)
            throw new Error(errorMessage)
        }
    }

    // Mensajes de error en español
    const getErrorMessage = (errorCode) => {
        const errorMessages = {
            'auth/user-not-found': 'No existe una cuenta con este email',
            'auth/wrong-password': 'Contraseña incorrecta',
            'auth/invalid-email': 'Email inválido',
            'auth/user-disabled': 'Esta cuenta ha sido deshabilitada',
            'auth/too-many-requests': 'Demasiados intentos fallidos. Intenta más tarde',
            'auth/weak-password': 'La contraseña debe tener al menos 6 caracteres',
            'auth/email-already-in-use': 'Este email ya está registrado',
            'auth/invalid-phone-number': 'Número de teléfono inválido',
            'auth/invalid-verification-code': 'Código de verificación incorrecto',
            'auth/code-expired': 'El código ha expirado. Solicita uno nuevo',
            'auth/missing-phone-number': 'Debes proporcionar un número de teléfono',
            'auth/quota-exceeded': 'Se ha excedido el límite de SMS. Intenta más tarde'
        }

        return errorMessages[errorCode] || 'Error de autenticación. Intenta de nuevo'
    }

    const value = {
        user,
        loading,
        error,
        loginWithEmail,
        loginWithPhone,
        createRecaptchaVerifier,
        logout,
        resetPassword,
        register
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth debe usarse dentro de AuthProvider')
    }
    return context
}
