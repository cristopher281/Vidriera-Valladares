import React, { useEffect, useState, useRef } from 'react'
import { fileToBase64, compressImage } from '../../utils/storage'

export default function ProductForm({initial, onSave, onCancel}){
  const [form, setForm] = useState({name:'',price:0,stock:0,category:'Vidrio templado',description:'',img:''})
  const [dragOver, setDragOver] = useState(false)
  const fileInputRef = useRef()

  useEffect(()=>{ if(initial) setForm(initial) },[initial])

  const handleFileObject = async (f) => {
    if(!f) return
    const b = await fileToBase64(f)
    const compressed = await compressImage(b,800)
    setForm(prev=>({...prev,img:compressed}))
  }

  const handleFile = async (e) => {
    const f = e.target.files && e.target.files[0]
    await handleFileObject(f)
  }

  const onDrop = async (e) => {
    e.preventDefault(); setDragOver(false)
    const f = e.dataTransfer.files && e.dataTransfer.files[0]
    await handleFileObject(f)
  }

  const submit = (e) => {
    e.preventDefault()
    // normalize numeric fields
    const payload = {...form, price: Number(form.price||0), stock: Number(form.stock||0)}
    onSave(payload)
  }

  return (
    <form onSubmit={submit} style={{display:'grid',gap:8}}>
      <div>
        <label>Imagen</label>
        <div
          onDragOver={(e)=>{e.preventDefault(); setDragOver(true)}}
          onDragLeave={()=>setDragOver(false)}
          onDrop={onDrop}
          onClick={()=>fileInputRef.current && fileInputRef.current.click()}
          style={{border: `2px dashed ${dragOver? 'var(--accent)': 'rgba(255,255,255,0.06)'}`, padding:12, borderRadius:8, cursor:'pointer', display:'flex',alignItems:'center',gap:12}}
        >
          <div style={{flex:1,color:'var(--muted)'}}>{form.img? 'Haz clic o arrastra para reemplazar la imagen' : 'Arrastra una imagen aquí o haz clic para subir'}</div>
          <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFile} style={{display:'none'}} />
        </div>
        {form.img && <img src={form.img} alt="preview" style={{width:160,marginTop:8,borderRadius:6}} />}
      </div>
      <input placeholder="Nombre" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} />
      <input type="number" placeholder="Precio" value={form.price} onChange={e=>setForm({...form,price:e.target.value})} />
      <input type="number" placeholder="Stock" value={form.stock} onChange={e=>setForm({...form,stock:e.target.value})} />
      <input placeholder="Categoría" value={form.category} onChange={e=>setForm({...form,category:e.target.value})} />
      <textarea placeholder="Descripción" value={form.description} onChange={e=>setForm({...form,description:e.target.value})} />
      <div style={{display:'flex',gap:8}}>
        <button className="btn" type="submit">Guardar</button>
        <button type="button" onClick={onCancel}>Cancelar</button>
      </div>
    </form>
  )
}
