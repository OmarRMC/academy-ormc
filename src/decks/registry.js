// ─────────────────────────────────────────────────────────────────────────
// REGISTRO DE DIAPOSITIVAS — mapea el `deckKey` (texto guardado en Firestore o en
// el catálogo estático) al import dinámico (lazy) del módulo JSX de las slides.
//
// ¿Por qué existe? Porque el contenido de las diapositivas es CÓDIGO (JSX), no
// datos: no se puede guardar en Firestore. Firestore solo guarda un texto
// (`deckKey`) y aquí lo traducimos al módulo real. Así, activar/ocultar una sesión
// se hace desde Firestore, pero el contenido vive (y se versiona) en el repo.
//
// AL CREAR UN DECK NUEVO:
//   1. Crea src/decks/<curso>/SesionXX.jsx (export const slides = [...]).
//   2. Añade aquí su entrada:  'curso/SesionXX': () => import('./curso/SesionXX.jsx').
//   3. En Firestore (o en src/data/courses.js), pon `deckKey: 'curso/SesionXX'`.
// ─────────────────────────────────────────────────────────────────────────

export const deckRegistry = {
  'react/Sesion01': () => import('./react/Sesion01.jsx'),
  'react/Sesion02': () => import('./react/Sesion02.jsx'),
  'react/Sesion03': () => import('./react/Sesion03.jsx'),
  'react/Sesion04': () => import('./react/Sesion04.jsx'),
  'react/Sesion05': () => import('./react/Sesion05.jsx'),
  'react/Sesion06': () => import('./react/Sesion06.jsx'),
}

// Devuelve la función de import del deck para un `deckKey`, o null si no existe
// (deckKey null/desconocido → la sesión se mostrará como "Próximamente").
export const resolveDeck = (deckKey) =>
  (deckKey && deckRegistry[deckKey]) || null
