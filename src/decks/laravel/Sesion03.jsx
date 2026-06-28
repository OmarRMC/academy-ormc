// ─────────────────────────────────────────────────────────────────────────
// Curso Laravel 13 · Sesión 3 - Blade y Patrón MVC
// Cada elemento del array `slides` es una diapositiva. El componente <Deck>
// se encarga de la navegación, el progreso y la pantalla completa.
// Usa `center` en un nodo para centrar esa diapositiva.
// Base pedagógica: docs/laravel/SESION-03-PLANIFICACION.md
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
  session: 3,
  title: 'Blade y Patrón MVC',
}

// ── Bloques de código (HTML resaltado) ────────────────────────────────────

const codeMvc = `<span class="tok-com">// app/Http/Controllers/TareaController.php</span>
<span class="tok-key">public function</span> <span class="tok-fn">index</span>()
{
    $tareas = [<span class="tok-str">'Comprar dominio'</span>, <span class="tok-str">'Configurar servidor'</span>];
    <span class="tok-key">return</span> <span class="tok-fn">view</span>(<span class="tok-str">'tareas.index'</span>, [<span class="tok-str">'tareas'</span> =&gt; $tareas]);
}`

const codeEcho = `<span class="tok-com">{{-- resources/views/tareas/index.blade.php --}}</span>
&lt;h1&gt;Tienes {{ count($tareas) }} tareas&lt;/h1&gt;

&lt;p&gt;Hola, {{ $nombre }}&lt;/p&gt;

<span class="tok-com">{{-- Sin escapar (peligroso con datos del usuario) --}}</span>
&lt;div&gt;{!! $htmlConfiable !!}&lt;/div&gt;`

const codeCond = `<span class="tok-key">@if</span> (count($tareas) === 0)
    &lt;p&gt;No hay tareas todavia.&lt;/p&gt;
<span class="tok-key">@elseif</span> (count($tareas) === 1)
    &lt;p&gt;Tienes una tarea.&lt;/p&gt;
<span class="tok-key">@else</span>
    &lt;p&gt;Tienes varias tareas.&lt;/p&gt;
<span class="tok-key">@endif</span>

<span class="tok-key">@auth</span>
    &lt;span&gt;Sesion iniciada&lt;/span&gt;
<span class="tok-key">@endauth</span>

<span class="tok-key">@isset</span>($filtro)
    &lt;small&gt;Filtrando por: {{ $filtro }}&lt;/small&gt;
<span class="tok-key">@endisset</span>`

const codeLoop = `&lt;ul&gt;
    <span class="tok-key">@forelse</span> ($tareas as $tarea)
        &lt;li&gt;{{ $loop-&gt;iteration }}. {{ $tarea }}&lt;/li&gt;
    <span class="tok-key">@empty</span>
        &lt;li&gt;Sin tareas por ahora.&lt;/li&gt;
    <span class="tok-key">@endforelse</span>
&lt;/ul&gt;`

const codeInclude = `<span class="tok-com">{{-- resources/views/tareas/index.blade.php --}}</span>
&lt;div&gt;
    <span class="tok-key">@include</span>(<span class="tok-str">'parciales.navbar'</span>)

    <span class="tok-key">@include</span>(<span class="tok-str">'parciales.alerta'</span>, [<span class="tok-str">'mensaje'</span> =&gt; <span class="tok-str">'Tarea guardada'</span>])
&lt;/div&gt;`

const codeLayout = `<span class="tok-com">{{-- resources/views/layouts/app.blade.php --}}</span>
&lt;!DOCTYPE html&gt;
&lt;html lang="es"&gt;
&lt;head&gt;
    &lt;title&gt;Gestion App - <span class="tok-key">@yield</span>(<span class="tok-str">'titulo'</span>)&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
    <span class="tok-key">@include</span>(<span class="tok-str">'parciales.navbar'</span>)

    &lt;main&gt;
        <span class="tok-key">@yield</span>(<span class="tok-str">'contenido'</span>)
    &lt;/main&gt;
&lt;/body&gt;
&lt;/html&gt;`

