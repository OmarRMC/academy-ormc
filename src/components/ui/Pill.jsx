// Chip de tecnología / etiqueta pequeña
export default function Pill({ children, className = '' }) {
  return (
    <span
      className={
        'inline-block text-xs font-semibold rounded-md px-2 py-1 ' +
        'bg-white/5 border border-white/10 text-muted ' +
        className
      }
    >
      {children}
    </span>
  )
}
