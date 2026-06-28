// ─────────────────────────────────────────────────────────────────────────
// Curso Laravel 13 · Sesión 1 - Introducción a Laravel 13
// Cada elemento del array `slides` es una diapositiva. El componente <Deck>
// se encarga de la navegación, el progreso y la pantalla completa.
// Usa `center` en un nodo para centrar esa diapositiva.
// Base pedagógica: docs/laravel/SESION-01-PLANIFICACION.md
// ─────────────────────────────────────────────────────────────────────────
import Slide from '../../deck/Slide.jsx'
import { LaravelLogo } from '../../deck/Deck.jsx'
import SectionDivider from '../../deck/layouts/SectionDivider.jsx'
import BulletSlide from '../../deck/layouts/BulletSlide.jsx'
import TwoColumn from '../../deck/layouts/TwoColumn.jsx'
import CardsGrid from '../../deck/layouts/CardsGrid.jsx'
import Card from '../../deck/layouts/Card.jsx'
import Flow from '../../deck/layouts/Flow.jsx'
import CodeBlock from '../../deck/CodeBlock.jsx'

export const meta = {
  course: 'laravel-13',
  session: 1,
  title: 'Introducción a Laravel 13',
}

// ── Bloques de código (HTML resaltado) ────────────────────────────────────

const codeInstall = `<span class="tok-com"># Opción A — script oficial (Windows PowerShell como administrador)</span>
<span class="tok-com"># Instala PHP 8.5, Composer y el Laravel installer</span>
iex ((New-Object System.Net.WebClient).DownloadString('https://php.new/install/windows/8.5'))

<span class="tok-com"># Opción B — si ya tienes PHP 8.3+ y Composer</span>
composer global require laravel/installer

<span class="tok-com"># Verificar</span>
php --version        <span class="tok-com"># debe ser 8.3 o superior</span>
composer --version`

const codeCrear = `<span class="tok-com"># Crear un nuevo proyecto Laravel 13</span>
laravel new gestion-app

<span class="tok-com"># Alternativa sin el installer</span>
composer create-project laravel/laravel gestion-app`

const codeRun = `cd gestion-app

<span class="tok-com"># Compilar assets del front (una vez)</span>
npm install &amp;&amp; npm run build

<span class="tok-com"># Servidor web + worker de colas + Vite, todo junto</span>
composer run dev

<span class="tok-com"># …o solo el servidor web</span>
php artisan serve`

const codeEnv = `<span class="tok-attr">APP_NAME</span>=<span class="tok-str">"Gestion App"</span>
<span class="tok-attr">APP_ENV</span>=local
<span class="tok-attr">APP_DEBUG</span>=<span class="tok-key">true</span>
<span class="tok-attr">APP_URL</span>=<span class="tok-str">http://localhost:8000</span>

<span class="tok-com"># Base de datos — el curso usa MySQL</span>
<span class="tok-attr">DB_CONNECTION</span>=mysql
<span class="tok-attr">DB_HOST</span>=127.0.0.1
<span class="tok-attr">DB_PORT</span>=3306
<span class="tok-attr">DB_DATABASE</span>=gestion_app
<span class="tok-attr">DB_USERNAME</span>=root
<span class="tok-attr">DB_PASSWORD</span>=`

const codeConfig = `<span class="tok-com">// config/app.php → aquí SÍ se usa env()</span>
<span class="tok-str">'debug'</span> =&gt; (<span class="tok-key">bool</span>) <span class="tok-fn">env</span>(<span class="tok-str">'APP_DEBUG'</span>, <span class="tok-key">false</span>),

<span class="tok-com">// En cualquier parte de tu app → usa config()</span>
$zona = <span class="tok-fn">config</span>(<span class="tok-str">'app.timezone'</span>);
$zona = <span class="tok-fn">config</span>(<span class="tok-str">'app.timezone'</span>, <span class="tok-str">'America/La_Paz'</span>);`

const codeArtisan = `php artisan list          <span class="tok-com"># todos los comandos</span>
php artisan help migrate  <span class="tok-com"># ayuda de un comando</span>
php artisan about         <span class="tok-com"># resumen del entorno y config</span>`

