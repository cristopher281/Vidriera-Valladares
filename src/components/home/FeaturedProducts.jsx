import React from 'react'
import { useProducts } from '../../context/ProductContext'
import ProductCard from '../catalog/ProductCard'

export default function FeaturedProducts(){
  const { products } = useProducts()
  const featured = products.slice(0,4)
  return (
    <section className="container" style={{padding:'2rem 0'}}>
      <h2>Productos Destacados</h2>
      <div className="grid" style={{marginTop:12}}>
        {featured.map(p=> <ProductCard key={p.id} product={p} />)}
      </div>
    </section>
  )
}
