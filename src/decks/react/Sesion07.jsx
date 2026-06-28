// ─────────────────────────────────────────────────────────────────────────
// Curso React · Sesión 7 - Arquitectura Profesional y Optimización
// Cada elemento del array `slides` es una diapositiva. El componente <Deck>
// se encarga de la navegación, el progreso y la pantalla completa.
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
  session: 7,
  title: 'Arquitectura Profesional y Optimización',
}

// ── Bloques de código (HTML con tokens .tok-*) ────────────────────────────

const codeAntesDespues = `<span class="tok-com">// ❌ Antes: el componente hace de todo</span>
<span class="tok-key">function</span> <span class="tok-fn">Tareas</span>() {
  <span class="tok-key">const</span> [tareas, setTareas] = <span class="tok-fn">useState</span>([]);
  <span class="tok-fn">useEffect</span>(() =&gt; { <span class="tok-com">/* fetch + onSnapshot */</span> }, []);
  <span class="tok-key">return</span> &lt;<span class="tok-tag">Lista</span> <span class="tok-attr">tareas</span>={tareas} /&gt;;
}

<span class="tok-com">// ✅ Después: la lógica vive en un hook</span>
<span class="tok-key">function</span> <span class="tok-fn">Tareas</span>() {
  <span class="tok-key">const</span> { tareas } = <span class="tok-fn">useTasks</span>();
  <span class="tok-key">return</span> &lt;<span class="tok-tag">Lista</span> <span class="tok-attr">tareas</span>={tareas} /&gt;;
}`

const codeUseAuth = `<span class="tok-com">// src/hooks/useAuth.js</span>
<span class="tok-key">import</span> { useAuthStore } <span class="tok-key">from</span> <span class="tok-str">"../store/useAuthStore"</span>;

<span class="tok-key">export function</span> <span class="tok-fn">useAuth</span>() {
  <span class="tok-key">const</span> { user, cargando } = <span class="tok-fn">useAuthStore</span>();
  <span class="tok-key">return</span> { user, cargando, estaLogueado: <span class="tok-fn">Boolean</span>(user) };
}`

const codeUseTasks = `<span class="tok-com">// src/hooks/useTasks.js</span>
<span class="tok-key">import</span> { useEffect } <span class="tok-key">from</span> <span class="tok-str">"react"</span>;
<span class="tok-key">import</span> { useTaskStore } <span class="tok-key">from</span> <span class="tok-str">"../store/useTaskStore"</span>;

<span class="tok-key">export function</span> <span class="tok-fn">useTasks</span>() {
  <span class="tok-key">const</span> { tareas, escuchar } = <span class="tok-fn">useTaskStore</span>();
  <span class="tok-fn">useEffect</span>(() =&gt; {
    <span class="tok-key">const</span> unsub = <span class="tok-fn">escuchar</span>();  <span class="tok-com">// onSnapshot</span>
    <span class="tok-key">return</span> () =&gt; <span class="tok-fn">unsub</span>();      <span class="tok-com">// limpieza</span>
  }, []);
  <span class="tok-key">return</span> { tareas };
}`

const codeMemo = `<span class="tok-key">import</span> { useMemo } <span class="tok-key">from</span> <span class="tok-str">"react"</span>;

<span class="tok-key">const</span> completadas = <span class="tok-fn">useMemo</span>(
  () =&gt; tareas.<span class="tok-fn">filter</span>((t) =&gt; t.completada),
  [tareas],  <span class="tok-com">// solo recalcula si cambian las tareas</span>
);`

const codeCallback = `<span class="tok-key">import</span> { useCallback } <span class="tok-key">from</span> <span class="tok-str">"react"</span>;

<span class="tok-key">const</span> eliminar = <span class="tok-fn">useCallback</span>((id) =&gt; {
  taskService.<span class="tok-fn">eliminar</span>(id);
}, []);`

