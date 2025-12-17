import React, { useMemo, useState } from 'react'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import SearchBar from '../components/catalog/SearchBar'
import CategoryFilter from '../components/catalog/CategoryFilter'
import ProductCard from '../components/catalog/ProductCard'
import ProductModal from '../components/catalog/ProductModal'
import { useProducts } from '../context/ProductContext'

export default function Catalog() {
  const { products } = useProducts()
  const [q, setQ] = useState('')
  const [cat, setCat] = useState('Todo')
  const [selectedProduct, setSelectedProduct] = useState(null)

  const filtered = useMemo(() => {
    return products.filter(p => (cat === 'Todo' || p.category === cat) && (!q || p.name.toLowerCase().includes(q.toLowerCase()) || (p.description || '').toLowerCase().includes(q.toLowerCase())))
  }, [products, q, cat])

  const handleProductClick = (product) => {
    setSelectedProduct(product)
  }

  const handleCloseModal = () => {
    setSelectedProduct(null)
  }

  return (
    <div>
      <Navbar />
      <div className="container" style={{ padding: '2rem 0' }}>
        <h2>Catálogo</h2>
        <SearchBar onSearch={setQ} />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8 }}>
          <CategoryFilter value={cat} onChange={setCat} />
          <div>Mostrando {filtered.length} productos</div>
        </div>
        <div className="grid" style={{ marginTop: 12 }}>
          {filtered.map(p => <ProductCard key={p.id} product={p} onDetailsClick={handleProductClick} />)}
        </div>
      </div>
      <Footer />
      <ProductModal product={selectedProduct} onClose={handleCloseModal} />
    </div>
  )
}
