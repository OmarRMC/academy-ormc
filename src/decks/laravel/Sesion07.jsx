// ─────────────────────────────────────────────────────────────────────────
// Curso Laravel 13 · Sesión 7 - Middleware y Control de Acceso
// Cada elemento del array `slides` es una diapositiva. El componente <Deck>
// se encarga de la navegación, el progreso y la pantalla completa.
// Usa `center` en un nodo para centrar esa diapositiva.
// Base pedagógica: docs/laravel/SESION-07-PLANIFICACION.md
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
  session: 7,
  title: 'Middleware y Control de Acceso',
}

// ── Bloques de código (HTML resaltado) ────────────────────────────────────

const codeMakeMw = `php artisan make:middleware EnsureUserIsActive`

const codeMwClass = `<span class="tok-com">// app/Http/Middleware/EnsureUserIsActive.php</span>
<span class="tok-key">public function</span> <span class="tok-fn">handle</span>(Request $request, Closure $next): Response
{
    <span class="tok-key">if</span> (! $request-&gt;<span class="tok-fn">user</span>()-&gt;activo) {
        <span class="tok-key">return</span> <span class="tok-fn">redirect</span>(<span class="tok-str">'/login'</span>)-&gt;<span class="tok-fn">with</span>(<span class="tok-str">'error'</span>, <span class="tok-str">'Cuenta inactiva.'</span>);
    }

    <span class="tok-key">return</span> $next($request);   <span class="tok-com">// deja pasar la peticion</span>
}`

const codeRegister = `<span class="tok-com">// bootstrap/app.php → darle un alias corto</span>
-&gt;<span class="tok-fn">withMiddleware</span>(<span class="tok-key">function</span> (Middleware $middleware) {
    $middleware-&gt;<span class="tok-fn">alias</span>([
        <span class="tok-str">'activo'</span> =&gt; \\App\\Http\\Middleware\\EnsureUserIsActive::<span class="tok-key">class</span>,
    ]);
})`

const codeAssign = `<span class="tok-com">// routes/web.php → usarlo (clase o alias)</span>
Route::<span class="tok-fn">middleware</span>([<span class="tok-str">'auth'</span>, <span class="tok-str">'activo'</span>])-&gt;<span class="tok-fn">group</span>(<span class="tok-key">function</span> () {
    Route::<span class="tok-fn">resource</span>(<span class="tok-str">'tareas'</span>, TareaController::<span class="tok-key">class</span>);
});`

const codeMwParam = `<span class="tok-com">// El middleware recibe argumentos despues de $next</span>
<span class="tok-key">public function</span> <span class="tok-fn">handle</span>(Request $request, Closure $next, <span class="tok-key">string</span> $role): Response
{
    <span class="tok-key">if</span> (! $request-&gt;<span class="tok-fn">user</span>()-&gt;<span class="tok-fn">hasRole</span>($role)) {
        <span class="tok-fn">abort</span>(<span class="tok-num">403</span>);
    }
    <span class="tok-key">return</span> $next($request);
}

<span class="tok-com">// En la ruta: nombre:parametro (separa con comas)</span>
Route::<span class="tok-fn">put</span>(<span class="tok-str">'/tareas/{tarea}'</span>, ...)-&gt;<span class="tok-fn">middleware</span>(<span class="tok-str">'role:editor'</span>);`

const codeProtect = `<span class="tok-com">// Solo usuarios autenticados</span>
Route::<span class="tok-fn">middleware</span>(<span class="tok-str">'auth'</span>)-&gt;<span class="tok-fn">group</span>(<span class="tok-key">function</span> () {

    <span class="tok-com">// Solo admins gestionan usuarios</span>
    Route::<span class="tok-fn">middleware</span>(<span class="tok-str">'role:admin'</span>)-&gt;<span class="tok-fn">resource</span>(<span class="tok-str">'usuarios'</span>, UserController::<span class="tok-key">class</span>);

    <span class="tok-com">// Solo quien tenga el permiso edita tareas</span>
    Route::<span class="tok-fn">middleware</span>(<span class="tok-str">'permission:editar tareas'</span>)
        -&gt;<span class="tok-fn">put</span>(<span class="tok-str">'/tareas/{tarea}'</span>, [TareaController::<span class="tok-key">class</span>, <span class="tok-str">'update'</span>]);
});`

