import { Fragment } from 'react'
import { ArrowRight } from '../../components/ui/Icons.jsx'

// Diagrama de flujo horizontal: nodos conectados por una flecha (icono SVG).
// steps: array de strings o de { label, ok }.
// arrowLabel: texto opcional junto a la flecha (p. ej. "props").
export default function Flow({ steps = [], arrowLabel, style }) {
  return (
    <div className="flow" style={style}>
      {steps.map((s, i) => {
        const label = typeof s === 'string' ? s : s.label
        const ok = typeof s === 'object' && s.ok
        return (
          <Fragment key={i}>
            <div className={`node${ok ? ' ok' : ''}`}>{label}</div>
            {i < steps.length - 1 && (
              <span className="arrow">
                {arrowLabel && <span className="arrow-label">{arrowLabel}</span>}
                <ArrowRight size={26} />
              </span>
            )}
          </Fragment>
        )
      })}
    </div>
  )
}
