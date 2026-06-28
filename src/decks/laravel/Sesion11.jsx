// ─────────────────────────────────────────────────────────────────────────
// Curso Laravel 13 · Sesión 11 - Funcionalidades Avanzadas
// Cada elemento del array `slides` es una diapositiva. El componente <Deck>
// se encarga de la navegación, el progreso y la pantalla completa.
// Usa `center` en un nodo para centrar esa diapositiva.
// Base pedagógica: docs/laravel/SESION-11-PLANIFICACION.md
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
  session: 11,
  title: 'Funcionalidades Avanzadas',
}

// ── Bloques de código (HTML resaltado) ────────────────────────────────────

const codeMailEnv = `<span class="tok-attr">MAIL_MAILER</span>=smtp
<span class="tok-attr">MAIL_HOST</span>=sandbox.smtp.mailtrap.io
<span class="tok-attr">MAIL_PORT</span>=2525
<span class="tok-attr">MAIL_USERNAME</span>=tu_usuario
<span class="tok-attr">MAIL_PASSWORD</span>=tu_password
<span class="tok-attr">MAIL_FROM_ADDRESS</span>=<span class="tok-str">"no-reply@gestion.app"</span>
<span class="tok-attr">MAIL_FROM_NAME</span>=<span class="tok-str">"Gestion App"</span>`

const codeMailBash = `php artisan make:mail TareaCreada`

const codeMailClass = `<span class="tok-key">class</span> <span class="tok-fn">TareaCreada</span> <span class="tok-key">extends</span> Mailable
{
    <span class="tok-key">use</span> Queueable, SerializesModels;

    <span class="tok-key">public function</span> <span class="tok-fn">__construct</span>(<span class="tok-key">public</span> Tarea $tarea) {}

    <span class="tok-key">public function</span> <span class="tok-fn">envelope</span>(): Envelope
    {
        <span class="tok-key">return new</span> <span class="tok-fn">Envelope</span>(<span class="tok-attr">subject</span>: <span class="tok-str">'Nueva tarea creada'</span>);
    }

    <span class="tok-key">public function</span> <span class="tok-fn">content</span>(): Content
    {
        <span class="tok-key">return new</span> <span class="tok-fn">Content</span>(<span class="tok-attr">view</span>: <span class="tok-str">'emails.tarea-creada'</span>);
    }
}`

const codeMailBlade = `<span class="tok-com">{{-- resources/views/emails/tarea-creada.blade.php --}}</span>
&lt;h1&gt;Hola&lt;/h1&gt;
&lt;p&gt;Se creo la tarea: &lt;strong&gt;{{ $tarea-&gt;titulo }}&lt;/strong&gt;&lt;/p&gt;`

const codeMailSend = `<span class="tok-key">use</span> Illuminate\\Support\\Facades\\Mail;

Mail::<span class="tok-fn">to</span>($usuario)-&gt;<span class="tok-fn">send</span>(<span class="tok-key">new</span> <span class="tok-fn">TareaCreada</span>($tarea));`

const codeQueueEnv = `<span class="tok-attr">QUEUE_CONNECTION</span>=database

<span class="tok-com"># tabla de trabajos</span>
php artisan make:queue-table
php artisan migrate`

const codeJobBash = `php artisan make:job ProcesarReporte`

const codeJobClass = `<span class="tok-key">class</span> <span class="tok-fn">ProcesarReporte</span> <span class="tok-key">implements</span> ShouldQueue
{
    <span class="tok-key">use</span> Queueable;

    <span class="tok-key">public function</span> <span class="tok-fn">__construct</span>(<span class="tok-key">public int</span> $tareaId) {}

    <span class="tok-key">public function</span> <span class="tok-fn">handle</span>(): <span class="tok-key">void</span>
    {
        <span class="tok-com">// trabajo pesado: generar reporte, enviar correos...</span>
    }
}`

const codeDispatch = `<span class="tok-com">// Despachar el job a la cola (vuelve al instante)</span>
ProcesarReporte::<span class="tok-fn">dispatch</span>($tarea-&gt;id);

<span class="tok-com">// Con retraso</span>
ProcesarReporte::<span class="tok-fn">dispatch</span>($tarea-&gt;id)-&gt;<span class="tok-fn">delay</span>(<span class="tok-fn">now</span>()-&gt;<span class="tok-fn">addMinutes</span>(<span class="tok-num">5</span>));

<span class="tok-com"># El worker procesa los trabajos pendientes</span>
php artisan queue:work`

const codeCmdBash = `php artisan make:command EnviarRecordatorios`

