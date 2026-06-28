// ─────────────────────────────────────────────────────────────────────────
// Curso Laravel 13 · Sesión 10 - APIs RESTful
// Cada elemento del array `slides` es una diapositiva. El componente <Deck>
// se encarga de la navegación, el progreso y la pantalla completa.
// Usa `center` en un nodo para centrar esa diapositiva.
// Base pedagógica: docs/laravel/SESION-10-PLANIFICACION.md
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
  session: 10,
  title: 'APIs RESTful',
}

// ── Bloques de código (HTML resaltado) ────────────────────────────────────

const codeApiRoutes = `php artisan install:api    <span class="tok-com"># crea routes/api.php + Sanctum</span>

<span class="tok-com">// routes/api.php (prefijo /api automatico)</span>
<span class="tok-key">use</span> App\\Http\\Controllers\\Api\\TareaController;

Route::<span class="tok-fn">apiResource</span>(<span class="tok-str">'tareas'</span>, TareaController::<span class="tok-key">class</span>);`

const codeApiControllerBash = `php artisan make:controller Api/TareaController --api --model=Tarea`

const codeApiController = `<span class="tok-key">public function</span> <span class="tok-fn">index</span>()
{
    <span class="tok-com">// Devolver modelo/coleccion = JSON automatico</span>
    <span class="tok-key">return</span> Tarea::<span class="tok-fn">paginate</span>(<span class="tok-num">15</span>);
}

<span class="tok-key">public function</span> <span class="tok-fn">store</span>(StoreTareaRequest $request)
{
    $tarea = Tarea::<span class="tok-fn">create</span>($request-&gt;<span class="tok-fn">validated</span>());
    <span class="tok-key">return</span> <span class="tok-fn">response</span>()-&gt;<span class="tok-fn">json</span>($tarea, <span class="tok-num">201</span>);   <span class="tok-com">// 201 = creado</span>
}`

const codeApiValidate = `<span class="tok-key">public function</span> <span class="tok-fn">store</span>(Request $request)
{
    $datos = $request-&gt;<span class="tok-fn">validate</span>([
        <span class="tok-str">'titulo'</span> =&gt; [<span class="tok-str">'required'</span>, <span class="tok-str">'string'</span>, <span class="tok-str">'max:255'</span>],
        <span class="tok-str">'estado'</span> =&gt; [<span class="tok-str">'required'</span>, <span class="tok-str">'in:pendiente,completada'</span>],
    ]);

    <span class="tok-key">return</span> <span class="tok-fn">response</span>()-&gt;<span class="tok-fn">json</span>(Tarea::<span class="tok-fn">create</span>($datos), <span class="tok-num">201</span>);
}`

const codeResourceBash = `php artisan make:resource TareaResource`

const codeResourceClass = `<span class="tok-com">// app/Http/Resources/TareaResource.php</span>
<span class="tok-key">public function</span> <span class="tok-fn">toArray</span>(Request $request): <span class="tok-key">array</span>
{
    <span class="tok-key">return</span> [
        <span class="tok-str">'id'</span>     =&gt; $this-&gt;id,
        <span class="tok-str">'titulo'</span> =&gt; $this-&gt;titulo,
        <span class="tok-str">'estado'</span> =&gt; $this-&gt;estado,
        <span class="tok-str">'creada'</span> =&gt; $this-&gt;created_at-&gt;<span class="tok-fn">toDateString</span>(),
    ];
}`

const codeReturnResource = `<span class="tok-key">use</span> App\\Http\\Resources\\TareaResource;

<span class="tok-com">// Un solo recurso</span>
<span class="tok-key">public function</span> <span class="tok-fn">show</span>(Tarea $tarea)
{
    <span class="tok-key">return new</span> <span class="tok-fn">TareaResource</span>($tarea);
}

<span class="tok-com">// Una coleccion (lista)</span>
<span class="tok-key">public function</span> <span class="tok-fn">index</span>()
{
    <span class="tok-key">return</span> TareaResource::<span class="tok-fn">collection</span>(Tarea::<span class="tok-fn">all</span>());
}`