// Árbol de carpetas (se renderiza con la clase .tree)
const treeRoot = `<span class="dir">gestion-app/</span>
&nbsp;├─ <span class="dir">app/</span> &nbsp;&nbsp;&nbsp;&nbsp;<span class="cmt"># núcleo: tu código (Http, Models, Providers)</span>
&nbsp;├─ <span class="dir">bootstrap/</span> <span class="cmt"># arranque (app.php) + caché</span>
&nbsp;├─ <span class="dir">config/</span> &nbsp;&nbsp;<span class="cmt"># archivos de configuración</span>
&nbsp;├─ <span class="dir">database/</span> &nbsp;<span class="cmt"># migraciones, seeders, factories</span>
&nbsp;├─ <span class="dir">public/</span> &nbsp;&nbsp;<span class="cmt"># index.php + assets públicos</span>
&nbsp;├─ <span class="dir">resources/</span> <span class="cmt"># vistas Blade + CSS/JS sin compilar</span>
&nbsp;├─ <span class="dir">routes/</span> &nbsp;&nbsp;<span class="cmt"># web.php, console.php</span>
&nbsp;├─ <span class="dir">storage/</span> &nbsp;<span class="cmt"># logs, caché, archivos generados</span>
&nbsp;├─ <span class="dir">tests/</span> &nbsp;&nbsp;&nbsp;<span class="cmt"># pruebas (Pest/PHPUnit)</span>
&nbsp;└─ <span class="dir">vendor/</span> &nbsp;&nbsp;<span class="cmt"># dependencias de Composer</span>`

const treeAfter = `<span class="dir">app/</span>
&nbsp;├─ <span class="dir">Http/Controllers/</span> <span class="cmt"># Sesión 2</span>
&nbsp;└─ <span class="dir">Models/</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="cmt"># Sesión 5</span>
<span class="dir">routes/</span>web.php &nbsp;&nbsp;&nbsp;&nbsp;<span class="cmt"># Sesión 2</span>
<span class="dir">resources/</span>views/ &nbsp;<span class="cmt"># Sesión 3 (Blade)</span>
<span class="dir">database/</span>migrations/ <span class="cmt"># Sesión 4</span>`

