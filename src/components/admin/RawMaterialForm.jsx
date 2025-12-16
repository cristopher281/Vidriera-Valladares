import React, { useEffect, useState } from 'react'

export default function RawMaterialForm({ initial, onSave, onCancel }) {
    const [form, setForm] = useState({
        name: '',
        category: 'Vidrio',
        quantity: 0,
        unit: 'láminas',
        minStock: 10,
        description: ''
    })

    useEffect(() => {
        if (initial) setForm(initial)
    }, [initial])

    const submit = (e) => {
        e.preventDefault()
        const payload = {
            ...form,
            quantity: Number(form.quantity || 0),
            minStock: Number(form.minStock || 0)
        }
        onSave(payload)
    }

    return (
        <form onSubmit={submit}>
            <div className="form-section">
                <div className="form-section-title">Información del Material</div>

                <div className="form-group">
                    <label className="form-label">Nombre del Material</label>
                    <input
                        className="input"
                        placeholder="Ej: Vidrio templado 6mm, Aluminio natural"
                        value={form.name}
                        onChange={e => setForm({ ...form, name: e.target.value })}
                        required
                    />
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label className="form-label">Categoría</label>
                        <select
                            className="input"
                            value={form.category}
                            onChange={e => setForm({ ...form, category: e.target.value })}
                        >
                            <option value="Vidrio">Vidrio</option>
                            <option value="Aluminio">Aluminio</option>
                            <option value="Accesorios">Accesorios</option>
                            <option value="Herrajes">Herrajes</option>
                            <option value="Selladores">Selladores</option>
                            <option value="Otro">Otro</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label className="form-label">Unidad</label>
                        <select
                            className="input"
                            value={form.unit}
                            onChange={e => setForm({ ...form, unit: e.target.value })}
                        >
                            <option value="láminas">Láminas</option>
                            <option value="metros">Metros</option>
                            <option value="kilogramos">Kilogramos</option>
                            <option value="unidades">Unidades</option>
                            <option value="litros">Litros</option>
                        </select>
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label className="form-label">Cantidad</label>
                        <input
                            className="input"
                            type="number"
                            placeholder="0"
                            value={form.quantity}
                            onChange={e => setForm({ ...form, quantity: e.target.value })}
                            min="0"
                            step="0.01"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Stock Mínimo</label>
                        <input
                            className="input"
                            type="number"
                            placeholder="10"
                            value={form.minStock}
                            onChange={e => setForm({ ...form, minStock: e.target.value })}
                            min="0"
                            step="0.01"
                            required
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label className="form-label">Descripción</label>
                    <textarea
                        className="textarea"
                        placeholder="Describe el material, características, notas especiales..."
                        value={form.description}
                        onChange={e => setForm({ ...form, description: e.target.value })}
                        rows="4"
                    />
                </div>
            </div>

            <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
                <button type="button" className="btn-secondary" onClick={onCancel}>
                    Cancelar
                </button>
                <button className="btn" type="submit">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ display: 'inline', marginRight: 6 }}>
                        <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" />
                    </svg>
                    Guardar
                </button>
            </div>
        </form>
    )
}
