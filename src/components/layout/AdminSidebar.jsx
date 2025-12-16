import React from 'react'
import { NavLink } from 'react-router-dom'

export default function AdminSidebar(){
  return (
    <aside style={{width:220,padding:16,background:'linear-gradient(180deg, rgba(255,255,255,0.02), transparent)',borderRight:'1px solid rgba(255,255,255,0.03)',height:'100vh'}}>
      <div style={{fontWeight:700,marginBottom:12,color:'white'}}>Panel Admin</div>
      <nav style={{display:'flex',flexDirection:'column',gap:8}}>
        <NavLink to="/admin" end style={({isActive})=>({color:isActive?'var(--primary)':'var(--muted)'})}>Dashboard</NavLink>
        <NavLink to="/admin/products" style={({isActive})=>({color:isActive?'var(--primary)':'var(--muted)'})}>Productos</NavLink>
        <NavLink to="/admin/inventory" style={({isActive})=>({color:isActive?'var(--primary)':'var(--muted)'})}>Inventario</NavLink>
        <NavLink to="/admin/config" style={({isActive})=>({color:isActive?'var(--primary)':'var(--muted)'})}>Configuración</NavLink>
      </nav>
    </aside>
  )
}
