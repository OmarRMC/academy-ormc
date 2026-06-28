// ─────────────────────────────────────────────────────────────────────────
// Curso React · Sesión 6 - Cloud Firestore
// Cada elemento del array `slides` es una diapositiva. El componente <Deck>
// se encarga de la navegación, el progreso y la pantalla completa.
//
// Código verificado contra la documentación oficial de Firestore
// (SDK modular v12, imports desde firebase/firestore).
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
  session: 6,
  title: 'Cloud Firestore',
}

// ── Bloques de código (HTML con tokens .tok-*) ────────────────────────────

const codeConfig = `<span class="tok-com">// src/firebase/config.js (se añade db)</span>
<span class="tok-key">import</span> { initializeApp } <span class="tok-key">from</span> <span class="tok-str">"firebase/app"</span>;
<span class="tok-key">import</span> { getAuth } <span class="tok-key">from</span> <span class="tok-str">"firebase/auth"</span>;
<span class="tok-key">import</span> { getFirestore } <span class="tok-key">from</span> <span class="tok-str">"firebase/firestore"</span>;

<span class="tok-key">const</span> app = <span class="tok-fn">initializeApp</span>(firebaseConfig);
<span class="tok-key">export const</span> auth = <span class="tok-fn">getAuth</span>(app);
<span class="tok-key">export const</span> db = <span class="tok-fn">getFirestore</span>(app);  <span class="tok-com">// ← nuevo</span>`

const codeRules = `<span class="tok-com">// firestore.rules</span>
<span class="tok-key">match</span> /tareas/{id} {
  <span class="tok-key">allow</span> read, write: <span class="tok-key">if</span> request.auth != <span class="tok-key">null</span>
    && request.auth.uid == resource.data.uid;
}`

const codeCreate = `<span class="tok-key">import</span> { collection, addDoc } <span class="tok-key">from</span> <span class="tok-str">"firebase/firestore"</span>;
<span class="tok-key">import</span> { db } <span class="tok-key">from</span> <span class="tok-str">"../firebase/config"</span>;

<span class="tok-com">// id automático</span>
<span class="tok-key">const</span> ref = <span class="tok-key">await</span> <span class="tok-fn">addDoc</span>(<span class="tok-fn">collection</span>(db, <span class="tok-str">"tareas"</span>), {
  titulo: <span class="tok-str">"Estudiar Firestore"</span>,
  completada: <span class="tok-key">false</span>,
  uid: user.uid,
});
<span class="tok-fn">console</span>.log(ref.id);  <span class="tok-com">// id generado</span>`

const codeReadAll = `<span class="tok-key">import</span> { collection, getDocs } <span class="tok-key">from</span> <span class="tok-str">"firebase/firestore"</span>;
<span class="tok-key">import</span> { db } <span class="tok-key">from</span> <span class="tok-str">"../firebase/config"</span>;

<span class="tok-key">const</span> snap = <span class="tok-key">await</span> <span class="tok-fn">getDocs</span>(<span class="tok-fn">collection</span>(db, <span class="tok-str">"tareas"</span>));
<span class="tok-key">const</span> tareas = snap.docs.<span class="tok-fn">map</span>((d) =&gt; ({ id: d.id, ...d.<span class="tok-fn">data</span>() }));`

const codeReadOne = `<span class="tok-key">import</span> { doc, getDoc } <span class="tok-key">from</span> <span class="tok-str">"firebase/firestore"</span>;

<span class="tok-key">const</span> snap = <span class="tok-key">await</span> <span class="tok-fn">getDoc</span>(<span class="tok-fn">doc</span>(db, <span class="tok-str">"tareas"</span>, id));
<span class="tok-key">if</span> (snap.<span class="tok-fn">exists</span>()) {
  <span class="tok-key">const</span> tarea = { id: snap.id, ...snap.<span class="tok-fn">data</span>() };
} <span class="tok-key">else</span> {
  <span class="tok-com">// no existe</span>
}`

const codeUpdate = `<span class="tok-key">import</span> { doc, updateDoc } <span class="tok-key">from</span> <span class="tok-str">"firebase/firestore"</span>;

<span class="tok-key">await</span> <span class="tok-fn">updateDoc</span>(<span class="tok-fn">doc</span>(db, <span class="tok-str">"tareas"</span>, id), { completada: <span class="tok-key">true</span> });`

