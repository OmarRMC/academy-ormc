// Diapositiva de dos columnas (p. ej. texto + código/tarjeta).
export default function TwoColumn({ eyebrow, title, lead, left, right, style }) {
  return (
    <>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      {title && <h2>{title}</h2>}
      {lead && (
        <p className="lead" style={{ marginTop: '0.3rem' }}>
          {lead}
        </p>
      )}
      <div className="two-col" style={{ marginTop: '1rem', ...style }}>
        <div>{left}</div>
        <div>{right}</div>
      </div>
    </>
  )
}
