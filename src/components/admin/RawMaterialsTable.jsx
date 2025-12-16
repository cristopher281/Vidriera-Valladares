import React, { useState } from 'react'
import { useRawMaterials } from '../../context/RawMaterialsContext'
import RawMaterialForm from './RawMaterialForm'

export default function RawMaterialsTable() {
    const { materials, deleteMaterial, updateMaterial, addMaterial } = useRawMaterials()
    const [editing, setEditing] = useState(null)

    const save = (m) => {
        if (m.id) updateMaterial(m.id, m)
        else addMaterial(m)
        setEditing(null)
    }

    const handleDelete = (material) => {
        if (window.confirm(`¿Eliminar "${material.name}"?`)) {
            deleteMaterial(material.id)
        }
    }

    const getStockBadge = (material) => {
        if (material.quantity === 0) return <span className="badge out">Agotado</span>
        if (material.quantity < material.minStock) return <span className="badge low">Bajo</span>
        return <span className="badge ok">Disponible</span>
    }

    return (
        <div className="fade-in">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h3 style={{ margin: 0 }}>Materiales Crudos</h3>
                <button className="btn" onClick={() => setEditing({})}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ display: 'inline', marginRight: 6 }}>
                        <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
                    </svg>
                    Nuevo Material
                </button>
            </div>

            {editing && (
                <div className="card fade-in" style={{ marginBottom: '1.5rem' }}>
                    <h4 style={{ marginTop: 0 }}>{editing.id ? 'Editar Material' : 'Nuevo Material'}</h4>
                    <RawMaterialForm initial={editing} onSave={save} onCancel={() => setEditing(null)} />
                </div>
            )}

            {materials.length === 0 ? (
                <div className="empty-state fade-in">
                    <div className="empty-state-icon">
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9l1.96 2.5H17V9.5h2.5zm-1.5 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
                        </svg>
                    </div>
                    <h3 style={{ color: 'var(--muted-2)' }}>No hay materiales</h3>
                    <p>Agrega tu primer material usando el botón "Nuevo Material"</p>
                </div>
            ) : (
                <div className="inventory-grid fade-in-stagger">
                    {materials.map(m => (
                        <div key={m.id} className="inventory-card fade-in">
                            <div className="inventory-thumb-wrap">
                                <div style={{
                                    width: '100%',
                                    height: '100%',
                                    background: 'linear-gradient(135deg, rgba(255,106,0,0.2), rgba(255,148,77,0.1))',
                                    borderRadius: '10px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'var(--accent)'
                                }}>
                                    <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z" />
                                    </svg>
                                </div>
                            </div>

                            <div className="inventory-info">
                                <div className="inventory-name">{m.name}</div>
                                <div className="inventory-meta">
                                    <span>{m.quantity} {m.unit}</span>
                                    <span>•</span>
                                    <span>Mín: {m.minStock}</span>
                                    <span>•</span>
                                    {getStockBadge(m)}
                                </div>
                                {m.category && (
                                    <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 4 }}>
                                        {m.category}
                                    </div>
                                )}
                            </div>

                            <div className="inventory-actions">
                                <button
                                    className="action-btn"
                                    onClick={() => setEditing(m)}
                                    title="Editar"
                                >
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
                                    </svg>
                                </button>
                                <button
                                    className="action-btn delete"
                                    onClick={() => handleDelete(m)}
                                    title="Eliminar"
                                >
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
