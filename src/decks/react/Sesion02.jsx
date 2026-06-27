// ─────────────────────────────────────────────────────────────────────────
// Curso React · Sesión 2 - Componentes Profesionales y Navegación
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
  session: 2,
  title: 'Componentes Profesionales y Navegación',
}

// ── Bloques de código (HTML con tokens .tok-*) ────────────────────────────

const codeReutilizable = `<span class="tok-com">// ❌ Repetido: tres tarjetas casi iguales</span>
&lt;<span class="tok-tag">div</span> <span class="tok-attr">className</span>=<span class="tok-str">"card"</span>&gt;&lt;<span class="tok-tag">h3</span>&gt;Estudiar React&lt;/<span class="tok-tag">h3</span>&gt;&lt;<span class="tok-tag">span</span>&gt;pendiente&lt;/<span class="tok-tag">span</span>&gt;&lt;/<span class="tok-tag">div</span>&gt;
&lt;<span class="tok-tag">div</span> <span class="tok-attr">className</span>=<span class="tok-str">"card"</span>&gt;&lt;<span class="tok-tag">h3</span>&gt;Hacer deploy&lt;/<span class="tok-tag">h3</span>&gt;&lt;<span class="tok-tag">span</span>&gt;hecho&lt;/<span class="tok-tag">span</span>&gt;&lt;/<span class="tok-tag">div</span>&gt;

<span class="tok-com">// ✅ Un solo componente parametrizable</span>
&lt;<span class="tok-tag">TaskCard</span> <span class="tok-attr">titulo</span>=<span class="tok-str">"Estudiar React"</span> <span class="tok-attr">estado</span>=<span class="tok-str">"pendiente"</span> /&gt;
&lt;<span class="tok-tag">TaskCard</span> <span class="tok-attr">titulo</span>=<span class="tok-str">"Hacer deploy"</span>  <span class="tok-attr">estado</span>=<span class="tok-str">"hecho"</span> /&gt;`

const codeProps = `<span class="tok-com">// Padre → pasa datos por props</span>
&lt;<span class="tok-tag">TaskCard</span> <span class="tok-attr">titulo</span>=<span class="tok-str">"Estudiar React"</span> <span class="tok-attr">estado</span>=<span class="tok-str">"pendiente"</span> /&gt;

<span class="tok-com">// Hijo → las recibe por desestructuración</span>
<span class="tok-key">function</span> <span class="tok-fn">TaskCard</span>({ titulo, estado }) {
  <span class="tok-key">return</span> (
    &lt;<span class="tok-tag">div</span> <span class="tok-attr">className</span>=<span class="tok-str">"card"</span>&gt;
      &lt;<span class="tok-tag">h3</span>&gt;{titulo}&lt;/<span class="tok-tag">h3</span>&gt;
      &lt;<span class="tok-tag">span</span>&gt;{estado}&lt;/<span class="tok-tag">span</span>&gt;
    &lt;/<span class="tok-tag">div</span>&gt;
  );
}`

const codePropsDefault = `<span class="tok-com">// Valor por defecto si el padre no lo envía</span>
<span class="tok-key">function</span> <span class="tok-fn">Boton</span>({ texto = <span class="tok-str">"Guardar"</span>, tipo = <span class="tok-str">"primario"</span> }) {
  <span class="tok-key">return</span> &lt;<span class="tok-tag">button</span> <span class="tok-attr">className</span>={<span class="tok-str">"btn btn-"</span> + tipo}&gt;{texto}&lt;/<span class="tok-tag">button</span>&gt;;
}

<span class="tok-com">// Una prop puede ser texto, número, booleano, array… o FUNCIÓN</span>
&lt;<span class="tok-tag">Boton</span> <span class="tok-attr">texto</span>=<span class="tok-str">"Eliminar"</span> <span class="tok-attr">tipo</span>=<span class="tok-str">"peligro"</span> /&gt;
&lt;<span class="tok-tag">Boton</span> /&gt;  <span class="tok-com">// usa los valores por defecto</span>`

const codeChildren = `<span class="tok-key">function</span> <span class="tok-fn">Card</span>({ titulo, children }) {
  <span class="tok-key">return</span> (
    &lt;<span class="tok-tag">div</span> <span class="tok-attr">className</span>=<span class="tok-str">"card"</span>&gt;
      &lt;<span class="tok-tag">h3</span>&gt;{titulo}&lt;/<span class="tok-tag">h3</span>&gt;
      &lt;<span class="tok-tag">div</span>&gt;{children}&lt;/<span class="tok-tag">div</span>&gt;  <span class="tok-com">// ← lo de adentro</span>
    &lt;/<span class="tok-tag">div</span>&gt;
  );
}

<span class="tok-com">// Todo lo que va ENTRE las etiquetas llega como children</span>
&lt;<span class="tok-tag">Card</span> <span class="tok-attr">titulo</span>=<span class="tok-str">"Tarea"</span>&gt;
  &lt;<span class="tok-tag">p</span>&gt;Estudiar React Router&lt;/<span class="tok-tag">p</span>&gt;
  &lt;<span class="tok-tag">button</span>&gt;Completar&lt;/<span class="tok-tag">button</span>&gt;
&lt;/<span class="tok-tag">Card</span>&gt;`

