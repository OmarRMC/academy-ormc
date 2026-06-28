// ─────────────────────────────────────────────────────────────────────────
// SERVICIO DE CATÁLOGO — punto único para obtener cursos+sesiones.
//
// Estrategia HÍBRIDA con respaldo:
//   1. Intenta leer el catálogo de Firestore (colección `courses` + subcolección
//      `sessions`), ordenado por `order`.
//   2. NORMALIZA cada sesión: traduce `deckKey` (texto) → `deck` (función de
//      import del registro), para que el resto de la app funcione igual que antes.
//   3. Si Firestore no está configurado, está vacío o falla → usa el catálogo
//      ESTÁTICO de src/data/courses.js (fallback). La web nunca se rompe.
// ─────────────────────────────────────────────────────────────────────────
import { collection, getDocs, query, orderBy } from 'firebase/firestore'
import { db } from '../firebase/config.js'
import { resolveDeck } from '../decks/registry.js'
import { catalog } from './courses.js'

// Resuelve `deckKey` → `deck` (función lazy) en una sesión y garantiza un `status`.
// Back-compat: si un documento viejo de Firestore no trae `status`, lo derivamos
// (con deckKey → 'disponible'; sin él → 'proximamente') para no romper la web.
const normalizeSession = (session) => ({
  ...session,
  deck: resolveDeck(session.deckKey),
  status: session.status ?? (session.deckKey ? 'disponible' : 'proximamente'),
})

// Normaliza un curso: filtra/ordena no se hace aquí (lo hace la consulta o el
// fallback), pero sí resolvemos los decks de sus sesiones.
const normalizeCourse = (course) => ({
  ...course,
  sessions: (course.sessions || []).map(normalizeSession),
})

// Catálogo estático de respaldo, ya normalizado y filtrado a cursos habilitados.
const fallbackCatalog = () =>
  catalog
    .filter((c) => c.enabled !== false)
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    .map(normalizeCourse)

// Lee el catálogo de Firestore. Lanza si no hay `db` o si la colección está vacía,
// para que el caller caiga al fallback.
const fetchFromFirestore = async () => {
  if (!db) throw new Error('Firestore no configurado')

  const coursesSnap = await getDocs(
    query(collection(db, 'courses'), orderBy('order')),
  )
  if (coursesSnap.empty) throw new Error('Catálogo de Firestore vacío')

  const courses = []
  for (const courseDoc of coursesSnap.docs) {
    const sessionsSnap = await getDocs(
      query(collection(courseDoc.ref, 'sessions'), orderBy('order')),
    )
    const sessions = sessionsSnap.docs.map((d) => ({ id: d.id, ...d.data() }))
    courses.push({ id: courseDoc.id, ...courseDoc.data(), sessions })
  }

  return courses
    .filter((c) => c.enabled !== false)
    .map(normalizeCourse)
}

// API pública: devuelve { courses, source }. `source` indica de dónde salió el
// dato ('firestore' | 'fallback'), útil para depurar.
export const fetchCatalog = async () => {
  try {
    const courses = await fetchFromFirestore()
    return { courses, source: 'firestore' }
  } catch (err) {
    if (import.meta.env.DEV) {
      console.warn('[catálogo] usando respaldo estático:', err.message)
    }
    return { courses: fallbackCatalog(), source: 'fallback' }
  }
}
