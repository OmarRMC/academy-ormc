import { site } from '../../config/site.js'

export default function Footer() {
  return (
    <footer className="border-t border-white/10 mt-20">
      <div className="max-w-6xl mx-auto px-5 py-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-muted">
        <p>
          © {site.instructor} · {site.rol}
        </p>
        <div className="flex items-center gap-4">
          {site.redes.github && (
            <a href={site.redes.github} className="hover:text-react transition-colors">
              GitHub
            </a>
          )}
          {site.redes.linkedin && (
            <a href={site.redes.linkedin} className="hover:text-react transition-colors">
              LinkedIn
            </a>
          )}
          <a href={site.portfolioUrl} className="hover:text-react transition-colors">
            Portafolio
          </a>
        </div>
      </div>
    </footer>
  )
}
