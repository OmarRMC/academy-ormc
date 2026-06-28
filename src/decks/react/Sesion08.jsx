// ─────────────────────────────────────────────────────────────────────────
// Curso React · Sesión 8 - Git, CI/CD y Despliegue en Firebase (cierre del curso)
// Cada elemento del array `slides` es una diapositiva. El componente <Deck>
// se encarga de la navegación, el progreso y la pantalla completa.
//
// Configuración de CI/CD verificada contra el pipeline real de este portal
// (GitHub Actions + Firebase Hosting).
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
  session: 8,
  title: 'Git, CI/CD y Despliegue en Firebase',
}

// ── Bloques de código (HTML con tokens .tok-*) ────────────────────────────

const codeGitInit = `git init                 <span class="tok-com"># iniciar el repositorio</span>
git add .                <span class="tok-com"># preparar los cambios</span>
git commit -m <span class="tok-str">"..."</span>      <span class="tok-com"># guardar un punto</span>`

const codeCommits = `<span class="tok-key">feat</span>: agregar login con Firebase
<span class="tok-key">fix</span>: corregir validación del formulario
<span class="tok-key">docs</span>: actualizar README
<span class="tok-key">refactor</span>: extraer useTasks`

const codeBranches = `git branch nueva-funcion       <span class="tok-com"># crear rama</span>
git checkout -b nueva-funcion  <span class="tok-com"># crear y cambiar</span>
git merge nueva-funcion        <span class="tok-com"># integrar a main</span>`

const codeGitignore = `<span class="tok-com"># .gitignore</span>
node_modules
dist
.env`

const codeRemote = `git remote add origin https://github.com/usuario/proyecto.git
git push -u origin main`

const codePushPull = `git pull     <span class="tok-com"># traer los últimos cambios</span>
git push     <span class="tok-com"># subir tus commits</span>`

const codeWorkflow = `<span class="tok-attr">name</span>: Deploy to Firebase Hosting on merge
<span class="tok-attr">on</span>:
  <span class="tok-attr">push</span>:
    <span class="tok-attr">branches</span>:
      - main
<span class="tok-attr">jobs</span>:
  <span class="tok-attr">build_and_deploy</span>:
    <span class="tok-attr">runs-on</span>: ubuntu-latest
    <span class="tok-attr">steps</span>:
      - <span class="tok-attr">uses</span>: actions/checkout@v4`

const codeBuild = `      - <span class="tok-attr">run</span>: npm ci &amp;&amp; npm run build`

const codeDeploy = `      - <span class="tok-attr">uses</span>: FirebaseExtended/action-hosting-deploy@v0
        <span class="tok-attr">with</span>:
          <span class="tok-attr">repoToken</span>: \${{ secrets.GITHUB_TOKEN }}
          <span class="tok-attr">firebaseServiceAccount</span>: \${{ secrets.FIREBASE_SERVICE_ACCOUNT }}
          <span class="tok-attr">channelId</span>: live
          <span class="tok-attr">projectId</span>: tu-proyecto`

const codeFirebaseCli = `npm install -g firebase-tools
firebase login
firebase init hosting
firebase deploy --only hosting   <span class="tok-com"># despliegue manual</span>`

const codeFirebaseJson = `{
  <span class="tok-attr">"hosting"</span>: {
    <span class="tok-attr">"public"</span>: <span class="tok-str">"dist"</span>,
    <span class="tok-attr">"rewrites"</span>: [
      { <span class="tok-attr">"source"</span>: <span class="tok-str">"**"</span>, <span class="tok-attr">"destination"</span>: <span class="tok-str">"/index.html"</span> }
    ]
  }
}`

// Estructura del despliegue
const treeDeploy = `<span class="dir">proyecto/</span>
&nbsp;├─ <span class="dir">.github/</span>
&nbsp;│&nbsp;&nbsp;└─ <span class="dir">workflows/</span>
&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├─ firebase-hosting-merge.yml <span class="cmt"># push a main → deploy</span>
&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─ firebase-hosting-pull-request.yml <span class="cmt"># PR → preview</span>
&nbsp;├─ firebase.json <span class="cmt"># config de hosting</span>
&nbsp;├─ .firebaserc &nbsp;&nbsp;<span class="cmt"># proyecto por defecto</span>
&nbsp;└─ <span class="dir">dist/</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="cmt"># build (lo genera npm run build)</span>`

