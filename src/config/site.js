// ─────────────────────────────────────────────────────────────────────────
// Identidad del producto y enganche con el portafolio principal.
// Todo lo "personal" e integrable vive aquí para no esparcirlo por el código.
// Al integrar con el portafolio: cambia `portfolioUrl` (y, si hiciera falta,
// el `base` en vite.config.js).
// ─────────────────────────────────────────────────────────────────────────
export const site = {
  // Marca de la plataforma
  brand: 'OmarRMC Academy',

  // URL pública (canónica) — usada para SEO, Open Graph y sitemap.
  url: 'https://academy-ormc.web.app',

  // Datos personales (mostrados en hero y pie)
  instructor: 'Omar Rodrigo Mamani Capcha',
  rol: 'Desarrollador Full Stack',
  tagline: 'Cursos y talleres prácticos de desarrollo web moderno',
  intro:
    'Comparto el material de los cursos que imparto: diapositivas, proyectos y buenas ' +
    'prácticas con React, Node.js, Laravel y AWS para llevar tus habilidades a un nivel profesional.',

  // Enlace de regreso al portafolio principal (sección "Cursos & Talleres").
  portfolioUrl: 'https://dev-ormc.web.app/',

  redes: {
    github: 'https://github.com/OmarRMC',
    linkedin: 'https://www.linkedin.com/in/omar-r-mamani-capcha',
  },

  // Logo/marca que aparece en una esquina de cada diapositiva del visor.
  //   enabled → mostrar u ocultar el logo.
  //   src     → ruta a una imagen en /public (p. ej. '/logo.png'). Vacío = usar `text`.
  //   text    → marca de respaldo (iniciales) si no hay imagen.
  //   alt     → texto alternativo de la imagen.
  logo: {
    enabled: true,
    src: '',
    text: 'ORMC',
    alt: 'OmarRMC Academy',
  },
}
