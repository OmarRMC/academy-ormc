import { site } from '../config/site.js'
import { courses } from '../data/courses.js'
import CourseCard from '../components/CourseCard.jsx'
import Seo from '../components/Seo.jsx'

export default function HomePage() {
  // Lista estructurada de cursos para los buscadores
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Cursos de OmarRMC Academy',
    itemListElement: courses.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.title,
      url: `${site.url}/cursos/${c.id}`,
    })),
  }

  return (
    <div className="max-w-6xl mx-auto px-5">
      <Seo
        description={`${site.brand}: cursos y talleres prácticos de React, Firebase, Laravel, MySQL y CI/CD impartidos por ${site.instructor}.`}
        path="/"
        jsonLd={jsonLd}
      />
      {/* Hero / presentación del instructor */}
      <section className="pt-16 pb-12 text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight">
          {site.tagline}
        </h1>
        <p className="mt-5 text-lg text-muted max-w-2xl mx-auto">{site.intro}</p>
        <p className="mt-6 text-sm text-muted">
          Por <span className="text-ink font-semibold">{site.instructor}</span> · {site.rol}
        </p>
      </section>

      {/* Grilla de cursos */}
      <section className="pb-10">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-bold">Cursos & Talleres</h2>
          <span className="text-sm text-muted">{courses.length} cursos</span>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          {courses.map((c) => (
            <CourseCard key={c.id} course={c} />
          ))}
        </div>
      </section>
    </div>
  )
}
