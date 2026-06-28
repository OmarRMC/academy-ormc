// ─────────────────────────────────────────────────────────────────────────
// Curso Laravel 13 · Sesión 4 - Base de Datos
// Cada elemento del array `slides` es una diapositiva. El componente <Deck>
// se encarga de la navegación, el progreso y la pantalla completa.
// Usa `center` en un nodo para centrar esa diapositiva.
// Base pedagógica: docs/laravel/SESION-04-PLANIFICACION.md
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
  session: 4,
  title: 'Base de Datos',
}

// ── Bloques de código (HTML resaltado) ────────────────────────────────────

const codeEnv = `<span class="tok-attr">DB_CONNECTION</span>=mysql
<span class="tok-attr">DB_HOST</span>=127.0.0.1
<span class="tok-attr">DB_PORT</span>=3306
<span class="tok-attr">DB_DATABASE</span>=gestion_app
<span class="tok-attr">DB_USERNAME</span>=root
<span class="tok-attr">DB_PASSWORD</span>=`

const codeMakeMig = `php artisan make:migration create_tareas_table`

const codeMigStruct = `<span class="tok-key">return new class extends</span> Migration {
    <span class="tok-key">public function</span> <span class="tok-fn">up</span>(): <span class="tok-key">void</span>
    {
        Schema::<span class="tok-fn">create</span>(<span class="tok-str">'tareas'</span>, <span class="tok-key">function</span> (Blueprint $table) {
            $table-&gt;<span class="tok-fn">id</span>();
            $table-&gt;<span class="tok-fn">string</span>(<span class="tok-str">'titulo'</span>);
            $table-&gt;<span class="tok-fn">timestamps</span>();
        });
    }

    <span class="tok-key">public function</span> <span class="tok-fn">down</span>(): <span class="tok-key">void</span>
    {
        Schema::<span class="tok-fn">dropIfExists</span>(<span class="tok-str">'tareas'</span>);
    }
};`

const codeColumns = `Schema::<span class="tok-fn">create</span>(<span class="tok-str">'tareas'</span>, <span class="tok-key">function</span> (Blueprint $table) {
    $table-&gt;<span class="tok-fn">id</span>();
    $table-&gt;<span class="tok-fn">string</span>(<span class="tok-str">'titulo'</span>);                 <span class="tok-com">// VARCHAR</span>
    $table-&gt;<span class="tok-fn">text</span>(<span class="tok-str">'descripcion'</span>)-&gt;<span class="tok-fn">nullable</span>();  <span class="tok-com">// admite null</span>
    $table-&gt;<span class="tok-fn">boolean</span>(<span class="tok-str">'completada'</span>)-&gt;<span class="tok-fn">default</span>(<span class="tok-key">false</span>);
    $table-&gt;<span class="tok-fn">timestamp</span>(<span class="tok-str">'vence_el'</span>)-&gt;<span class="tok-fn">nullable</span>();
    $table-&gt;<span class="tok-fn">timestamps</span>();
});`

const codeForeign = `Schema::<span class="tok-fn">create</span>(<span class="tok-str">'tareas'</span>, <span class="tok-key">function</span> (Blueprint $table) {
    $table-&gt;<span class="tok-fn">id</span>();
    $table-&gt;<span class="tok-fn">string</span>(<span class="tok-str">'titulo'</span>);
    $table-&gt;<span class="tok-fn">foreignId</span>(<span class="tok-str">'user_id'</span>)
        -&gt;<span class="tok-fn">constrained</span>()
        -&gt;<span class="tok-fn">onDelete</span>(<span class="tok-str">'cascade'</span>);   <span class="tok-com">// borra las tareas del user</span>
    $table-&gt;<span class="tok-fn">timestamps</span>();
});`

const codeMigrate = `php artisan migrate           <span class="tok-com"># aplica migraciones pendientes</span>
php artisan migrate:rollback  <span class="tok-com"># revierte el ultimo lote</span>
php artisan migrate:fresh     <span class="tok-com"># borra TODO y vuelve a migrar</span>
php artisan migrate:fresh --seed  <span class="tok-com"># ...y ejecuta seeders</span>
php artisan migrate:status    <span class="tok-com"># que migraciones se aplicaron</span>`

