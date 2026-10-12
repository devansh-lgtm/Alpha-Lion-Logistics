import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { company } from '../data/company'

const SITE = company.url

/**
 * Deterministic <head> management for a client-rendered SPA: updates the title and
 * upserts meta/link tags in place (the static defaults in index.html are overwritten,
 * so crawlers that execute JS and social scrapers see the page-specific values).
 * JSON-LD structured data is injected as a single <script type="application/ld+json">.
 */
function upsert(selector, create, attrs) {
  let el = document.head.querySelector(selector)
  if (!el) {
    el = create()
    document.head.appendChild(el)
  }
  Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v))
  return el
}

const meta = (key, attr, content) =>
  upsert(`meta[${attr}="${key}"]`, () => document.createElement('meta'), { [attr]: key, content })

export function Seo({ title, description, path, image, type = 'website', jsonLd, noindex = false }) {
  const location = useLocation()
  const canonical = `${SITE}${path ?? location.pathname}`
  const fullTitle = title ? `${title} | ${company.name}` : `${company.name} | Freight Brokerage & Trucking Services USA`
  const ogImage = image || `${SITE}/og-image.png`
  const ld = jsonLd ? JSON.stringify(Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : ''

  useEffect(() => {
    document.title = fullTitle
    meta('description', 'name', description)
    meta('robots', 'name', noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large')
    meta('og:title', 'property', fullTitle)
    meta('og:description', 'property', description)
    meta('og:url', 'property', canonical)
    meta('og:type', 'property', type)
    meta('og:image', 'property', ogImage)
    meta('twitter:title', 'name', fullTitle)
    meta('twitter:description', 'name', description)
    meta('twitter:image', 'name', ogImage)
    upsert('link[rel="canonical"]', () => document.createElement('link'), { rel: 'canonical', href: canonical })
  }, [fullTitle, description, canonical, type, ogImage, noindex])

  useEffect(() => {
    const id = 'ld-json-page'
    document.getElementById(id)?.remove()
    if (!ld) return
    const el = document.createElement('script')
    el.type = 'application/ld+json'
    el.id = id
    el.text = ld
    document.head.appendChild(el)
    return () => el.remove()
  }, [ld])

  return null
}

export const organizationLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SITE}/#organization`,
  name: company.name,
  legalName: company.legalName,
  url: SITE,
  logo: `${SITE}/favicon.svg`,
  email: company.email,
  telephone: company.phone,
  foundingDate: company.founded,
  address: {
    '@type': 'PostalAddress',
    streetAddress: company.address.street,
    addressLocality: company.address.city,
    addressRegion: company.address.state,
    postalCode: company.address.zip,
    addressCountry: company.address.country,
  },
  sameAs: Object.values(company.social),
  contactPoint: [
    {
      '@type': 'ContactPoint',
      telephone: company.phone,
      contactType: 'sales',
      areaServed: 'US',
      availableLanguage: ['English', 'Spanish'],
    },
  ],
}

export const localBusinessLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': `${SITE}/#localbusiness`,
  name: company.name,
  image: `${SITE}/og-image.png`,
  url: SITE,
  telephone: company.phone,
  email: company.email,
  priceRange: '$$',
  address: organizationLd.address,
  areaServed: { '@type': 'Country', name: 'United States' },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '07:00',
      closes: '19:00',
    },
  ],
}

export const breadcrumbLd = (items) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((it, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: it.name,
    item: `${SITE}${it.path}`,
  })),
})

export const serviceLd = (service) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: service.title,
  serviceType: service.title,
  description: service.short,
  url: `${SITE}/services/${service.slug}`,
  provider: { '@id': `${SITE}/#organization` },
  areaServed: { '@type': 'Country', name: 'United States' },
})

export const faqLd = (items) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: items.map(({ q, a }) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: a },
  })),
})
