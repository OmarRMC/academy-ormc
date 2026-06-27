// Fila de logos de tecnologías, sin recuadro ni fondo. Cada logo lleva un
// contorno súper leve aplicado a su propia forma (drop-shadow que sigue el
// contorno real del logo), para que resalte sobre el fondo oscuro.
// Los archivos viven en /public/img/tech/.
// logos: array de { name, src } donde src es el nombre de archivo (p. ej. 'react.svg').
export default function TechLogos({ logos = [], size = 24, className = '' }) {
  if (!logos?.length) return null
  const base = import.meta.env.BASE_URL // respeta el base de Vite ('/')
  // Contorno muy tenue siguiendo la silueta del logo (no un rectángulo)
  const outline =
    'drop-shadow(0 0 0.5px rgba(255,255,255,0.6)) drop-shadow(0 1px 1px rgba(0,0,0,0.35))'
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {logos.map((l) => (
        <img
          key={l.src}
          src={`${base}img/tech/${l.src}`}
          alt={l.name}
          title={l.name}
          loading="lazy"
          style={{ height: size, width: 'auto', filter: outline }}
        />
      ))}
    </div>
  )
}
