// ─────────────────────────────────────────────────────────────────────────
// Curso Laravel 13 · Sesión 12 - Despliegue en Producción (sesión final)
// Cada elemento del array `slides` es una diapositiva. El componente <Deck>
// se encarga de la navegación, el progreso y la pantalla completa.
// Usa `center` en un nodo para centrar esa diapositiva.
// Base pedagógica: docs/laravel/SESION-12-PLANIFICACION.md
// ─────────────────────────────────────────────────────────────────────────
import Slide from '../../deck/Slide.jsx'
import { LaravelLogo } from '../../deck/Deck.jsx'
import SectionDivider from '../../deck/layouts/SectionDivider.jsx'
import BulletSlide from '../../deck/layouts/BulletSlide.jsx'
import TwoColumn from '../../deck/layouts/TwoColumn.jsx'
import CardsGrid from '../../deck/layouts/CardsGrid.jsx'
import Card from '../../deck/layouts/Card.jsx'
import CodeBlock from '../../deck/CodeBlock.jsx'

export const meta = {
  course: 'laravel-13',
  session: 12,
  title: 'Despliegue en Producción',
}

// ── Bloques de código (HTML resaltado) ────────────────────────────────────

const codeGitInit = `git init
git add .
git commit -m <span class="tok-str">"Primer commit del sistema"</span>`

const codeGitHub = `<span class="tok-com"># Conectar tu repo local con GitHub y subirlo</span>
git remote add origin https://github.com/usuario/gestion-app.git
git branch -M main
git push -u origin main`

const codeEnvProd = `<span class="tok-attr">APP_NAME</span>=<span class="tok-str">"Gestion App"</span>
<span class="tok-attr">APP_ENV</span>=production
<span class="tok-attr">APP_DEBUG</span>=<span class="tok-key">false</span>
<span class="tok-attr">APP_URL</span>=<span class="tok-str">https://gestion.app</span>

<span class="tok-attr">DB_CONNECTION</span>=mysql
<span class="tok-attr">DB_DATABASE</span>=gestion_prod
<span class="tok-attr">DB_USERNAME</span>=usuario_prod
<span class="tok-attr">DB_PASSWORD</span>=clave_segura`

const codeOptimize = `<span class="tok-com"># Dependencias optimizadas, sin paquetes de desarrollo</span>
composer install --optimize-autoloader --no-dev

<span class="tok-com"># Cachear config, rutas, vistas y eventos de una vez</span>
php artisan optimize

<span class="tok-com"># Para revertir / limpiar la cache:</span>
php artisan optimize:clear`

const codeDeploy = `<span class="tok-com"># En el servidor (o lo hace la plataforma por ti):</span>
git clone https://github.com/usuario/gestion-app.git
cd gestion-app

composer install --optimize-autoloader --no-dev
cp .env.example .env        <span class="tok-com"># luego editar</span>
php artisan key:generate

php artisan migrate --force <span class="tok-com"># crea las tablas</span>
php artisan storage:link
npm install &amp;&amp; npm run build
php artisan optimize        <span class="tok-com"># cachear para velocidad</span>`

