import React, { useState } from 'react'

export default function SearchBar({onSearch}){
  const [q,setQ] = useState('')
  return (
    <div style={{display:'flex',gap:8,margin:'1rem 0'}}>
      <input placeholder="Buscar productos..." value={q} onChange={e=>setQ(e.target.value)} style={{flex:1,padding:8,borderRadius:8}} />
      <button className="btn" onClick={()=>onSearch(q)}>Buscar</button>
    </div>
  )
}
