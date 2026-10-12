import { Link, Navigate, useParams } from 'react-router-dom'
import { ArrowRight, Check, Phone } from 'lucide-react'
import { Seo, breadcrumbLd, serviceLd, faqLd } from '../lib/seo'
import { services, getService } from '../data/services'
import { company } from '../data/company'
import { PageHero } from '../components/layout/PageHero'
import { Section, SectionHeading } from '../components/ui/Section'
import { Reveal, RevealGroup, Item } from '../components/ui/Reveal'
import { Accordion } from '../components/ui/Accordion'
import { Icon } from '../components/ui/Icon'
import { QuoteForm } from '../components/forms/QuoteForm'

export default function ServiceDetail() {
  const { slug } = useParams()
  const s = getService(slug)
  if (!s) return <Navigate to="/services" replace />
  const others = services.filter((o) => o.slug !== slug).slice(0, 3)

  return (
    <>
      <Seo
        title={`${s.title} Services`}
        description={`${s.hero} ${s.short}`}
        path={`/services/${s.slug}`}
        jsonLd={[
          serviceLd(s),
          faqLd(s.faqs),
          breadcrumbLd([{ name: 'Home', path: '/' }, { name: 'Services', path: '/services' }, { name: s.title, path: `/services/${s.slug}` }]),
        ]}
      />
      <PageHero crumbs={[{ name: 'Services', path: '/services' }, { name: s.title }]} eyebrow="Service" title={s.title} text={s.hero}>
        <div className="flex flex-wrap gap-3">
          <a href="#quote" className="btn-primary">Request a Quote <ArrowRight className="h-4 w-4" /></a>
          <a href={company.phoneHref} className="btn-outline"><Phone className="h-4 w-4" /> {company.phone}</a>
        </div>
      </PageHero>

      <Section>
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal>
              <h2 className="text-3xl font-extrabold">Overview</h2>
              <p className="mt-4 text-lg leading-relaxed text-ink-700">{s.description}</p>
            </Reveal>
            <Reveal className="mt-10">
              <h2 className="text-2xl font-extrabold">What you get</h2>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {s.features.map((f) => (
                  <li key={f} className="flex gap-3 rounded-2xl border border-line p-4 text-sm"><span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand"><Check className="h-3 w-3" /></span>{f}</li>
                ))}
              </ul>
            </Reveal>
            <Reveal className="mt-10">
              <h2 className="text-2xl font-extrabold">Frequently asked</h2>
              <Accordion items={s.faqs} className="mt-5" />
            </Reveal>
          </div>
          <aside className="lg:col-span-5">
            <Reveal className="sticky top-24 space-y-5">
              <div className="rounded-3xl bg-ink p-6 text-white">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand text-ink"><Icon name={s.icon} className="h-6 w-6" /></span>
                <h3 className="mt-4 text-lg font-extrabold text-white">Equipment & options</h3>
                <div className="mt-3 flex flex-wrap gap-1.5">{s.equipment.map((e) => <span key={e} className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold">{e}</span>)}</div>
                <h3 className="mt-6 text-lg font-extrabold text-white">Best for</h3>
                <div className="mt-3 flex flex-wrap gap-1.5">{s.bestFor.map((b) => <span key={b} className="rounded-full bg-brand px-3 py-1 text-xs font-bold text-ink">{b}</span>)}</div>
              </div>
              <div className="rounded-3xl border border-line p-6">
                <h3 className="text-sm font-extrabold uppercase tracking-wider text-ink-500">Related services</h3>
                <ul className="mt-3 divide-y divide-line">
                  {others.map((o) => (
                    <li key={o.slug}>
                      <Link to={`/services/${o.slug}`} className="group flex items-center justify-between py-3 text-sm font-bold hover:text-ink-700">
                        {o.title} <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </aside>
        </div>
      </Section>

      <Section tone="cloud" id="quote">
        <SectionHeading eyebrow="Request a quote" title={`Get a ${s.title} quote`} text="Share the lane and shipment details. We respond in minutes during business hours." />
        <div className="mx-auto mt-10 max-w-4xl"><QuoteForm /></div>
      </Section>
    </>
  )
}