const codeEventos = `<span class="tok-key">function</span> <span class="tok-fn">Boton</span>() {
  <span class="tok-key">const</span> manejarClic = () =&gt; <span class="tok-fn">alert</span>(<span class="tok-str">"¡Clic!"</span>);

  <span class="tok-com">// ✅ pasamos la función, NO la llamamos</span>
  <span class="tok-key">return</span> &lt;<span class="tok-tag">button</span> <span class="tok-attr">onClick</span>={manejarClic}&gt;Púlsame&lt;/<span class="tok-tag">button</span>&gt;;
}

<span class="tok-com">// Con argumento → se envuelve en una flecha</span>
&lt;<span class="tok-tag">button</span> <span class="tok-attr">onClick</span>={() =&gt; <span class="tok-fn">eliminar</span>(tarea.id)}&gt;Eliminar&lt;/<span class="tok-tag">button</span>&gt;`

const codeFlujo = `<span class="tok-com">// El padre da una función al hijo; el hijo la dispara</span>
<span class="tok-key">function</span> <span class="tok-fn">Padre</span>() {
  <span class="tok-key">const</span> borrar = (id) =&gt; <span class="tok-fn">console</span>.log(<span class="tok-str">"borrar"</span>, id);
  <span class="tok-key">return</span> &lt;<span class="tok-tag">TaskCard</span> <span class="tok-attr">id</span>={<span class="tok-num">3</span>} <span class="tok-attr">onDelete</span>={borrar} /&gt;;
}

<span class="tok-key">function</span> <span class="tok-fn">TaskCard</span>({ id, onDelete }) {
  <span class="tok-key">return</span> &lt;<span class="tok-tag">button</span> <span class="tok-attr">onClick</span>={() =&gt; <span class="tok-fn">onDelete</span>(id)}&gt;🗑&lt;/<span class="tok-tag">button</span>&gt;;
}`

const codeCondicional = `<span class="tok-com">// 1) Operador && → muestra algo o nada</span>
{tareas.length === <span class="tok-num">0</span> && &lt;<span class="tok-tag">p</span>&gt;No hay tareas todavía.&lt;/<span class="tok-tag">p</span>&gt;}

<span class="tok-com">// 2) Ternario → A o B</span>
{estaCargando ? &lt;<span class="tok-tag">Spinner</span> /&gt; : &lt;<span class="tok-tag">ListaTareas</span> /&gt;}

<span class="tok-com">// 3) Early return → salir antes</span>
<span class="tok-key">function</span> <span class="tok-fn">Perfil</span>({ usuario }) {
  <span class="tok-key">if</span> (!usuario) <span class="tok-key">return</span> &lt;<span class="tok-tag">p</span>&gt;Inicia sesión.&lt;/<span class="tok-tag">p</span>&gt;;
  <span class="tok-key">return</span> &lt;<span class="tok-tag">h2</span>&gt;Hola, {usuario.nombre}&lt;/<span class="tok-tag">h2</span>&gt;;
}`

const codeLista = `<span class="tok-key">const</span> tareas = [
  { id: <span class="tok-num">1</span>, titulo: <span class="tok-str">"Estudiar React"</span>, estado: <span class="tok-str">"pendiente"</span> },
  { id: <span class="tok-num">2</span>, titulo: <span class="tok-str">"Hacer deploy"</span>,   estado: <span class="tok-str">"hecho"</span> },
];

<span class="tok-com">// .map() convierte cada dato en un componente</span>
{tareas.<span class="tok-fn">map</span>((t) =&gt; (
  &lt;<span class="tok-tag">TaskCard</span> <span class="tok-attr">key</span>={t.id} <span class="tok-attr">titulo</span>={t.titulo} <span class="tok-attr">estado</span>={t.estado} /&gt;
))}`

const codeInstall = `<span class="tok-com"># 1. Instalar React Router DOM</span>
npm install react-router-dom`

const codeBrowserRouter = `<span class="tok-com">// main.jsx → envolver la app con el router</span>
<span class="tok-key">import</span> { BrowserRouter } <span class="tok-key">from</span> <span class="tok-str">"react-router-dom"</span>;

<span class="tok-fn">createRoot</span>(document.<span class="tok-fn">getElementById</span>(<span class="tok-str">"root"</span>)).<span class="tok-fn">render</span>(
  &lt;<span class="tok-tag">BrowserRouter</span>&gt;
    &lt;<span class="tok-tag">App</span> /&gt;
  &lt;/<span class="tok-tag">BrowserRouter</span>&gt;
);`

const codeRoutes = `<span class="tok-key">import</span> { Routes, Route } <span class="tok-key">from</span> <span class="tok-str">"react-router-dom"</span>;

<span class="tok-key">function</span> <span class="tok-fn">App</span>() {
  <span class="tok-key">return</span> (
    &lt;<span class="tok-tag">Routes</span>&gt;
      &lt;<span class="tok-tag">Route</span> <span class="tok-attr">path</span>=<span class="tok-str">"/"</span>          <span class="tok-attr">element</span>={&lt;<span class="tok-tag">Login</span> /&gt;} /&gt;
      &lt;<span class="tok-tag">Route</span> <span class="tok-attr">path</span>=<span class="tok-str">"/dashboard"</span> <span class="tok-attr">element</span>={&lt;<span class="tok-tag">Dashboard</span> /&gt;} /&gt;
      &lt;<span class="tok-tag">Route</span> <span class="tok-attr">path</span>=<span class="tok-str">"/tareas"</span>    <span class="tok-attr">element</span>={&lt;<span class="tok-tag">Tareas</span> /&gt;} /&gt;
      &lt;<span class="tok-tag">Route</span> <span class="tok-attr">path</span>=<span class="tok-str">"*"</span>          <span class="tok-attr">element</span>={&lt;<span class="tok-tag">NotFound</span> /&gt;} /&gt;
    &lt;/<span class="tok-tag">Routes</span>&gt;
  );
}`

