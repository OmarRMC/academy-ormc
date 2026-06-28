// ─────────────────────────────────────────────────────────────────────────
// Curso Laravel 13 · Sesión 6 - Autenticación y Gestión de Roles
// Cada elemento del array `slides` es una diapositiva. El componente <Deck>
// se encarga de la navegación, el progreso y la pantalla completa.
// Usa `center` en un nodo para centrar esa diapositiva.
// Base pedagógica: docs/laravel/SESION-06-PLANIFICACION.md
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
  session: 6,
  title: 'Autenticación y Gestión de Roles',
}

// ── Bloques de código (HTML resaltado) ────────────────────────────────────

const codeBreezeInstall = `composer require laravel/breeze --dev
php artisan breeze:install      <span class="tok-com"># elige el stack "Blade"</span>
php artisan migrate
npm install &amp;&amp; npm run dev`

const codeAuthMiddleware = `<span class="tok-com">// routes/web.php</span>
Route::<span class="tok-fn">middleware</span>(<span class="tok-str">'auth'</span>)-&gt;<span class="tok-fn">group</span>(<span class="tok-key">function</span> () {
    Route::<span class="tok-fn">resource</span>(<span class="tok-str">'tareas'</span>, TareaController::<span class="tok-key">class</span>);
});

<span class="tok-com">// Solo invitados (no logueados)</span>
Route::<span class="tok-fn">middleware</span>(<span class="tok-str">'guest'</span>)-&gt;<span class="tok-fn">get</span>(<span class="tok-str">'/promo'</span>, <span class="tok-key">fn</span> () =&gt; <span class="tok-fn">view</span>(<span class="tok-str">'promo'</span>));

<span class="tok-com">// El usuario autenticado</span>
$user = <span class="tok-fn">auth</span>()-&gt;<span class="tok-fn">user</span>();
$user = $request-&gt;<span class="tok-fn">user</span>();`

const codeGates = `<span class="tok-com">// app/Providers/AppServiceProvider.php → boot()</span>
<span class="tok-key">use</span> Illuminate\\Support\\Facades\\Gate;

Gate::<span class="tok-fn">define</span>(<span class="tok-str">'ver-admin'</span>, <span class="tok-key">function</span> (User $user) {
    <span class="tok-key">return</span> $user-&gt;es_admin;
});

<span class="tok-com">// Autorizar</span>
<span class="tok-key">if</span> (Gate::<span class="tok-fn">allows</span>(<span class="tok-str">'ver-admin'</span>)) { <span class="tok-com">/* ... */</span> }
Gate::<span class="tok-fn">authorize</span>(<span class="tok-str">'ver-admin'</span>);        <span class="tok-com">// lanza 403 si no puede</span>`

const codePolicyBash = `php artisan make:policy TareaPolicy --model=Tarea`

const codePolicyClass = `<span class="tok-com">// app/Policies/TareaPolicy.php</span>
<span class="tok-key">class</span> <span class="tok-fn">TareaPolicy</span>
{
    <span class="tok-com">// ¿Puede este usuario actualizar esta tarea?</span>
    <span class="tok-key">public function</span> <span class="tok-fn">update</span>(User $user, Tarea $tarea): <span class="tok-key">bool</span>
    {
        <span class="tok-key">return</span> $user-&gt;id === $tarea-&gt;user_id;
    }
}`

const codePolicyUse = `<span class="tok-com">// En el controlador</span>
<span class="tok-key">public function</span> <span class="tok-fn">update</span>(Request $request, Tarea $tarea)
{
    $this-&gt;<span class="tok-fn">authorize</span>(<span class="tok-str">'update'</span>, $tarea);   <span class="tok-com">// 403 si no puede</span>
    <span class="tok-com">// ... actualizar ...</span>
}

<span class="tok-com">// O desde el usuario</span>
<span class="tok-key">if</span> ($request-&gt;<span class="tok-fn">user</span>()-&gt;<span class="tok-fn">can</span>(<span class="tok-str">'update'</span>, $tarea)) { <span class="tok-com">/* ... */</span> }

<span class="tok-com">// En Blade</span>
<span class="tok-key">@can</span>(<span class="tok-str">'update'</span>, $tarea) &lt;a href="..."&gt;Editar&lt;/a&gt; <span class="tok-key">@endcan</span>`

