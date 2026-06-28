// ─────────────────────────────────────────────────────────────────────────
// Curso Laravel 13 · Sesión 5 - Eloquent ORM y Relaciones
// Cada elemento del array `slides` es una diapositiva. El componente <Deck>
// se encarga de la navegación, el progreso y la pantalla completa.
// Usa `center` en un nodo para centrar esa diapositiva.
// Base pedagógica: docs/laravel/SESION-05-PLANIFICACION.md
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
  session: 5,
  title: 'Eloquent ORM y Relaciones',
}

// ── Bloques de código (HTML resaltado) ────────────────────────────────────

const codeMakeModel = `php artisan make:model Tarea        <span class="tok-com"># solo el modelo</span>
php artisan make:model Tarea -m     <span class="tok-com"># modelo + migracion</span>`

const codeModelClass = `<span class="tok-com">// app/Models/Tarea.php</span>
<span class="tok-key">class</span> <span class="tok-fn">Tarea</span> <span class="tok-key">extends</span> Model
{
    <span class="tok-key">use</span> HasFactory;

    <span class="tok-key">protected</span> $fillable = [<span class="tok-str">'titulo'</span>, <span class="tok-str">'descripcion'</span>, <span class="tok-str">'completada'</span>, <span class="tok-str">'user_id'</span>];
}`

const codeCrud = `<span class="tok-com">// Leer</span>
$todas = Tarea::<span class="tok-fn">all</span>();
$una   = Tarea::<span class="tok-fn">find</span>(<span class="tok-num">1</span>);
$una   = Tarea::<span class="tok-fn">findOrFail</span>(<span class="tok-num">1</span>);            <span class="tok-com">// 404 si no existe</span>
$pend  = Tarea::<span class="tok-fn">where</span>(<span class="tok-str">'completada'</span>, <span class="tok-key">false</span>)-&gt;<span class="tok-fn">get</span>();

<span class="tok-com">// Crear</span>
$tarea = Tarea::<span class="tok-fn">create</span>([<span class="tok-str">'titulo'</span> =&gt; <span class="tok-str">'Desplegar app'</span>]);

<span class="tok-com">// Actualizar</span>
$tarea-&gt;<span class="tok-fn">update</span>([<span class="tok-str">'completada'</span> =&gt; <span class="tok-key">true</span>]);

<span class="tok-com">// Borrar</span>
$tarea-&gt;<span class="tok-fn">delete</span>();`

const codeOneToOne = `<span class="tok-com">// app/Models/User.php  (lado dueño)</span>
<span class="tok-key">public function</span> <span class="tok-fn">perfil</span>(): HasOne
{
    <span class="tok-key">return</span> $this-&gt;<span class="tok-fn">hasOne</span>(Perfil::<span class="tok-key">class</span>);
}

<span class="tok-com">// app/Models/Perfil.php  (lado inverso)</span>
<span class="tok-key">public function</span> <span class="tok-fn">user</span>(): BelongsTo
{
    <span class="tok-key">return</span> $this-&gt;<span class="tok-fn">belongsTo</span>(User::<span class="tok-key">class</span>);
}`

const codeOneToMany = `<span class="tok-com">// app/Models/User.php → un usuario tiene muchas tareas</span>
<span class="tok-key">public function</span> <span class="tok-fn">tareas</span>(): HasMany
{
    <span class="tok-key">return</span> $this-&gt;<span class="tok-fn">hasMany</span>(Tarea::<span class="tok-key">class</span>);
}

<span class="tok-com">// app/Models/Tarea.php → una tarea pertenece a un usuario</span>
<span class="tok-key">public function</span> <span class="tok-fn">user</span>(): BelongsTo
{
    <span class="tok-key">return</span> $this-&gt;<span class="tok-fn">belongsTo</span>(User::<span class="tok-key">class</span>);
}`

const codeAccess = `$user = User::<span class="tok-fn">find</span>(<span class="tok-num">1</span>);

<span class="tok-com">// Como PROPIEDAD: ejecuta y devuelve los resultados</span>
<span class="tok-key">foreach</span> ($user-&gt;tareas <span class="tok-key">as</span> $tarea) {
    <span class="tok-key">echo</span> $tarea-&gt;titulo;
}

<span class="tok-com">// Como METODO: devuelve el query builder para filtrar</span>
$pendientes = $user-&gt;<span class="tok-fn">tareas</span>()-&gt;<span class="tok-fn">where</span>(<span class="tok-str">'completada'</span>, <span class="tok-key">false</span>)-&gt;<span class="tok-fn">get</span>();`

