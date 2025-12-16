import React, { useEffect, useState } from 'react'
import { fileToBase64, compressImage } from '../../utils/storage'

export default function ProductForm({initial, onSave, onCancel}){
  const [form, setForm] = useState({name:'',price:0,stock:0,category:'Vidrio templado',description:'',img:''})

  useEffect(()=>{ if(initial) setForm(initial) },[initial])

  const handleFile = async (e) => {
    const f = e.target.files[0]
    if(!f) return
    const b = await fileToBase64(f)
    const compressed = await compressImage(b,800)
    setForm(prev=>({...prev,img:compressed}))
  }

  const submit = (e) => {
    e.preventDefault()
    onSave(form)
  }

  return (
    <form onSubmit={submit} style={{display:'grid',gap:8}}>
      <div>
        <label>Imagen</label><br />
        <input type="file" accept="image/*" onChange={handleFile} />
        {form.img && <img src={form.img} alt="preview" style={{width:120,marginTop:8}} />}
      </div>
      <input placeholder="Nombre" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} />
      <input type="number" placeholder="Precio" value={form.price} onChange={e=>setForm({...form,price:Number(e.target.value)})} />
      <input type="number" placeholder="Stock" value={form.stock} onChange={e=>setForm({...form,stock:Number(e.target.value)})} />
      <input placeholder="Categoría" value={form.category} onChange={e=>setForm({...form,category:e.target.value})} />
      <textarea placeholder="Descripción" value={form.description} onChange={e=>setForm({...form,description:e.target.value})} />
      <div style={{display:'flex',gap:8}}>
        <button className="btn" type="submit">Guardar</button>
        <button type="button" onClick={onCancel}>Cancelar</button>
      </div>
    </form>
  )
}
