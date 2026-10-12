# Alpha Lion Logistics – Frontend

React 19 + Vite 7 + Tailwind CSS v4 + Framer Motion. White, Buy-Me-a-Coffee-inspired yellow/black theme.

## Run

```bash
npm install
npm run dev        # http://localhost:5173 (proxies /api → http://localhost:5000)
npm run build      # regenerates public/sitemap.xml, outputs dist/
```

Start the backend (`../backend`, `npm run dev`) so the quote and contact forms deliver email.

## Pages (10 + legal)

| Route              | Page                                                                 |
| ------------------ | -------------------------------------------------------------------- |
| `/`                | Home: hero + instant rate estimator, services, how it works, coverage map, testimonials |
| `/services`        | Services overview with interactive tabs                              |
| `/services/:slug`  | 7 service detail pages (FTL, LTL, Drayage, Transloading, Import/Export, Expedited, Spot) |
| `/industries`      | Industries served                                                    |
| `/about`           | Company story, timeline, values                                      |
| `/carriers`        | Carrier recruitment                                                  |
| `/resources`       | Rate estimator, freight class calculator, pallet calculator, guides  |
| `/faq`             | Searchable FAQ with FAQPage schema                                   |
| `/quote`           | Request a Quote (emails the company inbox)                           |
| `/contact`         | Contact form + map                                                   |
| `/privacy`, `/terms` | Legal                                                              |

## SEO

- Per-page `<title>`, meta description, canonical, Open Graph and Twitter tags (React 19 head hoisting, see `src/lib/seo.jsx`)
- JSON-LD: Organization, LocalBusiness, Service, FAQPage, BreadcrumbList
- `public/robots.txt`, generated `public/sitemap.xml`, web manifest
- Semantic landmarks, skip link, alt/aria labels, reduced-motion support

## Customize

Company name, phone, email, address, MC/DOT and socials live in `src/data/company.js`. Service copy is in `src/data/services.js`.
Replace `public/og-image.png` with a 1200×630 image for social sharing.
