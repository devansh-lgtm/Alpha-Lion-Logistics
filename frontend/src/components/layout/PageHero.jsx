import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'
import { fadeUp, stagger } from '../../lib/motion'

export function PageHero({ eyebrow, title, text, crumbs = [], children, compact = false }) {
  return (
    <section className={`relative overflow-hidden border-b border-line bg-white ${compact ? 'py-12 sm:py-16' : 'py-16 sm:py-24'}`}>
      <div className="dot-grid absolute inset-0 opacity-70" aria-hidden="true" />
      <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-brand/30 blur-3xl" aria-hidden="true" />
      <motion.div variants={stagger(0.08)} initial="hidden" animate="show" className="container-x relative">
        {crumbs.length > 0 && (
          <motion.nav variants={fadeUp} aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-1 text-xs font-semibold text-ink-500">
            <Link to="/" className="hover:text-ink">Home</Link>
            {crumbs.map((c, i) => (
              <span key={c.path || c.name} className="flex items-center gap-1">
                <ChevronRight className="h-3 w-3" />
                {i === crumbs.length - 1 || !c.path ? <span className="text-ink">{c.name}</span> : <Link to={c.path} className="hover:text-ink">{c.name}</Link>}
              </span>
            ))}
          </motion.nav>
        )}
        {eyebrow && (
          <motion.span variants={fadeUp} className="eyebrow">
            {eyebrow}
          </motion.span>
        )}
        <motion.h1 variants={fadeUp} className="mt-4 max-w-4xl text-4xl font-extrabold sm:text-5xl lg:text-6xl lg:leading-[1.05]">
          {title}
        </motion.h1>
        {text && (
          <motion.p variants={fadeUp} className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-500">
            {text}
          </motion.p>
        )}
        {children && (
          <motion.div variants={fadeUp} className="mt-8">
            {children}
          </motion.div>
        )}
      </motion.div>
    </section>
  )
}