const codeSeederBash = `php artisan make:seeder TareaSeeder`

const codeSeeder = `<span class="tok-com">// database/seeders/TareaSeeder.php</span>
<span class="tok-key">public function</span> <span class="tok-fn">run</span>(): <span class="tok-key">void</span>
{
    DB::<span class="tok-fn">table</span>(<span class="tok-str">'tareas'</span>)-&gt;<span class="tok-fn">insert</span>([
        <span class="tok-str">'titulo'</span> =&gt; <span class="tok-str">'Configurar servidor'</span>,
        <span class="tok-str">'completada'</span> =&gt; <span class="tok-key">false</span>,
        <span class="tok-str">'created_at'</span> =&gt; <span class="tok-fn">now</span>(),
    ]);
}`

const codeFactory = `<span class="tok-com">// database/factories/UserFactory.php (viene con Laravel)</span>
<span class="tok-key">public function</span> <span class="tok-fn">definition</span>(): <span class="tok-key">array</span>
{
    <span class="tok-key">return</span> [
        <span class="tok-str">'name'</span> =&gt; <span class="tok-fn">fake</span>()-&gt;<span class="tok-fn">name</span>(),
        <span class="tok-str">'email'</span> =&gt; <span class="tok-fn">fake</span>()-&gt;<span class="tok-fn">unique</span>()-&gt;<span class="tok-fn">safeEmail</span>(),
        <span class="tok-str">'password'</span> =&gt; Hash::<span class="tok-fn">make</span>(<span class="tok-str">'password'</span>),
    ];
}`

const codeUseFactory = `<span class="tok-com">// database/seeders/DatabaseSeeder.php</span>
<span class="tok-key">public function</span> <span class="tok-fn">run</span>(): <span class="tok-key">void</span>
{
    User::<span class="tok-fn">factory</span>()-&gt;<span class="tok-fn">count</span>(<span class="tok-num">10</span>)-&gt;<span class="tok-fn">create</span>();  <span class="tok-com">// 10 usuarios falsos</span>

    $this-&gt;<span class="tok-fn">call</span>([
        TareaSeeder::<span class="tok-key">class</span>,
    ]);
}`

const codeSeedRun = `php artisan db:seed               <span class="tok-com"># ejecuta DatabaseSeeder</span>
php artisan migrate:fresh --seed  <span class="tok-com"># recrea la base y la puebla</span>`

const codeRead = `<span class="tok-key">use</span> Illuminate\\Support\\Facades\\DB;

$todas   = DB::<span class="tok-fn">table</span>(<span class="tok-str">'tareas'</span>)-&gt;<span class="tok-fn">get</span>();          <span class="tok-com">// coleccion</span>
$una     = DB::<span class="tok-fn">table</span>(<span class="tok-str">'tareas'</span>)-&gt;<span class="tok-fn">find</span>(<span class="tok-num">1</span>);         <span class="tok-com">// por id</span>
$pend    = DB::<span class="tok-fn">table</span>(<span class="tok-str">'tareas'</span>)
    -&gt;<span class="tok-fn">where</span>(<span class="tok-str">'completada'</span>, <span class="tok-key">false</span>)
    -&gt;<span class="tok-fn">orderBy</span>(<span class="tok-str">'created_at'</span>, <span class="tok-str">'desc'</span>)
    -&gt;<span class="tok-fn">get</span>();
$total   = DB::<span class="tok-fn">table</span>(<span class="tok-str">'tareas'</span>)-&gt;<span class="tok-fn">count</span>();         <span class="tok-com">// agregado</span>`