const codeExtend = `<span class="tok-com">{{-- resources/views/tareas/index.blade.php --}}</span>
<span class="tok-key">@extends</span>(<span class="tok-str">'layouts.app'</span>)

<span class="tok-key">@section</span>(<span class="tok-str">'titulo'</span>, <span class="tok-str">'Tareas'</span>)

<span class="tok-key">@section</span>(<span class="tok-str">'contenido'</span>)
    &lt;h1&gt;Mis tareas&lt;/h1&gt;
    &lt;ul&gt;
        <span class="tok-key">@foreach</span> ($tareas as $tarea)
            &lt;li&gt;{{ $tarea }}&lt;/li&gt;
        <span class="tok-key">@endforeach</span>
    &lt;/ul&gt;
<span class="tok-key">@endsection</span>`

const codeComponentBash = `php artisan make:component Alerta`

const codeComponentClass = `<span class="tok-com">// app/View/Components/Alerta.php</span>
<span class="tok-key">class</span> <span class="tok-fn">Alerta</span> <span class="tok-key">extends</span> Component
{
    <span class="tok-key">public function</span> <span class="tok-fn">__construct</span>(
        <span class="tok-key">public string</span> $tipo,
        <span class="tok-key">public string</span> $mensaje,
    ) {}

    <span class="tok-key">public function</span> <span class="tok-fn">render</span>() { <span class="tok-key">return</span> <span class="tok-fn">view</span>(<span class="tok-str">'components.alerta'</span>); }
}

<span class="tok-com">{{-- components/alerta.blade.php --}}</span>
&lt;div class="alerta alerta-{{ $tipo }}"&gt;{{ $mensaje }}&lt;/div&gt;

<span class="tok-com">{{-- Uso: atributo con ":" = variable PHP --}}</span>
<span class="tok-tag">&lt;x-alerta</span> tipo=<span class="tok-str">"exito"</span> :mensaje=<span class="tok-str">"$texto"</span> <span class="tok-tag">/&gt;</span>`

const codeAnon = `<span class="tok-com">{{-- resources/views/components/tarjeta.blade.php --}}</span>
<span class="tok-key">@props</span>([<span class="tok-str">'titulo'</span>, <span class="tok-str">'color'</span> =&gt; <span class="tok-str">'gris'</span>])

&lt;div {{ $attributes-&gt;<span class="tok-fn">merge</span>([<span class="tok-str">'class'</span> =&gt; <span class="tok-str">'tarjeta tarjeta-'</span>.$color]) }}&gt;
    &lt;h3&gt;{{ $titulo }}&lt;/h3&gt;
    {{ $slot }}
&lt;/div&gt;

<span class="tok-com">{{-- Uso: 'class' extra se fusiona (attribute bag) --}}</span>
<span class="tok-tag">&lt;x-tarjeta</span> titulo=<span class="tok-str">"Tarea 1"</span> color=<span class="tok-str">"azul"</span> class=<span class="tok-str">"mb-4"</span><span class="tok-tag">&gt;</span>
    Contenido de la tarjeta
<span class="tok-tag">&lt;/x-tarjeta&gt;</span>`

const codeSlot = `<span class="tok-com">{{-- resources/views/components/panel.blade.php --}}</span>
&lt;section class="panel"&gt;
    &lt;header&gt;{{ $titulo }}&lt;/header&gt;
    &lt;div&gt;{{ $slot }}&lt;/div&gt;
&lt;/section&gt;

<span class="tok-com">{{-- Uso: slot con nombre + slot principal --}}</span>
<span class="tok-tag">&lt;x-panel&gt;</span>
    <span class="tok-tag">&lt;x-slot:titulo&gt;</span>Resumen<span class="tok-tag">&lt;/x-slot&gt;</span>

    &lt;p&gt;Este texto va en el slot principal.&lt;/p&gt;
<span class="tok-tag">&lt;/x-panel&gt;</span>`