const codeLink = `<span class="tok-com">// ❌ Recarga toda la página (parpadea, pierde estado)</span>
&lt;<span class="tok-tag">a</span> <span class="tok-attr">href</span>=<span class="tok-str">"/tareas"</span>&gt;Tareas&lt;/<span class="tok-tag">a</span>&gt;

<span class="tok-com">// ✅ Cambia de vista al instante, sin recargar</span>
<span class="tok-key">import</span> { Link } <span class="tok-key">from</span> <span class="tok-str">"react-router-dom"</span>;
&lt;<span class="tok-tag">Link</span> <span class="tok-attr">to</span>=<span class="tok-str">"/dashboard"</span>&gt;Ir al panel&lt;/<span class="tok-tag">Link</span>&gt;`

const codeNavLink = `<span class="tok-key">import</span> { NavLink } <span class="tok-key">from</span> <span class="tok-str">"react-router-dom"</span>;

<span class="tok-com">// isActive → true cuando estás en esa ruta</span>
&lt;<span class="tok-tag">NavLink</span>
  <span class="tok-attr">to</span>=<span class="tok-str">"/tareas"</span>
  <span class="tok-attr">className</span>={({ isActive }) =&gt;
    isActive ? <span class="tok-str">"menu activo"</span> : <span class="tok-str">"menu"</span>
  }
&gt;
  Tareas
&lt;/<span class="tok-tag">NavLink</span>&gt;`

const codeNavigate = `<span class="tok-key">import</span> { useNavigate } <span class="tok-key">from</span> <span class="tok-str">"react-router-dom"</span>;

<span class="tok-key">function</span> <span class="tok-fn">Login</span>() {
  <span class="tok-key">const</span> navigate = <span class="tok-fn">useNavigate</span>();

  <span class="tok-key">const</span> onLogin = () =&gt; {
    <span class="tok-com">// ...validar credenciales...</span>
    <span class="tok-fn">navigate</span>(<span class="tok-str">"/dashboard"</span>);  <span class="tok-com">// redirige por código</span>
  };

  <span class="tok-key">return</span> &lt;<span class="tok-tag">button</span> <span class="tok-attr">onClick</span>={onLogin}&gt;Entrar&lt;/<span class="tok-tag">button</span>&gt;;
}`

const codeParams = `<span class="tok-com">// Ruta con parámetro dinámico</span>
&lt;<span class="tok-tag">Route</span> <span class="tok-attr">path</span>=<span class="tok-str">"/tareas/:id"</span> <span class="tok-attr">element</span>={&lt;<span class="tok-tag">DetalleTarea</span> /&gt;} /&gt;

<span class="tok-key">import</span> { useParams } <span class="tok-key">from</span> <span class="tok-str">"react-router-dom"</span>;

<span class="tok-key">function</span> <span class="tok-fn">DetalleTarea</span>() {
  <span class="tok-key">const</span> { id } = <span class="tok-fn">useParams</span>();  <span class="tok-com">// /tareas/42 → id = "42"</span>
  <span class="tok-key">return</span> &lt;<span class="tok-tag">h2</span>&gt;Tarea #{id}&lt;/<span class="tok-tag">h2</span>&gt;;
}`

const codeOutlet = `<span class="tok-key">import</span> { Outlet } <span class="tok-key">from</span> <span class="tok-str">"react-router-dom"</span>;

<span class="tok-key">function</span> <span class="tok-fn">DashboardLayout</span>() {
  <span class="tok-key">return</span> (
    &lt;<span class="tok-tag">div</span> <span class="tok-attr">className</span>=<span class="tok-str">"layout"</span>&gt;
      &lt;<span class="tok-tag">Navbar</span> /&gt;
      &lt;<span class="tok-tag">main</span>&gt;&lt;<span class="tok-tag">Outlet</span> /&gt;&lt;/<span class="tok-tag">main</span>&gt;  <span class="tok-com">// ← ruta hija</span>
    &lt;/<span class="tok-tag">div</span>&gt;
  );
}

<span class="tok-com">// Rutas anidadas: comparten el layout</span>
&lt;<span class="tok-tag">Route</span> <span class="tok-attr">element</span>={&lt;<span class="tok-tag">DashboardLayout</span> /&gt;}&gt;
  &lt;<span class="tok-tag">Route</span> <span class="tok-attr">path</span>=<span class="tok-str">"/dashboard"</span> <span class="tok-attr">element</span>={&lt;<span class="tok-tag">Dashboard</span> /&gt;} /&gt;
  &lt;<span class="tok-tag">Route</span> <span class="tok-attr">path</span>=<span class="tok-str">"/tareas"</span>    <span class="tok-attr">element</span>={&lt;<span class="tok-tag">Tareas</span> /&gt;} /&gt;
&lt;/<span class="tok-tag">Route</span>&gt;`

