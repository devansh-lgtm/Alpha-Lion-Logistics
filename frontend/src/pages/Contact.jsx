import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin, Clock, ArrowRight } from 'lucide-react'
import { Seo, breadcrumbLd, localBusinessLd } from '../lib/seo'
import { company } from '../data/company'
import { PageHero } from '../components/layout/PageHero'
import { Section } from '../components/ui/Section'
import { Reveal, RevealGroup, Item } from '../components/ui/Reveal'
import { ContactForm } from '../components/forms/ContactForm'

export default function Contact() {
  const cards = [
    { icon: Phone, title: 'Call us', text: company.phone, href: company.phoneHref },
    { icon: Mail, title: 'Email us', text: company.email, href: `mailto:${company.email}` },
    { icon: MapPin, title: 'Visit us', text: `${company.address.street}, ${company.address.city}, ${company.address.state} ${company.address.zip}` },
    { icon: Clock, title: 'Hours', text: company.hours },
  ]
  return (
    <>
      <Seo
        title="Contact Us"
        description={`Contact ${company.name} for freight quotes, carrier setup or general questions. Call ${company.phone} or email ${company.email}. Based in Renton, WA, serving all 48 states.`}
        jsonLd={[localBusinessLd, breadcrumbLd([{ name: 'Home', path: '/' }, { name: 'Contact', path: '/contact' }])]}
      />
      <PageHero compact crumbs={[{ name: 'Contact' }]} eyebrow="Contact us" title="Let's talk freight" text="Questions, quotes, or carrier setup: reach us any way you like. We respond fast." />
      <Section className="pt-10!">
        <RevealGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map(({ icon: Ic, title, text, href }) => (
            <Item key={title}>
              {href ? (
                <a href={href} className="card block h-full hover:border-ink"><Ic className="h-6 w-6" /><h2 className="mt-4 text-sm font-extrabold uppercase tracking-wider text-ink-500">{title}</h2><p className="mt-1 break-words font-bold">{text}</p></a>
              ) : (
                <div className="card h-full"><Ic className="h-6 w-6" /><h2 className="mt-4 text-sm font-extrabold uppercase tracking-wider text-ink-500">{title}</h2><p className="mt-1 text-sm font-semibold">{text}</p></div>
              )}
            </Item>
          ))}
        </RevealGroup>
        <div className="mt-10 grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7"><ContactForm /></div>
          <Reveal className="lg:col-span-5">
            <div className="rounded-4xl bg-brand p-8">
              <h2 className="text-2xl font-extrabold">Need a rate right now?</h2>
              <p className="mt-2 text-ink-700">Skip the message and use our quote form. It captures everything we need to price your shipment in one go.</p>
              <Link to="/quote" className="btn-dark mt-6">Request a Quote <ArrowRight className="h-4 w-4" /></Link>
            </div>
            <div className="mt-5 overflow-hidden rounded-4xl border border-line">
              <iframe
                title={`${company.name} office location map`}
                src={`https://www.google.com/maps?q=${encodeURIComponent(`${company.address.street}, ${company.address.city}, ${company.address.state} ${company.address.zip}`)}&output=embed`}
                className="h-72 w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  )
}
