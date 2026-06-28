// ─────────────────────────────────────────────────────────────────────────
// Curso Laravel 13 · Sesión 9 - CRUD Profesional y Reportes
// Cada elemento del array `slides` es una diapositiva. El componente <Deck>
// se encarga de la navegación, el progreso y la pantalla completa.
// Usa `center` en un nodo para centrar esa diapositiva.
// Base pedagógica: docs/laravel/SESION-09-PLANIFICACION.md
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
  session: 9,
  title: 'CRUD Profesional y Reportes',
}

// ── Bloques de código (HTML resaltado) ────────────────────────────────────

const codeResource = `php artisan make:controller TareaController --resource --model=Tarea

<span class="tok-com">// routes/web.php</span>
Route::<span class="tok-fn">resource</span>(<span class="tok-str">'tareas'</span>, TareaController::<span class="tok-key">class</span>);`

const codeCrud = `<span class="tok-key">public function</span> <span class="tok-fn">store</span>(StoreTareaRequest $request)   <span class="tok-com">// valida (Sesion 8)</span>
{
    Tarea::<span class="tok-fn">create</span>($request-&gt;<span class="tok-fn">validated</span>());
    <span class="tok-key">return</span> <span class="tok-fn">redirect</span>()-&gt;<span class="tok-fn">route</span>(<span class="tok-str">'tareas.index'</span>)-&gt;<span class="tok-fn">with</span>(<span class="tok-str">'status'</span>, <span class="tok-str">'Tarea creada'</span>);
}

<span class="tok-key">public function</span> <span class="tok-fn">update</span>(StoreTareaRequest $request, Tarea $tarea)
{
    $tarea-&gt;<span class="tok-fn">update</span>($request-&gt;<span class="tok-fn">validated</span>());
    <span class="tok-key">return</span> <span class="tok-fn">redirect</span>()-&gt;<span class="tok-fn">route</span>(<span class="tok-str">'tareas.index'</span>)-&gt;<span class="tok-fn">with</span>(<span class="tok-str">'status'</span>, <span class="tok-str">'Tarea actualizada'</span>);
}

<span class="tok-key">public function</span> <span class="tok-fn">destroy</span>(Tarea $tarea)
{
    $tarea-&gt;<span class="tok-fn">delete</span>();
    <span class="tok-key">return</span> <span class="tok-fn">redirect</span>()-&gt;<span class="tok-fn">route</span>(<span class="tok-str">'tareas.index'</span>)-&gt;<span class="tok-fn">with</span>(<span class="tok-str">'status'</span>, <span class="tok-str">'Tarea eliminada'</span>);
}`

const codeFlash = `<span class="tok-com">// En el controlador (lo vimos en la Sesion 7)</span>
<span class="tok-key">return</span> <span class="tok-fn">redirect</span>()-&gt;<span class="tok-fn">route</span>(<span class="tok-str">'tareas.index'</span>)
    -&gt;<span class="tok-fn">with</span>(<span class="tok-str">'status'</span>, <span class="tok-str">'Tarea creada'</span>);

<span class="tok-com">{{-- En el layout o la vista --}}</span>
<span class="tok-key">@if</span> (<span class="tok-fn">session</span>(<span class="tok-str">'status'</span>))
    &lt;div class="alerta alerta-exito"&gt;{{ <span class="tok-fn">session</span>(<span class="tok-str">'status'</span>) }}&lt;/div&gt;
<span class="tok-key">@endif</span>`

const codePaginate = `<span class="tok-com">// Controlador: en vez de -&gt;get(), usa -&gt;paginate()</span>
<span class="tok-key">public function</span> <span class="tok-fn">index</span>()
{
    $tareas = Tarea::<span class="tok-fn">with</span>(<span class="tok-str">'user'</span>)-&gt;<span class="tok-fn">latest</span>()-&gt;<span class="tok-fn">paginate</span>(<span class="tok-num">15</span>);
    <span class="tok-key">return</span> <span class="tok-fn">view</span>(<span class="tok-str">'tareas.index'</span>, [<span class="tok-str">'tareas'</span> =&gt; $tareas]);
}

<span class="tok-com">{{-- Vista: el bucle igual + los enlaces de paginas --}}</span>
<span class="tok-key">@foreach</span> ($tareas <span class="tok-key">as</span> $tarea) ... <span class="tok-key">@endforeach</span>

{{ $tareas-&gt;<span class="tok-fn">links</span>() }}    <span class="tok-com">{{-- enlaces Tailwind listos --}}</span>`

