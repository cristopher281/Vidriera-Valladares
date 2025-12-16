import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useRawMaterials } from '../../context/RawMaterialsContext'
import RawMaterialForm from './RawMaterialForm'

export default function RawMaterialsTable() {
    const { materials, deleteMaterial, updateMaterial, addMaterial } = useRawMaterials()
    const [editing, setEditing] = useState(null)
    const [searchTerm, setSearchTerm] = useState('')
    const [statusFilter, setStatusFilter] = useState('all')
    const [currentPage, setCurrentPage] = useState(1)
    const [searchParams, setSearchParams] = useSearchParams()
    const itemsPerPage = 5

    // Check URL params on mount and update filter
    useEffect(() => {
        const filterType = searchParams.get('filter')
        if (filterType === 'low-stock') {
            setStatusFilter('low')
        }
    }, [searchParams])

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

    const getStockStatus = (material) => {
        if (material.quantity === 0) return { label: 'Crítico', class: 'critical' }
        if (material.quantity < material.minStock) return { label: 'Bajo Stock', class: 'low' }
        return { label: 'Disponible', class: 'available' }
    }

    const getMaterialIcon = (name) => {
        const lowerName = name.toLowerCase()

        if (lowerName.includes('vidrio') || lowerName.includes('glass')) {
            return (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M7 2v2h10V2h2v2h1c1.1 0 2 .9 2 2v14c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2h1V2h2zm13 18V8H4v12h16z" />
                </svg>
            )
        }
        if (lowerName.includes('silicón') || lowerName.includes('silicon')) {
            return (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z" />
                </svg>
            )
        }
        if (lowerName.includes('aluminio') || lowerName.includes('perfil')) {
            return (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20 9V7c0-1.1-.9-2-2-2h-3c0-1.66-1.34-3-3-3S9 3.34 9 5H6c-1.1 0-2 .9-2 2v2c-1.66 0-3 1.34-3 3s1.34 3 3 3v4c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-4c1.66 0 3-1.34 3-3s-1.34-3-3-3z" />
                </svg>
            )
        }
        if (lowerName.includes('empaque') || lowerName.includes('hule')) {
            return (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <circle cx="12" cy="12" r="8" />
                </svg>
            )
        }

        return (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z" />
            </svg>
        )
    }

    // Filter materials
    const filteredMaterials = materials.filter(m => {
        const matchesSearch = m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (m.category && m.category.toLowerCase().includes(searchTerm.toLowerCase()))

        if (!matchesSearch) return false

        if (statusFilter === 'all') return true
        const status = getStockStatus(m)
        return status.class === statusFilter
    })

    const clearFilter = () => {
        setStatusFilter('all')
        setSearchParams({})
    }

    // Pagination
    const totalPages = Math.ceil(filteredMaterials.length / itemsPerPage)
    const startIndex = (currentPage - 1) * itemsPerPage
    const paginatedMaterials = filteredMaterials.slice(startIndex, startIndex + itemsPerPage)

    return (
        <div className="raw-materials-container fade-in">
            {/* Header */}
            <div className="raw-materials-header">
                <div>
                    <h2 style={{ margin: 0, fontSize: '28px', color: 'var(--accent)' }}>Lista de Materias Primas</h2>
                    <p style={{ margin: '8px 0 0', color: 'var(--muted)', fontSize: '14px' }}>
                        Manage your raw materials inventory, track stock levels, and update availability for production.
                    </p>
                </div>
                <button className="btn btn-icon" onClick={() => setEditing({})}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
                    </svg>
                    Nuevo Material
                </button>
            </div>

            {/* Form Modal */}
            {editing && (
                <div className="modal-backdrop" onClick={() => setEditing(null)}>
                    <div className="modal-card" onClick={e => e.stopPropagation()}>
                        <h3 style={{ marginTop: 0 }}>{editing.id ? 'Editar Material' : 'Nuevo Material'}</h3>
                        <RawMaterialForm initial={editing} onSave={save} onCancel={() => setEditing(null)} />
                    </div>
                </div>
            )}

            {/* Filter Active Indicator */}
            {searchParams.get('filter') === 'low-stock' && (
                <div className="card fade-in" style={{ marginBottom: '1.5rem', padding: '1rem', background: 'linear-gradient(135deg,rgba(251,191,36,0.1),rgba(245,158,11,0.05))', border: '1px solid rgba(251,191,36,0.3)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="#fbbf24">
                                <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" />
                            </svg>
                            <span style={{ color: '#fbbf24', fontWeight: 600 }}>Mostrando solo materiales con bajo stock</span>
                        </div>
                        <button className="btn-secondary" onClick={clearFilter} style={{ padding: '6px 12px', fontSize: 14 }}>
                            Mostrar Todos
                        </button>
                    </div>
                </div>
            )}

            {/* Search and Filters */}
            <div className="table-controls">
                <div className="search-box">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                    </svg>
                    <input
                        type="text"
                        placeholder="Search by material name or SKU..."
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        className="input-search"
                    />
                </div>
                <div className="filter-controls">
                    <select
                        className="select-filter"
                        value={statusFilter}
                        onChange={e => setStatusFilter(e.target.value)}
                    >
                        <option value="all">All Statuses</option>
                        <option value="available">Disponible</option>
                        <option value="low">Bajo Stock</option>
                        <option value="critical">Crítico</option>
                    </select>
                    <button className="btn-filter">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z" />
                        </svg>
                        Filter
                    </button>
                </div>
            </div>

            {/* Table */}
            {filteredMaterials.length === 0 ? (
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
                <>
                    <div className="materials-table-wrapper">
                        <table className="materials-table">
                            <thead>
                                <tr className="table-header-row">
                                    <th style={{ width: '40%' }}>NOMBRE MATERIAL</th>
                                    <th style={{ width: '15%' }}>SKU</th>
                                    <th style={{ width: '12%' }}>CANTIDAD ACTUAL</th>
                                    <th style={{ width: '12%' }}>STOCK MÍNIMO</th>
                                    <th style={{ width: '12%' }}>ESTADO</th>
                                    <th style={{ width: '9%' }}>ACCIONES</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedMaterials.map(m => {
                                    const status = getStockStatus(m)
                                    return (
                                        <tr key={m.id} className="table-row fade-in">
                                            <td>
                                                <div className="material-cell">
                                                    <div className="material-icon">
                                                        {getMaterialIcon(m.name)}
                                                    </div>
                                                    <div>
                                                        <div className="material-name">{m.name}</div>
                                                        <div className="material-updated">Last updated: Oct 24, 2023</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="sku-cell">{m.category || 'N/A'}</td>
                                            <td className="quantity-cell">{m.quantity} {m.unit}</td>
                                            <td className="min-stock-cell">{m.minStock} {m.unit}</td>
                                            <td>
                                                <span className={`status-badge status-${status.class}`}>
                                                    {status.label}
                                                </span>
                                            </td>
                                            <td>
                                                <div className="action-buttons">
                                                    <button
                                                        className="icon-btn edit-btn"
                                                        onClick={() => setEditing(m)}
                                                        title="Editar"
                                                    >
                                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                                            <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
                                                        </svg>
                                                    </button>
                                                    <button
                                                        className="icon-btn delete-btn"
                                                        onClick={() => handleDelete(m)}
                                                        title="Eliminar"
                                                    >
                                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                                            <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="pagination-container">
                        <div className="pagination-info">
                            Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredMaterials.length)} of {filteredMaterials.length} results
                        </div>
                        <div className="pagination-controls">
                            <button
                                className="pagination-btn"
                                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                                disabled={currentPage === 1}
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
                                </svg>
                            </button>

                            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                <button
                                    key={page}
                                    className={`pagination-btn ${page === currentPage ? 'active' : ''}`}
                                    onClick={() => setCurrentPage(page)}
                                >
                                    {page}
                                </button>
                            ))}

                            <button
                                className="pagination-btn"
                                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                                disabled={currentPage === totalPages}
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}
