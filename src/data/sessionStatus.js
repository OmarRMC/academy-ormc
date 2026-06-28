// ─────────────────────────────────────────────────────────────────────────
// ESTADOS DE UNA SESIÓN — única fuente de verdad de "qué estados existen y cómo
// se ven". La UI nunca hardcodea etiquetas: siempre pasa por `statusMeta`.
//
// AÑADIR UN ESTADO NUEVO (p. ej. 'en-preparacion' o 'nueva'):
//   1. Agrega una constante a STATUS.
//   2. Agrega su entrada a STATUS_META (label + tone).
//   3. Úsalo en Firestore poniendo ese valor en el campo `status` de la sesión.
//   (No hace falta tocar componentes.)
//
// `tone` se usa para el estilo del badge en SessionRow:
//   'accent' → color del curso (react/laravel) · 'muted' → gris/neutro.
// ─────────────────────────────────────────────────────────────────────────

export const STATUS = {
  DISPONIBLE: 'disponible',
  PROXIMAMENTE: 'proximamente',
}

// Mapa de presentación por estado.
const STATUS_META = {
  [STATUS.DISPONIBLE]: { label: 'Ver diapositivas', tone: 'accent' },
  [STATUS.PROXIMAMENTE]: { label: 'Próximamente', tone: 'muted' },
}

// Devuelve { label, tone } del estado; si es desconocido o falta, cae a
// 'proximamente' (estado seguro: no clickeable).
export const statusMeta = (status) =>
  STATUS_META[status] || STATUS_META[STATUS.PROXIMAMENTE]

// Una sesión se puede ABRIR (mostrar el visor) solo si su estado es 'disponible'
// Y tiene material (`deck`). El estado decide la etiqueta; el deck, la apertura.
export const isOpenable = (session) =>
  session?.status === STATUS.DISPONIBLE && Boolean(session?.deck)