const codePdfBash = `composer require barryvdh/laravel-dompdf`

const codePdf = `<span class="tok-key">use</span> Barryvdh\\DomPDF\\Facade\\Pdf;

<span class="tok-key">public function</span> <span class="tok-fn">exportarPdf</span>()
{
    $tareas = Tarea::<span class="tok-fn">all</span>();

    $pdf = Pdf::<span class="tok-fn">loadView</span>(<span class="tok-str">'reportes.tareas'</span>, [<span class="tok-str">'tareas'</span> =&gt; $tareas]);
    <span class="tok-key">return</span> $pdf-&gt;<span class="tok-fn">download</span>(<span class="tok-str">'tareas.pdf'</span>);   <span class="tok-com">// o -&gt;stream() en el navegador</span>
}`

const codeReportBlade = `<span class="tok-com">{{-- resources/views/reportes/tareas.blade.php --}}</span>
&lt;h1&gt;Reporte de Tareas&lt;/h1&gt;
&lt;table border="1" cellpadding="6"&gt;
    &lt;thead&gt;
        &lt;tr&gt;&lt;th&gt;ID&lt;/th&gt;&lt;th&gt;Titulo&lt;/th&gt;&lt;th&gt;Estado&lt;/th&gt;&lt;/tr&gt;
    &lt;/thead&gt;
    &lt;tbody&gt;
        <span class="tok-key">@foreach</span> ($tareas <span class="tok-key">as</span> $tarea)
            &lt;tr&gt;
                &lt;td&gt;{{ $tarea-&gt;id }}&lt;/td&gt;
                &lt;td&gt;{{ $tarea-&gt;titulo }}&lt;/td&gt;
                &lt;td&gt;{{ $tarea-&gt;estado }}&lt;/td&gt;
            &lt;/tr&gt;
        <span class="tok-key">@endforeach</span>
    &lt;/tbody&gt;
&lt;/table&gt;`

const codeExcelBash = `composer require maatwebsite/excel
php artisan make:export TareasExport --model=Tarea`

const codeExcel = `<span class="tok-com">// app/Exports/TareasExport.php</span>
<span class="tok-key">class</span> <span class="tok-fn">TareasExport</span> <span class="tok-key">implements</span> FromCollection, WithHeadings
{
    <span class="tok-key">public function</span> <span class="tok-fn">collection</span>() { <span class="tok-key">return</span> Tarea::<span class="tok-fn">all</span>(); }

    <span class="tok-key">public function</span> <span class="tok-fn">headings</span>(): <span class="tok-key">array</span>
    {
        <span class="tok-key">return</span> [<span class="tok-str">'ID'</span>, <span class="tok-str">'Titulo'</span>, <span class="tok-str">'Estado'</span>];
    }
}

<span class="tok-com">// En el controlador</span>
<span class="tok-key">return</span> Excel::<span class="tok-fn">download</span>(<span class="tok-key">new</span> TareasExport, <span class="tok-str">'tareas.xlsx'</span>);`

