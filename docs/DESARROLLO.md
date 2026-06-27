# Guía de desarrollo (técnico)

Documentación interna del proyecto **OmarRMC Academy** (cómo está construido y cómo
mantenerlo). Para la presentación de la Academy, ver el `README.md`.

## Desarrollo local

```bash
npm install      # instala dependencias
npm run dev      # servidor de desarrollo (http://localhost:5173)
npm run build    # build de producción en /dist
npm run preview  # previsualiza el build
```

## Estructura

```
src/
├─ config/site.js     # identidad e integración con el portafolio
├─ data/courses.js    # catálogo de cursos y sesiones (fuente de verdad)
├─ components/         # portal: layout, tarjetas de curso, filas de sesión, Seo
├─ deck/               # MOTOR DE SLIDES reutilizable
│  ├─ Deck.jsx         # navegación, teclado, progreso, pantalla completa
│  ├─ CodeBlock.jsx    # bloque de código con resaltado y botón Copiar
│  └─ layouts/         # TitleSlide, SectionDivider, BulletSlide, TwoColumn, CardsGrid, Card, Flow
├─ decks/              # CONTENIDO de cada sesión, por curso
│  └─ react/Sesion01.jsx
└─ pages/              # HomePage, CoursePage, DeckPage
```

## Cómo agregar una **sesión** nueva

1. Crea el archivo del deck, p. ej. `src/decks/react/Sesion02.jsx`, exportando un array
   `slides` (mira `Sesion01.jsx` como plantilla y reutiliza los layouts de `src/deck/layouts/`):

   ```jsx
   import BulletSlide from '../../deck/layouts/BulletSlide.jsx'
   export const slides = [
     <BulletSlide key="s1" title="Mi primera diapositiva" items={['Punto A', 'Punto B']} />,
   ]
   export default slides
   ```

2. En `src/data/courses.js`, apunta la sesión a ese archivo:

   ```js
   { id: 'sesion-02', n: 2, modulo: 'I', title: '…', topics: [...],
     deck: () => import('../decks/react/Sesion02.jsx') }
   ```

Sin `deck` (o `deck: null`) la sesión aparece como **"Próximamente"**.
Para ocultar una sesión que ya tiene material: `enabled: false`.

## Cómo agregar un **curso** nuevo

Añade un objeto al array `courses` en `src/data/courses.js` (con su `id`, `title`, `theme`,
`stack`, `logos` y la lista de `sessions`) y crea su carpeta en `src/decks/<curso>/`.

## Organización de imágenes (`public/`)

```
public/
├─ favicon.svg            # icono de pestaña
├─ robots.txt · sitemap.xml
└─ img/
   ├─ brand/              # identidad: logo.svg, og-image.svg, smart.png
   ├─ tech/               # logos de tecnologías (react.svg, firebase.svg, …)
   └─ courses/            # (futuro) portadas/miniaturas de cursos
```

## Atajos del visor de diapositivas

| Tecla | Acción |
|-------|--------|
| ← / → / barra espaciadora | Anterior / siguiente |
| Home / End | Primera / última |
| F | Pantalla completa |
| Esc | Salir al curso |

También puedes hacer clic en la mitad izquierda/derecha de la pantalla. La diapositiva
actual se refleja en la URL (`#5`) para compartir enlaces directos.

## Despliegue en Firebase Hosting

**Configuración (una vez):**

1. Crea un proyecto en [Firebase Console](https://console.firebase.google.com) y ajusta su
   ID en `.firebaserc` y en `.github/workflows/firebase-deploy.yml` (`projectId`).
2. Instala la CLI: `npm i -g firebase-tools` y `firebase login`.

**Manual:** `npm run deploy` (= `npm run build && firebase deploy`).

**Automático (CI/CD):** cada `push` a `main` dispara el workflow de GitHub Actions, que hace
`build` y despliega. Requiere el secret **`FIREBASE_SERVICE_ACCOUNT`** en el repositorio.

## SEO

- Meta tags + Open Graph + Twitter Cards en `index.html`.
- SEO dinámico por página en `src/components/Seo.jsx` (título, descripción, canonical, JSON-LD).
- `public/robots.txt` y `public/sitemap.xml` (actualizar el sitemap al agregar cursos).
- Imagen de compartir: `public/img/brand/og-image.svg` (exportar a PNG con `scripts/og-export.html`).

## Integración con el portafolio principal

Todo el enganche vive en **`src/config/site.js`** (`portfolioUrl`, etc.). Para servirlo bajo
un sub-path, define `VITE_BASE=/cursos/` al hacer el build.