const codeSpatieInstall = `composer require spatie/laravel-permission
php artisan vendor:publish --provider="Spatie\\Permission\\PermissionServiceProvider"
php artisan migrate`

const codeSpatieTrait = `<span class="tok-com">// app/Models/User.php</span>
<span class="tok-key">use</span> Spatie\\Permission\\Traits\\HasRoles;

<span class="tok-key">class</span> <span class="tok-fn">User</span> <span class="tok-key">extends</span> Authenticatable
{
    <span class="tok-key">use</span> HasRoles;
}`

const codeSpatieCreate = `<span class="tok-key">use</span> Spatie\\Permission\\Models\\Role;
<span class="tok-key">use</span> Spatie\\Permission\\Models\\Permission;

<span class="tok-com">// Crear (normalmente en un seeder)</span>
$admin  = Role::<span class="tok-fn">create</span>([<span class="tok-str">'name'</span> =&gt; <span class="tok-str">'admin'</span>]);
$editor = Role::<span class="tok-fn">create</span>([<span class="tok-str">'name'</span> =&gt; <span class="tok-str">'editor'</span>]);
Permission::<span class="tok-fn">create</span>([<span class="tok-str">'name'</span> =&gt; <span class="tok-str">'editar tareas'</span>]);

<span class="tok-com">// Asignar permisos a un rol y rol a un usuario</span>
$editor-&gt;<span class="tok-fn">givePermissionTo</span>(<span class="tok-str">'editar tareas'</span>);
$user-&gt;<span class="tok-fn">assignRole</span>(<span class="tok-str">'editor'</span>);`

const codeSpatieVerify = `<span class="tok-com">// Comprobar en PHP</span>
$user-&gt;<span class="tok-fn">hasRole</span>(<span class="tok-str">'admin'</span>);
$user-&gt;<span class="tok-fn">can</span>(<span class="tok-str">'editar tareas'</span>);

<span class="tok-com">// Proteger rutas por rol o permiso</span>
Route::<span class="tok-fn">middleware</span>(<span class="tok-str">'role:admin'</span>)-&gt;<span class="tok-fn">group</span>(<span class="tok-key">function</span> () { <span class="tok-com">/* ... */</span> });
Route::<span class="tok-fn">middleware</span>(<span class="tok-str">'permission:editar tareas'</span>)-&gt;<span class="tok-fn">put</span>(<span class="tok-str">'/tareas/{tarea}'</span>, ...);

<span class="tok-com">// En Blade</span>
<span class="tok-key">@role</span>(<span class="tok-str">'admin'</span>) &lt;a href="/admin"&gt;Panel admin&lt;/a&gt; <span class="tok-key">@endrole</span>`

