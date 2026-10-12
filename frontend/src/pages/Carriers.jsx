import { Link } from 'react-router-dom'
import { ArrowRight, BadgeDollarSign, CalendarClock, Headset, Route, CheckCircle2 } from 'lucide-react'
import { Seo, breadcrumbLd } from '../lib/seo'
import { company } from '../data/company'
import { PageHero } from '../components/layout/PageHero'
import { Section, SectionHeading } from '../components/ui/Section'
import { Reveal, RevealGroup, Item } from '../components/ui/Reveal'

const perks = [
  { icon: BadgeDollarSign, title: 'Quick pay available', text: 'Get paid in as little as 2 business days with our quick pay option, or standard net-30 at no fee.' },
  { icon: Route, title: 'Consistent freight', text: 'Dedicated and recurring lanes out of the Pacific Northwest, Texas, the Southeast, Midwest and West Coast ports.' },
  { icon: Headset, title: '24/7 dispatch support', text: 'A real person on the phone around the clock while you are under a load.' },
  { icon: CalendarClock, title: 'Fast detention & TONU', text: 'Detention and truck-ordered-not-used approved quickly when it is documented.' },
]

const reqs = ['Active MC/DOT authority (90+ days preferred)', '$1,000,000 auto liability and $100,000 cargo insurance', 'Satisfactory or unrated FMCSA safety rating', 'ELD compliant with tracking consent', 'W-9 and signed broker-carrier agreement']

export default function Carriers() {
  return (
    <>
      <Seo
        title="Carriers: Partner With Alpha Lion Logistics"
        description="Owner-operators and fleets: haul for Alpha Lion Logistics. Consistent freight, quick pay, 24/7 dispatch support and fast detention approval. Set up in minutes."
        jsonLd={breadcrumbLd([{ name: 'Home', path: '/' }, { name: 'Carriers', path: '/carriers' }])}
      />
      <PageHero crumbs={[{ name: 'Carriers' }]} eyebrow="For carriers" title="Haul with a broker that treats carriers like partners" text="Fair rates, quick pay, and dispatchers who actually pick up. Join our network of 12,000+ carriers.">
        <div className="flex flex-wrap gap-3">
          <a href={`mailto:${company.email}?subject=Carrier%20Setup%20Request`} className="btn-primary">Start carrier setup <ArrowRight className="h-4 w-4" /></a>
          <a href={company.phoneHref} className="btn-outline">Call dispatch</a>
        </div>
      </PageHero>

      <Section>
        <SectionHeading eyebrow="Why haul for us" title="Built for the carriers who show up" />
        <RevealGroup className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {perks.map(({ icon: Ic, title, text }) => (
            <Item key={title} className="card">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand"><Ic className="h-6 w-6" /></span>
              <h3 className="mt-5 text-lg font-extrabold">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-500">{text}</p>
            </Item>
          ))}
        </RevealGroup>
      </Section>

      <Section tone="cloud">
        <div className="grid gap-10 lg:grid-cols-2">
          <Reveal>
            <span className="eyebrow">Requirements</span>
            <h2 className="mt-4 text-3xl font-extrabold">What you need to get set up</h2>
            <ul className="mt-6 space-y-3">
              {reqs.map((r) => (
                <li key={r} className="flex gap-3 text-ink-700"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-ink" /> {r}</li>
              ))}
            </ul>
          </Reveal>
          <Reveal className="rounded-4xl bg-ink p-8 text-white">
            <h2 className="text-2xl font-extrabold text-white">Set up in three steps</h2>
            <ol className="mt-6 space-y-5">
              {[
                ['Email or call us', 'Send your MC number and contact info to our carrier team.'],
                ['Sign the packet', 'We send a digital broker-carrier agreement, W-9, and insurance request.'],
                ['Start hauling', 'Once your insurance is verified you are live in our system, usually the same day.'],
              ].map(([t, d], i) => (
                <li key={t} className="flex gap-4">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand font-display font-extrabold text-ink">{i + 1}</span>
                  <div><p className="font-bold text-white">{t}</p><p className="text-sm text-white/70">{d}</p></div>
                </li>
              ))}
            </ol>
            <a href={`mailto:${company.email}?subject=Carrier%20Setup%20Request`} className="btn-primary mt-8 w-full">Request carrier packet <ArrowRight className="h-4 w-4" /></a>
          </Reveal>
        </div>
      </Section>

      <Section>
        <Reveal className="rounded-4xl border border-line p-8 text-center sm:p-12">
          <h2 className="text-2xl font-extrabold sm:text-3xl">Are you a shipper?</h2>
          <p className="mt-2 text-ink-500">This page is for carriers. If you need freight moved, we are ready to quote.</p>
          <Link to="/quote" className="btn-dark mt-6">Request a Quote <ArrowRight className="h-4 w-4" /></Link>
        </Reveal>
      </Section>
    </>
  )
}
