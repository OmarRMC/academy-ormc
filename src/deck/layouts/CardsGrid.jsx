// Rejilla de tarjetas (2 o 3 columnas). Acepta `cards` (array de {title, body})
// o `children` (composición libre con <Card>).
import Card from './Card.jsx'

export default function CardsGrid({ cols = 2, cards, children, eyebrow, title, style }) {
  return (
    <>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      {title && <h2>{title}</h2>}
      <div className={`grid ${cols === 3 ? 'g3' : 'g2'}`} style={{ marginTop: '1rem', ...style }}>
        {cards
          ? cards.map((c, i) => (
              <Card key={i} title={c.title} titleClass={c.titleClass}>
                <p className="muted">{c.body}</p>
              </Card>
            ))
          : children}
      </div>
    </>
  )
}
