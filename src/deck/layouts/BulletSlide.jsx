// Diapositiva de título + lista de viñetas (o checklist).
// items: array de nodos (string o JSX). variant: 'bullets' | 'checks'.
export default function BulletSlide({ eyebrow, title, lead, items = [], variant = 'bullets', big = false }) {
  return (
    <>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      {title && <h2>{title}</h2>}
      {lead && (
        <p className="lead" style={{ marginTop: '0.4rem' }}>
          {lead}
        </p>
      )}
      <ul className={`${variant === 'checks' ? 'checks' : ''} ${big ? 'big' : ''}`} style={{ marginTop: '0.8rem' }}>
        {items.map((it, i) => (
          <li key={i}>{it}</li>
        ))}
      </ul>
    </>
  )
}
