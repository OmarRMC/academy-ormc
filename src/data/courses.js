// ─────────────────────────────────────────────────────────────────────────
// CATÁLOGO ESTÁTICO — copia de respaldo (fallback) y fuente del script de seed.
//
// En PRODUCCIÓN el catálogo se lee de Firestore (ver src/data/catalogService.js).
// Este archivo cumple dos funciones:
//   1. FALLBACK: si Firestore falla o aún no tiene datos, la app usa esto y sigue
//      funcionando igual que antes.
//   2. SEED: `npm run seed` sube exactamente este contenido a Firestore.
//
// IMPORTANTE: este archivo debe ser 100% serializable (solo datos, sin funciones)
// para que tanto el navegador como Node (el seed) puedan importarlo. Por eso el
// material de cada sesión se referencia con `deckKey` (un texto), NO con un import.
// El mapeo deckKey → módulo de diapositivas vive en src/decks/registry.js.
//
// Campos de control que ahora puedes manejar desde la consola de Firebase
// (sin tocar código ni redesplegar):
//   enabled     (curso)   → mostrar u ocultar el curso completo.
//   order       (curso)   → orden en el home (menor = primero).
//   status      (sesión)  → 'disponible' | 'proximamente' (define la etiqueta).
//                           Vocabulario y estilos en src/data/sessionStatus.js.
//   descripcion (sesión)  → resumen corto opcional, visible en la página del curso.
//   order       (sesión)  → orden de la sesión dentro del curso.
//   deckKey     (sesión)  → qué módulo de diapositivas carga (o null = sin material).
//
// Una sesión se ABRE (visor) solo si status === 'disponible' Y tiene deck.
// ─────────────────────────────────────────────────────────────────────────
import { isOpenable } from './sessionStatus.js'