export const slides = [
  // 1 · Portada
  <Slide key="s1" center>
    <LaravelLogo />
    <span className="eyebrow">Módulo III · Sesión 9</span>
    <h1>
      CRUD Profesional y <span className="accent">Reportes</span>
    </h1>
    <p className="lead muted" style={{ marginTop: '1.2rem' }}>
      Desarrollo de Aplicaciones Web con Laravel 13
    </p>
    <p className="muted" style={{ marginTop: '1.6rem' }}>
      Expositor: <b>Omar Mamani</b> · Duración: 1h 30min
    </p>
  </Slide>,

  // 2 · Arrancamos el Módulo III
  <CardsGrid
    key="s2"
    cols={3}
    eyebrow="Empieza el Módulo III"
    title="¿Dónde estamos?"
    cards={[
      { title: '✅ Módulo I-II', body: 'Rutas, Eloquent, Blade, auth/roles, formularios y validación.' },
      { title: '🚀 Módulo III', body: 'Profesional: CRUD, reportes, API y despliegue.' },
      { title: '🧩 Hoy', body: 'Juntamos todo en un CRUD completo con reportes.' },
    ]}
  />,

  // 3 · Agenda
  <CardsGrid
    key="s3"
    eyebrow="Hoja de ruta"
    title="Agenda de la sesión"
    cards={[
      { title: '1 · CRUD completo', body: 'Resource Controllers y los 7 métodos.' },
      { title: '2 · Flash y Paginación', body: 'Confirmaciones y listas grandes.' },
      { title: '3 · Reportes', body: 'Exportar a PDF y Excel.' },
      { title: '4 · Laboratorio', body: 'CRUD completo con reportes.' },
    ]}
  />,

  // 4 · Objetivos
  <BulletSlide
    key="s4"
    eyebrow="¿Qué lograrás hoy?"
    title="Objetivos de aprendizaje"
    variant="checks"
    items={[
      <>Usar <b>Resource Controllers</b> y <code>Route::resource</code>.</>,
      <>Implementar el <b>CRUD completo</b> (7 métodos).</>,
      <>Mapear cada método a su <b>vista</b> y su <b>acción</b>.</>,
      <>Mostrar <b>mensajes flash</b> tras cada acción.</>,
      <><b>Paginar</b> con <code>paginate(15)</code> y los enlaces de páginas.</>,
      <>Exportar a <b>PDF</b> con DomPDF.</>,
      <>Exportar a <b>Excel</b> con Laravel Excel.</>,
      <>Reutilizar los datos de Eloquent en los <b>reportes</b>.</>,
    ]}
  />,

  // 5 · Divider 1
  <SectionDivider key="s5" center num="01" eyebrow="Bloque 1" title="CRUD con Resource Controllers" subtitle="Una línea, las 7 acciones." />,

  // 6 · Repaso: Resource Controllers
  <TwoColumn
    key="s6"
    eyebrow="Lo vimos en la Sesión 2"
    title="Resource Controllers"
    left={<CodeBlock html={codeResource} />}
    right={
      <Card title="CRUD">
        <p className="muted">
          <b>C</b>rear, <b>L</b>eer, <b>A</b>ctualizar y <b>E</b>liminar: las 4 operaciones de todo
          recurso. <code>Route::resource</code> las cablea por convención.
        </p>
      </Card>
    }
  />,

  // 7 · Los 7 métodos y sus vistas
  <Slide key="s7">
    <span className="eyebrow">El mapa del CRUD</span>
    <h2>Los 7 métodos y sus vistas</h2>
    <table style={{ marginTop: '0.6rem' }}>
      <thead>
        <tr><th>Método</th><th>Verbo + URI</th><th>Para qué</th><th>Vista</th></tr>
      </thead>
      <tbody>
        <tr><td><code>index</code></td><td>GET /tareas</td><td>Listar (paginado)</td><td><code>tareas.index</code></td></tr>
        <tr><td><code>create</code></td><td>GET /tareas/create</td><td>Formulario de alta</td><td><code>tareas.create</code></td></tr>
        <tr><td><code>store</code></td><td>POST /tareas</td><td>Guardar</td><td>(redirige)</td></tr>
        <tr><td><code>show</code></td><td>GET /tareas/{'{tarea}'}</td><td>Ver detalle</td><td><code>tareas.show</code></td></tr>
        <tr><td><code>edit</code></td><td>GET /tareas/{'{tarea}'}/edit</td><td>Formulario de edición</td><td><code>tareas.edit</code></td></tr>
        <tr><td><code>update</code></td><td>PUT /tareas/{'{tarea}'}</td><td>Actualizar</td><td>(redirige)</td></tr>
        <tr><td><code>destroy</code></td><td>DELETE /tareas/{'{tarea}'}</td><td>Eliminar</td><td>(redirige)</td></tr>
      </tbody>
    </table>
    <p className="muted" style={{ marginTop: '0.7rem' }}>
      3 métodos muestran <b>vistas</b>; 3 <b>procesan</b> y redirigen; <code>show</code> es opcional.
    </p>
  </Slide>,

  // 8 · Implementar el CRUD
  <Slide key="s8">
    <span className="eyebrow">Eloquent + validación + flash</span>
    <h2>Implementar el CRUD</h2>
    <CodeBlock html={codeCrud} />
    <p className="muted" style={{ marginTop: '0.8rem' }}>
      El <b>route model binding</b> inyecta la <code>$tarea</code> por su id automáticamente. Juntamos
      Eloquent (S5) + Form Request (S8) + redirect con flash.
    </p>
  </Slide>,

  // 9 · Divider 2
  <SectionDivider key="s9" center num="02" eyebrow="Bloque 2" title="Mensajes Flash y Paginación" subtitle="Confirmar acciones y listar a escala." />,

  // 10 · Mensajes flash
  <Slide key="s10">
    <span className="eyebrow">Confirmar cada acción</span>
    <h2>Mensajes flash</h2>
    <CodeBlock html={codeFlash} />
    <p className="muted" style={{ marginTop: '0.8rem' }}>
      🧾 Como un <b>recibo</b>: aparece una vez y desaparece. Mostrarlo en el <b>layout</b> hace que
      funcione en todo el CRUD sin repetir código.
    </p>
  </Slide>,

  // 11 · Paginación
  <Slide key="s11">
    <span className="eyebrow">No muestres 5000 filas de golpe</span>
    <h2>Paginación</h2>
    <CodeBlock html={codePaginate} />
    <p className="muted" style={{ marginTop: '0.8rem' }}>
      <code>paginate(15)</code> arma <code>limit</code>/<code>offset</code> solos. Para conservar
      filtros: <code>{'paginate(15)->withQueryString()'}</code>.
    </p>
  </Slide>,

  // 12 · Divider 3
  <SectionDivider key="s12" center num="03" eyebrow="Bloque 3" title="Reportes: PDF y Excel" subtitle="Datos descargables para el cliente." />,

  // 13 · Reportes y paquetes
  <TwoColumn
    key="s13"
    eyebrow="Un clásico de la gestión"
    title="Reportes y paquetes"
    left={
      <>
        <p className="lead">
          Los reportes descargables (facturas, listados) son un clásico de los sistemas de gestión.
        </p>
        <p className="muted" style={{ marginTop: '0.8rem' }}>
          Laravel no trae generador de PDF/Excel de fábrica, pero hay dos <b>paquetes estándar</b> de
          la comunidad que lo resuelven en minutos.
        </p>
      </>
    }
    right={
      <Card title="Los dos paquetes">
        <ul>
          <li><b>PDF:</b> <code>barryvdh/laravel-dompdf</code> (vista Blade → PDF).</li>
          <li><b>Excel:</b> <code>maatwebsite/excel</code> (Laravel Excel, exporta a .xlsx).</li>
        </ul>
      </Card>
    }
  />,

  // 14 · Exportación a PDF
  <Slide key="s14">
    <span className="eyebrow">DomPDF</span>
    <h2>Exportación a PDF</h2>
    <CodeBlock html={codePdfBash} />
    <div style={{ marginTop: '0.7rem' }}>
      <CodeBlock html={codePdf} />
    </div>
    <p className="muted" style={{ marginTop: '0.7rem' }}>
      <code>loadView</code> toma una <b>vista Blade</b> y la convierte a PDF.
      <code> setPaper('a4', 'landscape')</code> cambia tamaño y orientación.
    </p>
  </Slide>,

  // 15 · La vista del reporte
  <Slide key="s15">
    <span className="eyebrow">HTML que se "imprime" a PDF</span>
    <h2>La vista del reporte</h2>
    <CodeBlock html={codeReportBlade} />
    <p className="muted" style={{ marginTop: '0.8rem' }}>
      Es HTML normal: DomPDF lo convierte a PDF. Usa estilos simples (no todo el CSS moderno funciona).
    </p>
  </Slide>,

  // 16 · Exportación a Excel
  <Slide key="s16">
    <span className="eyebrow">Laravel Excel</span>
    <h2>Exportación a Excel</h2>
    <CodeBlock html={codeExcelBash} />
    <div style={{ marginTop: '0.7rem' }}>
      <CodeBlock html={codeExcel} />
    </div>
    <p className="muted" style={{ marginTop: '0.7rem' }}>
      <code>FromCollection</code> define los datos; <code>WithHeadings</code>, los encabezados.
      <code> Excel::download</code> genera y descarga el .xlsx.
    </p>
  </Slide>,

  // 17 · Divider 4
  <SectionDivider key="s17" center num="04" eyebrow="Bloque 4" title="Laboratorio" subtitle="CRUD completo con reportes. ⌨️" />,

  // 18 · Laboratorio paso a paso
  <CardsGrid key="s18" eyebrow="Práctica guiada" title="Laboratorio paso a paso">
    <Card title="① Completar el CRUD">
      <ul>
        <li>Los 7 métodos con Eloquent y Form Request.</li>
        <li>Vistas <code>index</code>, <code>create</code>, <code>edit</code>.</li>
      </ul>
    </Card>
    <Card title="② Flash + paginación">
      <ul>
        <li><code>with('status', ...)</code> en cada acción.</li>
        <li><code>paginate(15)</code> y los enlaces en el listado.</li>
      </ul>
    </Card>
    <Card title="③ Reporte PDF">
      <ul>
        <li>Instalar DomPDF + vista <code>reportes/tareas</code>.</li>
        <li>Ruta <code>tareas.pdf</code>.</li>
      </ul>
    </Card>
    <Card title="④ Reporte Excel">
      <ul>
        <li>Instalar Laravel Excel + <code>TareasExport</code>.</li>
        <li>Botones "Exportar PDF" y "Exportar Excel".</li>
      </ul>
    </Card>
  </CardsGrid>,

  // 19 · El resultado
  <Slide key="s19">
    <span className="eyebrow">Un módulo de gestión real</span>
    <h2>El resultado</h2>
    <table style={{ marginTop: '0.6rem' }}>
      <thead>
        <tr><th>Pieza</th><th>Qué aporta</th></tr>
      </thead>
      <tbody>
        <tr><td>CRUD (7 métodos)</td><td>Crear, ver, editar y eliminar tareas</td></tr>
        <tr><td>Mensajes flash</td><td>Confirmación visible de cada acción</td></tr>
        <tr><td>Paginación</td><td>Listado rápido aunque haya miles de filas</td></tr>
        <tr><td>Botón PDF</td><td>Reporte imprimible de las tareas</td></tr>
        <tr><td>Botón Excel</td><td>Datos exportables a hoja de cálculo</td></tr>
      </tbody>
    </table>
    <p className="muted" style={{ marginTop: '0.8rem' }}>
      🧠 Esto ya es un módulo de gestión profesional, listo para producción.
    </p>
  </Slide>,

  // 20 · Checklist
  <Slide key="s20">
    <span className="eyebrow">Antes de cerrar</span>
    <h2>Checklist de la sesión</h2>
    <ul className="checks big" style={{ marginTop: '1rem' }}>
      <li>Uso Resource Controllers y Route::resource.</li>
      <li>Implemento el CRUD completo (7 métodos con Eloquent y validación).</li>
      <li>Muestro mensajes flash tras cada acción.</li>
      <li>Pagino con paginate(15) y los enlaces de páginas.</li>
      <li>Conservo filtros con withQueryString().</li>
      <li>Exporto a PDF con DomPDF.</li>
      <li>Exporto a Excel con Laravel Excel.</li>
    </ul>
  </Slide>,

  // 21 · Resumen
  <Slide key="s21">
    <span className="eyebrow">Lo que aprendiste hoy</span>
    <h2>Resumen de la sesión</h2>
    <div className="grid g2" style={{ marginTop: '0.8rem' }}>
      <Card title="CRUD">
        <p className="muted">
          <code>Route::resource</code> + 7 métodos + Eloquent + Form Request + flash = gestión completa.
        </p>
      </Card>
      <Card title="Reportes">
        <p className="muted">
          DomPDF (vista Blade a PDF) y Laravel Excel (export a .xlsx) reutilizan tus datos.
        </p>
      </Card>
    </div>
    <p className="lead" style={{ marginTop: '1.2rem' }}>
      📌 Idea central: <span className="accent">un CRUD profesional pagina, confirma y exporta</span>.
    </p>
  </Slide>,

  // 22 · Próxima sesión + tarea
  <Slide key="s22" center>
    <span className="eyebrow">Próxima sesión</span>
    <h2 style={{ fontSize: '2.6rem' }}>Sesión 10 - APIs RESTful</h2>
    <div className="grid g2" style={{ marginTop: '1.4rem', maxWidth: '60vw' }}>
      <Card title="API Resources"><p className="muted">Respuestas JSON limpias para apps y otros clientes.</p></Card>
      <Card title="Postman + versionado"><p className="muted">Probar y versionar tu API profesional.</p></Card>
    </div>
    <p className="muted" style={{ marginTop: '1.4rem' }}>
      <b>Tarea:</b> completar el CRUD de Tareas con paginación y mensajes flash, y agregar un botón que
      exporte el listado a PDF con DomPDF.
    </p>
  </Slide>,

  // 23 · Cierre
  <Slide key="s23" center>
    <LaravelLogo />
    <h1>¿Preguntas? 🙌</h1>
    <p className="lead muted" style={{ marginTop: '1rem' }}>
      ¡Gracias por tu atención!
      <br />
      Nos vemos en la Sesión 10.
    </p>
    <p className="muted" style={{ marginTop: '1.6rem' }}>
      Desarrollo de Aplicaciones Web con Laravel 13 · Omar Mamani
    </p>
  </Slide>,
]

export default slides
