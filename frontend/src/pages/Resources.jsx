import { Link } from 'react-router-dom'
import { ArrowRight, BookOpen } from 'lucide-react'
import { Seo, breadcrumbLd } from '../lib/seo'
import { PageHero } from '../components/layout/PageHero'
import { Section, SectionHeading } from '../components/ui/Section'
import { Reveal, RevealGroup, Item } from '../components/ui/Reveal'
import { QuoteEstimator } from '../components/home/QuoteEstimator'
import { FreightClassCalculator } from '../components/tools/FreightClassCalculator'
import { PalletCalculator } from '../components/tools/PalletCalculator'
import { CtaBand } from '../components/home/CtaBand'

const guides = [
  { title: 'FTL vs. LTL vs. Partial: which is right for your shipment?', text: 'A quick framework based on pallet count, weight, fragility and urgency.', tag: 'Guide' },
  { title: 'How to avoid demurrage and per diem on imports', text: 'The five habits of importers that never pay container storage fees.', tag: 'Drayage' },
  { title: 'Freight class explained: density, stowability, handling and liability', text: 'What NMFC class means, why it matters, and how to get it right the first time.', tag: 'LTL' },
  { title: 'Preparing your dock for faster pickups', text: 'Simple paperwork and staging practices that cut detention and keep carriers coming back.', tag: 'Operations' },
  { title: 'Spot vs. contract rates: when to use each', text: 'Understand freight market cycles and how to blend both for lower total cost.', tag: 'Pricing' },
  { title: 'What accessorials really cost (and how to avoid them)', text: 'Liftgate, residential, limited access, redelivery, and more, decoded.', tag: 'Pricing' },
]

export default function Resources() {
  return (
    <>
      <Seo
        title="Shipper Resources & Freight Tools"
        description="Free freight tools from Alpha Lion Logistics: instant rate estimator, freight class calculator, pallet and trailer fit calculator, plus shipping guides for US shippers."
        jsonLd={breadcrumbLd([{ name: 'Home', path: '/' }, { name: 'Resources', path: '/resources' }])}
      />
      <PageHero crumbs={[{ name: 'Resources' }]} eyebrow="Resources & tools" title="Free tools to plan smarter shipments" text="Estimate lane rates, calculate freight class, and check how many pallets fit before you request a quote." />

      <Section tone="cloud" id="tools">
        <SectionHeading eyebrow="Interactive tools" title="Plan it in seconds" />
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          <Reveal><QuoteEstimator compact /></Reveal>
          <Reveal><FreightClassCalculator /></Reveal>
          <Reveal><PalletCalculator /></Reveal>
        </div>
      </Section>

      <Section id="guides">
        <SectionHeading eyebrow="Shipping guides" title="Learn from our logistics team" text="Practical, no-fluff guides written for people who ship freight for a living." />
        <RevealGroup className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {guides.map((g) => (
            <Item key={g.title} as="article" className="card group flex h-full flex-col">
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-brand-50 px-3 py-1 text-[11px] font-bold uppercase tracking-wider">{g.tag}</span>
                <BookOpen className="h-5 w-5 text-ink-300" />
              </div>
              <h3 className="mt-4 text-lg font-extrabold leading-snug">{g.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-500">{g.text}</p>
              <Link to="/contact" className="mt-5 inline-flex items-center gap-1 text-sm font-bold transition group-hover:gap-2">Ask us about this <ArrowRight className="h-4 w-4" /></Link>
            </Item>
          ))}
        </RevealGroup>
      </Section>

      <CtaBand title="Ready for an exact quote?" text="Our tools get you close. Our team gets you the real number." />
    </>
  )
}
