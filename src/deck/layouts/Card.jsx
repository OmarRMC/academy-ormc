// Tarjeta reutilizable dentro de un grid de diapositiva.
export default function Card({ title, titleClass = '', children }) {
  return (
    <div className="card">
      {title && <h3 className={titleClass}>{title}</h3>}
      {children}
    </div>
  )
}