const codeLazy = `<span class="tok-key">import</span> { lazy, Suspense } <span class="tok-key">from</span> <span class="tok-str">"react"</span>;

<span class="tok-key">const</span> Dashboard = <span class="tok-fn">lazy</span>(() =&gt; <span class="tok-fn">import</span>(<span class="tok-str">"./pages/Dashboard"</span>));

&lt;<span class="tok-tag">Suspense</span> <span class="tok-attr">fallback</span>={&lt;<span class="tok-tag">p</span>&gt;Cargando...&lt;/<span class="tok-tag">p</span>&gt;}&gt;
  &lt;<span class="tok-tag">Dashboard</span> /&gt;
&lt;/<span class="tok-tag">Suspense</span>&gt;`

// Estructura completa del proyecto (separación por responsabilidades)
const treeProject = `<span class="dir">src/</span>
&nbsp;├─ <span class="dir">components/</span> <span class="cmt"># piezas de UI reutilizables</span>
&nbsp;├─ <span class="dir">pages/</span> &nbsp;&nbsp;<span class="cmt"># vistas / pantallas</span>
&nbsp;├─ <span class="dir">hooks/</span> &nbsp;&nbsp;<span class="cmt"># custom hooks (lógica)</span>
&nbsp;├─ <span class="dir">store/</span> &nbsp;&nbsp;<span class="cmt"># estado global (Zustand)</span>
&nbsp;├─ <span class="dir">services/</span> &nbsp;<span class="cmt"># datos (taskService)</span>
&nbsp;├─ <span class="dir">firebase/</span> &nbsp;<span class="cmt"># config + db</span>
&nbsp;├─ <span class="dir">routes/</span> &nbsp;<span class="cmt"># rutas y RutaPrivada</span>
&nbsp;└─ <span class="dir">utils/</span> &nbsp;&nbsp;<span class="cmt"># funciones auxiliares</span>`

// Estructura tras la Sesión 7
const treeFinal = `<span class="dir">src/</span>
&nbsp;├─ <span class="dir">hooks/</span>
&nbsp;│&nbsp;&nbsp;├─ useAuth.js &nbsp;<span class="cmt"># (nuevo) lógica de sesión</span>
&nbsp;│&nbsp;&nbsp;└─ useTasks.js <span class="cmt"># (nuevo) tiempo real de tareas</span>
&nbsp;├─ <span class="dir">pages/</span>
&nbsp;│&nbsp;&nbsp;└─ Tareas.jsx &nbsp;<span class="cmt"># (se simplifica) usa useTasks()</span>
&nbsp;└─ <span class="dir">components/</span> <span class="cmt"># (más limpios) solo pintan</span>`