const codeManyToMany = `<span class="tok-com">// app/Models/Tarea.php</span>
<span class="tok-key">public function</span> <span class="tok-fn">etiquetas</span>(): BelongsToMany
{
    <span class="tok-key">return</span> $this-&gt;<span class="tok-fn">belongsToMany</span>(Etiqueta::<span class="tok-key">class</span>);
}

<span class="tok-com">// app/Models/Etiqueta.php</span>
<span class="tok-key">public function</span> <span class="tok-fn">tareas</span>(): BelongsToMany
{
    <span class="tok-key">return</span> $this-&gt;<span class="tok-fn">belongsToMany</span>(Tarea::<span class="tok-key">class</span>);
}`

const codePivot = `$tarea = Tarea::<span class="tok-fn">find</span>(<span class="tok-num">1</span>);

$tarea-&gt;<span class="tok-fn">etiquetas</span>()-&gt;<span class="tok-fn">attach</span>($etiquetaId);   <span class="tok-com">// agrega una relacion</span>
$tarea-&gt;<span class="tok-fn">etiquetas</span>()-&gt;<span class="tok-fn">detach</span>($etiquetaId);   <span class="tok-com">// quita una relacion</span>
$tarea-&gt;<span class="tok-fn">etiquetas</span>()-&gt;<span class="tok-fn">sync</span>([<span class="tok-num">1</span>, <span class="tok-num">2</span>, <span class="tok-num">3</span>]);       <span class="tok-com">// deja EXACTAMENTE esas</span>

<span class="tok-com">// Datos extra: -&gt;withPivot('orden')-&gt;withTimestamps()</span>
<span class="tok-key">foreach</span> ($tarea-&gt;etiquetas <span class="tok-key">as</span> $e) {
    <span class="tok-key">echo</span> $e-&gt;pivot-&gt;created_at;
}`

const codeEager = `<span class="tok-com">// MAL: 1 consulta + 1 por CADA usuario (N+1)</span>
$tareas = Tarea::<span class="tok-fn">all</span>();
<span class="tok-key">foreach</span> ($tareas <span class="tok-key">as</span> $t) { <span class="tok-key">echo</span> $t-&gt;user-&gt;name; }

<span class="tok-com">// BIEN: 2 consultas en total (eager loading)</span>
$tareas = Tarea::<span class="tok-fn">with</span>(<span class="tok-str">'user'</span>)-&gt;<span class="tok-fn">get</span>();
$tareas = Tarea::<span class="tok-fn">with</span>([<span class="tok-str">'user'</span>, <span class="tok-str">'etiquetas'</span>])-&gt;<span class="tok-fn">get</span>();`

const codeAccessor = `<span class="tok-key">use</span> Illuminate\\Database\\Eloquent\\Casts\\Attribute;

<span class="tok-com">// En el modelo: "titulo" mapea a la columna "titulo"</span>
<span class="tok-key">protected function</span> <span class="tok-fn">titulo</span>(): Attribute
{
    <span class="tok-key">return</span> Attribute::<span class="tok-fn">make</span>(
        <span class="tok-attr">get</span>: <span class="tok-key">fn</span> (<span class="tok-key">string</span> $value) =&gt; <span class="tok-fn">ucfirst</span>($value),
    );
}

<span class="tok-com">// Uso: $tarea-&gt;titulo  →  "Desplegar app"</span>`

const codeMutator = `<span class="tok-key">protected function</span> <span class="tok-fn">titulo</span>(): Attribute
{
    <span class="tok-key">return</span> Attribute::<span class="tok-fn">make</span>(
        <span class="tok-attr">get</span>: <span class="tok-key">fn</span> (<span class="tok-key">string</span> $value) =&gt; <span class="tok-fn">ucfirst</span>($value),  <span class="tok-com">// al leer</span>
        <span class="tok-attr">set</span>: <span class="tok-key">fn</span> (<span class="tok-key">string</span> $value) =&gt; <span class="tok-fn">trim</span>($value),     <span class="tok-com">// al guardar</span>
    );
}`

