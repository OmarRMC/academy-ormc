// ─────────────────────────────────────────────────────────────────────────
// Curso Laravel 13 · Sesión 8 - Formularios y Validaciones
// Cada elemento del array `slides` es una diapositiva. El componente <Deck>
// se encarga de la navegación, el progreso y la pantalla completa.
// Usa `center` en un nodo para centrar esa diapositiva.
// Base pedagógica: docs/laravel/SESION-08-PLANIFICACION.md
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
  session: 8,
  title: 'Formularios y Validaciones',
}

// ── Bloques de código (HTML resaltado) ────────────────────────────────────

const codeForm = `&lt;form method="POST" action="{{ <span class="tok-fn">route</span>(<span class="tok-str">'tareas.store'</span>) }}"&gt;
    <span class="tok-key">@csrf</span>

    &lt;label for="titulo"&gt;Titulo&lt;/label&gt;
    &lt;input type="text" name="titulo" value="{{ <span class="tok-fn">old</span>(<span class="tok-str">'titulo'</span>) }}"&gt;
    <span class="tok-key">@error</span>(<span class="tok-str">'titulo'</span>) &lt;span class="error"&gt;{{ $message }}&lt;/span&gt; <span class="tok-key">@enderror</span>

    &lt;button type="submit"&gt;Guardar&lt;/button&gt;
&lt;/form&gt;`

const codeMethod = `<span class="tok-com">{{-- Actualizar (PUT) --}}</span>
&lt;form method="POST" action="{{ <span class="tok-fn">route</span>(<span class="tok-str">'tareas.update'</span>, $tarea) }}"&gt;
    <span class="tok-key">@csrf</span>
    <span class="tok-key">@method</span>(<span class="tok-str">'PUT'</span>)
    ...
&lt;/form&gt;

<span class="tok-com">{{-- Eliminar (DELETE) --}}</span>
&lt;form method="POST" action="{{ <span class="tok-fn">route</span>(<span class="tok-str">'tareas.destroy'</span>, $tarea) }}"&gt;
    <span class="tok-key">@csrf</span>
    <span class="tok-key">@method</span>(<span class="tok-str">'DELETE'</span>)
    &lt;button&gt;Eliminar&lt;/button&gt;
&lt;/form&gt;`

const codeValidate = `<span class="tok-key">public function</span> <span class="tok-fn">store</span>(Request $request)
{
    $datos = $request-&gt;<span class="tok-fn">validate</span>([
        <span class="tok-str">'titulo'</span> =&gt; [<span class="tok-str">'required'</span>, <span class="tok-str">'string'</span>, <span class="tok-str">'max:255'</span>],
        <span class="tok-str">'descripcion'</span> =&gt; [<span class="tok-str">'nullable'</span>, <span class="tok-str">'string'</span>],
    ]);

    Tarea::<span class="tok-fn">create</span>($datos);
    <span class="tok-key">return</span> <span class="tok-fn">redirect</span>()-&gt;<span class="tok-fn">route</span>(<span class="tok-str">'tareas.index'</span>)
        -&gt;<span class="tok-fn">with</span>(<span class="tok-str">'status'</span>, <span class="tok-str">'Tarea creada'</span>);
}`

const codeRules = `$request-&gt;<span class="tok-fn">validate</span>([
    <span class="tok-str">'titulo'</span>    =&gt; [<span class="tok-str">'required'</span>, <span class="tok-str">'string'</span>, <span class="tok-str">'max:255'</span>],
    <span class="tok-str">'email'</span>     =&gt; [<span class="tok-str">'required'</span>, <span class="tok-str">'email'</span>, <span class="tok-str">'unique:users,email'</span>],
    <span class="tok-str">'password'</span>  =&gt; [<span class="tok-str">'required'</span>, <span class="tok-str">'confirmed'</span>, <span class="tok-str">'min:8'</span>],
    <span class="tok-str">'estado'</span>    =&gt; [<span class="tok-str">'required'</span>, <span class="tok-str">'in:pendiente,completada'</span>],
    <span class="tok-str">'vence_el'</span>  =&gt; [<span class="tok-str">'nullable'</span>, <span class="tok-str">'date'</span>, <span class="tok-str">'after:today'</span>],
    <span class="tok-str">'prioridad'</span> =&gt; [<span class="tok-str">'required'</span>, <span class="tok-str">'integer'</span>, <span class="tok-str">'min:1'</span>, <span class="tok-str">'max:5'</span>],
    <span class="tok-str">'acepta'</span>    =&gt; [<span class="tok-str">'accepted'</span>],          <span class="tok-com">// checkbox</span>
    <span class="tok-str">'adjunto'</span>   =&gt; [<span class="tok-str">'nullable'</span>, <span class="tok-str">'image'</span>, <span class="tok-str">'max:2048'</span>],  <span class="tok-com">// KB</span>
]);`

