import { writeFileSync } from 'node:fs'

const SITE = 'https://www.alphalionlogistics.com'
const today = new Date().toISOString().slice(0, 10)
const services = ['ftl-dry-van', 'ltl-partial', 'drayage', 'transloading', 'import-export', 'expedited-dedicated', 'spot-overflow']

const routes = [
  ['/', '1.0', 'weekly'],
  ['/services', '0.9', 'monthly'],
  ...services.map((s) => [`/services/${s}`, '0.8', 'monthly']),
  ['/industries', '0.7', 'monthly'],
  ['/about', '0.6', 'yearly'],
  ['/carriers', '0.6', 'monthly'],
  ['/resources', '0.7', 'monthly'],
  ['/faq', '0.6', 'monthly'],
  ['/quote', '0.9', 'monthly'],
  ['/contact', '0.8', 'monthly'],
]

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map(([p, pr, cf]) => `  <url>\n    <loc>${SITE}${p}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${cf}</changefreq>\n    <priority>${pr}</priority>\n  </url>`).join('\n')}
</urlset>
`
writeFileSync(new URL('../public/sitemap.xml', import.meta.url), xml)
console.log(`sitemap.xml written with ${routes.length} URLs`)
