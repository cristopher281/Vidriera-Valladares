import React from 'react'

const CATS = ['Todo','Vidrio templado','Vidrio laminado','Espejos','Mamparas','Vidrio y Herraje']

export default function CategoryFilter({value,onChange}){
  return (
    <select value={value} onChange={e=>onChange(e.target.value)} style={{padding:8,borderRadius:8}}>
      {CATS.map(c=> <option key={c} value={c}>{c}</option>)}
    </select>
  )
}