const codeErrors = `<span class="tok-com">{{-- Todos los errores juntos --}}</span>
<span class="tok-key">@if</span> ($errors-&gt;<span class="tok-fn">any</span>())
    &lt;ul class="errores"&gt;
        <span class="tok-key">@foreach</span> ($errors-&gt;<span class="tok-fn">all</span>() <span class="tok-key">as</span> $error)
            &lt;li&gt;{{ $error }}&lt;/li&gt;
        <span class="tok-key">@endforeach</span>
    &lt;/ul&gt;
<span class="tok-key">@endif</span>

<span class="tok-com">{{-- Por campo + repoblar --}}</span>
&lt;input name="titulo" value="{{ <span class="tok-fn">old</span>(<span class="tok-str">'titulo'</span>) }}"
       class="<span class="tok-key">@error</span>(<span class="tok-str">'titulo'</span>) invalido <span class="tok-key">@enderror</span>"&gt;
<span class="tok-key">@error</span>(<span class="tok-str">'titulo'</span>) &lt;span&gt;{{ $message }}&lt;/span&gt; <span class="tok-key">@enderror</span>`

const codeMessages = `$request-&gt;<span class="tok-fn">validate</span>(
    [
        <span class="tok-str">'titulo'</span> =&gt; [<span class="tok-str">'required'</span>, <span class="tok-str">'max:255'</span>],
        <span class="tok-str">'email'</span>  =&gt; [<span class="tok-str">'required'</span>, <span class="tok-str">'email'</span>],
    ],
    [   <span class="tok-com">// mensajes: 'campo.regla' =&gt; 'texto'</span>
        <span class="tok-str">'titulo.required'</span> =&gt; <span class="tok-str">'El titulo es obligatorio.'</span>,
        <span class="tok-str">'email.email'</span>     =&gt; <span class="tok-str">'Escribe un correo valido.'</span>,
    ],
    [   <span class="tok-com">// nombres legibles de los campos</span>
        <span class="tok-str">'email'</span> =&gt; <span class="tok-str">'correo electronico'</span>,
    ]
);`

const codeRequestBash = `php artisan make:request StoreTareaRequest`

const codeRequestClass = `<span class="tok-com">// app/Http/Requests/StoreTareaRequest.php</span>
<span class="tok-key">class</span> <span class="tok-fn">StoreTareaRequest</span> <span class="tok-key">extends</span> FormRequest
{
    <span class="tok-key">public function</span> <span class="tok-fn">authorize</span>(): <span class="tok-key">bool</span>
    {
        <span class="tok-key">return</span> <span class="tok-key">true</span>;   <span class="tok-com">// o la logica de permisos (Sesion 6)</span>
    }

    <span class="tok-key">public function</span> <span class="tok-fn">rules</span>(): <span class="tok-key">array</span>
    {
        <span class="tok-key">return</span> [
            <span class="tok-str">'titulo'</span> =&gt; [<span class="tok-str">'required'</span>, <span class="tok-str">'string'</span>, <span class="tok-str">'max:255'</span>],
            <span class="tok-str">'estado'</span> =&gt; [<span class="tok-str">'required'</span>, <span class="tok-str">'in:pendiente,completada'</span>],
        ];
    }

    <span class="tok-key">public function</span> <span class="tok-fn">messages</span>(): <span class="tok-key">array</span>
    {
        <span class="tok-key">return</span> [<span class="tok-str">'titulo.required'</span> =&gt; <span class="tok-str">'El titulo es obligatorio.'</span>];
    }
}`