export const slides = [
  // 1 · Portada
  <Slide key="s1" center>
    <LaravelLogo />
    <span className="eyebrow">Módulo II · Sesión 6</span>
    <h1>
      Autenticación y <span className="accent">Gestión de Roles</span>
    </h1>
    <p className="lead muted" style={{ marginTop: '1.2rem' }}>
      Desarrollo de Aplicaciones Web con Laravel 13
    </p>
    <p className="muted" style={{ marginTop: '1.6rem' }}>
      Expositor: <b>Omar Mamani</b> · Duración: 1h 30min
    </p>
  </Slide>,

  // 2 · Arrancamos el Módulo II
  <CardsGrid
    key="s2"
    cols={3}
    eyebrow="Empieza el Módulo II"
    title="¿Dónde estamos?"
    cards={[
      { title: '✅ Módulo I', body: 'Rutas, controladores, Blade, base de datos y Eloquent.' },
      { title: '🔐 Módulo II', body: 'Seguridad: autenticación, roles, permisos y middleware.' },
      { title: '🗂️ El proyecto', body: 'El mismo gestion-app, ahora con usuarios y control de acceso.' },
    ]}
  />,

  // 3 · Agenda
  <CardsGrid
    key="s3"
    eyebrow="Hoja de ruta"
    title="Agenda de la sesión"
    cards={[
      { title: '1 · Autenticación', body: 'Breeze: login, registro y recuperación.' },
      { title: '2 · Autorización', body: 'Gates y Policies.' },
      { title: '3 · Roles y Permisos', body: 'Spatie Laravel Permission.' },
      { title: '4 · Laboratorio', body: 'Roles Admin/Editor/Usuario y acceso restringido.' },
    ]}
  />,

  // 4 · Objetivos
  <BulletSlide
    key="s4"
    eyebrow="¿Qué lograrás hoy?"
    title="Objetivos de aprendizaje"
    variant="checks"
    items={[
      <>Diferenciar <b>autenticación</b> de <b>autorización</b>.</>,
      <>Instalar <b>Breeze</b> y saber qué genera.</>,
      <>Conocer el contexto actual (starter kits + Fortify).</>,
      <>Proteger rutas con el middleware <code>auth</code>.</>,
      <>Definir <b>Gates</b> y autorizar acciones.</>,
      <>Crear y usar <b>Policies</b>.</>,
      <>Diferenciar <b>roles</b> de <b>permisos</b>.</>,
      <>Integrar <b>Spatie</b>: crear, asignar y verificar.</>,
    ]}
  />,

  // 5 · Divider 1
  <SectionDivider key="s5" center num="01" eyebrow="Bloque 1" title="Autenticación" subtitle="¿Quién eres? El portero de la app." />,

  // 6 · Autenticación vs Autorización
  <TwoColumn
    key="s6"
    eyebrow="Dos conceptos distintos"
    title="Autenticación vs Autorización"
    left={
      <>
        <p className="lead">
          <b>Autenticación</b> = <b>QUIÉN</b> eres (login). <b>Autorización</b> = <b>QUÉ</b> puedes
          hacer (permisos).
        </p>
        <p className="muted" style={{ marginTop: '0.8rem' }}>
          <b>Analogía:</b> un edificio corporativo 🏢. La autenticación es el <b>portero</b> que
          verifica tu cédula; la autorización, la <b>lista de permisos</b>: a qué pisos entras.
        </p>
      </>
    }
    right={
      <Card title="Hoy veremos">
        <ul>
          <li>Autenticación con <b>Breeze</b>.</li>
          <li>Autorización con <b>Gates</b> y <b>Policies</b>.</li>
          <li>Roles y permisos con <b>Spatie</b>.</li>
        </ul>
      </Card>
    }
  />,

  // 7 · Laravel Breeze
  <Slide key="s7">
    <span className="eyebrow">Scaffolding de autenticación</span>
    <h2>Laravel Breeze</h2>
    <CodeBlock html={codeBreezeInstall} />
    <p className="muted" style={{ marginTop: '0.8rem' }}>
      ⚠️ <b>Contexto Laravel 13:</b> lo oficial hoy son los <b>starter kits</b> (con <b>Fortify</b>),
      que se eligen con <code>laravel new</code>. Breeze ya no está en la doc oficial, pero <b>sigue
      funcionando</b> y es ideal para aprender en un proyecto Blade.
    </p>
  </Slide>,

  // 8 · ¿Qué genera Breeze?
  <Slide key="s8">
    <span className="eyebrow">Todo listo en minutos</span>
    <h2>¿Qué genera Breeze?</h2>
    <table style={{ marginTop: '0.6rem' }}>
      <thead>
        <tr><th>Funcionalidad</th><th>Ruta</th><th>Qué hace</th></tr>
      </thead>
      <tbody>
        <tr><td><b>Login</b></td><td><code>/login</code></td><td>Iniciar sesión</td></tr>
        <tr><td><b>Registro</b></td><td><code>/register</code></td><td>Crear cuenta</td></tr>
        <tr><td><b>Recuperación</b></td><td><code>/forgot-password</code></td><td>Enviar enlace de reseteo</td></tr>
        <tr><td><b>Reseteo</b></td><td><code>/reset-password</code></td><td>Definir nueva contraseña</td></tr>
        <tr><td><b>Dashboard</b></td><td><code>/dashboard</code></td><td>Página protegida tras login</td></tr>
      </tbody>
    </table>
    <p className="muted" style={{ marginTop: '0.8rem' }}>
      Todo con vistas Blade listas para personalizar. El alumno <b>no escribe</b> el login desde cero.
    </p>
  </Slide>,

  // 9 · Middleware de autenticación
  <Slide key="s9">
    <span className="eyebrow">Proteger rutas</span>
    <h2>Middleware de autenticación</h2>
    <CodeBlock html={codeAuthMiddleware} />
    <p className="muted" style={{ marginTop: '0.8rem' }}>
      <code>auth</code> exige sesión; <code>guest</code> es lo contrario; <code>verified</code> exige
      email verificado. Sin sesión, Laravel redirige a <code>/login</code>.
    </p>
  </Slide>,

  // 10 · Divider 2
  <SectionDivider key="s10" center num="02" eyebrow="Bloque 2" title="Autorización" subtitle="¿Qué puedes hacer? Gates y Policies." />,

  // 11 · Gates vs Policies
  <TwoColumn
    key="s11"
    eyebrow="Dos formas de autorizar"
    title="Gates vs Policies"
    left={
      <Card title="Gates">
        <p className="muted">
          Cierres (closures) <b>simples</b> para acciones sueltas no ligadas a un modelo: por ejemplo
          "ver el panel de admin".
        </p>
      </Card>
    }
    right={
      <Card title="Policies">
        <p className="muted">
          Clases que agrupan la lógica de permisos <b>de un modelo</b>: todo lo de "Tarea" en
          <code> TareaPolicy</code>. Lo recomendado para recursos.
        </p>
      </Card>
    }
  />,

  // 12 · Gates
  <Slide key="s12">
    <span className="eyebrow">Closures de autorización</span>
    <h2>Gates</h2>
    <CodeBlock html={codeGates} />
    <p className="muted" style={{ marginTop: '0.8rem' }}>
      No hace falta pasar el usuario: Laravel usa el autenticado. <code>authorize()</code> corta con un
      <b> 403</b> automático si no está permitido. En Blade: <code>@can('ver-admin')</code>.
    </p>
  </Slide>,

  // 13 · Policies: crear
  <Slide key="s13">
    <span className="eyebrow">Lógica por modelo</span>
    <h2>Policies: crear</h2>
    <CodeBlock html={codePolicyBash} />
    <div style={{ marginTop: '0.7rem' }}>
      <CodeBlock html={codePolicyClass} />
    </div>
    <p className="muted" style={{ marginTop: '0.7rem' }}>
      Con <code>--model</code> se generan <code>viewAny</code>, <code>view</code>, <code>create</code>,
      <code> update</code>, <code>delete</code>. Laravel 13 descubre la policy por convención.
    </p>
  </Slide>,

  // 14 · Policies: usar
  <Slide key="s14">
    <span className="eyebrow">Autorizar acciones</span>
    <h2>Policies: usar</h2>
    <CodeBlock html={codePolicyUse} />
    <p className="muted" style={{ marginTop: '0.8rem' }}>
      Un <code>before()</code> en la policy puede dar acceso total al admin a todo, sin repetir lógica
      en cada método.
    </p>
  </Slide>,

  // 15 · Divider 3
  <SectionDivider key="s15" center num="03" eyebrow="Bloque 3" title="Roles y Permisos (Spatie)" subtitle="Control de acceso a escala real." />,

  // 16 · Roles vs Permisos
  <TwoColumn
    key="s16"
    eyebrow="El estándar de la industria"
    title="Roles vs Permisos"
    left={
      <>
        <p className="lead">
          El <b>rol</b> es el <b>cargo</b> (Administrador, Editor); los <b>permisos</b> son las
          <b> llaves</b> concretas (editar tareas, borrar usuarios) 🔑.
        </p>
        <p className="muted" style={{ marginTop: '0.8rem' }}>
          Hacerlo a mano con Gates se vuelve tedioso. <b>spatie/laravel-permission</b> es el estándar
          para roles y permisos en Laravel.
        </p>
      </>
    }
    right={
      <Card title="La idea">
        <p className="muted">
          Asignas <b>permisos a roles</b> y <b>roles a usuarios</b>. Luego preguntas
          <code> $user-&gt;can('editar tareas')</code> sin importar cómo lo obtuvo.
        </p>
      </Card>
    }
  />,

  // 17 · Instalar Spatie + HasRoles
  <Slide key="s17">
    <span className="eyebrow">Instalación</span>
    <h2>Instalar Spatie + HasRoles</h2>
    <CodeBlock html={codeSpatieInstall} />
    <div style={{ marginTop: '0.7rem' }}>
      <CodeBlock html={codeSpatieTrait} />
    </div>
    <p className="muted" style={{ marginTop: '0.7rem' }}>
      El trait <code>HasRoles</code> agrega al usuario todos los métodos de roles y permisos.
    </p>
  </Slide>,

  // 18 · Crear y asignar
  <Slide key="s18">
    <span className="eyebrow">Permiso → Rol → Usuario</span>
    <h2>Crear y asignar roles/permisos</h2>
    <CodeBlock html={codeSpatieCreate} />
    <p className="muted" style={{ marginTop: '0.8rem' }}>
      Patrón: <b>permisos → rol → usuario</b>. Lo ideal es sembrarlo todo en un seeder (lo haremos en
      el laboratorio).
    </p>
  </Slide>,

  // 19 · Verificar: middleware y Blade
  <Slide key="s19">
    <span className="eyebrow">Restringir el acceso</span>
    <h2>Verificar: middleware y Blade</h2>
    <CodeBlock html={codeSpatieVerify} />
    <p className="muted" style={{ marginTop: '0.8rem' }}>
      Spatie se integra con la autorización de Laravel: <code>$user-&gt;can(...)</code> y <code>@can</code>
      funcionan igual que con Policies.
    </p>
  </Slide>,

  // 20 · Divider 4
  <SectionDivider key="s20" center num="04" eyebrow="Bloque 4" title="Laboratorio" subtitle="Roles, permisos y acceso restringido. ⌨️" />,

  // 21 · Laboratorio paso a paso
  <CardsGrid key="s21" eyebrow="Práctica guiada" title="Laboratorio paso a paso">
    <Card title="① Instalar la seguridad">
      <ul>
        <li>Breeze (stack Blade) + <code>migrate</code>.</li>
        <li>Spatie (<code>vendor:publish</code> + <code>migrate</code>).</li>
      </ul>
    </Card>
    <Card title="② Sembrar roles y permisos">
      <ul>
        <li>Roles: <code>admin</code>, <code>editor</code>, <code>usuario</code>.</li>
        <li>Permisos: ver / crear / editar / eliminar tareas.</li>
      </ul>
    </Card>
    <Card title="③ Asignar a usuarios">
      <ul>
        <li>3 usuarios con factory y <code>assignRole(...)</code>.</li>
        <li><code>givePermissionTo</code> según el rol.</li>
      </ul>
    </Card>
    <Card title="④ Restringir el acceso">
      <ul>
        <li>Rutas con <code>auth</code> + <code>role:</code>/<code>permission:</code>.</li>
        <li>Botones en Blade con <code>@can</code> / <code>@role</code>.</li>
      </ul>
    </Card>
  </CardsGrid>,

  // 22 · Permisos por rol
  <Slide key="s22">
    <span className="eyebrow">El resultado</span>
    <h2>Permisos por rol</h2>
    <table style={{ marginTop: '0.6rem' }}>
      <thead>
        <tr><th>Acción</th><th>Administrador</th><th>Editor</th><th>Usuario</th></tr>
      </thead>
      <tbody>
        <tr><td>Ver tareas</td><td>✅</td><td>✅</td><td>✅</td></tr>
        <tr><td>Crear tareas</td><td>✅</td><td>✅</td><td>❌</td></tr>
        <tr><td>Editar tareas</td><td>✅</td><td>✅</td><td>❌</td></tr>
        <tr><td>Eliminar tareas</td><td>✅</td><td>❌</td><td>❌</td></tr>
        <tr><td>Gestionar usuarios</td><td>✅</td><td>❌</td><td>❌</td></tr>
      </tbody>
    </table>
    <p className="muted" style={{ marginTop: '0.8rem' }}>
      🧠 El mismo sistema, tres experiencias distintas según el rol. Eso es control de acceso.
    </p>
  </Slide>,

  // 23 · Checklist
  <Slide key="s23">
    <span className="eyebrow">Antes de cerrar</span>
    <h2>Checklist de la sesión</h2>
    <ul className="checks big" style={{ marginTop: '1rem' }}>
      <li>Diferencio autenticación de autorización.</li>
      <li>Instalé Breeze y conozco el contexto (starter kits + Fortify).</li>
      <li>Protejo rutas con el middleware auth.</li>
      <li>Defino Gates y autorizo con allows/authorize.</li>
      <li>Creo y uso Policies (can, authorize, @can).</li>
      <li>Diferencio roles de permisos.</li>
      <li>Uso Spatie: crear, asignar y verificar roles/permisos.</li>
      <li>Restrinjo acceso con role:/permission: y @role.</li>
    </ul>
  </Slide>,

  // 24 · Resumen
  <Slide key="s24">
    <span className="eyebrow">Lo que aprendiste hoy</span>
    <h2>Resumen de la sesión</h2>
    <div className="grid g2" style={{ marginTop: '0.8rem' }}>
      <Card title="Autenticación">
        <p className="muted">
          Breeze da login, registro y recuperación; el middleware <code>auth</code> protege las rutas.
        </p>
      </Card>
      <Card title="Autorización">
        <p className="muted">
          <b>Gates</b> y <b>Policies</b> deciden permisos; <b>Spatie</b> organiza roles y permisos a
          escala.
        </p>
      </Card>
    </div>
    <p className="lead" style={{ marginTop: '1.2rem' }}>
      📌 Idea central: <span className="accent">autenticación dice QUIÉN eres; autorización, QUÉ puedes hacer</span>.
    </p>
  </Slide>,

  // 25 · Próxima sesión + tarea
  <Slide key="s25" center>
    <span className="eyebrow">Próxima sesión</span>
    <h2 style={{ fontSize: '2.6rem' }}>Sesión 7 - Middleware y Control de Acceso</h2>
    <div className="grid g2" style={{ marginTop: '1.4rem', maxWidth: '60vw' }}>
      <Card title="Middleware personalizado"><p className="muted">Crear tus propios filtros de petición.</p></Card>
      <Card title="Control de acceso"><p className="muted">Protección de rutas y gestión de sesiones a fondo.</p></Card>
    </div>
    <p className="muted" style={{ marginTop: '1.4rem' }}>
      <b>Tarea:</b> crea un <code>RoleSeeder</code> con los roles <code>admin</code>, <code>editor</code>
      y <code>usuario</code> y sus permisos, y protege "eliminar tareas" para que solo el admin pueda.
    </p>
  </Slide>,

  // 26 · Cierre
  <Slide key="s26" center>
    <LaravelLogo />
    <h1>¿Preguntas? 🙌</h1>
    <p className="lead muted" style={{ marginTop: '1rem' }}>
      ¡Gracias por tu atención!
      <br />
      Nos vemos en la Sesión 7.
    </p>
    <p className="muted" style={{ marginTop: '1.6rem' }}>
      Desarrollo de Aplicaciones Web con Laravel 13 · Omar Mamani
    </p>
  </Slide>,
]

export default slides
