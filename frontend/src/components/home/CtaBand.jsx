import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Phone } from 'lucide-react'
import { company } from '../../data/company'
import { Reveal } from '../ui/Reveal'

export function CtaBand({ title = 'Ready to move your freight?', text = 'Tell us about your shipment and get a competitive quote back in minutes.' }) {
  return (
    <section className="relative overflow-hidden bg-brand py-16 sm:py-20">
      <motion.div
        aria-hidden="true"
        className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-white/40 blur-3xl"
        animate={{ scale: [1, 1.3, 1] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <Reveal className="container-x relative flex flex-col items-center text-center">
        <h2 className="max-w-2xl text-3xl font-extrabold sm:text-4xl lg:text-5xl">{title}</h2>
        <p className="mt-4 max-w-xl text-ink-700 sm:text-lg">{text}</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link to="/quote" className="btn-dark px-7 py-4 text-base">Request a Quote <ArrowRight className="h-5 w-5" /></Link>
          <a href={company.phoneHref} className="btn border-2 border-ink bg-transparent px-7 py-4 text-base text-ink hover:bg-ink hover:text-white"><Phone className="h-5 w-5" /> {company.phone}</a>
        </div>
      </Reveal>
    </section>
  )
}