const codeWrite = `<span class="tok-com">// Insertar</span>
DB::<span class="tok-fn">table</span>(<span class="tok-str">'tareas'</span>)-&gt;<span class="tok-fn">insert</span>([
    <span class="tok-str">'titulo'</span> =&gt; <span class="tok-str">'Desplegar app'</span>,
    <span class="tok-str">'created_at'</span> =&gt; <span class="tok-fn">now</span>(),
]);

<span class="tok-com">// Actualizar</span>
DB::<span class="tok-fn">table</span>(<span class="tok-str">'tareas'</span>)-&gt;<span class="tok-fn">where</span>(<span class="tok-str">'id'</span>, <span class="tok-num">1</span>)-&gt;<span class="tok-fn">update</span>([<span class="tok-str">'completada'</span> =&gt; <span class="tok-key">true</span>]);

<span class="tok-com">// Borrar</span>
DB::<span class="tok-fn">table</span>(<span class="tok-str">'tareas'</span>)-&gt;<span class="tok-fn">where</span>(<span class="tok-str">'id'</span>, <span class="tok-num">1</span>)-&gt;<span class="tok-fn">delete</span>();`

const codeController = `<span class="tok-key">public function</span> <span class="tok-fn">index</span>()
{
    $tareas = DB::<span class="tok-fn">table</span>(<span class="tok-str">'tareas'</span>)-&gt;<span class="tok-fn">orderBy</span>(<span class="tok-str">'created_at'</span>, <span class="tok-str">'desc'</span>)-&gt;<span class="tok-fn">get</span>();
    <span class="tok-key">return</span> <span class="tok-fn">view</span>(<span class="tok-str">'tareas.index'</span>, [<span class="tok-str">'tareas'</span> =&gt; $tareas]);
}`

const codeTransaction = `<span class="tok-key">use</span> Illuminate\\Support\\Facades\\DB;

DB::<span class="tok-fn">transaction</span>(<span class="tok-key">function</span> () {
    DB::<span class="tok-fn">table</span>(<span class="tok-str">'tareas'</span>)-&gt;<span class="tok-fn">insert</span>([<span class="tok-str">'titulo'</span> =&gt; <span class="tok-str">'Tarea A'</span>]);
    DB::<span class="tok-fn">table</span>(<span class="tok-str">'tareas'</span>)-&gt;<span class="tok-fn">insert</span>([<span class="tok-str">'titulo'</span> =&gt; <span class="tok-str">'Tarea B'</span>]);
});
<span class="tok-com">// Si algo falla dentro, Laravel revierte TODO.</span>

<span class="tok-com">// Manual (control total):</span>
DB::<span class="tok-fn">beginTransaction</span>();
DB::<span class="tok-fn">commit</span>();   <span class="tok-com">// o DB::rollBack();</span>`

