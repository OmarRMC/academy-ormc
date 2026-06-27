// ─────────────────────────────────────────────────────────────────────────
// Curso React · Sesión 1 - Introducción al Ecosistema React Moderno
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
import { ArrowRight, ArrowLeft } from '../../components/ui/Icons.jsx'

// Flechas inline (icono) para textos del tipo "X → Y" / "← Y"
const Arr = () => (
  <ArrowRight size={14} className="text-react" style={{ verticalAlign: '-2px', margin: '0 3px' }} />
)
const ArrL = () => (
  <ArrowLeft size={14} className="text-react" style={{ verticalAlign: '-2px', margin: '0 3px' }} />
)

export const meta = {
  course: 'react-cicd',
  session: 1,
  title: 'Introducción al Ecosistema React Moderno',
}

// Árbol de archivos como HTML (se renderiza con la clase .tree)
const treeArbol = `&lt;<span class="dir">App</span>&gt;
&nbsp;&nbsp;├─ &lt;<span class="dir">Navbar</span>&gt;
&nbsp;&nbsp;├─ &lt;<span class="dir">Sidebar</span>&gt;
&nbsp;&nbsp;└─ &lt;<span class="dir">Dashboard</span>&gt;
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├─ &lt;<span class="dir">TaskList</span>&gt;
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│&nbsp;&nbsp;├─ &lt;<span class="dir">TaskCard</span>&gt;
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│&nbsp;&nbsp;├─ &lt;<span class="dir">TaskCard</span>&gt;
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│&nbsp;&nbsp;└─ &lt;<span class="dir">TaskCard</span>&gt;
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─ &lt;<span class="dir">TaskForm</span>&gt;`

const treeEstructura = `<span class="dir">src/</span>
&nbsp;├─ <span class="dir">api/</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="cmt"># cliente Axios / endpoints</span>
&nbsp;├─ <span class="dir">assets/</span> &nbsp;&nbsp;<span class="cmt"># imágenes, íconos</span>
&nbsp;├─ <span class="dir">components/</span> <span class="cmt"># piezas reutilizables</span>
&nbsp;├─ <span class="dir">constants/</span> <span class="cmt"># constantes y configuración</span>
&nbsp;├─ <span class="dir">hooks/</span> &nbsp;&nbsp;<span class="cmt"># custom hooks</span>
&nbsp;├─ <span class="dir">layouts/</span> &nbsp;<span class="cmt"># estructuras de página</span>
&nbsp;├─ <span class="dir">pages/</span> &nbsp;&nbsp;<span class="cmt"># vistas / pantallas</span>
&nbsp;├─ <span class="dir">routes/</span> &nbsp;<span class="cmt"># definición de rutas</span>
&nbsp;├─ <span class="dir">services/</span> <span class="cmt"># llamadas a APIs</span>
&nbsp;├─ <span class="dir">store/</span> &nbsp;&nbsp;<span class="cmt"># estado global (Zustand)</span>
&nbsp;├─ <span class="dir">firebase/</span> <span class="cmt"># config de Firebase</span>
&nbsp;├─ <span class="dir">styles/</span> &nbsp;<span class="cmt"># estilos globales</span>
&nbsp;├─ <span class="dir">utils/</span> &nbsp;&nbsp;<span class="cmt"># funciones auxiliares</span>
&nbsp;├─ App.jsx
&nbsp;└─ main.jsx`

const codeComponente = `<span class="tok-com">// Un componente = una función</span>
<span class="tok-key">function</span> <span class="tok-fn">TaskCard</span>() {
  <span class="tok-key">return</span> (
    &lt;<span class="tok-tag">div</span> <span class="tok-attr">className</span>=<span class="tok-str">"card"</span>&gt;
      &lt;<span class="tok-tag">h3</span>&gt;Mi primera tarea&lt;/<span class="tok-tag">h3</span>&gt;
      &lt;<span class="tok-tag">p</span>&gt;Pendiente&lt;/<span class="tok-tag">p</span>&gt;
    &lt;/<span class="tok-tag">div</span>&gt;
  );
}

<span class="tok-key">export default</span> TaskCard;`

