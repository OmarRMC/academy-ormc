import { Link } from 'react-router-dom'
import { site } from '../../config/site.js'
import { ArrowLeft } from '../ui/Icons.jsx'

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-bg/70 border-b border-white/10">
      <nav className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-extrabold text-lg">
          <span className="text-react text-2xl">⚛</span>
          <span>
            {/*OmarRMC*/}
             <span className="text-react">Academy</span>
          </span>
        </Link>

        <div className="flex items-center gap-5 text-sm">
          <Link to="/" className="text-muted hover:text-ink transition-colors">
            Cursos
          </Link>
          {/* Gancho de integración con el portafolio principal */}
          <a
            href={site.portfolioUrl}
            className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 px-3 py-1.5
                       text-ink hover:border-react/50 hover:text-react transition-colors"
          >
            <ArrowLeft size={15} /> Omar MC
          </a>
        </div>
      </nav>
    </header>
  )
}
