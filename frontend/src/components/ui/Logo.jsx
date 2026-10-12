import { Link } from 'react-router-dom'

export function LionMark({ className = 'h-10 w-10' }) {
  return <img src="/logo.png" alt="" className={`${className} object-contain`} aria-hidden="true" draggable="false" />
}

export function Logo({ className = '', light = false }) {
  return (
    <Link to="/" className={`flex items-center gap-2.5 ${className}`} aria-label="Alpha Lion Logistics home">
      <LionMark />
      <span className="leading-none">
        <span className={`block font-display text-lg font-extrabold tracking-tight ${light ? 'text-white' : 'text-ink'}`}>Alpha Lion</span>
        <span className={`block text-[11px] font-bold uppercase tracking-[0.2em] ${light ? 'text-brand' : 'text-ink-500'}`}>Logistics</span>
      </span>
    </Link>
  )
}