const codeJsx = `<span class="tok-key">const</span> nombre = <span class="tok-str">"Omar"</span>;
<span class="tok-key">const</span> tareas = <span class="tok-num">5</span>;

<span class="tok-key">return</span> (
  &lt;<span class="tok-tag">div</span>&gt;
    &lt;<span class="tok-tag">h2</span>&gt;Hola, {nombre} 👋&lt;/<span class="tok-tag">h2</span>&gt;
    &lt;<span class="tok-tag">p</span>&gt;Tienes {tareas} tareas&lt;/<span class="tok-tag">p</span>&gt;
    {tareas &gt; <span class="tok-num">0</span> &amp;&amp; &lt;<span class="tok-tag">span</span>&gt;¡A trabajar!&lt;/<span class="tok-tag">span</span>&gt;}
  &lt;/<span class="tok-tag">div</span>&gt;
);`

const codeProps = `<span class="tok-com">// Padre pasa datos por props</span>
&lt;<span class="tok-tag">TaskCard</span> <span class="tok-attr">titulo</span>=<span class="tok-str">"Estudiar React"</span> <span class="tok-attr">estado</span>=<span class="tok-str">"pendiente"</span> /&gt;

<span class="tok-com">// Hijo los recibe y los usa</span>
<span class="tok-key">function</span> <span class="tok-fn">TaskCard</span>({ titulo, estado }) {
  <span class="tok-key">return</span> &lt;<span class="tok-tag">h3</span>&gt;{titulo} - {estado}&lt;/<span class="tok-tag">h3</span>&gt;;
}`

const codeHooks = `<span class="tok-key">import</span> { useState } <span class="tok-key">from</span> <span class="tok-str">"react"</span>;

<span class="tok-key">function</span> <span class="tok-fn">Contador</span>() {
  <span class="tok-key">const</span> [conteo, setConteo] = <span class="tok-fn">useState</span>(<span class="tok-num">0</span>);

  <span class="tok-key">return</span> (
    &lt;<span class="tok-tag">button</span> <span class="tok-attr">onClick</span>={() =&gt; <span class="tok-fn">setConteo</span>(conteo + <span class="tok-num">1</span>)}&gt;
      Tareas hechas: {conteo}
    &lt;/<span class="tok-tag">button</span>&gt;
  );
}`

const codeNode = `<span class="tok-com"># Versión de Node</span>
node -v
<span class="tok-com"># → v20.x.x</span>

<span class="tok-com"># Versión de npm</span>
npm -v
<span class="tok-com"># → 10.x.x</span>`

const codeCrear = `<span class="tok-com"># 1. Crear el proyecto con Vite</span>
npm create vite@latest gestor-tareas

<span class="tok-com"># Seleccionar:</span>
<span class="tok-com">#   Framework  → React</span>
<span class="tok-com">#   Variant    → JavaScript</span>

<span class="tok-com"># 2. Entrar a la carpeta</span>
cd gestor-tareas

<span class="tok-com"># 3. Instalar dependencias base</span>
npm install

<span class="tok-com"># 4. Levantar el servidor</span>
npm run dev`

const codeDeps = `<span class="tok-com"># Navegación, estado, datos, formularios y utilidades</span>
npm install react-router-dom zustand axios react-hook-form react-toastify dayjs

<span class="tok-com"># Firebase (autenticación, base de datos y hosting)</span>
npm install firebase

<span class="tok-com"># Tailwind CSS (estilos)</span>
npm install -D tailwindcss postcss autoprefixer`