const codeCmdClass = `<span class="tok-key">class</span> <span class="tok-fn">EnviarRecordatorios</span> <span class="tok-key">extends</span> Command
{
    <span class="tok-key">protected</span> $signature = <span class="tok-str">'app:enviar-recordatorios'</span>;
    <span class="tok-key">protected</span> $description = <span class="tok-str">'Envia recordatorios de tareas pendientes'</span>;

    <span class="tok-key">public function</span> <span class="tok-fn">handle</span>(): <span class="tok-key">void</span>
    {
        <span class="tok-com">// ... buscar tareas y enviar correos ...</span>
        $this-&gt;<span class="tok-fn">info</span>(<span class="tok-str">'Recordatorios enviados.'</span>);
    }
}`

const codeCmdArgs = `<span class="tok-com">// signature con argumento {user} y opcion {--queue}</span>
<span class="tok-key">protected</span> $signature = <span class="tok-str">'app:enviar-recordatorios {user} {--queue}'</span>;

<span class="tok-key">public function</span> <span class="tok-fn">handle</span>(): <span class="tok-key">void</span>
{
    $userId = $this-&gt;<span class="tok-fn">argument</span>(<span class="tok-str">'user'</span>);   <span class="tok-com">// obligatorio</span>
    $enCola = $this-&gt;<span class="tok-fn">option</span>(<span class="tok-str">'queue'</span>);    <span class="tok-com">// true/false</span>

    $this-&gt;<span class="tok-fn">info</span>(<span class="tok-str">'Procesando usuario '</span>.$userId);
    $this-&gt;<span class="tok-fn">error</span>(<span class="tok-str">'Algo salio mal'</span>);      <span class="tok-com">// texto en rojo</span>
}`

const codeScheduleDef = `<span class="tok-com">// routes/console.php</span>
<span class="tok-key">use</span> Illuminate\\Support\\Facades\\Schedule;

Schedule::<span class="tok-fn">command</span>(<span class="tok-str">'app:enviar-recordatorios'</span>)-&gt;<span class="tok-fn">dailyAt</span>(<span class="tok-str">'08:00'</span>);
Schedule::<span class="tok-fn">job</span>(<span class="tok-key">new</span> <span class="tok-fn">ProcesarReporte</span>(<span class="tok-num">1</span>))-&gt;<span class="tok-fn">everyFiveMinutes</span>();`

const codeScheduleRun = `<span class="tok-com">// Frecuencias: hay decenas</span>
Schedule::<span class="tok-fn">command</span>(<span class="tok-str">'app:limpiar'</span>)-&gt;<span class="tok-fn">daily</span>();
Schedule::<span class="tok-fn">command</span>(<span class="tok-str">'app:reporte'</span>)-&gt;<span class="tok-fn">weekly</span>()-&gt;<span class="tok-fn">mondays</span>()-&gt;<span class="tok-fn">at</span>(<span class="tok-str">'09:00'</span>);

<span class="tok-com"># UNA sola entrada de cron en el servidor (cada minuto):</span>
* * * * * cd /ruta &amp;&amp; php artisan schedule:run &gt;&gt; /dev/null 2&gt;&amp;1

php artisan schedule:list   <span class="tok-com"># ver lo programado</span>
php artisan schedule:work   <span class="tok-com"># correr el scheduler en local</span>`