const codeRequestUse = `<span class="tok-com">// El type-hint hace la magia: si no valida, ni entra al metodo</span>
<span class="tok-key">public function</span> <span class="tok-fn">store</span>(StoreTareaRequest $request)
{
    $datos = $request-&gt;<span class="tok-fn">validated</span>();   <span class="tok-com">// solo los campos validados</span>

    Tarea::<span class="tok-fn">create</span>($datos);
    <span class="tok-key">return</span> <span class="tok-fn">redirect</span>()-&gt;<span class="tok-fn">route</span>(<span class="tok-str">'tareas.index'</span>)
        -&gt;<span class="tok-fn">with</span>(<span class="tok-str">'status'</span>, <span class="tok-str">'Tarea creada'</span>);
}`

const codeFileForm = `<span class="tok-com">{{-- 1) El formulario necesita enctype --}}</span>
&lt;form method="POST" action="..." enctype="multipart/form-data"&gt;
    <span class="tok-key">@csrf</span>
    &lt;input type="file" name="adjunto"&gt;
&lt;/form&gt;`

const codeFileStore = `<span class="tok-com">// 2) Validar y guardar</span>
$request-&gt;<span class="tok-fn">validate</span>([
    <span class="tok-str">'adjunto'</span> =&gt; [<span class="tok-str">'required'</span>, <span class="tok-str">'file'</span>, <span class="tok-str">'mimes:pdf,jpg,png'</span>, <span class="tok-str">'max:5120'</span>],
]);

<span class="tok-key">if</span> ($request-&gt;<span class="tok-fn">hasFile</span>(<span class="tok-str">'adjunto'</span>)) {
    $ruta = $request-&gt;<span class="tok-fn">file</span>(<span class="tok-str">'adjunto'</span>)-&gt;<span class="tok-fn">store</span>(<span class="tok-str">'adjuntos'</span>);
}`

