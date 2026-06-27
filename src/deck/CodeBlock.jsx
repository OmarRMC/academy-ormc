import { useRef, useState } from 'react'

// Bloque de código con resaltado por tokens y botón "Copiar" (estilo GitHub)
// en la esquina superior derecha.
// Se pasa el código como string HTML con spans .tok-* (key/fn/str/com/tag/attr/num).
export default function CodeBlock({ html }) {
  const codeRef = useRef(null)
  const [copied, setCopied] = useState(false)

  const handleCopy = async (e) => {
    e.stopPropagation() // no avanzar la diapositiva al pulsar
    const el = codeRef.current
    if (!el) return
    // textContent decodifica entidades (&lt;, &nbsp;…) y descarta los <span>.
    // Convertimos los espacios no separables ( ) en espacios normales.
    const text = el.innerText || el.textContent || ''
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text)
      } else {
        // Respaldo para contextos no seguros
        const ta = document.createElement('textarea')
        ta.value = text
        ta.style.position = 'fixed'
        ta.style.opacity = '0'
        document.body.appendChild(ta)
        ta.select()
        document.execCommand('copy')
        document.body.removeChild(ta)
      }
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch {
      /* sin permisos de portapapeles */
    }
  }

  return (
    <div className="deck-code">
      <button
        type="button"
        className={`deck-copy-btn${copied ? ' copied' : ''}`}
        onClick={handleCopy}
        title={copied ? 'Copiado' : 'Copiar código'}
        aria-label="Copiar código"
      >
        {copied ? (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6 9 17l-5-5" />
          </svg>
        ) : (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
            <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
          </svg>
        )}
        <span>{copied ? 'Copiado' : 'Copiar'}</span>
      </button>
      <pre>
        <code ref={codeRef} dangerouslySetInnerHTML={{ __html: html }} />
      </pre>
    </div>
  )
}
