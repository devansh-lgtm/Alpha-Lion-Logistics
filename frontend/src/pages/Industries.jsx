import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Seo, breadcrumbLd } from '../lib/seo'
import { industries } from '../data/industries'
import { PageHero } from '../components/layout/PageHero'
import { Section, SectionHeading } from '../components/ui/Section'
import { RevealGroup, Item } from '../components/ui/Reveal'
import { Icon } from '../components/ui/Icon'
import { TiltCard } from '../components/ui/TiltCard'
import { Stats } from '../components/home/Stats'
import { CtaBand } from '../components/home/CtaBand'

export default function Industries() {
  return (
    <>
      <Seo
        title="Industries We Serve"
        description="Alpha Lion Logistics moves freight for retail, manufacturing, food & beverage, automotive, CPG, building materials, paper & packaging, and importers across the USA."
        jsonLd={breadcrumbLd([{ name: 'Home', path: '/' }, { name: 'Industries', path: '/industries' }])}
      />
      <PageHero crumbs={[{ name: 'Industries' }]} eyebrow="Industries" title="Freight expertise for the industries that keep America moving" text="Every industry has its own compliance rules, dock realities and seasonality. Our team has moved freight in all of them.">
        <Link to="/quote" className="btn-primary">Request a Quote <ArrowRight className="h-4 w-4" /></Link>
      </PageHero>
      <Section>
        <RevealGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {industries.map((ind) => (
            <Item key={ind.title}>
              <TiltCard className="h-full">
                <div className="card flex h-full flex-col">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand"><Icon name={ind.icon} className="h-6 w-6" /></span>
                  <h2 className="mt-5 text-lg font-extrabold">{ind.title}</h2>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-500">{ind.blurb}</p>
                </div>
              </TiltCard>
            </Item>
          ))}
        </RevealGroup>
      </Section>
      <Stats dark />
      <Section>
        <SectionHeading eyebrow="Compliance ready" title="We speak retailer, receiver and regulator" text="Big-box routing guides, FSMA-compliant food hauls, hazmat endorsements, C-TPAT partners, and appointment-driven receivers. Tell us the requirement and we match a carrier that meets it." />
      </Section>
      <CtaBand title="Don't see your industry?" text="We probably move it. Send us the details and we will tell you exactly how we would handle it." />
    </>
  )
}
