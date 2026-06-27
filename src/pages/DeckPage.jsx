import { useEffect, useState } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { getCourse, getSession, isAvailable } from '../data/courses.js'
import Deck from '../deck/Deck.jsx'
import Seo from '../components/Seo.jsx'
import { ArrowLeft } from '../components/ui/Icons.jsx'

export default function DeckPage() {
  const { courseId, sessionId } = useParams()
  const course = getCourse(courseId)
  const session = getSession(courseId, sessionId)

  const [slides, setSlides] = useState(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    let alive = true
    if (isAvailable(session)) {
      session
        .deck()
        .then((mod) => {
          if (alive) setSlides(mod.slides || [])
        })
        .catch(() => alive && setError(true))
    }
    return () => {
      alive = false
    }
  }, [session])

  // Curso/sesión inexistentes
  if (!course || !session) return <Navigate to="/" replace />

  // Sesión sin material todavía o deshabilitada
  if (!isAvailable(session)) {
    return (
      <CenteredMessage
        title="Diapositivas en preparación"
        body={`La sesión ${session.n} - "${session.title}" aún no tiene material publicado.`}
        course={course}
      />
    )
  }

  if (error) {
    return (
      <CenteredMessage
        title="No se pudo cargar la presentación"
        body="Ocurrió un error al cargar las diapositivas de esta sesión."
        course={course}
      />
    )
  }

  if (!slides) {
    return (
      <div className="fixed inset-0 grid place-items-center bg-bg text-muted">
        <p>Cargando presentación…</p>
      </div>
    )
  }

  return (
    <>
      <Seo
        title={`${course.short} · Sesión ${session.n}: ${session.title}`}
        description={`Diapositivas de la sesión ${session.n} del curso ${course.title}: ${session.topics.join(', ')}.`}
        path={`/cursos/${course.id}/${session.id}`}
        type="article"
      />
      <Deck slides={slides} course={course} session={session} />
    </>
  )
}

function CenteredMessage({ title, body, course }) {
  return (
    <div className="fixed inset-0 grid place-items-center bg-bg px-6 text-center">
      <div className="max-w-md">
        <div className="text-5xl mb-4">🛠️</div>
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="mt-3 text-muted">{body}</p>
        <Link
          to={`/cursos/${course.id}`}
          className="inline-flex items-center gap-1.5 mt-6 rounded-lg border border-white/15 px-4 py-2 text-ink hover:border-react/50 hover:text-react transition-colors"
        >
          <ArrowLeft size={16} /> Volver al curso
        </Link>
      </div>
    </div>
  )
}
