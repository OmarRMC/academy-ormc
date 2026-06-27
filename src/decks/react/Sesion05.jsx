// ─────────────────────────────────────────────────────────────────────────
// Curso React · Sesión 5 - Firebase Authentication (inicio del Módulo II)
// Cada elemento del array `slides` es una diapositiva. El componente <Deck>
// se encarga de la navegación, el progreso y la pantalla completa.
//
// Código verificado contra la documentación oficial de Firebase
// (SDK modular v12, imports desde firebase/app y firebase/auth).
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
  session: 5,
  title: 'Firebase Authentication',
}

// ── Bloques de código (HTML con tokens .tok-*) ────────────────────────────

const codeInstallFirebase = `<span class="tok-com"># Instalar Firebase</span>
npm install firebase`

const codeConfig = `<span class="tok-com">// src/firebase/config.js</span>
<span class="tok-key">import</span> { initializeApp } <span class="tok-key">from</span> <span class="tok-str">"firebase/app"</span>;
<span class="tok-key">import</span> { getAuth } <span class="tok-key">from</span> <span class="tok-str">"firebase/auth"</span>;

<span class="tok-key">const</span> firebaseConfig = {
  apiKey: <span class="tok-fn">import</span>.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: <span class="tok-fn">import</span>.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: <span class="tok-fn">import</span>.meta.env.VITE_FIREBASE_PROJECT_ID,
  appId: <span class="tok-fn">import</span>.meta.env.VITE_FIREBASE_APP_ID,
};

<span class="tok-key">const</span> app = <span class="tok-fn">initializeApp</span>(firebaseConfig);
<span class="tok-key">export const</span> auth = <span class="tok-fn">getAuth</span>(app);`

const codeEnv = `<span class="tok-com"># .env (en .gitignore)</span>
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=tu-proyecto.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=tu-proyecto
VITE_FIREBASE_APP_ID=...`

const codeRegister = `<span class="tok-key">import</span> { createUserWithEmailAndPassword } <span class="tok-key">from</span> <span class="tok-str">"firebase/auth"</span>;
<span class="tok-key">import</span> { auth } <span class="tok-key">from</span> <span class="tok-str">"../firebase/config"</span>;

<span class="tok-key">const</span> cred = <span class="tok-key">await</span> <span class="tok-fn">createUserWithEmailAndPassword</span>(auth, email, password);
<span class="tok-key">const</span> user = cred.user;  <span class="tok-com">// usuario creado (uid, email...)</span>`

const codeSignIn = `<span class="tok-key">import</span> { signInWithEmailAndPassword } <span class="tok-key">from</span> <span class="tok-str">"firebase/auth"</span>;
<span class="tok-key">import</span> { auth } <span class="tok-key">from</span> <span class="tok-str">"../firebase/config"</span>;

<span class="tok-key">const</span> cred = <span class="tok-key">await</span> <span class="tok-fn">signInWithEmailAndPassword</span>(auth, email, password);
<span class="tok-key">const</span> user = cred.user;  <span class="tok-com">// usuario autenticado</span>`

const codeErrors = `<span class="tok-key">try</span> {
  <span class="tok-key">await</span> <span class="tok-fn">signInWithEmailAndPassword</span>(auth, email, password);
} <span class="tok-key">catch</span> (error) {
  <span class="tok-com">// error.code: "auth/invalid-credential"...</span>
  <span class="tok-key">if</span> (error.code === <span class="tok-str">"auth/invalid-credential"</span>) {
    toast.<span class="tok-fn">error</span>(<span class="tok-str">"Correo o contraseña incorrectos"</span>);
  } <span class="tok-key">else</span> {
    toast.<span class="tok-fn">error</span>(<span class="tok-str">"No se pudo iniciar sesión"</span>);
  }
}`

const codeSignOut = `<span class="tok-key">import</span> { signOut } <span class="tok-key">from</span> <span class="tok-str">"firebase/auth"</span>;
<span class="tok-key">import</span> { auth } <span class="tok-key">from</span> <span class="tok-str">"../firebase/config"</span>;

<span class="tok-key">await</span> <span class="tok-fn">signOut</span>(auth);  <span class="tok-com">// termina la sesión</span>`