const codeLayoutComp = `<span class="tok-com">{{-- resources/views/components/layout.blade.php --}}</span>
&lt;html&gt;
&lt;head&gt;&lt;title&gt;{{ $titulo ?? 'Gestion App' }}&lt;/title&gt;&lt;/head&gt;
&lt;body&gt;
    <span class="tok-key">@include</span>(<span class="tok-str">'parciales.navbar'</span>)
    {{ $slot }}
&lt;/body&gt;
&lt;/html&gt;

<span class="tok-com">{{-- resources/views/tareas/index.blade.php --}}</span>
<span class="tok-tag">&lt;x-layout&gt;</span>
    <span class="tok-tag">&lt;x-slot:titulo&gt;</span>Tareas<span class="tok-tag">&lt;/x-slot&gt;</span>

    <span class="tok-key">@foreach</span> ($tareas as $tarea)
        &lt;div&gt;{{ $tarea }}&lt;/div&gt;
    <span class="tok-key">@endforeach</span>
<span class="tok-tag">&lt;/x-layout&gt;</span>`

const codeForm = `&lt;form method="POST" action="{{ <span class="tok-fn">route</span>(<span class="tok-str">'tareas.store'</span>) }}"&gt;
    <span class="tok-key">@csrf</span>
    <span class="tok-key">@method</span>(<span class="tok-str">'PUT'</span>)   <span class="tok-com">{{-- simula PUT/PATCH/DELETE --}}</span>

    &lt;input type="text" name="titulo" value="{{ <span class="tok-fn">old</span>(<span class="tok-str">'titulo'</span>) }}"&gt;

    <span class="tok-key">@error</span>(<span class="tok-str">'titulo'</span>)
        &lt;span class="error"&gt;{{ $message }}&lt;/span&gt;
    <span class="tok-key">@enderror</span>

    &lt;button&gt;Guardar&lt;/button&gt;
&lt;/form&gt;`

// Árbol de vistas (se renderiza con la clase .tree)
const treeViews = `<span class="dir">resources/views/</span>
&nbsp;├─ <span class="dir">layouts/</span>app.blade.php &nbsp;&nbsp;&nbsp;<span class="cmt"># plantilla base (@yield)</span>
&nbsp;├─ <span class="dir">parciales/</span>navbar.blade.php &nbsp;<span class="cmt"># @include</span>
&nbsp;├─ <span class="dir">components/</span>tarea-card.blade.php <span class="cmt"># &lt;x-tarea-card /&gt;</span>
&nbsp;└─ <span class="dir">tareas/</span>index.blade.php &nbsp;<span class="cmt"># @extends + @forelse</span>`

