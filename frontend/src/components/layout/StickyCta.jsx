import { Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { MessageSquareText, Phone } from 'lucide-react'
import { company } from '../../data/company'

export function StickyCta() {
  const { pathname } = useLocation()
  const [visible, setVisible] = useState(false)
  const hidden = pathname === '/quote' || pathname === '/contact'

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && !hidden && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 24 }}
          className="fixed bottom-4 left-1/2 z-40 flex -translate-x-1/2 items-center gap-2 rounded-full border border-line bg-white/95 p-1.5 shadow-lift backdrop-blur sm:left-auto sm:right-6 sm:translate-x-0"
        >
          <a href={company.phoneHref} className="btn-ghost h-11 px-4 text-sm" aria-label="Call us">
            <Phone className="h-4 w-4" /> <span className="hidden sm:inline">Call</span>
          </a>
          <Link to="/quote" className="btn-primary h-11 px-5 text-sm">
            <MessageSquareText className="h-4 w-4" /> Request a Quote
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