const codeAuthState = `<span class="tok-key">import</span> { onAuthStateChanged } <span class="tok-key">from</span> <span class="tok-str">"firebase/auth"</span>;
<span class="tok-key">import</span> { auth } <span class="tok-key">from</span> <span class="tok-str">"../firebase/config"</span>;

<span class="tok-fn">onAuthStateChanged</span>(auth, (user) =&gt; {
  <span class="tok-key">if</span> (user) {
    <span class="tok-com">// hay sesión: user.uid, user.email</span>
  } <span class="tok-key">else</span> {
    <span class="tok-com">// no hay sesión</span>
  }
});`

const codeAuthStore = `<span class="tok-com">// src/store/useAuthStore.js</span>
<span class="tok-key">import</span> { create } <span class="tok-key">from</span> <span class="tok-str">"zustand"</span>;
<span class="tok-key">import</span> { onAuthStateChanged } <span class="tok-key">from</span> <span class="tok-str">"firebase/auth"</span>;
<span class="tok-key">import</span> { auth } <span class="tok-key">from</span> <span class="tok-str">"../firebase/config"</span>;

<span class="tok-key">export const</span> useAuthStore = <span class="tok-fn">create</span>((set) =&gt; ({
  user: <span class="tok-key">null</span>,
  cargando: <span class="tok-key">true</span>,
  init: () =&gt;
    <span class="tok-fn">onAuthStateChanged</span>(auth, (user) =&gt; <span class="tok-fn">set</span>({ user, cargando: <span class="tok-key">false</span> })),
}));`

const codeReadUser = `<span class="tok-key">const</span> user = <span class="tok-fn">useAuthStore</span>((s) =&gt; s.user);

<span class="tok-key">return</span> user
  ? &lt;<span class="tok-tag">p</span>&gt;Hola, {user.email}&lt;/<span class="tok-tag">p</span>&gt;
  : &lt;<span class="tok-tag">p</span>&gt;No has iniciado sesión&lt;/<span class="tok-tag">p</span>&gt;;`

const codePersistence = `<span class="tok-key">import</span> { setPersistence, browserLocalPersistence } <span class="tok-key">from</span> <span class="tok-str">"firebase/auth"</span>;

<span class="tok-com">// 'local' (por defecto): persiste hasta cerrar sesión</span>
<span class="tok-key">await</span> <span class="tok-fn">setPersistence</span>(auth, browserLocalPersistence);`

const codeProtected = `<span class="tok-key">import</span> { Navigate } <span class="tok-key">from</span> <span class="tok-str">"react-router-dom"</span>;
<span class="tok-key">import</span> { useAuthStore } <span class="tok-key">from</span> <span class="tok-str">"../store/useAuthStore"</span>;

<span class="tok-key">function</span> <span class="tok-fn">RutaPrivada</span>({ children }) {
  <span class="tok-key">const</span> { user, cargando } = <span class="tok-fn">useAuthStore</span>();
  <span class="tok-key">if</span> (cargando) <span class="tok-key">return</span> &lt;<span class="tok-tag">p</span>&gt;Cargando...&lt;/<span class="tok-tag">p</span>&gt;;  <span class="tok-com">// espera al listener</span>
  <span class="tok-key">return</span> user ? children : &lt;<span class="tok-tag">Navigate</span> <span class="tok-attr">to</span>=<span class="tok-str">"/login"</span> replace /&gt;;
}`

const codeInterceptor = `<span class="tok-key">import</span> { auth } <span class="tok-key">from</span> <span class="tok-str">"../firebase/config"</span>;

api.interceptors.request.<span class="tok-fn">use</span>(<span class="tok-key">async</span> (config) =&gt; {
  <span class="tok-key">const</span> token = <span class="tok-key">await</span> auth.currentUser?.<span class="tok-fn">getIdToken</span>();
  <span class="tok-key">if</span> (token) config.headers.Authorization = <span class="tok-str">\`Bearer \${token}\`</span>;
  <span class="tok-key">return</span> config;
});`

