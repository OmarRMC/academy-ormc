import { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { site } from '../config/site.js'
import { ArrowLeft, ArrowRight } from '../components/ui/Icons.jsx'
import './deck.css'

// Logo/marca en una esquina de cada diapositiva.
// Prioriza el logo propio del curso (course.deckLogo); si no, usa el global
// (config/site.js). Así, p. ej., las diapositivas de React usan su propio logo.
function DeckLogo({ course }) {
  const logo = course?.deckLogo || site.logo
  if (!logo || logo.enabled === false) return null
  const src = logo.src ? import.meta.env.BASE_URL.replace(/\/$/, '') + logo.src : ''
  return (
    <div className="deck-logo" aria-label={logo.alt}>
      {src ? <img src={src} alt={logo.alt} /> : <span className="deck-logo-text">{logo.text}</span>}
    </div>
  )
}

// Logo de Laravel (imagen) reutilizado en portadas/cierre del curso Laravel.
export function LaravelLogo({ className = 'logo-laravel' }) {
  const src = import.meta.env.BASE_URL.replace(/\/$/, '') + '/img/tech/laravel.svg'
  return <img className={className} src={src} alt="Laravel" />
}

// Logo de React en SVG (reutilizado en portadas)
export function ReactLogo({ className = 'logo-react', spin = '9s' }) {
  return (
    <svg
      className={className}
      style={{ animationDuration: spin }}
      viewBox="-11.5 -10.23 23 20.46"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle r="2.05" fill="#61DAFB" />
      <g stroke="#61DAFB" strokeWidth="1" fill="none">
        <ellipse rx="11" ry="4.2" />
        <ellipse rx="11" ry="4.2" transform="rotate(60)" />
        <ellipse rx="11" ry="4.2" transform="rotate(120)" />
      </g>
    </svg>
  )
}

/**
 * Motor de presentación reutilizable.
 * @param {React.ReactNode[]} slides  contenido de cada diapositiva
 * @param {object} course             curso (para la marca del pie)
 * @param {object} session            sesión (para volver con ESC)
 */
export default function Deck({ slides = [], course, session }) {
  const navigate = useNavigate()
  const total = slides.length

  // Índice inicial desde el hash (#3 = diapositiva 3) para enlaces profundos
  const initial = (() => {
    const h = parseInt((window.location.hash || '').replace('#', ''), 10)
    return Number.isFinite(h) && h >= 1 && h <= total ? h - 1 : 0
  })()
  const [current, setCurrent] = useState(initial)

  const go = useCallback(
    (n) => {
      setCurrent((prev) => {
        const next = Math.max(0, Math.min(total - 1, typeof n === 'function' ? n(prev) : n))
        window.location.hash = String(next + 1)
        return next
      })
    },
    [total],
  )

  const next = useCallback(() => go((p) => p + 1), [go])
  const prev = useCallback(() => go((p) => p - 1), [go])

  const exit = useCallback(() => {
    if (document.fullscreenElement) document.exitFullscreen().catch(() => {})
    navigate(course ? `/cursos/${course.id}` : '/')
  }, [navigate, course])

  const toggleFullscreen = useCallback(() => {
    if (document.fullscreenElement) document.exitFullscreen().catch(() => {})
    else document.documentElement.requestFullscreen().catch(() => {})
  }, [])

  // Teclado
  useEffect(() => {
    const onKey = (e) => {
      switch (e.key) {
        case 'ArrowRight':
        case 'PageDown':
        case ' ':
          e.preventDefault()
          next()
          break
        case 'ArrowLeft':
        case 'PageUp':
          e.preventDefault()
          prev()
          break
        case 'Home':
          go(0)
          break
        case 'End':
          go(total - 1)
          break
        case 'f':
        case 'F':
          toggleFullscreen()
          break
        case 'Escape':
          // Si está en fullscreen, el navegador lo cierra primero; si no, volvemos al curso
          if (!document.fullscreenElement) exit()
          break
        default:
          break
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [next, prev, go, total, toggleFullscreen, exit])

  // Clic en los laterales para avanzar/retroceder (ignora enlaces/botones).
  // En pantallas táctiles se desactiva: ahí se usan swipe y los botones ‹/›,
  // para no pelear con el scroll vertical de la diapositiva.
  const down = useRef(null)
  const onMouseDown = (e) => {
    down.current = { x: e.clientX, y: e.clientY }
  }
  const onClick = (e) => {
    if (e.target.closest('a, button')) return
    if (window.matchMedia('(pointer: coarse)').matches) return
    // Si el usuario seleccionó texto, NO cambiar de diapositiva.
    if (!window.getSelection().isCollapsed) return
    // Si arrastró el mouse (gesto de selección), tampoco cambiar.
    if (down.current) {
      const dx = e.clientX - down.current.x
      const dy = e.clientY - down.current.y
      down.current = null
      if (Math.abs(dx) > 6 || Math.abs(dy) > 6) return
    }
    if (e.clientX > window.innerWidth * 0.5) next()
    else prev()
  }

  // Swipe horizontal (táctil): si el desplazamiento en X supera el umbral y es
  // claramente mayor que el vertical, cambia de diapositiva (no interfiere con el scroll).
  const touch = useRef(null)
  const onTouchStart = (e) => {
    const t = e.changedTouches[0]
    touch.current = { x: t.clientX, y: t.clientY }
  }
  const onTouchEnd = (e) => {
    if (!touch.current) return
    const t = e.changedTouches[0]
    const dx = t.clientX - touch.current.x
    const dy = t.clientY - touch.current.y
    touch.current = null
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) {
      if (dx < 0) next()
      else prev()
    }
  }

  return (
    <div
      className="deck-root"
      data-theme={course?.theme}
      onMouseDown={onMouseDown}
      onClick={onClick}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div className="deck-progress" style={{ width: `${((current + 1) / total) * 100}%` }} />

      <DeckLogo course={course} />

      <div className="deck-stage">
        {slides.map((node, i) => (
          <div key={i} className={`deck-slide${i === current ? ' is-active' : ''}${node?.props?.center ? ' center' : ''}`}>
            {node}
          </div>
        ))}
      </div>

      <div className="deck-foot">
        <div className="brand">
          <button className="deck-btn" onClick={exit} title="Volver al curso (Esc)">
            ✕ Salir
          </button>
          <span>{course?.short || 'Taller'} · Sesión {session?.n}</span>
        </div>
        <div className="flex items-center" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <button className="deck-btn" onClick={toggleFullscreen} title="Pantalla completa (F)">
            ⛶ <span className="deck-fs-label">Pantalla completa</span>
          </button>
          <span className="counter">
            {current + 1} / {total}
          </span>
        </div>
      </div>

      <button
        className="deck-nav-btn prev"
        onClick={prev}
        disabled={current === 0}
        aria-label="Diapositiva anterior"
      >
        <ArrowLeft size={22} />
      </button>
      <button
        className="deck-nav-btn next"
        onClick={next}
        disabled={current === total - 1}
        aria-label="Diapositiva siguiente"
      >
        <ArrowRight size={22} />
      </button>

      <div className="deck-hint">
        <span className="deck-kbd"><ArrowLeft size={12} /></span> <span className="deck-kbd"><ArrowRight size={12} /></span> o barra espaciadora para
        navegar · <span className="deck-kbd">F</span> pantalla completa · <span className="deck-kbd">Esc</span> salir
      </div>
    </div>
  )
}
