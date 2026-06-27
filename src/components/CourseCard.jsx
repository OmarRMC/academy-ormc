import { Link } from 'react-router-dom'
import Pill from './ui/Pill.jsx'
import Badge from './ui/Badge.jsx'
import TechLogos from './ui/TechLogos.jsx'
import { availableCount } from '../data/courses.js'

// Acento visual por curso
const accent = {
  react: { ring: 'hover:border-react/50', glow: 'group-hover:text-react', dot: 'text-react' },
  laravel: { ring: 'hover:border-laravel/50', glow: 'group-hover:text-laravel', dot: 'text-laravel' },
}

export default function CourseCard({ course }) {
  const a = accent[course.theme] || accent.react
  const total = course.sessions.length
  const ready = availableCount(course)

  return (
    <Link
      to={`/cursos/${course.id}`}
      className={`group ui-card p-6 flex flex-col transition-colors ${a.ring}`}
    >
      <div className="flex items-center justify-between mb-4">
        {course.logos?.length ? (
          <TechLogos logos={course.logos} size={26} />
        ) : (
          <span className={`text-4xl ${a.dot}`}>{course.icon}</span>
        )}
        <Badge tone={course.theme}>{course.short}</Badge>
      </div>

      <h3 className={`text-xl font-bold leading-snug transition-colors ${a.glow}`}>
        {course.title}
      </h3>
      <p className="text-muted text-sm mt-2 flex-1">{course.resumen}</p>

      <div className="flex flex-wrap gap-1.5 mt-4">
        {course.stack.slice(0, 5).map((t) => (
          <Pill key={t}>{t}</Pill>
        ))}
      </div>

      <div className="flex items-center justify-between mt-5 pt-4 border-t border-white/10 text-sm">
        <span className="text-muted">{course.duracion}</span>
        <span className="font-semibold">
          <span className="text-green">{ready}</span>
          <span className="text-muted"> / {total} disponibles</span>
        </span>
      </div>
    </Link>
  )
}