export const slides = [
  // 1 · Portada
  <TitleSlide
    key="s1"
    center
    logo
    eyebrow="Módulo II · Sesión 8"
    title={
      <>
        Git, <span className="accent">CI/CD</span> y Despliegue
        <br />en Firebase
      </>
    }
    subtitle="Desarrollo Front-End Profesional con React, Firebase y CI/CD"
    meta={
      <>
        Expositor: <b>Omar Rodrigo Mamani Capcha</b> · Duración: 1h 30min
      </>
    }
  />,

  // 2 · Cerramos el curso
  <Slide key="s2">
    <span className="eyebrow">Alcance de la sesión</span>
    <h2>Cerramos el curso: a producción</h2>
    <p className="lead" style={{ marginTop: '0.3rem', maxWidth: '72ch' }}>
      Tenemos una app completa (CRUD, auth, Firestore, optimizada). Hoy la <b>llevamos a producción</b>
      con despliegue automático.
    </p>
    <div className="grid g2" style={{ marginTop: '1rem' }}>
      <Card title="Qué agregamos" titleClass="green">
        <ul>
          <li>Versionado con <b>Git</b>.</li>
          <li>Repositorio en <b>GitHub</b>.</li>
          <li>Pipeline de <b>CI/CD</b> a Firebase Hosting.</li>
        </ul>
      </Card>
      <Card title="Qué NO cambia">
        <ul>
          <li>El código de la app.</li>
          <li>El mismo proyecto Firebase.</li>
          <li>Solo añadimos configuración de despliegue.</li>
        </ul>
      </Card>
    </div>
  </Slide>,

  // 3 · Agenda
  <CardsGrid
    key="s3"
    eyebrow="Hoja de ruta"
    title="Agenda de la sesión"
    cards={[
      { title: '1 · Git + GitHub', body: 'Versionar el código, ramas, commits y publicar el repositorio.' },
      { title: '2 · CI/CD + Firebase Hosting', body: 'Construir y desplegar la app automáticamente con GitHub Actions.' },
    ]}
  />,

  // 4 · Objetivos
  <BulletSlide
    key="s4"
    eyebrow="¿Qué lograrás hoy?"
    title="Objetivos de aprendizaje"
    variant="checks"
    items={[
      <>Versionar con <b>Git</b>: inicializar, commits y ramas.</>,
      <>Escribir <b>commits convencionales</b> y seguir un flujo de trabajo.</>,
      <>Publicar en <b>GitHub</b> y colaborar con <b>Pull Requests</b>.</>,
      <>Crear un <b>workflow</b> de <b>GitHub Actions</b> (CI/CD).</>,
      <>Configurar <b>Firebase Hosting</b> con la CLI.</>,
      <>Lograr el <b>despliegue automático</b> en cada push a <code>main</code>.</>,
    ]}
  />,

  // ─────────────────────────── BLOQUE 1 ───────────────────────────
  // 5 · Divider 1
  <SectionDivider key="s5" center num="01" eyebrow="Bloque 1" title="Git: control de versiones" subtitle="La máquina del tiempo de tu código." />,

  // 6 · ¿Qué es Git?
  <TwoColumn
    key="s6"
    eyebrow="Concepto"
    title="¿Qué es Git? Inicializar"
    lead={<>Una <span className="accent">máquina del tiempo</span> ⏳ del código: guardas puntos a los que puedes volver.</>}
    left={<CodeBlock html={codeGitInit} />}
    right={
      <Card title="Claves">
        <ul>
          <li><code>git init</code> crea el repositorio local.</li>
          <li><code>git add</code> prepara los cambios.</li>
          <li><code>git commit</code> guarda un punto en la historia.</li>
        </ul>
      </Card>
    }
  />,

  // 7 · Commits convencionales
  <TwoColumn
    key="s7"
    eyebrow="Historial claro"
    title="Commits convencionales"
    lead={<>Un <b>prefijo</b> que dice el tipo de cambio. Historial legible y profesional.</>}
    left={<CodeBlock html={codeCommits} />}
    right={
      <Card title="Tipos comunes">
        <ul>
          <li><code>feat</code> nueva funcionalidad.</li>
          <li><code>fix</code> corrección de bug.</li>
          <li><code>docs</code> documentación.</li>
          <li><code>refactor</code>, <code>style</code>, <code>test</code>, <code>chore</code>.</li>
        </ul>
      </Card>
    }
  />,

  // 8 · Branches
  <TwoColumn
    key="s8"
    eyebrow="Trabajar sin romper"
    title="Branches (ramas)"
    lead={<>Una <b>línea paralela</b> para trabajar sin tocar lo estable.</>}
    left={<CodeBlock html={codeBranches} />}
    right={
      <Card title="La idea">
        <ul>
          <li><code>main</code> siempre <b>estable</b>.</li>
          <li>Las novedades se trabajan en <b>ramas</b>.</li>
          <li>Al terminar, se integran (merge) a <code>main</code>.</li>
        </ul>
      </Card>
    }
  />,

  // 9 · Flujo de trabajo
  <Slide key="s9" center>
    <span className="eyebrow">Cómo se trabaja en equipo</span>
    <h2>Flujo de trabajo con Git</h2>
    <Flow
      style={{ marginTop: '1.4rem' }}
      steps={['Crear rama', 'Commits', 'Push', 'Pull Request', { label: 'Merge a main', ok: true }]}
    />
    <p className="muted" style={{ marginTop: '1.6rem' }}>
      Cambios pequeños, revisados e integrados con orden.
    </p>
  </Slide>,

  // 10 · .gitignore
  <TwoColumn
    key="s10"
    eyebrow="Qué NO subir"
    title=".gitignore"
    lead={<>Dependencias y <b>secretos</b> nunca van al repositorio.</>}
    left={<CodeBlock html={codeGitignore} />}
    right={
      <Card title="Recordatorio">
        <ul>
          <li><code>node_modules</code> se reinstala con <code>npm install</code>.</li>
          <li><code>dist</code> se regenera con el build.</li>
          <li>El <code>.env</code> (S3/S5) <b>jamás</b> se sube.</li>
        </ul>
      </Card>
    }
  />,

  // ─────────────────────────── BLOQUE 2 ───────────────────────────
  // 11 · Divider 2
  <SectionDivider key="s11" center num="02" eyebrow="Bloque 2" title="GitHub" subtitle="Tu código en la nube, para compartir y colaborar." />,

  // 12 · ¿Qué es GitHub?
  <TwoColumn
    key="s12"
    eyebrow="Git en la nube"
    title="¿Qué es GitHub? Subir el repo"
    lead={<>GitHub guarda tu repositorio en la nube para <b>compartir</b> y <b>colaborar</b>.</>}
    left={<CodeBlock html={codeRemote} />}
    right={
      <Card title="Claves">
        <ul>
          <li><code>remote add origin</code> enlaza tu repo con GitHub.</li>
          <li><code>push -u origin main</code> sube tu rama principal.</li>
          <li>Desde ahí, otros pueden verlo y colaborar.</li>
        </ul>
      </Card>
    }
  />,

  // 13 · Gestión del código
  <TwoColumn
    key="s13"
    eyebrow="El día a día"
    title="Gestión del código"
    lead={<>Traer cambios y subir los tuyos. Como un <b>Google Docs</b> del código.</>}
    left={<CodeBlock html={codePushPull} />}
    right={
      <Card title="Claves">
        <ul>
          <li><code>git pull</code> antes de empezar a trabajar.</li>
          <li><code>git push</code> al terminar tus commits.</li>
          <li>Así todos quedan sincronizados.</li>
        </ul>
      </Card>
    }
  />,

  // 14 · Pull Requests
  <TwoColumn
    key="s14"
    eyebrow="Revisar antes de integrar"
    title="Pull Requests"
    left={
      <>
        <p className="lead">
          Una <b>propuesta de cambios</b> desde una rama hacia <code>main</code>, para <b>revisar</b>
          antes de integrar.
        </p>
        <ul style={{ marginTop: '0.8rem' }}>
          <li>Se comenta y se revisa el código.</li>
          <li>Se aprueba y se hace merge.</li>
          <li>Base del trabajo en equipo.</li>
        </ul>
      </>
    }
    right={
      <Card title="Bonus: preview por PR">
        <p className="muted">
          Con CI/CD, cada PR puede generar un <b>enlace de vista previa</b> para revisar el cambio
          en vivo antes de publicarlo. (Lo veremos en el pipeline.)
        </p>
      </Card>
    }
  />,

  // ─────────────────────────── BLOQUE 3 ───────────────────────────
  // 15 · Divider 3
  <SectionDivider key="s15" center num="03" eyebrow="Bloque 3" title="CI/CD con GitHub Actions" subtitle="Construir y publicar, sin pasos manuales." />,

  // 16 · ¿Qué es CI/CD?
  <TwoColumn
    key="s16"
    eyebrow="Concepto"
    title="¿Qué es CI/CD?"
    left={
      <>
        <p className="lead">
          Automatizar la entrega del software. Una <span className="accent">cinta transportadora</span> 🏭:
          el código entra y sale publicado.
        </p>
        <ul style={{ marginTop: '1rem' }}>
          <li><b>CI:</b> cada cambio se <b>construye y prueba</b> solo.</li>
          <li><b>CD:</b> si todo va bien, se <b>publica</b> solo.</li>
        </ul>
      </>
    }
    right={
      <Card title="¿Por qué importa?">
        <ul>
          <li>Menos errores humanos.</li>
          <li>Despliegues <b>rápidos</b> y repetibles.</li>
          <li>El equipo se concentra en programar.</li>
        </ul>
      </Card>
    }
  />,

  // 17 · Workflows
  <TwoColumn
    key="s17"
    eyebrow="El archivo del pipeline"
    title="Workflows (YAML)"
    lead={<>Un archivo en <code>.github/workflows/</code> describe <b>cuándo</b> y <b>qué</b> hacer.</>}
    left={<CodeBlock html={codeWorkflow} />}
    right={
      <Card title="Claves">
        <ul>
          <li><code>on: push a main</code> dispara el flujo.</li>
          <li>Corre en un <b>runner</b> (<code>ubuntu-latest</code>).</li>
          <li><code>checkout</code> trae tu código al runner.</li>
        </ul>
      </Card>
    }
  />,

  // 18 · Build automático
  <TwoColumn
    key="s18"
    eyebrow="Construir la app"
    title="Build automático"
    lead={<>El runner instala dependencias y genera <code>dist/</code>.</>}
    left={<CodeBlock html={codeBuild} />}
    right={
      <Card title="Claves">
        <ul>
          <li><code>npm ci</code> instala exacto lo del <code>package-lock</code>.</li>
          <li><code>npm run build</code> compila la app.</li>
          <li>El resultado va en la carpeta <code>dist</code>.</li>
        </ul>
      </Card>
    }
  />,

  // 19 · Deploy automático
  <TwoColumn
    key="s19"
    eyebrow="Publicar la app"
    title="Deploy automático"
    lead={<>Una action oficial publica <code>dist/</code> en Firebase Hosting.</>}
    left={<CodeBlock html={codeDeploy} />}
    right={
      <Card title="Claves">
        <ul>
          <li><code>action-hosting-deploy</code> hace el despliegue.</li>
          <li><code>channelId: live</code> publica a producción.</li>
          <li><code>projectId</code> indica el proyecto Firebase.</li>
        </ul>
      </Card>
    }
  />,

  // 20 · El secret
  <TwoColumn
    key="s20"
    eyebrow="Permiso para desplegar"
    title="El secret (cuenta de servicio)"
    left={
      <>
        <p className="lead">
          La action necesita permiso: una <b>cuenta de servicio</b> guardada como <b>secret</b> en GitHub.
        </p>
        <ul style={{ marginTop: '0.8rem' }}>
          <li>Nunca se pone la clave en el código.</li>
          <li>Va en <b>Settings → Secrets</b> del repo.</li>
        </ul>
      </>
    }
    right={
      <Card title="Lo hace la CLI por ti" titleClass="green">
        <p className="muted">
          <code>firebase init hosting:github</code> <b>genera los workflows y el secret</b>
          automáticamente. No hay que escribirlos a mano.
        </p>
      </Card>
    }
  />,

  // ─────────────────────────── BLOQUE 4 ───────────────────────────
  // 21 · Divider 4
  <SectionDivider key="s21" center num="04" eyebrow="Bloque 4" title="Firebase Hosting" subtitle="Publicar la app con HTTPS." />,

  // 22 · ¿Qué es Firebase Hosting?
  <TwoColumn
    key="s22"
    eyebrow="Dónde vive la app"
    title="¿Qué es Firebase Hosting?"
    left={
      <>
        <p className="lead">
          Hosting rápido y con <b>HTTPS</b> para apps web estáticas, como nuestra <b>SPA</b> de React.
        </p>
        <ul style={{ marginTop: '0.8rem' }}>
          <li>CDN global: carga rápida en todo el mundo.</li>
          <li>Mismo proyecto Firebase de la S5/S6.</li>
          <li>URL pública lista para compartir.</li>
        </ul>
      </>
    }
    right={
      <Card title="Integrado">
        <p className="muted">
          Auth, Firestore y Hosting en un <b>solo proyecto</b>: todo conectado y administrado desde
          la misma consola.
        </p>
      </Card>
    }
  />,

  // 23 · Firebase CLI
  <TwoColumn
    key="s23"
    eyebrow="La herramienta de línea de comandos"
    title="Firebase CLI + init"
    lead={<>Instalamos la CLI, iniciamos sesión y configuramos el hosting.</>}
    left={<CodeBlock html={codeFirebaseCli} />}
    right={
      <Card title="En el init">
        <ul>
          <li>Carpeta pública: <code>dist</code>.</li>
          <li>Configurar como <b>SPA</b> (sí).</li>
          <li><code>firebase deploy</code> publica de forma manual.</li>
        </ul>
      </Card>
    }
  />,

  // 24 · firebase.json
  <TwoColumn
    key="s24"
    eyebrow="La config clave"
    title="firebase.json"
    lead={<>Publicar <code>dist</code> y redirigir todo a <code>index.html</code> (SPA con React Router).</>}
    left={<CodeBlock html={codeFirebaseJson} />}
    right={
      <Card title="Cuidado">
        <ul>
          <li>En Vite, <code>public</code> debe ser <code>"dist"</code>.</li>
          <li>Sin el <b>rewrite</b>, recargar <code>/tareas</code> daría <b>404</b>.</li>
          <li>El rewrite manda todo a <code>index.html</code>.</li>
        </ul>
      </Card>
    }
  />,

  // 25 · El flujo profesional completo
  <Slide key="s25" center>
    <span className="eyebrow">Todo conectado</span>
    <h2>El flujo profesional completo</h2>
    <Flow
      style={{ marginTop: '1.4rem' }}
      steps={['Desarrollo', 'Git', 'GitHub', 'GitHub Actions', { label: 'Firebase Hosting', ok: true }]}
    />
    <p className="lead" style={{ marginTop: '1.6rem' }}>
      Haces <code>push</code> y, sin tocar nada más, la app se <span className="accent">construye y se publica sola</span>.
    </p>
  </Slide>,

  // ─────────────────────────── BLOQUE 5 ───────────────────────────
  // 26 · Divider 5
  <SectionDivider key="s26" center num="05" eyebrow="Bloque 5" title="Laboratorio" subtitle="De tu PC a producción. ⌨️" />,

  // 27 · Laboratorio paso a paso
  <CardsGrid key="s27" eyebrow="Práctica guiada" title="Laboratorio paso a paso">
    <Card title="① Git + GitHub">
      <ul>
        <li><code>git init</code>, <code>.gitignore</code>, primer commit.</li>
        <li>Crear el repo en GitHub y <code>git push</code>.</li>
      </ul>
    </Card>
    <Card title="② Firebase Hosting">
      <ul>
        <li><code>firebase login</code> y <code>firebase init hosting</code>.</li>
        <li>Carpeta <code>dist</code>, modo SPA; probar <code>firebase deploy</code>.</li>
      </ul>
    </Card>
    <Card title="③ CI/CD">
      <ul>
        <li><code>firebase init hosting:github</code>.</li>
        <li>Revisar los archivos en <code>.github/workflows/</code>.</li>
      </ul>
    </Card>
    <Card title="④ Despliegue automático">
      <ul>
        <li>Cambio, commit y <code>push</code> a <code>main</code>.</li>
        <li>Ver la action y la app publicada en la URL. 🎉</li>
      </ul>
    </Card>
  </CardsGrid>,

  // 28 · Estructura del despliegue
  <TwoColumn
    key="s28"
    eyebrow="Los archivos del deploy"
    title="Estructura del despliegue"
    left={<div className="card"><div className="tree" dangerouslySetInnerHTML={{ __html: treeDeploy }} /></div>}
    right={
      <>
        <p className="lead">Todo aditivo: el código de la app no se toca.</p>
        <ul style={{ marginTop: '0.8rem' }}>
          <li><b>.github/workflows/</b> <Arr /> el pipeline.</li>
          <li><b>firebase.json</b> <Arr /> config de hosting.</li>
          <li><b>.firebaserc</b> <Arr /> proyecto por defecto.</li>
          <li><b>dist/</b> <Arr /> lo genera el build.</li>
        </ul>
      </>
    }
  />,

  // ─────────────────────────── CIERRE ───────────────────────────
  // 29 · Errores frecuentes
  <CardsGrid
    key="s29"
    cols={3}
    eyebrow="Para no tropezar"
    title="Errores frecuentes"
    cards={[
      { title: 'public mal configurado', titleClass: 'orange', body: 'En Vite debe ser "public": "dist".' },
      { title: 'Falta el rewrite SPA', titleClass: 'orange', body: 'Recargar /ruta da 404. Añade ** → /index.html.' },
      { title: 'Subir .env o node_modules', titleClass: 'orange', body: 'Usa .gitignore.' },
      { title: 'Secret ausente', body: 'La action falla al autenticar. Usa firebase init hosting:github.' },
      { title: 'Build sin npm ci', body: 'Versiones inconsistentes. Usa npm ci en el workflow.' },
      { title: 'Workflow en otra rama', body: 'No se dispara. El flujo escucha push a main.' },
    ]}
  />,

  // 30 · Checklist
  <Slide key="s30">
    <span className="eyebrow">Antes de cerrar</span>
    <h2>Checklist de la sesión</h2>
    <ul className="checks big" style={{ marginTop: '1rem' }}>
      <li>Versioné el proyecto con Git y commits convencionales.</li>
      <li>Subí el código a GitHub y entiendo los Pull Requests.</li>
      <li>Creé un workflow de GitHub Actions (build + deploy).</li>
      <li>Configuré Firebase Hosting con firebase.json.</li>
      <li>Cada push a main despliega la app automáticamente.</li>
    </ul>
  </Slide>,

  // 31 · Resumen
  <Slide key="s31">
    <span className="eyebrow">Lo que aprendiste hoy</span>
    <h2>Resumen de la sesión</h2>
    <div className="grid g2" style={{ marginTop: '0.8rem' }}>
      <Card title="Git + GitHub">
        <p className="muted">
          Versionar, ramificar y colaborar: commits convencionales, ramas y Pull Requests.
        </p>
      </Card>
      <Card title="CI/CD + Hosting">
        <p className="muted">
          Un workflow construye y publica la app en Firebase Hosting en cada push a <code>main</code>.
        </p>
      </Card>
    </div>
    <p className="lead" style={{ marginTop: '1.2rem' }}>
      📌 Idea central: <span className="accent">hago push y la app se construye y se publica sola</span>.
    </p>
  </Slide>,

  // 32 · ¡Curso completo!
  <Slide key="s32" center>
    <span className="eyebrow">Recorrido completo</span>
    <h2>¡Curso completo! 🎉</h2>
    <div className="grid g2" style={{ marginTop: '1rem', maxWidth: '68vw' }}>
      <Card title="Módulo I · React + APIs REST">
        <p className="muted">Ecosistema React, componentes y navegación, APIs REST con Axios, estado global y formularios.</p>
      </Card>
      <Card title="Módulo II · Firebase + CI/CD">
        <p className="muted">Authentication, Cloud Firestore, arquitectura y optimización, y despliegue con CI/CD.</p>
      </Card>
    </div>
    <p className="lead" style={{ marginTop: '1.2rem' }}>
      Construiste una app <span className="accent">profesional</span>, en producción, con despliegue automático.
    </p>
  </Slide>,

  // 33 · Cierre + agradecimiento
  <Slide key="s33" center>
    <ReactLogo spin="6s" />
    <h1>¡Gracias! 🙌</h1>
    <p className="lead muted" style={{ marginTop: '1rem' }}>
      Felicidades por completar el curso.
      <br />
      Sigue practicando y suma este proyecto a tu portafolio.
    </p>
    <p className="muted" style={{ marginTop: '1.6rem' }}>
      Desarrollo Front-End Profesional con React, Firebase y CI/CD · Omar Rodrigo Mamani Capcha
    </p>
  </Slide>,
]

export default slides