const codeProtegida = `<span class="tok-key">import</span> { Navigate } <span class="tok-key">from</span> <span class="tok-str">"react-router-dom"</span>;

<span class="tok-key">function</span> <span class="tok-fn">RutaPrivada</span>({ children }) {
  <span class="tok-key">const</span> logueado = <span class="tok-fn">Boolean</span>(localStorage.<span class="tok-fn">getItem</span>(<span class="tok-str">"token"</span>));
  <span class="tok-key">return</span> logueado ? children : &lt;<span class="tok-tag">Navigate</span> <span class="tok-attr">to</span>=<span class="tok-str">"/"</span> replace /&gt;;
}

<span class="tok-com">// Uso: envuelve la ruta privada</span>
&lt;<span class="tok-tag">Route</span> <span class="tok-attr">path</span>=<span class="tok-str">"/dashboard"</span>
  <span class="tok-attr">element</span>={&lt;<span class="tok-tag">RutaPrivada</span>&gt;&lt;<span class="tok-tag">Dashboard</span> /&gt;&lt;/<span class="tok-tag">RutaPrivada</span>&gt;} /&gt;`

// Estructura de carpetas tras la Sesión 2
const treeFinal = `<span class="dir">src/</span>
&nbsp;├─ <span class="dir">components/</span>
&nbsp;│&nbsp;&nbsp;├─ <span class="dir">ui/</span> &nbsp;&nbsp;&nbsp;&nbsp;<span class="cmt"># Button.jsx · Card.jsx</span>
&nbsp;│&nbsp;&nbsp;└─ <span class="dir">tasks/</span> &nbsp;<span class="cmt"># TaskCard.jsx</span>
&nbsp;├─ <span class="dir">layouts/</span> &nbsp;<span class="cmt"># DashboardLayout.jsx</span>
&nbsp;├─ <span class="dir">pages/</span> &nbsp;&nbsp;<span class="cmt"># Login · Dashboard · Tareas</span>
&nbsp;├─ <span class="dir">routes/</span> &nbsp;<span class="cmt"># RutaPrivada.jsx</span>
&nbsp;├─ App.jsx &nbsp;<span class="cmt"># define las rutas</span>
&nbsp;└─ main.jsx <span class="cmt"># BrowserRouter</span>`

