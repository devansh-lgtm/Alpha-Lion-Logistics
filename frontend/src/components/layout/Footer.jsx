import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin, Clock, Linkedin, Facebook, Instagram, ArrowRight } from 'lucide-react'
import { Logo } from '../ui/Logo'
import { company } from '../../data/company'
import { services } from '../../data/services'

const quick = [
  { label: 'About Us', to: '/about' },
  { label: 'Industries', to: '/industries' },
  { label: 'Carriers', to: '/carriers' },
  { label: 'Resources & Tools', to: '/resources' },
  { label: 'FAQ', to: '/faq' },
  { label: 'Contact', to: '/contact' },
  { label: 'Privacy Policy', to: '/privacy' },
  { label: 'Terms of Service', to: '/terms' },
]

export function Footer() {
  return (
    <footer className="border-t border-line bg-white">
      <div className="container-x">
        <div className="-mb-12 relative z-10 translate-y-0 rounded-3xl bg-ink p-8 text-white shadow-lift sm:p-10 lg:flex lg:items-center lg:justify-between">
          <div>
            <h2 className="text-2xl font-extrabold text-white sm:text-3xl">Have freight that needs to move?</h2>
            <p className="mt-2 text-white/70">Get a competitive quote in minutes. No minimums, no contracts required.</p>
          </div>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row lg:mt-0">
            <Link to="/quote" className="btn-primary">
              Request a Quote <ArrowRight className="h-4 w-4" />
            </Link>
            <a href={company.phoneHref} className="btn border-2 border-white/20 text-white hover:bg-white hover:text-ink">
              <Phone className="h-4 w-4" /> {company.phone}
            </a>
          </div>
        </div>
      </div>

      <div className="bg-cloud pt-24 pb-10">
        <div className="container-x grid gap-10 md:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink-500">
              {company.name} is a US freight brokerage connecting shippers with vetted carrier capacity across all 48 contiguous states. {company.tagline}
            </p>
            <p className="mt-4 text-xs font-semibold text-ink-300">
              {company.mc} · {company.dot}
            </p>
            <div className="mt-5 flex gap-2">
              {[
                [Linkedin, company.social.linkedin, 'LinkedIn'],
                [Facebook, company.social.facebook, 'Facebook'],
                [Instagram, company.social.instagram, 'Instagram'],
              ].map(([Ic, href, label]) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="grid h-10 w-10 place-items-center rounded-full border border-line bg-white transition hover:bg-brand">
                  <Ic className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-3">
            <h3 className="text-sm font-extrabold uppercase tracking-wider">Services</h3>
            <ul className="mt-4 space-y-2.5">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link to={`/services/${s.slug}`} className="text-sm text-ink-500 transition hover:text-ink">
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h3 className="text-sm font-extrabold uppercase tracking-wider">Company</h3>
            <ul className="mt-4 space-y-2.5">
              {quick.map((q) => (
                <li key={q.to}>
                  <Link to={q.to} className="text-sm text-ink-500 transition hover:text-ink">
                    {q.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h3 className="text-sm font-extrabold uppercase tracking-wider">Contact</h3>
            <ul className="mt-4 space-y-3 text-sm text-ink-500">
              <li className="flex gap-3"><Phone className="mt-0.5 h-4 w-4 shrink-0 text-ink" /><a href={company.phoneHref} className="hover:text-ink">{company.phone}</a></li>
              <li className="flex gap-3"><Mail className="mt-0.5 h-4 w-4 shrink-0 text-ink" /><a href={`mailto:${company.email}`} className="hover:text-ink">{company.email}</a></li>
              <li className="flex gap-3"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-ink" /><span>{company.address.street}<br />{company.address.city}, {company.address.state} {company.address.zip}</span></li>
              <li className="flex gap-3"><Clock className="mt-0.5 h-4 w-4 shrink-0 text-ink" /><span>{company.hours}</span></li>
            </ul>
          </div>
        </div>

        <div className="container-x mt-12 flex flex-col items-center justify-between gap-3 border-t border-line pt-6 text-xs text-ink-300 sm:flex-row">
          <p>© {new Date().getFullYear()} {company.legalName}. All rights reserved.</p>
          <p>Licensed and bonded freight broker · Serving shippers nationwide</p>
        </div>
      </div>
    </footer>
  )
}
