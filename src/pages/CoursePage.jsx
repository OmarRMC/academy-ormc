import { useParams, Link, Navigate } from 'react-router-dom'
import { availableCount } from '../data/courses.js'
import { useCatalog } from '../data/CatalogProvider.jsx'
import SessionRow from '../components/SessionRow.jsx'
import Pill from '../components/ui/Pill.jsx'
import Badge from '../components/ui/Badge.jsx'
import TechLogos from '../components/ui/TechLogos.jsx'
import Seo from '../components/Seo.jsx'
import { site } from '../config/site.js'
import { ArrowLeft } from '../components/ui/Icons.jsx'

export default function CoursePage() {
  const { courseId } = useParams()
  const { getCourse, loading } = useCatalog()
  const course = getCourse(courseId)

  // Mientras carga el catálogo no decidimos nada (evita redirigir por error).
  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-5 py-20 text-center text-muted">
        Cargando curso…
      </div>
    )
  }

  if (!course) return <Navigate to="/" replace />

  const ready = availableCount(course)
  const total = course.sessions.length

  // Agrupar sesiones por módulo
  const modulos = course.sessions.reduce((acc, s) => {
    ;(acc[s.modulo] ||= []).push(s)
    return acc
  }, {})

  // Datos estructurados de Curso (Google Search puede mostrarlo como curso)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: course.title,
    description: course.resumen,
    inLanguage: 'es',
    url: `${site.url}/cursos/${course.id}`,
    provider: { '@type': 'Organization', name: site.brand, sameAs: site.url },
    instructor: { '@type': 'Person', name: site.instructor },
    teaches: course.stack,
  }

  return (
    <div className="max-w-5xl mx-auto px-5 py-12">
      <Seo title={course.title} description={course.resumen} path={`/cursos/${course.id}`} jsonLd={jsonLd} />
      <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-ink transition-colors">
        <ArrowLeft size={15} /> Todos los cursos
      </Link>

      {/* Cabecera del curso */}
      <header className="mt-5 mb-10">
        <div className="flex items-center gap-4 mb-4 flex-wrap">
          {course.logos?.length ? (
            <TechLogos logos={course.logos} size={32} />
          ) : (
            <span className="text-4xl">{course.icon}</span>
          )}
          <Badge tone={course.theme}>{course.short}</Badge>
          <Badge tone="muted">{course.nivel}</Badge>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold leading-tight">{course.title}</h1>
        <p className="mt-3 text-muted max-w-3xl">{course.resumen}</p>

        <div className="flex flex-wrap gap-1.5 mt-5">
          {course.stack.map((t) => (
            <Pill key={t}>{t}</Pill>
          ))}
        </div>

        <div className="flex items-center gap-5 mt-6 text-sm text-muted">
          <span>📅 {course.duracion}</span>
          <span>
            ✅ <span className="text-green font-semibold">{ready}</span> de {total} sesiones con material
          </span>
        </div>
      </header>

      {/* Sesiones por módulo */}
      <div className="space-y-8">
        {Object.entries(modulos).map(([modulo, sesiones]) => (
          <section key={modulo}>
            <h2 className="text-xs font-bold uppercase tracking-[2px] text-muted mb-3">
              Módulo {modulo}
            </h2>
            <div className="space-y-2.5">
              {sesiones.map((s) => (
                <SessionRow key={s.id} course={course} session={s} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