export const slides = [
  // 1 · Portada
  <TitleSlide
    key="s1"
    center
    logo
    eyebrow="Módulo I · Sesión 1"
    title={
      <>
        Introducción al
        <br />
        <span className="accent">Ecosistema React</span> Moderno
      </>
    }
    subtitle="Desarrollo Front-End Profesional con React, Firebase y CI/CD"
    meta={
      <>
        Expositor: <b>Omar Rodrigo Mamani Capcha</b> · Duración: 1h 30min
      </>
    }
  />,

  // 2 · Agenda
  <CardsGrid
    key="s2"
    eyebrow="Hoja de ruta"
    title="Agenda de la sesión"
    cards={[
      { title: '1 · Conceptos Fundamentales', body: 'Qué es React, SPA, Virtual DOM, Componentes, JSX, flujo de datos, Hooks y arquitectura.' },
      { title: '2 · Configuración del Proyecto', body: 'Node.js, Vite, creación del proyecto, dependencias, organización de carpetas y buenas prácticas.' },
      { title: '3 · Proyecto Base del Curso', body: 'Sistema de Gestión de Tareas: arquitectura, convenciones y flujo de trabajo.' },
      { title: '4 · Laboratorio', body: 'Configuración del entorno, ejecución del proyecto y exploración de la arquitectura.' },
    ]}
  />,

  // 3 · Objetivos
  <BulletSlide
    key="s3"
    eyebrow="¿Qué lograrás hoy?"
    title="Objetivos de aprendizaje"
    variant="checks"
    items={[
      <>Comprender <b>qué es React</b> y por qué domina el desarrollo front-end profesional.</>,
      <>Diferenciar una <b>SPA</b> de una web tradicional y entender el <b>Virtual DOM</b>.</>,
      <>Identificar los pilares de React: <b>componentes, JSX, props y hooks</b>.</>,
      <>Crear un proyecto React profesional desde cero con <b>Vite</b>.</>,
      <>Reconocer la <b>arquitectura de carpetas</b> y las convenciones del curso.</>,
      <>Dejar el <b>entorno listo y el proyecto corriendo</b> en tu máquina.</>,
    ]}
  />,

  // 4 · Divider 1
  <SectionDivider key="s4" center num="01" eyebrow="Bloque 1" title="Conceptos Fundamentales" subtitle="La base mental antes de escribir código." />,

  // 5 · ¿Qué es React?
  <TwoColumn
    key="s5"
    eyebrow="Concepto"
    title="¿Qué es React JS?"
    left={
      <>
        <p className="lead">
          Es una <b>librería de JavaScript</b> creada por <b>Meta (Facebook)</b> para construir{' '}
          <span className="accent">interfaces de usuario</span> mediante componentes.
        </p>
        <ul style={{ marginTop: '1rem' }}>
          <li><b>Declarativa:</b> describes <i>qué</i> quieres ver y React actualiza la pantalla.</li>
          <li><b>Basada en componentes:</b> piezas reutilizables que se combinan.</li>
          <li><b>"Aprende una vez, escribe en cualquier lado":</b> web, móvil (React Native).</li>
        </ul>
      </>
    }
    right={
      <Card title="Librería, no framework">
        <p className="muted">
          React resuelve <b>la vista</b>. El resto (rutas, estado, datos) lo eliges tú con su ecosistema - justamente lo que veremos en el curso.
        </p>
        <div className="tag-row">
          <span className="pill">React Router</span>
          <span className="pill">Zustand</span>
          <span className="pill">Axios</span>
          <span className="pill">Firebase</span>
        </div>
      </Card>
    }
  />,

  // 6 · ¿Por qué React?
  <CardsGrid
    key="s6"
    cols={3}
    eyebrow="Contexto profesional"
    title="¿Por qué aprender React?"
    cards={[
      { title: '#1 en demanda', body: 'La librería front-end más solicitada en ofertas laborales a nivel mundial.' },
      { title: 'Ecosistema enorme', body: 'Miles de librerías, herramientas y comunidad activa que aceleran el desarrollo.' },
      { title: 'Respaldo de Meta', body: 'Usado en Facebook, Instagram, WhatsApp Web, Netflix, Airbnb y más.' },
      { title: 'Reutilización', body: 'Componentes que escribes una vez y usas en todo el proyecto.' },
      { title: 'Curva amigable', body: 'Si sabes JavaScript, ya tienes el 80% del camino recorrido.' },
      { title: 'Transferible', body: 'Los conceptos sirven para React Native, Next.js y otros frameworks.' },
    ]}
  />,

  // 7 · SPA
  <Slide key="s7">
    <span className="eyebrow">Concepto clave</span>
    <h2>Single Page Application (SPA)</h2>
    <p className="lead" style={{ marginTop: '0.4rem' }}>
      Una <b>única página HTML</b> que se actualiza dinámicamente sin recargar el navegador.
    </p>
    <div className="grid g2" style={{ marginTop: '1.2rem' }}>
      <Card title="Web tradicional (MPA)" titleClass="orange">
        <ul>
          <li>Cada clic pide una <b>página nueva</b> al servidor.</li>
          <li>La pantalla <b>parpadea</b> y se recarga.</li>
          <li>Más lento, más tráfico al servidor.</li>
        </ul>
      </Card>
      <Card title="SPA con React" titleClass="green">
        <ul>
          <li>Se carga <b>una vez</b>; luego solo cambian los datos.</li>
          <li>Navegación <b>instantánea</b>, sin recargas.</li>
          <li>Experiencia fluida, tipo aplicación de escritorio.</li>
        </ul>
      </Card>
    </div>
    <p className="muted" style={{ marginTop: '1rem' }}>
      👉 Nuestro <b>Sistema de Gestión de Tareas</b> será una SPA: login, dashboard y tareas sin recargar nunca la página.
    </p>
  </Slide>,

  // 8 · Virtual DOM
  <Slide key="s8">
    <span className="eyebrow">El "motor" de React</span>
    <h2>Virtual DOM</h2>
    <p className="lead" style={{ marginTop: '0.3rem' }}>
      Una copia <b>ligera</b> del DOM real en memoria. React la usa para actualizar la pantalla de forma{' '}
      <span className="accent">eficiente</span>.
    </p>
    <Flow
      style={{ marginTop: '1.4rem' }}
      steps={['1 · Cambia el estado', '2 · Nuevo Virtual DOM', '3 · Compara (diffing)', { label: '4 · Actualiza solo lo necesario', ok: true }]}
    />
    <div className="grid g2" style={{ marginTop: '1.3rem' }}>
      <Card title="El problema">
        <p className="muted">Tocar el DOM real es <b>costoso</b>. Hacerlo en cada cambio vuelve lenta la app.</p>
      </Card>
      <Card title="La solución">
        <p className="muted">React calcula la <b>mínima diferencia</b> y solo modifica esos nodos. Tú no manipulas el DOM manualmente.</p>
      </Card>
    </div>
  </Slide>,

  // 9 · Componentes
  <TwoColumn
    key="s9"
    eyebrow="El corazón de React"
    title="Componentes"
    left={
      <>
        <p className="lead">
          Piezas <b>independientes y reutilizables</b> de interfaz. Una app React es un{' '}
          <span className="accent">árbol de componentes</span>.
        </p>
        <ul style={{ marginTop: '0.8rem' }}>
          <li>Son <b>funciones</b> que devuelven interfaz (JSX).</li>
          <li>Se <b>componen</b> unos dentro de otros.</li>
          <li>Nombre siempre en <b>PascalCase</b>: <code>TaskCard</code>, <code>Navbar</code>.</li>
        </ul>
      </>
    }
    right={<CodeBlock html={codeComponente} />}
  />,

  // 10 · Árbol de componentes
  <TwoColumn
    key="s10"
    eyebrow="Pensar en componentes"
    title="Una app = un árbol"
    left={<div className="card"><div className="tree" dangerouslySetInnerHTML={{ __html: treeArbol }} /></div>}
    right={
      <>
        <p className="lead">Dividimos la interfaz en <b>pequeñas piezas</b> con una sola responsabilidad.</p>
        <ul style={{ marginTop: '0.8rem' }}>
          <li><b>Reutilizables:</b> un <code>TaskCard</code> sirve para todas las tareas.</li>
          <li><b>Mantenibles:</b> arreglas un componente, no toda la app.</li>
          <li><b>Legibles:</b> el código refleja lo que ves en pantalla.</li>
        </ul>
      </>
    }
  />,

  // 11 · JSX
  <TwoColumn
    key="s11"
    eyebrow="La sintaxis de React"
    title="JSX"
    lead={<>Una extensión que permite escribir <b>HTML dentro de JavaScript</b>. Mezcla la estructura y la lógica en un solo lugar.</>}
    left={<CodeBlock html={codeJsx} />}
    right={
      <Card title="Reglas de oro">
        <ul>
          <li>Usa <code>{'{ }'}</code> para insertar <b>JavaScript</b>.</li>
          <li>Atributos en <b>camelCase</b>: <code>className</code>, <code>onClick</code>.</li>
          <li>Debe devolver <b>un solo elemento padre</b> (o <code>&lt;&gt;…&lt;/&gt;</code>).</li>
          <li>Las etiquetas vacías se cierran: <code>&lt;img /&gt;</code>.</li>
        </ul>
      </Card>
    }
  />,

  // 12 · Flujo de datos
  <Slide key="s12">
    <span className="eyebrow">Cómo viajan los datos</span>
    <h2>Flujo de datos unidireccional</h2>
    <p className="lead" style={{ marginTop: '0.3rem' }}>
      Los datos fluyen <b>de padre a hijo</b> mediante <span className="accent">props</span>. Predecible y fácil de depurar.
    </p>
    <Flow style={{ marginTop: '1.2rem' }} arrowLabel="props" steps={['Componente Padre', 'Componente Hijo']} />
    <div className="two-col" style={{ marginTop: '1rem' }}>
      <div><CodeBlock html={codeProps} /></div>
      <Card title="Claves">
        <ul>
          <li><b>props = parámetros</b> del componente.</li>
          <li>Son de <b>solo lectura</b> (el hijo no las modifica).</li>
          <li>Datos abajo ⬇, eventos arriba ⬆ (callbacks).</li>
        </ul>
      </Card>
    </div>
  </Slide>,

  // 13 · Hooks
  <TwoColumn
    key="s13"
    eyebrow="Dándole vida a los componentes"
    title="Hooks"
    lead={<>Funciones especiales que añaden <b>"superpoderes"</b> a los componentes: memoria (estado), efectos y más.</>}
    left={<CodeBlock html={codeHooks} />}
    right={
      <Card title="Los que verás en el curso">
        <ul>
          <li><code>useState</code> <Arr /> memoria/estado local.</li>
          <li><code>useEffect</code> <Arr /> efectos (cargar datos).</li>
          <li><code>useMemo</code> / <code>useCallback</code> <Arr /> optimización.</li>
          <li><b>Custom hooks:</b> <code>useAuth</code>, <code>useTasks</code>.</li>
        </ul>
        <p className="muted" style={{ marginTop: '0.5rem' }}>Regla: solo se llaman en el <b>nivel superior</b> del componente.</p>
      </Card>
    }
  />,

  // 14 · Arquitectura React
  <CardsGrid
    key="s14"
    cols={3}
    eyebrow="Visión global"
    title="Arquitectura de aplicaciones React"
    cards={[
      { title: 'UI', body: <><b>Components</b> y <b>Pages</b>: lo que el usuario ve.</> },
      { title: 'Lógica', body: <><b>Hooks</b> y <b>Store</b> (Zustand): estado y comportamiento.</> },
      { title: 'Datos', body: <><b>Services</b> (Axios) y <b>Firebase</b>: comunicación externa.</> },
      { title: 'Navegación', body: <><b>Routes</b> y <b>Layouts</b>: estructura y rutas protegidas.</> },
      { title: 'Soporte', body: <><b>Utils</b>, <b>Styles</b>, <b>Assets</b>: apoyo transversal.</> },
      { title: 'Meta', body: 'Cada cosa en su lugar = código mantenible y en equipo.' },
    ]}
  />,

  // 15 · Divider 2
  <SectionDivider key="s15" center num="02" eyebrow="Bloque 2" title="Configuración del Proyecto" subtitle="De cero a un proyecto React corriendo." />,

  // 16 · Node
  <TwoColumn
    key="s16"
    eyebrow="Requisito #1"
    title="Node.js y npm"
    left={
      <>
        <p className="lead"><b>Node.js</b> permite ejecutar JavaScript fuera del navegador. Es la base de todo el tooling moderno.</p>
        <ul style={{ marginTop: '0.8rem' }}>
          <li><b>npm</b> (Node Package Manager) instala las librerías.</li>
          <li>Recomendado: versión <b>LTS</b> (18 o superior).</li>
          <li>Descarga en <span className="accent">nodejs.org</span>.</li>
        </ul>
      </>
    }
    right={
      <Card title="Verifica la instalación">
        <CodeBlock html={codeNode} />
        <p className="muted">Si ambos comandos responden, ¡estás listo!</p>
      </Card>
    }
  />,

  // 17 · Vite
  <Slide key="s17">
    <span className="eyebrow">Nuestra herramienta de build</span>
    <h2>¿Qué es Vite?</h2>
    <p className="lead" style={{ marginTop: '0.3rem' }}>
      Herramienta moderna para crear y servir proyectos front-end de forma <span className="accent">ultrarrápida</span>.
    </p>
    <div className="grid g2" style={{ marginTop: '1.1rem' }}>
      <Card title="Ventajas de Vite" titleClass="green">
        <ul>
          <li>Arranque <b>casi instantáneo</b> del servidor.</li>
          <li><b>Hot Module Replacement:</b> ves cambios al instante.</li>
          <li>Configuración mínima y build optimizado.</li>
        </ul>
      </Card>
      <Card title="Vite vs Create React App" titleClass="orange">
        <ul>
          <li>CRA está <b>obsoleto</b> y es lento.</li>
          <li>Vite es el <b>estándar actual</b> de la industria.</li>
          <li>Por eso lo usamos en este curso.</li>
        </ul>
      </Card>
    </div>
  </Slide>,

  // 18 · Crear proyecto
  <TwoColumn
    key="s18"
    eyebrow="¡Manos a la obra!"
    title="Creación del proyecto"
    left={<CodeBlock html={codeCrear} />}
    right={
      <Card title="Resultado">
        <p className="muted">Vite abre el proyecto en:</p>
        <p className="big accent">localhost:5173</p>
        <ul style={{ marginTop: '0.6rem' }}>
          <li><code>npm run dev</code> <Arr /> desarrollo.</li>
          <li><code>npm run build</code> <Arr /> producción.</li>
          <li><code>npm run preview</code> <Arr /> previsualizar build.</li>
        </ul>
      </Card>
    }
  />,

  // 19 · Dependencias
  <Slide key="s19">
    <span className="eyebrow">El stack del curso</span>
    <h2>Instalación de dependencias</h2>
    <CodeBlock html={codeDeps} />
    <div className="grid g3" style={{ marginTop: '1rem' }}>
      <Card title="Navegación"><span className="pill">react-router-dom</span></Card>
      <Card title="Estado / Datos"><span className="pill">zustand</span><span className="pill">axios</span></Card>
      <Card title="Formularios / UX"><span className="pill">react-hook-form</span><span className="pill">react-toastify</span><span className="pill">dayjs</span></Card>
    </div>
  </Slide>,

  // 20 · Estructura de carpetas
  <TwoColumn
    key="s20"
    eyebrow="Organización de carpetas"
    title="Estructura del proyecto"
    left={<div className="card"><div className="tree" dangerouslySetInnerHTML={{ __html: treeEstructura }} /></div>}
    right={
      <>
        <p className="lead">Cada carpeta tiene <b>una responsabilidad clara</b>.</p>
        <ul style={{ marginTop: '0.8rem' }}>
          <li>Encuentras las cosas <b>donde esperas</b>.</li>
          <li>El proyecto <b>escala</b> sin volverse un desorden.</li>
          <li>Facilita el <b>trabajo en equipo</b>.</li>
        </ul>
        <p className="muted" style={{ marginTop: '0.8rem' }}>Esta es la misma estructura que usaremos durante <b>las 8 sesiones</b>.</p>
      </>
    }
  />,

  // 21 · Buenas prácticas
  <CardsGrid
    key="s21"
    eyebrow="Desde el día 1"
    title="Buenas prácticas de desarrollo"
  >
    <Card title="Nomenclatura">
      <ul>
        <li>Componentes en <b>PascalCase</b>: <code>TaskCard.jsx</code>.</li>
        <li>Funciones y variables en <b>camelCase</b>.</li>
        <li>Nombres <b>descriptivos</b> y consistentes.</li>
      </ul>
    </Card>
    <Card title="Organización">
      <ul>
        <li>Un componente por archivo.</li>
        <li>Separar <b>lógica</b> (hooks/services) de la <b>vista</b>.</li>
        <li>No repetir código (DRY): reutiliza componentes.</li>
      </ul>
    </Card>
    <Card title="Calidad">
      <ul>
        <li>Código <b>legible</b> antes que "ingenioso".</li>
        <li>Variables de entorno para datos sensibles.</li>
        <li>Commits pequeños y frecuentes.</li>
      </ul>
    </Card>
    <Card title="Mentalidad">
      <ul>
        <li>Piensa en <b>componentes</b> reutilizables.</li>
        <li>Lee la documentación oficial.</li>
        <li>Equivócate, experimenta y pregunta.</li>
      </ul>
    </Card>
  </CardsGrid>,

  // 22 · Divider 3
  <SectionDivider key="s22" center num="03" eyebrow="Bloque 3" title="Proyecto Base del Curso" subtitle="Un solo proyecto profesional, de principio a fin." />,

  // 23 · Sistema de Gestión de Tareas
  <CardsGrid
    key="s23"
    cols={3}
    eyebrow="El proyecto que construiremos"
    title="Sistema de Gestión de Tareas"
    cards={[
      { title: '🔐 Autenticación', body: 'Inicio de sesión y rutas protegidas.' },
      { title: '📊 Dashboard', body: 'Vista principal con resumen de tareas.' },
      { title: '✅ Gestión de tareas', body: 'CRUD completo: crear, leer, editar, borrar.' },
      { title: '👥 Gestión de usuarios', body: 'Administración de personas del sistema.' },
      { title: '🌐 APIs + Firebase', body: 'Datos vía REST y Cloud Firestore.' },
      { title: '🚀 CI/CD', body: 'Despliegue automático a Firebase Hosting.' },
    ]}
  />,

  // 24 · Evolución del proyecto
  <Slide key="s24">
    <span className="eyebrow">Cómo crecerá el proyecto</span>
    <h2>Una evolución progresiva</h2>
    <table style={{ marginTop: '0.6rem' }}>
      <thead>
        <tr><th>Sesión</th><th>Lo que añadiremos al proyecto</th></tr>
      </thead>
      <tbody>
        <tr><td><b>1</b></td><td>Entorno, arquitectura y proyecto base corriendo <ArrL /> <span className="accent">hoy</span></td></tr>
        <tr><td><b>2</b></td><td>Componentes reutilizables y navegación (React Router)</td></tr>
        <tr><td><b>3</b></td><td>Consumo de API REST con Axios + CRUD de tareas</td></tr>
        <tr><td><b>4</b></td><td>Estado global (Zustand) y formularios (React Hook Form)</td></tr>
        <tr><td><b>5–6</b></td><td>Firebase Authentication y Cloud Firestore</td></tr>
        <tr><td><b>7</b></td><td>Custom hooks, optimización y refactorización</td></tr>
        <tr><td><b>8</b></td><td>Git, GitHub Actions y despliegue automático (CI/CD)</td></tr>
      </tbody>
    </table>
  </Slide>,

  // 25 · Convenciones y flujo
  <Slide key="s25">
    <span className="eyebrow">Reglas del juego</span>
    <h2>Convenciones y flujo de trabajo</h2>
    <div className="grid g2" style={{ marginTop: '0.8rem' }}>
      <Card title="Convenciones de desarrollo">
        <ul>
          <li>Arquitectura de carpetas <b>fija</b> y respetada.</li>
          <li>Componentes en PascalCase, hooks con prefijo <code>use</code>.</li>
          <li>Servicios aislados para llamadas externas.</li>
          <li>Variables de entorno en <code>.env</code> (nunca en el código).</li>
        </ul>
      </Card>
      <Card title="Flujo de trabajo profesional">
        <Flow style={{ marginTop: '0.3rem' }} steps={['Desarrollo', 'Git', 'GitHub']} />
        <Flow steps={['GitHub Actions', { label: 'Firebase Hosting', ok: true }]} />
        <p className="muted" style={{ marginTop: '0.6rem' }}>El mismo flujo que usan los equipos reales.</p>
      </Card>
    </div>
  </Slide>,

  // 26 · Divider 4
  <SectionDivider key="s26" center num="04" eyebrow="Bloque 4" title="Laboratorio" subtitle="Ahora te toca a ti. Manos al teclado. ⌨️" />,

  // 27 · Laboratorio paso a paso
  <CardsGrid key="s27" eyebrow="Práctica guiada" title="Laboratorio paso a paso">
    <Card title="① Configuración del entorno">
      <ul>
        <li>Instalar / verificar <b>Node.js</b> (<code>node -v</code>).</li>
        <li>Instalar <b>VS Code</b> + extensiones recomendadas.</li>
        <li>Extensiones: <i>ES7 React snippets</i>, <i>Prettier</i>.</li>
      </ul>
    </Card>
    <Card title="② Ejecución del proyecto">
      <ul>
        <li>Crear el proyecto con <b>Vite</b>.</li>
        <li><code>npm install</code> y <code>npm run dev</code>.</li>
        <li>Abrir <b>localhost:5173</b> en el navegador.</li>
      </ul>
    </Card>
    <Card title="③ Exploración de la arquitectura">
      <ul>
        <li>Recorrer las carpetas de <code>src/</code>.</li>
        <li>Identificar <code>main.jsx</code> y <code>App.jsx</code>.</li>
        <li>Hacer un cambio en <code>App.jsx</code> y ver el HMR.</li>
      </ul>
    </Card>
    <Card title="④ Primer componente">
      <ul>
        <li>Crear <code>components/Bienvenida.jsx</code>.</li>
        <li>Importarlo y usarlo en <code>App.jsx</code>.</li>
        <li>¡Ver tu primer componente en pantalla! 🎉</li>
      </ul>
    </Card>
  </CardsGrid>,

  // 28 · Checklist
  <Slide key="s28">
    <span className="eyebrow">Antes de cerrar</span>
    <h2>Checklist de la sesión</h2>
    <ul className="checks big" style={{ marginTop: '1rem' }}>
      <li>Node.js y npm instalados y verificados.</li>
      <li>VS Code configurado con extensiones de React.</li>
      <li>Proyecto creado con Vite y corriendo en localhost:5173.</li>
      <li>Estructura de carpetas comprendida.</li>
      <li>Primer componente creado y renderizado.</li>
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
          React es una librería para construir UIs con <b>componentes</b>. Las <b>SPA</b> no recargan, el <b>Virtual DOM</b> optimiza, <b>JSX</b> mezcla HTML+JS, los datos fluyen por <b>props</b> y los <b>hooks</b> dan estado.
        </p>
      </Card>
      <Card title="Práctica">
        <p className="muted">
          Configuramos el entorno con <b>Node</b> y <b>Vite</b>, instalamos el <b>stack del curso</b>, conocimos la <b>arquitectura de carpetas</b> y dejamos el <b>proyecto base corriendo</b>.
        </p>
      </Card>
    </div>
    <p className="lead" style={{ marginTop: '1.2rem' }}>
      📌 Idea central: <span className="accent">pensar en componentes</span> y mantener una <span className="accent">arquitectura ordenada</span>.
    </p>
  </Slide>,

  // 30 · Próxima sesión
  <Slide key="s30" center>
    <span className="eyebrow">Próxima sesión</span>
    <h2 style={{ fontSize: '2.6rem' }}>Sesión 2 - Componentes Profesionales y Navegación</h2>
    <div className="grid g2" style={{ marginTop: '1.4rem', maxWidth: '60vw' }}>
      <Card title="Componentes"><p className="muted">Props, children, eventos, renderizado condicional y de listas.</p></Card>
      <Card title="React Router DOM"><p className="muted">Routes, Link, useNavigate, layouts y rutas protegidas.</p></Card>
    </div>
    <p className="muted" style={{ marginTop: '1.4rem' }}>
      <b>Tarea:</b> deja tu entorno funcionando y crea 2 componentes propios para practicar.
    </p>
  </Slide>,

  // 31 · Cierre
  <Slide key="s31" center>
    <ReactLogo spin="6s" />
    <h1>¿Preguntas? 🙌</h1>
    <p className="lead muted" style={{ marginTop: '1rem' }}>
      ¡Gracias por tu atención!
      <br />
      Nos vemos en la Sesión 2.
    </p>
    <p className="muted" style={{ marginTop: '1.6rem' }}>
      Desarrollo Front-End Profesional con React, Firebase y CI/CD · Omar Rodrigo Mamani Capcha
    </p>
  </Slide>,
]

export default slides