export const slides = [
  // 1 · Portada
  <Slide key="s1" center>
    <LaravelLogo />
    <span className="eyebrow">Módulo III · Sesión 11</span>
    <h1>
      Funcionalidades <span className="accent">Avanzadas</span>
    </h1>
    <p className="lead muted" style={{ marginTop: '1.2rem' }}>
      Desarrollo de Aplicaciones Web con Laravel 13
    </p>
    <p className="muted" style={{ marginTop: '1.6rem' }}>
      Expositor: <b>Omar Mamani</b> · Duración: 1h 30min
    </p>
  </Slide>,

  // 2 · Repaso de la Sesión 10
  <CardsGrid
    key="s2"
    cols={3}
    eyebrow="Venimos de la Sesión 10"
    title="Repaso rápido"
    cards={[
      { title: '🔌 API REST', body: 'Rutas, controladores y respuestas JSON.' },
      { title: '🎚️ API Resources', body: 'Transformar los datos al cliente.' },
      { title: '🧪 Postman y versionado', body: 'Probar y mantener la API.' },
    ]}
  />,

  // 3 · Agenda
  <CardsGrid
    key="s3"
    eyebrow="Hoja de ruta"
    title="Agenda de la sesión"
    cards={[
      { title: '1 · Envío de Correos', body: 'Mailables y SMTP.' },
      { title: '2 · Colas y Workers', body: 'Trabajo en segundo plano.' },
      { title: '3 · Comandos Artisan', body: 'Automatizar procesos.' },
      { title: '4 · Scheduler (Cron)', body: 'Programar tareas + Laboratorio.' },
    ]}
  />,

  // 4 · Objetivos
  <BulletSlide
    key="s4"
    eyebrow="¿Qué lograrás hoy?"
    title="Objetivos de aprendizaje"
    variant="checks"
    items={[
      <>Configurar el <b>envío de correos</b> por SMTP.</>,
      <>Crear <b>Mailables</b> con plantilla Blade.</>,
      <>Enviar correo <b>síncrono</b> y <b>asíncrono</b>.</>,
      <>Entender qué es una <b>cola</b> (segundo plano).</>,
      <>Crear <b>Jobs</b> y despacharlos.</>,
      <>Correr el <b>Queue Worker</b> y conocer Supervisor.</>,
      <>Crear <b>comandos Artisan</b> propios.</>,
      <>Programar tareas con el <b>Scheduler</b>.</>,
    ]}
  />,

  // 5 · Divider 1
  <SectionDivider key="s5" center num="01" eyebrow="Bloque 1" title="Envío de Correos" subtitle="Notificar a tus usuarios." />,

  // 6 · Configuración SMTP
  <Slide key="s6">
    <span className="eyebrow">La conexión de correo</span>
    <h2>Configuración SMTP</h2>
    <CodeBlock html={codeMailEnv} />
    <p className="muted" style={{ marginTop: '0.8rem' }}>
      💡 En desarrollo se usa <b>Mailtrap</b> (atrapa los correos sin enviarlos de verdad). En
      producción: Gmail, SES, Postmark, etc.
    </p>
  </Slide>,

  // 7 · Mailables
  <Slide key="s7">
    <span className="eyebrow">Cada correo, una clase</span>
    <h2>Mailables</h2>
    <CodeBlock html={codeMailBash} />
    <div style={{ marginTop: '0.7rem' }}>
      <CodeBlock html={codeMailClass} />
    </div>
    <p className="muted" style={{ marginTop: '0.7rem' }}>
      <code>envelope()</code> define el asunto; <code>content()</code>, la vista. Las propiedades
      públicas llegan solas a la plantilla.
    </p>
  </Slide>,

  // 8 · Plantilla Blade y enviar
  <Slide key="s8">
    <span className="eyebrow">La vista del correo</span>
    <h2>Plantilla Blade y enviar</h2>
    <CodeBlock html={codeMailBlade} />
    <div style={{ marginTop: '0.7rem' }}>
      <CodeBlock html={codeMailSend} />
    </div>
    <p className="muted" style={{ marginTop: '0.7rem' }}>
      La plantilla es Blade normal (también hay correos Markdown).
      <code> Mail::to(...)-&gt;send(...)</code> lo envía.
    </p>
  </Slide>,

  // 9 · Síncrono vs asíncrono
  <TwoColumn
    key="s9"
    eyebrow="No hagas esperar al usuario"
    title="Síncrono vs asíncrono"
    left={
      <Card title="Síncrono (send)">
        <p className="muted">
          El usuario <b>espera</b> a que el correo se envíe antes de ver la respuesta. Bien para 1
          correo rápido.
        </p>
      </Card>
    }
    right={
      <Card title="Asíncrono (queue)">
        <p className="muted">
          El correo se <b>encola</b> y se envía en segundo plano; el usuario sigue al instante.
        </p>
        <p className="muted" style={{ marginTop: '0.5rem' }}>
          <code>Mail::to($u)-&gt;queue(new TareaCreada($tarea))</code>. Si el mailable
          <code> implements ShouldQueue</code>, siempre se encola.
        </p>
      </Card>
    }
  />,

  // 10 · Divider 2
  <SectionDivider key="s10" center num="02" eyebrow="Bloque 2" title="Colas (Queues) y Workers" subtitle="Mueve el trabajo pesado a segundo plano." />,

  // 11 · ¿Qué es una cola?
  <TwoColumn
    key="s11"
    eyebrow="Trabajo en segundo plano"
    title="¿Qué es una cola?"
    left={
      <>
        <p className="lead">
          Tareas lentas (correos, reportes, procesar imágenes) se ponen en una <b>cola</b> y se
          ejecutan aparte, sin congelar la app.
        </p>
        <p className="muted" style={{ marginTop: '0.8rem' }}>
          <b>Analogía:</b> la <b>lavandería</b> 🧺: dejas la ropa con un ticket y te vas; alguien la
          lava después. Un <b>worker</b> procesa los trabajos pendientes.
        </p>
      </>
    }
    right={<CodeBlock html={codeQueueEnv} />}
  />,

  // 12 · Jobs
  <Slide key="s12">
    <span className="eyebrow">Una unidad de trabajo</span>
    <h2>Jobs</h2>
    <CodeBlock html={codeJobBash} />
    <div style={{ marginTop: '0.7rem' }}>
      <CodeBlock html={codeJobClass} />
    </div>
    <p className="muted" style={{ marginTop: '0.7rem' }}>
      <code>implements ShouldQueue</code> marca el job como "encolable"; la lógica va en
      <code> handle()</code>.
    </p>
  </Slide>,

  // 13 · Despachar y el Worker
  <Slide key="s13">
    <span className="eyebrow">A la cola y a procesar</span>
    <h2>Despachar y el Worker</h2>
    <CodeBlock html={codeDispatch} />
    <p className="muted" style={{ marginTop: '0.8rem' }}>
      El <b>worker</b> debe estar corriendo para que los trabajos se ejecuten. En <b>producción</b> se
      usa <b>Supervisor</b> para mantenerlo vivo y reiniciarlo si se cae.
    </p>
  </Slide>,

  // 14 · Divider 3
  <SectionDivider key="s14" center num="03" eyebrow="Bloque 3" title="Comandos Artisan" subtitle="Automatiza procesos desde la terminal." />,

  // 15 · Crear un comando
  <Slide key="s15">
    <span className="eyebrow">Tu propia herramienta</span>
    <h2>Crear un comando</h2>
    <CodeBlock html={codeCmdBash} />
    <div style={{ marginTop: '0.7rem' }}>
      <CodeBlock html={codeCmdClass} />
    </div>
    <p className="muted" style={{ marginTop: '0.7rem' }}>
      Ejecutable con <code>php artisan app:enviar-recordatorios</code>. (También existe la sintaxis con
      atributo <code>#[Signature(...)]</code>.)
    </p>
  </Slide>,

  // 16 · Argumentos, opciones y salida
  <Slide key="s16">
    <span className="eyebrow">Entrada y salida</span>
    <h2>Argumentos, opciones y salida</h2>
    <CodeBlock html={codeCmdArgs} />
    <p className="muted" style={{ marginTop: '0.8rem' }}>
      <code>{'{user}'}</code> = argumento; <code>{'{--queue}'}</code> = opción. Se leen con
      <code> argument()</code> y <code>option()</code>. Salida: <code>info()</code>, <code>error()</code>,
      <code> line()</code>.
    </p>
  </Slide>,

  // 17 · Divider 4
  <SectionDivider key="s17" center num="04" eyebrow="Bloque 4" title="Scheduler (Cron)" subtitle="Programa tareas que se ejecutan solas." />,

  // 18 · ¿Qué es el Scheduler?
  <TwoColumn
    key="s18"
    eyebrow="Programación de tareas"
    title="¿Qué es el Scheduler?"
    left={
      <>
        <p className="lead">
          Defines las tareas programadas en <b>código</b> (<code>routes/console.php</code>). En el
          servidor solo configuras <b>una</b> entrada de cron.
        </p>
        <p className="muted" style={{ marginTop: '0.8rem' }}>
          <b>Analogía:</b> un <b>despertador</b> ⏰: programas QUÉ y CUÁNDO, y se dispara solo. Adiós a
          editar el <code>crontab</code> por cada tarea.
        </p>
      </>
    }
    right={<CodeBlock html={codeScheduleDef} />}
  />,

  // 19 · Programar y ejecutar
  <Slide key="s19">
    <span className="eyebrow">Frecuencias y ejecución</span>
    <h2>Programar y ejecutar</h2>
    <CodeBlock html={codeScheduleRun} />
    <p className="muted" style={{ marginTop: '0.8rem' }}>
      Laravel decide qué toca según la hora. Frecuencias: <code>everyMinute</code>, <code>hourly</code>,
      <code> daily</code>, <code>dailyAt('13:00')</code>, <code>weekly</code>...
    </p>
  </Slide>,

  // 20 · Divider 5
  <SectionDivider key="s20" center num="05" eyebrow="Bloque 5" title="Laboratorio" subtitle="Correo por cola + comando + Scheduler. ⌨️" />,

  // 21 · Laboratorio paso a paso
  <CardsGrid key="s21" eyebrow="Práctica guiada" title="Laboratorio paso a paso">
    <Card title="① Correo por cola">
      <ul>
        <li>SMTP (Mailtrap) en <code>.env</code>.</li>
        <li><code>make:mail TareaCreada</code> + enviar con <code>-&gt;queue(...)</code>.</li>
      </ul>
    </Card>
    <Card title="② Preparar la cola">
      <ul>
        <li><code>QUEUE_CONNECTION=database</code> + <code>make:queue-table</code>.</li>
        <li>Levantar <code>php artisan queue:work</code>.</li>
      </ul>
    </Card>
    <Card title="③ Comando Artisan">
      <ul>
        <li><code>make:command EnviarRecordatorios</code>.</li>
        <li>Buscar tareas pendientes y encolar correos.</li>
      </ul>
    </Card>
    <Card title="④ Programarlo">
      <ul>
        <li><code>Schedule::command(...)-&gt;dailyAt('08:00')</code>.</li>
        <li>Probar con <code>php artisan schedule:work</code>.</li>
      </ul>
    </Card>
  </CardsGrid>,

  // 22 · El flujo completo
  <Slide key="s22">
    <span className="eyebrow">Todo conectado</span>
    <h2>El flujo completo</h2>
    <Flow
      style={{ marginTop: '1.2rem' }}
      steps={['Scheduler (cada día)', 'Comando', 'Encola correo', 'Worker', { label: 'Correo enviado', ok: true }]}
    />
    <p className="muted" style={{ marginTop: '1.4rem' }}>
      🧠 El usuario nunca espera, y las tareas repetitivas se ejecutan solas. Eso es un backend
      profesional.
    </p>
  </Slide>,

  // 23 · Checklist
  <Slide key="s23">
    <span className="eyebrow">Antes de cerrar</span>
    <h2>Checklist de la sesión</h2>
    <ul className="checks big" style={{ marginTop: '1rem' }}>
      <li>Configuro el envío de correos por SMTP.</li>
      <li>Creo Mailables con plantilla Blade.</li>
      <li>Envío correo síncrono (send) y asíncrono (queue).</li>
      <li>Entiendo qué es una cola y el segundo plano.</li>
      <li>Creo Jobs y los despacho (dispatch).</li>
      <li>Corro el Queue Worker y conozco Supervisor.</li>
      <li>Creo comandos Artisan con argumentos y opciones.</li>
      <li>Programo tareas con el Scheduler (una sola entrada de cron).</li>
    </ul>
  </Slide>,

  // 24 · Resumen
  <Slide key="s24">
    <span className="eyebrow">Lo que aprendiste hoy</span>
    <h2>Resumen de la sesión</h2>
    <div className="grid g2" style={{ marginTop: '0.8rem' }}>
      <Card title="Segundo plano">
        <p className="muted">
          Correos y trabajo pesado van a <b>colas</b>; un <b>worker</b> los procesa sin frenar la app.
        </p>
      </Card>
      <Card title="Automatización">
        <p className="muted">
          <b>Comandos</b> Artisan propios, ejecutados por el <b>scheduler</b> sin intervención.
        </p>
      </Card>
    </div>
    <p className="lead" style={{ marginTop: '1.2rem' }}>
      📌 Idea central: <span className="accent">el trabajo pesado va a segundo plano; lo repetitivo se automatiza</span>.
    </p>
  </Slide>,

  // 25 · Próxima sesión + tarea
  <Slide key="s25" center>
    <span className="eyebrow">Próxima sesión (la última)</span>
    <h2 style={{ fontSize: '2.6rem' }}>Sesión 12 - Despliegue en Producción</h2>
    <div className="grid g2" style={{ marginTop: '1.4rem', maxWidth: '60vw' }}>
      <Card title="Git y GitHub"><p className="muted">Llevar el proyecto al servidor con buenas prácticas.</p></Card>
      <Card title="Optimización y seguridad"><p className="muted">Caché, variables de entorno y publicación.</p></Card>
    </div>
    <p className="muted" style={{ marginTop: '1.4rem' }}>
      <b>Tarea:</b> crear un comando <code>app:enviar-recordatorios</code> que encole un correo a los
      usuarios con tareas pendientes, y programarlo para que corra cada día a las 08:00.
    </p>
  </Slide>,

  // 26 · Cierre
  <Slide key="s26" center>
    <LaravelLogo />
    <h1>¿Preguntas? 🙌</h1>
    <p className="lead muted" style={{ marginTop: '1rem' }}>
      ¡Gracias por tu atención!
      <br />
      Nos vemos en la Sesión 12, la última.
    </p>
    <p className="muted" style={{ marginTop: '1.6rem' }}>
      Desarrollo de Aplicaciones Web con Laravel 13 · Omar Mamani
    </p>
  </Slide>,
]

export default slides
