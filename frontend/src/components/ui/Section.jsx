import { Reveal } from './Reveal'

export function Section({ children, className = '', id, tone = 'white' }) {
  const bg = tone === 'cloud' ? 'bg-cloud' : tone === 'ink' ? 'bg-ink text-white' : tone === 'brand' ? 'bg-brand' : 'bg-white'
  return (
    <section id={id} className={`py-16 sm:py-20 lg:py-24 ${bg} ${className}`}>
      <div className="container-x">{children}</div>
    </section>
  )
}

export function SectionHeading({ eyebrow, title, text, align = 'center', dark = false, className = '' }) {
  const alignCls = align === 'left' ? 'text-left items-start' : 'text-center items-center mx-auto'
  return (
    <Reveal className={`flex max-w-3xl flex-col gap-4 ${alignCls} ${className}`}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2 className={`text-3xl font-extrabold sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1] ${dark ? 'text-white' : ''}`}>{title}</h2>
      {text && <p className={`text-base leading-relaxed sm:text-lg ${dark ? 'text-white/70' : 'text-ink-500'}`}>{text}</p>}
    </Reveal>
  )
}
