import React, { createContext, useContext, useEffect, useState } from 'react'
import { loadFromStorage, saveToStorage } from '../utils/storage'

const ProductContext = createContext()

const SAMPLE = [
  { id: 'p1', name: 'Vidrio templado 8mm', category: 'Vidrio templado', price: 120, stock: 25, img: '' , description:'Vidrio templado de alta resistencia.'},
  { id: 'p2', name: 'Espejo 6mm', category: 'Espejos', price: 80, stock: 12, img: '' , description:'Espejo con bisel opcional.'},
  { id: 'p3', name: 'Mampara de baño', category: 'Mamparas', price: 300, stock: 6, img: '' , description:'Mampara con herrajes incluidos.'},
  { id: 'p4', name: 'Vidrio laminado 10mm', category: 'Vidrio laminado', price: 200, stock: 4, img: '' , description:'Mayor seguridad y aislamiento.'}
]
export function ProductProvider({ children }) {
  const [products, setProducts] = useState([])

  useEffect(() => {
    const stored = loadFromStorage('products')
    if (stored) {
      setProducts(stored)
    } else {
      setProducts(SAMPLE)
      saveToStorage('products', SAMPLE)
    }
  }, [])

  return (
    <ProductContext.Provider value={{ products, setProducts }}>
      {children}
    </ProductContext.Provider>
  )
}

export function useProducts() {
  return useContext(ProductContext)
}