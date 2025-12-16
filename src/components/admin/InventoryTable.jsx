import React, { useState } from 'react'
import { useProducts } from '../../context/ProductContext'
import ProductForm from './ProductForm'

export default function InventoryTable(){
  const { products, deleteProduct, updateProduct, addProduct } = useProducts()
  const [editing, setEditing] = useState(null)

  const save = (p) => {
    if(p.id) updateProduct(p.id, p)
    else addProduct(p)
    setEditing(null)
  }

  return (
    <div>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <h3>Inventario</h3>
        <button className="btn" onClick={()=>setEditing({})}>Nuevo Producto</button>
      </div>
      {editing && <div className="card" style={{margin:'1rem 0'}}><ProductForm initial={editing} onSave={save} onCancel={()=>setEditing(null)} /></div>}
      <table style={{width:'100%',borderCollapse:'collapse'}}>
        <thead>
          <tr style={{textAlign:'left'}}><th>Producto</th><th>Precio</th><th>Stock</th><th>Acciones</th></tr>
        </thead>
        <tbody>
          {products.map(p=> (
            <tr key={p.id} style={{borderTop:'1px solid #eef2f7'}}>
              <td style={{padding:8,display:'flex',gap:8,alignItems:'center'}}>
                <img src={p.img||'https://via.placeholder.com/80'} alt="" style={{width:64,height:48,objectFit:'cover',borderRadius:6}} />
                <div>{p.name}</div>
              </td>
              <td>${p.price}</td>
              <td>{p.stock} {p.stock<10 && <span style={{color:'#dc2626',marginLeft:8}}>Bajo</span>}</td>
              <td>
                <button onClick={()=>setEditing(p)} style={{marginRight:8}}>Editar</button>
                <button onClick={()=>deleteProduct(p.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
