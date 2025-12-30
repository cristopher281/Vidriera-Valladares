import React, { useState, useEffect } from 'react'

export default function ShareQR() {
  const [open, setOpen] = useState(false)
  const size = 300
  const url =  'https://vidriera-valladares-wx4w.vercel.app'
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(
    url
  )}`
  const [svgDataUrl, setSvgDataUrl] = useState(null)

  useEffect(() => {
    if (!open) {
      setSvgDataUrl(null)
      return
    }

    let cancelled = false

    ;(async () => {
      try {
        const moduleName = ['q', 'r', 'co', 'de'].join('')
        const qrcode = await import(moduleName)
        const svgString = await qrcode.toString(url, { type: 'svg', errorCorrectionLevel: 'H', margin: 1 })
        const grad = `<defs><linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#06b6d4"/><stop offset="100%" stop-color="#7c3aed"/></linearGradient></defs>`
        const svgWithDef = svgString.replace(/<svg([^>]*)>/, `<svg$1>${grad}`)
        const svgStyled = svgWithDef.replace(/fill="#[0-9a-fA-F]{3,6}"/g, 'fill="url(#grad1)"')
        if (!cancelled) setSvgDataUrl('data:image/svg+xml;utf8,' + encodeURIComponent(svgStyled))
      } catch (e) {
        // si falla (no instalado), dejamos svgDataUrl en null para usar la API externa
        console.warn('qrcode lib not available, using external API', e)
        if (!cancelled) setSvgDataUrl(null)
      }
    })()

    return () => {
      cancelled = true
    }
  }, [open, url])

  const downloadQR = async () => {
    try {
      const res = await fetch(qrUrl)
      const blob = await res.blob()
      const blobUrl = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = blobUrl
      a.download = 'vidrieria-qr.png'
      document.body.appendChild(a)
      a.click()
      a.remove()
      URL.revokeObjectURL(blobUrl)
    } catch (e) {
      console.error('Error descargando QR', e)
      alert('No se pudo descargar el QR. Intenta copiarlo o recargar la página.')
    }
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: document.title, url })
      } catch (err) {
        // usuario canceló o error
      }
    } else {
      // copia al portapapeles
      try {
        await navigator.clipboard.writeText(url)
        alert('URL copiada al portapapeles')
      } catch (e) {
        alert('No se pudo copiar la URL. Por favor selecciona y copia manualmente.')
      }
    }
  }

  return (
    <div style={{ display: 'inline-block' }}>
      <button className="btn" onClick={() => setOpen(true)} aria-label="Compartir sitio">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 12v7a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-7" />
          <polyline points="16 6 12 2 8 6" />
          <line x1="12" y1="2" x2="12" y2="15" />
        </svg>
      </button>

      {open && (
        <div style={{ position: 'fixed', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999 }}>
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)' }} onClick={() => setOpen(false)} />
          <div style={{ background: 'white', padding: 20, borderRadius: 8, boxShadow: '0 8px 30px rgba(0,0,0,0.2)', zIndex: 10000, width: 'min(92vw,420px)', textAlign: 'center' }}>
            <h3 style={{ marginTop: 0 }}>Compartir este sitio</h3>
            <img src={svgDataUrl || qrUrl} alt="QR del sitio" style={{ width: '100%', maxWidth: 300, height: 'auto', marginBottom: 12 }} />
            <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
              <button className="btn" onClick={downloadQR}>Descargar</button>
              <button className="btn" onClick={handleShare}>Compartir / Copiar</button>
              <button className="btn" onClick={() => setOpen(false)}>Cerrar</button>
            </div>
            <p style={{ fontSize: 12, color: '#666', marginTop: 10 }}>Escanea el QR o comparte la URL directamente.</p>
          </div>
        </div>
      )}
    </div>
  )
}
