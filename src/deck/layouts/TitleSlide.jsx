import { ReactLogo } from '../Deck.jsx'

// Portada. Úsala con `center` en el array de slides: <TitleSlide center ... />
export default function TitleSlide({ eyebrow, title, subtitle, meta, logo = false }) {
  return (
    <>
      {logo && <ReactLogo />}
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h1>{title}</h1>
      {subtitle && (
        <p className="lead muted" style={{ marginTop: '1.2rem' }}>
          {subtitle}
        </p>
      )}
      {meta && (
        <p className="muted" style={{ marginTop: '1.6rem' }}>
          {meta}
        </p>
      )}
    </>
  )
}
