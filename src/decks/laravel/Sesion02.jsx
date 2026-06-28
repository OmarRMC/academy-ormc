// ─────────────────────────────────────────────────────────────────────────
// Curso Laravel 13 · Sesión 2 - Rutas y Controladores
// Cada elemento del array `slides` es una diapositiva. El componente <Deck>
// se encarga de la navegación, el progreso y la pantalla completa.
// Usa `center` en un nodo para centrar esa diapositiva.
// Base pedagógica: docs/laravel/SESION-02-PLANIFICACION.md
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
  session: 2,
  title: 'Rutas y Controladores',
}

// ── Bloques de código (HTML resaltado) ────────────────────────────────────

const codePrimera = `<span class="tok-com">// routes/web.php</span>
<span class="tok-key">use</span> Illuminate\\Support\\Facades\\Route;

Route::<span class="tok-fn">get</span>(<span class="tok-str">'/saludo'</span>, <span class="tok-key">function</span> () {
    <span class="tok-key">return</span> <span class="tok-str">'Hola Mundo'</span>;
});

<span class="tok-com">// Aplicado al proyecto: listar tareas (datos de ejemplo)</span>
Route::<span class="tok-fn">get</span>(<span class="tok-str">'/tareas'</span>, <span class="tok-key">function</span> () {
    <span class="tok-key">return</span> [<span class="tok-str">'Comprar dominio'</span>, <span class="tok-str">'Configurar servidor'</span>];
});`

const codeMetodos = `Route::<span class="tok-fn">get</span>(<span class="tok-str">'/tareas'</span>, <span class="tok-key">function</span> () { <span class="tok-com">/* listar */</span> });
Route::<span class="tok-fn">post</span>(<span class="tok-str">'/tareas'</span>, <span class="tok-key">function</span> () { <span class="tok-com">/* crear */</span> });
Route::<span class="tok-fn">put</span>(<span class="tok-str">'/tareas/{id}'</span>, <span class="tok-key">function</span> () { <span class="tok-com">/* actualizar */</span> });
Route::<span class="tok-fn">delete</span>(<span class="tok-str">'/tareas/{id}'</span>, <span class="tok-key">function</span> () { <span class="tok-com">/* borrar */</span> });

<span class="tok-com">// Responder a varios verbos</span>
Route::<span class="tok-fn">match</span>([<span class="tok-str">'get'</span>, <span class="tok-str">'post'</span>], <span class="tok-str">'/buscar'</span>, <span class="tok-key">function</span> () {});
Route::<span class="tok-fn">any</span>(<span class="tok-str">'/cualquiera'</span>, <span class="tok-key">function</span> () {});`

const codeInstallApi = `<span class="tok-com"># Crea routes/api.php y prefija /api a sus rutas. Instala Sanctum.</span>
php artisan install:api`

const codeRouteList = `php artisan route:list           <span class="tok-com"># todas las rutas</span>
php artisan route:list -v        <span class="tok-com"># muestra el middleware</span>
php artisan route:list --path=tareas  <span class="tok-com"># solo "tareas"</span>`

const codeParamReq = `<span class="tok-com">// La misma ruta sirve para /tareas/1, /tareas/2, ...</span>
Route::<span class="tok-fn">get</span>(<span class="tok-str">'/tareas/{id}'</span>, <span class="tok-key">function</span> (<span class="tok-key">string</span> $id) {
    <span class="tok-key">return</span> <span class="tok-str">'Mostrando la tarea numero '</span>.$id;
});`

const codeParamOpt = `<span class="tok-com">// El "?" lo hace opcional. SIEMPRE da un valor por defecto.</span>
Route::<span class="tok-fn">get</span>(<span class="tok-str">'/tareas/{estado?}'</span>, <span class="tok-key">function</span> (?<span class="tok-key">string</span> $estado = <span class="tok-str">'todas'</span>) {
    <span class="tok-key">return</span> <span class="tok-str">'Filtrando tareas: '</span>.$estado;
});`