export const slides = [
  // 1 · Portada
  <Slide key="s1" center>
    <LaravelLogo />
    <span className="eyebrow">Módulo I · Sesión 4</span>
    <h1>
      Base de <span className="accent">Datos</span>
    </h1>
    <p className="lead muted" style={{ marginTop: '1.2rem' }}>
      Desarrollo de Aplicaciones Web con Laravel 13
    </p>
    <p className="muted" style={{ marginTop: '1.6rem' }}>
      Expositor: <b>Omar Mamani</b> · Duración: 1h 30min
    </p>
  </Slide>,

  // 2 · Repaso de la Sesión 3
  <CardsGrid
    key="s2"
    cols={3}
    eyebrow="Venimos de la Sesión 3"
    title="Repaso rápido"
    cards={[
      { title: '🎨 Blade', body: 'Cerramos el MVC: el controlador devuelve vistas con view().' },
      { title: '🧩 Reutilización', body: 'Layouts, secciones, includes y componentes.' },
      { title: '⏳ Pendiente', body: 'Las tareas eran un array que se borraba al recargar.' },
    ]}
  />,

  // 3 · Agenda
  <CardsGrid
    key="s3"
    eyebrow="Hoja de ruta"
    title="Agenda de la sesión"
    cards={[
      { title: '1 · Configuración', body: 'Conectar Laravel a la base de datos.' },
      { title: '2 · Migraciones', body: 'Definir tablas con código versionado.' },
      { title: '3 · Seeders y Factories', body: 'Poblar con datos de prueba.' },
      { title: '4 · Query Builder + Lab', body: 'Consultar y modificar los datos.' },
    ]}
  />,

  // 4 · Objetivos
  <BulletSlide
    key="s4"
    eyebrow="¿Qué lograrás hoy?"
    title="Objetivos de aprendizaje"
    variant="checks"
    items={[
      <>Configurar la <b>conexión</b> en <code>.env</code>.</>,
      <>Crear tablas con <b>migraciones</b> y el Schema Builder.</>,
      <>Definir <b>columnas, modificadores</b> y claves foráneas.</>,
      <>Ejecutar y revertir migraciones.</>,
      <>Poblar la base con <b>seeders</b>.</>,
      <>Generar datos falsos con <b>factories</b> (<code>fake()</code>).</>,
      <>Consultar y modificar con el <b>Query Builder</b>.</>,
      <>Usar <b>transacciones</b> (todo o nada).</>,
    ]}
  />,

  // 5 · Divider 1
  <SectionDivider key="s5" center num="01" eyebrow="Bloque 1" title="Configuración de la Base de Datos" subtitle="Conectar Laravel a un almacén permanente." />,

  // 6 · ¿Por qué una base de datos?
  <TwoColumn
    key="s6"
    eyebrow="El porqué"
    title="¿Por qué una base de datos?"
    left={
      <>
        <p className="lead">
          Una app real necesita <b>guardar datos</b> que sobreviven a cada petición: usuarios, tareas,
          pedidos...
        </p>
        <p className="muted" style={{ marginTop: '0.8rem' }}>
          <b>Analogía:</b> un <b>archivador</b> 🗄️ permanente. Un array en PHP es una pizarra que se
          borra al recargar; la base de datos guarda la información para siempre.
        </p>
      </>
    }
    right={
      <Card title="En el curso">
        <p className="muted">
          Usaremos <b>MySQL</b>. Laravel trae <b>SQLite</b> por defecto (un solo archivo), ideal para
          empezar sin instalar nada. También soporta MariaDB, PostgreSQL y SQL Server.
        </p>
      </Card>
    }
  />,

  // 7 · Configuración: .env + crear la BD
  <Slide key="s7">
    <span className="eyebrow">La conexión vive en .env</span>
    <h2>Configuración de la conexión</h2>
    <CodeBlock html={codeEnv} />
    <p className="muted" style={{ marginTop: '0.8rem' }}>
      <code>config/database.php</code> lee estas variables. Para <b>SQLite</b> bastaría{' '}
      <code>DB_CONNECTION=sqlite</code>. Primero crea la base <code>gestion_app</code>; luego migramos.
    </p>
  </Slide>,

  // 8 · Divider 2
  <SectionDivider key="s8" center num="02" eyebrow="Bloque 2" title="Migraciones" subtitle="Control de versiones para tu base de datos." />,

  // 9 · ¿Qué es una migración?
  <TwoColumn
    key="s9"
    eyebrow="Concepto"
    title="¿Qué es una migración?"
    left={
      <>
        <p className="lead">
          Un <b>control de versiones para la base de datos</b> 🧱 (como Git para el código): cada
          migración es un "plano" que crea o cambia tablas.
        </p>
        <p className="muted" style={{ marginTop: '0.8rem' }}>
          Defines la estructura con <b>código PHP</b>, no a mano. Todo el equipo reconstruye la base
          con un comando.
        </p>
      </>
    }
    right={
      <>
        <CodeBlock html={codeMakeMig} />
        <p className="muted" style={{ marginTop: '0.8rem' }}>
          El archivo se crea en <code>database/migrations/</code> con un timestamp que ordena su
          ejecución.
        </p>
      </>
    }
  />,

  // 10 · Estructura de una migración
  <Slide key="s10">
    <span className="eyebrow">up() y down()</span>
    <h2>Estructura de una migración</h2>
    <CodeBlock html={codeMigStruct} />
    <p className="muted" style={{ marginTop: '0.8rem' }}>
      <code>up()</code> aplica el cambio; <code>down()</code> lo revierte. <code>$table-&gt;id()</code>{' '}
      crea la PK y <code>timestamps()</code> agrega <code>created_at</code>/<code>updated_at</code>.
    </p>
  </Slide>,

  // 11 · Tipos de columnas y modificadores
  <Slide key="s11">
    <span className="eyebrow">El Schema Builder</span>
    <h2>Columnas y modificadores</h2>
    <CodeBlock html={codeColumns} />
    <p className="muted" style={{ marginTop: '0.8rem' }}>
      Modificadores encadenables: <code>nullable()</code>, <code>default(valor)</code>,{' '}
      <code>unique()</code>. Hay tipos para todo: <code>integer</code>, <code>decimal</code>,{' '}
      <code>date</code>, <code>json</code>, <code>enum</code>...
    </p>
  </Slide>,

  // 12 · Claves foráneas
  <Slide key="s12">
    <span className="eyebrow">Relacionar tablas</span>
    <h2>Claves foráneas</h2>
    <CodeBlock html={codeForeign} />
    <p className="muted" style={{ marginTop: '0.8rem' }}>
      <code>foreignId('user_id')-&gt;constrained()</code> crea la columna <b>y</b> la relación con la
      tabla <code>users</code> por convención. <code>onDelete('cascade')</code> define qué pasa al
      borrar el padre.
    </p>
  </Slide>,

  // 13 · Ejecutar migraciones
  <Slide key="s13">
    <span className="eyebrow">Aplicar los cambios</span>
    <h2>Ejecutar migraciones</h2>
    <CodeBlock html={codeMigrate} />
    <p className="muted" style={{ marginTop: '0.8rem' }}>
      ⚠️ <code>migrate:fresh</code> <b>borra todas las tablas</b>: úsalo solo en desarrollo, nunca en
      producción con datos reales.
    </p>
  </Slide>,

  // 14 · Divider 3
  <SectionDivider key="s14" center num="03" eyebrow="Bloque 3" title="Seeders y Factories" subtitle="Poblar la base con datos de prueba." />,

  // 15 · Seeders
  <Slide key="s15">
    <span className="eyebrow">Sembrar datos</span>
    <h2>Seeders</h2>
    <CodeBlock html={codeSeederBash} />
    <div style={{ marginTop: '0.7rem' }}>
      <CodeBlock html={codeSeeder} />
    </div>
    <p className="muted" style={{ marginTop: '0.7rem' }}>
      🌱 Viven en <code>database/seeders</code>. Dentro de <code>run()</code> insertas datos con el
      Query Builder o con factories.
    </p>
  </Slide>,

  // 16 · Factories
  <Slide key="s16">
    <span className="eyebrow">Datos falsos a montones</span>
    <h2>Factories</h2>
    <CodeBlock html={codeFactory} />
    <p className="muted" style={{ marginTop: '0.8rem' }}>
      🏭 Un molde que produce registros realistas con <b>Faker</b> (<code>fake()</code>). El modelo usa{' '}
      <code>HasFactory</code> (el <code>User</code> ya lo trae). El modelo <code>Tarea</code> llega en
      la <b>Sesión 5</b>.
    </p>
  </Slide>,

  // 17 · Usar factories + ejecutar seeders
  <Slide key="s17">
    <span className="eyebrow">Generar y ejecutar</span>
    <h2>Usar factories en el seeder</h2>
    <CodeBlock html={codeUseFactory} />
    <div style={{ marginTop: '0.7rem' }}>
      <CodeBlock html={codeSeedRun} />
    </div>
    <p className="muted" style={{ marginTop: '0.7rem' }}>
      <code>count(10)-&gt;create()</code> inserta 10 registros; <code>make()</code> los crearía sin
      guardar. <code>$this-&gt;call([...])</code> encadena otros seeders.
    </p>
  </Slide>,

  // 18 · Divider 4
  <SectionDivider key="s18" center num="04" eyebrow="Bloque 4" title="Query Builder y Transacciones" subtitle="Consultar y modificar datos sin SQL crudo." />,

  // 19 · ¿Qué es el Query Builder?
  <TwoColumn
    key="s19"
    eyebrow="Hablar con la base de datos"
    title="¿Qué es el Query Builder?"
    left={
      <>
        <p className="lead">
          Un <b>traductor</b> 🗣️: escribes métodos PHP encadenados y Laravel genera el SQL por ti,
          seguro contra inyección.
        </p>
        <p className="muted" style={{ marginTop: '0.8rem' }}>
          La fachada <code>DB</code> con <code>DB::table('tareas')</code>. Más legible que el SQL
          crudo. Es el paso previo a Eloquent (Sesión 5).
        </p>
      </>
    }
    right={
      <Card title="Importar">
        <p className="muted">
          Al inicio del archivo:
          <br />
          <code>use Illuminate\Support\Facades\DB;</code>
        </p>
      </Card>
    }
  />,

  // 20 · Leer datos
  <Slide key="s20">
    <span className="eyebrow">Consultar</span>
    <h2>Leer datos</h2>
    <CodeBlock html={codeRead} />
    <p className="muted" style={{ marginTop: '0.8rem' }}>
      Otros: <code>first()</code>, <code>value('titulo')</code> (un campo), <code>pluck('titulo')</code>{' '}
      (lista), <code>whereIn</code>, <code>limit</code>, <code>orWhere</code>.
    </p>
  </Slide>,

  // 21 · Escribir datos
  <Slide key="s21">
    <span className="eyebrow">Insertar, actualizar, borrar</span>
    <h2>Escribir datos</h2>
    <CodeBlock html={codeWrite} />
    <p className="muted" style={{ marginTop: '0.8rem' }}>
      <code>insertGetId([...])</code> inserta y devuelve el <code>id</code> generado. El{' '}
      <code>where</code> antes de <code>update</code>/<code>delete</code> es clave: sin él, afecta a
      toda la tabla.
    </p>
  </Slide>,

  // 22 · Aplicado: TareaController con datos reales
  <Slide key="s22">
    <span className="eyebrow">Datos reales en el proyecto</span>
    <h2>TareaController con la base de datos</h2>
    <CodeBlock html={codeController} />
    <p className="muted" style={{ marginTop: '0.8rem' }}>
      La vista Blade de la Sesión 3 <b>no cambia</b>: sigue recorriendo <code>$tareas</code>. Solo
      cambió el origen: antes un array, ahora la base de datos. ¡Ese es el poder de separar capas!
    </p>
  </Slide>,

  // 23 · Transacciones
  <Slide key="s23">
    <span className="eyebrow">Todo o nada</span>
    <h2>Transacciones</h2>
    <CodeBlock html={codeTransaction} />
    <p className="muted" style={{ marginTop: '0.8rem' }}>
      💸 Como una <b>transferencia bancaria</b>: o se hacen todas las operaciones, o ninguna. Si algo
      lanza una excepción, Laravel revierte todo automáticamente.
    </p>
  </Slide>,

  // 24 · Divider 5
  <SectionDivider key="s24" center num="05" eyebrow="Bloque 5" title="Laboratorio" subtitle="Crear y poblar la base de datos. ⌨️" />,

  // 25 · Laboratorio paso a paso
  <CardsGrid key="s25" eyebrow="Práctica guiada" title="Laboratorio paso a paso">
    <Card title="① Configurar la conexión">
      <ul>
        <li>Crear la base <code>gestion_app</code> en MySQL.</li>
        <li>Ajustar las variables <code>DB_*</code> en <code>.env</code>.</li>
      </ul>
    </Card>
    <Card title="② Crear la tabla">
      <ul>
        <li><code>make:migration create_tareas_table</code>.</li>
        <li>Definir columnas y <code>php artisan migrate</code>.</li>
      </ul>
    </Card>
    <Card title="③ Poblar la base">
      <ul>
        <li><code>TareaSeeder</code> con <code>DB::table-&gt;insert</code>.</li>
        <li><code>User::factory()-&gt;count(10)-&gt;create()</code>.</li>
        <li><code>php artisan migrate:fresh --seed</code>.</li>
      </ul>
    </Card>
    <Card title="④ Consultar desde el controlador">
      <ul>
        <li><code>DB::table('tareas')-&gt;get()</code>.</li>
        <li>Abrir <code>/admin/tareas</code>: datos que persisten.</li>
      </ul>
    </Card>
  </CardsGrid>,

  // 26 · Comandos clave
  <Slide key="s26">
    <span className="eyebrow">Para tener a mano</span>
    <h2>Comandos clave de la sesión</h2>
    <table style={{ marginTop: '0.6rem' }}>
      <thead>
        <tr><th>Comando</th><th>Qué hace</th></tr>
      </thead>
      <tbody>
        <tr><td><code>make:migration</code></td><td>Crea un archivo de migración</td></tr>
        <tr><td><code>migrate</code></td><td>Aplica las migraciones pendientes</td></tr>
        <tr><td><code>migrate:fresh --seed</code></td><td>Recrea la base y la puebla</td></tr>
        <tr><td><code>make:seeder</code> / <code>db:seed</code></td><td>Crea / ejecuta seeders</td></tr>
        <tr><td><code>make:factory</code></td><td>Crea una factory de datos falsos</td></tr>
        <tr><td><code>migrate:status</code></td><td>Muestra qué migraciones se aplicaron</td></tr>
      </tbody>
    </table>
  </Slide>,

  // 27 · Checklist
  <Slide key="s27">
    <span className="eyebrow">Antes de cerrar</span>
    <h2>Checklist de la sesión</h2>
    <ul className="checks big" style={{ marginTop: '1rem' }}>
      <li>Configuré la conexión en .env y creé la base de datos.</li>
      <li>Entiendo qué es una migración y creo tablas con el Schema Builder.</li>
      <li>Defino columnas, modificadores y claves foráneas.</li>
      <li>Ejecuto y revierto migraciones (migrate, migrate:fresh --seed).</li>
      <li>Poblé la base con seeders (DB::table-&gt;insert).</li>
      <li>Generé datos falsos con factories (fake(), User::factory()).</li>
      <li>Consulto y modifico datos con el Query Builder.</li>
      <li>Uso transacciones para operaciones todo-o-nada.</li>
    </ul>
  </Slide>,

  // 28 · Resumen
  <Slide key="s28">
    <span className="eyebrow">Lo que aprendiste hoy</span>
    <h2>Resumen de la sesión</h2>
    <div className="grid g2" style={{ marginTop: '0.8rem' }}>
      <Card title="Estructura">
        <p className="muted">
          Las <b>migraciones</b> crean y versionan las tablas con el Schema Builder.
        </p>
      </Card>
      <Card title="Datos">
        <p className="muted">
          <b>Seeders</b> y <b>factories</b> las pueblan; el <b>Query Builder</b> las consulta y
          modifica.
        </p>
      </Card>
    </div>
    <p className="lead" style={{ marginTop: '1.2rem' }}>
      📌 Idea central: <span className="accent">migraciones definen, seeders pueblan, Query Builder consulta</span>.
    </p>
  </Slide>,

  // 29 · Próxima sesión + tarea
  <Slide key="s29" center>
    <span className="eyebrow">Próxima sesión</span>
    <h2 style={{ fontSize: '2.6rem' }}>Sesión 5 - Eloquent ORM y Relaciones</h2>
    <div className="grid g2" style={{ marginTop: '1.4rem', maxWidth: '60vw' }}>
      <Card title="Modelos"><p className="muted">El Query Builder de hoy se vuelve objetos: el modelo Tarea.</p></Card>
      <Card title="Relaciones"><p className="muted">Uno a uno, uno a muchos, muchos a muchos, pivot y scopes.</p></Card>
    </div>
    <p className="muted" style={{ marginTop: '1.4rem' }}>
      <b>Tarea:</b> crea una migración <code>create_categorias_table</code> y un seeder con 3
      categorías; agrega a <code>tareas</code> una FK <code>categoria_id</code> con <code>constrained()</code>.
    </p>
  </Slide>,

  // 30 · Cierre
  <Slide key="s30" center>
    <LaravelLogo />
    <h1>¿Preguntas? 🙌</h1>
    <p className="lead muted" style={{ marginTop: '1rem' }}>
      ¡Gracias por tu atención!
      <br />
      Nos vemos en la Sesión 5.
    </p>
    <p className="muted" style={{ marginTop: '1.6rem' }}>
      Desarrollo de Aplicaciones Web con Laravel 13 · Omar Mamani
    </p>
  </Slide>,
]

export default slides