export const slides = [
  // 1 · Portada
  <TitleSlide
    key="s1"
    center
    logo
    eyebrow="Módulo II · Sesión 7"
    title={
      <>
        Arquitectura Profesional
        <br />y <span className="accent">Optimización</span>
      </>
    }
    subtitle="Desarrollo Front-End Profesional con React, Firebase y CI/CD"
    meta={
      <>
        Expositor: <b>Omar Rodrigo Mamani Capcha</b> · Duración: 1h 30min
      </>
    }
  />,

  // 2 · Optimizamos lo que ya existe
  <Slide key="s2">
    <span className="eyebrow">Alcance de la sesión</span>
    <h2>Optimizamos lo que ya existe</h2>
    <p className="lead" style={{ marginTop: '0.3rem', maxWidth: '72ch' }}>
      No creamos nada nuevo: <b>refactorizamos y optimizamos</b> la app actual. Se comporta
      <b> igual</b>, pero queda más ordenada, legible y rápida.
    </p>
    <div className="grid g2" style={{ marginTop: '1rem' }}>
      <Card title="Qué hacemos" titleClass="green">
        <ul>
          <li>Sacar lógica repetida a <b>custom hooks</b>.</li>
          <li>Evitar cálculos y renders de más.</li>
          <li>Dividir el bundle con <b>lazy loading</b>.</li>
        </ul>
      </Card>
      <Card title="Qué NO cambia">
        <ul>
          <li>El comportamiento de la app.</li>
          <li>Las funcionalidades del Módulo I y II.</li>
          <li>El diseño que ya ve el usuario.</li>
        </ul>
      </Card>
    </div>
  </Slide>,

  // 3 · Agenda
  <CardsGrid
    key="s3"
    cols={3}
    eyebrow="Hoja de ruta"
    title="Agenda de la sesión"
    cards={[
      { title: '1 · Organización', body: 'Separación por responsabilidades del proyecto.' },
      { title: '2 · Custom hooks', body: 'Reutilizar lógica: useAuth, useTasks.' },
      { title: '3 · Optimización', body: 'useMemo, useCallback y lazy loading.' },
    ]}
  />,

  // 4 · Objetivos
  <BulletSlide
    key="s4"
    eyebrow="¿Qué lograrás hoy?"
    title="Objetivos de aprendizaje"
    variant="checks"
    items={[
      <>Explicar la <b>separación por responsabilidades</b>.</>,
      <>Crear <b>custom hooks</b> para reutilizar lógica.</>,
      <>Aplicar las <b>reglas de los hooks</b>.</>,
      <>Optimizar con <code>useMemo</code> y <code>useCallback</code>.</>,
      <>Dividir el código con <b>lazy loading</b>.</>,
      <>Saber <b>cuándo</b> optimizar (y cuándo no).</>,
    ]}
  />,

  // ─────────────────────────── BLOQUE 1 ───────────────────────────
  // 5 · Divider 1
  <SectionDivider key="s5" center num="01" eyebrow="Bloque 1" title="Organización del proyecto" subtitle="Cada cosa en su lugar." />,

  // 6 · ¿Por qué importa la arquitectura?
  <TwoColumn
    key="s6"
    eyebrow="Concepto"
    title="¿Por qué importa la arquitectura?"
    left={
      <>
        <p className="lead">
          Una <span className="accent">cocina ordenada</span> 🍳: cada cosa en su lugar, encuentras
          todo y trabajas rápido.
        </p>
        <ul style={{ marginTop: '1rem' }}>
          <li><b>Mantenible:</b> arreglas sin romper.</li>
          <li><b>Escalable:</b> crece sin volverse un caos.</li>
          <li><b>En equipo:</b> todos saben dónde está cada cosa.</li>
        </ul>
      </>
    }
    right={
      <Card title="La regla de oro">
        <p className="muted">
          Si sabes <b>qué hace cada capa</b>, sabes <b>dónde tocar</b>. El código refleja la
          estructura mental del proyecto.
        </p>
      </Card>
    }
  />,

  // 7 · Separación por responsabilidades
  <TwoColumn
    key="s7"
    eyebrow="Cada carpeta, una responsabilidad"
    title="Separación por responsabilidades"
    left={<div className="card"><div className="tree" dangerouslySetInnerHTML={{ __html: treeProject }} /></div>}
    right={
      <>
        <p className="lead">La misma estructura que venimos usando desde la Sesión 1.</p>
        <ul style={{ marginTop: '0.8rem' }}>
          <li>Nada de "un archivo que hace de todo".</li>
          <li>Cada pieza con un <b>propósito claro</b>.</li>
          <li>Fácil de encontrar, probar y reutilizar.</li>
        </ul>
      </>
    }
  />,

  // 8 · Recorrido por las capas
  <CardsGrid
    key="s8"
    cols={3}
    eyebrow="Qué hace cada capa"
    title="Recorrido por las capas"
    cards={[
      { title: 'Interfaz', body: 'components y pages: lo que el usuario ve.' },
      { title: 'Lógica y estado', body: 'hooks y store: comportamiento y datos en memoria.' },
      { title: 'Datos', body: 'services y firebase: comunicación con el backend.' },
      { title: 'Navegación', body: 'routes: rutas y protección de acceso.' },
      { title: 'Apoyo', body: 'utils, styles, assets: soporte transversal.' },
      { title: 'Meta', body: 'Cada cosa en su lugar = código mantenible.' },
    ]}
  />,

  // 9 · Antes vs después
  <TwoColumn
    key="s9"
    eyebrow="El objetivo de hoy"
    title="Antes vs después"
    lead={<>Sacar la lógica del componente para que <b>solo pinte</b>.</>}
    left={<CodeBlock html={codeAntesDespues} />}
    right={
      <Card title="La diferencia">
        <ul>
          <li><b>Antes:</b> estado, efecto y datos mezclados en la vista.</li>
          <li><b>Después:</b> un <code>useTasks()</code> y el componente queda limpio.</li>
          <li>Más legible y reutilizable.</li>
        </ul>
      </Card>
    }
  />,

  // 10 · El principio: una cosa, un lugar
  <Slide key="s10" center>
    <span className="eyebrow">El principio</span>
    <h2>Una cosa, un lugar</h2>
    <div className="grid g3" style={{ marginTop: '1.2rem', maxWidth: '70vw' }}>
      <Card title="Componentes"><p className="muted">Solo <b>pintan</b> la interfaz.</p></Card>
      <Card title="Hooks"><p className="muted">Encapsulan la <b>lógica</b>.</p></Card>
      <Card title="Services"><p className="muted">Hablan con los <b>datos</b>.</p></Card>
    </div>
    <p className="muted" style={{ marginTop: '1.4rem' }}>Con esto en mente, entramos a los custom hooks.</p>
  </Slide>,

  // ─────────────────────────── BLOQUE 2 ───────────────────────────
  // 11 · Divider 2
  <SectionDivider key="s11" center num="02" eyebrow="Bloque 2" title="Custom Hooks" subtitle="Reutilizar lógica, limpiar componentes." />,

  // 12 · ¿Qué es un custom hook?
  <TwoColumn
    key="s12"
    eyebrow="Concepto"
    title="¿Qué es un custom hook?"
    left={
      <>
        <p className="lead">
          Una <b>función</b> cuyo nombre empieza por <code>use</code> y que <b>reutiliza lógica</b>
          usando otros hooks dentro.
        </p>
        <p style={{ marginTop: '0.8rem' }}>
          <b>Analogía:</b> una <span className="accent">receta guardada</span> 📋. La lógica que
          repetías, ahora en un solo lugar reutilizable.
        </p>
      </>
    }
    right={
      <Card title="Para qué sirve">
        <ul>
          <li>Quitar lógica repetida de los componentes.</li>
          <li>Compartir comportamiento entre vistas.</li>
          <li>Componentes pequeños y legibles.</li>
        </ul>
      </Card>
    }
  />,

  // 13 · Reglas de los hooks
  <Slide key="s13">
    <span className="eyebrow">Para que funcionen bien</span>
    <h2>Reglas de los hooks</h2>
    <div className="grid g3" style={{ marginTop: '1.2rem' }}>
      <Card title="Nivel superior" titleClass="green">
        <p className="muted">Solo se llaman arriba del componente, <b>no</b> dentro de <code>if</code> o <code>for</code>.</p>
      </Card>
      <Card title="Solo desde React">
        <p className="muted">Desde <b>componentes</b> u <b>otros hooks</b>, no de funciones normales.</p>
      </Card>
      <Card title="Prefijo use" titleClass="green">
        <p className="muted">El nombre <b>debe</b> empezar por <code>use</code> (p. ej. <code>useTasks</code>).</p>
      </Card>
    </div>
  </Slide>,

  // 14 · useAuth
  <TwoColumn
    key="s14"
    eyebrow="Reutilizar la sesión"
    title="useAuth"
    lead={<>Encapsula el store de auth (S5) y expone lo justo.</>}
    left={<CodeBlock html={codeUseAuth} />}
    right={
      <Card title="En el componente">
        <ul>
          <li><code>const {'{ user, estaLogueado }'} = useAuth();</code></li>
          <li>No importa de dónde sale el usuario.</li>
          <li>Si cambia la fuente, tocas <b>un solo</b> hook.</li>
        </ul>
      </Card>
    }
  />,

  // 15 · useTasks
  <TwoColumn
    key="s15"
    eyebrow="Reutilizar las tareas"
    title="useTasks"
    lead={<>Encapsula la suscripción en tiempo real (S6) y devuelve las tareas listas.</>}
    left={<CodeBlock html={codeUseTasks} />}
    right={
      <Card title="Claves">
        <ul>
          <li>El <code>useEffect</code> y la limpieza viven <b>en el hook</b>.</li>
          <li>El componente solo hace <code>const {'{ tareas }'} = useTasks();</code>.</li>
          <li>Una sola fuente de verdad para la lista.</li>
        </ul>
      </Card>
    }
  />,

  // 16 · Patrón para extraer un hook
  <Slide key="s16" center>
    <span className="eyebrow">Cómo se hace</span>
    <h2>Patrón para extraer un hook</h2>
    <Flow
      style={{ marginTop: '1.4rem' }}
      steps={['① Detectar lógica repetida', '② Moverla a useAlgo', { label: '③ Devolver lo que se usa', ok: true }]}
    />
    <p className="muted" style={{ marginTop: '1.6rem' }}>
      Resultado: componentes pequeños y lógica testeable (useAuth, useTasks, useUsers...).
    </p>
  </Slide>,

  // ─────────────────────────── BLOQUE 3 ───────────────────────────
  // 17 · Divider 3
  <SectionDivider key="s17" center num="03" eyebrow="Bloque 3" title="Optimización" subtitle="Recalcular solo lo necesario." />,

  // 18 · El problema: renders innecesarios
  <TwoColumn
    key="s18"
    eyebrow="El problema"
    title="Renders innecesarios"
    left={
      <>
        <p className="lead">
          React <b>re-renderiza</b> cuando cambian el estado o las props. A veces recalcula cosas
          caras o recrea funciones <b>sin necesidad</b>.
        </p>
        <p style={{ marginTop: '0.8rem' }}>
          <b>Analogía:</b> rehacer toda la lista del super 🛒 cuando solo cambió <b>un</b> producto.
        </p>
      </>
    }
    right={
      <Card title="La meta">
        <ul>
          <li>Recalcular <b>solo</b> cuando hace falta.</li>
          <li>No recrear funciones en cada render.</li>
          <li>Que la app se sienta <b>fluida</b>.</li>
        </ul>
      </Card>
    }
  />,

  // 19 · useMemo
  <TwoColumn
    key="s19"
    eyebrow="Memoizar cálculos"
    title="useMemo"
    lead={<>Guarda el <b>resultado</b> de un cálculo; solo lo rehace si cambian sus dependencias.</>}
    left={<CodeBlock html={codeMemo} />}
    right={
      <Card title="Cuándo usarlo">
        <ul>
          <li>Filtros, ordenamientos o estadísticas.</li>
          <li>Sobre listas <b>grandes</b>.</li>
          <li>Las dependencias van en el array <code>[ ]</code>.</li>
        </ul>
      </Card>
    }
  />,

  // 20 · useCallback
  <TwoColumn
    key="s20"
    eyebrow="Memoizar funciones"
    title="useCallback"
    lead={<>Evita <b>recrear</b> una función en cada render (clave al pasarla a hijos).</>}
    left={<CodeBlock html={codeCallback} />}
    right={
      <Card title="Por qué importa">
        <ul>
          <li>Una función "nueva" cada render hace re-renderizar al hijo.</li>
          <li><code>useCallback</code> la mantiene estable.</li>
          <li>Útil junto a componentes memoizados.</li>
        </ul>
      </Card>
    }
  />,

  // 21 · useMemo vs useCallback
  <Slide key="s21">
    <span className="eyebrow">No confundir</span>
    <h2>useMemo vs useCallback</h2>
    <div className="grid g2" style={{ marginTop: '1.2rem' }}>
      <Card title="useMemo" titleClass="green">
        <p className="muted">Memoiza el <b>resultado</b> de un cálculo.</p>
      </Card>
      <Card title="useCallback" titleClass="green">
        <p className="muted">Memoiza la <b>función</b> en sí.</p>
      </Card>
    </div>
    <p className="muted" style={{ marginTop: '1.2rem' }}>
      Regla: <code>useCallback(fn, deps)</code> equivale a <code>useMemo(() =&gt; fn, deps)</code>.
    </p>
  </Slide>,

  // 22 · Cuándo NO optimizar
  <Slide key="s22" center>
    <span className="eyebrow">Muy importante</span>
    <h2>Cuándo NO optimizar</h2>
    <p className="lead" style={{ marginTop: '0.6rem', maxWidth: '70ch' }}>
      <b>No memoices todo.</b> Tiene un costo y complica el código. Optimiza cuando hay listas
      grandes, cálculos caros o renders <b>medibles</b>.
    </p>
    <p className="accent" style={{ marginTop: '1.2rem', fontSize: '1.3rem' }}>
      Mide antes (React DevTools). La "optimización prematura" es un problema, no una solución.
    </p>
  </Slide>,

  // 23 · Lazy loading
  <TwoColumn
    key="s23"
    eyebrow="Cargar bajo demanda"
    title="Lazy loading"
    lead={<>Cargar una parte de la app <b>solo cuando se necesita</b> (rutas pesadas).</>}
    left={<CodeBlock html={codeLazy} />}
    right={
      <Card title="Beneficio">
        <ul>
          <li>Reduce el <b>bundle inicial</b>: la app abre más rápido.</li>
          <li><code>lazy</code> carga el módulo bajo demanda.</li>
          <li><code>Suspense</code> muestra algo mientras carga.</li>
        </ul>
        <p className="muted" style={{ marginTop: '0.5rem' }}>Este portal ya carga las diapositivas así.</p>
      </Card>
    }
  />,

  // 24 · Variables de entorno + buenas prácticas
  <CardsGrid
    key="s24"
    cols={3}
    eyebrow="Hábitos profesionales"
    title="Buenas prácticas"
    cards={[
      { title: 'Variables de entorno', body: 'Config en .env (S3/S5), nunca quemada en el código.' },
      { title: 'Componentes pequeños', body: 'Un solo propósito por componente; fáciles de leer y probar.' },
      { title: 'Nombres claros', body: 'Evitar duplicación y formatear con Prettier.' },
    ]}
  />,

  // 25 · Antes/después de la app
  <Slide key="s25" center>
    <span className="eyebrow">El resultado</span>
    <h2>De recargado a limpio y rápido</h2>
    <Flow
      style={{ marginTop: '1.4rem' }}
      steps={['Componente recargado', 'hooks + memo + lazy', { label: 'Limpio y rápido', ok: true }]}
    />
    <p className="muted" style={{ marginTop: '1.6rem' }}>
      Misma app, mejor por dentro: ordenada, reutilizable y veloz. 🚀
    </p>
  </Slide>,

  // ─────────────────────────── BLOQUE 4 ───────────────────────────
  // 26 · Divider 4
  <SectionDivider key="s26" center num="04" eyebrow="Bloque 4" title="Laboratorio" subtitle="Refactorizar y optimizar. ⌨️" />,

  // 27 · Laboratorio paso a paso
  <CardsGrid key="s27" eyebrow="Práctica guiada" title="Laboratorio paso a paso">
    <Card title="① Extraer custom hooks">
      <ul>
        <li>Crear <code>hooks/useAuth.js</code> y <code>hooks/useTasks.js</code>.</li>
        <li>Reemplazar la lógica repetida por estos hooks.</li>
      </ul>
    </Card>
    <Card title="② Memoizar cálculos">
      <ul>
        <li>Un cálculo derivado (tareas completadas, conteos).</li>
        <li>Envolverlo en <code>useMemo</code>.</li>
      </ul>
    </Card>
    <Card title="③ Memoizar funciones">
      <ul>
        <li>Funciones que se pasan a componentes hijos.</li>
        <li>Envolverlas en <code>useCallback</code>.</li>
      </ul>
    </Card>
    <Card title="④ Lazy loading">
      <ul>
        <li>Cargar una página pesada con <code>lazy</code> + <code>Suspense</code>.</li>
        <li>Ver el <b>chunk aparte</b> en el build.</li>
      </ul>
    </Card>
  </CardsGrid>,

  // 28 · Estructura tras la sesión
  <TwoColumn
    key="s28"
    eyebrow="¿Qué cambió?"
    title="Estructura tras la Sesión 7"
    left={<div className="card"><div className="tree" dangerouslySetInnerHTML={{ __html: treeFinal }} /></div>}
    right={
      <>
        <p className="lead">Se puebla <code>hooks/</code> y los componentes adelgazan.</p>
        <ul style={{ marginTop: '0.8rem' }}>
          <li><b>hooks/</b> <Arr /> useAuth, useTasks (nuevos).</li>
          <li><b>pages/</b> <Arr /> usan los hooks; más limpias.</li>
          <li><b>components/</b> <Arr /> solo pintan.</li>
          <li>Sin cambios de comportamiento.</li>
        </ul>
      </>
    }
  />,

  // 29 · Errores frecuentes
  <CardsGrid
    key="s29"
    cols={3}
    eyebrow="Para no tropezar"
    title="Errores frecuentes"
    cards={[
      { title: 'Hook sin prefijo use', titleClass: 'orange', body: 'React no aplica las reglas. Nómbralo useAlgo.' },
      { title: 'Hooks en if/for', titleClass: 'orange', body: 'Error "rendered more/fewer hooks". Llámalos arriba.' },
      { title: 'Dependencias incompletas', titleClass: 'orange', body: 'Datos viejos (stale). Incluye todo lo que usa el cálculo.' },
      { title: 'Memoizar de más', body: 'Complejidad sin ganancia. Mide primero.' },
      { title: 'lazy sin Suspense', body: 'Error al renderizar. Envuelve con Suspense.' },
      { title: 'No limpiar efectos', body: 'Fugas de listeners. Devuelve la limpieza en useEffect.' },
    ]}
  />,

  // 30 · Checklist
  <Slide key="s30">
    <span className="eyebrow">Antes de cerrar</span>
    <h2>Checklist de la sesión</h2>
    <ul className="checks big" style={{ marginTop: '1rem' }}>
      <li>Entiendo la separación por responsabilidades.</li>
      <li>Creé custom hooks (useAuth, useTasks) y limpié componentes.</li>
      <li>Uso useMemo y useCallback cuando aportan.</li>
      <li>Apliqué lazy loading con lazy + Suspense.</li>
      <li>Sé cuándo NO optimizar.</li>
    </ul>
  </Slide>,

  // 31 · Resumen
  <Slide key="s31">
    <span className="eyebrow">Lo que aprendiste hoy</span>
    <h2>Resumen de la sesión</h2>
    <div className="grid g2" style={{ marginTop: '0.8rem' }}>
      <Card title="Arquitectura">
        <p className="muted">
          Cada cosa en su lugar: componentes que <b>pintan</b>, hooks que <b>encapsulan lógica</b> y
          services que <b>hablan con datos</b>.
        </p>
      </Card>
      <Card title="Optimización">
        <p className="muted">
          Recalcular solo lo necesario (<b>useMemo</b>/<b>useCallback</b>) y cargar bajo demanda
          (<b>lazy loading</b>), midiendo antes de optimizar.
        </p>
      </Card>
    </div>
    <p className="lead" style={{ marginTop: '1.2rem' }}>
      📌 Idea central: <span className="accent">código ordenado y que solo recalcula lo necesario</span>.
    </p>
  </Slide>,

  // 32 · Próxima sesión + cierre
  <Slide key="s32" center>
    <ReactLogo spin="6s" />
    <span className="eyebrow">Próxima sesión · Cierre del curso</span>
    <h2 style={{ fontSize: '2.3rem' }}>Sesión 8 - Git, CI/CD y Despliegue en Firebase</h2>
    <div className="grid g2" style={{ marginTop: '1.2rem', maxWidth: '60vw' }}>
      <Card title="Git + GitHub"><p className="muted">Commits, branches y flujo de trabajo profesional.</p></Card>
      <Card title="CI/CD"><p className="muted">GitHub Actions y despliegue automático en Firebase Hosting.</p></Card>
    </div>
    <p className="muted" style={{ marginTop: '1.2rem' }}>
      <b>Tarea:</b> refactoriza con custom hooks y aplica al menos una optimización.
    </p>
    <p className="muted" style={{ marginTop: '0.8rem' }}>¿Preguntas? 🙌 ¡Nos vemos en la Sesión 8!</p>
  </Slide>,
]

export default slides
