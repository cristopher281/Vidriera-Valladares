import React, { useState } from 'react'
import { useProducts } from '../../context/ProductContext'
import { useWoodProducts } from '../../context/WoodProductContext'
import ProductModal from '../catalog/ProductModal'

export default function FeaturedProducts() {
  const { getFeaturedProducts } = useProducts()
  const { getFeaturedWoodProducts } = useWoodProducts()
  const [selectedProduct, setSelectedProduct] = useState(null)

  const featuredGlass = getFeaturedProducts()
  const featuredWood = getFeaturedWoodProducts()

  // Combinar productos de vidrio y madera
  const allFeatured = [
    ...featuredGlass.map(p => ({ ...p, productType: 'glass' })),
    ...featuredWood.map(p => ({ ...p, productType: 'wood' }))
  ]

  if (allFeatured.length === 0) return null

  return (
    <>
      <section className="container" style={{ padding: '2rem 1rem' }}>
        <h2>Productos Destacados</h2>
        <div className="grid" style={{ marginTop: 12 }}>
          {allFeatured.map(p => (
            <div
              key={p.id}
              className="card"
              style={{
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden'
              }}
              onClick={() => setSelectedProduct(p)}
            >
              <img
                className="product-img"
                src={p.img || 'https://via.placeholder.com/400x300?text=Producto'}
                alt={p.name}
              />

              <div style={{ marginTop: '8px' }}>
                <h4 style={{ margin: '0 0 6px 0' }}>{p.name}</h4>
                <p style={{ color: 'var(--muted)', fontSize: '14px', margin: '0 0 12px 0' }}>
                  {p.description}
                </p>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '8px' }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '18px', color: 'var(--primary)' }}>
                      ${p.price}
                    </div>
                    <div style={{
                      color: p.stock > 10 ? '#7ee787' : p.stock > 0 ? '#fbbf24' : '#ef4444',
                      fontSize: '13px'
                    }}>
                      {p.stock > 0 ? `${p.stock} en stock` : 'Agotado'}
                    </div>
                  </div>

                  <button
                    className="btn btn-sm-mobile"
                    onClick={(e) => { e.stopPropagation(); setSelectedProduct(p) }}
                  >
                    Ver detalles
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </>
  )
}
