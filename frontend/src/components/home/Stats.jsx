import { stats } from '../../data/testimonials'
import { Counter } from '../ui/Counter'
import { RevealGroup, Item } from '../ui/Reveal'

export function Stats({ dark = false }) {
  return (
    <section className={`${dark ? 'bg-ink text-white' : 'bg-brand'} py-12`}>
      <RevealGroup className="container-x grid grid-cols-2 gap-8 lg:grid-cols-4">
        {stats.map((s) => (
          <Item key={s.label} className="text-center">
            <p className={`font-display text-4xl font-extrabold sm:text-5xl ${dark ? 'text-brand' : 'text-ink'}`}>
              <Counter value={s.value} suffix={s.suffix} decimals={s.decimals || 0} />
            </p>
            <p className={`mt-1 text-sm font-semibold ${dark ? 'text-white/70' : 'text-ink-700'}`}>{s.label}</p>
          </Item>
        ))}
      </RevealGroup>
    </section>
  )
}
