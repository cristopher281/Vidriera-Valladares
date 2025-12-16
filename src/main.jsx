import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { ProductProvider } from './context/ProductContext'
import { RawMaterialsProvider } from './context/RawMaterialsContext'
import './styles/index.css'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ProductProvider>
        <RawMaterialsProvider>
          <App />
        </RawMaterialsProvider>
      </ProductProvider>
    </BrowserRouter>
  </React.StrictMode>
)
