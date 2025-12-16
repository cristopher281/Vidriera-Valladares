import React from 'react'
import { useProducts } from '../../context/ProductContext'

export default function Dashboard(){
  const { products, lowStock } = useProducts()
  return (
    <div>
      <h2>Dashboard</h2>
      <div style={{display:'flex',gap:12,marginTop:12}}>
        <div className="card" style={{flex:1}}>
          <h4>Total productos</h4>
          <div style={{fontSize:22,fontWeight:700}}>{products.length}</div>
        </div>
        <div className="card" style={{flex:1}}>
          <h4>Bajo stock</h4>
          <div style={{fontSize:22,fontWeight:700,color: lowStock.length? '#dc2626':'#16a34a'}}>{lowStock.length}</div>
        </div>
      </div>
    </div>
  )
}
