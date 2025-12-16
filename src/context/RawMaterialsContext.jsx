/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useEffect, useState } from 'react'
import { loadFromStorage, saveToStorage } from '../utils/storage'

const RawMaterialsContext = createContext()

const SAMPLE = [
    {
        id: 'm1',
        name: 'Vidrio templado 6mm',
        category: 'Vidrio',
        quantity: 50,
        unit: 'láminas',
        minStock: 20,
        description: 'Láminas de vidrio templado transparente de 6mm'
    },
    {
        id: 'm2',
        name: 'Aluminio natural',
        category: 'Aluminio',
        quantity: 150,
        unit: 'metros',
        minStock: 50,
        description: 'Perfil de aluminio natural para marcos'
    },
    {
        id: 'm3',
        name: 'Vidrio laminado 10mm',
        category: 'Vidrio',
        quantity: 8,
        unit: 'láminas',
        minStock: 10,
        description: 'Láminas de vidrio laminado de seguridad'
    },
    {
        id: 'm4',
        name: 'Aluminio negro',
        category: 'Aluminio',
        quantity: 80,
        unit: 'metros',
        minStock: 40,
        description: 'Perfil de aluminio acabado negro'
    },
    {
        id: 'm5',
        name: 'Vidrio espejo 4mm',
        category: 'Vidrio',
        quantity: 15,
        unit: 'láminas',
        minStock: 10,
        description: 'Láminas de vidrio espejo de 4mm'
    },
    {
        id: 'm6',
        name: 'Silicón para vidrio',
        category: 'Accesorios',
        quantity: 25,
        unit: 'unidades',
        minStock: 15,
        description: 'Tubos de silicón sellador para instalación'
    }
]

export function RawMaterialsProvider({ children }) {
    const [materials, setMaterials] = useState(() => {
        return loadFromStorage('vv_raw_materials', SAMPLE)
    })

    useEffect(() => {
        saveToStorage('vv_raw_materials', materials)
    }, [materials])

    const addMaterial = (m) => {
        const item = { ...m, id: m.id || ('m' + Date.now()) }
        setMaterials(prev => [item, ...prev])
    }

    const updateMaterial = (id, patch) => {
        setMaterials(prev => prev.map(it => it.id === id ? { ...it, ...patch } : it))
    }

    const deleteMaterial = (id) => {
        setMaterials(prev => prev.filter(it => it.id !== id))
    }

    const search = (q) => {
        if (!q) return materials
        const s = q.toLowerCase()
        return materials.filter(m =>
            m.name.toLowerCase().includes(s) ||
            (m.description || '').toLowerCase().includes(s) ||
            (m.category || '').toLowerCase().includes(s)
        )
    }

    const lowStock = materials.filter(m => m.quantity < (m.minStock || 0))

    return (
        <RawMaterialsContext.Provider value={{ materials, addMaterial, updateMaterial, deleteMaterial, search, lowStock }}>
            {children}
        </RawMaterialsContext.Provider>
    )
}

export const useRawMaterials = () => useContext(RawMaterialsContext)