const codeWhere = `Route::<span class="tok-fn">get</span>(<span class="tok-str">'/tareas/{id}'</span>, <span class="tok-key">function</span> (<span class="tok-key">string</span> $id) {
    <span class="tok-key">return</span> <span class="tok-str">'Tarea '</span>.$id;
})-&gt;<span class="tok-fn">whereNumber</span>(<span class="tok-str">'id'</span>);          <span class="tok-com">// solo numeros</span>

Route::<span class="tok-fn">get</span>(<span class="tok-str">'/usuarios/{nombre}'</span>, <span class="tok-key">fn</span> (<span class="tok-key">string</span> $nombre) =&gt; $nombre)
    -&gt;<span class="tok-fn">whereAlpha</span>(<span class="tok-str">'nombre'</span>);                <span class="tok-com">// solo letras</span>

<span class="tok-com">// Atajos: whereNumber, whereAlpha, whereAlphaNumeric, whereIn</span>`

const codeNamed = `<span class="tok-com">// Asignar el nombre con -&gt;name()</span>
Route::<span class="tok-fn">get</span>(<span class="tok-str">'/tareas'</span>, [TareaController::<span class="tok-key">class</span>, <span class="tok-str">'index'</span>])
    -&gt;<span class="tok-fn">name</span>(<span class="tok-str">'tareas.index'</span>);

<span class="tok-com">// Generar la URL por su nombre</span>
$url = <span class="tok-fn">route</span>(<span class="tok-str">'tareas.index'</span>);            <span class="tok-com">// /tareas</span>
$url = <span class="tok-fn">route</span>(<span class="tok-str">'tareas.show'</span>, [<span class="tok-str">'id'</span> =&gt; <span class="tok-num">5</span>]);  <span class="tok-com">// con parametros</span>`

const codeRedirect = `<span class="tok-com">// 1) Atajo directo en la ruta (sin controlador)</span>
Route::<span class="tok-fn">redirect</span>(<span class="tok-str">'/inicio'</span>, <span class="tok-str">'/tareas'</span>);       <span class="tok-com">// 302</span>
Route::<span class="tok-fn">redirect</span>(<span class="tok-str">'/inicio'</span>, <span class="tok-str">'/tareas'</span>, <span class="tok-num">301</span>);  <span class="tok-com">// permanente</span>

<span class="tok-com">// 2) Desde un controlador, a una ruta nombrada</span>
<span class="tok-key">return</span> <span class="tok-fn">redirect</span>()-&gt;<span class="tok-fn">route</span>(<span class="tok-str">'tareas.index'</span>);
<span class="tok-key">return</span> <span class="tok-fn">to_route</span>(<span class="tok-str">'tareas.index'</span>);           <span class="tok-com">// equivalente</span>

<span class="tok-com">// 3) Volver a la pagina anterior</span>
<span class="tok-key">return</span> <span class="tok-fn">back</span>();`

const codeMakeCtrl = `php artisan make:controller TareaController`

const codeCtrlClass = `<span class="tok-key">&lt;?php</span>
<span class="tok-key">namespace</span> App\\Http\\Controllers;

<span class="tok-key">class</span> <span class="tok-fn">TareaController</span> <span class="tok-key">extends</span> Controller
{
    <span class="tok-key">public function</span> <span class="tok-fn">index</span>()
    {
        $tareas = [<span class="tok-str">'Comprar dominio'</span>, <span class="tok-str">'Configurar servidor'</span>];
        <span class="tok-key">return</span> $tareas;
    }

    <span class="tok-key">public function</span> <span class="tok-fn">show</span>(<span class="tok-key">string</span> $id)
    {
        <span class="tok-key">return</span> <span class="tok-str">'Detalle de la tarea '</span>.$id;
    }
}`

const codeConnect = `<span class="tok-com">// routes/web.php</span>
<span class="tok-key">use</span> App\\Http\\Controllers\\TareaController;

Route::<span class="tok-fn">get</span>(<span class="tok-str">'/tareas'</span>, [TareaController::<span class="tok-key">class</span>, <span class="tok-str">'index'</span>])
    -&gt;<span class="tok-fn">name</span>(<span class="tok-str">'tareas.index'</span>);

Route::<span class="tok-fn">get</span>(<span class="tok-str">'/tareas/{id}'</span>, [TareaController::<span class="tok-key">class</span>, <span class="tok-str">'show'</span>])
    -&gt;<span class="tok-fn">whereNumber</span>(<span class="tok-str">'id'</span>)
    -&gt;<span class="tok-fn">name</span>(<span class="tok-str">'tareas.show'</span>);`