const codeDelete = `<span class="tok-key">import</span> { doc, deleteDoc } <span class="tok-key">from</span> <span class="tok-str">"firebase/firestore"</span>;

<span class="tok-key">await</span> <span class="tok-fn">deleteDoc</span>(<span class="tok-fn">doc</span>(db, <span class="tok-str">"tareas"</span>, id));`

const codeQuery = `<span class="tok-key">import</span> { collection, query, where, orderBy, limit, getDocs } <span class="tok-key">from</span> <span class="tok-str">"firebase/firestore"</span>;

<span class="tok-key">const</span> q = <span class="tok-fn">query</span>(
  <span class="tok-fn">collection</span>(db, <span class="tok-str">"tareas"</span>),
  <span class="tok-fn">where</span>(<span class="tok-str">"completada"</span>, <span class="tok-str">"=="</span>, <span class="tok-key">false</span>),
  <span class="tok-fn">orderBy</span>(<span class="tok-str">"titulo"</span>),
  <span class="tok-fn">limit</span>(<span class="tok-num">10</span>),
);
<span class="tok-key">const</span> snap = <span class="tok-key">await</span> <span class="tok-fn">getDocs</span>(q);`

const codeFilterUid = `<span class="tok-com">// Cada quien ve SOLO sus tareas</span>
<span class="tok-key">const</span> q = <span class="tok-fn">query</span>(
  <span class="tok-fn">collection</span>(db, <span class="tok-str">"tareas"</span>),
  <span class="tok-fn">where</span>(<span class="tok-str">"uid"</span>, <span class="tok-str">"=="</span>, auth.currentUser.uid),
);`

const codeSnapshot = `<span class="tok-key">import</span> { collection, onSnapshot } <span class="tok-key">from</span> <span class="tok-str">"firebase/firestore"</span>;

<span class="tok-key">const</span> unsub = <span class="tok-fn">onSnapshot</span>(<span class="tok-fn">collection</span>(db, <span class="tok-str">"tareas"</span>), (snap) =&gt; {
  <span class="tok-key">const</span> tareas = snap.docs.<span class="tok-fn">map</span>((d) =&gt; ({ id: d.id, ...d.<span class="tok-fn">data</span>() }));
  <span class="tok-fn">setTareas</span>(tareas);  <span class="tok-com">// la UI se actualiza sola</span>
});

<span class="tok-com">// al desmontar: unsub();</span>`

const codeStoreSnapshot = `<span class="tok-com">// store: una acción que suscribe al cambio</span>
escuchar: () =&gt;
  <span class="tok-fn">onSnapshot</span>(<span class="tok-fn">collection</span>(db, <span class="tok-str">"tareas"</span>), (snap) =&gt;
    <span class="tok-fn">set</span>({ tareas: snap.docs.<span class="tok-fn">map</span>((d) =&gt; ({ id: d.id, ...d.<span class="tok-fn">data</span>() })) }),
  ),`

const codeService = `<span class="tok-com">// services/taskService.js (ahora con Firestore)</span>
<span class="tok-key">import</span> { collection, getDocs, addDoc } <span class="tok-key">from</span> <span class="tok-str">"firebase/firestore"</span>;
<span class="tok-key">import</span> { db } <span class="tok-key">from</span> <span class="tok-str">"../firebase/config"</span>;

<span class="tok-key">export const</span> taskService = {
  listar: <span class="tok-key">async</span> () =&gt; {
    <span class="tok-key">const</span> snap = <span class="tok-key">await</span> <span class="tok-fn">getDocs</span>(<span class="tok-fn">collection</span>(db, <span class="tok-str">"tareas"</span>));
    <span class="tok-key">return</span> snap.docs.<span class="tok-fn">map</span>((d) =&gt; ({ id: d.id, ...d.<span class="tok-fn">data</span>() }));
  },
  crear: (data) =&gt; <span class="tok-fn">addDoc</span>(<span class="tok-fn">collection</span>(db, <span class="tok-str">"tareas"</span>), data),
  <span class="tok-com">// ...</span>
};`

// Modelo de datos: colección → documento → campos
const treeModel = `<span class="dir">tareas</span> <span class="cmt">(colección)</span>
&nbsp;└─ <span class="dir">abc123</span> <span class="cmt">(documento)</span>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├─ titulo: <span class="tok-str">"Estudiar Firestore"</span>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├─ completada: <span class="tok-key">false</span>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─ uid: <span class="tok-str">"user-123"</span>`

