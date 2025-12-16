import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useProducts } from '../../context/ProductContext'
import { useRawMaterials } from '../../context/RawMaterialsContext'

export default function Dashboard() {
  const navigate = useNavigate()
  const { products, lowStock } = useProducts()
  const { materials, lowStock: lowStockMaterials } = useRawMaterials()

  const totalValue = products.reduce((sum, p) => sum + (p.price * p.stock), 0)

  return (
    <div className="fade-in">
      <h2 style={{ marginBottom: '1.5rem' }}>Dashboard</h2>
      <div className="fade-in-stagger" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 16 }}>

        <div className="metric-card fade-in" onClick={() => navigate('/admin/products')} style={{ cursor: 'pointer' }}>
          <div className="metric-icon" style={{ background: 'linear-gradient(135deg,var(--primary),var(--accent))' }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 6h-2.18c.11-.31.18-.65.18-1a2.996 2.996 0 00-5.5-1.65l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm11 15H4v-2h16v2zm0-5H4V8h5.08L7 10.83 8.62 12 11 8.76l1-1.36 1 1.36L15.38 12 17 10.83 14.92 8H20v6z" />
            </svg>
          </div>
          <div>
            <div style={{ fontSize: 13, color: 'var(--muted)' }}>Total Productos</div>
            <div style={{ fontSize: 28, fontWeight: 800, color: 'white' }}>{products.length}</div>
          </div>
        </div>

        <div className="metric-card fade-in" onClick={() => navigate('/admin/products?filter=low-stock')} style={{ cursor: 'pointer' }}>
          <div className="metric-icon" style={{ background: 'linear-gradient(135deg,#ff9aa2,#ff6a6a)' }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
              <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" />
            </svg>
          </div>
          <div>
            <div style={{ fontSize: 13, color: 'var(--muted)' }}>Bajo Stock</div>
            <div style={{ fontSize: 28, fontWeight: 800, color: lowStock.length ? '#ff9aa2' : '#7ee787' }}>{lowStock.length}</div>
          </div>
        </div>

        <div className="metric-card fade-in" onClick={() => navigate('/admin/products')} style={{ cursor: 'pointer' }}>
          <div className="metric-icon" style={{ background: 'linear-gradient(135deg,#7ee787,#4bd37a)' }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
              <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z" />
            </svg>
          </div>
          <div>
            <div style={{ fontSize: 13, color: 'var(--muted)' }}>Valor Total</div>
            <div style={{ fontSize: 28, fontWeight: 800, color: 'white' }}>${totalValue.toLocaleString()}</div>
          </div>
        </div>

        <div className="metric-card fade-in" onClick={() => navigate('/admin/materials')} style={{ cursor: 'pointer' }}>
          <div className="metric-icon" style={{ background: 'linear-gradient(135deg,#a78bfa,#8b5cf6)' }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9l1.96 2.5H17V9.5h2.5zm-1.5 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
            </svg>
          </div>
          <div>
            <div style={{ fontSize: 13, color: 'var(--muted)' }}>Materiales Crudos</div>
            <div style={{ fontSize: 28, fontWeight: 800, color: 'white' }}>{materials.length}</div>
          </div>
        </div>

        <div className="metric-card fade-in" onClick={() => navigate('/admin/materials?filter=low-stock')} style={{ cursor: 'pointer' }}>
          <div className="metric-icon" style={{ background: 'linear-gradient(135deg,#fbbf24,#f59e0b)' }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
              <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" />
            </svg>
          </div>
          <div>
            <div style={{ fontSize: 13, color: 'var(--muted)' }}>Materiales Bajo Stock</div>
            <div style={{ fontSize: 28, fontWeight: 800, color: lowStockMaterials.length ? '#fbbf24' : '#7ee787' }}>{lowStockMaterials.length}</div>
          </div>
        </div>

      </div>
    </div>
  )
}
