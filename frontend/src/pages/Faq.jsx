import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, ArrowRight } from 'lucide-react'
import { Seo, breadcrumbLd, faqLd } from '../lib/seo'
import { faqs } from '../data/faqs'
import { PageHero } from '../components/layout/PageHero'
import { Section } from '../components/ui/Section'
import { Reveal } from '../components/ui/Reveal'
import { Accordion } from '../components/ui/Accordion'

export default function Faq() {
  const [q, setQ] = useState('')
  const all = useMemo(() => faqs.flatMap((c) => c.items), [])
  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase()
    if (!term) return faqs
    return faqs
      .map((c) => ({ ...c, items: c.items.filter((it) => `${it.q} ${it.a}`.toLowerCase().includes(term)) }))
      .filter((c) => c.items.length)
  }, [q])

  return (
    <>
      <Seo
        title="Freight Shipping FAQ"
        description="Answers to common questions about working with Alpha Lion Logistics: quotes, equipment, tracking, insurance, claims, hazmat and coverage."
        jsonLd={[faqLd(all), breadcrumbLd([{ name: 'Home', path: '/' }, { name: 'FAQ', path: '/faq' }])]}
      />
      <PageHero compact crumbs={[{ name: 'FAQ' }]} eyebrow="FAQ" title="Questions shippers ask us" text="Can't find what you need? Call us or send a message and a real person will answer.">
        <div className="relative max-w-lg">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-300" />
          <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search questions…" className="pl-12" aria-label="Search FAQs" />
        </div>
      </PageHero>
      <Section tone="cloud" className="pt-10!">
        <div className="mx-auto max-w-3xl space-y-10">
          {filtered.length === 0 && <p className="text-center text-ink-500">No results for “{q}”. Try a different term or <Link to="/contact" className="font-bold text-ink underline">contact us</Link>.</p>}
          {filtered.map((c) => (
            <Reveal key={c.category}>
              <h2 className="mb-4 text-xl font-extrabold">{c.category}</h2>
              <Accordion items={c.items} />
            </Reveal>
          ))}
          <Reveal className="rounded-4xl bg-ink p-8 text-center text-white">
            <h2 className="text-2xl font-extrabold text-white">Still have questions?</h2>
            <p className="mt-2 text-white/70">Our team is happy to walk you through how we would handle your freight.</p>
            <Link to="/contact" className="btn-primary mt-6">Contact us <ArrowRight className="h-4 w-4" /></Link>
          </Reveal>
        </div>
      </Section>
    </>
  )
}
