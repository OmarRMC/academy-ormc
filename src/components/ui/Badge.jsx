// Pequeña insignia de estado/identificación (módulo, nivel, etc.)
const tones = {
  react: 'bg-react/10 border-react/30 text-react',
  laravel: 'bg-laravel/10 border-laravel/40 text-laravel',
  green: 'bg-green/10 border-green/30 text-green',
  muted: 'bg-white/5 border-white/15 text-muted',
}

export default function Badge({ children, tone = 'muted', className = '' }) {
  return (
    <span
      className={
        'inline-flex items-center gap-1 text-xs font-bold rounded-full px-2.5 py-1 border ' +
        (tones[tone] || tones.muted) +
        ' ' +
        className
      }
    >
      {children}
    </span>
  )
}
