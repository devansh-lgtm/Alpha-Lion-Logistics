import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { services } from '../../data/services'
import { Icon } from '../ui/Icon'
import { Section, SectionHeading } from '../ui/Section'
import { RevealGroup, Item } from '../ui/Reveal'
import { TiltCard } from '../ui/TiltCard'

export function ServicesGrid({ limit }) {
  const list = limit ? services.slice(0, limit) : services
  return (
    <Section id="services">
      <SectionHeading
        eyebrow="What we do"
        title="Every mode your supply chain needs"
        text="From a single pallet to a dedicated fleet, we match your freight with the right equipment, the right carrier, and the right price."
      />
      <RevealGroup className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((s, i) => (
          <Item key={s.slug}>
            <TiltCard className="h-full">
              <Link to={`/services/${s.slug}`} className="card group flex h-full flex-col hover:border-ink/20">
                <div className="flex items-start justify-between">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand transition-transform group-hover:-rotate-6 group-hover:scale-110">
                    <Icon name={s.icon} className="h-6 w-6" />
                  </span>
                  <span className="grid h-9 w-9 place-items-center rounded-full border border-line text-ink-500 transition group-hover:bg-ink group-hover:text-white">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
                <h3 className="mt-5 text-xl font-extrabold">{s.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-500">{s.short}</p>
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {s.equipment.slice(0, 3).map((e) => (
                    <span key={e} className="rounded-full bg-cloud px-2.5 py-1 text-[11px] font-semibold text-ink-700">{e}</span>
                  ))}
                </div>
              </Link>
            </TiltCard>
          </Item>
        ))}
        {limit && limit < services.length && (
          <Item>
            <Link to="/services" className="card flex h-full flex-col items-center justify-center bg-ink text-center text-white hover:border-ink">
              <motion.span whileHover={{ rotate: 45 }} className="grid h-14 w-14 place-items-center rounded-full bg-brand text-ink"><ArrowUpRight className="h-6 w-6" /></motion.span>
              <h3 className="mt-5 text-xl font-extrabold text-white">See all services</h3>
              <p className="mt-2 text-sm text-white/70">{services.length} ways we move your freight</p>
            </Link>
          </Item>
        )}
      </RevealGroup>
    </Section>
  )
}