const codeScope = `<span class="tok-key">use</span> Illuminate\\Database\\Eloquent\\Attributes\\Scope;
<span class="tok-key">use</span> Illuminate\\Database\\Eloquent\\Builder;

<span class="tok-com">// En el modelo Tarea</span>
<span class="tok-attr">#[Scope]</span>
<span class="tok-key">protected function</span> <span class="tok-fn">pendientes</span>(Builder $query): <span class="tok-key">void</span>
{
    $query-&gt;<span class="tok-fn">where</span>(<span class="tok-str">'completada'</span>, <span class="tok-key">false</span>);
}

<span class="tok-com">// Uso encadenable</span>
$tareas = Tarea::<span class="tok-fn">pendientes</span>()-&gt;<span class="tok-fn">orderBy</span>(<span class="tok-str">'created_at'</span>)-&gt;<span class="tok-fn">get</span>();`

const codeController = `<span class="tok-key">public function</span> <span class="tok-fn">index</span>()
{
    <span class="tok-com">// De DB::table('tareas') a Eloquent + eager loading</span>
    $tareas = Tarea::<span class="tok-fn">with</span>(<span class="tok-str">'user'</span>)-&gt;<span class="tok-fn">orderBy</span>(<span class="tok-str">'created_at'</span>, <span class="tok-str">'desc'</span>)-&gt;<span class="tok-fn">get</span>();
    <span class="tok-key">return</span> <span class="tok-fn">view</span>(<span class="tok-str">'tareas.index'</span>, [<span class="tok-str">'tareas'</span> =&gt; $tareas]);
}`

