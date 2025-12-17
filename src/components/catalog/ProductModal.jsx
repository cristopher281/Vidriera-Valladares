import React from 'react'
import { Link } from 'react-router-dom'

export default function ProductModal({ product, onClose }) {
    if (!product) return null

    // Cerrar al hacer clic en el overlay
    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose()
        }
    }

    return (
        <div className="modal-overlay" onClick={handleOverlayClick}>
            <div className="modal-content">
                <button className="modal-close" onClick={onClose} aria-label="Cerrar">
                    ×
                </button>

                <div className="modal-body">
                    <div className="modal-image-container">
                        <img
                            src={product.img || 'https://via.placeholder.com/600x400?text=Vidrio'}
                            alt={product.name}
                            className="modal-image"
                        />
                    </div>

                    <div className="modal-details">
                        <h2>{product.name}</h2>

                        <div className="modal-category">
                            <span className="category-badge">{product.category}</span>
                        </div>

                        <p className="modal-description">{product.description}</p>

                        <div className="modal-info-grid">
                            <div className="info-item">
                                <span className="info-label">Precio</span>
                                <span className="info-value price">${product.price}</span>
                            </div>

                            <div className="info-item">
                                <span className="info-label">Disponibilidad</span>
                                <span
                                    className="info-value stock"
                                    style={{
                                        color: product.stock > 10
                                            ? '#16a34a'
                                            : product.stock > 0
                                                ? '#f59e0b'
                                                : '#ef4444'
                                    }}
                                >
                                    {product.stock > 0 ? `${product.stock} en stock` : 'Agotado'}
                                </span>
                            </div>
                        </div>

                        <div className="modal-actions">
                            <Link to="/presupuesto" className="btn btn-primary">
                                Obtener Presupuesto
                            </Link>
                            <button className="btn btn-secondary" onClick={onClose}>
                                Cerrar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
