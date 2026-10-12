import { ShieldCheck, Headset, Gauge, DollarSign, Radar, Handshake } from 'lucide-react'
import { Section, SectionHeading } from '../ui/Section'
import { RevealGroup, Item } from '../ui/Reveal'

const reasons = [
  { icon: Headset, title: 'One point of contact', text: 'A dedicated account rep who knows your freight, your docks, and your receivers. No call centers.' },
  { icon: ShieldCheck, title: 'Vetted, insured carriers', text: 'Every carrier is screened for authority, safety scores, insurance, and performance history before the first load.' },
  { icon: Gauge, title: 'Fast, honest quotes', text: 'Market-based rates in minutes, with accessorials called out upfront. No bait-and-switch.' },
  { icon: Radar, title: 'Proactive tracking', text: 'ELD and GPS tracking with check-ins at pickup, in transit, and delivery, plus instant alerts on exceptions.' },
  { icon: DollarSign, title: 'Simple billing', text: 'One invoice per load with POD attached. Net terms available for qualified shippers.' },
  { icon: Handshake, title: 'Built on relationships', text: 'We treat carriers well so they show up for you. Quick pay and clear communication keep the best drivers on our loads.' },
]

export function WhyUs() {
  return (
    <Section>
      <SectionHeading eyebrow="Why Alpha Lion" title="A brokerage that acts like your own logistics team" text="We built Alpha Lion around the things shippers told us they could not get from big brokers: responsiveness, transparency, and accountability." />
      <RevealGroup className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {reasons.map(({ icon: Ic, title, text }) => (
          <Item key={title} className="group rounded-3xl border border-line p-6 transition hover:border-ink hover:bg-cloud">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-cloud transition group-hover:bg-brand"><Ic className="h-6 w-6" /></span>
            <h3 className="mt-5 text-lg font-extrabold">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-500">{text}</p>
          </Item>
        ))}
      </RevealGroup>
    </Section>
  )
}
