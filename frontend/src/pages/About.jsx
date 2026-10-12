import { Link } from 'react-router-dom'
import { ArrowRight, Target, Eye, Heart, Users } from 'lucide-react'
import { Seo, breadcrumbLd, organizationLd } from '../lib/seo'
import { company } from '../data/company'
import { PageHero } from '../components/layout/PageHero'
import { Section, SectionHeading } from '../components/ui/Section'
import { Reveal, RevealGroup, Item } from '../components/ui/Reveal'
import { Stats } from '../components/home/Stats'
import { WhyUs } from '../components/home/WhyUs'
import { CtaBand } from '../components/home/CtaBand'

const values = [
  { icon: Target, title: 'Accountability', text: 'We own every load from tender to POD. If something goes wrong, you hear it from us first with a plan.' },
  { icon: Eye, title: 'Transparency', text: 'Honest ETAs, upfront accessorials, and pricing you can explain to your CFO.' },
  { icon: Heart, title: 'Carrier respect', text: 'Fair rates, quick pay, and clear instructions. Happy carriers show up on time for your freight.' },
  { icon: Users, title: 'Partnership', text: 'We grow by helping you grow, which means thinking about your lanes months ahead, not just today.' },
]

const timeline = [
  { year: company.founded, title: 'Founded in the Seattle area', text: 'Started as a two-person brokerage focused on Pacific Northwest dry van lanes.' },
  { year: '2020', title: 'Drayage & port services', text: 'Expanded into container drayage at Houston, Savannah and LA/Long Beach.' },
  { year: '2022', title: 'Expedited & dedicated', text: 'Launched a 24/7 expedite desk and our first dedicated fleet programs.' },
  { year: '2024', title: 'Nationwide carrier network', text: 'Surpassed 12,000 vetted carriers with coverage in all 48 contiguous states.' },
  { year: 'Today', title: 'Your logistics partner', text: 'Serving shippers across retail, manufacturing, food, automotive and more.' },
]

export default function About() {
  return (
    <>
      <Seo
        title="About Us"
        description={`Learn about ${company.name}, a Renton, Washington-based US freight brokerage founded in ${company.founded}. Our story, values, and why shippers trust us with their freight.`}
        jsonLd={[organizationLd, breadcrumbLd([{ name: 'Home', path: '/' }, { name: 'About', path: '/about' }])]}
      />
      <PageHero crumbs={[{ name: 'About' }]} eyebrow="About us" title="A freight brokerage built by people who answer the phone" text={`${company.name} was founded on a simple idea: shippers deserve a logistics partner that is as responsive and accountable as their own team.`}>
        <Link to="/contact" className="btn-primary">Talk to our team <ArrowRight className="h-4 w-4" /></Link>
      </PageHero>

      <Section>
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <span className="eyebrow">Our story</span>
            <h2 className="mt-4 text-3xl font-extrabold sm:text-4xl">From Pacific Northwest dry van lanes to nationwide coverage</h2>
            <p className="mt-5 leading-relaxed text-ink-700">
              We started {company.name} in {company.founded} after years on the shipper side, frustrated by brokers who disappeared the moment a load was booked. We built a company around the opposite: proactive communication, vetted carriers, and pricing that holds up.
            </p>
            <p className="mt-4 leading-relaxed text-ink-700">
              Today our team covers full truckload, LTL, drayage, transloading, international inland moves, and expedited freight across the United States, with cross-border coordination to Mexico and Canada. We are still privately owned, still headquartered in Renton, Washington, and still picking up the phone.
            </p>
          </Reveal>
          <Reveal className="relative">
            <ol className="relative space-y-6 border-l-2 border-line pl-8">
              {timeline.map((t) => (
                <li key={t.year} className="relative">
                  <span className="absolute -left-[41px] top-1 grid h-5 w-5 place-items-center rounded-full border-4 border-white bg-brand ring-1 ring-line" />
                  <p className="text-xs font-extrabold uppercase tracking-wider text-ink-500">{t.year}</p>
                  <h3 className="mt-1 text-lg font-extrabold">{t.title}</h3>
                  <p className="text-sm text-ink-500">{t.text}</p>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </Section>

      <Stats />

      <Section tone="cloud">
        <SectionHeading eyebrow="Our values" title="What we stand for" />
        <RevealGroup className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {values.map(({ icon: Ic, title, text }) => (
            <Item key={title} className="card">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand"><Ic className="h-6 w-6" /></span>
              <h3 className="mt-5 text-lg font-extrabold">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-500">{text}</p>
            </Item>
          ))}
        </RevealGroup>
      </Section>

      <WhyUs />
      <CtaBand />
    </>
  )
}