export const slides = [
  // 1 · Portada
  <Slide key="s1" center>
    <LaravelLogo />
    <span className="eyebrow">Módulo I · Sesión 3</span>
    <h1>
      Blade y <span className="accent">Patrón MVC</span>
    </h1>
    <p className="lead muted" style={{ marginTop: '1.2rem' }}>
      Desarrollo de Aplicaciones Web con Laravel 13
    </p>
    <p className="muted" style={{ marginTop: '1.6rem' }}>
      Expositor: <b>Omar Mamani</b> · Duración: 1h 30min
    </p>
  </Slide>,

  // 2 · Repaso de la Sesión 2
  <CardsGrid
    key="s2"
    cols={3}
    eyebrow="Venimos de la Sesión 2"
    title="Repaso rápido"
    cards={[
      { title: '🛣️ Rutas', body: 'Web, dinámicas, nombradas y redirecciones.' },
      { title: '🎛️ Controladores', body: 'make:controller, conectar rutas e inyección de Request.' },
      { title: '🗂️ Grupos', body: 'prefix y name para ordenar (por ejemplo /admin).' },
    ]}
  />,

  // 3 · Agenda
  <CardsGrid
    key="s3"
    eyebrow="Hoja de ruta"
    title="Agenda de la sesión"
    cards={[
      { title: '1 · Blade y MVC', body: 'Qué es Blade, view(), mostrar datos y directivas.' },
      { title: '2 · Reutilización', body: 'Includes, layouts y secciones.' },
      { title: '3 · Componentes', body: 'De clase, anónimos y slots.' },
      { title: '4 · Helpers + Lab', body: 'Helpers de Laravel y práctica guiada.' },
    ]}
  />,

  // 4 · Objetivos
  <BulletSlide
    key="s4"
    eyebrow="¿Qué lograrás hoy?"
    title="Objetivos de aprendizaje"
    variant="checks"
    items={[
      <>Saber <b>qué es Blade</b> y que se compila a PHP.</>,
      <>Devolver <b>vistas desde el controlador</b> con <code>view()</code> (cerrar el MVC).</>,
      <>Mostrar datos con <code>{'{{ }}'}</code> y entender el <b>escape XSS</b>.</>,
      <>Usar <b>directivas</b> condicionales y de bucle.</>,
      <>Insertar subvistas con <code>@include</code>.</>,
      <>Construir <b>layouts y secciones</b> (<code>@extends</code>, <code>@yield</code>).</>,
      <>Crear <b>componentes</b> con slots y <code>@props</code>.</>,
      <>Usar <b>helpers</b> y <code>@csrf</code>/<code>@method</code>/<code>@error</code>.</>,
    ]}
  />,

  // 5 · Divider 1
  <SectionDivider key="s5" center num="01" eyebrow="Bloque 1" title="Blade y el Patrón MVC" subtitle="La V de MVC: armar el HTML con datos." />,

  // 6 · ¿Qué es Blade?
  <TwoColumn
    key="s6"
    eyebrow="Concepto"
    title="¿Qué es Blade?"
    left={
      <>
        <p className="lead">
          El <b>motor de plantillas</b> de Laravel. Archivos <code>.blade.php</code> en{' '}
          <code>resources/views</code>.
        </p>
        <ul style={{ marginTop: '0.8rem' }}>
          <li>Se compilan a <b>PHP plano</b> y se cachean: cero sobrecarga.</li>
          <li><b>Analogía:</b> un molde de repostería 🧁: pones la masa (datos), sale la forma (HTML).</li>
        </ul>
      </>
    }
    right={
      <Card title="Lo mejor">
        <p className="muted">
          Sintaxis corta (<code>@if</code>, <code>@foreach</code>, <code>{'{{ }}'}</code>),{' '}
          <b>protección XSS</b> automática y reutilización con componentes.
        </p>
      </Card>
    }
  />,

  // 7 · Cerrar el ciclo MVC
  <Slide key="s7">
    <span className="eyebrow">El controlador entrega datos</span>
    <h2>Cerrar el ciclo MVC</h2>
    <CodeBlock html={codeMvc} />
    <Flow
      style={{ marginTop: '1.1rem' }}
      steps={['Ruta', 'Controlador', 'Vista (Blade)', { label: 'HTML', ok: true }]}
    />
    <p className="muted" style={{ marginTop: '0.8rem' }}>
      <code>view('tareas.index', ...)</code> busca{' '}
      <code>resources/views/tareas/index.blade.php</code>.
    </p>
  </Slide>,

  // 8 · Mostrar datos
  <Slide key="s8">
    <span className="eyebrow">Imprimir variables</span>
    <h2>Mostrar datos con {'{{ }}'}</h2>
    <CodeBlock html={codeEcho} />
    <p className="muted" style={{ marginTop: '0.8rem' }}>
      🛡️ <code>{'{{ }}'}</code> pasa todo por <code>htmlspecialchars</code>: protege contra <b>XSS</b>.
      Usa <code>{'{!! !!}'}</code> solo con contenido de confianza.
    </p>
  </Slide>,

  // 9 · Directivas condicionales
  <Slide key="s9">
    <span className="eyebrow">Control de flujo</span>
    <h2>Directivas: condicionales</h2>
    <CodeBlock html={codeCond} />
    <p className="muted" style={{ marginTop: '0.8rem' }}>
      Atajos frecuentes: <code>@unless</code>, <code>@empty</code>, <code>@guest</code>,{' '}
      <code>@switch</code>. Cada uno equivale a su estructura PHP.
    </p>
  </Slide>,

  // 10 · Directivas de bucle
  <Slide key="s10">
    <span className="eyebrow">Recorrer listas</span>
    <h2>Directivas: bucles y $loop</h2>
    <CodeBlock html={codeLoop} />
    <p className="muted" style={{ marginTop: '0.8rem' }}>
      <code>@forelse</code> itera y, si la lista está vacía, ejecuta <code>@empty</code>. Dentro,{' '}
      <code>$loop</code> da <code>iteration</code>, <code>first</code>, <code>last</code>, <code>count</code>...
    </p>
  </Slide>,

  // 11 · Divider 2
  <SectionDivider key="s11" center num="02" eyebrow="Bloque 2" title="Reutilización de Interfaces" subtitle="No te repitas: includes, layouts y secciones." />,

  // 12 · El problema DRY
  <TwoColumn
    key="s12"
    eyebrow="No te repitas (DRY)"
    title="El problema"
    left={
      <>
        <p className="lead">
          El <code>&lt;head&gt;</code>, la barra de navegación y el pie se repiten en <b>todas</b> las
          páginas.
        </p>
        <p className="muted" style={{ marginTop: '0.8rem' }}>
          <b>Analogía:</b> un membrete de empresa 📄: encabezado y pie iguales en todo documento; solo
          cambia el cuerpo. No los vuelves a dibujar en cada hoja.
        </p>
      </>
    }
    right={
      <Card title="Dos herramientas">
        <ul>
          <li><code>@include</code> → insertar un trozo de vista.</li>
          <li><b>Layouts</b> → una plantilla base que las páginas rellenan.</li>
        </ul>
      </Card>
    }
  />,

  // 13 · Includes
  <Slide key="s13">
    <span className="eyebrow">Insertar subvistas</span>
    <h2>Includes</h2>
    <CodeBlock html={codeInclude} />
    <p className="muted" style={{ marginTop: '0.8rem' }}>
      La subvista hereda los datos del padre y admite datos extra. Variantes: <code>@includeIf</code>,{' '}
      <code>@includeWhen</code>.
    </p>
  </Slide>,

  // 14 · Layouts y Secciones (definir)
  <Slide key="s14">
    <span className="eyebrow">La plantilla base</span>
    <h2>Layouts y Secciones</h2>
    <CodeBlock html={codeLayout} />
    <p className="muted" style={{ marginTop: '0.8rem' }}>
      <code>@yield('contenido')</code> es el hueco que cada vista hija rellenará. Admite valor por
      defecto: <code>@yield('titulo', 'Inicio')</code>.
    </p>
  </Slide>,

  // 15 · Extender el layout
  <Slide key="s15">
    <span className="eyebrow">La vista hija</span>
    <h2>Extender el layout</h2>
    <CodeBlock html={codeExtend} />
    <p className="muted" style={{ marginTop: '0.8rem' }}>
      <code>@extends</code> elige el layout; cada <code>@section</code> rellena un hueco.{' '}
      <code>@@parent</code> agrega sin reemplazar.
    </p>
  </Slide>,

  // 16 · Divider 3
  <SectionDivider key="s16" center num="03" eyebrow="Bloque 3" title="Componentes Blade" subtitle="Piezas de interfaz reutilizables y configurables." />,

  // 17 · ¿Qué es un componente?
  <TwoColumn
    key="s17"
    eyebrow="La forma moderna"
    title="¿Qué es un componente?"
    left={
      <>
        <p className="lead">
          Como piezas de <b>Lego</b> 🧱: construyes la pieza una vez (un botón, una tarjeta, una
          alerta) y la reutilizas en toda la app.
        </p>
        <p className="muted" style={{ marginTop: '0.8rem' }}>
          Encapsula HTML + datos en una etiqueta propia <code>{'<x-...>'}</code>. Más potente que{' '}
          <code>@include</code>: define <b>qué datos</b> recibe y tiene <b>slots</b>.
        </p>
      </>
    }
    right={
      <Card title="Dos tipos">
        <ul>
          <li>De <b>clase</b> (con lógica PHP, <code>make:component</code>).</li>
          <li><b>Anónimos</b> (solo plantilla, con <code>@props</code>).</li>
          <li>Viven en <code>resources/views/components</code>.</li>
        </ul>
      </Card>
    }
  />,

  // 18 · Componentes de clase
  <Slide key="s18">
    <span className="eyebrow">Con lógica PHP</span>
    <h2>Componentes de clase</h2>
    <CodeBlock html={codeComponentBash} />
    <div style={{ marginTop: '0.7rem' }}>
      <CodeBlock html={codeComponentClass} />
    </div>
  </Slide>,

  // 19 · Componentes anónimos + props
  <Slide key="s19">
    <span className="eyebrow">Solo una plantilla</span>
    <h2>Componentes anónimos + @props</h2>
    <CodeBlock html={codeAnon} />
    <p className="muted" style={{ marginTop: '0.8rem' }}>
      <code>@props</code> separa <b>datos</b> de <b>atributos HTML</b>. El <i>attribute bag</i>{' '}
      (<code>{'{{ $attributes }}'}</code>) reenvía y fusiona <code>class</code>, <code>id</code>, etc.
    </p>
  </Slide>,

  // 20 · Slots
  <Slide key="s20">
    <span className="eyebrow">El hueco del componente</span>
    <h2>Slots</h2>
    <CodeBlock html={codeSlot} />
    <p className="muted" style={{ marginTop: '0.8rem' }}>
      <code>{'{{ $slot }}'}</code> es el contenido principal; <code>{'<x-slot:nombre>'}</code> define
      slots con nombre.
    </p>
  </Slide>,

  // 21 · Layout como componente (moderno)
  <Slide key="s21">
    <span className="eyebrow">La forma recomendada hoy</span>
    <h2>Layout como componente</h2>
    <CodeBlock html={codeLayoutComp} />
    <p className="muted" style={{ marginTop: '0.8rem' }}>
      Mismo resultado que <code>@extends</code>, pero con sintaxis de componentes. Convive con la
      clásica: elige una y sé consistente.
    </p>
  </Slide>,

  // 22 · Divider 4
  <SectionDivider key="s22" center num="04" eyebrow="Bloque 4" title="Helpers" subtitle="Funciones globales que ahorran código." />,

  // 23 · Helpers de Laravel
  <CardsGrid
    key="s23"
    cols={3}
    eyebrow="En las vistas"
    title="Helpers de Laravel"
    cards={[
      { title: "route('tareas.index')", body: 'URL de una ruta nombrada.' },
      { title: "url('/tareas')", body: 'URL absoluta del sitio.' },
      { title: "asset('css/app.css')", body: 'Ruta a un archivo en public/.' },
      { title: "old('titulo')", body: 'Valor anterior de un formulario (tras un error).' },
      { title: "config('app.name')", body: 'Lee configuración de la app.' },
      { title: 'auth()->user()', body: 'El usuario autenticado (Sesión 6).' },
    ]}
  />,

  // 24 · Formularios: @csrf, @method, @error
  <Slide key="s24">
    <span className="eyebrow">Directivas para formularios</span>
    <h2>@csrf, @method y @error</h2>
    <CodeBlock html={codeForm} />
    <p className="muted" style={{ marginTop: '0.8rem' }}>
      <code>@csrf</code> agrega el token (obligatorio en POST/PUT/PATCH/DELETE); <code>@method</code>{' '}
      falsea el verbo; <code>@error</code> muestra la validación. Más en la <b>Sesión 8</b>.
    </p>
  </Slide>,

  // 25 · Divider 5
  <SectionDivider key="s25" center num="05" eyebrow="Bloque 5" title="Laboratorio" subtitle="Construcción de interfaces reutilizables. ⌨️" />,

  // 26 · Laboratorio paso a paso
  <CardsGrid key="s26" eyebrow="Práctica guiada" title="Laboratorio paso a paso">
    <Card title="① Crear el layout">
      <ul>
        <li><code>layouts/app.blade.php</code> con <code>@yield</code>.</li>
        <li>Include <code>parciales/navbar.blade.php</code>.</li>
      </ul>
    </Card>
    <Card title="② Vista de Tareas">
      <ul>
        <li><code>tareas/index.blade.php</code> que <code>@extends</code>.</li>
        <li>Recorrer <code>$tareas</code> con <code>@forelse</code>.</li>
      </ul>
    </Card>
    <Card title="③ Componente reutilizable">
      <ul>
        <li><code>make:component TareaCard</code>.</li>
        <li>Usar <code>{'<x-tarea-card :titulo="$tarea" />'}</code>.</li>
      </ul>
    </Card>
    <Card title="④ Conectar el controlador">
      <ul>
        <li><code>view('tareas.index', ['tareas' =&gt; $tareas])</code>.</li>
        <li>Abrir <code>/admin/tareas</code> y ver la interfaz.</li>
      </ul>
    </Card>
  </CardsGrid>,

  // 27 · Estructura de vistas resultante
  <TwoColumn
    key="s27"
    eyebrow="Cómo queda organizado"
    title="Estructura de vistas"
    left={<div className="card"><div className="tree" dangerouslySetInnerHTML={{ __html: treeViews }} /></div>}
    right={
      <>
        <p className="lead">Cada pieza tiene su lugar:</p>
        <ul style={{ marginTop: '0.8rem' }}>
          <li><b>Layout</b> → la plantilla base.</li>
          <li><b>Parciales</b> → trozos con <code>@include</code>.</li>
          <li><b>Componentes</b> → piezas <code>{'<x-...>'}</code>.</li>
          <li><b>Vistas</b> → cada página del sistema.</li>
        </ul>
      </>
    }
  />,

  // 28 · Checklist
  <Slide key="s28">
    <span className="eyebrow">Antes de cerrar</span>
    <h2>Checklist de la sesión</h2>
    <ul className="checks big" style={{ marginTop: '1rem' }}>
      <li>Sé qué es Blade y que se compila a PHP.</li>
      <li>Devuelvo vistas desde el controlador con view() (cierro el MVC).</li>
      <li>Muestro datos con llaves dobles y entiendo el escape XSS.</li>
      <li>Uso directivas condicionales y de bucle.</li>
      <li>Inserto subvistas con @include.</li>
      <li>Construyo layouts y secciones (@extends, @yield, @section).</li>
      <li>Creo componentes (de clase y anónimos) con slots y @props.</li>
      <li>Uso helpers y @csrf/@method/@error.</li>
    </ul>
  </Slide>,

  // 29 · Resumen
  <Slide key="s29">
    <span className="eyebrow">Lo que aprendiste hoy</span>
    <h2>Resumen de la sesión</h2>
    <div className="grid g2" style={{ marginTop: '0.8rem' }}>
      <Card title="Blade = la V de MVC">
        <p className="muted">
          El controlador entrega datos y Blade arma el HTML con <code>{'{{ }}'}</code> y directivas.
        </p>
      </Card>
      <Card title="Reutilización">
        <p className="muted">
          <code>@include</code>, layouts/secciones y <b>componentes</b> evitan repetir y ordenan la
          interfaz.
        </p>
      </Card>
    </div>
    <p className="lead" style={{ marginTop: '1.2rem' }}>
      📌 Idea central: <span className="accent">arma la interfaz una sola vez y reutilízala en todo el sistema</span>.
    </p>
  </Slide>,

  // 30 · Próxima sesión + tarea
  <Slide key="s30" center>
    <span className="eyebrow">Próxima sesión</span>
    <h2 style={{ fontSize: '2.6rem' }}>Sesión 4 - Base de Datos</h2>
    <div className="grid g2" style={{ marginTop: '1.4rem', maxWidth: '60vw' }}>
      <Card title="Migraciones y seeders"><p className="muted">Crear tablas y poblarlas con datos de prueba.</p></Card>
      <Card title="Query Builder"><p className="muted">Las tareas saldrán de una base de datos real, no de un array.</p></Card>
    </div>
    <p className="muted" style={{ marginTop: '1.4rem' }}>
      <b>Tarea:</b> crea un componente <code>{'<x-boton>'}</code> con un slot para el texto y un prop{' '}
      <code>color</code>, y úsalo en la vista de Tareas.
    </p>
  </Slide>,

  // 31 · Cierre
  <Slide key="s31" center>
    <LaravelLogo />
    <h1>¿Preguntas? 🙌</h1>
    <p className="lead muted" style={{ marginTop: '1rem' }}>
      ¡Gracias por tu atención!
      <br />
      Nos vemos en la Sesión 4.
    </p>
    <p className="muted" style={{ marginTop: '1.6rem' }}>
      Desarrollo de Aplicaciones Web con Laravel 13 · Omar Mamani
    </p>
  </Slide>,
]

export default slides
