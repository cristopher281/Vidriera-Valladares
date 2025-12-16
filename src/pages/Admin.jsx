import React, { useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import AdminSidebar from '../components/layout/AdminSidebar'
import Dashboard from '../components/admin/Dashboard'
import InventoryTable from '../components/admin/InventoryTable'
import { useProducts } from '../context/ProductContext'

function Login({onLogin}){
  const [user,setUser] = useState('')
  const [pass,setPass] = useState('')
  const submit = (e)=>{e.preventDefault(); if(user==='admin' && pass==='admin'){ localStorage.setItem('vv_auth','1'); onLogin(); } else alert('Credenciales inválidas (admin/admin)') }
  return (
    <div style={{maxWidth:420,margin:'6rem auto'}} className="card">
      <h3>Admin Login</h3>
      <form onSubmit={submit} style={{display:'grid',gap:8}}>
        <input placeholder="Usuario" value={user} onChange={e=>setUser(e.target.value)} />
        <input placeholder="Contraseña" type="password" value={pass} onChange={e=>setPass(e.target.value)} />
        <button className="btn" type="submit">Entrar</button>
      </form>
    </div>
  )
}

export default function Admin(){
  const [auth, setAuth] = useState(!!localStorage.getItem('vv_auth'))
  const { products } = useProducts()
  const nav = useNavigate()

  const logout = ()=>{ localStorage.removeItem('vv_auth'); setAuth(false); nav('/') }

  if(!auth) return <Login onLogin={()=>setAuth(true)} />

  return (
    <div style={{display:'flex'}}>
      <AdminSidebar />
      <main style={{flex:1,padding:24}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
          <h1>Administración</h1>
          <div>
            <button onClick={()=>window.location.href='/'} style={{marginRight:8}}>Ver Tienda Pública</button>
            <button onClick={logout}>Cerrar sesión</button>
          </div>
        </div>

        <Routes>
          <Route index element={<Dashboard />} />
          <Route path="products" element={<InventoryTable />} />
          <Route path="inventory" element={<InventoryTable />} />
          <Route path="config" element={<div className="card">Configuración del sitio (próximamente)</div>} />
        </Routes>

      </main>
    </div>
  )
}
