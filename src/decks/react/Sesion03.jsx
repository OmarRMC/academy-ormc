// ─────────────────────────────────────────────────────────────────────────
// Curso React · Sesión 3 - Consumo de APIs REST con Axios
// Cada elemento del array `slides` es una diapositiva. El componente <Deck>
// se encarga de la navegación, el progreso y la pantalla completa.
// Usa `center` en un nodo para centrar esa diapositiva.
//
// NOTA: la URL base de los ejemplos es genérica (api.ejemplo.com / VITE_API_URL).
// Reemplazar por la API definitiva cuando se decida (ver docs/SESION-03-PLANIFICACION.md §6).
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
  session: 3,
  title: 'Consumo de APIs REST con Axios',
}

// ── Bloques de código (HTML con tokens .tok-*) ────────────────────────────

const codeJson = `{
  <span class="tok-attr">"id"</span>: <span class="tok-num">1</span>,
  <span class="tok-attr">"titulo"</span>: <span class="tok-str">"Estudiar React"</span>,
  <span class="tok-attr">"completada"</span>: <span class="tok-key">false</span>
}`

const codeEndpoints = `<span class="tok-key">GET</span>    /tareas       <span class="tok-com">→ lista de tareas</span>
<span class="tok-key">GET</span>    /tareas/42    <span class="tok-com">→ una tarea</span>
<span class="tok-key">POST</span>   /tareas       <span class="tok-com">→ crear una tarea</span>
<span class="tok-key">PUT</span>    /tareas/42    <span class="tok-com">→ actualizar la tarea 42</span>
<span class="tok-key">DELETE</span> /tareas/42    <span class="tok-com">→ eliminar la tarea 42</span>`

const codeInstall = `<span class="tok-com"># Instalar Axios</span>
npm install axios`

const codeGet = `<span class="tok-key">import</span> axios <span class="tok-key">from</span> <span class="tok-str">"axios"</span>;

<span class="tok-com">// La respuesta llega en res.data (ya convertido de JSON)</span>
<span class="tok-key">const</span> res = <span class="tok-key">await</span> axios.<span class="tok-fn">get</span>(<span class="tok-str">"https://api.ejemplo.com/tareas"</span>);
<span class="tok-fn">console</span>.log(res.data);  <span class="tok-com">// ← array de tareas</span>`

const codeGetReact = `<span class="tok-key">const</span> [tareas, setTareas] = <span class="tok-fn">useState</span>([]);

<span class="tok-fn">useEffect</span>(() =&gt; {
  axios.<span class="tok-fn">get</span>(<span class="tok-str">"/tareas"</span>).<span class="tok-fn">then</span>((res) =&gt; <span class="tok-fn">setTareas</span>(res.data));
}, []);  <span class="tok-com">// [] → se ejecuta una sola vez</span>

<span class="tok-key">return</span> tareas.<span class="tok-fn">map</span>((t) =&gt; &lt;<span class="tok-tag">TaskCard</span> <span class="tok-attr">key</span>={t.id} {...t} /&gt;);`

const codeLoading = `<span class="tok-key">const</span> [cargando, setCargando] = <span class="tok-fn">useState</span>(<span class="tok-key">true</span>);
<span class="tok-key">const</span> [error, setError] = <span class="tok-fn">useState</span>(<span class="tok-key">null</span>);

<span class="tok-fn">useEffect</span>(() =&gt; {
  axios.<span class="tok-fn">get</span>(<span class="tok-str">"/tareas"</span>)
    .<span class="tok-fn">then</span>((res) =&gt; <span class="tok-fn">setTareas</span>(res.data))
    .<span class="tok-fn">catch</span>(() =&gt; <span class="tok-fn">setError</span>(<span class="tok-str">"No se pudo cargar"</span>))
    .<span class="tok-fn">finally</span>(() =&gt; <span class="tok-fn">setCargando</span>(<span class="tok-key">false</span>));
}, []);`

