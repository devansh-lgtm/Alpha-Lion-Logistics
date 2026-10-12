import { Clock, ShieldCheck, PhoneCall, Mail } from 'lucide-react'
import { Seo, breadcrumbLd } from '../lib/seo'
import { company } from '../data/company'
import { PageHero } from '../components/layout/PageHero'
import { Section } from '../components/ui/Section'
import { Reveal } from '../components/ui/Reveal'
import { QuoteForm } from '../components/forms/QuoteForm'

export default function Quote() {
  return (
    <>
      <Seo
        title="Request a Freight Quote"
        description="Request a fast, competitive freight quote from Alpha Lion Logistics. Truckload, LTL, drayage, expedited and more. Most quotes returned within 15–30 minutes."
        jsonLd={breadcrumbLd([{ name: 'Home', path: '/' }, { name: 'Request a Quote', path: '/quote' }])}
      />
      <PageHero compact crumbs={[{ name: 'Request a Quote' }]} eyebrow="Request a quote" title="Tell us about your shipment" text="Fill out the form and a logistics specialist will respond with a competitive rate, usually within 15–30 minutes during business hours." />
      <Section tone="cloud" className="pt-10!">
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8"><QuoteForm /></div>
          <aside className="space-y-5 lg:col-span-4">
            <Reveal className="rounded-3xl border border-line bg-white p-6">
              <h2 className="text-lg font-extrabold">What happens next</h2>
              <ul className="mt-4 space-y-4 text-sm text-ink-700">
                <li className="flex gap-3"><span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-brand"><Clock className="h-4 w-4" /></span><span><b>We review your lane</b> and price it against live market data.</span></li>
                <li className="flex gap-3"><span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-brand"><PhoneCall className="h-4 w-4" /></span><span><b>A specialist contacts you</b> with an all-in quote and any questions.</span></li>
                <li className="flex gap-3"><span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-brand"><ShieldCheck className="h-4 w-4" /></span><span><b>You approve, we cover it</b> with a vetted carrier and send tracking updates.</span></li>
              </ul>
            </Reveal>
            <Reveal className="rounded-3xl bg-ink p-6 text-white">
              <h2 className="text-lg font-extrabold text-white">Prefer to talk?</h2>
              <p className="mt-1 text-sm text-white/70">Our team is available {company.hours.split('·')[0].trim()}.</p>
              <a href={company.phoneHref} className="btn-primary mt-4 w-full"><PhoneCall className="h-4 w-4" /> {company.phone}</a>
              <a href={`mailto:${company.email}`} className="btn mt-2 w-full border border-white/20 text-white hover:bg-white hover:text-ink"><Mail className="h-4 w-4" /> {company.email}</a>
            </Reveal>
          </aside>
        </div>
      </Section>
    </>
  )
}