export const slides = [
  // 1 · Portada
  <Slide key="s1" center>
    <LaravelLogo />
    <span className="eyebrow">Módulo I · Sesión 1</span>
    <h1>
      Introducción a <span className="accent">Laravel 13</span>
    </h1>
    <p className="lead muted" style={{ marginTop: '1.2rem' }}>
      Desarrollo de Aplicaciones Web con Laravel 13
    </p>
    <p className="muted" style={{ marginTop: '1.6rem' }}>
      Expositor: <b>Omar Mamani</b> · Duración: 1h 30min
    </p>
  </Slide>,

  // 2 · ¿Qué construiremos?
  <CardsGrid
    key="s2"
    cols={3}
    eyebrow="El proyecto del curso"
    title="¿Qué vamos a construir?"
    cards={[
      { title: '🔐 Backend profesional', body: 'Autenticación, gestión de usuarios, roles y permisos.' },
      { title: '🗂️ Datos y reportes', body: 'CRUD completo, reportes en PDF y Excel, y una API REST.' },
      { title: '🚀 Avanzado', body: 'Correos, colas, tareas programadas y despliegue en producción.' },
    ]}
  />,

  // 3 · Agenda
  <CardsGrid
    key="s3"
    eyebrow="Hoja de ruta"
    title="Agenda de la sesión"
    cards={[
      { title: '1 · Conceptos fundamentales', body: 'Qué es Laravel, patrón MVC y novedades de Laravel 13.' },
      { title: '2 · Instalación', body: 'PHP, Composer, Laravel Installer y creación del proyecto.' },
      { title: '3 · Estructura y configuración', body: 'Carpetas del proyecto, archivo .env y Artisan.' },
      { title: '4 · Laboratorio', body: 'Instalar, configurar y dejar el proyecto corriendo.' },
    ]}
  />,

  // 4 · Objetivos
  <BulletSlide
    key="s4"
    eyebrow="¿Qué lograrás hoy?"
    title="Objetivos de aprendizaje"
    variant="checks"
    items={[
      <>Explicar <b>qué es Laravel</b> y por qué es estándar en PHP profesional.</>,
      <>Entender el <b>patrón MVC</b> y cómo lo materializa Laravel.</>,
      <>Conocer las <b>novedades y el contexto de Laravel 13</b>.</>,
      <>Instalar <b>PHP 8.3+, Composer</b> y el <b>Laravel Installer</b>.</>,
      <>Crear y <b>ejecutar</b> un proyecto en <b>localhost:8000</b>.</>,
      <>Reconocer la <b>estructura de carpetas</b> y configurar el <b>.env</b>.</>,
      <>Usar <b>Artisan</b> para las tareas más comunes.</>,
    ]}
  />,

  // 5 · Divider 1
  <SectionDivider key="s5" center num="01" eyebrow="Bloque 1" title="Conceptos Fundamentales" subtitle="La base mental antes de escribir código." />,

  // 6 · ¿Qué es Laravel?
  <TwoColumn
    key="s6"
    eyebrow="Concepto"
    title="¿Qué es Laravel?"
    left={
      <>
        <p className="lead">
          Es un <b>framework de PHP</b> de sintaxis expresiva y elegante para construir{' '}
          <span className="accent">aplicaciones web</span> profesionales.
        </p>
        <ul style={{ marginTop: '1rem' }}>
          <li><b>Progresivo:</b> crece contigo, de lo simple a lo avanzado.</li>
          <li><b>Escalable:</b> de un blog a millones de peticiones.</li>
          <li>Trae de fábrica: rutas, ORM, auth, colas, tareas y testing.</li>
        </ul>
      </>
    }
    right={
      <Card title="Analogía: un auto ya armado 🚗">
        <p className="muted">
          No fabricas las piezas básicas (motor, chasis): te subes y conduces. Laravel pone la
          estructura para que te enfoques en <b>tu app</b>, no en la "fontanería".
        </p>
        <div className="tag-row" style={{ marginTop: '0.6rem' }}>
          <span className="pill">Eloquent</span>
          <span className="pill">Blade</span>
          <span className="pill">Artisan</span>
        </div>
      </Card>
    }
  />,

  // 7 · ¿Por qué Laravel?
  <CardsGrid
    key="s7"
    cols={3}
    eyebrow="Contexto profesional"
    title="¿Por qué aprender Laravel?"
    cards={[
      { title: '#1 en PHP', body: 'El framework PHP más usado y demandado del mercado.' },
      { title: 'Ecosistema enorme', body: 'Forge, Vapor, Sail, Sanctum, Horizon, AI SDK y más.' },
      { title: 'Productividad', body: 'Artisan + Eloquent + Blade aceleran el desarrollo.' },
      { title: 'Comunidad y docs', body: 'Documentación oficial excelente y Laracasts.' },
      { title: 'Convenciones', body: '"Todo tiene su lugar": fácil de mantener y en equipo.' },
      { title: 'Listo para IA', body: 'Estructura predecible, ideal para agentes y Laravel Boost.' },
    ]}
  />,

  // 8 · Arquitectura MVC
  <Slide key="s8">
    <span className="eyebrow">Cómo se organiza una app</span>
    <h2>Arquitectura MVC</h2>
    <p className="lead" style={{ marginTop: '0.3rem' }}>
      Separa la aplicación en tres responsabilidades. <b>Analogía del restaurante</b> 🍽️.
    </p>
    <Flow
      style={{ marginTop: '1.2rem' }}
      steps={['Petición (URL)', 'Ruta', 'Controlador', 'Modelo (BD)', { label: 'Vista → Respuesta', ok: true }]}
    />
    <div className="grid g3" style={{ marginTop: '1.3rem' }}>
      <Card title="Controlador = mesero">
        <p className="muted">Recibe el pedido y coordina lo que hay que hacer.</p>
      </Card>
      <Card title="Modelo = cocina/despensa">
        <p className="muted">Los datos y las reglas de negocio (Eloquent).</p>
      </Card>
      <Card title="Vista = el plato servido">
        <p className="muted">Lo que ve el usuario, renderizado con Blade.</p>
      </Card>
    </div>
  </Slide>,

  // 9 · MVC en Laravel
  <Slide key="s9">
    <span className="eyebrow">Dónde vive cada cosa</span>
    <h2>El MVC en Laravel</h2>
    <table style={{ marginTop: '0.6rem' }}>
      <thead>
        <tr><th>Pieza</th><th>Qué hace</th><th>Carpeta</th></tr>
      </thead>
      <tbody>
        <tr><td><b>Ruta</b></td><td>define la URL y a quién llama</td><td><code>routes/web.php</code></td></tr>
        <tr><td><b>Controlador</b></td><td>recibe la petición y orquesta</td><td><code>app/Http/Controllers</code></td></tr>
        <tr><td><b>Modelo</b></td><td>habla con la base de datos (Eloquent)</td><td><code>app/Models</code></td></tr>
        <tr><td><b>Vista</b></td><td>la interfaz (Blade)</td><td><code>resources/views</code></td></tr>
      </tbody>
    </table>
    <p className="muted" style={{ marginTop: '1rem' }}>
      👉 El flujo es <b>siempre el mismo</b>; aprenderlo hoy te ordena todo el curso.
    </p>
  </Slide>,

  // 10 · Novedades de Laravel 13
  <CardsGrid
    key="s10"
    cols={3}
    eyebrow="Contexto y novedades"
    title="Laravel 13 (marzo 2026)"
    cards={[
      { title: 'PHP 8.3 – 8.5', body: 'Laravel 13 sube el mínimo de PHP a la versión 8.3.' },
      { title: 'Mínimos breaking changes', body: 'Subir de la 12 a la 13 casi no requiere tocar código.' },
      { title: 'Laravel AI SDK', body: 'API nativa para texto, agentes, embeddings, audio e imágenes.' },
      { title: 'JSON:API + búsqueda vectorial', body: 'Recursos JSON:API y búsqueda semántica (pgvector).' },
      { title: 'Atributos PHP', body: '#[Middleware], #[Authorize], #[Signature], #[Tries]…' },
      { title: 'Más mejoras', body: 'Queue::route(), Cache::touch() y PreventRequestForgery.' },
    ]}
  />,

  // 11 · Requisitos previos
  <TwoColumn
    key="s11"
    eyebrow="Antes de empezar"
    title="Requisitos previos"
    left={
      <>
        <p className="lead">Necesitas tu entorno de desarrollo listo:</p>
        <ul style={{ marginTop: '0.8rem' }}>
          <li><b>PHP 8.3+</b> (Laravel 13 ya no admite 8.2).</li>
          <li><b>Composer</b> (gestor de dependencias).</li>
          <li><b>Node.js + npm</b> (para compilar el front con Vite).</li>
          <li><b>MySQL</b> (la base de datos del curso).</li>
          <li><b>Editor:</b> VS Code (extensión de Laravel) o PhpStorm.</li>
        </ul>
      </>
    }
    right={
      <Card title="Atajo recomendado">
        <p className="muted">
          <span className="accent">php.new</span> instala <b>PHP, Composer y el installer</b> de un
          solo comando (hoy con PHP 8.5). O usa <b>Laravel Herd</b> como entorno gráfico todo-en-uno.
        </p>
      </Card>
    }
  />,

  // 12 · Divider 2
  <SectionDivider key="s12" center num="02" eyebrow="Bloque 2" title="Instalación y Entorno" subtitle="De cero a un proyecto Laravel corriendo." />,

  // 13 · Composer
  <TwoColumn
    key="s13"
    eyebrow="Requisito clave"
    title="Composer: el gestor de dependencias"
    left={
      <>
        <p className="lead">
          Composer es a PHP lo que <b>npm</b> es a JavaScript 📦.
        </p>
        <ul style={{ marginTop: '0.8rem' }}>
          <li>Descarga e instala librerías (incluido el propio Laravel).</li>
          <li>Gestiona sus <b>versiones</b> de forma reproducible.</li>
        </ul>
      </>
    }
    right={
      <Card title="Archivos clave">
        <ul>
          <li><code>composer.json</code> → lista de dependencias.</li>
          <li><code>vendor/</code> → código descargado (no se sube a Git).</li>
        </ul>
      </Card>
    }
  />,

  // 14 · Instalar PHP/Composer/Installer
  <Slide key="s14">
    <span className="eyebrow">¡Manos a la obra!</span>
    <h2>Instalar PHP, Composer y el Laravel Installer</h2>
    <CodeBlock html={codeInstall} />
    <p className="muted" style={{ marginTop: '0.8rem' }}>
      💡 Reinicia la terminal después de instalar para que reconozca los comandos.
    </p>
  </Slide>,

  // 15 · Crear el proyecto
  <TwoColumn
    key="s15"
    eyebrow="Crear el proyecto"
    title="laravel new"
    left={<CodeBlock html={codeCrear} />}
    right={
      <Card title="¿Qué pregunta el installer?">
        <ul>
          <li><b>Starter kit</b> (puedes elegir "ninguno").</li>
          <li><b>Framework de tests</b> (Pest o PHPUnit).</li>
          <li><b>Base de datos</b> (por defecto SQLite).</li>
        </ul>
      </Card>
    }
  />,

  // 16 · Ejecutar el proyecto
  <TwoColumn
    key="s16"
    eyebrow="Levantar el servidor"
    title="Ejecutar el proyecto"
    left={<CodeBlock html={codeRun} />}
    right={
      <Card title="Resultado">
        <p className="muted">Abre el proyecto en:</p>
        <p className="big accent">localhost:8000</p>
        <p className="muted" style={{ marginTop: '0.4rem' }}>
          Verás la pantalla de bienvenida de Laravel. 🎉
        </p>
      </Card>
    }
  />,

  // 17 · Divider 3
  <SectionDivider key="s17" center num="03" eyebrow="Bloque 3" title="Estructura y Configuración" subtitle="Conoce tu proyecto por dentro." />,

  // 18 · Estructura del proyecto
  <TwoColumn
    key="s18"
    eyebrow="Organización"
    title="Estructura del proyecto"
    left={<div className="card"><div className="tree" dangerouslySetInnerHTML={{ __html: treeRoot }} /></div>}
    right={
      <>
        <p className="lead">Cada carpeta tiene <b>una responsabilidad clara</b>.</p>
        <ul style={{ marginTop: '0.8rem' }}>
          <li>Sabes <b>dónde poner</b> (y buscar) cada cosa.</li>
          <li>El proyecto <b>escala</b> sin volverse un desorden.</li>
          <li>Facilita el <b>trabajo en equipo</b>.</li>
        </ul>
      </>
    }
  />,

  // 19 · La carpeta app/ y las rutas
  <TwoColumn
    key="s19"
    eyebrow="El núcleo"
    title="La carpeta app/ y las rutas"
    left={
      <>
        <p className="lead">Por defecto, <code>app/</code> trae 3 carpetas:</p>
        <ul style={{ marginTop: '0.8rem' }}>
          <li><b>Http/</b> → controladores, middleware, form requests.</li>
          <li><b>Models/</b> → modelos Eloquent.</li>
          <li><b>Providers/</b> → service providers.</li>
          <li>🪄 Otras (<code>Console</code>, <code>Jobs</code>, <code>Mail</code>…) se crean al usar <code>make:*</code>.</li>
        </ul>
      </>
    }
    right={
      <Card title="Rutas">
        <ul>
          <li><code>routes/web.php</code> → rutas web (sesión, CSRF).</li>
          <li><code>routes/console.php</code> → comandos y tareas programadas.</li>
          <li><code>api.php</code> → con <code>php artisan install:api</code>.</li>
        </ul>
      </Card>
    }
  />,

  // 20 · Archivo .env
  <TwoColumn
    key="s20"
    eyebrow="Configuración por entorno"
    title="El archivo .env"
    lead={<>Los valores que cambian entre <b>local</b> y <b>producción</b> viven en <code>.env</code>, no en el código.</>}
    left={<CodeBlock html={codeEnv} />}
    right={
      <Card title="Claves">
        <ul>
          <li>Se crea copiando <code>.env.example</code> (lo hace el installer).</li>
          <li>⚠️ <b>Nunca</b> se sube a Git (lleva credenciales).</li>
          <li>El curso usa <b>MySQL</b>; luego corremos <code>php artisan migrate</code>.</li>
        </ul>
      </Card>
    }
  />,

  // 21 · env() vs config()
  <Slide key="s21">
    <span className="eyebrow">Regla de oro</span>
    <h2>env() vs config()</h2>
    <p className="lead" style={{ marginTop: '0.3rem' }}>
      Usa <code>env()</code> <b>solo</b> dentro de <code>config/</code>. En el resto de la app, usa{' '}
      <span className="accent">config()</span>.
    </p>
    <div style={{ marginTop: '1rem' }}>
      <CodeBlock html={codeConfig} />
    </div>
    <p className="muted" style={{ marginTop: '0.8rem' }}>
      Si cacheas la config en producción (<code>config:cache</code>), <code>env()</code> deja de leerse fuera de <code>config/</code>.
    </p>
  </Slide>,

  // 22 · Artisan
  <TwoColumn
    key="s22"
    eyebrow="La consola de Laravel"
    title="Artisan"
    lead={<>La <b>navaja suiza</b> 🛠️ de Laravel: genera código, corre migraciones, sirve la app y más.</>}
    left={<CodeBlock html={codeArtisan} />}
    right={
      <Card title="Idea clave">
        <p className="muted">
          Casi todo lo repetitivo lo hace Artisan por ti. Empieza siempre con{' '}
          <code>php artisan list</code> para descubrir comandos.
        </p>
      </Card>
    }
  />,

  // 23 · Comandos Artisan esenciales
  <CardsGrid key="s23" eyebrow="Tu día a día" title="Comandos Artisan esenciales">
    <Card title="Servir / explorar">
      <ul>
        <li><code>serve</code> → servidor local.</li>
        <li><code>route:list</code> → lista de rutas.</li>
        <li><code>tinker</code> → consola interactiva (REPL).</li>
      </ul>
    </Card>
    <Card title="Generar (make)">
      <ul>
        <li><code>make:controller</code>, <code>make:model</code>.</li>
        <li><code>make:migration</code>.</li>
        <li><code>make:command</code> (Sesión 11).</li>
      </ul>
    </Card>
    <Card title="Base de datos">
      <ul>
        <li><code>migrate</code> → crea las tablas.</li>
        <li><code>migrate:fresh --seed</code>.</li>
      </ul>
    </Card>
    <Card title="Mantenimiento">
      <ul>
        <li><code>key:generate</code> → clave de la app.</li>
        <li><code>config:clear</code> / <code>config:cache</code>.</li>
      </ul>
    </Card>
  </CardsGrid>,

  // 24 · Divider 4
  <SectionDivider key="s24" center num="04" eyebrow="Bloque 4" title="Laboratorio" subtitle="Ahora te toca a ti. Manos al teclado. ⌨️" />,

  // 25 · El proyecto del curso (evolución)
  <Slide key="s25">
    <span className="eyebrow">Cómo crecerá el proyecto</span>
    <h2>Una evolución progresiva</h2>
    <table style={{ marginTop: '0.6rem' }}>
      <thead>
        <tr><th>Sesión</th><th>Lo que añadiremos al sistema</th></tr>
      </thead>
      <tbody>
        <tr><td><b>1</b></td><td>Entorno + proyecto base corriendo <span className="accent">← hoy</span></td></tr>
        <tr><td><b>2-3</b></td><td>Rutas, controladores, Blade y MVC en la práctica</td></tr>
        <tr><td><b>4-5</b></td><td>Base de datos, migraciones y Eloquent + relaciones</td></tr>
        <tr><td><b>6-7</b></td><td>Autenticación, roles/permisos y middleware</td></tr>
        <tr><td><b>8-9</b></td><td>Formularios/validaciones, CRUD y reportes PDF/Excel</td></tr>
        <tr><td><b>10-11</b></td><td>API REST, correos, colas y tareas programadas</td></tr>
        <tr><td><b>12</b></td><td>Despliegue en producción</td></tr>
      </tbody>
    </table>
  </Slide>,

  // 26 · Laboratorio paso a paso
  <CardsGrid key="s26" eyebrow="Práctica guiada" title="Laboratorio paso a paso">
    <Card title="① Preparar el entorno">
      <ul>
        <li>Verificar <b>PHP 8.3+</b> (<code>php -v</code>) y <b>Composer</b>.</li>
        <li>Instalar el <b>Laravel Installer</b>.</li>
      </ul>
    </Card>
    <Card title="② Crear el proyecto">
      <ul>
        <li><code>laravel new gestion-app</code>.</li>
        <li><code>cd gestion-app</code>.</li>
      </ul>
    </Card>
    <Card title="③ Configurar .env + BD">
      <ul>
        <li>Crear la BD <code>gestion_app</code> en MySQL.</li>
        <li>Ajustar las variables <code>DB_*</code>.</li>
        <li><code>php artisan migrate</code>.</li>
      </ul>
    </Card>
    <Card title="④ Ejecutar y explorar">
      <ul>
        <li><code>php artisan serve</code> → localhost:8000.</li>
        <li>Recorrer <code>app/</code>, <code>routes/</code>, <code>.env</code>.</li>
        <li>Editar <code>APP_NAME</code> y recargar.</li>
      </ul>
    </Card>
  </CardsGrid>,

  // 27 · Estructura tras crear el proyecto
  <TwoColumn
    key="s27"
    eyebrow="Mapa para el curso"
    title="¿Dónde tocaremos cada cosa?"
    left={<div className="card"><div className="tree" dangerouslySetInnerHTML={{ __html: treeAfter }} /></div>}
    right={
      <>
        <p className="lead">Cada sesión añade piezas en su lugar:</p>
        <ul style={{ marginTop: '0.8rem' }}>
          <li><b>Rutas y controladores</b> → Sesión 2.</li>
          <li><b>Vistas Blade</b> → Sesión 3.</li>
          <li><b>Migraciones</b> → Sesión 4.</li>
          <li><b>Modelos Eloquent</b> → Sesión 5.</li>
        </ul>
      </>
    }
  />,

  // 28 · Checklist
  <Slide key="s28">
    <span className="eyebrow">Antes de cerrar</span>
    <h2>Checklist de la sesión</h2>
    <ul className="checks big" style={{ marginTop: '1rem' }}>
      <li>Entiendo qué es Laravel y el patrón MVC.</li>
      <li>Conozco el contexto de Laravel 13 (PHP 8.3+, novedades).</li>
      <li>PHP, Composer y el Laravel Installer instalados.</li>
      <li>Proyecto creado y corriendo en localhost:8000.</li>
      <li>.env configurado y migraciones ejecutadas.</li>
      <li>Reconozco la estructura de carpetas y uso Artisan básico.</li>
    </ul>
    <p className="muted" style={{ marginTop: '1.2rem' }}>Si marcaste todo ✓, estás listo para la Sesión 2. 🚀</p>
  </Slide>,

  // 29 · Resumen
  <Slide key="s29">
    <span className="eyebrow">Lo que aprendiste hoy</span>
    <h2>Resumen de la sesión</h2>
    <div className="grid g2" style={{ marginTop: '0.8rem' }}>
      <Card title="Conceptos">
        <p className="muted">
          Laravel es un framework PHP con <b>MVC</b>: ordena el flujo de{' '}
          <b>rutas → controladores → modelos → vistas</b>. Laravel 13 suma IA, JSON:API y más.
        </p>
      </Card>
      <Card title="Práctica">
        <p className="muted">
          Instalamos el entorno, <b>creamos el proyecto</b>, configuramos el <b>.env</b>, corrimos{' '}
          <code>migrate</code> y dejamos la app <b>corriendo</b>.
        </p>
      </Card>
    </div>
    <p className="lead" style={{ marginTop: '1.2rem' }}>
      📌 Idea central: <span className="accent">el framework pone el orden; tú pones la lógica</span>.
    </p>
  </Slide>,

  // 30 · Próxima sesión
  <Slide key="s30" center>
    <span className="eyebrow">Próxima sesión</span>
    <h2 style={{ fontSize: '2.6rem' }}>Sesión 2 - Rutas y Controladores</h2>
    <div className="grid g2" style={{ marginTop: '1.4rem', maxWidth: '60vw' }}>
      <Card title="Rutas"><p className="muted">Rutas web, parámetros, rutas nombradas y Route Groups.</p></Card>
      <Card title="Controladores"><p className="muted">Métodos HTTP, controladores e inyección de dependencias.</p></Card>
    </div>
    <p className="muted" style={{ marginTop: '1.4rem' }}>
      <b>Tarea:</b> deja el proyecto corriendo y crea una ruta de prueba que devuelva un texto en <code>routes/web.php</code>.
    </p>
  </Slide>,

  // 31 · Cierre
  <Slide key="s31" center>
    <LaravelLogo />
    <h1>¿Preguntas? 🙌</h1>
    <p className="lead muted" style={{ marginTop: '1rem' }}>
      ¡Gracias por tu atención!
      <br />
      Nos vemos en la Sesión 2.
    </p>
    <p className="muted" style={{ marginTop: '1.6rem' }}>
      Desarrollo de Aplicaciones Web con Laravel 13 · Omar Mamani
    </p>
  </Slide>,
]

export default slides
