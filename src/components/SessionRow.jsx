import { Link } from 'react-router-dom'
import Pill from './ui/Pill.jsx'
import { ArrowRight } from './ui/Icons.jsx'
import { isOpenable, statusMeta } from '../data/sessionStatus.js'

// Fila de una sesión dentro de la página de curso.
// El estado (`status`) decide la etiqueta; el `deck`, si abre el visor.
export default function SessionRow({ course, session }) {
  const openable = isOpenable(session)
  const meta = statusMeta(session.status) // { label, tone }
  const accentText = course.theme === 'laravel' ? 'text-laravel' : 'text-react'

  const inner = (
    <div className="flex items-center gap-4 w-full">
      {/* Número de sesión */}
      <div
        className={`shrink-0 w-12 h-12 rounded-xl grid place-items-center font-extrabold text-lg
          ${openable ? `bg-white/5 ${accentText}` : 'bg-white/5 text-muted'}`}
      >
        {String(session.n).padStart(2, '0')}
      </div>

      {/* Título + descripción + temas */}
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-muted">
            Módulo {session.modulo}
          </span>
        </div>
        <h4 className="font-semibold leading-snug truncate">{session.title}</h4>
        {session.descripcion && (
          <p className="text-sm text-muted mt-0.5 line-clamp-2">{session.descripcion}</p>
        )}
        <div className="hidden sm:flex flex-wrap gap-1.5 mt-1.5">
          {session.topics.map((t) => (
            <Pill key={t}>{t}</Pill>
          ))}
        </div>
      </div>

      {/* Estado / acción — etiqueta derivada del status */}
      <div className="shrink-0">
        {openable ? (
          <span className={`inline-flex items-center gap-1.5 font-semibold ${accentText}`}>
            {meta.label} <ArrowRight size={16} />
          </span>
        ) : (
          <span className="text-xs font-semibold text-muted border border-white/10 rounded-full px-3 py-1">
            {meta.label}
          </span>
        )}
      </div>
    </div>
  )

  const base =
    'ui-card px-4 py-3.5 flex items-center transition-colors'

  return openable ? (
    <Link
      to={`/cursos/${course.id}/${session.id}`}
      className={`${base} hover:border-white/25`}
    >
      {inner}
    </Link>
  ) : (
    <div className={`${base} opacity-70`}>{inner}</div>
  )
}