const codePost = `<span class="tok-key">const</span> nueva = { titulo: <span class="tok-str">"Leer docs"</span>, completada: <span class="tok-key">false</span> };
<span class="tok-key">const</span> res = <span class="tok-key">await</span> axios.<span class="tok-fn">post</span>(<span class="tok-str">"/tareas"</span>, nueva);

<span class="tok-com">// Reflejar en la UI sin recargar</span>
<span class="tok-fn">setTareas</span>((prev) =&gt; [...prev, res.data]);`

const codePut = `<span class="tok-key">const</span> res = <span class="tok-key">await</span> axios.<span class="tok-fn">put</span>(<span class="tok-str">\`/tareas/\${id}\`</span>, { completada: <span class="tok-key">true</span> });

<span class="tok-fn">setTareas</span>((prev) =&gt;
  prev.<span class="tok-fn">map</span>((t) =&gt; (t.id === id ? res.data : t))
);`

const codeDelete = `<span class="tok-key">await</span> axios.<span class="tok-fn">delete</span>(<span class="tok-str">\`/tareas/\${id}\`</span>);

<span class="tok-fn">setTareas</span>((prev) =&gt; prev.<span class="tok-fn">filter</span>((t) =&gt; t.id !== id));`

const codeInstance = `<span class="tok-com">// src/api/axios.js</span>
<span class="tok-key">import</span> axios <span class="tok-key">from</span> <span class="tok-str">"axios"</span>;

<span class="tok-key">export const</span> api = axios.<span class="tok-fn">create</span>({
  baseURL: <span class="tok-str">"https://api.ejemplo.com"</span>,
  timeout: <span class="tok-num">8000</span>,
});

<span class="tok-com">// Uso: api.get("/tareas"), api.post("/tareas", data)</span>`

const codeEnv = `<span class="tok-com"># .env (en la raíz; NO se sube a Git)</span>
VITE_API_URL=https://api.ejemplo.com`

const codeEnvUse = `<span class="tok-com">// dentro de api/axios.js</span>
baseURL: <span class="tok-fn">import</span>.meta.env.VITE_API_URL,`

const codeService = `<span class="tok-com">// src/services/taskService.js</span>
<span class="tok-key">import</span> { api } <span class="tok-key">from</span> <span class="tok-str">"../api/axios"</span>;

<span class="tok-key">export const</span> taskService = {
  listar: () =&gt; api.<span class="tok-fn">get</span>(<span class="tok-str">"/tareas"</span>).<span class="tok-fn">then</span>((r) =&gt; r.data),
  crear: (data) =&gt; api.<span class="tok-fn">post</span>(<span class="tok-str">"/tareas"</span>, data).<span class="tok-fn">then</span>((r) =&gt; r.data),
  actualizar: (id, data) =&gt; api.<span class="tok-fn">put</span>(<span class="tok-str">\`/tareas/\${id}\`</span>, data).<span class="tok-fn">then</span>((r) =&gt; r.data),
  eliminar: (id) =&gt; api.<span class="tok-fn">delete</span>(<span class="tok-str">\`/tareas/\${id}\`</span>),
};`

const codeInterceptor = `<span class="tok-com">// Se ejecuta en CADA petición antes de enviarla</span>
api.interceptors.request.<span class="tok-fn">use</span>((config) =&gt; {
  <span class="tok-key">const</span> token = localStorage.<span class="tok-fn">getItem</span>(<span class="tok-str">"token"</span>);
  <span class="tok-key">if</span> (token) config.headers.Authorization = <span class="tok-str">\`Bearer \${token}\`</span>;
  <span class="tok-key">return</span> config;
});`

const codeTryCatch = `<span class="tok-key">try</span> {
  <span class="tok-key">const</span> tareas = <span class="tok-key">await</span> taskService.<span class="tok-fn">listar</span>();
  <span class="tok-fn">setTareas</span>(tareas);
} <span class="tok-key">catch</span> (err) {
  <span class="tok-com">// err.response?.status → 404, 500…</span>
  <span class="tok-fn">setError</span>(<span class="tok-str">"Ocurrió un error al cargar las tareas"</span>);
} <span class="tok-key">finally</span> {
  <span class="tok-fn">setCargando</span>(<span class="tok-key">false</span>);
}`

