// ─────────────────────────────────────────────────────────────────────────
// Curso React · Sesión 4 - Estado Global y Formularios
// Cada elemento del array `slides` es una diapositiva. El componente <Deck>
// se encarga de la navegación, el progreso y la pantalla completa.
// Usa `center` en un nodo para centrar esa diapositiva.
// ─────────────────────────────────────────────────────────────────────────
import Slide from '../../deck/Slide.jsx'
import { ReactLogo } from '../../deck/Deck.jsx'
import TitleSlide from '../../deck/layouts/TitleSlide.jsx'
import SectionDivider from '../../deck/layouts/SectionDivider.jsx'
import BulletSlide from '../../deck/layouts/BulletSlide.jsx'
import TwoColumn from '../../deck/layouts/TwoColumn.jsx'
import CardsGrid from '../../deck/layouts/CardsGrid.jsx'
import Card from '../../deck/layouts/Card.jsx'
import Flow from '../../deck/layouts/Flow.jsx'
import CodeBlock from '../../deck/CodeBlock.jsx'
import { ArrowRight } from '../../components/ui/Icons.jsx'

// Flecha inline (icono) para textos del tipo "X → Y"
const Arr = () => (
  <ArrowRight size={14} className="text-react" style={{ verticalAlign: '-2px', margin: '0 3px' }} />
)

export const meta = {
  course: 'react-cicd',
  session: 4,
  title: 'Estado Global y Formularios',
}

// ── Bloques de código (HTML con tokens .tok-*) ────────────────────────────

const codeInstallZustand = `<span class="tok-com"># Instalar Zustand</span>
npm install zustand`

const codeCreate = `<span class="tok-com">// src/store/useTaskStore.js</span>
<span class="tok-key">import</span> { create } <span class="tok-key">from</span> <span class="tok-str">"zustand"</span>;

<span class="tok-key">export const</span> useTaskStore = <span class="tok-fn">create</span>((set) =&gt; ({
  tareas: [],                              <span class="tok-com">// estado</span>
  setTareas: (tareas) =&gt; <span class="tok-fn">set</span>({ tareas }), <span class="tok-com">// acción</span>
}));`

const codeActions = `<span class="tok-key">export const</span> useTaskStore = <span class="tok-fn">create</span>((set) =&gt; ({
  tareas: [],
  agregar: (t) =&gt; <span class="tok-fn">set</span>((s) =&gt; ({ tareas: [...s.tareas, t] })),
  eliminar: (id) =&gt;
    <span class="tok-fn">set</span>((s) =&gt; ({ tareas: s.tareas.<span class="tok-fn">filter</span>((t) =&gt; t.id !== id) })),
}));`

const codeSelectors = `<span class="tok-com">// Toma solo la lista</span>
<span class="tok-key">const</span> tareas = <span class="tok-fn">useTaskStore</span>((s) =&gt; s.tareas);

<span class="tok-com">// Toma solo una acción</span>
<span class="tok-key">const</span> agregar = <span class="tok-fn">useTaskStore</span>((s) =&gt; s.agregar);`

const codeStoreCrud = `<span class="tok-key">import</span> { taskService } <span class="tok-key">from</span> <span class="tok-str">"../services/taskService"</span>;

<span class="tok-key">export const</span> useTaskStore = <span class="tok-fn">create</span>((set) =&gt; ({
  tareas: [],
  cargar: <span class="tok-key">async</span> () =&gt; <span class="tok-fn">set</span>({ tareas: <span class="tok-key">await</span> taskService.<span class="tok-fn">listar</span>() }),
  crear: <span class="tok-key">async</span> (data) =&gt;
    <span class="tok-fn">set</span>((s) =&gt; ({ tareas: [...s.tareas, <span class="tok-key">await</span> taskService.<span class="tok-fn">crear</span>(data)] })),
}));`

const codeInstallRHF = `<span class="tok-com"># Instalar React Hook Form</span>
npm install react-hook-form`