const codeInject = `<span class="tok-key">use</span> Illuminate\\Http\\Request;

<span class="tok-key">public function</span> <span class="tok-fn">store</span>(Request $request)
{
    $titulo = $request-&gt;<span class="tok-fn">input</span>(<span class="tok-str">'titulo'</span>);  <span class="tok-com">// dato del form</span>
    <span class="tok-com">// ... crear la tarea ...</span>
    <span class="tok-key">return</span> <span class="tok-fn">redirect</span>()-&gt;<span class="tok-fn">route</span>(<span class="tok-str">'tareas.index'</span>);
}

<span class="tok-com">// Dependencias primero, parametro de ruta despues</span>
<span class="tok-key">public function</span> <span class="tok-fn">update</span>(Request $request, <span class="tok-key">string</span> $id) {}`

const codeInvoke = `<span class="tok-key">class</span> <span class="tok-fn">GenerarReporte</span> <span class="tok-key">extends</span> Controller
{
    <span class="tok-key">public function</span> <span class="tok-fn">__invoke</span>()
    {
        <span class="tok-com">// ... una sola responsabilidad ...</span>
    }
}

<span class="tok-com">// En la ruta NO se indica metodo, solo la clase</span>
Route::<span class="tok-fn">get</span>(<span class="tok-str">'/reporte'</span>, GenerarReporte::<span class="tok-key">class</span>);`

const codeResource = `<span class="tok-com"># Genera el controlador con las 7 acciones CRUD</span>
php artisan make:controller TareaController --resource

<span class="tok-com">// routes/web.php  → 1 linea = 7 rutas</span>
Route::<span class="tok-fn">resource</span>(<span class="tok-str">'tareas'</span>, TareaController::<span class="tok-key">class</span>);`

const codePrefixName = `<span class="tok-com">// Todas comparten /admin y el nombre admin.*</span>
Route::<span class="tok-fn">prefix</span>(<span class="tok-str">'admin'</span>)-&gt;<span class="tok-fn">name</span>(<span class="tok-str">'admin.'</span>)-&gt;<span class="tok-fn">group</span>(<span class="tok-key">function</span> () {
    Route::<span class="tok-fn">get</span>(<span class="tok-str">'/tareas'</span>, [TareaController::<span class="tok-key">class</span>, <span class="tok-str">'index'</span>])
        -&gt;<span class="tok-fn">name</span>(<span class="tok-str">'tareas.index'</span>);
    <span class="tok-com">// URL: /admin/tareas  ·  Nombre: admin.tareas.index</span>
});`

const codeGroupMw = `<span class="tok-com">// Proteger un bloque con middleware (a fondo en la Sesion 7)</span>
Route::<span class="tok-fn">middleware</span>([<span class="tok-str">'auth'</span>])-&gt;<span class="tok-fn">group</span>(<span class="tok-key">function</span> () {
    Route::<span class="tok-fn">get</span>(<span class="tok-str">'/panel'</span>, [PanelController::<span class="tok-key">class</span>, <span class="tok-str">'index'</span>]);
});

<span class="tok-com">// Un mismo controlador para todo el grupo</span>
Route::<span class="tok-fn">controller</span>(TareaController::<span class="tok-key">class</span>)-&gt;<span class="tok-fn">group</span>(<span class="tok-key">function</span> () {
    Route::<span class="tok-fn">get</span>(<span class="tok-str">'/tareas'</span>, <span class="tok-str">'index'</span>);
    Route::<span class="tok-fn">get</span>(<span class="tok-str">'/tareas/{id}'</span>, <span class="tok-str">'show'</span>);
});`