export const slides = [
  // 1 · Portada
  <TitleSlide
    key="s1"
    center
    logo
    eyebrow="Módulo I · Sesión 2"
    title={
      <>
        Componentes Profesionales
        <br />y <span className="accent">Navegación</span>
      </>
    }
    subtitle="Desarrollo Front-End Profesional con React, Firebase y CI/CD"
    meta={
      <>
        Expositor: <b>Omar Rodrigo Mamani Capcha</b> · Duración: 1h 30min
      </>
    }
  />,

  // 2 · Repaso de la Sesión 1
  <CardsGrid
    key="s2"
    cols={3}
    eyebrow="Antes de empezar"
    title="¿Qué vimos en la Sesión 1?"
    cards={[
      { title: 'Conceptos', body: 'React, SPA, Virtual DOM, componentes, JSX, props y hooks.' },
      { title: 'Entorno', body: 'Node.js + Vite, proyecto creado y corriendo en localhost:5173.' },
      { title: 'Hoy damos el salto', body: 'De un componente suelto → componentes que se reutilizan y se conectan en pantallas.' },
    ]}
  />,

  // 3 · Agenda
  <CardsGrid
    key="s3"
    eyebrow="Hoja de ruta"
    title="Agenda de la sesión"
    cards={[
      { title: '1 · Componentes profesionales', body: 'Reutilizables, props, children, eventos, renderizado condicional y de listas.' },
      { title: '2 · Navegación', body: 'React Router DOM: rutas, Link/NavLink, useNavigate, useParams, layouts y rutas protegidas.' },
      { title: '3 · Laboratorio', body: 'Construir componentes reutilizables y la navegación del sistema de tareas.' },
      { title: 'Pregunta gancho', body: '¿Cómo muestra una app real el Login, luego el Dashboard… sin recargar nunca?' },
    ]}
  />,

  // 4 · Objetivos
  <BulletSlide
    key="s4"
    eyebrow="¿Qué lograrás hoy?"
    title="Objetivos de aprendizaje"
    variant="checks"
    items={[
      <>Crear <b>componentes reutilizables</b> y configurarlos con <b>props</b>.</>,
      <>Componer con <b>children</b> y manejar <b>eventos</b> (datos↓ / eventos↑).</>,
      <>Aplicar <b>renderizado condicional</b> y <b>de listas</b> con la prop <code>key</code>.</>,
      <>Configurar <b>React Router DOM</b> y navegar con <code>Link</code> / <code>NavLink</code>.</>,
      <>Usar <code>useNavigate</code> y <code>useParams</code> para navegar y leer la URL.</>,
      <>Construir <b>layouts</b> y <b>proteger rutas</b> privadas.</>,
    ]}
  />,

  // ─────────────────────────── BLOQUE 1 ───────────────────────────
  // 5 · Divider 1
  <SectionDivider key="s5" center num="01" eyebrow="Bloque 1" title="Componentes Profesionales" subtitle="Piezas reutilizables que se combinan." />,

  // 6 · ¿Qué es un componente reutilizable?
  <TwoColumn
    key="s6"
    eyebrow="Concepto"
    title="Componentes reutilizables"
    left={
      <>
        <p className="lead">
          Un <span className="accent">molde</span> 🍪 que defines <b>una vez</b> y usas <b>muchas</b>,
          cambiando solo los datos (como una pieza de <b>Lego</b> 🧱).
        </p>
        <ul style={{ marginTop: '1rem' }}>
          <li><b>DRY:</b> no repitas el mismo código una y otra vez.</li>
          <li><b>Mantenible:</b> lo arreglas en un solo lugar.</li>
          <li><b>Legible:</b> el código refleja lo que ves.</li>
        </ul>
      </>
    }
    right={
      <Card title="Una vez, muchas veces">
        <p className="muted">
          Un mismo <code>TaskCard</code> sirve para <b>todas</b> las tareas del sistema: solo cambian
          el título y el estado.
        </p>
        <div className="tag-row">
          <span className="pill">Button</span>
          <span className="pill">Card</span>
          <span className="pill">TaskCard</span>
          <span className="pill">Navbar</span>
        </div>
      </Card>
    }
  />,

  // 7 · Repetido vs reutilizable
  <Slide key="s7">
    <span className="eyebrow">El problema que resuelven</span>
    <h2>Repetir código vs reutilizar</h2>
    <p className="lead" style={{ marginTop: '0.3rem' }}>
      En vez de copiar y pegar HTML, creamos <b>un componente</b> y le pasamos los datos.
    </p>
    <div style={{ marginTop: '1rem' }}>
      <CodeBlock html={codeReutilizable} />
    </div>
  </Slide>,

  // 8 · Props
  <TwoColumn
    key="s8"
    eyebrow="Configurar un componente"
    title="Props"
    lead={<>Las props son los <b>argumentos</b> del componente, como los <b>atributos</b> de una etiqueta HTML.</>}
    left={<CodeBlock html={codeProps} />}
    right={
      <Card title="Reglas de oro">
        <ul>
          <li><b>props = parámetros</b> del componente.</li>
          <li>Son de <b>solo lectura</b>: el hijo <b>no</b> las modifica.</li>
          <li>Se reciben por <b>desestructuración</b>: <code>{'{ titulo }'}</code>.</li>
          <li>Pueden ser texto, número, booleano, array… o función.</li>
        </ul>
      </Card>
    }
  />,

  // 9 · Props por defecto
  <TwoColumn
    key="s9"
    eyebrow="Props flexibles"
    title="Valores por defecto"
    lead={<>Si el padre no envía una prop, el componente usa un <b>valor por defecto</b>.</>}
    left={<CodeBlock html={codePropsDefault} />}
    right={
      <Card title="¿Por qué importa?">
        <ul>
          <li>El componente funciona <b>aunque falte</b> una prop.</li>
          <li>Menos errores y código más <b>reutilizable</b>.</li>
          <li>Una prop <b>función</b> permite que el hijo <b>avise</b> al padre. 👉</li>
        </ul>
      </Card>
    }
  />,

  // 10 · Children
  <TwoColumn
    key="s10"
    eyebrow="Componer componentes"
    title="children"
    lead={<>Una <b>caja</b> 📦 que envuelve <b>lo que sea</b> que pongas dentro de sus etiquetas.</>}
    left={<CodeBlock html={codeChildren} />}
    right={
      <Card title="¿Cuándo usarlo?">
        <ul>
          <li>Componentes <b>contenedor</b>: <code>Card</code>, <code>Modal</code>, <code>Layout</code>.</li>
          <li>El padre decide <b>qué va dentro</b>; el hijo decide <b>dónde</b>.</li>
          <li><code>children</code> es una <b>prop especial</b> automática.</li>
        </ul>
      </Card>
    }
  />,

  // 11 · Eventos
  <TwoColumn
    key="s11"
    eyebrow="Interacción del usuario"
    title="Eventos"
    lead={<>Se manejan con props como <code>onClick</code>, <code>onChange</code>, <code>onSubmit</code>.</>}
    left={<CodeBlock html={codeEventos} />}
    right={
      <Card title="El error más común">
        <ul>
          <li>✅ <code>onClick={'{manejar}'}</code> → pasas la <b>función</b>.</li>
          <li>❌ <code>onClick={'{manejar()}'}</code> → la <b>ejecutas</b> al renderizar.</li>
          <li>Con argumento: <code>onClick={'{() => fn(id)}'}</code>.</li>
        </ul>
      </Card>
    }
  />,

  // 12 · Flujo datos↓ / eventos↑
  <Slide key="s12">
    <span className="eyebrow">La regla mental clave</span>
    <h2>Datos ⬇ bajan · Eventos ⬆ suben</h2>
    <p className="lead" style={{ marginTop: '0.3rem' }}>
      El padre <b>reparte datos</b> hacia abajo (props); el hijo <b>avisa</b> hacia arriba (callbacks).
    </p>
    <Flow style={{ marginTop: '1rem' }} arrowLabel="datos (props)" steps={['Componente Padre', 'Componente Hijo']} />
    <Flow style={{ marginTop: '0.4rem' }} arrowLabel="evento (callback)" steps={['Componente Hijo', 'Componente Padre']} />
    <div className="two-col" style={{ marginTop: '1rem' }}>
      <div><CodeBlock html={codeFlujo} /></div>
      <Card title="¿Por qué así?">
        <ul>
          <li>Flujo <b>unidireccional</b> = predecible.</li>
          <li>Fácil de <b>depurar</b>: sabes de dónde viene cada dato.</li>
          <li>El hijo no toca al padre; solo le <b>notifica</b>.</li>
        </ul>
      </Card>
    </div>
  </Slide>,

  // 13 · Renderizado condicional
  <TwoColumn
    key="s13"
    eyebrow="Mostrar u ocultar"
    title="Renderizado condicional"
    lead={<>Un <code>if</code> pero <b>visual</b>: decide qué se ve y qué no.</>}
    left={<CodeBlock html={codeCondicional} />}
    right={
      <Card title="Cuál usar">
        <ul>
          <li><b>&&</b> → mostrar algo <b>o nada</b>.</li>
          <li><b>Ternario</b> → mostrar <b>A o B</b>.</li>
          <li><b>Early return</b> → cortar antes (sin usuario, cargando…).</li>
        </ul>
        <p className="muted" style={{ marginTop: '0.5rem' }}>Ej.: “No hay tareas” cuando la lista está vacía.</p>
      </Card>
    }
  />,

  // 14 · Renderizado de listas
  <TwoColumn
    key="s14"
    eyebrow="De datos a interfaz"
    title="Renderizado de listas"
    lead={<>Con <code>.map()</code> convertimos un <b>array de datos</b> en una <b>lista de componentes</b>.</>}
    left={<CodeBlock html={codeLista} />}
    right={
      <Card title="Patrón típico">
        <ul>
          <li>Datos en un <b>array</b> (de una API o del estado).</li>
          <li><code>.map()</code> devuelve <b>un componente por elemento</b>.</li>
          <li>Cada elemento necesita una prop <code>key</code>. 👉</li>
        </ul>
      </Card>
    }
  />,

  // 15 · La prop key
  <Slide key="s15">
    <span className="eyebrow">Imprescindible en listas</span>
    <h2>La prop <code>key</code></h2>
    <p className="lead" style={{ marginTop: '0.3rem' }}>
      Es la <span className="accent">matrícula / DNI</span> 🪪 de cada elemento: React la usa para saber
      <b> qué cambió</b> y actualizar solo eso.
    </p>
    <div className="grid g2" style={{ marginTop: '1.2rem' }}>
      <Card title="Hazlo así" titleClass="green">
        <ul>
          <li>Usa un <b>id único y estable</b>: <code>key={'{t.id}'}</code>.</li>
          <li>Se pone en el <b>elemento más externo</b> del <code>.map()</code>.</li>
        </ul>
      </Card>
      <Card title="Evita esto" titleClass="orange">
        <ul>
          <li>Usar el <b>índice</b> del array como key si la lista cambia de orden.</li>
          <li>Olvidarla → <b>warning</b> en consola y bugs al ordenar/eliminar.</li>
        </ul>
      </Card>
    </div>
  </Slide>,

  // ─────────────────────────── BLOQUE 2 ───────────────────────────
  // 16 · Divider 2
  <SectionDivider key="s16" center num="02" eyebrow="Bloque 2" title="Navegación con React Router DOM" subtitle="Muchas vistas, sin recargar nunca." />,

  // 17 · ¿Por qué un router?
  <TwoColumn
    key="s17"
    eyebrow="El problema"
    title="Una SPA tiene una sola página"
    left={
      <>
        <p className="lead">
          Recuerda: una <b>SPA</b> no recarga. Pero necesitamos mostrar <b>Login</b>, <b>Dashboard</b>,
          <b> Tareas</b>…
        </p>
        <p style={{ marginTop: '0.8rem' }}>
          El <span className="accent">Router</span> es un <b>recepcionista</b> 🛎️ que, según la URL,
          decide <b>qué vista mostrar</b>: todo sin recargar el navegador.
        </p>
      </>
    }
    right={
      <Card title="React Router DOM">
        <p className="muted">
          La librería estándar para navegación en React. Mapea cada <b>URL</b> a un <b>componente</b>.
        </p>
        <div className="tag-row">
          <span className="pill">Routes</span>
          <span className="pill">Route</span>
          <span className="pill">Link</span>
          <span className="pill">useNavigate</span>
        </div>
      </Card>
    }
  />,

  // 18 · Instalación + BrowserRouter
  <TwoColumn
    key="s18"
    eyebrow="Punto de partida"
    title="Instalación y BrowserRouter"
    lead={<>Instalamos la librería y <b>envolvemos</b> toda la app con <code>BrowserRouter</code>.</>}
    left={
      <>
        <CodeBlock html={codeInstall} />
        <div style={{ marginTop: '0.6rem' }}>
          <CodeBlock html={codeBrowserRouter} />
        </div>
      </>
    }
    right={
      <Card title="¿Qué hace?">
        <ul>
          <li><code>BrowserRouter</code> activa la navegación en toda la app.</li>
          <li>Va en <b><code>main.jsx</code></b>, envolviendo a <code>&lt;App /&gt;</code>.</li>
          <li>Sin él: error <i>“may be used only in the context of a Router”</i>.</li>
        </ul>
      </Card>
    }
  />,

  // 19 · Routes y Route
  <TwoColumn
    key="s19"
    eyebrow="Definir las rutas"
    title="Routes y Route"
    lead={<><code>path</code> = la URL · <code>element</code> = el componente que se muestra.</>}
    left={<CodeBlock html={codeRoutes} />}
    right={
      <Card title="Claves">
        <ul>
          <li><code>&lt;Routes&gt;</code> envuelve todas las rutas.</li>
          <li>Cada <code>&lt;Route&gt;</code> mapea una <b>URL</b> a una <b>vista</b>.</li>
          <li><code>path="*"</code> → cualquier otra ruta (página <b>404</b>).</li>
        </ul>
      </Card>
    }
  />,

  // 20 · Link
  <TwoColumn
    key="s20"
    eyebrow="Navegar sin recargar"
    title="Link"
    lead={<>Para movernos entre vistas usamos <code>Link</code>, <b>nunca</b> <code>&lt;a href&gt;</code>.</>}
    left={<CodeBlock html={codeLink} />}
    right={
      <Card title="¿Por qué Link?">
        <ul>
          <li><code>&lt;a&gt;</code> <b>recarga</b> la página y pierde el estado.</li>
          <li><code>&lt;Link&gt;</code> cambia la vista <b>al instante</b>.</li>
          <li>La prop es <code>to</code> (no <code>href</code>).</li>
        </ul>
      </Card>
    }
  />,

  // 21 · NavLink
  <TwoColumn
    key="s21"
    eyebrow="El enlace activo"
    title="NavLink"
    lead={<>Un <code>Link</code> que <b>se ilumina</b> cuando estás en esa ruta. Ideal para menús y sidebars.</>}
    left={<CodeBlock html={codeNavLink} />}
    right={
      <Card title="¿Cómo funciona?">
        <ul>
          <li>Recibe <code>isActive</code> automáticamente.</li>
          <li>Devuelves la <b>clase CSS</b> según esté activo o no.</li>
          <li>Así el usuario <b>sabe dónde está</b>.</li>
        </ul>
      </Card>
    }
  />,

  // 22 · useNavigate
  <TwoColumn
    key="s22"
    eyebrow="Navegar por código"
    title="useNavigate"
    lead={<>Para redirigir <b>después de una acción</b>: login correcto, guardar, cancelar…</>}
    left={<CodeBlock html={codeNavigate} />}
    right={
      <Card title="Link vs useNavigate">
        <ul>
          <li><b>Link/NavLink:</b> el usuario <b>hace clic</b>.</li>
          <li><b>useNavigate:</b> navega tu <b>código</b> solo.</li>
          <li>Ej.: tras un login exitoso → <code>navigate("/dashboard")</code>.</li>
        </ul>
      </Card>
    }
  />,

  // 23 · useParams
  <TwoColumn
    key="s23"
    eyebrow="Leer la URL"
    title="useParams"
    lead={<>Lee los <b>parámetros dinámicos</b> de la ruta, como el <code>:id</code> de una tarea.</>}
    left={<CodeBlock html={codeParams} />}
    right={
      <Card title="Para qué sirve">
        <ul>
          <li>Rutas tipo <code>/tareas/:id</code> (ficha de detalle).</li>
          <li><code>/tareas/42</code> → <code>id = "42"</code>.</li>
          <li>Con ese id, cargamos <b>esa</b> tarea desde la API.</li>
        </ul>
      </Card>
    }
  />,

  // 24 · Layouts + Outlet
  <TwoColumn
    key="s24"
    eyebrow="Estructura compartida"
    title="Layouts con Outlet"
    lead={<>Un <b>marco fijo</b> (Navbar, Sidebar) con un hueco que <b>cambia de contenido</b>.</>}
    left={<CodeBlock html={codeOutlet} />}
    right={
      <Card title="La idea">
        <ul>
          <li><code>&lt;Outlet /&gt;</code> = el “hueco” donde se pinta la ruta hija.</li>
          <li>Navbar y Sidebar <b>no se repiten</b> en cada página.</li>
          <li>Rutas <b>anidadas</b> = comparten el mismo layout.</li>
        </ul>
      </Card>
    }
  />,

  // 25 · Rutas protegidas
  <TwoColumn
    key="s25"
    eyebrow="Acceso controlado"
    title="Rutas protegidas"
    lead={<>Un <b>portero</b> 🚪: si no has iniciado sesión, te manda al Login.</>}
    left={<CodeBlock html={codeProtegida} />}
    right={
      <Card title="Cómo funciona">
        <ul>
          <li>Si está logueado → muestra la página.</li>
          <li>Si no → <code>&lt;Navigate to="/" /&gt;</code> al Login.</li>
          <li>🔌 Hoy simulamos el login; en la <b>Sesión 5</b> será <b>Firebase Auth</b> real.</li>
        </ul>
      </Card>
    }
  />,

  // 26 · Mapa de navegación
  <Slide key="s26" center>
    <span className="eyebrow">El sistema completo</span>
    <h2>Mapa de navegación del proyecto</h2>
    <Flow
      style={{ marginTop: '1.6rem' }}
      steps={['Login /', 'Dashboard', 'Tareas', { label: 'Detalle /:id', ok: true }]}
    />
    <p className="muted" style={{ marginTop: '1.6rem' }}>
      Sin <b>token</b>, cualquier ruta privada redirige de vuelta al <b>Login</b>. 🔒
    </p>
  </Slide>,

  // ─────────────────────────── BLOQUE 3 ───────────────────────────
  // 27 · Divider 3
  <SectionDivider key="s27" center num="03" eyebrow="Bloque 3" title="Laboratorio" subtitle="Ahora te toca a ti. Manos al teclado. ⌨️" />,

  // 28 · Laboratorio paso a paso
  <CardsGrid key="s28" eyebrow="Práctica guiada" title="Laboratorio paso a paso">
    <Card title="① Componentes reutilizables">
      <ul>
        <li><code>components/ui/Button.jsx</code> (props: <code>texto</code>, <code>variante</code>, <code>onClick</code>).</li>
        <li><code>components/ui/Card.jsx</code> usando <b>children</b>.</li>
        <li><code>components/tasks/TaskCard.jsx</code> (<code>titulo</code>, <code>estado</code>, <code>onDelete</code>).</li>
      </ul>
    </Card>
    <Card title="② Lista de tareas">
      <ul>
        <li>En <code>pages/Tareas.jsx</code>, recorrer un array con <code>.map()</code>.</li>
        <li>Usar <code>key={'{t.id}'}</code> en cada tarjeta.</li>
        <li>Condicional: “No hay tareas” si la lista está vacía.</li>
      </ul>
    </Card>
    <Card title="③ Navegación">
      <ul>
        <li><code>npm install react-router-dom</code> + <code>BrowserRouter</code> en <code>main.jsx</code>.</li>
        <li>Rutas <code>/</code>, <code>/dashboard</code>, <code>/tareas</code>, <code>*</code> en <code>App.jsx</code>.</li>
        <li>Menú con <code>NavLink</code> que resalte la sección activa.</li>
      </ul>
    </Card>
    <Card title="④ Layout + ruta protegida">
      <ul>
        <li><code>layouts/DashboardLayout.jsx</code> con <code>Navbar</code> + <code>&lt;Outlet /&gt;</code>.</li>
        <li><code>RutaPrivada</code> que redirige a <code>/</code> si no hay token.</li>
        <li>Botón “Entrar” con <code>useNavigate("/dashboard")</code>.</li>
      </ul>
    </Card>
  </CardsGrid>,

  // 29 · Estructura tras la sesión
  <TwoColumn
    key="s29"
    eyebrow="¿Dónde cae cada archivo?"
    title="Estructura tras la Sesión 2"
    left={<div className="card"><div className="tree" dangerouslySetInnerHTML={{ __html: treeFinal }} /></div>}
    right={
      <>
        <p className="lead">Cada pieza nueva tiene <b>su lugar</b> en la arquitectura.</p>
        <ul style={{ marginTop: '0.8rem' }}>
          <li><b>components/</b> → piezas reutilizables (ui, tasks).</li>
          <li><b>layouts/</b> → marcos con <code>Outlet</code>.</li>
          <li><b>routes/</b> → guardas como <code>RutaPrivada</code>.</li>
          <li><b>App.jsx</b> → el mapa de rutas.</li>
        </ul>
      </>
    }
  />,

  // 30 · Checklist
  <Slide key="s30">
    <span className="eyebrow">Antes de cerrar</span>
    <h2>Checklist de la sesión</h2>
    <ul className="checks big" style={{ marginTop: '1rem' }}>
      <li>Sé crear componentes y pasarles props (con valores por defecto).</li>
      <li>Uso children para componentes contenedores.</li>
      <li>Manejo eventos y entiendo datos⬇ / eventos⬆.</li>
      <li>Aplico renderizado condicional y de listas con key.</li>
      <li>Navego con Link / NavLink / useNavigate y leo la URL con useParams.</li>
      <li>Tengo un layout y una ruta protegida funcionando.</li>
    </ul>
  </Slide>,

  // 31 · Resumen
  <Slide key="s31">
    <span className="eyebrow">Lo que aprendiste hoy</span>
    <h2>Resumen de la sesión</h2>
    <div className="grid g2" style={{ marginTop: '0.8rem' }}>
      <Card title="Componentes">
        <p className="muted">
          Piezas <b>reutilizables</b> conectadas por <b>props</b> y <b>eventos</b>. Mostramos con
          <b> condicional</b> y recorremos datos con <b>.map() + key</b>.
        </p>
      </Card>
      <Card title="Navegación">
        <p className="muted">
          El <b>Router</b> muestra vistas sin recargar: <b>Routes</b>, <b>Link/NavLink</b>,
          <b> useNavigate</b>, <b>useParams</b>, <b>layouts</b> y <b>rutas protegidas</b>.
        </p>
      </Card>
    </div>
    <p className="lead" style={{ marginTop: '1.2rem' }}>
      📌 Idea central: <span className="accent">props bajan, eventos suben</span> · el
      <span className="accent"> Router decide la vista</span>.
    </p>
  </Slide>,

  // 32 · Próxima sesión + cierre
  <Slide key="s32" center>
    <ReactLogo spin="6s" />
    <span className="eyebrow">Próxima sesión</span>
    <h2 style={{ fontSize: '2.4rem' }}>Sesión 3 - Consumo de APIs REST con Axios</h2>
    <div className="grid g2" style={{ marginTop: '1.2rem', maxWidth: '60vw' }}>
      <Card title="Fundamentos"><p className="muted">API REST, JSON y métodos HTTP (GET, POST, PUT, DELETE).</p></Card>
      <Card title="Axios"><p className="muted">Instancias, interceptores, manejo de errores y CRUD de tareas.</p></Card>
    </div>
    <p className="muted" style={{ marginTop: '1.2rem' }}>
      <b>Tarea:</b> deja la navegación funcionando y crea <b>1 componente reutilizable</b> + <b>1 ruta</b> nuevos.
    </p>
    <p className="muted" style={{ marginTop: '0.8rem' }}>¿Preguntas? 🙌 ¡Nos vemos en la Sesión 3!</p>
  </Slide>,
]

export default slides
