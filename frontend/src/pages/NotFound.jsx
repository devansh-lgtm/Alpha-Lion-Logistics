import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Home } from 'lucide-react'
import { Seo } from '../lib/seo'

export default function NotFound() {
  return (
    <>
      <Seo title="Page Not Found" description="The page you were looking for does not exist." noindex />
      <section className="container-x flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
        <motion.p initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="font-display text-8xl font-extrabold text-brand">404</motion.p>
        <h1 className="mt-4 text-3xl font-extrabold">This lane doesn't exist</h1>
        <p className="mt-2 max-w-md text-ink-500">The page you're looking for was moved or never existed. Let's get you back on route.</p>
        <div className="mt-8 flex gap-3">
          <Link to="/" className="btn-dark"><Home className="h-4 w-4" /> Home</Link>
          <Link to="/quote" className="btn-primary">Request a Quote <ArrowRight className="h-4 w-4" /></Link>
        </div>
      </section>
    </>
  )
}
