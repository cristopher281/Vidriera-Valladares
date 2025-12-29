/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useEffect, useState } from 'react'
import { subscribeToCollection, addDocument, updateDocument, deleteDocument } from '../firebase/firestore'
import { migrateToFirestore, resetMigrationFlag } from '../utils/migrateToFirestore'
import { NEW_PRODUCTS } from '../data/products'

const ProductContext = createContext()

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let unsubscribe = null

    const initializeProducts = async () => {
      try {
        // Intentar migrar datos de localStorage a Firestore
        await migrateToFirestore('products', 'vv_products', NEW_PRODUCTS)

        // Suscribirse a cambios en tiempo real
        unsubscribe = subscribeToCollection('products', (data) => {
          setProducts(data)
          setLoading(false)
        })
      } catch (err) {
        console.error('Error initializing products:', err)
        setError(err.message)
        setLoading(false)
      }
    }

    initializeProducts()

    // Cleanup: desuscribirse cuando el componente se desmonte
    return () => {
      if (unsubscribe) unsubscribe()
    }
  }, [])

  const addProduct = async (p) => {
    try {
      const { id, ...productData } = p // Remover id si existe, Firestore genera su propio ID
      await addDocument('products', productData)
      // No necesitamos actualizar el estado local, el listener lo hará automáticamente
    } catch (err) {
      console.error('Error adding product:', err)
      throw err
    }
  }

  const updateProduct = async (id, patch) => {
    try {
      await updateDocument('products', id, patch)
      // No necesitamos actualizar el estado local, el listener lo hará automáticamente
    } catch (err) {
      console.error('Error updating product:', err)
      throw err
    }
  }

  const deleteProduct = async (id) => {
    try {
      await deleteDocument('products', id)
      // No necesitamos actualizar el estado local, el listener lo hará automáticamente
    } catch (err) {
      console.error('Error deleting product:', err)
      throw err
    }
  }

  const search = (q) => {
    if (!q) return products
    const s = q.toLowerCase()
    return products.filter(p => p.name.toLowerCase().includes(s) || (p.description || '').toLowerCase().includes(s))
  }

  const lowStock = products.filter(p => p.stock < 10)

  const toggleFeatured = async (id) => {
    try {
      const product = products.find(p => p.id === id)
      if (product) {
        await updateDocument('products', id, { featured: !product.featured })
      }
    } catch (err) {
      console.error('Error toggling featured:', err)
      throw err
    }
  }

  const getFeaturedProducts = () => {
    return products.filter(p => p.featured === true)
  }

  return (
    <ProductContext.Provider value={{
      products,
      addProduct,
      updateProduct,
      deleteProduct,
      search,
      lowStock,
      toggleFeatured,
      getFeaturedProducts,
      loading,
      error
    }}>
      {children}
    </ProductContext.Provider>
  )
}

export const useProducts = () => useContext(ProductContext)