export const slides = [
  // 1 · Portada
  <Slide key="s1" center>
    <LaravelLogo />
    <span className="eyebrow">Módulo III · Sesión 12 (final)</span>
    <h1>
      Despliegue en <span className="accent">Producción</span>
    </h1>
    <p className="lead muted" style={{ marginTop: '1.2rem' }}>
      Desarrollo de Aplicaciones Web con Laravel 13
    </p>
    <p className="muted" style={{ marginTop: '1.6rem' }}>
      Expositor: <b>Omar Mamani</b> · Duración: 1h 30min
    </p>
  </Slide>,

  // 2 · El camino recorrido
  <Slide key="s2">
    <span className="eyebrow">12 sesiones, un sistema completo</span>
    <h2>El camino recorrido</h2>
    <table style={{ marginTop: '0.6rem' }}>
      <thead>
        <tr><th>Módulo</th><th>Sesiones</th><th>Lo que dominamos</th></tr>
      </thead>
      <tbody>
        <tr><td><b>I</b></td><td>1-5</td><td>Laravel, rutas, controladores, Blade, BD y Eloquent</td></tr>
        <tr><td><b>II</b></td><td>6-8</td><td>Auth, roles/permisos, middleware, formularios y validación</td></tr>
        <tr><td><b>III</b></td><td>9-11</td><td>CRUD + reportes, API REST, correos, colas y comandos</td></tr>
        <tr><td><b>III</b></td><td>12</td><td><b>Despliegue</b> <span className="accent">← hoy</span></td></tr>
      </tbody>
    </table>
    <p className="muted" style={{ marginTop: '1rem' }}>
      Construimos un sistema completo. Hoy lo sacamos al mundo. 🚀
    </p>
  </Slide>,

  // 3 · Agenda
  <CardsGrid
    key="s3"
    eyebrow="Hoja de ruta"
    title="Agenda de la sesión"
    cards={[
      { title: '1 · Git y GitHub', body: 'Versionar y respaldar el proyecto.' },
      { title: '2 · Preparar para producción', body: 'Entorno, optimización y seguridad.' },
      { title: '3 · Servidor y despliegue', body: 'Configurar, hostear y publicar.' },
      { title: '4 · Laboratorio + cierre', body: 'Publicar el sistema y celebrar.' },
    ]}
  />,

  // 4 · Objetivos
  <BulletSlide
    key="s4"
    eyebrow="¿Qué lograrás hoy?"
    title="Objetivos de aprendizaje"
    variant="checks"
    items={[
      <>Versionar con <b>Git</b> (init, add, commit).</>,
      <>Subir a <b>GitHub</b> (remote, push).</>,
      <>Configurar las <b>variables de entorno</b> de producción.</>,
      <><b>Optimizar</b> y cachear el proyecto.</>,
      <>Aplicar <b>seguridad</b> (HTTPS, .env, APP_DEBUG=false).</>,
      <>Configurar el <b>servidor</b> (document root en /public).</>,
      <>Conocer opciones de <b>hosting</b>.</>,
      <>Ejecutar los <b>pasos del despliegue</b>.</>,
    ]}
  />,

  // 5 · Divider 1
  <SectionDivider key="s5" center num="01" eyebrow="Bloque 1" title="Git y GitHub" subtitle="Versiona y respalda tu código." />,

  // 6 · Git: control de versiones
  <TwoColumn
    key="s6"
    eyebrow="Control de versiones"
    title="Git"
    left={
      <>
        <p className="lead">
          Una <b>máquina del tiempo</b> ⏳ para tu código: guardas "puntos" (commits) y puedes volver a
          cualquiera.
        </p>
        <p className="muted" style={{ marginTop: '0.8rem' }}>
          Git registra cada cambio. Trabajas con confianza, en equipo, y tienes el historial completo
          del proyecto.
        </p>
      </>
    }
    right={<CodeBlock html={codeGitInit} />}
  />,

  // 7 · GitHub: el repositorio remoto
  <Slide key="s7">
    <span className="eyebrow">Tu repo en la nube</span>
    <h2>GitHub: el repositorio remoto</h2>
    <CodeBlock html={codeGitHub} />
    <p className="muted" style={{ marginTop: '0.8rem' }}>
      ⚠️ El archivo <code>.env</code> <b>nunca</b> se sube (está en <code>.gitignore</code>): lleva
      credenciales. Se comparte solo <code>.env.example</code>.
    </p>
  </Slide>,

  // 8 · Divider 2
  <SectionDivider key="s8" center num="02" eyebrow="Bloque 2" title="Preparar para Producción" subtitle="Entorno, velocidad y seguridad." />,

  // 9 · Variables de entorno
  <Slide key="s9">
    <span className="eyebrow">Producción usa otros valores</span>
    <h2>Variables de entorno</h2>
    <CodeBlock html={codeEnvProd} />
    <p className="muted" style={{ marginTop: '0.8rem' }}>
      🔒 Dos claves de seguridad: <code>APP_ENV=production</code> y <code>APP_DEBUG=false</code> (si lo
      dejas en <code>true</code> expones datos sensibles al usuario).
    </p>
  </Slide>,

  // 10 · Optimización y caché
  <Slide key="s10">
    <span className="eyebrow">Que la app vuele</span>
    <h2>Optimización y caché</h2>
    <CodeBlock html={codeOptimize} />
    <p className="muted" style={{ marginTop: '0.8rem' }}>
      <code>optimize</code> agrupa <code>config:cache</code>, <code>route:cache</code>,
      <code> view:cache</code> y <code>event:cache</code>. ⚠️ Tras <code>config:cache</code>,{' '}
      <code>env()</code> solo funciona dentro de <code>config/</code>.
    </p>
  </Slide>,

  // 11 · Seguridad y buenas prácticas
  <Slide key="s11">
    <span className="eyebrow">No es un paso, es una actitud</span>
    <h2>Seguridad y buenas prácticas</h2>
    <ul className="checks big" style={{ marginTop: '1rem' }}>
      <li><code>APP_DEBUG=false</code> en producción (lo más importante).</li>
      <li>HTTPS con certificado SSL (datos cifrados).</li>
      <li><code>.env</code> fuera de Git y con credenciales fuertes.</li>
      <li>Document root en <code>/public</code> (nunca exponer la raíz).</li>
      <li><code>php artisan migrate --force</code> (sin prompt interactivo).</li>
      <li>Backups de la base de datos y dependencias actualizadas.</li>
    </ul>
  </Slide>,

  // 12 · Divider 3
  <SectionDivider key="s12" center num="03" eyebrow="Bloque 3" title="Servidor y Despliegue" subtitle="Configurar, hostear y publicar." />,

  // 13 · Configuración del servidor
  <TwoColumn
    key="s13"
    eyebrow="Apuntar al lugar correcto"
    title="Configuración del servidor"
    left={
      <>
        <p className="lead">
          El <b>document root</b> apunta a la carpeta <code>public/</code>, no a la raíz del proyecto.
        </p>
        <p className="muted" style={{ marginTop: '0.8rem' }}>
          Así nunca se exponen <code>.env</code>, código ni configuración a Internet. Es una regla de
          oro de seguridad.
        </p>
      </>
    }
    right={
      <Card title="Requisitos">
        <ul>
          <li><b>PHP 8.3+</b> y sus extensiones.</li>
          <li><b>MySQL</b> (la base de datos del curso).</li>
          <li>Permisos de escritura en <code>storage/</code> y <code>bootstrap/cache/</code>.</li>
        </ul>
      </Card>
    }
  />,

  // 14 · Hosting
  <CardsGrid
    key="s14"
    cols={2}
    eyebrow="¿Dónde lo publico?"
    title="Opciones de hosting"
    cards={[
      { title: '🚀 Despliegue desde Git', body: 'Railway, Render, Fly.io: conectas el repo y despliegan solos. Planes de inicio gratuitos.' },
      { title: '🗂️ Hosting compartido (cPanel)', body: 'Económico; subes por Git/FTP. Apuntar el dominio a public/.' },
      { title: '⚙️ Gestionado (profesional)', body: 'Laravel Cloud y Forge: servidores listos para Laravel (Nginx, MySQL, colas, SSL).' },
      { title: '🖥️ VPS (control total)', body: 'DigitalOcean, Linode, AWS: tú configuras todo el servidor.' },
    ]}
  />,

  // 15 · Pasos del despliegue
  <Slide key="s15">
    <span className="eyebrow">La receta del despliegue</span>
    <h2>Pasos del despliegue</h2>
    <CodeBlock html={codeDeploy} />
    <p className="muted" style={{ marginTop: '0.8rem' }}>
      Una receta: clonar, instalar, configurar <code>.env</code>, generar clave, migrar, compilar
      assets y cachear. La salud del sistema se comprueba en la ruta <code>/up</code>.
    </p>
  </Slide>,

  // 16 · Divider 4
  <SectionDivider key="s16" center num="04" eyebrow="Bloque 4" title="Laboratorio" subtitle="Publicar el sistema en producción. ⌨️" />,

  // 17 · Laboratorio paso a paso
  <CardsGrid key="s17" eyebrow="Práctica guiada" title="Laboratorio paso a paso">
    <Card title="① Subir a GitHub">
      <ul>
        <li><code>git init</code>, <code>add</code>, <code>commit</code>, <code>push</code>.</li>
        <li>Verificar que <code>.env</code> NO se subió.</li>
      </ul>
    </Card>
    <Card title="② Elegir hosting">
      <ul>
        <li>Crear cuenta (Railway/Render).</li>
        <li>Conectar el repositorio.</li>
      </ul>
    </Card>
    <Card title="③ Configurar y desplegar">
      <ul>
        <li>Variables de producción + base de datos.</li>
        <li><code>migrate --force</code> + <code>optimize</code>.</li>
      </ul>
    </Card>
    <Card title="④ Verificar">
      <ul>
        <li>Abrir la URL pública: login y un CRUD.</li>
        <li>Revisar <code>/up</code> y <code>APP_DEBUG=false</code>.</li>
      </ul>
    </Card>
  </CardsGrid>,

  // 18 · Checklist de la sesión
  <Slide key="s18">
    <span className="eyebrow">Antes de cerrar</span>
    <h2>Checklist de la sesión</h2>
    <ul className="checks big" style={{ marginTop: '1rem' }}>
      <li>Versiono con Git y subo a GitHub (sin .env).</li>
      <li>Configuro el .env de producción (APP_DEBUG=false).</li>
      <li>Optimizo y cacheo (composer --no-dev, optimize).</li>
      <li>Aplico seguridad (HTTPS, document root en /public).</li>
      <li>Configuro el servidor (PHP 8.3+, permisos, MySQL).</li>
      <li>Despliego (key:generate, migrate --force, storage:link).</li>
      <li>Verifico la URL pública y /up.</li>
    </ul>
  </Slide>,

  // 19 · Resumen
  <Slide key="s19">
    <span className="eyebrow">Lo que aprendiste hoy</span>
    <h2>Resumen de la sesión</h2>
    <div className="grid g2" style={{ marginTop: '0.8rem' }}>
      <Card title="Versionar">
        <p className="muted">
          Git + GitHub guardan, respaldan y comparten el proyecto.
        </p>
      </Card>
      <Card title="Producir">
        <p className="muted">
          <code>.env</code>, <code>optimize</code>, seguridad y servidor lo dejan listo y rápido.
        </p>
      </Card>
    </div>
    <p className="lead" style={{ marginTop: '1.2rem' }}>
      📌 Idea central: <span className="accent">construir es la mitad; publicar bien es la otra</span>.
    </p>
  </Slide>,

  // 20 · ¡Curso completado!
  <Slide key="s20" center>
    <h1 style={{ fontSize: '3rem' }}>🎉 ¡Felicidades!</h1>
    <p className="lead" style={{ marginTop: '0.8rem' }}>
      Completaste el curso de <span className="accent">Laravel 13</span>.
    </p>
    <div className="grid g2" style={{ marginTop: '1.4rem', maxWidth: '64vw' }}>
      <Card title="Construiste">
        <p className="muted">
          Un sistema de gestión completo: MVC, Eloquent, auth con roles, CRUD con reportes, API REST,
          correos con colas y comandos programados.
        </p>
      </Card>
      <Card title="Y lo publicaste">
        <p className="muted">
          Versionado en GitHub y desplegado en producción, accesible por URL. De cero a una app real.
        </p>
      </Card>
    </div>
    <p className="muted" style={{ marginTop: '1.4rem' }}>
      Ya no eres principiante en Laravel: construiste y publicaste una app de principio a fin.
    </p>
  </Slide>,

  // 21 · Cierre
  <Slide key="s21" center>
    <LaravelLogo />
    <h1>¡Gracias por todo el curso! 🙌</h1>
    <p className="lead muted" style={{ marginTop: '1rem' }}>
      Sigue construyendo.
      <br />
      El mejor proyecto es el siguiente.
    </p>
    <p className="muted" style={{ marginTop: '1.6rem' }}>
      Desarrollo de Aplicaciones Web con Laravel 13 · Omar Mamani
    </p>
  </Slide>,
]

export default slides