export const catalog = [
  {
    id: 'react-cicd',
    title: 'Desarrollo Front-End Profesional con React, Firebase y CI/CD',
    short: 'React JS + CI/CD',
    theme: 'react',
    icon: '⚛',
    enabled: true, // habilitar / ocultar el curso completo
    order: 1, // orden en el home (menor = primero)
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
      { id: 'sesion-01', n: 1, modulo: 'I', title: 'Introducción al Ecosistema React Moderno', topics: ['SPA', 'Virtual DOM', 'Componentes', 'JSX', 'Hooks', 'Vite'], status: 'disponible', descripcion: 'Qué es una SPA, el Virtual DOM y cómo arrancar un proyecto React con Vite.', order: 1, deckKey: 'react/Sesion01' },
      { id: 'sesion-02', n: 2, modulo: 'I', title: 'Componentes Profesionales y Navegación', topics: ['Props', 'Children', 'Eventos', 'React Router DOM', 'Rutas protegidas'], status: 'disponible', descripcion: 'Componentes reutilizables, props/children y navegación con React Router.', order: 2, deckKey: 'react/Sesion02' },
      { id: 'sesion-03', n: 3, modulo: 'I', title: 'Consumo de APIs REST con Axios', topics: ['API REST', 'JSON', 'GET/POST/PUT/DELETE', 'Interceptores', 'CRUD'], status: 'disponible', descripcion: 'Conectar la SPA a una API REST con Axios y construir un CRUD completo.', order: 3, deckKey: 'react/Sesion03' },
      { id: 'sesion-04', n: 4, modulo: 'I', title: 'Estado Global y Formularios', topics: ['Zustand', 'React Hook Form', 'Validaciones', 'React Toastify'], status: 'disponible', descripcion: 'Estado global con Zustand y formularios validados con React Hook Form.', order: 4, deckKey: 'react/Sesion04' },
      { id: 'sesion-05', n: 5, modulo: 'II', title: 'Firebase Authentication', topics: ['Firebase', 'Login', 'Persistencia', 'Protección de rutas'], status: 'disponible', descripcion: 'Autenticación con Firebase: login, persistencia de sesión y rutas protegidas.', order: 5, deckKey: 'react/Sesion05' },
      { id: 'sesion-06', n: 6, modulo: 'II', title: 'Cloud Firestore', topics: ['NoSQL', 'Colecciones', 'Documentos', 'Consultas', 'CRUD'], status: 'disponible', descripcion: 'Base de datos NoSQL en la nube: colecciones, documentos y consultas en tiempo real.', order: 6, deckKey: 'react/Sesion06' },
      { id: 'sesion-07', n: 7, modulo: 'II', title: 'Arquitectura Profesional y Optimización', topics: ['Custom Hooks', 'useMemo', 'useCallback', 'Lazy Loading'], status: 'disponible', descripcion: 'Custom hooks, memoización y carga diferida para una app mantenible y rápida.', order: 7, deckKey: 'react/Sesion07' },
      { id: 'sesion-08', n: 8, modulo: 'II', title: 'Git, CI/CD y Despliegue en Firebase', topics: ['Git', 'GitHub Actions', 'CI/CD', 'Firebase Hosting'], status: 'disponible', descripcion: 'Flujo Git, integración y despliegue continuo con GitHub Actions y Firebase Hosting.', order: 8, deckKey: 'react/Sesion08' },
    ],
  },

  {
    id: 'laravel-13',
    title: 'Desarrollo de Aplicaciones Web con Laravel 13',
    short: 'Laravel 13',
    theme: 'laravel',
    icon: '🅛',
    enabled: true,
    order: 2,
    // Logos de tecnologías representativas (archivos en /public/img/tech/)
    logos: [
      { name: 'Laravel', src: 'laravel.svg' },
      { name: 'MySQL', src: 'mysql.svg' },
    ],
    duracion: '4 semanas · 12 sesiones',
    nivel: 'Intermedio',
    resumen:
      'Desarrolla un sistema de gestión completo con Laravel 13: patrón MVC, Eloquent ORM, ' +
      'autenticación, roles y permisos, APIs REST, colas, reportes y despliegue en producción.',
    stack: ['Laravel 13', 'PHP 8.3+', 'Eloquent', 'Blade', 'MySQL', 'Spatie Permission', 'API REST'],
    sessions: [
      { id: 'sesion-01', n: 1, modulo: 'I', title: 'Introducción a Laravel 13', topics: ['MVC', 'Composer', 'Artisan', '.env'], status: 'disponible', descripcion: 'Estructura de un proyecto Laravel 13, Composer, Artisan y configuración con .env.', order: 1, deckKey: 'laravel/Sesion01' },
      { id: 'sesion-02', n: 2, modulo: 'I', title: 'Rutas y Controladores', topics: ['Rutas Web', 'Parámetros', 'Rutas nombradas', 'Redirecciones', 'Route Groups', 'Controladores', 'Inyección de dependencias'], status: 'disponible', descripcion: 'Rutas web dinámicas, parámetros, rutas nombradas, controladores e inyección de dependencias.', order: 2, deckKey: 'laravel/Sesion02' },
      { id: 'sesion-03', n: 3, modulo: 'I', title: 'Blade y Patrón MVC', topics: ['Blade', 'Layouts', 'Secciones', 'Componentes', 'Includes', 'Helpers'], status: 'disponible', descripcion: 'Vistas con Blade: layouts, secciones, includes y componentes dentro del patrón MVC.', order: 3, deckKey: 'laravel/Sesion03' },
      { id: 'sesion-04', n: 4, modulo: 'I', title: 'Base de Datos', topics: ['Configuración', 'Migraciones', 'Seeders', 'Factories', 'Transacciones', 'Query Builder'], status: 'disponible', descripcion: 'Configuración, migraciones, seeders, factories, transacciones y el Query Builder.', order: 4, deckKey: 'laravel/Sesion04' },
      { id: 'sesion-05', n: 5, modulo: 'I', title: 'Eloquent ORM y Relaciones', topics: ['Modelos', 'Uno a Uno', 'Uno a Muchos', 'Muchos a Muchos', 'Pivot', 'Accessors', 'Mutators', 'Scopes'], status: 'disponible', descripcion: 'Modelos Eloquent, relaciones (1:1, 1:N, N:M), pivot, accessors, mutators y scopes.', order: 5, deckKey: 'laravel/Sesion05' },
      { id: 'sesion-06', n: 6, modulo: 'II', title: 'Autenticación y Gestión de Roles', topics: ['Breeze', 'Login', 'Middleware auth', 'Gates', 'Policies', 'Roles', 'Permisos', 'Spatie Permission'], status: 'disponible', descripcion: 'Autenticación con Breeze, autorización con Gates y Policies, y roles/permisos con Spatie.', order: 6, deckKey: 'laravel/Sesion06' },
      { id: 'sesion-07', n: 7, modulo: 'II', title: 'Middleware y Control de Acceso', topics: ['Middleware', 'Middleware personalizado', 'Protección de rutas', 'Control de acceso', 'Gestión de sesiones'], status: 'disponible', descripcion: 'Middleware personalizado, protección de rutas y módulos por permiso, y gestión de sesiones.', order: 7, deckKey: 'laravel/Sesion07' },
      { id: 'sesion-08', n: 8, modulo: 'II', title: 'Formularios y Validaciones', topics: ['Blade Forms', 'Form Request', 'Validaciones', 'Mensajes personalizados', 'Archivos', 'Métodos HTTP'], status: 'disponible', descripcion: 'Formularios Blade, validación con Form Requests, mensajes personalizados y subida de archivos.', order: 8, deckKey: 'laravel/Sesion08' },
      { id: 'sesion-09', n: 9, modulo: 'III', title: 'CRUD Profesional y Reportes', topics: ['Resource Controllers', 'Paginación', 'PDF', 'Excel'], status: 'proximamente', descripcion: 'CRUD con resource controllers, paginación y reportes en PDF y Excel.', order: 9, deckKey: null },
      { id: 'sesion-10', n: 10, modulo: 'III', title: 'APIs RESTful', topics: ['API Resources', 'JSON', 'Postman', 'Versionado'], status: 'proximamente', descripcion: 'Construir y versionar APIs REST con API Resources y probarlas en Postman.', order: 10, deckKey: null },
      { id: 'sesion-11', n: 11, modulo: 'III', title: 'Funcionalidades Avanzadas', topics: ['Correos', 'Colas/Queues', 'Comandos Artisan', 'Scheduler'], status: 'proximamente', descripcion: 'Correos, colas, comandos Artisan y tareas programadas con el scheduler.', order: 11, deckKey: null },
      { id: 'sesion-12', n: 12, modulo: 'III', title: 'Despliegue en Producción', topics: ['Git', 'GitHub', 'Optimización', 'Seguridad'], status: 'proximamente', descripcion: 'Llevar la aplicación a producción con buenas prácticas de optimización y seguridad.', order: 12, deckKey: null },
    ],
  },
]

// ── Helpers puros (sin dependencias de Firestore ni de los decks) ──────────
// Operan sobre una sesión YA NORMALIZADA (catalogService resuelve `deckKey` → `deck`).

// Una sesión está DISPONIBLE (abre el visor) si su estado es 'disponible' y tiene
// material. La lógica vive en sessionStatus.js; aquí solo la reexportamos con el
// nombre que usan las páginas.
export const isAvailable = isOpenable

// Cuenta de sesiones disponibles dentro de un curso.
export const availableCount = (course) =>
  (course?.sessions || []).filter(isAvailable).length
