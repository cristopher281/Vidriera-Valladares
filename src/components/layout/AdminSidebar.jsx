import React from 'react'
import { Link } from 'react-router-dom'

export default function AdminSidebar(){
  return (
    <aside style={{width:220,padding:16,background:'linear-gradient(180deg,#ffffff, #f4fbff)',borderRight:'1px solid #e6eef7',height:'100vh'}}>
      <div style={{fontWeight:700,marginBottom:12}}>Panel Admin</div>
      <nav style={{display:'flex',flexDirection:'column',gap:8}}>
        <Link to="/admin">Dashboard</Link>
        <Link to="/admin/products">Productos</Link>
        <Link to="/admin/inventory">Inventario</Link>
        <Link to="/admin/config">Configuración</Link>
      </nav>
    </aside>
  )
}