const codeCollectionPhp = `<span class="tok-com">// Pasa el paginador: incluye meta y links solos</span>
<span class="tok-key">return</span> TareaResource::<span class="tok-fn">collection</span>(Tarea::<span class="tok-fn">paginate</span>(<span class="tok-num">15</span>));`

const codeCollectionJson = `{
    <span class="tok-str">"data"</span>: [ { <span class="tok-str">"id"</span>: <span class="tok-num">1</span>, <span class="tok-str">"titulo"</span>: <span class="tok-str">"..."</span> } ],
    <span class="tok-str">"links"</span>: { <span class="tok-str">"first"</span>: <span class="tok-str">"..."</span>, <span class="tok-str">"prev"</span>: <span class="tok-key">null</span>, <span class="tok-str">"next"</span>: <span class="tok-str">"..."</span> },
    <span class="tok-str">"meta"</span>:  { <span class="tok-str">"current_page"</span>: <span class="tok-num">1</span>, <span class="tok-str">"per_page"</span>: <span class="tok-num">15</span>, <span class="tok-str">"total"</span>: <span class="tok-num">42</span> }
}`

const codeWhenLoaded = `<span class="tok-key">public function</span> <span class="tok-fn">toArray</span>(Request $request): <span class="tok-key">array</span>
{
    <span class="tok-key">return</span> [
        <span class="tok-str">'id'</span>      =&gt; $this-&gt;id,
        <span class="tok-str">'titulo'</span>  =&gt; $this-&gt;titulo,
        <span class="tok-com">// Solo si la relacion fue cargada (evita N+1)</span>
        <span class="tok-str">'usuario'</span> =&gt; <span class="tok-key">new</span> <span class="tok-fn">UserResource</span>($this-&gt;<span class="tok-fn">whenLoaded</span>(<span class="tok-str">'user'</span>)),
    ];
}`

const codeHttp = `<span class="tok-key">use</span> Illuminate\\Support\\Facades\\Http;

$response = Http::<span class="tok-fn">acceptJson</span>()-&gt;<span class="tok-fn">get</span>(<span class="tok-str">'https://api.ejemplo.com/tareas'</span>);

$tareas = $response-&gt;<span class="tok-fn">json</span>();        <span class="tok-com">// array con los datos</span>
$ok     = $response-&gt;<span class="tok-fn">successful</span>();  <span class="tok-com">// true si 2xx</span>

<span class="tok-com">// Con datos y token</span>
Http::<span class="tok-fn">withToken</span>(<span class="tok-str">'mi-token'</span>)-&gt;<span class="tok-fn">post</span>(<span class="tok-str">'https://api.ejemplo.com/tareas'</span>, [
    <span class="tok-str">'titulo'</span> =&gt; <span class="tok-str">'Nueva tarea'</span>,
]);`

const codeVersion = `<span class="tok-com">// routes/api.php</span>
Route::<span class="tok-fn">prefix</span>(<span class="tok-str">'v1'</span>)-&gt;<span class="tok-fn">group</span>(<span class="tok-key">function</span> () {
    Route::<span class="tok-fn">apiResource</span>(<span class="tok-str">'tareas'</span>, TareaController::<span class="tok-key">class</span>);
});
<span class="tok-com">// URL final: /api/v1/tareas</span>`

