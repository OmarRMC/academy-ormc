// ─────────────────────────────────────────────────────────────────────────
// CatalogProvider — carga el catálogo UNA sola vez (al montar la app) y lo
// comparte por contexto. Las páginas lo consumen con el hook `useCatalog()`.
//
// Expone:
//   courses    → array de cursos normalizados (cada sesión ya tiene `deck`).
//   loading    → true mientras se resuelve la carga inicial.
//   error      → mensaje si algo falló (raro: el service degrada a fallback solo).
//   source     → 'firestore' | 'fallback' (depuración).
//   getCourse(courseId)
//   getSession(courseId, sessionId)
// ─────────────────────────────────────────────────────────────────────────
import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { fetchCatalog } from './catalogService.js'

const CatalogContext = createContext(null)

export function CatalogProvider({ children }) {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [source, setSource] = useState(null)

  useEffect(() => {
    let alive = true
    fetchCatalog()
      .then(({ courses, source }) => {
        if (!alive) return
        setCourses(courses)
        setSource(source)
      })
      .catch((err) => alive && setError(err.message))
      .finally(() => alive && setLoading(false))
    return () => {
      alive = false
    }
  }, [])

  const value = useMemo(() => {
    const getCourse = (courseId) => courses.find((c) => c.id === courseId)
    const getSession = (courseId, sessionId) =>
      getCourse(courseId)?.sessions.find((s) => s.id === sessionId)
    return { courses, loading, error, source, getCourse, getSession }
  }, [courses, loading, error, source])

  return (
    <CatalogContext.Provider value={value}>{children}</CatalogContext.Provider>
  )
}

export function useCatalog() {
  const ctx = useContext(CatalogContext)
  if (!ctx) throw new Error('useCatalog debe usarse dentro de <CatalogProvider>')
  return ctx
}
