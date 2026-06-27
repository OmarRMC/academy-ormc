// ─────────────────────────────────────────────────────────────────────────
// CATÁLOGO - única fuente de verdad que alimenta toda la UI del portal.
//
// Agregar una SESIÓN  → crear src/decks/<curso>/SesionXX.jsx y apuntar `deck:`
//                       a su import dinámico (lazy). Sin deck → "Próximamente".
// Agregar un CURSO     → añadir un objeto nuevo a este array.
//
// HABILITAR / DESHABILITAR una sesión → `enabled: true | false`.
//   Una sesión se considera DISPONIBLE solo si tiene `deck` Y `enabled` !== false.
//   Pon `enabled: false` para ocultar temporalmente una sesión (aunque ya tenga
//   material): se mostrará como "Próximamente". Si se omite, se asume habilitada.
// ─────────────────────────────────────────────────────────────────────────

export const courses = [
  {
    id: 'react-cicd',
    title: 'Desarrollo Front-End Profesional con React, Firebase y CI/CD',
    short: 'React JS + CI/CD',
    theme: 'react',
    icon: '⚛',
    // Logos de tecnologías representativas (archivos en /public/img/tech/)
    logos: [
      { name: 'React', src: 'react.svg' },
      { name: 'Firebase', src: 'firebase.svg' },
    ],
    // Logo en la esquina de las diapositivas (exclusivo de este curso)
    deckLogo: { src: '/img/brand/smart.png', alt: 'Smart' },
    duracion: '4 semanas · 8 sesiones',
    nivel: 'Intermedio',
    resumen:
      'Construye una SPA profesional (Sistema de Gestión de Tareas) con React, ' +
      'consumo de APIs REST, estado global, Firebase y despliegue automatizado con CI/CD.',
    stack: ['React', 'Vite', 'React Router', 'Zustand', 'Axios', 'Tailwind', 'Firebase', 'GitHub Actions'],
    sessions: [
      {
        id: 'sesion-01',
        n: 1,
        modulo: 'I',
        title: 'Introducción al Ecosistema React Moderno',
        topics: ['SPA', 'Virtual DOM', 'Componentes', 'JSX', 'Hooks', 'Vite'],
        enabled: true,
        deck: () => import('../decks/react/Sesion01.jsx'),
      },
      {
        id: 'sesion-02',
        n: 2,
        modulo: 'I',
        title: 'Componentes Profesionales y Navegación',
        topics: ['Props', 'Children', 'Eventos', 'React Router DOM', 'Rutas protegidas'],
        enabled: true,
        deck: () => import('../decks/react/Sesion02.jsx'),
      },
      {
        id: 'sesion-03',
        n: 3,
        modulo: 'I',
        title: 'Consumo de APIs REST con Axios',
        topics: ['API REST', 'JSON', 'GET/POST/PUT/DELETE', 'Interceptores', 'CRUD'],
        enabled: true,
        deck: () => import('../decks/react/Sesion03.jsx'),
      },
      {
        id: 'sesion-04',
        n: 4,
        modulo: 'I',
        title: 'Estado Global y Formularios',
        topics: ['Zustand', 'React Hook Form', 'Validaciones', 'React Toastify'],
        enabled: true,
        deck: () => import('../decks/react/Sesion04.jsx'),
      },
      {
        id: 'sesion-05',
        n: 5,
        modulo: 'II',
        title: 'Firebase Authentication',
        topics: ['Firebase', 'Login', 'Persistencia', 'Protección de rutas'],
        enabled: true,
        deck: () => import('../decks/react/Sesion05.jsx'),
      },
      {
        id: 'sesion-06',
        n: 6,
        modulo: 'II',
        title: 'Cloud Firestore',
        topics: ['NoSQL', 'Colecciones', 'Documentos', 'Consultas', 'CRUD'],
        deck: null,
      },
      {
        id: 'sesion-07',
        n: 7,
        modulo: 'II',
        title: 'Arquitectura Profesional y Optimización',
        topics: ['Custom Hooks', 'useMemo', 'useCallback', 'Lazy Loading'],
        deck: null,
      },
      {
        id: 'sesion-08',
        n: 8,
        modulo: 'II',
        title: 'Git, CI/CD y Despliegue en Firebase',
        topics: ['Git', 'GitHub Actions', 'CI/CD', 'Firebase Hosting'],
        deck: null,
      },
    ],
  },

  {
    id: 'laravel-12',
    title: 'Desarrollo de Aplicaciones Web con Laravel 12',
    short: 'Laravel 12',
    theme: 'laravel',
    icon: '🅛',
    // Logos de tecnologías representativas (archivos en /public/img/tech/)
    logos: [
      { name: 'Laravel', src: 'laravel.svg' },
      { name: 'MySQL', src: 'mysql.svg' },
    ],
    duracion: '4 semanas · 12 sesiones',
    nivel: 'Intermedio',
    resumen:
      'Desarrolla un sistema de gestión completo con Laravel 12: patrón MVC, Eloquent ORM, ' +
      'autenticación, roles y permisos, APIs REST, colas, reportes y despliegue en producción.',
    stack: ['Laravel 12', 'PHP', 'Eloquent', 'Blade', 'MySQL', 'Spatie Permission', 'API REST'],
    sessions: [
      { id: 'sesion-01', n: 1, modulo: 'I', title: 'Introducción a Laravel 12', topics: ['MVC', 'Composer', 'Artisan', '.env'], deck: null },
      { id: 'sesion-02', n: 2, modulo: 'I', title: 'Rutas y Controladores', topics: ['Rutas Web', 'Controladores', 'Route Groups'], deck: null },
      { id: 'sesion-03', n: 3, modulo: 'I', title: 'Blade y Patrón MVC', topics: ['Blade', 'Layouts', 'Componentes', 'Helpers'], deck: null },
      { id: 'sesion-04', n: 4, modulo: 'I', title: 'Base de Datos', topics: ['Migraciones', 'Seeders', 'Factories', 'Query Builder'], deck: null },
      { id: 'sesion-05', n: 5, modulo: 'I', title: 'Eloquent ORM y Relaciones', topics: ['Modelos', 'Relaciones', 'Pivot', 'Scopes'], deck: null },
      { id: 'sesion-06', n: 6, modulo: 'II', title: 'Autenticación y Gestión de Roles', topics: ['Breeze', 'Roles', 'Permisos', 'Spatie Permission'], deck: null },
      { id: 'sesion-07', n: 7, modulo: 'II', title: 'Middleware y Control de Acceso', topics: ['Middleware', 'Protección de rutas', 'Sesiones'], deck: null },
      { id: 'sesion-08', n: 8, modulo: 'II', title: 'Formularios y Validaciones', topics: ['Form Request', 'Validaciones', 'Archivos'], deck: null },
      { id: 'sesion-09', n: 9, modulo: 'III', title: 'CRUD Profesional y Reportes', topics: ['Resource Controllers', 'Paginación', 'PDF', 'Excel'], deck: null },
      { id: 'sesion-10', n: 10, modulo: 'III', title: 'APIs RESTful', topics: ['API Resources', 'JSON', 'Postman', 'Versionado'], deck: null },
      { id: 'sesion-11', n: 11, modulo: 'III', title: 'Funcionalidades Avanzadas', topics: ['Correos', 'Colas/Queues', 'Comandos Artisan', 'Scheduler'], deck: null },
      { id: 'sesion-12', n: 12, modulo: 'III', title: 'Despliegue en Producción', topics: ['Git', 'GitHub', 'Optimización', 'Seguridad'], deck: null },
    ],
  },
]

// Helpers de acceso usados por las páginas
export const getCourse = (courseId) => courses.find((c) => c.id === courseId)

export const getSession = (courseId, sessionId) => {
  const course = getCourse(courseId)
  return course ? course.sessions.find((s) => s.id === sessionId) : undefined
}

// Una sesión está DISPONIBLE si tiene deck y no está deshabilitada explícitamente.
export const isAvailable = (session) => Boolean(session?.deck) && session?.enabled !== false

// Cuenta de sesiones disponibles
export const availableCount = (course) => course.sessions.filter(isAvailable).length