const codeUseForm = `<span class="tok-key">import</span> { useForm } <span class="tok-key">from</span> <span class="tok-str">"react-hook-form"</span>;

<span class="tok-key">function</span> <span class="tok-fn">TaskForm</span>({ onSave }) {
  <span class="tok-key">const</span> { register, handleSubmit } = <span class="tok-fn">useForm</span>();

  <span class="tok-key">return</span> (
    &lt;<span class="tok-tag">form</span> <span class="tok-attr">onSubmit</span>={<span class="tok-fn">handleSubmit</span>(onSave)}&gt;
      &lt;<span class="tok-tag">input</span> {...<span class="tok-fn">register</span>(<span class="tok-str">"titulo"</span>)} <span class="tok-attr">placeholder</span>=<span class="tok-str">"Título"</span> /&gt;
      &lt;<span class="tok-tag">button</span>&gt;Guardar&lt;/<span class="tok-tag">button</span>&gt;
    &lt;/<span class="tok-tag">form</span>&gt;
  );
}`

const codeValidations = `&lt;<span class="tok-tag">input</span>
  {...<span class="tok-fn">register</span>(<span class="tok-str">"titulo"</span>, {
    required: <span class="tok-str">"El título es obligatorio"</span>,
    minLength: { value: <span class="tok-num">3</span>, message: <span class="tok-str">"Mínimo 3 caracteres"</span> },
  })}
/&gt;
{errors.titulo && &lt;<span class="tok-tag">span</span>&gt;{errors.titulo.message}&lt;/<span class="tok-tag">span</span>&gt;}`

const codeRegex = `&lt;<span class="tok-tag">input</span>
  {...<span class="tok-fn">register</span>(<span class="tok-str">"email"</span>, {
    pattern: {
      value: <span class="tok-str">/^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$/</span>,
      message: <span class="tok-str">"Email no válido"</span>,
    },
  })}
/&gt;`

const codeController = `<span class="tok-key">import</span> { Controller } <span class="tok-key">from</span> <span class="tok-str">"react-hook-form"</span>;

&lt;<span class="tok-tag">Controller</span>
  <span class="tok-attr">name</span>=<span class="tok-str">"prioridad"</span>
  <span class="tok-attr">control</span>={control}
  <span class="tok-attr">render</span>={({ field }) =&gt; &lt;<span class="tok-tag">MiSelect</span> {...field} /&gt;}
/&gt;`

const codeFormFull = `<span class="tok-key">const</span> crear = <span class="tok-fn">useTaskStore</span>((s) =&gt; s.crear);
<span class="tok-key">const</span> { register, handleSubmit, reset, formState: { errors } } = <span class="tok-fn">useForm</span>();

<span class="tok-key">const</span> onSubmit = <span class="tok-key">async</span> (data) =&gt; {
  <span class="tok-key">await</span> <span class="tok-fn">crear</span>(data);  <span class="tok-com">// store + API</span>
  <span class="tok-fn">reset</span>();            <span class="tok-com">// limpia el formulario</span>
};`

const codeInstallToast = `<span class="tok-com"># Instalar React Toastify</span>
npm install react-toastify`

const codeToastContainer = `<span class="tok-com">// En App.jsx, una sola vez</span>
<span class="tok-key">import</span> { ToastContainer } <span class="tok-key">from</span> <span class="tok-str">"react-toastify"</span>;
<span class="tok-key">import</span> <span class="tok-str">"react-toastify/dist/ReactToastify.css"</span>;

&lt;<span class="tok-tag">ToastContainer</span> <span class="tok-attr">position</span>=<span class="tok-str">"bottom-right"</span> <span class="tok-attr">autoClose</span>={<span class="tok-num">3000</span>} /&gt;`

const codeToasts = `<span class="tok-key">import</span> { toast } <span class="tok-key">from</span> <span class="tok-str">"react-toastify"</span>;

toast.<span class="tok-fn">success</span>(<span class="tok-str">"Tarea creada"</span>);
toast.<span class="tok-fn">error</span>(<span class="tok-str">"No se pudo guardar"</span>);
toast.<span class="tok-fn">warning</span>(<span class="tok-str">"Revisa los campos"</span>);`

const codeToastCrud = `<span class="tok-key">const</span> onSubmit = <span class="tok-key">async</span> (data) =&gt; {
  <span class="tok-key">try</span> {
    <span class="tok-key">await</span> <span class="tok-fn">crear</span>(data);
    toast.<span class="tok-fn">success</span>(<span class="tok-str">"Tarea creada"</span>);
    <span class="tok-fn">reset</span>();
  } <span class="tok-key">catch</span> {
    toast.<span class="tok-fn">error</span>(<span class="tok-str">"Ocurrió un error"</span>);
  }
};`

