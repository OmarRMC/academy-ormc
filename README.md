# OmarRMC Academy

Plataforma que aloja, de forma ordenada y escalable, las **diapositivas de todos los
cursos y talleres** que imparto (Curso → Sesiones → Diapositivas). Construida con el mismo
stack que enseño, así sirve además de ejemplo real para los alumnos.

- **Marca:** OmarRMC Academy · por Omar Rodrigo Mamani Capcha
- **Dominio previsto:** `academy-ormc.web.app` (Firebase Hosting)
- **Portafolio:** [dev-ormc.web.app](https://dev-ormc.web.app/)

- **Stack:** React 18 + Vite + Tailwind CSS + React Router.
- **Diapositivas:** componentes React sobre un motor de slides propio (`src/deck/`).
- **Despliegue:** Firebase Hosting con CI/CD (GitHub Actions).
- **Relación con el portafolio:** proyecto **independiente**, pensado para vivir en su
  propio subdominio (p. ej. `talleres.tudominio.com`) y enlazarse desde el portafolio
  principal. La integración es **solo por enlace** (ver `src/config/site.js`).

---

## Desarrollo local

```bash
npm install      # instala dependencias
npm run dev      # servidor de desarrollo → http://localhost:5173
npm run build    # build de producción en /dist
npm run preview  # previsualiza el build
```

---

## Estructura

```
src/
├─ config/site.js     # ★ identidad e integración con el portafolio
├─ data/courses.js    # ★ catálogo de cursos y sesiones (fuente de verdad)
├─ components/         # portal: layout, tarjetas de curso, filas de sesión
├─ deck/               # MOTOR DE SLIDES reutilizable
│  ├─ Deck.jsx         # navegación, teclado, progreso, pantalla completa
│  ├─ CodeBlock.jsx    # bloque de código con resaltado
│  └─ layouts/         # TitleSlide, SectionDivider, BulletSlide, TwoColumn, CardsGrid, Card, Flow
├─ decks/              # CONTENIDO de cada sesión, por curso
│  └─ react/Sesion01.jsx
└─ pages/              # HomePage, CoursePage, DeckPage
```

---

## Cómo agregar una **sesión** nueva

1. Crea el archivo del deck, p. ej. `src/decks/react/Sesion02.jsx`, exportando un array
   `slides` (mira `Sesion01.jsx` como plantilla y reutiliza los layouts de `src/deck/layouts/`):

   ```jsx
   import BulletSlide from '../../deck/layouts/BulletSlide.jsx'
   export const slides = [
     <BulletSlide key="s1" title="Mi primera diapositiva" items={['Punto A', 'Punto B']} />,
     // …
   ]
   export default slides
   ```

2. En `src/data/courses.js`, apunta la sesión a ese archivo:

   ```js
   { id: 'sesion-02', n: 2, modulo: 'I', title: '…', topics: [...],
     deck: () => import('../decks/react/Sesion02.jsx') }
   ```

Sin `deck` (o `deck: null`) la sesión aparece como **"Próximamente"**.

## Organización de imágenes (`public/`)

Estructura pensada para escalar a muchos archivos:

```
public/
├─ favicon.svg            # icono de pestaña (marca </>)
├─ robots.txt · sitemap.xml
└─ img/
   ├─ brand/              # identidad: logo.svg, og-image.svg
   ├─ tech/               # logos de tecnologías (react.svg, firebase.svg, …)
   └─ courses/            # (futuro) portadas/miniaturas de cursos
```

- **Logo de la academia:** `img/brand/logo.svg` (símbolo de código `</>`, minimalista).
- **Logos de tecnología:** se referencian desde `courses.js` por nombre de archivo y se
  cargan de `img/tech/` (ver `src/components/ui/TechLogos.jsx`).
- **Nuevas imágenes de cursos:** colócalas en `img/courses/`.

## Cómo agregar un **curso** nuevo

Añade un objeto al array `courses` en `src/data/courses.js` (con su `id`, `title`, `theme`,
`stack` y la lista de `sessions`) y crea su carpeta en `src/decks/<curso>/`.

---

## Atajos del visor de diapositivas

| Tecla | Acción |
|-------|--------|
| `←` / `→` / `barra espaciadora` | Anterior / siguiente |
| `Home` / `End` | Primera / última |
| `F` | Pantalla completa |
| `Esc` | Salir al curso |

También puedes hacer clic en la mitad izquierda/derecha de la pantalla. La diapositiva
actual se refleja en la URL (`#5`) para compartir enlaces directos.

---

## Despliegue en Firebase Hosting

### Una vez (configuración)

1. Crea un proyecto en [Firebase Console](https://console.firebase.google.com) y ajusta su
   ID en `.firebaserc` y en `.github/workflows/firebase-deploy.yml` (`projectId`).
2. Instala la CLI: `npm i -g firebase-tools` y `firebase login`.

### Manual

```bash
npm run deploy   # = npm run build && firebase deploy
```

### Automático (CI/CD)

Cada `push` a `main` dispara el workflow de GitHub Actions, que hace `build` y despliega.
Requiere el secret **`FIREBASE_SERVICE_ACCOUNT`** en el repositorio
(Firebase Console → Configuración → Cuentas de servicio → Generar clave privada).

---

## Integración con el portafolio principal

Todo el enganche vive en **`src/config/site.js`**:

- `portfolioUrl` → URL de regreso al portafolio (usado por el botón "← Portafolio").
- Si algún día quieres servirlo bajo un sub-path (`tudominio.com/cursos`) en lugar de un
  subdominio, define la variable de entorno `VITE_BASE=/cursos/` al hacer el build
  (ver `vite.config.js`).

El tema visual está centralizado en `tailwind.config.js`, fácil de re-alinear con la
identidad del portafolio.