export const slides = [
  // 1 · Portada
  <Slide key="s1" center>
    <LaravelLogo />
    <span className="eyebrow">Módulo I · Sesión 5</span>
    <h1>
      Eloquent ORM y <span className="accent">Relaciones</span>
    </h1>
    <p className="lead muted" style={{ marginTop: '1.2rem' }}>
      Desarrollo de Aplicaciones Web con Laravel 13
    </p>
    <p className="muted" style={{ marginTop: '1.6rem' }}>
      Expositor: <b>Omar Mamani</b> · Duración: 1h 30min
    </p>
  </Slide>,

  // 2 · Repaso de la Sesión 4
  <CardsGrid
    key="s2"
    cols={3}
    eyebrow="Venimos de la Sesión 4"
    title="Repaso rápido"
    cards={[
      { title: '🧱 Migraciones', body: 'Creamos la tabla tareas con código versionado.' },
      { title: '🌱 Seeders/Factories', body: 'La poblamos con datos de prueba.' },
      { title: '🔎 Query Builder', body: 'Consultábamos con DB::table(\'tareas\').' },
    ]}
  />,

  // 3 · Agenda
  <CardsGrid
    key="s3"
    eyebrow="Hoja de ruta"
    title="Agenda de la sesión"
    cards={[
      { title: '1 · Modelos', body: 'Eloquent: CRUD con objetos.' },
      { title: '2 · Relaciones', body: 'Uno a uno, uno a muchos, muchos a muchos.' },
      { title: '3 · Accessors, Mutators y Scopes', body: 'Transformar y reutilizar consultas.' },
      { title: '4 · Laboratorio', body: 'Relacionar los modelos del proyecto.' },
    ]}
  />,

  // 4 · Objetivos
  <BulletSlide
    key="s4"
    eyebrow="¿Qué lograrás hoy?"
    title="Objetivos de aprendizaje"
    variant="checks"
    items={[
      <>Entender qué es un <b>ORM</b> y su diferencia con el Query Builder.</>,
      <>Crear <b>modelos</b> y configurar <code>$fillable</code>.</>,
      <>Hacer <b>CRUD con Eloquent</b>.</>,
      <>Definir relaciones <b>Uno a Uno</b> y <b>Uno a Muchos</b>.</>,
      <>Definir <b>Muchos a Muchos</b> y manejar el <b>pivote</b>.</>,
      <>Evitar el <b>N+1</b> con <code>with()</code>.</>,
      <>Crear <b>accessors</b> y <b>mutators</b>.</>,
      <>Crear <b>scopes</b> reutilizables.</>,
    ]}
  />,

  // 5 · Divider 1
  <SectionDivider key="s5" center num="01" eyebrow="Bloque 1" title="Eloquent ORM" subtitle="Cada fila, un objeto con superpoderes." />,

  // 6 · ¿Qué es un ORM?
  <TwoColumn
    key="s6"
    eyebrow="Concepto"
    title="¿Qué es un ORM?"
    left={
      <>
        <p className="lead">
          <b>ORM</b> = Object-Relational Mapping. Un <b>modelo</b> representa una tabla; una
          <b> instancia</b>, una fila; una <b>columna</b>, una propiedad.
        </p>
        <p className="muted" style={{ marginTop: '0.8rem' }}>
          <b>Analogía:</b> un traductor objeto - tabla 🔁. En vez de <code>DB::table('tareas')</code>,
          usas <code>Tarea::all()</code>. Hablas PHP, Eloquent habla SQL.
        </p>
      </>
    }
    right={
      <Card title="Query Builder vs Eloquent">
        <p className="muted">
          El Query Builder devuelve <b>filas planas</b>; Eloquent devuelve <b>objetos</b> con métodos,
          relaciones, accessors y scopes. Es la capa de arriba.
        </p>
      </Card>
    }
  />,

  // 7 · Crear el modelo
  <Slide key="s7">
    <span className="eyebrow">Manos a la obra</span>
    <h2>Crear el modelo</h2>
    <CodeBlock html={codeMakeModel} />
    <div style={{ marginTop: '0.7rem' }}>
      <CodeBlock html={codeModelClass} />
    </div>
    <p className="muted" style={{ marginTop: '0.7rem' }}>
      Por convención, <code>Tarea</code> usa la tabla <code>tareas</code>. <code>$fillable</code> lista
      las columnas asignables en masa (protección contra <i>mass assignment</i>).
    </p>
  </Slide>,

  // 8 · CRUD con Eloquent
  <Slide key="s8">
    <span className="eyebrow">Crear, leer, actualizar, borrar</span>
    <h2>CRUD con Eloquent</h2>
    <CodeBlock html={codeCrud} />
    <p className="muted" style={{ marginTop: '0.8rem' }}>
      Mismo poder que el Query Builder, pero con <b>objetos</b>. <code>create()</code> necesita{' '}
      <code>$fillable</code>.
    </p>
  </Slide>,

  // 9 · Divider 2
  <SectionDivider key="s9" center num="02" eyebrow="Bloque 2" title="Relaciones" subtitle="Conecta tus modelos como en la vida real." />,

  // 10 · ¿Qué son las relaciones?
  <TwoColumn
    key="s10"
    eyebrow="Conexiones entre modelos"
    title="¿Qué son las relaciones?"
    left={
      <>
        <p className="lead">
          <b>Fichas conectadas con hilos</b> 🧵: un usuario "tiene" tareas; una tarea "pertenece a" un
          usuario. Eloquent recorre esos hilos por ti.
        </p>
        <p className="muted" style={{ marginTop: '0.8rem' }}>
          Defines la relación una vez en el modelo y la usas como una propiedad.
        </p>
      </>
    }
    right={
      <Card title="Los 3 tipos">
        <ul>
          <li><b>Uno a Uno</b> → un usuario tiene un perfil.</li>
          <li><b>Uno a Muchos</b> → un usuario tiene muchas tareas.</li>
          <li><b>Muchos a Muchos</b> → una tarea tiene muchas etiquetas y viceversa.</li>
        </ul>
      </Card>
    }
  />,

  // 11 · Uno a Uno
  <Slide key="s11">
    <span className="eyebrow">hasOne / belongsTo</span>
    <h2>Uno a Uno</h2>
    <CodeBlock html={codeOneToOne} />
    <p className="muted" style={{ marginTop: '0.8rem' }}>
      <code>hasOne</code> en el dueño; <code>belongsTo</code> en el que lleva la clave foránea
      (<code>perfiles.user_id</code>). Acceso: <code>$user-&gt;perfil</code> y <code>$perfil-&gt;user</code>.
    </p>
  </Slide>,

  // 12 · Uno a Muchos
  <Slide key="s12">
    <span className="eyebrow">hasMany / belongsTo</span>
    <h2>Uno a Muchos</h2>
    <CodeBlock html={codeOneToMany} />
    <p className="muted" style={{ marginTop: '0.8rem' }}>
      Es la relación más común. La clave foránea (<code>tareas.user_id</code>) la creamos en la
      migración de la Sesión 4.
    </p>
  </Slide>,

  // 13 · Acceder a las relaciones
  <Slide key="s13">
    <span className="eyebrow">Propiedad vs método</span>
    <h2>Acceder a las relaciones</h2>
    <CodeBlock html={codeAccess} />
    <p className="muted" style={{ marginTop: '0.8rem' }}>
      Propiedad (<code>$user-&gt;tareas</code>) = resultados ya cargados. Método
      (<code>$user-&gt;tareas()</code>) = consulta que puedes seguir encadenando.
    </p>
  </Slide>,

  // 14 · Muchos a Muchos
  <Slide key="s14">
    <span className="eyebrow">belongsToMany + tabla pivote</span>
    <h2>Muchos a Muchos</h2>
    <CodeBlock html={codeManyToMany} />
    <p className="muted" style={{ marginTop: '0.8rem' }}>
      Convención de la tabla pivote: nombres en <b>singular</b>, <b>orden alfabético</b>, separados por
      <code> _</code>: <code>etiqueta_tarea</code> (con <code>etiqueta_id</code> y <code>tarea_id</code>).
    </p>
  </Slide>,

  // 15 · Pivot
  <Slide key="s15">
    <span className="eyebrow">Gestionar la tabla pivote</span>
    <h2>Pivot: attach, detach, sync</h2>
    <CodeBlock html={codePivot} />
    <p className="muted" style={{ marginTop: '0.8rem' }}>
      <code>attach/detach/sync</code> gestionan el pivote. <code>withPivot()</code> expone columnas
      extra; el objeto <code>pivot</code> da acceso a ellas.
    </p>
  </Slide>,

  // 16 · Eager loading
  <Slide key="s16">
    <span className="eyebrow">Rendimiento</span>
    <h2>Eager loading: el problema N+1</h2>
    <CodeBlock html={codeEager} />
    <p className="muted" style={{ marginTop: '0.8rem' }}>
      <code>with()</code> carga las relaciones <b>por adelantado</b> y evita cientos de consultas. Es
      la optimización más importante al trabajar con relaciones.
    </p>
  </Slide>,

  // 17 · Divider 3
  <SectionDivider key="s17" center num="03" eyebrow="Bloque 3" title="Accessors, Mutators y Scopes" subtitle="Transformar datos y reutilizar consultas." />,

  // 18 · Accessors
  <Slide key="s18">
    <span className="eyebrow">Transformar al leer</span>
    <h2>Accessors</h2>
    <CodeBlock html={codeAccessor} />
    <p className="muted" style={{ marginTop: '0.8rem' }}>
      🔎 Un filtro de salida: el dato sale transformado sin tocar la base. El método en{' '}
      <code>camelCase</code> mapea a la columna en <code>snake_case</code>.
    </p>
  </Slide>,

  // 19 · Mutators
  <Slide key="s19">
    <span className="eyebrow">Transformar al guardar</span>
    <h2>Mutators</h2>
    <CodeBlock html={codeMutator} />
    <p className="muted" style={{ marginTop: '0.8rem' }}>
      🚪 Un filtro de entrada: normaliza el dato antes de guardarlo. También existen los <b>casts</b>
      (<code>'completada' =&gt; 'boolean'</code>) para conversiones automáticas, sin escribir métodos.
    </p>
  </Slide>,

  // 20 · Scopes
  <Slide key="s20">
    <span className="eyebrow">Consultas reutilizables</span>
    <h2>Scopes</h2>
    <CodeBlock html={codeScope} />
    <p className="muted" style={{ marginTop: '0.8rem' }}>
      ⭐ Un atajo guardado: encapsulas un filtro común y lo reutilizas. 🆕 En Laravel 13 se marca con
      el atributo <code>#[Scope]</code> (la forma clásica <code>scopePendientes()</code> aún funciona).
    </p>
  </Slide>,

  // 21 · Divider 4
  <SectionDivider key="s21" center num="04" eyebrow="Bloque 4" title="Laboratorio" subtitle="Implementar relaciones entre modelos. ⌨️" />,

  // 22 · Laboratorio paso a paso
  <CardsGrid key="s22" eyebrow="Práctica guiada" title="Laboratorio paso a paso">
    <Card title="① Crear los modelos">
      <ul>
        <li><code>make:model Categoria -m</code> y <code>make:model Etiqueta -m</code>.</li>
        <li>Definir <code>$fillable</code> en cada uno.</li>
      </ul>
    </Card>
    <Card title="② Definir relaciones">
      <ul>
        <li><code>Tarea belongsTo User</code> y <code>belongsTo Categoria</code>.</li>
        <li><code>Tarea belongsToMany Etiqueta</code> (pivote <code>etiqueta_tarea</code>).</li>
      </ul>
    </Card>
    <Card title="③ Poblar con factories">
      <ul>
        <li><code>User::factory()-&gt;hasTareas(3)-&gt;create()</code>.</li>
        <li><code>attach</code> de etiquetas a algunas tareas.</li>
      </ul>
    </Card>
    <Card title="④ Consultar con Eloquent">
      <ul>
        <li><code>Tarea::with(['user', 'categoria', 'etiquetas'])-&gt;get()</code>.</li>
        <li>Probar <code>Tarea::pendientes()-&gt;get()</code> en tinker.</li>
      </ul>
    </Card>
  </CardsGrid>,

  // 23 · Aplicado: TareaController con Eloquent
  <Slide key="s23">
    <span className="eyebrow">Datos relacionados en el proyecto</span>
    <h2>TareaController con Eloquent</h2>
    <CodeBlock html={codeController} />
    <p className="muted" style={{ marginTop: '0.8rem' }}>
      La vista Blade sigue igual, pero ahora cada <code>$tarea</code> es un <b>objeto</b> con su{' '}
      <code>$tarea-&gt;user-&gt;name</code> ya cargado. Limpio, legible y sin N+1.
    </p>
  </Slide>,

  // 24 · Checklist
  <Slide key="s24">
    <span className="eyebrow">Antes de cerrar</span>
    <h2>Checklist de la sesión</h2>
    <ul className="checks big" style={{ marginTop: '1rem' }}>
      <li>Entiendo qué es un ORM y la diferencia con el Query Builder.</li>
      <li>Creo modelos y configuro $fillable.</li>
      <li>Hago CRUD con Eloquent (all, find, create, update, delete).</li>
      <li>Defino relaciones Uno a Uno y Uno a Muchos.</li>
      <li>Defino Muchos a Muchos y manejo la tabla pivote (attach/sync).</li>
      <li>Evito el N+1 con with().</li>
      <li>Creo accessors, mutators y scopes.</li>
    </ul>
  </Slide>,

  // 25 · Resumen
  <Slide key="s25">
    <span className="eyebrow">Lo que aprendiste hoy</span>
    <h2>Resumen de la sesión</h2>
    <div className="grid g2" style={{ marginTop: '0.8rem' }}>
      <Card title="Modelos">
        <p className="muted">
          Cada tabla es una clase; cada fila, un <b>objeto</b> con métodos, accessors y scopes.
        </p>
      </Card>
      <Card title="Relaciones">
        <p className="muted">
          <code>hasOne</code>, <code>hasMany</code> y <code>belongsToMany</code> conectan los modelos;
          <code> with()</code> los carga eficientemente.
        </p>
      </Card>
    </div>
    <p className="lead" style={{ marginTop: '1.2rem' }}>
      📌 Idea central: <span className="accent">Eloquent convierte filas en objetos y relaciones en propiedades</span>.
    </p>
  </Slide>,

  // 26 · Próxima sesión + tarea
  <Slide key="s26" center>
    <span className="eyebrow">Próxima sesión</span>
    <h2 style={{ fontSize: '2.6rem' }}>Sesión 6 - Autenticación y Roles</h2>
    <div className="grid g2" style={{ marginTop: '1.4rem', maxWidth: '60vw' }}>
      <Card title="Autenticación"><p className="muted">Laravel Breeze: login, registro y middleware de auth.</p></Card>
      <Card title="Roles y permisos"><p className="muted">Spatie Permission: las tareas tendrán dueño autenticado.</p></Card>
    </div>
    <p className="muted" style={{ marginTop: '1.4rem' }}>
      <b>Tarea:</b> crea el modelo <code>Categoria</code> con su relación <code>hasMany</code> hacia{' '}
      <code>Tarea</code> (y el inverso <code>belongsTo</code>), y un scope <code>pendientes()</code>.
    </p>
  </Slide>,

  // 27 · Cierre
  <Slide key="s27" center>
    <LaravelLogo />
    <h1>¿Preguntas? 🙌</h1>
    <p className="lead muted" style={{ marginTop: '1rem' }}>
      ¡Gracias por tu atención!
      <br />
      Nos vemos en la Sesión 6.
    </p>
    <p className="muted" style={{ marginTop: '1.6rem' }}>
      Desarrollo de Aplicaciones Web con Laravel 13 · Omar Mamani
    </p>
  </Slide>,
]

export default slides