// Estructura de carpetas tras la Sesión 5
const treeFinal = `<span class="dir">src/</span>
&nbsp;├─ <span class="dir">firebase/</span>
&nbsp;│&nbsp;&nbsp;└─ config.js &nbsp;&nbsp;<span class="cmt"># (nuevo) initializeApp + getAuth</span>
&nbsp;├─ <span class="dir">store/</span>
&nbsp;│&nbsp;&nbsp;└─ useAuthStore.js <span class="cmt"># (nuevo) user + onAuthStateChanged</span>
&nbsp;├─ <span class="dir">pages/</span>
&nbsp;│&nbsp;&nbsp;├─ Login.jsx &nbsp;&nbsp;<span class="cmt"># (se modifica) ahora usa signIn</span>
&nbsp;│&nbsp;&nbsp;└─ Registro.jsx <span class="cmt"># (nuevo) signUp</span>
&nbsp;├─ <span class="dir">routes/</span>
&nbsp;│&nbsp;&nbsp;└─ RutaPrivada.jsx <span class="cmt"># (se modifica) usuario real</span>
&nbsp;└─ App.jsx &nbsp;&nbsp;&nbsp;&nbsp;<span class="cmt"># (se modifica) 1 línea: init()</span>`

export const slides = [
  // 1 · Portada
  <TitleSlide
    key="s1"
    center
    logo
    eyebrow="Módulo II · Sesión 5"
    title={
      <>
        <span className="accent">Firebase</span>
        <br />Authentication
      </>
    }
    subtitle="Desarrollo Front-End Profesional con React, Firebase y CI/CD"
    meta={
      <>
        Expositor: <b>Omar Rodrigo Mamani Capcha</b> · Duración: 1h 30min
      </>
    }
  />,

  // 2 · Bienvenido al Módulo II
  <Slide key="s2">
    <span className="eyebrow">Empieza el Módulo II</span>
    <h2>Seguimos en el MISMO proyecto</h2>
    <p className="lead" style={{ marginTop: '0.3rem', maxWidth: '72ch' }}>
      No empezamos una app nueva: continuamos sobre el <b>Sistema de Gestión de Tareas</b> del
      Módulo I. Solo <b>añadimos Firebase</b> y hacemos <b>cambios mínimos</b> donde es necesario.
    </p>
    <div className="grid g3" style={{ marginTop: '1.1rem' }}>
      <Card title="Módulo I (hecho)">
        <p className="muted">React, navegación, APIs REST, estado global y formularios.</p>
      </Card>
      <Card title="Módulo II (empieza)">
        <p className="muted">Firebase como backend: autenticación, base de datos y despliegue.</p>
      </Card>
      <Card title="Hoy" titleClass="green">
        <p className="muted">Dejamos el “token” simulado de la S2 y ponemos login real. 🔐</p>
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
      { title: '1 · Firebase + config', body: 'Proyecto, SDK modular y variables de entorno.' },
      { title: '2 · Authentication', body: 'Registro, login, logout, estado y persistencia.' },
      { title: '3 · Rutas protegidas', body: 'Protección real + comparación con API REST.' },
    ]}
  />,

  // 4 · Objetivos
  <BulletSlide
    key="s4"
    eyebrow="¿Qué lograrás hoy?"
    title="Objetivos de aprendizaje"
    variant="checks"
    items={[
      <>Explicar qué es <b>Firebase</b> como <b>Backend-as-a-Service</b>.</>,
      <>Crear un <b>proyecto</b> y habilitar <b>Authentication</b> (email/contraseña).</>,
      <>Configurar el <b>SDK modular</b> con variables de entorno.</>,
      <>Implementar <b>registro</b>, <b>login</b> y <b>logout</b>.</>,
      <>Escuchar el estado con <code>onAuthStateChanged</code> (store de Zustand).</>,
      <>Configurar <b>persistencia</b> y <b>rutas protegidas</b> reales.</>,
    ]}
  />,

  // ─────────────────────────── BLOQUE 1 ───────────────────────────
  // 5 · Divider 1
  <SectionDivider key="s5" center num="01" eyebrow="Bloque 1" title="Firebase y configuración" subtitle="Un backend listo para usar." />,

  // 5b · Qué cambia del Módulo I
  <Slide key="s5b">
    <span className="eyebrow">Alcance de la sesión</span>
    <h2>Qué cambia del Módulo I</h2>
    <p className="lead" style={{ marginTop: '0.3rem' }}>
      Casi todo es <b>aditivo</b>. Del Módulo I solo tocamos <b>3 archivos</b>, con cambios pequeños.
    </p>
    <div className="grid g2" style={{ marginTop: '1rem' }}>
      <Card title="Nuevo (no toca nada anterior)" titleClass="green">
        <ul>
          <li><code>firebase/config.js</code></li>
          <li><code>store/useAuthStore.js</code></li>
          <li><code>pages/Registro.jsx</code></li>
        </ul>
      </Card>
      <Card title="Se modifica (mínimo)" titleClass="orange">
        <ul>
          <li><code>pages/Login.jsx</code> <Arr /> usa <code>signIn</code>.</li>
          <li><code>routes/RutaPrivada.jsx</code> <Arr /> usuario real.</li>
          <li><code>App.jsx</code> <Arr /> 1 línea: arrancar el listener.</li>
        </ul>
      </Card>
    </div>
    <p className="muted" style={{ marginTop: '1rem' }}>
      El interceptor de Axios (S3) recibe una mejora opcional: enviar el token de Firebase.
    </p>
  </Slide>,

  // 6 · ¿Qué es Firebase?
  <TwoColumn
    key="s6"
    eyebrow="Concepto"
    title="¿Qué es Firebase?"
    left={
      <>
        <p className="lead">
          Un <span className="accent">backend listo para usar</span> 🧰. En vez de programar y
          mantener un servidor, usas sus servicios.
        </p>
        <ul style={{ marginTop: '1rem' }}>
          <li><b>BaaS:</b> Backend-as-a-Service.</li>
          <li>Tú te concentras en el <b>frontend</b>.</li>
          <li>De Google, con plan gratuito generoso.</li>
        </ul>
      </>
    }
    right={
      <Card title="Lo que usaremos">
        <ul>
          <li><b>Authentication</b> (hoy): login y usuarios.</li>
          <li><b>Cloud Firestore</b> (S6): base de datos.</li>
          <li><b>Hosting</b> (S8): publicar la app.</li>
        </ul>
      </Card>
    }
  />,

  // 7 · Crear el proyecto Firebase (backend en la consola)
  <TwoColumn
    key="s7"
    eyebrow="En console.firebase.google.com"
    title="Crear el proyecto Firebase"
    lead={<>Esto es el <b>backend en la consola</b>, NO una app de React nueva. El código sigue siendo la misma app.</>}
    left={
      <Card title="Pasos (una sola vez)">
        <ul>
          <li><b>① Nuevo proyecto</b> en la consola y darle un nombre.</li>
          <li><b>② Registrar app web</b> (icono <code>&lt;/&gt;</code>) y copiar el <code>firebaseConfig</code>.</li>
          <li><b>③ Guardar la config</b>: credenciales de cliente (no de servidor). Irán en <code>.env</code>.</li>
        </ul>
      </Card>
    }
    right={
      <Card title="Un proyecto para todo el Módulo II" titleClass="green">
        <p className="muted">
          Este <b>mismo</b> proyecto Firebase se reutiliza en todo el módulo: <b>Auth</b> hoy,
          <b> Firestore</b> en la S6 y <b>Hosting</b> en la S8. No se crea uno por sesión.
        </p>
      </Card>
    }
  />,

  // 8 · Habilitar Authentication
  <TwoColumn
    key="s8"
    eyebrow="En la consola"
    title="Habilitar Authentication"
    left={
      <>
        <p className="lead">Activamos el proveedor de <b>email y contraseña</b>.</p>
        <ul style={{ marginTop: '0.8rem' }}>
          <li>Authentication <Arr /> <b>Sign-in method</b>.</li>
          <li>Elegir <b>Email/Password</b> <Arr /> <b>Habilitar</b>.</li>
          <li>Guardar.</li>
        </ul>
      </>
    }
    right={
      <Card title="Otros proveedores">
        <p className="muted">
          Firebase también permite <b>Google</b>, <b>GitHub</b>, teléfono y más. Hoy usamos
          email/contraseña por ser el caso base.
        </p>
      </Card>
    }
  />,

  // 9 · Instalar e inicializar el SDK
  <TwoColumn
    key="s9"
    eyebrow="SDK modular (v12)"
    title="Instalar e inicializar"
    lead={<>Un solo archivo de configuración en <code>src/firebase/</code>.</>}
    left={
      <>
        <CodeBlock html={codeInstallFirebase} />
        <div style={{ marginTop: '0.6rem' }}>
          <CodeBlock html={codeConfig} />
        </div>
      </>
    }
    right={
      <Card title="Claves">
        <ul>
          <li>Imports desde <code>firebase/app</code> y <code>firebase/auth</code>.</li>
          <li><code>initializeApp</code> arranca Firebase.</li>
          <li><code>getAuth</code> da el objeto <code>auth</code> que exportamos.</li>
        </ul>
      </Card>
    }
  />,

  // 10 · Variables de entorno
  <TwoColumn
    key="s10"
    eyebrow="Config fuera del código"
    title="Variables de entorno"
    lead={<>Recordatorio de la S3: prefijo <code>VITE_</code> y <code>.env</code> en <code>.gitignore</code>.</>}
    left={<CodeBlock html={codeEnv} />}
    right={
      <Card title="Nota honesta">
        <p className="muted">
          La <b>API Key web no es un secreto</b>: se expone en el cliente. La seguridad real la dan
          las <b>reglas</b> del proyecto. El <code>.env</code> es por <b>orden y entornos</b>.
        </p>
      </Card>
    }
  />,

  // 11 · La pieza central: auth
  <Slide key="s11" center>
    <span className="eyebrow">La pieza central</span>
    <h2>El objeto <code>auth</code></h2>
    <p className="lead" style={{ marginTop: '0.6rem', maxWidth: '70ch' }}>
      Lo obtenemos una vez con <code>getAuth</code> y lo pasamos a <b>todas</b> las funciones:
      registro, login, logout y el listener de estado.
    </p>
    <Flow
      style={{ marginTop: '1.4rem' }}
      steps={['getAuth(app)', 'export auth', { label: 'lo usa toda la app', ok: true }]}
    />
  </Slide>,

  // ─────────────────────────── BLOQUE 2 ───────────────────────────
  // 12 · Divider 2
  <SectionDivider key="s12" center num="02" eyebrow="Bloque 2" title="Firebase Authentication" subtitle="Registro, login, logout y sesión." />,

  // 13 · Registro
  <TwoColumn
    key="s13"
    eyebrow="Crear cuenta"
    title="Registro de usuario"
    lead={<>Firebase guarda al usuario y devuelve sus credenciales.</>}
    left={<CodeBlock html={codeRegister} />}
    right={
      <Card title="Claves">
        <ul>
          <li><code>createUserWithEmailAndPassword(auth, ...)</code>.</li>
          <li>Devuelve <code>cred.user</code> (con <code>uid</code>, <code>email</code>).</li>
          <li>Es asíncrono: usamos <code>await</code>.</li>
        </ul>
      </Card>
    }
  />,

  // 14 · Inicio de sesión
  <TwoColumn
    key="s14"
    eyebrow="Entrar"
    title="Inicio de sesión"
    lead={<>Misma forma que el registro, pero para usuarios <b>existentes</b>.</>}
    left={<CodeBlock html={codeSignIn} />}
    right={
      <Card title="Claves">
        <ul>
          <li><code>signInWithEmailAndPassword(auth, ...)</code>.</li>
          <li>Si las credenciales son válidas, hay sesión.</li>
          <li>Firebase se encarga de todo lo demás.</li>
        </ul>
      </Card>
    }
  />,

  // 15 · Manejo de errores
  <TwoColumn
    key="s15"
    eyebrow="Cuando algo falla"
    title="Manejo de errores"
    lead={<>Firebase devuelve un <b>código</b> en <code>error.code</code>; lo traducimos a un mensaje amable.</>}
    left={<CodeBlock html={codeErrors} />}
    right={
      <Card title="Códigos comunes">
        <ul>
          <li><code>auth/invalid-credential</code></li>
          <li><code>auth/email-already-in-use</code></li>
          <li><code>auth/weak-password</code></li>
        </ul>
        <p className="muted" style={{ marginTop: '0.5rem' }}>Los avisos van con React Toastify (S4).</p>
      </Card>
    }
  />,

  // 16 · Cierre de sesión
  <TwoColumn
    key="s16"
    eyebrow="Salir"
    title="Cierre de sesión"
    lead={<>Una sola llamada termina la sesión actual.</>}
    left={<CodeBlock html={codeSignOut} />}
    right={
      <Card title="Efecto">
        <ul>
          <li><code>signOut(auth)</code> cierra la sesión.</li>
          <li>El listener avisará que ya no hay usuario.</li>
          <li>Las rutas protegidas vuelven a bloquearse.</li>
        </ul>
      </Card>
    }
  />,

  // 17 · onAuthStateChanged
  <TwoColumn
    key="s17"
    eyebrow="El corazón de la sesión"
    title="onAuthStateChanged"
    lead={<>No preguntamos si hay sesión: Firebase nos <b>avisa</b> cuando alguien entra o sale.</>}
    left={<CodeBlock html={codeAuthState} />}
    right={
      <Card title="Analogía">
        <p className="muted">
          Un <b>portero atento</b> 🚪 que avisa cada vez que alguien entra o sale del edificio. Tú
          solo reaccionas al aviso.
        </p>
      </Card>
    }
  />,

  // 18 · Integración con React (store)
  <TwoColumn
    key="s18"
    eyebrow="Reusamos Zustand (S4)"
    title="Integración con React"
    lead={<>Un store guarda el usuario; el listener lo mantiene al día.</>}
    left={<CodeBlock html={codeAuthStore} />}
    right={
      <Card title="Cómo arrancarlo">
        <ul>
          <li>En <code>App.jsx</code>: <code>useEffect(() =&gt; init(), [])</code>.</li>
          <li><code>user</code> y <code>cargando</code> quedan en el store.</li>
          <li>Disponible para <b>toda</b> la app.</li>
        </ul>
      </Card>
    }
  />,

  // 19 · Leer el usuario
  <TwoColumn
    key="s19"
    eyebrow="En cualquier componente"
    title="Leer el usuario"
    lead={<>Con un selector sabemos <b>quién</b> está logueado, sin pasar props.</>}
    left={<CodeBlock html={codeReadUser} />}
    right={
      <Card title="Usos">
        <ul>
          <li>Mostrar el email o nombre en la Navbar.</li>
          <li>Decidir qué se ve según haya sesión o no.</li>
          <li>Base para las rutas protegidas. 👉</li>
        </ul>
      </Card>
    }
  />,

  // 20 · Persistencia
  <TwoColumn
    key="s20"
    eyebrow="Recordar la sesión"
    title="Persistencia de sesión"
    lead={<>Por defecto Firebase <b>recuerda</b> la sesión al recargar. Se puede elegir.</>}
    left={<CodeBlock html={codePersistence} />}
    right={
      <Card title="Opciones">
        <ul>
          <li><code>browserLocalPersistence</code> <Arr /> recordar (por defecto).</li>
          <li><code>browserSessionPersistence</code> <Arr /> solo la pestaña.</li>
          <li><code>inMemoryPersistence</code> <Arr /> se borra al recargar.</li>
        </ul>
      </Card>
    }
  />,

  // 21 · Rutas protegidas reales
  <TwoColumn
    key="s21"
    eyebrow="Adiós al token simulado"
    title="Rutas protegidas reales"
    lead={<>Actualizamos la <code>RutaPrivada</code> de la S2: ahora usa el <b>usuario real</b>.</>}
    left={<CodeBlock html={codeProtected} />}
    right={
      <Card title="Detalle clave">
        <ul>
          <li>Esperar a <code>cargando</code> antes de redirigir.</li>
          <li>Si no, se ve el login un instante y luego entra (parpadeo).</li>
          <li>Sin sesión <Arr /> <code>Navigate to="/login"</code>.</li>
        </ul>
      </Card>
    }
  />,

  // 22 · Flujo de autenticación
  <Slide key="s22" center>
    <span className="eyebrow">De punta a punta</span>
    <h2>Flujo de autenticación</h2>
    <Flow
      style={{ marginTop: '1.4rem' }}
      steps={['Login (form)', 'signIn (Firebase)', 'onAuthStateChanged', 'store (user)', { label: 'Dashboard', ok: true }]}
    />
    <p className="muted" style={{ marginTop: '1.6rem' }}>
      Firebase autentica; React <b>escucha</b> y reacciona. 🔐
    </p>
  </Slide>,

  // ─────────────────────────── BLOQUE 3 ───────────────────────────
  // 23 · API REST vs Firebase Auth
  <Slide key="s23">
    <span className="eyebrow">¿Cuándo usar cada uno?</span>
    <h2>API REST vs Firebase Authentication</h2>
    <table style={{ marginTop: '1rem' }}>
      <thead>
        <tr><th></th><th>API REST (sesiones previas)</th><th>Firebase Authentication</th></tr>
      </thead>
      <tbody>
        <tr><td><b>Backend</b></td><td>Lo programas y mantienes tú</td><td>Lo provee Firebase (BaaS)</td></tr>
        <tr><td><b>Login</b></td><td>Tú validas y emites el token</td><td>Firebase valida y gestiona</td></tr>
        <tr><td><b>Sesión</b></td><td>Manejas el token a mano</td><td>onAuthStateChanged + persistencia</td></tr>
        <tr><td><b>Esfuerzo</b></td><td>Mayor</td><td>Menor para autenticación</td></tr>
      </tbody>
    </table>
  </Slide>,

  // 24 · El interceptor usa el token de Firebase
  <TwoColumn
    key="s24"
    eyebrow="Gancho con la S3"
    title="El interceptor usa el token de Firebase"
    lead={<>El interceptor de Axios puede enviar el <b>token de Firebase</b> en cada request.</>}
    left={<CodeBlock html={codeInterceptor} />}
    right={
      <Card title="Para qué">
        <ul>
          <li><code>getIdToken()</code> da el token del usuario actual.</li>
          <li>Lo añadimos a la cabecera <code>Authorization</code>.</li>
          <li>Así una API propia puede verificar quién pide.</li>
        </ul>
      </Card>
    }
  />,

  // ─────────────────────────── BLOQUE 4 ───────────────────────────
  // 25 · Divider 4
  <SectionDivider key="s25" center num="03" eyebrow="Bloque 4" title="Laboratorio" subtitle="Autenticación real. ⌨️" />,

  // 26 · Laboratorio paso a paso
  <CardsGrid key="s26" eyebrow="Práctica guiada" title="Laboratorio paso a paso">
    <Card title="① Configuración">
      <ul>
        <li>Crear proyecto Firebase y habilitar <b>Email/Password</b>.</li>
        <li><code>npm install firebase</code> + <code>src/firebase/config.js</code>.</li>
        <li><code>.env</code> con las <code>VITE_FIREBASE_*</code>.</li>
      </ul>
    </Card>
    <Card title="② Registro y login">
      <ul>
        <li>Formularios (React Hook Form) de registro e inicio de sesión.</li>
        <li><code>createUser...</code> y <code>signIn...</code>.</li>
        <li>Errores con <code>toast.error</code> según <code>error.code</code>.</li>
      </ul>
    </Card>
    <Card title="③ Estado y logout">
      <ul>
        <li><code>useAuthStore</code> + <code>onAuthStateChanged</code> en <code>App.jsx</code>.</li>
        <li>Botón de cerrar sesión con <code>signOut</code>.</li>
      </ul>
    </Card>
    <Card title="④ Rutas protegidas">
      <ul>
        <li>Actualizar <code>RutaPrivada</code> con el usuario real.</li>
        <li>Redirigir a <code>/login</code>; esperar a <code>cargando</code>.</li>
      </ul>
    </Card>
  </CardsGrid>,

  // 27 · Estructura tras la sesión
  <TwoColumn
    key="s27"
    eyebrow="¿Dónde cae cada archivo?"
    title="Estructura tras la Sesión 5"
    left={<div className="card"><div className="tree" dangerouslySetInnerHTML={{ __html: treeFinal }} /></div>}
    right={
      <>
        <p className="lead">Estrena la carpeta <code>firebase/</code> y un store de auth.</p>
        <ul style={{ marginTop: '0.8rem' }}>
          <li><b>firebase/</b> <Arr /> la configuración del SDK.</li>
          <li><b>store/</b> <Arr /> el usuario y el listener.</li>
          <li><b>pages/</b> <Arr /> Login y Registro.</li>
          <li><b>App.jsx</b> <Arr /> arranca el listener.</li>
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
      { title: 'Proveedor no habilitado', titleClass: 'orange', body: 'auth/operation-not-allowed. Habilita Email/Password en la consola.' },
      { title: 'Redirigir antes de tiempo', titleClass: 'orange', body: 'Parpadeo de login. Espera a cargando del listener.' },
      { title: 'Variables sin VITE_', titleClass: 'orange', body: 'firebaseConfig queda undefined. Usa el prefijo y reinicia.' },
      { title: 'Creer que la API Key es secreta', body: 'Es de cliente. La seguridad son las reglas del proyecto.' },
      { title: 'Mostrar error.message crudo', body: 'Traduce error.code a un mensaje amable.' },
      { title: 'Varias instancias de auth', body: 'Exporta una sola auth desde firebase/config.' },
    ]}
  />,

  // 29 · Checklist
  <Slide key="s29">
    <span className="eyebrow">Antes de cerrar</span>
    <h2>Checklist de la sesión</h2>
    <ul className="checks big" style={{ marginTop: '1rem' }}>
      <li>Tengo el proyecto Firebase con Email/Password habilitado.</li>
      <li>Inicialicé el SDK con variables de entorno.</li>
      <li>Implementé registro, login y logout.</li>
      <li>Escucho el estado con onAuthStateChanged (store de Zustand).</li>
      <li>Configuré persistencia y rutas protegidas reales.</li>
    </ul>
  </Slide>,

  // 30 · Resumen
  <Slide key="s30">
    <span className="eyebrow">Lo que aprendiste hoy</span>
    <h2>Resumen de la sesión</h2>
    <div className="grid g2" style={{ marginTop: '0.8rem' }}>
      <Card title="Firebase">
        <p className="muted">
          Un <b>backend de autenticación</b> listo para usar: registro, login, logout y sesión
          persistente sin programar un servidor.
        </p>
      </Card>
      <Card title="React">
        <p className="muted">
          <b>Escucha</b> el estado con <code>onAuthStateChanged</code>, lo guarda en un <b>store</b> y
          <b> protege</b> las rutas con el usuario real.
        </p>
      </Card>
    </div>
    <p className="lead" style={{ marginTop: '1.2rem' }}>
      📌 Idea central: <span className="accent">Firebase autentica; React escucha y reacciona</span>.
    </p>
  </Slide>,

  // 31 · Próxima sesión + cierre
  <Slide key="s31" center>
    <ReactLogo spin="6s" />
    <span className="eyebrow">Próxima sesión</span>
    <h2 style={{ fontSize: '2.4rem' }}>Sesión 6 - Cloud Firestore</h2>
    <div className="grid g2" style={{ marginTop: '1.2rem', maxWidth: '60vw' }}>
      <Card title="Base de datos NoSQL"><p className="muted">Colecciones, documentos, consultas, filtros y ordenamiento.</p></Card>
      <Card title="CRUD en la nube"><p className="muted">Leer, escribir, actualizar y eliminar datos con Firestore.</p></Card>
    </div>
    <p className="muted" style={{ marginTop: '1.2rem' }}>
      <b>Tarea:</b> deja registro, login, logout y rutas protegidas funcionando con Firebase.
    </p>
    <p className="muted" style={{ marginTop: '0.8rem' }}>¿Preguntas? 🙌 ¡Nos vemos en la Sesión 6!</p>
  </Slide>,
]

export default slides
