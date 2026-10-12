import { Seo } from '../lib/seo'
import { company } from '../data/company'
import { PageHero } from '../components/layout/PageHero'
import { Section } from '../components/ui/Section'

const Block = ({ title, children }) => (
  <div>
    <h2 className="text-xl font-extrabold">{title}</h2>
    <div className="mt-3 space-y-3 leading-relaxed text-ink-700">{children}</div>
  </div>
)

export function Privacy() {
  return (
    <>
      <Seo title="Privacy Policy" description={`How ${company.name} collects, uses and protects information submitted through our website.`} noindex />
      <PageHero compact crumbs={[{ name: 'Privacy Policy' }]} title="Privacy Policy" text="Last updated: October 2026" />
      <Section className="pt-10!">
        <div className="mx-auto max-w-3xl space-y-8">
          <Block title="Information we collect">
            <p>When you request a quote or contact us, we collect the information you provide: name, company, email, phone, shipment origin and destination, equipment, and shipment details. We also collect standard server logs such as IP address and browser type.</p>
          </Block>
          <Block title="How we use it">
            <p>We use this information solely to respond to your request, prepare quotes, arrange transportation, and communicate about your shipments. We do not sell your information. We may share it with carriers and service providers only as needed to move your freight.</p>
          </Block>
          <Block title="Retention & security">
            <p>Form submissions are delivered to our company email and retained as business records. We apply reasonable technical and organizational safeguards, including transport encryption and rate limiting, to protect submitted data.</p>
          </Block>
          <Block title="Your choices">
            <p>You may request access to, correction of, or deletion of your information by emailing <a href={`mailto:${company.email}`} className="font-bold underline">{company.email}</a>.</p>
          </Block>
        </div>
      </Section>
    </>
  )
}

export function Terms() {
  return (
    <>
      <Seo title="Terms of Service" description={`Terms governing use of the ${company.name} website and quote tools.`} noindex />
      <PageHero compact crumbs={[{ name: 'Terms of Service' }]} title="Terms of Service" text="Last updated: October 2026" />
      <Section className="pt-10!">
        <div className="mx-auto max-w-3xl space-y-8">
          <Block title="Estimates are not quotes">
            <p>Rate estimates, freight class estimates and pallet calculations on this website are provided for planning purposes only and do not constitute a binding offer. Binding rates are confirmed in writing by {company.name} on a rate confirmation.</p>
          </Block>
          <Block title="Services">
            <p>{company.legalName} operates as a licensed property broker arranging transportation by motor carriers. Transportation is subject to our broker-shipper agreement and the carrier's terms and conditions.</p>
          </Block>
          <Block title="Website use">
            <p>You agree not to misuse the website, submit false information, or attempt to interfere with its operation. Content is provided "as is" without warranties of any kind.</p>
          </Block>
          <Block title="Contact">
            <p>Questions about these terms: <a href={`mailto:${company.email}`} className="font-bold underline">{company.email}</a>.</p>
          </Block>
        </div>
      </Section>
    </>
  )
}