export const slides = [
  // 1 · Portada
  <Slide key="s1" center>
    <LaravelLogo />
    <span className="eyebrow">Módulo I · Sesión 2</span>
    <h1>
      Rutas y <span className="accent">Controladores</span>
    </h1>
    <p className="lead muted" style={{ marginTop: '1.2rem' }}>
      Desarrollo de Aplicaciones Web con Laravel 13
    </p>
    <p className="muted" style={{ marginTop: '1.6rem' }}>
      Expositor: <b>Omar Mamani</b> · Duración: 1h 30min
    </p>
  </Slide>,

  // 2 · Repaso de la Sesión 1
  <CardsGrid
    key="s2"
    cols={3}
    eyebrow="Venimos de la Sesión 1"
    title="Repaso rápido"
    cards={[
      { title: '⚙️ Instalamos', body: 'PHP 8.3+, Composer y el Laravel Installer.' },
      { title: '🚀 Creamos', body: 'El proyecto gestion-app corriendo en localhost:8000.' },
      { title: '🧭 Conocimos', body: 'El patrón MVC y la estructura de carpetas.' },
    ]}
  />,

  // 3 · Agenda
  <CardsGrid
    key="s3"
    eyebrow="Hoja de ruta"
    title="Agenda de la sesión"
    cards={[
      { title: '1 · Rutas web', body: 'Qué es una ruta, métodos HTTP y route:list.' },
      { title: '2 · Parámetros y más', body: 'Rutas dinámicas, nombradas y redirecciones.' },
      { title: '3 · Controladores', body: 'make:controller, conectar rutas e inyección.' },
      { title: '4 · Route Groups + Lab', body: 'Agrupar con prefix y name. Práctica guiada.' },
    ]}
  />,

  // 4 · Objetivos
  <BulletSlide
    key="s4"
    eyebrow="¿Qué lograrás hoy?"
    title="Objetivos de aprendizaje"
    variant="checks"
    items={[
      <>Saber <b>qué es una ruta</b> y dónde se define.</>,
      <>Usar los <b>métodos HTTP</b> correctos.</>,
      <>Crear <b>rutas dinámicas</b> con parámetros y restringirlos.</>,
      <>Crear <b>rutas nombradas</b> y generar URLs.</>,
      <>Manejar <b>redirecciones</b>.</>,
      <>Crear <b>controladores</b> y conectarlos a rutas.</>,
      <>Usar la <b>inyección de dependencias</b> (Request).</>,
      <>Agrupar rutas con <b>prefix, name y middleware</b>.</>,
    ]}
  />,

  // 5 · Divider 1
  <SectionDivider key="s5" center num="01" eyebrow="Bloque 1" title="Rutas Web" subtitle="La puerta de entrada de toda petición." />,

  // 6 · ¿Qué es una ruta?
  <Slide key="s6">
    <span className="eyebrow">Concepto</span>
    <h2>¿Qué es una ruta?</h2>
    <p className="lead" style={{ marginTop: '0.3rem' }}>
      Conecta una <b>URL + método HTTP</b> con el <span className="accent">código</span> que debe
      ejecutarse. Es lo primero que toca toda petición.
    </p>
    <Flow
      style={{ marginTop: '1.2rem' }}
      steps={['Navegador (URL)', 'routes/web.php', 'Código', { label: 'Respuesta', ok: true }]}
    />
    <div className="grid g2" style={{ marginTop: '1.3rem' }}>
      <Card title="Analogía: el recepcionista 🏢">
        <p className="muted">
          Llega un visitante pidiendo una oficina (la URL) y el recepcionista lo manda al lugar
          correcto (el código que responde).
        </p>
      </Card>
      <Card title="¿Dónde viven?">
        <p className="muted">
          En la carpeta <code>routes/</code>. Las rutas web van en <code>routes/web.php</code>.
        </p>
      </Card>
    </div>
  </Slide>,

  // 7 · Tu primera ruta
  <Slide key="s7">
    <span className="eyebrow">Ejemplo mínimo</span>
    <h2>Tu primera ruta</h2>
    <CodeBlock html={codePrimera} />
    <p className="muted" style={{ marginTop: '0.8rem' }}>
      La ruta recibe una <b>URI</b> y una <b>función</b> (closure). Si devuelves un array, Laravel lo
      convierte a <b>JSON</b> automáticamente.
    </p>
  </Slide>,

  // 8 · Métodos HTTP
  <TwoColumn
    key="s8"
    eyebrow="El verbo de la petición"
    title="Métodos HTTP"
    left={
      <>
        <p className="lead">
          El método es el <b>verbo</b> 🗣️: no es lo mismo <i>ver</i> un dato que <i>crearlo</i>,{' '}
          <i>actualizarlo</i> o <i>borrarlo</i>.
        </p>
        <p className="muted" style={{ marginTop: '0.8rem' }}>
          La misma URL puede responder distinto según el verbo con el que llega la petición.
        </p>
      </>
    }
    right={
      <Card title="Los 5 que más usarás">
        <ul>
          <li><code>GET</code> → leer / mostrar.</li>
          <li><code>POST</code> → crear.</li>
          <li><code>PUT</code> / <code>PATCH</code> → actualizar.</li>
          <li><code>DELETE</code> → borrar.</li>
        </ul>
      </Card>
    }
  />,

  // 9 · Métodos HTTP en código
  <Slide key="s9">
    <span className="eyebrow">En código</span>
    <h2>Un verbo para cada acción</h2>
    <CodeBlock html={codeMetodos} />
    <p className="muted" style={{ marginTop: '0.8rem' }}>
      🔒 Los formularios a <code>POST/PUT/PATCH/DELETE</code> en <code>web.php</code> necesitan{' '}
      <code>@csrf</code> (lo veremos en la Sesión 8).
    </p>
  </Slide>,

  // 10 · web.php vs api.php
  <TwoColumn
    key="s10"
    eyebrow="¿Qué archivo uso?"
    title="web.php vs api.php"
    left={
      <Card title="Los archivos de rutas">
        <ul>
          <li><code>routes/web.php</code> → interfaz web (sesión + CSRF). El que más usaremos.</li>
          <li><code>routes/console.php</code> → comandos y tareas (Sesión 11).</li>
          <li><code>routes/api.php</code> → API sin estado. <b>No</b> viene por defecto.</li>
        </ul>
      </Card>
    }
    right={
      <>
        <CodeBlock html={codeInstallApi} />
        <p className="muted" style={{ marginTop: '0.8rem' }}>
          🆕 La app arranca "ligera": <code>api.php</code> aparece solo cuando lo necesitas. La API
          REST se trabaja en la <b>Sesión 10</b>.
        </p>
      </>
    }
  />,

  // 11 · route:list
  <TwoColumn
    key="s11"
    eyebrow="Tu mejor amigo"
    title="Ver todas tus rutas"
    left={
      <>
        <p className="lead">
          <code>route:list</code> es el <b>directorio del edificio</b> 📋: de un vistazo ves todas las
          URLs, su método y a quién atienden.
        </p>
        <Card title="Atajo útil" style={{ marginTop: '1rem' }}>
          <p className="muted">
            Si una ruta solo muestra una vista: <code>Route::view('/bienvenida', 'welcome')</code>.
          </p>
        </Card>
      </>
    }
    right={<CodeBlock html={codeRouteList} />}
  />,

  // 12 · Divider 2
  <SectionDivider key="s12" center num="02" eyebrow="Bloque 2" title="Parámetros, Nombres y Redirecciones" subtitle="Rutas que cambian según los datos." />,

  // 13 · Parámetros requeridos
  <Slide key="s13">
    <span className="eyebrow">Rutas dinámicas</span>
    <h2>Parámetros requeridos</h2>
    <p className="lead" style={{ marginTop: '0.3rem' }}>
      Un <b>hueco en la dirección</b> ✏️ que se rellena con cada visitante: <code>/tareas/1</code>,{' '}
      <code>/tareas/2</code>...
    </p>
    <div style={{ marginTop: '1rem' }}>
      <CodeBlock html={codeParamReq} />
    </div>
    <p className="muted" style={{ marginTop: '0.8rem' }}>
      Los parámetros van entre llaves <code>{'{}'}</code> y se inyectan a la función <b>por orden</b>.
    </p>
  </Slide>,

  // 14 · Parámetros opcionales
  <Slide key="s14">
    <span className="eyebrow">Cuando puede venir o no</span>
    <h2>Parámetros opcionales</h2>
    <CodeBlock html={codeParamOpt} />
    <p className="muted" style={{ marginTop: '0.8rem' }}>
      <code>/tareas</code> → "todas"; <code>/tareas/pendientes</code> → "pendientes". Ideal para filtros.
    </p>
  </Slide>,

  // 15 · Restricciones
  <Slide key="s15">
    <span className="eyebrow">Validar el formato</span>
    <h2>Restricciones de parámetros</h2>
    <CodeBlock html={codeWhere} />
    <p className="muted" style={{ marginTop: '0.8rem' }}>
      Si el parámetro no encaja con la restricción, Laravel devuelve un <b>404</b> automático.
    </p>
  </Slide>,

  // 16 · Rutas nombradas (concepto)
  <TwoColumn
    key="s16"
    eyebrow="Enlaces a prueba de cambios"
    title="Rutas nombradas"
    left={
      <>
        <p className="lead">
          Como <b>guardar un contacto por nombre</b> 📇: llamas a "Mamá" en vez de memorizar el número.
        </p>
        <p className="muted" style={{ marginTop: '0.8rem' }}>
          Le pones un <b>nombre</b> a la ruta y generas su URL por ese nombre. Si mañana cambias la
          URL, todos los enlaces se actualizan solos.
        </p>
      </>
    }
    right={
      <Card title="Regla">
        <p className="muted">
          Los nombres deben ser <b>únicos</b>. Convención: <code>recurso.accion</code>, por ejemplo{' '}
          <code>tareas.index</code>.
        </p>
      </Card>
    }
  />,

  // 17 · Rutas nombradas (código)
  <Slide key="s17">
    <span className="eyebrow">En código</span>
    <h2>Nombrar y generar URLs</h2>
    <CodeBlock html={codeNamed} />
  </Slide>,

  // 18 · Redirecciones
  <Slide key="s18">
    <span className="eyebrow">Enviar al usuario a otra URL</span>
    <h2>Redirecciones</h2>
    <CodeBlock html={codeRedirect} />
    <p className="muted" style={{ marginTop: '0.8rem' }}>
      Clave tras guardar un formulario o cuando una página no debe verse directamente.
    </p>
  </Slide>,

  // 19 · Divider 3
  <SectionDivider key="s19" center num="03" eyebrow="Bloque 3" title="Controladores" subtitle="Donde vive la lógica de cada recurso." />,

  // 20 · ¿Por qué controladores?
  <TwoColumn
    key="s20"
    eyebrow="El problema que resuelven"
    title="¿Por qué controladores?"
    left={
      <>
        <p className="lead">
          Si metes <b>toda la lógica</b> en closures dentro de <code>web.php</code>, el archivo crece
          sin control y se vuelve imposible de mantener.
        </p>
        <p className="muted" style={{ marginTop: '0.8rem' }}>
          <b>Analogía:</b> son los <b>departamentos de una empresa</b> 🏬. El recepcionista (la ruta)
          deriva el trabajo al departamento correcto, que agrupa lo relacionado.
        </p>
      </>
    }
    right={
      <Card title="¿Dónde viven?">
        <p className="muted">
          En <code>app/Http/Controllers</code>. Un controlador agrupa los <b>métodos</b> (acciones)
          de un mismo recurso, por ejemplo todo lo de "Tareas" en <code>TareaController</code>.
        </p>
      </Card>
    }
  />,

  // 21 · Crear un controlador
  <Slide key="s21">
    <span className="eyebrow">Manos a la obra</span>
    <h2>Crear un controlador</h2>
    <CodeBlock html={codeMakeCtrl} />
    <div style={{ marginTop: '0.8rem' }}>
      <CodeBlock html={codeCtrlClass} />
    </div>
  </Slide>,

  // 22 · Conectar la ruta al controlador
  <Slide key="s22">
    <span className="eyebrow">Unir ruta y lógica</span>
    <h2>Conectar la ruta al controlador</h2>
    <CodeBlock html={codeConnect} />
    <p className="muted" style={{ marginTop: '0.8rem' }}>
      Al entrar a <code>/tareas</code>, Laravel ejecuta el método <code>index()</code> de{' '}
      <code>TareaController</code>.
    </p>
  </Slide>,

  // 23 · Inyección de dependencias
  <Slide key="s23">
    <span className="eyebrow">Pide y se te dará</span>
    <h2>Inyección de dependencias</h2>
    <p className="lead" style={{ marginTop: '0.3rem' }}>
      Pides lo que necesitas en la firma del método y Laravel te lo <b>trae servido</b> 🛎️ (no lo
      creas tú). Lo más común: el objeto <code>Request</code>.
    </p>
    <div style={{ marginTop: '1rem' }}>
      <CodeBlock html={codeInject} />
    </div>
  </Slide>,

  // 24 · Single Action Controller
  <Slide key="s24">
    <span className="eyebrow">Una clase, una acción</span>
    <h2>Single Action Controller</h2>
    <CodeBlock html={codeInvoke} />
    <p className="muted" style={{ marginTop: '0.8rem' }}>
      Se genera con <code>php artisan make:controller GenerarReporte --invokable</code>. Útil cuando
      la acción es compleja y única.
    </p>
  </Slide>,

  // 25 · Vistazo: Resource Controllers
  <TwoColumn
    key="s25"
    eyebrow="Solo un adelanto"
    title="Vistazo: Resource Controllers"
    lead={<>Casi todo recurso necesita las mismas <b>7 acciones CRUD</b>. Laravel puede generarlas de un golpe.</>}
    left={<CodeBlock html={codeResource} />}
    right={
      <Card title="Las 7 acciones">
        <p className="muted">
          <code>index</code>, <code>create</code>, <code>store</code>, <code>show</code>,{' '}
          <code>edit</code>, <code>update</code>, <code>destroy</code>.
        </p>
        <p className="muted" style={{ marginTop: '0.6rem' }}>
          Lo usaremos a <b>fondo con base de datos en la Sesión 9</b>.
        </p>
      </Card>
    }
  />,

  // 26 · Divider 4
  <SectionDivider key="s26" center num="04" eyebrow="Bloque 4" title="Route Groups" subtitle="Comparte atributos sin repetir código." />,

  // 27 · Agrupar rutas
  <TwoColumn
    key="s27"
    eyebrow="No te repitas"
    title="Agrupar rutas"
    left={
      <>
        <p className="lead">
          Un grupo es un <b>folder</b> 🗂️ que comparte una etiqueta con todo lo que contiene.
        </p>
        <p className="muted" style={{ marginTop: '0.8rem' }}>
          En vez de escribir el mismo prefijo o middleware en cada ruta, lo pones <b>una vez</b> para
          todas.
        </p>
      </>
    }
    right={
      <Card title="Qué se comparte">
        <ul>
          <li><code>prefix</code> → la URL.</li>
          <li><code>name</code> → el nombre.</li>
          <li><code>middleware</code> → los filtros.</li>
          <li><code>controller</code> → el controlador común.</li>
        </ul>
      </Card>
    }
  />,

  // 28 · prefix y name
  <Slide key="s28">
    <span className="eyebrow">El caso más común</span>
    <h2>prefix y name</h2>
    <CodeBlock html={codePrefixName} />
    <p className="muted" style={{ marginTop: '0.8rem' }}>
      Los prefijos y nombres se <b>encadenan</b> con los del grupo. Ideal para un área de administración.
    </p>
  </Slide>,

  // 29 · middleware y controller (grupo)
  <Slide key="s29">
    <span className="eyebrow">Más formas de agrupar</span>
    <h2>middleware y controller</h2>
    <CodeBlock html={codeGroupMw} />
  </Slide>,

  // 30 · Divider 5
  <SectionDivider key="s30" center num="05" eyebrow="Bloque 5" title="Laboratorio" subtitle="Crear rutas dinámicas y controladores. ⌨️" />,

  // 31 · Laboratorio paso a paso
  <CardsGrid key="s31" eyebrow="Práctica guiada" title="Laboratorio paso a paso">
    <Card title="① Crear el controlador">
      <ul>
        <li><code>make:controller TareaController</code>.</li>
        <li>Métodos <code>index()</code> y <code>show($id)</code>.</li>
      </ul>
    </Card>
    <Card title="② Crear rutas dinámicas">
      <ul>
        <li><code>GET /tareas</code> → index.</li>
        <li><code>GET /tareas/{'{id}'}</code> → show (<code>whereNumber</code>).</li>
        <li>Nombrarlas: <code>tareas.index</code>, <code>tareas.show</code>.</li>
      </ul>
    </Card>
    <Card title="③ Agrupar bajo /admin">
      <ul>
        <li><code>prefix('admin')-&gt;name('admin.')</code>.</li>
        <li>Verifica <code>/admin/tareas</code> y <code>admin.tareas.*</code>.</li>
      </ul>
    </Card>
    <Card title="④ Probar y redirigir">
      <ul>
        <li><code>GET /</code> con <code>to_route('admin.tareas.index')</code>.</li>
        <li><code>php artisan route:list --path=tareas</code>.</li>
      </ul>
    </Card>
  </CardsGrid>,

  // 32 · Resultado esperado
  <Slide key="s32">
    <span className="eyebrow">Cómo debe quedar</span>
    <h2>Resultado esperado</h2>
    <table style={{ marginTop: '0.6rem' }}>
      <thead>
        <tr><th>Verbo</th><th>URI</th><th>Acción</th><th>Nombre</th></tr>
      </thead>
      <tbody>
        <tr><td>GET</td><td><code>/</code></td><td>redirige</td><td>-</td></tr>
        <tr><td>GET</td><td><code>/admin/tareas</code></td><td>index</td><td><code>admin.tareas.index</code></td></tr>
        <tr><td>GET</td><td><code>/admin/tareas/{'{id}'}</code></td><td>show</td><td><code>admin.tareas.show</code></td></tr>
      </tbody>
    </table>
    <p className="muted" style={{ marginTop: '1rem' }}>
      🧠 Pocas líneas y ya tienes rutas dinámicas, ordenadas, con nombres claros y un controlador que
      agrupa la lógica. Esa es la base de toda app Laravel.
    </p>
  </Slide>,

  // 33 · Checklist
  <Slide key="s33">
    <span className="eyebrow">Antes de cerrar</span>
    <h2>Checklist de la sesión</h2>
    <ul className="checks big" style={{ marginTop: '1rem' }}>
      <li>Sé qué es una ruta y dónde se define.</li>
      <li>Uso los métodos HTTP correctos.</li>
      <li>Creo rutas dinámicas con parámetros y los restrinjo.</li>
      <li>Creo rutas nombradas y manejo redirecciones.</li>
      <li>Creo controladores y los conecto a rutas.</li>
      <li>Uso la inyección de dependencias (Request).</li>
      <li>Agrupo rutas con prefix, name y middleware.</li>
    </ul>
  </Slide>,

  // 34 · Resumen
  <Slide key="s34">
    <span className="eyebrow">Lo que aprendiste hoy</span>
    <h2>Resumen de la sesión</h2>
    <div className="grid g2" style={{ marginTop: '0.8rem' }}>
      <Card title="Rutas">
        <p className="muted">
          Conectan <b>URL + método HTTP</b> con el código; viven en <code>routes/web.php</code>.
          Pueden ser <b>dinámicas</b>, nombradas y redirigir.
        </p>
      </Card>
      <Card title="Controladores y grupos">
        <p className="muted">
          Los controladores <b>agrupan la lógica</b> y reciben dependencias inyectadas; los grupos
          (<code>prefix</code>, <code>name</code>) evitan repetir.
        </p>
      </Card>
    </div>
    <p className="lead" style={{ marginTop: '1.2rem' }}>
      📌 Idea central: <span className="accent">la ruta dice QUÉ URL responde; el controlador dice CÓMO</span>.
    </p>
  </Slide>,

  // 35 · Próxima sesión + tarea
  <Slide key="s35" center>
    <span className="eyebrow">Próxima sesión</span>
    <h2 style={{ fontSize: '2.6rem' }}>Sesión 3 - Blade y Patrón MVC</h2>
    <div className="grid g2" style={{ marginTop: '1.4rem', maxWidth: '60vw' }}>
      <Card title="Vistas Blade"><p className="muted">Layouts, secciones, componentes, includes y helpers.</p></Card>
      <Card title="MVC real"><p className="muted">Las rutas y controladores de hoy mostrarán HTML de verdad.</p></Card>
    </div>
    <p className="muted" style={{ marginTop: '1.4rem' }}>
      <b>Tarea:</b> crea un <code>UserController</code> con <code>index</code> y <code>show</code>,
      en rutas dinámicas dentro del grupo <code>admin</code>, y verifica con <code>route:list</code>.
    </p>
  </Slide>,

  // 36 · Cierre
  <Slide key="s36" center>
    <LaravelLogo />
    <h1>¿Preguntas? 🙌</h1>
    <p className="lead muted" style={{ marginTop: '1rem' }}>
      ¡Gracias por tu atención!
      <br />
      Nos vemos en la Sesión 3.
    </p>
    <p className="muted" style={{ marginTop: '1.6rem' }}>
      Desarrollo de Aplicaciones Web con Laravel 13 · Omar Mamani
    </p>
  </Slide>,
]

export default slides