const codeJsonResult = `<span class="tok-com">GET /api/v1/tareas</span>
{
    <span class="tok-str">"data"</span>: [
        { <span class="tok-str">"id"</span>: <span class="tok-num">1</span>, <span class="tok-str">"titulo"</span>: <span class="tok-str">"Configurar servidor"</span>, <span class="tok-str">"estado"</span>: <span class="tok-str">"pendiente"</span> },
        { <span class="tok-str">"id"</span>: <span class="tok-num">2</span>, <span class="tok-str">"titulo"</span>: <span class="tok-str">"Desplegar app"</span>, <span class="tok-str">"estado"</span>: <span class="tok-str">"completada"</span> }
    ],
    <span class="tok-str">"meta"</span>: { <span class="tok-str">"current_page"</span>: <span class="tok-num">1</span>, <span class="tok-str">"per_page"</span>: <span class="tok-num">15</span>, <span class="tok-str">"total"</span>: <span class="tok-num">2</span> }
}`

export const slides = [
  // 1 · Portada
  <Slide key="s1" center>
    <LaravelLogo />
    <span className="eyebrow">Módulo III · Sesión 10</span>
    <h1>
      APIs <span className="accent">RESTful</span>
    </h1>
    <p className="lead muted" style={{ marginTop: '1.2rem' }}>
      Desarrollo de Aplicaciones Web con Laravel 13
    </p>
    <p className="muted" style={{ marginTop: '1.6rem' }}>
      Expositor: <b>Omar Mamani</b> · Duración: 1h 30min
    </p>
  </Slide>,

  // 2 · Repaso de la Sesión 9
  <CardsGrid
    key="s2"
    cols={3}
    eyebrow="Venimos de la Sesión 9"
    title="Repaso rápido"
    cards={[
      { title: '🗂️ CRUD', body: 'Los 7 métodos de Route::resource con Eloquent.' },
      { title: '📄 Paginación y flash', body: 'Listas grandes y confirmaciones.' },
      { title: '📊 Reportes', body: 'Exportación a PDF y Excel.' },
    ]}
  />,

  // 3 · Agenda
  <CardsGrid
    key="s3"
    eyebrow="Hoja de ruta"
    title="Agenda de la sesión"
    cards={[
      { title: '1 · API Routes y Controllers', body: 'Rutas y respuestas JSON.' },
      { title: '2 · API Resources', body: 'Transformar los datos al cliente.' },
      { title: '3 · Postman y Versionado', body: 'Probar, consumir y versionar.' },
      { title: '4 · Laboratorio', body: 'Una API REST con API Resources + Postman.' },
    ]}
  />,

  // 4 · Objetivos
  <BulletSlide
    key="s4"
    eyebrow="¿Qué lograrás hoy?"
    title="Objetivos de aprendizaje"
    variant="checks"
    items={[
      <>Entender qué es una <b>API REST</b> y web vs API.</>,
      <>Crear <b>rutas de API</b> (<code>install:api</code>, <code>apiResource</code>).</>,
      <>Crear <b>API Controllers</b> y devolver <b>JSON</b>.</>,
      <>Validar y obtener errores <b>422</b> en JSON.</>,
      <>Transformar con <b>API Resources</b>.</>,
      <>Devolver <b>colecciones</b> paginadas con meta/links.</>,
      <>Incluir <b>relaciones</b> con <code>whenLoaded</code>.</>,
      <><b>Probar</b> en Postman y <b>versionar</b> (v1).</>,
    ]}
  />,

  // 5 · Divider 1
  <SectionDivider key="s5" center num="01" eyebrow="Bloque 1" title="API REST" subtitle="Los mismos datos, ahora en JSON." />,

  // 6 · ¿Qué es una API REST?
  <TwoColumn
    key="s6"
    eyebrow="Concepto"
    title="¿Qué es una API REST?"
    left={
      <>
        <p className="lead">
          Una interfaz que devuelve <b>datos en JSON</b> (no HTML) usando los verbos HTTP del CRUD.
        </p>
        <p className="muted" style={{ marginTop: '0.8rem' }}>
          <b>Analogía:</b> un <b>mesero</b> 🍽️: el cliente (app móvil, React) pide y recibe el plato
          (JSON), sin ver la cocina. La API es la interfaz entre cliente y backend.
        </p>
      </>
    }
    right={
      <Card title="Web vs API">
        <ul>
          <li><b>Web:</b> devuelve vistas Blade (HTML), sesión y cookies.</li>
          <li><b>API:</b> devuelve JSON, sin estado (cada petición lleva su token).</li>
        </ul>
      </Card>
    }
  />,

  // 7 · API Routes
  <Slide key="s7">
    <span className="eyebrow">Rutas de la API</span>
    <h2>API Routes</h2>
    <CodeBlock html={codeApiRoutes} />
    <p className="muted" style={{ marginTop: '0.8rem' }}>
      <code>apiResource</code> crea 5 rutas (sin <code>create</code> ni <code>edit</code>, que eran
      vistas HTML): <code>index</code>, <code>store</code>, <code>show</code>, <code>update</code>,{' '}
      <code>destroy</code>. La URL queda <code>/api/tareas</code>.
    </p>
  </Slide>,

  // 8 · API Controllers y JSON
  <Slide key="s8">
    <span className="eyebrow">Devolver datos, no vistas</span>
    <h2>API Controllers y respuestas JSON</h2>
    <CodeBlock html={codeApiControllerBash} />
    <div style={{ marginTop: '0.7rem' }}>
      <CodeBlock html={codeApiController} />
    </div>
    <p className="muted" style={{ marginTop: '0.7rem' }}>
      Devolver un modelo/colección ya genera JSON. <code>response()-&gt;json($datos, $codigo)</code>{' '}
      controla el <b>status code</b> (201, 404...).
    </p>
  </Slide>,

  // 9 · Validaciones en la API
  <Slide key="s9">
    <span className="eyebrow">La misma validación, en JSON</span>
    <h2>Validaciones en la API</h2>
    <CodeBlock html={codeApiValidate} />
    <p className="muted" style={{ marginTop: '0.8rem' }}>
      Si la petición trae el header <code>Accept: application/json</code> y la validación falla, Laravel
      responde automáticamente con un <b>422</b> y los errores en JSON. ¡No escribes nada extra!
    </p>
  </Slide>,

  // 10 · Divider 2
  <SectionDivider key="s10" center num="02" eyebrow="Bloque 2" title="API Resources" subtitle="Decide qué y cómo se devuelve." />,

  // 11 · ¿Qué es un API Resource?
  <TwoColumn
    key="s11"
    eyebrow="La capa de transformación"
    title="¿Qué es un API Resource?"
    lead={<>Un <b>filtro de salida</b> 🎚️: decide qué campos se envían y cómo se ven.</>}
    left={
      <>
        <CodeBlock html={codeResourceBash} />
        <div style={{ marginTop: '0.6rem' }}>
          <CodeBlock html={codeResourceClass} />
        </div>
      </>
    }
    right={
      <Card title="¿Por qué?">
        <p className="muted">
          Es la capa entre tus modelos y el JSON. Cambias la salida sin tocar la base de datos ni el
          controlador, y ocultas campos sensibles (por ejemplo <code>password</code>).
        </p>
      </Card>
    }
  />,

  // 12 · Devolver resources
  <Slide key="s12">
    <span className="eyebrow">Uno o una colección</span>
    <h2>Devolver resources</h2>
    <CodeBlock html={codeReturnResource} />
    <p className="muted" style={{ marginTop: '0.8rem' }}>
      El resource envuelve la respuesta en una clave <code>data</code> por convención.
      <code> $this-&gt;</code> accede directo a las propiedades del modelo.
    </p>
  </Slide>,

  // 13 · Resource Collections y paginación
  <Slide key="s13">
    <span className="eyebrow">meta y links automáticos</span>
    <h2>Resource Collections y paginación</h2>
    <CodeBlock html={codeCollectionPhp} />
    <div style={{ marginTop: '0.7rem' }}>
      <CodeBlock html={codeCollectionJson} />
    </div>
    <p className="muted" style={{ marginTop: '0.7rem' }}>
      Al paginar, Laravel agrega <code>meta</code> (página, total...) y <code>links</code> (primera,
      última, anterior, siguiente) solo. El cliente sabe recorrer las páginas.
    </p>
  </Slide>,

  // 14 · Relaciones condicionales
  <Slide key="s14">
    <span className="eyebrow">Incluir relaciones sin N+1</span>
    <h2>Relaciones condicionales</h2>
    <CodeBlock html={codeWhenLoaded} />
    <p className="muted" style={{ marginTop: '0.8rem' }}>
      <code>whenLoaded('user')</code> agrega la relación <b>solo</b> si la cargaste con
      <code> with('user')</code>. Así controlas el tamaño del JSON y evitas consultas innecesarias.
    </p>
  </Slide>,

  // 15 · Divider 3
  <SectionDivider key="s15" center num="03" eyebrow="Bloque 3" title="Consumo, Postman y Versionado" subtitle="Probar, consumir y mantener la API." />,

  // 16 · Probar con Postman
  <Slide key="s16">
    <span className="eyebrow">Tu banco de pruebas</span>
    <h2>Probar con Postman</h2>
    <table style={{ marginTop: '0.6rem' }}>
      <thead>
        <tr><th>Para probar</th><th>En Postman</th></tr>
      </thead>
      <tbody>
        <tr><td>Listar</td><td><code>GET</code> /api/tareas</td></tr>
        <tr><td>Crear</td><td><code>POST</code> + body raw JSON</td></tr>
        <tr><td>Ver una</td><td><code>GET</code> /api/tareas/1</td></tr>
        <tr><td>Header clave</td><td><code>Accept: application/json</code></td></tr>
        <tr><td>Autenticar</td><td><code>Authorization: Bearer ...</code></td></tr>
      </tbody>
    </table>
    <p className="muted" style={{ marginTop: '0.8rem' }}>
      El header <code>Accept: application/json</code> hace que Laravel responda SIEMPRE en JSON
      (incluidos los errores 422).
    </p>
  </Slide>,

  // 17 · Consumir APIs (HTTP Client)
  <Slide key="s17">
    <span className="eyebrow">Tu app como cliente</span>
    <h2>Consumir APIs</h2>
    <CodeBlock html={codeHttp} />
    <p className="muted" style={{ marginTop: '0.8rem' }}>
      <code>Http::get/post/put/delete</code> hacen la petición; <code>json()</code>,
      <code> status()</code>, <code>successful()</code> leen la respuesta. Ideal para integrar
      servicios externos.
    </p>
  </Slide>,

  // 18 · Versionado de APIs
  <Slide key="s18">
    <span className="eyebrow">No rompas a tus clientes</span>
    <h2>Versionado de APIs</h2>
    <CodeBlock html={codeVersion} />
    <p className="muted" style={{ marginTop: '0.8rem' }}>
      Cuando saques cambios incompatibles, creas <code>v2</code> sin tocar <code>v1</code>. Los clientes
      viejos siguen funcionando; los nuevos migran cuando puedan.
    </p>
  </Slide>,

  // 19 · Divider 4
  <SectionDivider key="s19" center num="04" eyebrow="Bloque 4" title="Laboratorio" subtitle="API REST con API Resources + Postman. ⌨️" />,

  // 20 · Laboratorio paso a paso
  <CardsGrid key="s20" eyebrow="Práctica guiada" title="Laboratorio paso a paso">
    <Card title="① Preparar la API">
      <ul>
        <li><code>php artisan install:api</code>.</li>
        <li><code>Api/TareaController --api --model=Tarea</code>.</li>
      </ul>
    </Card>
    <Card title="② Rutas versionadas">
      <ul>
        <li>Grupo <code>v1</code> con <code>apiResource</code>.</li>
        <li><code>route:list --path=api</code>.</li>
      </ul>
    </Card>
    <Card title="③ Transformar con Resources">
      <ul>
        <li><code>make:resource TareaResource</code>.</li>
        <li>Devolver la colección paginada.</li>
      </ul>
    </Card>
    <Card title="④ Probar en Postman">
      <ul>
        <li><code>GET</code>/<code>POST</code> con <code>Accept: application/json</code>.</li>
        <li>Provocar un error y ver el <code>422</code>.</li>
      </ul>
    </Card>
  </CardsGrid>,

  // 21 · La respuesta JSON
  <Slide key="s21">
    <span className="eyebrow">El resultado</span>
    <h2>La respuesta JSON</h2>
    <CodeBlock html={codeJsonResult} />
    <p className="muted" style={{ marginTop: '0.8rem' }}>
      🧠 El mismo recurso del CRUD web, ahora en JSON limpio y versionado, listo para cualquier cliente.
    </p>
  </Slide>,

  // 22 · Checklist
  <Slide key="s22">
    <span className="eyebrow">Antes de cerrar</span>
    <h2>Checklist de la sesión</h2>
    <ul className="checks big" style={{ marginTop: '1rem' }}>
      <li>Entiendo qué es una API REST y web vs API.</li>
      <li>Creo rutas de API (install:api, apiResource).</li>
      <li>Creo API Controllers y devuelvo JSON.</li>
      <li>Valido y obtengo errores 422 en JSON.</li>
      <li>Transformo con API Resources (toArray).</li>
      <li>Devuelvo colecciones paginadas con meta/links.</li>
      <li>Incluyo relaciones con whenLoaded.</li>
      <li>Pruebo en Postman y entiendo el versionado (v1).</li>
    </ul>
  </Slide>,

  // 23 · Resumen
  <Slide key="s23">
    <span className="eyebrow">Lo que aprendiste hoy</span>
    <h2>Resumen de la sesión</h2>
    <div className="grid g2" style={{ marginTop: '0.8rem' }}>
      <Card title="API">
        <p className="muted">
          <code>routes/api.php</code> + <code>apiResource</code> + respuestas JSON + validación
          <code> 422</code>.
        </p>
      </Card>
      <Card title="Resources">
        <p className="muted">
          La capa que transforma modelos en JSON limpio (con <code>data</code>, <code>meta</code>,
          <code> links</code>).
        </p>
      </Card>
    </div>
    <p className="lead" style={{ marginTop: '1.2rem' }}>
      📌 Idea central: <span className="accent">una API expone los datos en JSON; los Resources deciden qué y cómo</span>.
    </p>
  </Slide>,

  // 24 · Próxima sesión + tarea
  <Slide key="s24" center>
    <span className="eyebrow">Próxima sesión</span>
    <h2 style={{ fontSize: '2.6rem' }}>Sesión 11 - Funcionalidades Avanzadas</h2>
    <div className="grid g2" style={{ marginTop: '1.4rem', maxWidth: '60vw' }}>
      <Card title="Correos y Colas"><p className="muted">Mailables, queues y procesamiento en segundo plano.</p></Card>
      <Card title="Comandos y Scheduler"><p className="muted">Comandos Artisan propios y tareas programadas.</p></Card>
    </div>
    <p className="muted" style={{ marginTop: '1.4rem' }}>
      <b>Tarea:</b> exponer el recurso Tareas como API versionada (<code>/api/v1/tareas</code>) con un
      <code> TareaResource</code>, y probar el index y el store en Postman.
    </p>
  </Slide>,

  // 25 · Cierre
  <Slide key="s25" center>
    <LaravelLogo />
    <h1>¿Preguntas? 🙌</h1>
    <p className="lead muted" style={{ marginTop: '1rem' }}>
      ¡Gracias por tu atención!
      <br />
      Nos vemos en la Sesión 11.
    </p>
    <p className="muted" style={{ marginTop: '1.6rem' }}>
      Desarrollo de Aplicaciones Web con Laravel 13 · Omar Mamani
    </p>
  </Slide>,
]

export default slides