const codeModule = `Route::<span class="tok-fn">middleware</span>([<span class="tok-str">'auth'</span>, <span class="tok-str">'role:admin'</span>])-&gt;<span class="tok-fn">prefix</span>(<span class="tok-str">'admin'</span>)-&gt;<span class="tok-fn">group</span>(<span class="tok-key">function</span> () {
    Route::<span class="tok-fn">resource</span>(<span class="tok-str">'usuarios'</span>, UserController::<span class="tok-key">class</span>);
    Route::<span class="tok-fn">resource</span>(<span class="tok-str">'reportes'</span>, ReporteController::<span class="tok-key">class</span>);

    <span class="tok-com">// Excepcion: esta ruta NO exige ser admin</span>
    Route::<span class="tok-fn">get</span>(<span class="tok-str">'/perfil'</span>, [PerfilController::<span class="tok-key">class</span>, <span class="tok-str">'show'</span>])
        -&gt;<span class="tok-fn">withoutMiddleware</span>(<span class="tok-str">'role:admin'</span>);
});`

const codeSessionRW = `<span class="tok-com">// Guardar</span>
$request-&gt;<span class="tok-fn">session</span>()-&gt;<span class="tok-fn">put</span>(<span class="tok-str">'ultima_vista'</span>, <span class="tok-str">'tareas'</span>);
<span class="tok-fn">session</span>([<span class="tok-str">'tema'</span> =&gt; <span class="tok-str">'oscuro'</span>]);            <span class="tok-com">// helper global</span>

<span class="tok-com">// Leer (con valor por defecto)</span>
$vista = $request-&gt;<span class="tok-fn">session</span>()-&gt;<span class="tok-fn">get</span>(<span class="tok-str">'ultima_vista'</span>, <span class="tok-str">'inicio'</span>);
$tema  = <span class="tok-fn">session</span>(<span class="tok-str">'tema'</span>);

<span class="tok-com">// Comprobar y borrar</span>
$request-&gt;<span class="tok-fn">session</span>()-&gt;<span class="tok-fn">has</span>(<span class="tok-str">'tema'</span>);
$request-&gt;<span class="tok-fn">session</span>()-&gt;<span class="tok-fn">forget</span>(<span class="tok-str">'tema'</span>);`

const codeFlash = `<span class="tok-com">// En el controlador, tras guardar</span>
<span class="tok-key">return</span> <span class="tok-fn">redirect</span>()-&gt;<span class="tok-fn">route</span>(<span class="tok-str">'tareas.index'</span>)-&gt;<span class="tok-fn">with</span>(<span class="tok-str">'status'</span>, <span class="tok-str">'Tarea creada'</span>);

<span class="tok-com">{{-- En la vista Blade --}}</span>
<span class="tok-key">@if</span> (<span class="tok-fn">session</span>(<span class="tok-str">'status'</span>))
    &lt;div class="alerta"&gt;{{ <span class="tok-fn">session</span>(<span class="tok-str">'status'</span>) }}&lt;/div&gt;
<span class="tok-key">@endif</span>`

const codeSessionSec = `<span class="tok-com">// Tras iniciar sesion: previene "session fixation"</span>
$request-&gt;<span class="tok-fn">session</span>()-&gt;<span class="tok-fn">regenerate</span>();

<span class="tok-com">// Al cerrar sesion: borra todo e invalida la sesion</span>
Auth::<span class="tok-fn">logout</span>();
$request-&gt;<span class="tok-fn">session</span>()-&gt;<span class="tok-fn">invalidate</span>();
$request-&gt;<span class="tok-fn">session</span>()-&gt;<span class="tok-fn">regenerateToken</span>();`