// Estructura de carpetas tras la Sesión 3
const treeFinal = `<span class="dir">src/</span>
&nbsp;├─ <span class="dir">api/</span>
&nbsp;│&nbsp;&nbsp;└─ axios.js &nbsp;&nbsp;<span class="cmt"># instancia con baseURL</span>
&nbsp;├─ <span class="dir">services/</span>
&nbsp;│&nbsp;&nbsp;└─ taskService.js <span class="cmt"># listar · crear · actualizar · eliminar</span>
&nbsp;├─ <span class="dir">pages/</span>
&nbsp;│&nbsp;&nbsp;└─ Tareas.jsx <span class="cmt"># GET + estado (ya conectada)</span>
&nbsp;└─ .env &nbsp;&nbsp;&nbsp;&nbsp;<span class="cmt"># VITE_API_URL (en .gitignore)</span>`

export const slides = [
  // 1 · Portada
  <TitleSlide
    key="s1"
    center
    logo
    eyebrow="Módulo I · Sesión 3"
    title={
      <>
        Consumo de <span className="accent">APIs REST</span>
        <br />con Axios
      </>
    }
    subtitle="Desarrollo Front-End Profesional con React, Firebase y CI/CD"
    meta={
      <>
        Expositor: <b>Omar Rodrigo Mamani Capcha</b> · Duración: 1h 30min
      </>
    }
  />,

  // 2 · Repaso de la Sesión 2
  <CardsGrid
    key="s2"
    cols={3}
    eyebrow="Antes de empezar"
    title="¿Qué vimos en la Sesión 2?"
    cards={[
      { title: 'Componentes', body: 'Reutilizables, props, children, eventos y listas con key.' },
      { title: 'Navegación', body: 'React Router: rutas, Link/NavLink, layouts y rutas protegidas.' },
      { title: 'Hoy: datos reales', body: 'Hasta ahora las tareas eran datos inventados. Hoy vendrán de un servidor real. 🌐' },
    ]}
  />,

  // 3 · Agenda
  <CardsGrid
    key="s3"
    eyebrow="Hoja de ruta"
    title="Agenda de la sesión"
    cards={[
      { title: '1 · Fundamentos', body: 'Qué es una API REST, el formato JSON y los métodos HTTP.' },
      { title: '2 · Axios', body: 'GET/POST/PUT/DELETE, instancias, variables de entorno, interceptores y manejo de errores.' },
      { title: '3 · Laboratorio', body: 'Conectar el proyecto a una API REST e implementar el CRUD de tareas.' },
      { title: 'Meta de hoy', body: 'Una lista de tareas que lee, crea, edita y elimina contra un servidor.' },
    ]}
  />,

  // 4 · Objetivos
  <BulletSlide
    key="s4"
    eyebrow="¿Qué lograrás hoy?"
    title="Objetivos de aprendizaje"
    variant="checks"
    items={[
      <>Explicar qué es una <b>API REST</b>, el modelo <b>cliente-servidor</b> y <b>JSON</b>.</>,
      <>Reconocer los <b>métodos HTTP</b> y los <b>códigos de estado</b>.</>,
      <>Usar <b>Axios</b> para leer datos con <code>useEffect</code> + <code>useState</code>.</>,
      <>Implementar el <b>CRUD completo</b>: crear, actualizar y eliminar.</>,
      <>Centralizar con una <b>instancia</b> y <b>variables de entorno</b> (<code>.env</code>).</>,
      <>Añadir <b>interceptores</b> y un <b>manejo de errores</b> robusto.</>,
    ]}
  />,

  // ─────────────────────────── BLOQUE 1 ───────────────────────────
  // 5 · Divider 1
  <SectionDivider key="s5" center num="01" eyebrow="Bloque 1" title="Fundamentos: API REST" subtitle="El lenguaje con el que hablan frontend y backend." />,

  // 6 · ¿Qué es una API REST?
  <TwoColumn
    key="s6"
    eyebrow="Concepto"
    title="¿Qué es una API REST?"
    left={
      <>
        <p className="lead">
          Imagina un <span className="accent">restaurante</span> 🍽️: tú (el frontend) pides, la
          <b> cocina</b> (servidor) prepara y el <b>mesero</b> (la API) lleva y trae los platos.
        </p>
        <ul style={{ marginTop: '1rem' }}>
          <li><b>API:</b> el puente para que dos programas se comuniquen.</li>
          <li><b>REST:</b> un estilo de reglas sobre <b>HTTP</b>.</li>
          <li>El frontend <b>pide</b>; el servidor <b>responde</b>.</li>
        </ul>
      </>
    }
    right={
      <Card title="¿Por qué nos importa?">
        <p className="muted">
          Nuestras tareas vivirán en un <b>servidor</b>. React solo se encarga de <b>pedirlas</b> y
          <b> mostrarlas</b>: nunca toca la base de datos directamente.
        </p>
        <div className="tag-row">
          <span className="pill">HTTP</span>
          <span className="pill">JSON</span>
          <span className="pill">Endpoints</span>
        </div>
      </Card>
    }
  />,

  // 7 · Cliente ↔ Servidor
  <Slide key="s7">
    <span className="eyebrow">Cómo viaja una petición</span>
    <h2>Cliente ↔ Servidor</h2>
    <p className="lead" style={{ marginTop: '0.3rem' }}>
      El frontend envía una <b>petición HTTP</b> y recibe una <b>respuesta en JSON</b>.
    </p>
    <Flow
      style={{ marginTop: '1.4rem' }}
      steps={['Frontend (React)', 'Petición HTTP', 'Servidor / API', { label: 'Respuesta (JSON)', ok: true }]}
    />
    <div className="grid g2" style={{ marginTop: '1.3rem' }}>
      <Card title="El frontend">
        <p className="muted">Pide datos, los muestra y captura las acciones del usuario.</p>
      </Card>
      <Card title="El servidor">
        <p className="muted">Guarda la información, aplica la lógica y devuelve la respuesta.</p>
      </Card>
    </div>
  </Slide>,

  // 8 · JSON
  <TwoColumn
    key="s8"
    eyebrow="El idioma de los datos"
    title="JSON"
    lead={<>Un formato <b>neutral</b> que entienden tanto el servidor (PHP, Node…) como React.</>}
    left={<CodeBlock html={codeJson} />}
    right={
      <Card title="Estructura">
        <ul>
          <li>Objetos entre <code>{'{ }'}</code> y listas entre <code>[ ]</code>.</li>
          <li>Pares <b>clave: valor</b>.</li>
          <li>Valores: texto, número, booleano, array u objeto.</li>
          <li>Las claves siempre entre <b>comillas dobles</b>.</li>
        </ul>
      </Card>
    }
  />,

  // 9 · Métodos HTTP
  <CardsGrid
    key="s9"
    eyebrow="Los verbos de la API"
    title="Métodos HTTP = CRUD"
    cards={[
      { title: 'GET · Leer (Read)', titleClass: 'green', body: 'Obtiene datos. Ej.: traer la lista de tareas.' },
      { title: 'POST · Crear (Create)', body: 'Envía datos nuevos. Ej.: agregar una tarea.' },
      { title: 'PUT · Actualizar (Update)', titleClass: 'orange', body: 'Modifica un recurso existente. Ej.: marcar como completada.' },
      { title: 'DELETE · Eliminar (Delete)', body: 'Borra un recurso. Ej.: quitar una tarea.' },
    ]}
  />,

  // 10 · Endpoints
  <TwoColumn
    key="s10"
    eyebrow="Direcciones de la API"
    title="Endpoints y recursos"
    lead={<>Mismo recurso <code>/tareas</code>, distinto <b>verbo</b> = distinta acción.</>}
    left={<CodeBlock html={codeEndpoints} />}
    right={
      <Card title="Clave mental">
        <ul>
          <li>Un <b>endpoint</b> es la URL de un recurso.</li>
          <li>El <b>método</b> dice qué hacer con él.</li>
          <li><code>/tareas/:id</code> apunta a <b>una</b> tarea concreta.</li>
        </ul>
      </Card>
    }
  />,

  // 11 · Códigos de estado
  <CardsGrid
    key="s11"
    cols={3}
    eyebrow="El semáforo de la respuesta 🚦"
    title="Códigos de estado HTTP"
    cards={[
      { title: '2xx · Éxito', titleClass: 'green', body: '200 OK · 201 Created. La operación salió bien.' },
      { title: '4xx · Error del cliente', titleClass: 'orange', body: '400 Bad Request · 401 No autorizado · 404 No encontrado.' },
      { title: '5xx · Error del servidor', body: '500 Internal Server Error. Falló del lado del backend.' },
    ]}
  />,

  // ─────────────────────────── BLOQUE 2 ───────────────────────────
  // 12 · Divider 2
  <SectionDivider key="s12" center num="02" eyebrow="Bloque 2" title="Axios: consumir la API" subtitle="De la teoría al CRUD funcionando." />,

  // 13 · ¿Qué es Axios?
  <TwoColumn
    key="s13"
    eyebrow="Nuestro cliente HTTP"
    title="¿Qué es Axios?"
    lead={<>Una librería para hacer peticiones HTTP de forma <b>cómoda</b> y <b>clara</b>.</>}
    left={<CodeBlock html={codeInstall} />}
    right={
      <Card title="Axios vs fetch">
        <ul>
          <li>Convierte la respuesta a <b>JSON automáticamente</b>.</li>
          <li>Mejor <b>manejo de errores</b>.</li>
          <li>Permite <b>instancias</b> e <b>interceptores</b>.</li>
          <li>Sintaxis más corta y legible.</li>
        </ul>
      </Card>
    }
  />,

  // 14 · GET
  <TwoColumn
    key="s14"
    eyebrow="Leer datos"
    title="GET: traer las tareas"
    lead={<>La respuesta llega en <code>res.data</code> (Axios ya hizo el <code>JSON.parse</code>).</>}
    left={<CodeBlock html={codeGet} />}
    right={
      <Card title="Lo esencial">
        <ul>
          <li><code>axios.get(url)</code> devuelve una <b>promesa</b>.</li>
          <li>Los datos están en <code>res.data</code>, <b>no</b> en <code>res</code>.</li>
          <li>Con <code>await</code> esperamos la respuesta.</li>
        </ul>
      </Card>
    }
  />,

  // 15 · GET en React
  <TwoColumn
    key="s15"
    eyebrow="El patrón clave"
    title="GET con useEffect + useState"
    lead={<>Cargamos los datos <b>al montar</b> el componente y los guardamos en estado.</>}
    left={<CodeBlock html={codeGetReact} />}
    right={
      <Card title="¿Por qué así?">
        <ul>
          <li><code>useState</code> <Arr /> guarda las tareas.</li>
          <li><code>useEffect</code> <Arr /> ejecuta la carga.</li>
          <li>El <code>[]</code> evita un <b>bucle infinito</b>.</li>
        </ul>
        <p className="muted" style={{ marginTop: '0.5rem' }}>Lo que antes era un array inventado, ahora viene de la API.</p>
      </Card>
    }
  />,

  // 16 · Loading / error
  <TwoColumn
    key="s16"
    eyebrow="Una petición tiene 3 momentos"
    title="Estados de carga y error"
    lead={<><b>Cargando</b> → <b>éxito</b> → <b>error</b>. Siempre los contemplamos.</>}
    left={<CodeBlock html={codeLoading} />}
    right={
      <Card title="En la interfaz">
        <ul>
          <li><code>if (cargando)</code> <Arr /> mostrar un <b>spinner</b>.</li>
          <li><code>if (error)</code> <Arr /> mostrar un <b>aviso</b>.</li>
          <li>Si todo va bien <Arr /> renderizar la <b>lista</b>.</li>
        </ul>
        <p className="muted" style={{ marginTop: '0.5rem' }}>Nunca dejes la pantalla en blanco si la API falla.</p>
      </Card>
    }
  />,

  // 17 · POST
  <TwoColumn
    key="s17"
    eyebrow="Crear (Create)"
    title="POST: agregar una tarea"
    lead={<>Enviamos el objeto nuevo y <b>actualizamos el estado</b> con la respuesta.</>}
    left={<CodeBlock html={codePost} />}
    right={
      <Card title="Patrón">
        <ul>
          <li><code>axios.post(url, datos)</code>.</li>
          <li>El servidor devuelve la tarea creada (con su <code>id</code>).</li>
          <li>La añadimos: <code>[...prev, res.data]</code>.</li>
        </ul>
      </Card>
    }
  />,

  // 18 · PUT
  <TwoColumn
    key="s18"
    eyebrow="Actualizar (Update)"
    title="PUT: editar una tarea"
    lead={<>Apuntamos a <code>/tareas/:id</code> y reemplazamos esa tarea en el estado.</>}
    left={<CodeBlock html={codePut} />}
    right={
      <Card title="Patrón">
        <ul>
          <li><code>axios.put(url, cambios)</code>.</li>
          <li>Usamos <code>.map()</code> para sustituir <b>solo</b> la tarea editada.</li>
          <li>Ej.: marcar <code>completada: true</code>.</li>
        </ul>
      </Card>
    }
  />,

  // 19 · DELETE
  <TwoColumn
    key="s19"
    eyebrow="Eliminar (Delete)"
    title="DELETE: quitar una tarea"
    lead={<>Borramos en el servidor y <b>filtramos</b> el estado para reflejarlo al instante.</>}
    left={<CodeBlock html={codeDelete} />}
    right={
      <Card title="Patrón">
        <ul>
          <li><code>axios.delete(url)</code>.</li>
          <li><code>.filter()</code> quita la tarea de la lista.</li>
          <li>Sin recargar la página.</li>
        </ul>
      </Card>
    }
  />,

  // 20 · CRUD completo
  <CardsGrid
    key="s20"
    eyebrow="Todo junto"
    title="El CRUD completo de un vistazo"
    cards={[
      { title: 'Leer · GET /tareas', titleClass: 'green', body: 'res.data → setTareas(res.data)' },
      { title: 'Crear · POST /tareas', body: 'setTareas([...prev, nueva])' },
      { title: 'Actualizar · PUT /tareas/:id', titleClass: 'orange', body: 'setTareas(prev.map(...))' },
      { title: 'Eliminar · DELETE /tareas/:id', body: 'setTareas(prev.filter(...))' },
    ]}
  />,

  // 21 · Instancia de Axios
  <TwoColumn
    key="s21"
    eyebrow="Configuración central"
    title="Una instancia de Axios"
    lead={<>Repetir la URL base en cada llamada es frágil. La centralizamos en <code>src/api/</code>.</>}
    left={<CodeBlock html={codeInstance} />}
    right={
      <Card title="Ventajas">
        <ul>
          <li><code>baseURL</code> <Arr /> escribes solo <code>/tareas</code>.</li>
          <li><code>timeout</code>, cabeceras y más, en un solo lugar.</li>
          <li>Reutilizable en <b>toda</b> la app.</li>
        </ul>
      </Card>
    }
  />,

  // 22 · Variables de entorno
  <TwoColumn
    key="s22"
    eyebrow="Sin URLs quemadas en el código"
    title="Variables de entorno (.env)"
    lead={<>La URL cambia entre desarrollo y producción: la guardamos en <code>.env</code>.</>}
    left={
      <>
        <CodeBlock html={codeEnv} />
        <div style={{ marginTop: '0.6rem' }}>
          <CodeBlock html={codeEnvUse} />
        </div>
      </>
    }
    right={
      <Card title="Reglas en Vite">
        <ul>
          <li>Deben empezar por <code>VITE_</code> para verse en el frontend.</li>
          <li>Se leen con <code>import.meta.env.VITE_...</code>.</li>
          <li>⚠️ Añade <code>.env</code> al <code>.gitignore</code>.</li>
          <li>Reinicia el server tras crear/editar el <code>.env</code>.</li>
        </ul>
      </Card>
    }
  />,

  // 23 · Capa de servicios
  <TwoColumn
    key="s23"
    eyebrow="Buenas prácticas"
    title="Capa de servicios (services/)"
    lead={<>Los componentes <b>no</b> llaman a Axios directo: usan un <b>servicio</b>.</>}
    left={<CodeBlock html={codeService} />}
    right={
      <Card title="¿Por qué?">
        <ul>
          <li>El componente solo pide: <code>taskService.listar()</code>.</li>
          <li>Si cambia la API, tocas <b>un solo archivo</b>.</li>
          <li>Código más <b>limpio</b> y <b>testeable</b>.</li>
        </ul>
      </Card>
    }
  />,

  // 24 · Interceptores
  <TwoColumn
    key="s24"
    eyebrow="Filtro para todas las peticiones"
    title="Interceptores"
    lead={<>Una <b>aduana</b> 🛂 por la que pasan <b>todas</b> las peticiones o respuestas.</>}
    left={<CodeBlock html={codeInterceptor} />}
    right={
      <Card title="Usos típicos">
        <ul>
          <li>Añadir el <b>token</b> a cada request automáticamente.</li>
          <li>Registrar o <b>normalizar errores</b> en cada response.</li>
          <li>🔌 Este token será el de <b>Firebase Auth</b> (Sesión 5).</li>
        </ul>
      </Card>
    }
  />,

  // 25 · Manejo de errores
  <TwoColumn
    key="s25"
    eyebrow="Cuando algo sale mal"
    title="Manejo de errores"
    lead={<><code>try / catch / finally</code> y leer <code>error.response</code>.</>}
    left={<CodeBlock html={codeTryCatch} />}
    right={
      <Card title="Claves">
        <ul>
          <li><code>catch</code> captura el fallo; <code>finally</code> siempre corre.</li>
          <li><code>error.response.status</code> <Arr /> el código (404, 500…).</li>
          <li>Mostrar un aviso al usuario (bonito en S4 con <b>Toastify</b>).</li>
        </ul>
      </Card>
    }
  />,

  // 26 · Flujo completo
  <Slide key="s26" center>
    <span className="eyebrow">De punta a punta</span>
    <h2>Flujo completo de una petición</h2>
    <Flow
      style={{ marginTop: '1.4rem' }}
      steps={['Componente', 'taskService', 'Instancia Axios', 'API REST', { label: 'JSON → setState → UI', ok: true }]}
    />
    <p className="muted" style={{ marginTop: '1.6rem' }}>
      Cada pieza tiene <b>una responsabilidad</b>: así el código escala sin volverse un caos. 🧩
    </p>
  </Slide>,

  // ─────────────────────────── BLOQUE 3 ───────────────────────────
  // 27 · Divider 3
  <SectionDivider key="s27" center num="03" eyebrow="Bloque 3" title="Laboratorio" subtitle="Conectamos el proyecto a la API. ⌨️" />,

  // 28 · Laboratorio paso a paso
  <CardsGrid key="s28" eyebrow="Práctica guiada" title="Laboratorio paso a paso">
    <Card title="① Configuración">
      <ul>
        <li><code>npm install axios</code>.</li>
        <li>Crear <code>.env</code> con <code>VITE_API_URL</code> y añadirlo a <code>.gitignore</code>.</li>
        <li>Instancia en <code>src/api/axios.js</code> con <code>baseURL</code>.</li>
      </ul>
    </Card>
    <Card title="② Servicio + lectura (GET)">
      <ul>
        <li>Crear <code>src/services/taskService.js</code>.</li>
        <li>En <code>pages/Tareas.jsx</code>: <code>useEffect</code> + <code>useState</code>.</li>
        <li>Estados <b>cargando</b> y <b>error</b> en la UI.</li>
      </ul>
    </Card>
    <Card title="③ Crear y editar (POST / PUT)">
      <ul>
        <li>Formulario que haga <b>POST</b> y añada al estado.</li>
        <li>Botón “completar” que haga <b>PUT</b> y actualice.</li>
      </ul>
    </Card>
    <Card title="④ Eliminar (DELETE) + interceptor">
      <ul>
        <li>Botón 🗑 que haga <b>DELETE</b> y filtre el estado.</li>
        <li>Interceptor que registre cada petición en consola.</li>
      </ul>
    </Card>
  </CardsGrid>,

  // 29 · Estructura tras la sesión
  <TwoColumn
    key="s29"
    eyebrow="¿Dónde cae cada archivo?"
    title="Estructura tras la Sesión 3"
    left={<div className="card"><div className="tree" dangerouslySetInnerHTML={{ __html: treeFinal }} /></div>}
    right={
      <>
        <p className="lead">Cobran vida las carpetas <code>api/</code> y <code>services/</code>.</p>
        <ul style={{ marginTop: '0.8rem' }}>
          <li><b>api/</b> → la instancia de Axios (<code>baseURL</code>).</li>
          <li><b>services/</b> → la lógica de datos (<code>taskService</code>).</li>
          <li><b>pages/</b> → la vista, ya conectada a la API.</li>
          <li><b>.env</b> → la URL, fuera del código y de Git.</li>
        </ul>
      </>
    }
  />,

  // 30 · Errores frecuentes
  <CardsGrid
    key="s30"
    cols={3}
    eyebrow="Para no tropezar"
    title="Errores frecuentes"
    cards={[
      { title: 'Olvidar res.data', titleClass: 'orange', body: 'Los datos están en res.data, no en res.' },
      { title: 'useEffect sin []', titleClass: 'orange', body: 'Provoca peticiones infinitas. Pasa el array de dependencias.' },
      { title: 'Mutar el estado', titleClass: 'orange', body: 'Usa copias: [...prev], prev.map, prev.filter.' },
      { title: 'Variable sin VITE_', body: 'import.meta.env queda undefined. Debe ser VITE_...' },
      { title: 'Subir .env a Git', body: 'Fuga de URLs/claves. Añádelo a .gitignore.' },
      { title: 'No manejar errores', body: 'Pantalla en blanco si la API falla. Usa try/catch.' },
    ]}
  />,

  // 31 · Checklist
  <Slide key="s31">
    <span className="eyebrow">Antes de cerrar</span>
    <h2>Checklist de la sesión</h2>
    <ul className="checks big" style={{ marginTop: '1rem' }}>
      <li>Entiendo API REST, JSON y los métodos HTTP.</li>
      <li>Hago GET con useEffect + useState y manejo cargando/error.</li>
      <li>Implementé POST, PUT y DELETE (CRUD completo).</li>
      <li>Tengo una instancia de Axios con baseURL desde .env.</li>
      <li>Separé la lógica en services/ y añadí un interceptor.</li>
    </ul>
  </Slide>,

  // 32 · Resumen
  <Slide key="s32">
    <span className="eyebrow">Lo que aprendiste hoy</span>
    <h2>Resumen de la sesión</h2>
    <div className="grid g2" style={{ marginTop: '0.8rem' }}>
      <Card title="Fundamentos">
        <p className="muted">
          El frontend pide datos por <b>HTTP</b>; <b>JSON</b> es el idioma común; los <b>verbos</b>
          (GET/POST/PUT/DELETE) son el <b>CRUD</b>.
        </p>
      </Card>
      <Card title="Axios">
        <p className="muted">
          <b>Instancia</b> + <b>services</b> + <b>interceptores</b> + manejo de <b>errores</b> =
          código limpio, central y mantenible.
        </p>
      </Card>
    </div>
    <p className="lead" style={{ marginTop: '1.2rem' }}>
      📌 Idea central: <span className="accent">pedir → recibir JSON → guardar en estado → renderizar</span>.
    </p>
  </Slide>,

  // 33 · Próxima sesión + cierre
  <Slide key="s33" center>
    <ReactLogo spin="6s" />
    <span className="eyebrow">Próxima sesión</span>
    <h2 style={{ fontSize: '2.4rem' }}>Sesión 4 - Estado Global y Formularios</h2>
    <div className="grid g2" style={{ marginTop: '1.2rem', maxWidth: '60vw' }}>
      <Card title="Zustand"><p className="muted">Estado global sin “prop drilling”: store, acciones y selectores.</p></Card>
      <Card title="Formularios"><p className="muted">React Hook Form + validaciones y avisos con React Toastify.</p></Card>
    </div>
    <p className="muted" style={{ marginTop: '1.2rem' }}>
      <b>Tarea:</b> deja el <b>CRUD de tareas funcionando</b> contra la API.
    </p>
    <p className="muted" style={{ marginTop: '0.8rem' }}>¿Preguntas? 🙌 ¡Nos vemos en la Sesión 4!</p>
  </Slide>,
]

export default slides
