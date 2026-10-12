import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Phone, ShieldCheck, Clock, Truck } from 'lucide-react'
import { fadeUp, stagger } from '../../lib/motion'
import { company } from '../../data/company'
import { QuoteEstimator } from './QuoteEstimator'

const bullets = [
  { icon: Clock, text: 'Quotes in ~15 minutes' },
  { icon: ShieldCheck, text: 'Vetted & insured carriers' },
  { icon: Truck, text: 'All 48 states · Cross-border' },
]

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="dot-grid absolute inset-0" aria-hidden="true" />
      <motion.div
        aria-hidden="true"
        className="absolute -left-40 top-10 h-[28rem] w-[28rem] rounded-full bg-brand/40 blur-3xl"
        animate={{ x: [0, 30, 0], y: [0, 20, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        aria-hidden="true"
        className="absolute -right-32 bottom-0 h-[22rem] w-[22rem] rounded-full bg-brand/25 blur-3xl"
        animate={{ x: [0, -25, 0], y: [0, -15, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="container-x relative grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-12 lg:py-28">
        <motion.div variants={stagger(0.1)} initial="hidden" animate="show" className="lg:col-span-7">
          <motion.span variants={fadeUp} className="eyebrow">
            <span className="h-2 w-2 rounded-full bg-ink" /> US Freight Brokerage · Est. {company.founded}
          </motion.span>
          <motion.h1 variants={fadeUp} className="mt-5 text-4xl font-extrabold leading-[1.05] sm:text-5xl lg:text-[4.25rem]">
            Freight that moves <span className="highlight">on time</span>, every time.
          </motion.h1>
          <motion.p variants={fadeUp} className="mt-6 max-w-xl text-lg leading-relaxed text-ink-500 sm:text-xl">
            {company.name} connects shippers with reliable truckload, LTL, drayage and expedited capacity across the United States. One call, one contact, and your freight is covered.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link to="/quote" className="btn-primary px-7 py-4 text-base">
              Request a Quote <ArrowRight className="h-5 w-5" />
            </Link>
            <a href={company.phoneHref} className="btn-outline px-7 py-4 text-base">
              <Phone className="h-5 w-5" /> {company.phone}
            </a>
          </motion.div>
          <motion.ul variants={fadeUp} className="mt-10 flex flex-wrap gap-x-7 gap-y-3 text-sm font-semibold text-ink-700">
            {bullets.map(({ icon: Ic, text }) => (
              <li key={text} className="flex items-center gap-2">
                <span className="grid h-7 w-7 place-items-center rounded-full bg-brand"><Ic className="h-3.5 w-3.5" /></span>
                {text}
              </li>
            ))}
          </motion.ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30, rotate: -1 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-5"
        >
          <QuoteEstimator />
        </motion.div>
      </div>
    </section>
  )
}