// Estructura de carpetas tras la Sesión 4
const treeFinal = `<span class="dir">src/</span>
&nbsp;├─ <span class="dir">store/</span>
&nbsp;│&nbsp;&nbsp;└─ useTaskStore.js &nbsp;<span class="cmt"># estado + acciones (Zustand)</span>
&nbsp;├─ <span class="dir">components/</span>
&nbsp;│&nbsp;&nbsp;└─ <span class="dir">tasks/</span>
&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─ TaskForm.jsx <span class="cmt"># React Hook Form + validación</span>
&nbsp;├─ <span class="dir">pages/</span>
&nbsp;│&nbsp;&nbsp;└─ Tareas.jsx &nbsp;<span class="cmt"># lee del store con selectores</span>
&nbsp;└─ App.jsx &nbsp;&nbsp;&nbsp;&nbsp;<span class="cmt"># &lt;ToastContainer /&gt;</span>`

export const slides = [
  // 1 · Portada
  <TitleSlide
    key="s1"
    center
    logo
    eyebrow="Módulo I · Sesión 4"
    title={
      <>
        Estado Global
        <br />y <span className="accent">Formularios</span>
      </>
    }
    subtitle="Desarrollo Front-End Profesional con React, Firebase y CI/CD"
    meta={
      <>
        Expositor: <b>Omar Rodrigo Mamani Capcha</b> · Duración: 1h 30min
      </>
    }
  />,

  // 2 · Repaso de la Sesión 3
  <CardsGrid
    key="s2"
    cols={3}
    eyebrow="Antes de empezar"
    title="¿Qué vimos en la Sesión 3?"
    cards={[
      { title: 'API REST + Axios', body: 'JSON, métodos HTTP y el CRUD de tareas contra el servidor.' },
      { title: 'Problema actual', body: 'El estado de tareas vive dentro de un componente; compartirlo es incómodo.' },
      { title: 'Hoy', body: 'Lo sacamos a un store global y mejoramos los formularios y los avisos. 🗂️' },
    ]}
  />,

  // 3 · Agenda
  <CardsGrid
    key="s3"
    cols={3}
    eyebrow="Hoja de ruta"
    title="Agenda de la sesión"
    cards={[
      { title: '1 · Zustand', body: 'Estado global sin prop drilling: store, acciones y selectores.' },
      { title: '2 · React Hook Form', body: 'Formularios con validación y expresiones regulares.' },
      { title: '3 · React Toastify', body: 'Notificaciones de éxito, error y advertencia.' },
    ]}
  />,

  // 4 · Objetivos
  <BulletSlide
    key="s4"
    eyebrow="¿Qué lograrás hoy?"
    title="Objetivos de aprendizaje"
    variant="checks"
    items={[
      <>Entender el <b>prop drilling</b> y por qué usar <b>estado global</b>.</>,
      <>Crear un <b>store con Zustand</b>: estado, acciones y selectores.</>,
      <>Mover el <b>CRUD de tareas</b> al store y compartirlo.</>,
      <>Construir formularios con <b>React Hook Form</b>.</>,
      <>Aplicar <b>validaciones</b> y <b>expresiones regulares</b>.</>,
      <>Dar feedback con <b>React Toastify</b> (éxito, error, advertencia).</>,
    ]}
  />,

  // ─────────────────────────── BLOQUE 1 ───────────────────────────
  // 5 · Divider 1
  <SectionDivider key="s5" center num="01" eyebrow="Bloque 1" title="Estado global con Zustand" subtitle="Un solo lugar para los datos de la app." />,

  // 6 · El problema: prop drilling
  <Slide key="s6">
    <span className="eyebrow">El problema</span>
    <h2>Prop drilling</h2>
    <p className="lead" style={{ marginTop: '0.3rem' }}>
      Pasar props por muchos componentes <b>solo de paso</b>, aunque los del medio no las usen.
    </p>
    <Flow style={{ marginTop: '1.2rem' }} arrowLabel="props" steps={['App', 'Dashboard', 'TaskList', { label: 'TaskCard', ok: true }]} />
    <div className="grid g2" style={{ marginTop: '1.2rem' }}>
      <Card title="La molestia" titleClass="orange">
        <p className="muted">Props que atraviesan 3 o 4 niveles solo para llegar al final. Frágil y tedioso.</p>
      </Card>
      <Card title="Analogía">
        <p className="muted">Un recado que pasa de mano en mano por toda la fila, aunque solo lo necesite el último.</p>
      </Card>
    </div>
  </Slide>,

  // 7 · La solución: estado global
  <TwoColumn
    key="s7"
    eyebrow="La solución"
    title="Estado global"
    left={
      <>
        <p className="lead">
          Un <span className="accent">tablón de anuncios</span> 📌 central: cualquier componente
          <b> lee o escribe directo</b>, sin cadenas de props.
        </p>
        <ul style={{ marginTop: '1rem' }}>
          <li>El dato vive en <b>un solo lugar</b>.</li>
          <li>Los componentes se <b>suscriben</b> a lo que necesitan.</li>
          <li>Menos props, menos errores.</li>
        </ul>
      </>
    }
    right={
      <Card title="Opciones del ecosistema">
        <ul>
          <li><b>Context API</b> (nativo, para casos simples).</li>
          <li><b>Redux</b> (potente, más boilerplate).</li>
          <li><b>Zustand</b> (mínimo y directo). ✅</li>
        </ul>
        <p className="muted" style={{ marginTop: '0.5rem' }}>En el curso usamos Zustand por su simpleza.</p>
      </Card>
    }
  />,

  // 8 · ¿Qué es Zustand?
  <TwoColumn
    key="s8"
    eyebrow="Nuestro gestor de estado"
    title="¿Qué es Zustand?"
    lead={<>Librería de estado global <b>mínima</b>: sin boilerplate ni envolver la app en providers.</>}
    left={<CodeBlock html={codeInstallZustand} />}
    right={
      <Card title="Por qué nos gusta">
        <ul>
          <li>Es un <b>hook</b> que cualquier componente importa.</li>
          <li>Sin <code>Provider</code> alrededor de la app.</li>
          <li>API pequeña: se aprende en minutos.</li>
        </ul>
      </Card>
    }
  />,

  // 9 · Crear el store
  <TwoColumn
    key="s9"
    eyebrow="El corazón del estado"
    title="Crear el store con create()"
    lead={<><code>create</code> recibe una función que devuelve el <b>estado</b> y las <b>acciones</b>.</>}
    left={<CodeBlock html={codeCreate} />}
    right={
      <Card title="Claves">
        <ul>
          <li>Vive en <code>src/store/</code>.</li>
          <li>El nombre por convención: <code>useXxxStore</code>.</li>
          <li><code>set</code> es lo que <b>actualiza</b> el estado.</li>
        </ul>
      </Card>
    }
  />,

  // 10 · Estados y acciones
  <TwoColumn
    key="s10"
    eyebrow="Datos + funciones"
    title="Estados y acciones"
    lead={<><b>Estado</b> = los datos. <b>Acciones</b> = funciones que los cambian con <code>set</code>.</>}
    left={<CodeBlock html={codeActions} />}
    right={
      <Card title="Patrón">
        <ul>
          <li><code>set((s) =&gt; ...)</code> accede al estado <b>previo</b>.</li>
          <li>Siempre devolver <b>copias</b>: <code>[...s.tareas, t]</code>.</li>
          <li>Las acciones encapsulan la lógica de cambio.</li>
        </ul>
      </Card>
    }
  />,

  // 11 · Selectores
  <TwoColumn
    key="s11"
    eyebrow="Leer con precisión"
    title="Selectores"
    lead={<>Cada componente toma <b>solo</b> la parte del store que usa.</>}
    left={<CodeBlock html={codeSelectors} />}
    right={
      <Card title="¿Por qué?">
        <ul>
          <li><b>Rendimiento:</b> re-renderiza solo si cambia ese dato.</li>
          <li><b>Claridad:</b> ves qué usa cada componente.</li>
          <li>Analogía: sacas del refri solo el ingrediente que necesitas.</li>
        </ul>
      </Card>
    }
  />,

  // 12 · Mover el CRUD al store
  <TwoColumn
    key="s12"
    eyebrow="Conectar con la API"
    title="Mover el CRUD al store"
    lead={<>El <code>taskService</code> (Axios) de la Sesión 3 se llama <b>desde el store</b>.</>}
    left={<CodeBlock html={codeStoreCrud} />}
    right={
      <Card title="Resultado">
        <ul>
          <li>Las acciones son <code>async</code> y usan <code>await</code>.</li>
          <li>El estado siempre refleja lo que hay en la API.</li>
          <li><b>Cualquier</b> componente comparte la misma lista.</li>
        </ul>
      </Card>
    }
  />,

  // ─────────────────────────── BLOQUE 2 ───────────────────────────
  // 13 · Divider 2
  <SectionDivider key="s13" center num="02" eyebrow="Bloque 2" title="Formularios con React Hook Form" subtitle="Menos código, validación incluida." />,

  // 14 · ¿Por qué React Hook Form?
  <TwoColumn
    key="s14"
    eyebrow="Formularios profesionales"
    title="¿Por qué React Hook Form?"
    lead={<>Un <code>useState</code> por campo es repetitivo y propenso a errores.</>}
    left={<CodeBlock html={codeInstallRHF} />}
    right={
      <Card title="Ventajas de RHF">
        <ul>
          <li><b>Menos código</b>: no manejas cada input a mano.</li>
          <li><b>Mejor rendimiento</b>: menos re-renders.</li>
          <li><b>Validación integrada</b> y mensajes de error.</li>
        </ul>
      </Card>
    }
  />,

  // 15 · useForm
  <TwoColumn
    key="s15"
    eyebrow="Lo esencial"
    title="useForm: register y handleSubmit"
    lead={<><code>register</code> conecta el input; <code>handleSubmit</code> recoge los valores.</>}
    left={<CodeBlock html={codeUseForm} />}
    right={
      <Card title="Cómo funciona">
        <ul>
          <li><code>register("campo")</code> registra cada input.</li>
          <li><code>handleSubmit(fn)</code> valida y llama a <code>fn</code> con los datos.</li>
          <li>Sin <code>useState</code> por campo.</li>
        </ul>
      </Card>
    }
  />,

  // 16 · Validaciones
  <TwoColumn
    key="s16"
    eyebrow="Reglas del formulario"
    title="Validaciones"
    lead={<>Las reglas van en el <b>segundo argumento</b> de <code>register</code>.</>}
    left={<CodeBlock html={codeValidations} />}
    right={
      <Card title="Claves">
        <ul>
          <li><code>required</code>, <code>minLength</code>, <code>maxLength</code>...</li>
          <li><code>formState: {'{ errors }'}</code> trae los mensajes.</li>
          <li>Mostramos el error <b>junto al campo</b>.</li>
        </ul>
      </Card>
    }
  />,

  // 17 · Expresiones regulares
  <TwoColumn
    key="s17"
    eyebrow="Validar formato"
    title="Expresiones regulares"
    lead={<>Un <b>patrón</b> 🔍 que el texto debe cumplir (email, teléfono...).</>}
    left={<CodeBlock html={codeRegex} />}
    right={
      <Card title="¿Para qué?">
        <ul>
          <li>Validan <b>formato</b> sin escribir lógica a mano.</li>
          <li>La regla <code>pattern</code> recibe el regex y un mensaje.</li>
          <li>Ej.: email, código postal, solo números.</li>
        </ul>
      </Card>
    }
  />,

  // 18 · Controller
  <TwoColumn
    key="s18"
    eyebrow="Inputs especiales"
    title="Controller"
    lead={<>Para inputs que no son <code>&lt;input&gt;</code> nativos (selects de librerías, date pickers...).</>}
    left={<CodeBlock html={codeController} />}
    right={
      <Card title="La idea">
        <ul>
          <li>Hace de <b>puente</b> entre RHF y el componente externo.</li>
          <li><code>render</code> recibe <code>field</code> y lo pasa al componente.</li>
          <li>El resto del formulario funciona igual.</li>
        </ul>
      </Card>
    }
  />,

  // 19 · Formulario completo
  <TwoColumn
    key="s19"
    eyebrow="Todo junto"
    title="Formulario de tarea completo"
    lead={<>Validación + envío que llama a la acción <code>crear</code> del store.</>}
    left={<CodeBlock html={codeFormFull} />}
    right={
      <Card title="El flujo">
        <ul>
          <li>El usuario llena y envía el formulario.</li>
          <li>RHF valida; si pasa, llama a <code>onSubmit</code>.</li>
          <li><code>crear</code> actualiza store + API; <code>reset</code> limpia.</li>
        </ul>
      </Card>
    }
  />,

  // ─────────────────────────── BLOQUE 3 ───────────────────────────
  // 20 · Divider 3
  <SectionDivider key="s20" center num="03" eyebrow="Bloque 3" title="Notificaciones con React Toastify" subtitle="Avisar al usuario sin bloquear la pantalla." />,

  // 21 · ¿Qué es React Toastify?
  <TwoColumn
    key="s21"
    eyebrow="Feedback al usuario"
    title="¿Qué es React Toastify?"
    lead={<>Avisos flotantes ("toasts") para confirmar acciones o reportar errores.</>}
    left={
      <>
        <CodeBlock html={codeInstallToast} />
        <div style={{ marginTop: '0.6rem' }}>
          <CodeBlock html={codeToastContainer} />
        </div>
      </>
    }
    right={
      <Card title="Configuración">
        <ul>
          <li><code>ToastContainer</code> se monta <b>una sola vez</b> en <code>App.jsx</code>.</li>
          <li>Hay que importar su <b>CSS</b>.</li>
          <li>Opciones: posición, duración (<code>autoClose</code>)...</li>
        </ul>
      </Card>
    }
  />,

  // 22 · success / error / warning
  <TwoColumn
    key="s22"
    eyebrow="Tipos de aviso"
    title="success / error / warning"
    lead={<>Un método por tipo de mensaje. Reemplazan los errores simples de la Sesión 3.</>}
    left={<CodeBlock html={codeToasts} />}
    right={
      <Card title="Cuándo usar cada uno">
        <ul>
          <li><b>success</b> <Arr /> la acción salió bien.</li>
          <li><b>error</b> <Arr /> algo falló (un <code>catch</code>).</li>
          <li><b>warning</b> <Arr /> aviso o validación pendiente.</li>
        </ul>
      </Card>
    }
  />,

  // 23 · Integrar con el CRUD
  <TwoColumn
    key="s23"
    eyebrow="En acción"
    title="Integrar avisos con el CRUD"
    lead={<>Un <code>toast</code> en el éxito y otro en el <code>catch</code>.</>}
    left={<CodeBlock html={codeToastCrud} />}
    right={
      <Card title="Resultado">
        <ul>
          <li>El usuario <b>siempre</b> sabe qué pasó.</li>
          <li>Sin <code>alert()</code> que bloquee la pantalla.</li>
          <li>Experiencia más profesional.</li>
        </ul>
      </Card>
    }
  />,

  // 24 · Flujo completo
  <Slide key="s24" center>
    <span className="eyebrow">De punta a punta</span>
    <h2>El flujo completo de la sesión</h2>
    <Flow
      style={{ marginTop: '1.4rem' }}
      steps={['Formulario (RHF)', 'Validación', 'Store (Zustand)', 'API (Axios)', { label: 'toast + UI', ok: true }]}
    />
    <p className="muted" style={{ marginTop: '1.6rem' }}>
      Cada herramienta hace su parte y se conecta con la siguiente. 🧩
    </p>
  </Slide>,

  // ─────────────────────────── BLOQUE 4 ───────────────────────────
  // 25 · Divider 4
  <SectionDivider key="s25" center num="04" eyebrow="Bloque 4" title="Laboratorio" subtitle="Estado global + formularios. ⌨️" />,

  // 26 · Laboratorio paso a paso
  <CardsGrid key="s26" eyebrow="Práctica guiada" title="Laboratorio paso a paso">
    <Card title="① Store de tareas">
      <ul>
        <li><code>npm install zustand</code>.</li>
        <li>Crear <code>src/store/useTaskStore.js</code> con estado y acciones.</li>
        <li>Las acciones llaman al <code>taskService</code>.</li>
      </ul>
    </Card>
    <Card title="② Conectar la lista">
      <ul>
        <li>En <code>pages/Tareas.jsx</code>, leer <code>tareas</code> y <code>cargar</code> con selectores.</li>
        <li>Quitar el <code>useState</code>/<code>useEffect</code> local.</li>
      </ul>
    </Card>
    <Card title="③ Formulario validado">
      <ul>
        <li><code>npm install react-hook-form</code>.</li>
        <li><code>TaskForm.jsx</code> con <code>register</code>, validaciones y errores.</li>
        <li>Al enviar, llamar a <code>crear</code> y <code>reset()</code>.</li>
      </ul>
    </Card>
    <Card title="④ Notificaciones">
      <ul>
        <li><code>npm install react-toastify</code>; <code>ToastContainer</code> en <code>App.jsx</code>.</li>
        <li><code>toast.success</code> al crear/editar/eliminar; <code>toast.error</code> en los <code>catch</code>.</li>
      </ul>
    </Card>
  </CardsGrid>,

  // 27 · Estructura tras la sesión
  <TwoColumn
    key="s27"
    eyebrow="¿Dónde cae cada archivo?"
    title="Estructura tras la Sesión 4"
    left={<div className="card"><div className="tree" dangerouslySetInnerHTML={{ __html: treeFinal }} /></div>}
    right={
      <>
        <p className="lead">Estrena la carpeta <code>store/</code> y completa el formulario.</p>
        <ul style={{ marginTop: '0.8rem' }}>
          <li><b>store/</b> <Arr /> el estado global de tareas.</li>
          <li><b>components/tasks/</b> <Arr /> el formulario validado.</li>
          <li><b>pages/</b> <Arr /> la vista, ya sin estado local.</li>
          <li><b>App.jsx</b> <Arr /> el contenedor de toasts.</li>
        </ul>
      </>
    }
  />,

  // 28 · Errores frecuentes
  <CardsGrid
    key="s28"
    cols={3}
    eyebrow="Para no tropezar"
    title="Errores frecuentes"
    cards={[
      { title: 'Selector sin filtrar', titleClass: 'orange', body: 'Suscribirse a todo el store re-renderiza de más. Selecciona solo lo usado.' },
      { title: 'Mutar el estado', titleClass: 'orange', body: 'Devuelve copias en set: [...s.tareas, x].' },
      { title: 'No mostrar errors', titleClass: 'orange', body: 'Lee formState: { errors } y pinta el mensaje.' },
      { title: 'Llamar la función en submit', body: 'handleSubmit(onSubmit), no handleSubmit(onSubmit()).' },
      { title: 'Falta ToastContainer', body: 'Sin él, los toast() no aparecen. Móntalo en App.jsx.' },
      { title: 'Olvidar el CSS', body: 'Importa react-toastify/dist/ReactToastify.css.' },
    ]}
  />,

  // 29 · Checklist
  <Slide key="s29">
    <span className="eyebrow">Antes de cerrar</span>
    <h2>Checklist de la sesión</h2>
    <ul className="checks big" style={{ marginTop: '1rem' }}>
      <li>Entiendo el prop drilling y por qué usar estado global.</li>
      <li>Creé un store con Zustand (estado, acciones, selectores).</li>
      <li>Moví el CRUD de tareas al store.</li>
      <li>Hago formularios con React Hook Form y los valido.</li>
      <li>Muestro notificaciones con React Toastify.</li>
    </ul>
  </Slide>,

  // 30 · Resumen
  <Slide key="s30">
    <span className="eyebrow">Lo que aprendiste hoy</span>
    <h2>Resumen de la sesión</h2>
    <div className="grid g2" style={{ marginTop: '0.8rem' }}>
      <Card title="Estado global">
        <p className="muted">
          Un <b>store</b> central con Zustand; los componentes <b>leen y escriben</b> con
          <b> selectores</b>, sin cadenas de props.
        </p>
      </Card>
      <Card title="Formularios + avisos">
        <p className="muted">
          <b>React Hook Form</b> valida solo; <b>React Toastify</b> avisa al usuario de cada acción.
        </p>
      </Card>
    </div>
    <p className="lead" style={{ marginTop: '1.2rem' }}>
      📌 Idea central: <span className="accent">un store para el estado, un formulario que se valida solo, un toast que avisa</span>.
    </p>
  </Slide>,

  // 31 · Cierre Módulo I + anticipo Módulo II
  <Slide key="s31" center>
    <ReactLogo spin="6s" />
    <span className="eyebrow">Cierre del Módulo I · Próxima sesión</span>
    <h2 style={{ fontSize: '2.3rem' }}>Sesión 5 - Firebase Authentication</h2>
    <div className="grid g2" style={{ marginTop: '1.2rem', maxWidth: '60vw' }}>
      <Card title="Módulo I completo"><p className="muted">App con CRUD, navegación, estado global y formularios. ✅</p></Card>
      <Card title="Módulo II"><p className="muted">Firebase: login real, sesión persistente y protección de rutas.</p></Card>
    </div>
    <p className="muted" style={{ marginTop: '1.2rem' }}>
      <b>Tarea:</b> deja el CRUD con store, formulario validado y toasts funcionando.
    </p>
    <p className="muted" style={{ marginTop: '0.8rem' }}>¿Preguntas? 🙌 ¡Nos vemos en la Sesión 5!</p>
  </Slide>,
]

export default slides