export const slides = [
  // 1 · Portada
  <Slide key="s1" center>
    <LaravelLogo />
    <span className="eyebrow">Módulo II · Sesión 7</span>
    <h1>
      Middleware y <span className="accent">Control de Acceso</span>
    </h1>
    <p className="lead muted" style={{ marginTop: '1.2rem' }}>
      Desarrollo de Aplicaciones Web con Laravel 13
    </p>
    <p className="muted" style={{ marginTop: '1.6rem' }}>
      Expositor: <b>Omar Mamani</b> · Duración: 1h 30min
    </p>
  </Slide>,

  // 2 · Repaso de la Sesión 6
  <CardsGrid
    key="s2"
    cols={3}
    eyebrow="Venimos de la Sesión 6"
    title="Repaso rápido"
    cards={[
      { title: '🔑 Autenticación', body: 'Breeze: login, registro y recuperación.' },
      { title: '🛡️ Autorización', body: 'Gates y Policies.' },
      { title: '👥 Roles y permisos', body: 'Spatie: assignRole, can, role:/permission:.' },
    ]}
  />,

  // 3 · Agenda
  <CardsGrid
    key="s3"
    eyebrow="Hoja de ruta"
    title="Agenda de la sesión"
    cards={[
      { title: '1 · Middleware', body: 'Qué es, integrado y personalizado.' },
      { title: '2 · Protección de rutas', body: 'Parámetros y combinar middleware.' },
      { title: '3 · Gestión de sesiones', body: 'Datos, flash y seguridad.' },
      { title: '4 · Laboratorio', body: 'Proteger módulos según permisos.' },
    ]}
  />,

  // 4 · Objetivos
  <BulletSlide
    key="s4"
    eyebrow="¿Qué lograrás hoy?"
    title="Objetivos de aprendizaje"
    variant="checks"
    items={[
      <>Entender qué es un <b>middleware</b> (capas que filtran).</>,
      <>Diferenciar middleware <b>before</b> y <b>after</b>.</>,
      <>Reconocer el <b>middleware integrado</b> de Laravel.</>,
      <>Crear <b>middleware personalizado</b>.</>,
      <>Registrar y asignar middleware a rutas.</>,
      <>Pasar <b>parámetros</b> al middleware.</>,
      <>Proteger <b>módulos</b> combinando middleware.</>,
      <>Manejar la <b>sesión</b>: datos, flash y seguridad.</>,
    ]}
  />,

  // 5 · Divider 1
  <SectionDivider key="s5" center num="01" eyebrow="Bloque 1" title="Middleware" subtitle="Los filtros por los que pasa cada petición." />,

  // 6 · ¿Qué es un middleware?
  <TwoColumn
    key="s6"
    eyebrow="Concepto"
    title="¿Qué es un middleware?"
    left={
      <>
        <p className="lead">
          Inspecciona y <b>filtra</b> cada petición HTTP antes (o después) de llegar a tu código. Viven
          en <code>app/Http/Middleware</code>.
        </p>
        <p className="muted" style={{ marginTop: '0.8rem' }}>
          <b>Analogía:</b> los controles de un <b>aeropuerto</b> 🛂: cada persona cruza varios filtros
          antes de abordar. Cada filtro deja pasar o rechaza.
        </p>
      </>
    }
    right={
      <Card title="Before vs After">
        <ul>
          <li><b>Before:</b> haces algo y luego <code>return $next($request)</code>.</li>
          <li><b>After:</b> guardas <code>$response = $next($request)</code>, actúas y lo devuelves.</li>
        </ul>
      </Card>
    }
  />,

  // 7 · Middleware integrado
  <Slide key="s7">
    <span className="eyebrow">Ya viene con Laravel</span>
    <h2>Middleware integrado</h2>
    <table style={{ marginTop: '0.6rem' }}>
      <thead>
        <tr><th>Alias</th><th>Qué hace</th></tr>
      </thead>
      <tbody>
        <tr><td><code>auth</code></td><td>Exige usuario autenticado</td></tr>
        <tr><td><code>guest</code></td><td>Solo invitados (no logueados)</td></tr>
        <tr><td><code>verified</code></td><td>Exige email verificado</td></tr>
        <tr><td><code>can</code></td><td>Autoriza con una Policy/Gate</td></tr>
        <tr><td><code>throttle</code></td><td>Limita peticiones (anti abuso)</td></tr>
        <tr><td><code>role:</code> / <code>permission:</code></td><td>(Spatie) exige rol o permiso</td></tr>
      </tbody>
    </table>
    <p className="muted" style={{ marginTop: '0.8rem' }}>
      Tú solo los <b>asignas</b> a las rutas. ¡No reinventas la seguridad!
    </p>
  </Slide>,

  // 8 · Middleware personalizado
  <Slide key="s8">
    <span className="eyebrow">Tu propio filtro</span>
    <h2>Middleware personalizado</h2>
    <CodeBlock html={codeMakeMw} />
    <div style={{ marginTop: '0.7rem' }}>
      <CodeBlock html={codeMwClass} />
    </div>
    <p className="muted" style={{ marginTop: '0.7rem' }}>
      La clave es <code>return $next($request)</code>: si lo llamas, la petición <b>avanza</b>; si no,
      la <b>cortas</b> (redirigiendo o abortando).
    </p>
  </Slide>,

  // 9 · Registrar y asignar
  <Slide key="s9">
    <span className="eyebrow">Darle un nombre y usarlo</span>
    <h2>Registrar y asignar</h2>
    <CodeBlock html={codeRegister} />
    <div style={{ marginTop: '0.7rem' }}>
      <CodeBlock html={codeAssign} />
    </div>
    <p className="muted" style={{ marginTop: '0.7rem' }}>
      🆕 En Laravel 11+ el registro vive en <code>bootstrap/app.php</code> (ya no en{' '}
      <code>Kernel.php</code>).
    </p>
  </Slide>,

  // 10 · Divider 2
  <SectionDivider key="s10" center num="02" eyebrow="Bloque 2" title="Protección de Rutas" subtitle="Controla quién entra a cada parte." />,

  // 11 · Middleware con parámetros
  <Slide key="s11">
    <span className="eyebrow">Filtros configurables</span>
    <h2>Middleware con parámetros</h2>
    <CodeBlock html={codeMwParam} />
    <p className="muted" style={{ marginTop: '0.8rem' }}>
      Así funciona por dentro el <code>role:editor</code> de Spatie. Los parámetros van tras{' '}
      <code>:</code>, separados por comas.
    </p>
  </Slide>,

  // 12 · Proteger rutas
  <Slide key="s12">
    <span className="eyebrow">Combinar filtros</span>
    <h2>Proteger rutas</h2>
    <CodeBlock html={codeProtect} />
    <p className="muted" style={{ marginTop: '0.8rem' }}>
      Los middleware se <b>encadenan</b>: primero <code>auth</code>, luego el de rol o permiso. Se
      ejecutan en orden.
    </p>
  </Slide>,

  // 13 · Control de acceso por módulo
  <Slide key="s13">
    <span className="eyebrow">Un módulo, una línea</span>
    <h2>Control de acceso por módulo</h2>
    <CodeBlock html={codeModule} />
    <p className="muted" style={{ marginTop: '0.8rem' }}>
      Proteges un <b>módulo entero</b> con un grupo, y con <code>withoutMiddleware</code> haces
      excepciones puntuales.
    </p>
  </Slide>,

  // 14 · Divider 3
  <SectionDivider key="s14" center num="03" eyebrow="Bloque 3" title="Gestión de Sesiones" subtitle="Recordar al usuario entre peticiones." />,

  // 15 · ¿Qué es una sesión?
  <TwoColumn
    key="s15"
    eyebrow="Estado entre peticiones"
    title="¿Qué es una sesión?"
    left={
      <>
        <p className="lead">
          HTTP no recuerda nada. La <b>sesión</b> guarda tus datos entre peticiones.
        </p>
        <p className="muted" style={{ marginTop: '0.8rem' }}>
          <b>Analogía:</b> la <b>pulsera de un evento</b> 🎟️: te identifica entre puerta y puerta sin
          volver a mostrar el boleto. Se configura en <code>config/session.php</code>.
        </p>
      </>
    }
    right={
      <Card title="Drivers">
        <p className="muted">
          <code>file</code>, <code>cookie</code>, <b><code>database</code></b> (por defecto en Laravel
          13) y <code>redis</code>. Se elige con <code>SESSION_DRIVER</code> en <code>.env</code>.
        </p>
      </Card>
    }
  />,

  // 16 · Leer y guardar datos
  <Slide key="s16">
    <span className="eyebrow">Dos formas equivalentes</span>
    <h2>Leer y guardar datos</h2>
    <CodeBlock html={codeSessionRW} />
    <p className="muted" style={{ marginTop: '0.8rem' }}>
      <code>$request-&gt;session()</code> y el helper <code>session()</code> hacen lo mismo. Útiles para
      preferencias del usuario o estado temporal.
    </p>
  </Slide>,

  // 17 · Mensajes flash
  <Slide key="s17">
    <span className="eyebrow">Solo hasta la siguiente petición</span>
    <h2>Mensajes flash</h2>
    <CodeBlock html={codeFlash} />
    <p className="muted" style={{ marginTop: '0.8rem' }}>
      <code>-&gt;with(...)</code> en un redirect guarda un flash; la vista lo muestra una vez y
      desaparece. Perfecto para "Tarea guardada".
    </p>
  </Slide>,

  // 18 · Seguridad de la sesión
  <Slide key="s18">
    <span className="eyebrow">Proteger la sesión</span>
    <h2>Seguridad de la sesión</h2>
    <CodeBlock html={codeSessionSec} />
    <p className="muted" style={{ marginTop: '0.8rem' }}>
      Breeze ya hace esto en login/logout. Regenerar el ID protege contra ataques de <b>fijación de
      sesión</b>.
    </p>
  </Slide>,

  // 19 · Divider 4
  <SectionDivider key="s19" center num="04" eyebrow="Bloque 4" title="Laboratorio" subtitle="Proteger módulos según permisos. ⌨️" />,

  // 20 · Laboratorio paso a paso
  <CardsGrid key="s20" eyebrow="Práctica guiada" title="Laboratorio paso a paso">
    <Card title="① Definir los módulos">
      <ul>
        <li>Tareas (logueados), Usuarios (admin), Reportes (admin/editor).</li>
      </ul>
    </Card>
    <Card title="② Proteger con middleware">
      <ul>
        <li>Grupos con <code>auth</code> + <code>role:</code>/<code>permission:</code>.</li>
        <li>Un middleware propio si hace falta.</li>
      </ul>
    </Card>
    <Card title="③ Mensajes de acceso">
      <ul>
        <li>Flash "No tienes permiso" al redirigir.</li>
        <li>Ocultar enlaces con <code>@role</code> / <code>@can</code>.</li>
      </ul>
    </Card>
    <Card title="④ Probar con varios roles">
      <ul>
        <li>Iniciar como admin, editor y usuario.</li>
        <li><code>route:list -v</code> para ver el middleware.</li>
      </ul>
    </Card>
  </CardsGrid>,

  // 21 · Módulos protegidos
  <Slide key="s21">
    <span className="eyebrow">El resultado</span>
    <h2>Módulos protegidos</h2>
    <table style={{ marginTop: '0.6rem' }}>
      <thead>
        <tr><th>Módulo</th><th>Middleware</th><th>Quién entra</th></tr>
      </thead>
      <tbody>
        <tr><td>Tareas (ver)</td><td><code>auth</code></td><td>Todos los logueados</td></tr>
        <tr><td>Tareas (editar)</td><td><code>auth</code> + <code>permission:editar tareas</code></td><td>Admin, Editor</td></tr>
        <tr><td>Usuarios</td><td><code>auth</code> + <code>role:admin</code></td><td>Solo Admin</td></tr>
        <tr><td>Reportes</td><td><code>auth</code> + <code>role:admin,editor</code></td><td>Admin, Editor</td></tr>
      </tbody>
    </table>
    <p className="muted" style={{ marginTop: '0.8rem' }}>
      🧠 Un grupo de rutas + un middleware = un módulo entero protegido en una línea.
    </p>
  </Slide>,

  // 22 · Checklist
  <Slide key="s22">
    <span className="eyebrow">Antes de cerrar</span>
    <h2>Checklist de la sesión</h2>
    <ul className="checks big" style={{ marginTop: '1rem' }}>
      <li>Entiendo qué es un middleware y el flujo before/after.</li>
      <li>Reconozco el middleware integrado (auth, guest, can, throttle).</li>
      <li>Creo middleware personalizado (make:middleware, handle, $next).</li>
      <li>Registro (alias en bootstrap/app.php) y asigno middleware.</li>
      <li>Paso parámetros al middleware (role:editor).</li>
      <li>Protejo módulos combinando middleware y uso withoutMiddleware.</li>
      <li>Manejo la sesión: datos, flash y seguridad.</li>
    </ul>
  </Slide>,

  // 23 · Resumen
  <Slide key="s23">
    <span className="eyebrow">Lo que aprendiste hoy</span>
    <h2>Resumen de la sesión</h2>
    <div className="grid g2" style={{ marginTop: '0.8rem' }}>
      <Card title="Middleware">
        <p className="muted">
          Filtros por los que pasa cada petición; integrados o propios, con parámetros.
        </p>
      </Card>
      <Card title="Control de acceso">
        <p className="muted">
          Combinando <code>auth</code> + <code>role:</code> + <code>permission:</code> proteges rutas y
          módulos enteros.
        </p>
      </Card>
    </div>
    <p className="lead" style={{ marginTop: '1.2rem' }}>
      📌 Idea central: <span className="accent">el middleware decide quién pasa antes de llegar a tu código</span>.
    </p>
  </Slide>,

  // 24 · Próxima sesión + tarea
  <Slide key="s24" center>
    <span className="eyebrow">Próxima sesión</span>
    <h2 style={{ fontSize: '2.6rem' }}>Sesión 8 - Formularios y Validaciones</h2>
    <div className="grid g2" style={{ marginTop: '1.4rem', maxWidth: '60vw' }}>
      <Card title="Blade Forms + Form Request"><p className="muted">Capturar datos del usuario de forma segura.</p></Card>
      <Card title="Validaciones"><p className="muted">Reglas, mensajes personalizados y subida de archivos.</p></Card>
    </div>
    <p className="muted" style={{ marginTop: '1.4rem' }}>
      <b>Tarea:</b> crea un middleware <code>EnsureUserIsActive</code> y aplícalo al módulo de tareas;
      muestra un mensaje flash cuando se deniegue el acceso.
    </p>
  </Slide>,

  // 25 · Cierre
  <Slide key="s25" center>
    <LaravelLogo />
    <h1>¿Preguntas? 🙌</h1>
    <p className="lead muted" style={{ marginTop: '1rem' }}>
      ¡Gracias por tu atención!
      <br />
      Nos vemos en la Sesión 8.
    </p>
    <p className="muted" style={{ marginTop: '1.6rem' }}>
      Desarrollo de Aplicaciones Web con Laravel 13 · Omar Mamani
    </p>
  </Slide>,
]

export default slides
