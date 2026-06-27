// Separador de bloque: número grande + eyebrow + título. Úsalo con `center`.
export default function SectionDivider({ num, eyebrow, title, subtitle }) {
  return (
    <>
      {num && <div className="num">{num}</div>}
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h1>{title}</h1>
      {subtitle && (
        <p className="lead muted" style={{ marginTop: '1rem' }}>
          {subtitle}
        </p>
      )}
    </>
  )
}
