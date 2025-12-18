import React, { useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import AdminSidebar from '../components/layout/AdminSidebar'
import Dashboard from '../components/admin/Dashboard'
import InventoryTable from '../components/admin/InventoryTable'
import RawMaterialsTable from '../components/admin/RawMaterialsTable'
import WoodInventoryTable from '../components/admin/WoodInventoryTable'
import LoginForm from '../components/auth/LoginForm'
import PhoneLogin from '../components/auth/PhoneLogin'
import ForgotPassword from '../components/auth/ForgotPassword'
import { useAuth } from '../context/AuthContext'

export default function Admin() {
  const { user, logout } = useAuth()
  const [loginMethod, setLoginMethod] = useState('email') // 'email', 'phone', 'forgot'
  const nav = useNavigate()

  const handleLogout = async () => {
    await logout()
    nav('/')
  }

  // Si no está autenticado, mostrar pantallas de login
  if (!user) {
    if (loginMethod === 'phone') {
      return (
        <PhoneLogin
          onSwitchToEmail={() => setLoginMethod('email')}
          onBack={() => setLoginMethod('email')}
        />
      )
    }

    if (loginMethod === 'forgot') {
      return <ForgotPassword onBack={() => setLoginMethod('email')} />
    }

    return (
      <LoginForm
        onSwitchToPhone={() => setLoginMethod('phone')}
        onSwitchToForgot={() => setLoginMethod('forgot')}
      />
    )
  }

  // Si está autenticado, mostrar el panel admin
  return (
    <div className="admin-layout">
      <AdminSidebar />
      <main className="admin-main">
        <div className="admin-header fade-in">
          <h1>Administración</h1>
          <div className="admin-actions">
            <button className="btn-tertiary" onClick={() => nav('/')}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ display: 'inline', marginRight: 6 }}>
                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
              </svg>
              Ver Tienda
            </button>
            <button className="btn-secondary" onClick={handleLogout}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ display: 'inline', marginRight: 6 }}>
                <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z" />
              </svg>
              Cerrar Sesión
            </button>
          </div>
        </div>

        <Routes>
          <Route index element={<Dashboard />} />
          <Route path="products" element={<InventoryTable />} />
          <Route path="inventory" element={<InventoryTable />} />
          <Route path="wood-products" element={<WoodInventoryTable />} />
          <Route path="materials" element={<RawMaterialsTable />} />
          <Route path="config" element={<div className="card fade-in">Configuración del sitio (próximamente)</div>} />
        </Routes>

      </main>
    </div>
  )
}