// Estructura de carpetas tras la Sesión 6
const treeFinal = `<span class="dir">src/</span>
&nbsp;├─ <span class="dir">firebase/</span>
&nbsp;│&nbsp;&nbsp;└─ config.js &nbsp;&nbsp;&nbsp;<span class="cmt"># (se modifica) + getFirestore / db</span>
&nbsp;├─ <span class="dir">services/</span>
&nbsp;│&nbsp;&nbsp;└─ taskService.js <span class="cmt"># (se modifica) Axios → Firestore</span>
&nbsp;├─ <span class="dir">store/</span>
&nbsp;│&nbsp;&nbsp;└─ useTaskStore.js <span class="cmt"># (igual) sin cambios</span>
&nbsp;└─ firestore.rules <span class="cmt"># (nuevo) reglas por usuario</span>`

export const slides = [
  // 1 · Portada
  <TitleSlide
    key="s1"
    center
    logo
    eyebrow="Módulo II · Sesión 6"
    title={
      <>
        Cloud <span className="accent">Firestore</span>
      </>
    }
    subtitle="Desarrollo Front-End Profesional con React, Firebase y CI/CD"
    meta={
      <>
        Expositor: <b>Omar Rodrigo Mamani Capcha</b> · Duración: 1h 30min
      </>
    }
  />,

  // 2 · Seguimos en el mismo proyecto
  <Slide key="s2">
    <span className="eyebrow">Alcance de la sesión</span>
    <h2>Seguimos en el mismo proyecto</h2>
    <p className="lead" style={{ marginTop: '0.3rem', maxWidth: '72ch' }}>
      Usamos el <b>mismo proyecto Firebase</b> de la S5; solo <b>habilitamos Firestore</b>. Gracias a
      la capa <code>services/</code>, migrar de API REST a Firestore <b>toca un solo archivo</b>.
    </p>
    <div className="grid g2" style={{ marginTop: '1rem' }}>
      <Card title="Se modifica (mínimo)" titleClass="orange">
        <ul>
          <li><code>firebase/config.js</code> <Arr /> añadir <code>db</code>.</li>
          <li><code>services/taskService.js</code> <Arr /> de Axios a Firestore.</li>
        </ul>
      </Card>
      <Card title="No cambia" titleClass="green">
        <ul>
          <li>Store de Zustand (S4).</li>
          <li>Componentes y formularios.</li>
          <li>Notificaciones (Toastify).</li>
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
      { title: '1 · NoSQL + Firestore', body: 'Colecciones, documentos y configuración.' },
      { title: '2 · CRUD', body: 'Crear, leer, actualizar, eliminar y consultar.' },
      { title: '3 · Tiempo real', body: 'onSnapshot y comparación con API REST.' },
    ]}
  />,

  // 4 · Objetivos
  <BulletSlide
    key="s4"
    eyebrow="¿Qué lograrás hoy?"
    title="Objetivos de aprendizaje"
    variant="checks"
    items={[
      <>Explicar <b>Cloud Firestore</b> y el modelo <b>NoSQL</b>.</>,
      <>Diferenciar <b>SQL vs NoSQL</b>.</>,
      <>Habilitar Firestore e inicializar <code>db</code>.</>,
      <>Implementar el <b>CRUD</b> con Firestore.</>,
      <>Consultar con <code>where</code>, <code>orderBy</code> y filtrar por usuario.</>,
      <>Usar <b>tiempo real</b> con <code>onSnapshot</code>.</>,
    ]}
  />,

  // ─────────────────────────── BLOQUE 1 ───────────────────────────
  // 5 · Divider 1
  <SectionDivider key="s5" center num="01" eyebrow="Bloque 1" title="Base de datos NoSQL" subtitle="Colecciones, documentos y configuración." />,

  // 6 · ¿Qué es Cloud Firestore?
  <TwoColumn
    key="s6"
    eyebrow="Concepto"
    title="¿Qué es Cloud Firestore?"
    left={
      <>
        <p className="lead">
          Una base de datos <span className="accent">NoSQL</span> en la <b>nube</b>, con
          sincronización en <b>tiempo real</b> y escalable.
        </p>
        <ul style={{ marginTop: '1rem' }}>
          <li><b>Analogía:</b> un <b>archivador</b> 🗄️ con cajones (colecciones) y fichas (documentos).</li>
          <li>Parte del mismo Firebase: se integra con la auth de la S5.</li>
          <li>Sin servidor propio que mantener.</li>
        </ul>
      </>
    }
    right={
      <Card title="Lo que la hace especial">
        <ul>
          <li><b>Tiempo real:</b> los datos se actualizan solos.</li>
          <li><b>Offline:</b> funciona sin conexión y sincroniza luego.</li>
          <li><b>Escalable:</b> crece con tu app.</li>
        </ul>
      </Card>
    }
  />,

  // 7 · SQL vs NoSQL
  <Slide key="s7">
    <span className="eyebrow">Dos formas de guardar datos</span>
    <h2>SQL vs NoSQL</h2>
    <div className="grid g2" style={{ marginTop: '1rem' }}>
      <Card title="SQL (relacional)" titleClass="orange">
        <ul>
          <li>Tablas, filas y columnas.</li>
          <li>Esquema <b>fijo</b>.</li>
          <li>MySQL, PostgreSQL.</li>
        </ul>
      </Card>
      <Card title="NoSQL (documentos)" titleClass="green">
        <ul>
          <li>Colecciones y documentos.</li>
          <li>Estructura <b>flexible</b>.</li>
          <li>Firestore.</li>
        </ul>
      </Card>
    </div>
    <p className="muted" style={{ marginTop: '1rem' }}>
      👉 NoSQL brilla en apps con datos flexibles y <b>tiempo real</b>, como nuestro gestor de tareas.
    </p>
  </Slide>,

  // 8 · Colecciones y documentos
  <TwoColumn
    key="s8"
    eyebrow="El modelo de datos"
    title="Colecciones y documentos"
    lead={<>Una <b>colección</b> agrupa <b>documentos</b>; cada documento tiene un <b>id</b> y campos.</>}
    left={<div className="card"><div className="tree" dangerouslySetInnerHTML={{ __html: treeModel }} /></div>}
    right={
      <Card title="Claves">
        <ul>
          <li><b>Colección:</b> grupo de documentos (<code>tareas</code>).</li>
          <li><b>Documento:</b> un registro con campos tipo JSON.</li>
          <li>El <b>id</b> es único dentro de la colección.</li>
        </ul>
      </Card>
    }
  />,

  // 9 · Habilitar e inicializar
  <TwoColumn
    key="s9"
    eyebrow="Configuración"
    title="Habilitar e inicializar Firestore"
    lead={<>En la consola: <b>Firestore Database → Crear base de datos</b>. En código, añadimos <code>db</code>.</>}
    left={<CodeBlock html={codeConfig} />}
    right={
      <Card title="Claves">
        <ul>
          <li>Mismo proyecto Firebase de la S5.</li>
          <li><code>getFirestore(app)</code> da el objeto <code>db</code>.</li>
          <li>Empezar en <b>modo prueba</b> y luego cerrar reglas.</li>
        </ul>
      </Card>
    }
  />,

  // 10 · Reglas de seguridad
  <TwoColumn
    key="s10"
    eyebrow="Sin reglas, no hay seguridad"
    title="Reglas de seguridad"
    lead={<>La base es pública por red; la seguridad real son las <b>reglas</b>.</>}
    left={<CodeBlock html={codeRules} />}
    right={
      <Card title="La idea">
        <ul>
          <li>Cada usuario accede <b>solo a sus</b> tareas.</li>
          <li>Se valida <code>request.auth</code> y el <code>uid</code>.</li>
          <li>⚠️ El "modo prueba" deja todo abierto: ciérralo antes de producción.</li>
        </ul>
      </Card>
    }
  />,

  // ─────────────────────────── BLOQUE 2 ───────────────────────────
  // 11 · Divider 2
  <SectionDivider key="s11" center num="02" eyebrow="Bloque 2" title="CRUD con Cloud Firestore" subtitle="Crear, leer, actualizar y eliminar." />,

  // 12 · Crear
  <TwoColumn
    key="s12"
    eyebrow="Create"
    title="Crear: addDoc y setDoc"
    lead={<><code>addDoc</code> genera el id; <code>setDoc</code> usa un id propio.</>}
    left={<CodeBlock html={codeCreate} />}
    right={
      <Card title="Claves">
        <ul>
          <li><code>collection(db, "tareas")</code> apunta a la colección.</li>
          <li><code>addDoc</code> devuelve la referencia con <code>ref.id</code>.</li>
          <li>Guardamos el <code>uid</code> para filtrar por usuario.</li>
        </ul>
      </Card>
    }
  />,

  // 13 · Leer todos
  <TwoColumn
    key="s13"
    eyebrow="Read"
    title="Leer todos: getDocs"
    lead={<>Cada documento trae su <code>id</code> aparte; los campos van en <code>d.data()</code>.</>}
    left={<CodeBlock html={codeReadAll} />}
    right={
      <Card title="Patrón típico">
        <ul>
          <li><code>getDocs(collection(...))</code> trae el grupo.</li>
          <li><code>snap.docs.map(...)</code> arma el array.</li>
          <li>Combinamos <code>id</code> + <code>data()</code> en un objeto.</li>
        </ul>
      </Card>
    }
  />,

  // 14 · Leer uno
  <TwoColumn
    key="s14"
    eyebrow="Read (uno)"
    title="Leer uno: getDoc"
    lead={<>Para una sola tarea, con su <b>id</b>, validando que exista.</>}
    left={<CodeBlock html={codeReadOne} />}
    right={
      <Card title="Claves">
        <ul>
          <li><code>doc(db, "tareas", id)</code> apunta al documento.</li>
          <li><code>snap.exists()</code> evita errores si no está.</li>
          <li>Útil para una vista de detalle.</li>
        </ul>
      </Card>
    }
  />,

  // 15 · Actualizar
  <TwoColumn
    key="s15"
    eyebrow="Update"
    title="Actualizar: updateDoc"
    lead={<>Cambia <b>solo</b> los campos indicados, sin reemplazar el documento.</>}
    left={<CodeBlock html={codeUpdate} />}
    right={
      <Card title="Cuidado">
        <ul>
          <li><code>updateDoc</code> <b>combina</b> los campos.</li>
          <li><code>setDoc</code> <b>reemplaza</b> el documento entero.</li>
          <li>Ej.: marcar <code>completada: true</code>.</li>
        </ul>
      </Card>
    }
  />,

  // 16 · Eliminar
  <TwoColumn
    key="s16"
    eyebrow="Delete"
    title="Eliminar: deleteDoc"
    lead={<>Una sola llamada borra el documento.</>}
    left={<CodeBlock html={codeDelete} />}
    right={
      <Card title="Claves">
        <ul>
          <li><code>deleteDoc(doc(db, ...))</code>.</li>
          <li>Es asíncrono: usamos <code>await</code>.</li>
          <li>Con tiempo real, la lista se actualiza sola.</li>
        </ul>
      </Card>
    }
  />,

  // 17 · Consultas
  <TwoColumn
    key="s17"
    eyebrow="Filtrar y ordenar"
    title="Consultas"
    lead={<>Combinamos <code>where</code>, <code>orderBy</code> y <code>limit</code> dentro de <code>query</code>.</>}
    left={<CodeBlock html={codeQuery} />}
    right={
      <Card title="Claves">
        <ul>
          <li><code>where(campo, op, valor)</code> filtra.</li>
          <li><code>orderBy</code> ordena; <code>limit</code> acota.</li>
          <li>El filtrado ocurre en el <b>servidor</b>.</li>
        </ul>
      </Card>
    }
  />,

  // 18 · Filtrar por usuario
  <TwoColumn
    key="s18"
    eyebrow="Gancho con la S5"
    title="Filtrar por usuario (uid)"
    lead={<>Cada quien ve <b>solo sus</b> tareas, usando el <code>uid</code> de la auth.</>}
    left={<CodeBlock html={codeFilterUid} />}
    right={
      <Card title="Privacidad por usuario">
        <ul>
          <li><code>auth.currentUser.uid</code> identifica a quien pide.</li>
          <li>Junto con las <b>reglas</b>, garantiza privacidad.</li>
          <li>Cada tarea guarda su <code>uid</code> al crearse.</li>
        </ul>
      </Card>
    }
  />,

  // 19 · Tiempo real
  <TwoColumn
    key="s19"
    eyebrow="La gran ventaja"
    title="Tiempo real: onSnapshot"
    lead={<>Firestore <b>avisa</b> cuando los datos cambian, sin volver a pedir.</>}
    left={<CodeBlock html={codeSnapshot} />}
    right={
      <Card title="Como un chat en vivo 💬">
        <ul>
          <li>Te <b>suscribes</b> una vez a la colección.</li>
          <li>Cada cambio dispara el callback con los datos frescos.</li>
          <li>Devuelve <code>unsub()</code>: límpialo al desmontar.</li>
        </ul>
      </Card>
    }
  />,

  // 20 · Integración con el store
  <TwoColumn
    key="s20"
    eyebrow="Reusamos Zustand (S4)"
    title="Tiempo real + store"
    lead={<>Conectamos <code>onSnapshot</code> con el store: la lista se mantiene sola.</>}
    left={<CodeBlock html={codeStoreSnapshot} />}
    right={
      <Card title="Resultado">
        <ul>
          <li>En el componente: <code>escuchar()</code> en un <code>useEffect</code>.</li>
          <li>Limpiar con el <code>unsub</code> al desmontar.</li>
          <li>Crear/editar/eliminar se refleja al instante.</li>
        </ul>
      </Card>
    }
  />,

  // ─────────────────────────── BLOQUE 3 ───────────────────────────
  // 21 · API REST vs Firestore
  <Slide key="s21">
    <span className="eyebrow">¿Cuándo usar cada uno?</span>
    <h2>API REST vs Cloud Firestore</h2>
    <table style={{ marginTop: '1rem' }}>
      <thead>
        <tr><th></th><th>API REST (S3)</th><th>Cloud Firestore</th></tr>
      </thead>
      <tbody>
        <tr><td><b>Backend</b></td><td>Lo programas y mantienes tú</td><td>Lo provee Firebase</td></tr>
        <tr><td><b>Peticiones</b></td><td>GET/POST/PUT/DELETE con Axios</td><td>addDoc/getDocs/updateDoc/deleteDoc</td></tr>
        <tr><td><b>Tiempo real</b></td><td>No (hay que re-consultar)</td><td>Sí, con onSnapshot</td></tr>
        <tr><td><b>Datos</b></td><td>JSON por HTTP</td><td>Documentos en colecciones</td></tr>
      </tbody>
    </table>
  </Slide>,

  // 22 · Migrar toca un solo archivo
  <TwoColumn
    key="s22"
    eyebrow="Buena arquitectura"
    title="Migrar toca un solo archivo"
    lead={<>El store sigue llamando <code>taskService.listar()</code>; solo cambia su <b>interior</b>.</>}
    left={<CodeBlock html={codeService} />}
    right={
      <Card title="Por qué importa">
        <ul>
          <li>La capa <code>services/</code> (S3) aísla el backend.</li>
          <li>De Axios a Firestore sin tocar el resto.</li>
          <li><b>El resto de la app no se entera.</b></li>
        </ul>
      </Card>
    }
  />,

  // ─────────────────────────── BLOQUE 4 ───────────────────────────
  // 23 · Divider 4
  <SectionDivider key="s23" center num="03" eyebrow="Bloque 4" title="Laboratorio" subtitle="CRUD en la nube. ⌨️" />,

  // 24 · Laboratorio paso a paso
  <CardsGrid key="s24" eyebrow="Práctica guiada" title="Laboratorio paso a paso">
    <Card title="① Habilitar + configurar">
      <ul>
        <li>Crear la base de datos Firestore (modo prueba) en el <b>mismo proyecto</b>.</li>
        <li>Añadir <code>getFirestore</code>/<code>db</code> a <code>firebase/config.js</code>.</li>
      </ul>
    </Card>
    <Card title="② Migrar el servicio">
      <ul>
        <li>Reescribir <code>taskService.js</code> con Firestore.</li>
        <li>Comprobar que el store y los componentes <b>siguen igual</b>.</li>
      </ul>
    </Card>
    <Card title="③ Por usuario + consultas">
      <ul>
        <li>Guardar <code>uid</code> en cada tarea; filtrar con <code>where</code>.</li>
        <li>Ordenar con <code>orderBy</code>.</li>
      </ul>
    </Card>
    <Card title="④ Tiempo real">
      <ul>
        <li>Cambiar la carga inicial por <code>onSnapshot</code> en el store.</li>
        <li>Ver la lista actualizarse sola.</li>
      </ul>
    </Card>
  </CardsGrid>,

  // 25 · Estructura tras la sesión
  <TwoColumn
    key="s25"
    eyebrow="¿Qué se toca?"
    title="Estructura tras la Sesión 6"
    left={<div className="card"><div className="tree" dangerouslySetInnerHTML={{ __html: treeFinal }} /></div>}
    right={
      <>
        <p className="lead">Cambios <b>mínimos</b>: solo 2 archivos se modifican.</p>
        <ul style={{ marginTop: '0.8rem' }}>
          <li><b>config.js</b> <Arr /> se añade <code>db</code>.</li>
          <li><b>taskService.js</b> <Arr /> de Axios a Firestore.</li>
          <li><b>firestore.rules</b> <Arr /> nuevo, reglas por usuario.</li>
          <li>El store y los componentes <b>no cambian</b>.</li>
        </ul>
      </>
    }
  />,

  // 26 · Errores frecuentes
  <CardsGrid
    key="s26"
    cols={3}
    eyebrow="Para no tropezar"
    title="Errores frecuentes"
    cards={[
      { title: 'El id no está en data()', titleClass: 'orange', body: 'El id va en doc.id; los campos en doc.data().' },
      { title: 'No limpiar onSnapshot', titleClass: 'orange', body: 'Listeners acumulados. Guarda el unsub y llámalo al desmontar.' },
      { title: 'Reglas abiertas en prod', titleClass: 'orange', body: 'El modo prueba deja todo abierto. Cierra por auth y uid.' },
      { title: 'Consulta sin índice', body: 'Firestore avisa con un enlace para crear el índice.' },
      { title: 'setDoc vs updateDoc', body: 'setDoc reemplaza; updateDoc combina.' },
      { title: 'Olvidar el uid', body: 'Sin uid no puedes filtrar por usuario.' },
    ]}
  />,

  // 27 · Checklist
  <Slide key="s27">
    <span className="eyebrow">Antes de cerrar</span>
    <h2>Checklist de la sesión</h2>
    <ul className="checks big" style={{ marginTop: '1rem' }}>
      <li>Entiendo colecciones, documentos y NoSQL.</li>
      <li>Habilité Firestore en el mismo proyecto e inicialicé db.</li>
      <li>Implementé el CRUD (addDoc, getDocs, updateDoc, deleteDoc).</li>
      <li>Hago consultas con where, orderBy y filtro por usuario.</li>
      <li>Uso onSnapshot y conecté el tiempo real al store.</li>
    </ul>
  </Slide>,

  // 28 · Resumen
  <Slide key="s28">
    <span className="eyebrow">Lo que aprendiste hoy</span>
    <h2>Resumen de la sesión</h2>
    <div className="grid g2" style={{ marginTop: '0.8rem' }}>
      <Card title="Firestore">
        <p className="muted">
          Una base <b>NoSQL</b> en la nube, en <b>tiempo real</b>, integrada con la auth: colecciones,
          documentos y un CRUD sencillo.
        </p>
      </Card>
      <Card title="Migración limpia">
        <p className="muted">
          Solo cambió <code>taskService</code>; el store, los componentes y los formularios quedaron
          <b> intactos</b>. Eso es buena arquitectura.
        </p>
      </Card>
    </div>
    <p className="lead" style={{ marginTop: '1.2rem' }}>
      📌 Idea central: <span className="accent">colecciones de documentos, CRUD en la nube y datos en tiempo real</span>.
    </p>
  </Slide>,

  // 29 · Próxima sesión + cierre
  <Slide key="s29" center>
    <ReactLogo spin="6s" />
    <span className="eyebrow">Próxima sesión</span>
    <h2 style={{ fontSize: '2.3rem' }}>Sesión 7 - Arquitectura Profesional y Optimización</h2>
    <div className="grid g2" style={{ marginTop: '1.2rem', maxWidth: '60vw' }}>
      <Card title="Custom Hooks"><p className="muted">useAuth, useTasks: reutilizar lógica con hooks propios.</p></Card>
      <Card title="Optimización"><p className="muted">useMemo, useCallback y lazy loading para una app rápida.</p></Card>
    </div>
    <p className="muted" style={{ marginTop: '1.2rem' }}>
      <b>Tarea:</b> deja el CRUD de tareas funcionando con Firestore y tiempo real.
    </p>
    <p className="muted" style={{ marginTop: '0.8rem' }}>¿Preguntas? 🙌 ¡Nos vemos en la Sesión 7!</p>
  </Slide>,
]

export default slides
