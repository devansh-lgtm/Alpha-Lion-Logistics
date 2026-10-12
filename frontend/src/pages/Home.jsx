import { Seo, organizationLd, localBusinessLd } from '../lib/seo'
import { Hero } from '../components/home/Hero'
import { TrustBar } from '../components/home/TrustBar'
import { ServicesGrid } from '../components/home/ServicesGrid'
import { HowItWorks } from '../components/home/HowItWorks'
import { Stats } from '../components/home/Stats'
import { CoverageMap } from '../components/home/CoverageMap'
import { WhyUs } from '../components/home/WhyUs'
import { Testimonials } from '../components/home/Testimonials'
import { CtaBand } from '../components/home/CtaBand'

export default function Home() {
  return (
    <>
      <Seo
        path="/"
        description="Alpha Lion Logistics is a US freight brokerage offering FTL dry van, LTL & partial, drayage, transloading, import/export, expedited and dedicated trucking across all 48 states. Request a quote in minutes."
        jsonLd={[organizationLd, localBusinessLd]}
      />
      <Hero />
      <TrustBar />
      <ServicesGrid limit={5} />
      <Stats />
      <HowItWorks />
      <CoverageMap />
      <WhyUs />
      <Testimonials />
      <CtaBand />
    </>
  )
}
