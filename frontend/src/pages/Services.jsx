import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Check } from 'lucide-react'
import { Seo, breadcrumbLd, serviceLd } from '../lib/seo'
import { services } from '../data/services'
import { PageHero } from '../components/layout/PageHero'
import { Section } from '../components/ui/Section'
import { Reveal } from '../components/ui/Reveal'
import { Icon } from '../components/ui/Icon'
import { ServicesGrid } from '../components/home/ServicesGrid'
import { CtaBand } from '../components/home/CtaBand'

export default function Services() {
  const [active, setActive] = useState(0)
  const s = services[active]
  return (
    <>
      <Seo
        title="Freight Services: FTL, LTL, Drayage, Expedited & More"
        description="Explore Alpha Lion Logistics services: full truckload dry van, LTL & partial, port drayage, transloading, import/export transportation, expedited & dedicated, and spot overflow capacity."
        jsonLd={[breadcrumbLd([{ name: 'Home', path: '/' }, { name: 'Services', path: '/services' }]), ...services.map(serviceLd)]}
      />
      <PageHero
        crumbs={[{ name: 'Services' }]}
        eyebrow="Our services"
        title="Transportation solutions for every lane, load and deadline"
        text="Seven core services, one accountable partner. Pick the mode that fits your freight or let our team recommend the most cost-effective option."
      >
        <Link to="/quote" className="btn-primary">Request a Quote <ArrowRight className="h-4 w-4" /></Link>
      </PageHero>

      <Section tone="cloud">
        <Reveal>
          <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:px-0" role="tablist" aria-label="Services">
            {services.map((item, i) => (
              <button
                key={item.slug}
                role="tab"
                aria-selected={active === i}
                onClick={() => setActive(i)}
                className={`flex shrink-0 items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-bold transition ${active === i ? 'border-ink bg-ink text-white' : 'border-line bg-white hover:border-ink'}`}
              >
                <Icon name={item.icon} className="h-4 w-4" /> {item.title}
              </button>
            ))}
          </div>
        </Reveal>
        <AnimatePresence mode="wait">
          <motion.div
            key={s.slug}
            role="tabpanel"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            className="mt-8 grid gap-8 rounded-4xl border border-line bg-white p-6 shadow-soft sm:p-10 lg:grid-cols-5"
          >
            <div className="lg:col-span-3">
              <span className="grid h-14 w-14 place-items-center rounded-2xl bg-brand"><Icon name={s.icon} className="h-7 w-7" /></span>
              <h2 className="mt-5 text-3xl font-extrabold">{s.title}</h2>
              <p className="mt-3 text-lg text-ink-500">{s.hero}</p>
              <p className="mt-4 leading-relaxed text-ink-700">{s.description}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link to={`/services/${s.slug}`} className="btn-dark">Learn more <ArrowRight className="h-4 w-4" /></Link>
                <Link to={`/quote?service=${encodeURIComponent(s.title === 'Expedited & Dedicated Transportation' ? 'Expedited & Dedicated' : s.title)}`} className="btn-outline">Get a quote</Link>
              </div>
            </div>
            <div className="rounded-3xl bg-cloud p-6 lg:col-span-2">
              <h3 className="text-sm font-extrabold uppercase tracking-wider text-ink-500">What's included</h3>
              <ul className="mt-4 space-y-3">
                {s.features.map((f) => (
                  <li key={f} className="flex gap-3 text-sm"><span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand"><Check className="h-3 w-3" /></span>{f}</li>
                ))}
              </ul>
              <h3 className="mt-6 text-sm font-extrabold uppercase tracking-wider text-ink-500">Best for</h3>
              <div className="mt-3 flex flex-wrap gap-1.5">{s.bestFor.map((b) => <span key={b} className="rounded-full bg-white px-3 py-1 text-xs font-semibold">{b}</span>)}</div>
            </div>
          </motion.div>
        </AnimatePresence>
      </Section>

      <ServicesGrid />
      <CtaBand title="Not sure which service fits?" text="Send us the shipment details and our team will recommend the most cost-effective option." />
    </>
  )
}