export const slides = [
  // 1 · Portada
  <Slide key="s1" center>
    <LaravelLogo />
    <span className="eyebrow">Módulo II · Sesión 8</span>
    <h1>
      Formularios y <span className="accent">Validaciones</span>
    </h1>
    <p className="lead muted" style={{ marginTop: '1.2rem' }}>
      Desarrollo de Aplicaciones Web con Laravel 13
    </p>
    <p className="muted" style={{ marginTop: '1.6rem' }}>
      Expositor: <b>Omar Mamani</b> · Duración: 1h 30min
    </p>
  </Slide>,

  // 2 · Repaso de la Sesión 7
  <CardsGrid
    key="s2"
    cols={3}
    eyebrow="Venimos de la Sesión 7"
    title="Repaso rápido"
    cards={[
      { title: '🧱 Middleware', body: 'Filtros por los que pasa cada petición.' },
      { title: '🔒 Control de acceso', body: 'Módulos protegidos por rol y permiso.' },
      { title: '🎟️ Sesiones', body: 'Datos, mensajes flash y seguridad.' },
    ]}
  />,

  // 3 · Agenda
  <CardsGrid
    key="s3"
    eyebrow="Hoja de ruta"
    title="Agenda de la sesión"
    cards={[
      { title: '1 · Blade Forms', body: 'Formularios y métodos HTTP.' },
      { title: '2 · Validaciones', body: 'Reglas, errores y mensajes.' },
      { title: '3 · Form Request y Archivos', body: 'Validación ordenada y adjuntos.' },
      { title: '4 · Laboratorio', body: 'Un formulario completo con validaciones.' },
    ]}
  />,

  // 4 · Objetivos
  <BulletSlide
    key="s4"
    eyebrow="¿Qué lograrás hoy?"
    title="Objetivos de aprendizaje"
    variant="checks"
    items={[
      <>Construir un <b>formulario Blade</b> con <code>@csrf</code>, <code>name</code> y <code>old()</code>.</>,
      <>Usar <code>@method</code> para <b>PUT/PATCH/DELETE</b>.</>,
      <><b>Validar</b> con <code>$request-&gt;validate</code> y las reglas comunes.</>,
      <><b>Mostrar errores</b> y repoblar con <code>old()</code>.</>,
      <>Definir <b>mensajes personalizados</b>.</>,
      <>Extraer la validación a un <b>Form Request</b>.</>,
      <>Manejar la <b>subida de archivos</b>.</>,
      <>Entender el <b>flujo completo</b> del formulario.</>,
    ]}
  />,

  // 5 · Divider 1
  <SectionDivider key="s5" center num="01" eyebrow="Bloque 1" title="Formularios en Blade" subtitle="Capturar datos del usuario." />,

  // 6 · El flujo de un formulario
  <Slide key="s6">
    <span className="eyebrow">Siempre el mismo ciclo</span>
    <h2>El flujo de un formulario</h2>
    <Flow
      style={{ marginTop: '1.1rem' }}
      steps={['Formulario (GET)', 'Enviar (POST)', 'Validar', 'Guardar', { label: 'Redirigir', ok: true }]}
    />
    <p className="lead" style={{ marginTop: '1.2rem' }}>
      <b>Analogía:</b> un <b>trámite con ventanilla</b> 🪟: llenas el formulario, lo <b>revisan</b>; si
      falta algo te lo <b>devuelven</b> marcado; si está bien, lo <b>procesan</b>.
    </p>
    <p className="muted" style={{ marginTop: '0.6rem' }}>
      Si la validación falla, Laravel regresa solo al formulario con los errores y los datos previos.
    </p>
  </Slide>,

  // 7 · Un formulario en Blade
  <Slide key="s7">
    <span className="eyebrow">El kit básico</span>
    <h2>Un formulario en Blade</h2>
    <CodeBlock html={codeForm} />
    <p className="muted" style={{ marginTop: '0.8rem' }}>
      <code>@csrf</code> es obligatorio (token anti falsificación). <code>old('titulo')</code> repuebla
      el campo si hubo error; <code>@error</code> muestra el mensaje de ese campo.
    </p>
  </Slide>,

  // 8 · Métodos HTTP en formularios
  <Slide key="s8">
    <span className="eyebrow">El HTML solo hace GET y POST</span>
    <h2>Métodos HTTP en formularios</h2>
    <CodeBlock html={codeMethod} />
    <p className="muted" style={{ marginTop: '0.8rem' }}>
      <code>@method('PUT')</code> agrega un campo oculto <code>_method</code>. Laravel lo lee y dirige
      la petición a <code>update</code>/<code>destroy</code> (los de <code>Route::resource</code>).
    </p>
  </Slide>,

  // 9 · Divider 2
  <SectionDivider key="s9" center num="02" eyebrow="Bloque 2" title="Validaciones" subtitle="Nunca confíes en la entrada del usuario." />,

  // 10 · ¿Qué es validar?
  <TwoColumn
    key="s10"
    eyebrow="La primera línea de defensa"
    title="¿Qué es validar?"
    lead={<>El <b>portero de un local</b> 🚧: revisa que cumplas los requisitos antes de dejarte pasar.</>}
    left={<CodeBlock html={codeValidate} />}
    right={
      <Card title="Lo que hace solo">
        <p className="muted">
          Si falla, <b>redirige</b> de vuelta con los <b>errores</b> y el <b>old input</b>. Si pasa,
          devuelve <b>solo los datos validados</b>.
        </p>
      </Card>
    }
  />,

  // 11 · Reglas comunes
  <Slide key="s11">
    <span className="eyebrow">Decenas listas para usar</span>
    <h2>Reglas comunes</h2>
    <CodeBlock html={codeRules} />
    <p className="muted" style={{ marginTop: '0.8rem' }}>
      Se combinan en un array (o con <code>|</code>). Hay muchas más: <code>numeric</code>,{' '}
      <code>boolean</code>, <code>url</code>, <code>exists</code>, <code>same</code>, <code>regex</code>...
    </p>
  </Slide>,

  // 12 · Mostrar errores y repoblar
  <Slide key="s12">
    <span className="eyebrow">En la vista</span>
    <h2>Mostrar errores y repoblar</h2>
    <CodeBlock html={codeErrors} />
    <p className="muted" style={{ marginTop: '0.8rem' }}>
      <code>$errors</code> está disponible en <b>todas</b> las vistas. <code>old('campo')</code> evita
      que el usuario reescriba todo tras un error.
    </p>
  </Slide>,

  // 13 · Mensajes personalizados
  <Slide key="s13">
    <span className="eyebrow">Mejor experiencia</span>
    <h2>Mensajes personalizados</h2>
    <CodeBlock html={codeMessages} />
    <p className="muted" style={{ marginTop: '0.8rem' }}>
      El segundo array define los textos por <code>campo.regla</code>; el tercero renombra el campo en
      los mensajes automáticos.
    </p>
  </Slide>,

  // 14 · Divider 3
  <SectionDivider key="s14" center num="03" eyebrow="Bloque 3" title="Form Request y Archivos" subtitle="Validación ordenada y adjuntos." />,

  // 15 · Form Request: crear
  <Slide key="s15">
    <span className="eyebrow">Validación en su propia clase</span>
    <h2>Form Request</h2>
    <CodeBlock html={codeRequestBash} />
    <div style={{ marginTop: '0.7rem' }}>
      <CodeBlock html={codeRequestClass} />
    </div>
  </Slide>,

  // 16 · Form Request: usarlo
  <Slide key="s16">
    <span className="eyebrow">Un controlador limpio</span>
    <h2>Form Request: usarlo</h2>
    <CodeBlock html={codeRequestUse} />
    <p className="muted" style={{ marginTop: '0.8rem' }}>
      El <i>type-hint</i> hace la magia: si no valida, <b>ni entra</b> al método. La validación se
      reutiliza en <code>store</code> y <code>update</code>.
    </p>
  </Slide>,

  // 17 · Subida de archivos
  <Slide key="s17">
    <span className="eyebrow">Adjuntos</span>
    <h2>Subida de archivos</h2>
    <CodeBlock html={codeFileForm} />
    <div style={{ marginTop: '0.7rem' }}>
      <CodeBlock html={codeFileStore} />
    </div>
    <p className="muted" style={{ marginTop: '0.7rem' }}>
      Sin <code>enctype="multipart/form-data"</code> el archivo <b>no llega</b>. <code>store()</code>
      genera un nombre único en <code>storage/app</code>.
    </p>
  </Slide>,

  // 18 · Divider 4
  <SectionDivider key="s18" center num="04" eyebrow="Bloque 4" title="Laboratorio" subtitle="Formularios completos con validaciones. ⌨️" />,

  // 19 · Laboratorio paso a paso
  <CardsGrid key="s19" eyebrow="Práctica guiada" title="Laboratorio paso a paso">
    <Card title="① El formulario">
      <ul>
        <li>Vista <code>tareas/create.blade.php</code> con <code>@csrf</code> y <code>old()</code>.</li>
        <li>Envío a <code>tareas.store</code>.</li>
      </ul>
    </Card>
    <Card title="② La validación">
      <ul>
        <li><code>make:request StoreTareaRequest</code>.</li>
        <li>Reglas + mensajes personalizados.</li>
      </ul>
    </Card>
    <Card title="③ Mostrar errores">
      <ul>
        <li><code>@error</code> por campo y resumen con <code>$errors</code>.</li>
        <li>Repoblar con <code>old()</code>.</li>
      </ul>
    </Card>
    <Card title="④ Guardar y adjuntar">
      <ul>
        <li><code>enctype</code> + input de archivo, regla <code>mimes</code>.</li>
        <li><code>store()</code>, guardar y redirigir con flash.</li>
      </ul>
    </Card>
  </CardsGrid>,

  // 20 · El ciclo completo
  <Slide key="s20">
    <span className="eyebrow">De principio a fin</span>
    <h2>El ciclo completo</h2>
    <table style={{ marginTop: '0.6rem' }}>
      <thead>
        <tr><th>Paso</th><th>Qué ocurre</th></tr>
      </thead>
      <tbody>
        <tr><td>1. Mostrar</td><td><code>GET /tareas/create</code> muestra el formulario</td></tr>
        <tr><td>2. Enviar</td><td><code>POST /tareas/store</code> con <code>@csrf</code></td></tr>
        <tr><td>3. Validar</td><td><code>StoreTareaRequest</code> revisa las reglas</td></tr>
        <tr><td>4a. Falla</td><td>Redirige al formulario con errores + <code>old()</code></td></tr>
        <tr><td>4b. Pasa</td><td>Guarda la tarea y el adjunto</td></tr>
        <tr><td>5. Confirmar</td><td>Redirige a la lista con un mensaje flash</td></tr>
      </tbody>
    </table>
    <p className="muted" style={{ marginTop: '0.8rem' }}>
      🧠 El usuario nunca rompe tu base de datos: la validación es tu primera línea de defensa.
    </p>
  </Slide>,

  // 21 · Checklist
  <Slide key="s21">
    <span className="eyebrow">Antes de cerrar</span>
    <h2>Checklist de la sesión</h2>
    <ul className="checks big" style={{ marginTop: '1rem' }}>
      <li>Construyo un formulario Blade con @csrf, name y old().</li>
      <li>Uso @method para PUT/PATCH/DELETE.</li>
      <li>Valido con $request-&gt;validate y conozco las reglas comunes.</li>
      <li>Muestro errores (@error, $errors) y repueblo con old().</li>
      <li>Defino mensajes personalizados.</li>
      <li>Extraigo la validación a un Form Request.</li>
      <li>Manejo la subida de archivos (enctype, file, store).</li>
      <li>Entiendo el flujo completo del formulario.</li>
    </ul>
  </Slide>,

  // 22 · Resumen
  <Slide key="s22">
    <span className="eyebrow">Lo que aprendiste hoy</span>
    <h2>Resumen de la sesión</h2>
    <div className="grid g2" style={{ marginTop: '0.8rem' }}>
      <Card title="Formularios">
        <p className="muted">
          <code>@csrf</code>, <code>@method</code>, <code>old()</code> y <code>@error</code> son tu kit
          básico de Blade Forms.
        </p>
      </Card>
      <Card title="Validación">
        <p className="muted">
          En el controlador o en un <b>Form Request</b>; Laravel redirige, muestra errores y repuebla.
        </p>
      </Card>
    </div>
    <p className="lead" style={{ marginTop: '1.2rem' }}>
      📌 Idea central: <span className="accent">nunca confíes en la entrada del usuario: valídala siempre</span>.
    </p>
  </Slide>,

  // 23 · Próxima sesión + tarea
  <Slide key="s23" center>
    <span className="eyebrow">Próxima sesión</span>
    <h2 style={{ fontSize: '2.6rem' }}>Sesión 9 - CRUD Profesional y Reportes</h2>
    <div className="grid g2" style={{ marginTop: '1.4rem', maxWidth: '60vw' }}>
      <Card title="CRUD completo"><p className="muted">Resource Controllers, paginación y mensajes flash.</p></Card>
      <Card title="Reportes"><p className="muted">Exportar a PDF y Excel. Juntamos todo lo aprendido.</p></Card>
    </div>
    <p className="muted" style={{ marginTop: '1.4rem' }}>
      <b>Tarea:</b> crea el <code>StoreTareaRequest</code> con reglas y mensajes, y un formulario de
      creación de tareas que muestre los errores y repueble los campos con <code>old()</code>.
    </p>
  </Slide>,

  // 24 · Cierre
  <Slide key="s24" center>
    <LaravelLogo />
    <h1>¿Preguntas? 🙌</h1>
    <p className="lead muted" style={{ marginTop: '1rem' }}>
      ¡Gracias por tu atención!
      <br />
      Nos vemos en la Sesión 9.
    </p>
    <p className="muted" style={{ marginTop: '1.6rem' }}>
      Desarrollo de Aplicaciones Web con Laravel 13 · Omar Mamani
    </p>
  </Slide>,
]

export default slides
