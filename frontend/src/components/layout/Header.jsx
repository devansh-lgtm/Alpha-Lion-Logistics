import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion'
import { Menu, X, Phone, ArrowRight } from 'lucide-react'
import { Logo } from '../ui/Logo'
import { company, nav } from '../../data/company'

export function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 })

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => (document.body.style.overflow = '')
  }, [open])

  return (
    <>
      <motion.div style={{ scaleX: progress }} className="fixed left-0 top-0 z-[60] h-1 w-full origin-left bg-brand" aria-hidden="true" />
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          scrolled ? 'border-b border-line bg-white/90 shadow-soft backdrop-blur-md' : 'bg-white'
        }`}
      >
        <div className="container-x flex h-[72px] items-center justify-between">
          <Logo />

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
            {nav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `relative rounded-full px-3.5 py-2 text-sm font-semibold transition hover:bg-cloud ${isActive ? 'text-ink' : 'text-ink-500 hover:text-ink'}`
                }
              >
                {({ isActive }) => (
                  <>
                    {item.label}
                    {isActive && (
                      <motion.span layoutId="nav-pill" className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-brand" transition={{ type: 'spring', stiffness: 350, damping: 30 }} />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="hidden items-center gap-2 lg:flex">
            <a href={company.phoneHref} className="btn-ghost text-sm">
              <Phone className="h-4 w-4" /> {company.phone}
            </a>
            <Link to="/quote" className="btn-primary">
              Request a Quote <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="grid h-11 w-11 place-items-center rounded-full hover:bg-cloud lg:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-white pt-[72px] lg:hidden"
          >
            <motion.nav
              initial="hidden"
              animate="show"
              variants={{ show: { transition: { staggerChildren: 0.05 } } }}
              className="container-x flex h-full flex-col gap-1 overflow-y-auto py-6"
              aria-label="Mobile"
            >
              {nav.map((item) => (
                <motion.div key={item.to} variants={{ hidden: { opacity: 0, x: -12 }, show: { opacity: 1, x: 0 } }}>
                  <NavLink
                    to={item.to}
                    end={item.to === '/'}
                    className={({ isActive }) =>
                      `block rounded-2xl px-4 py-3.5 text-lg font-bold ${isActive ? 'bg-brand-50 text-ink' : 'text-ink-700 hover:bg-cloud'}`
                    }
                  >
                    {item.label}
                  </NavLink>
                </motion.div>
              ))}
              <motion.div variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }} className="mt-4 flex flex-col gap-3">
                <Link to="/quote" className="btn-primary w-full">
                  Request a Quote <ArrowRight className="h-4 w-4" />
                </Link>
                <a href={company.phoneHref} className="btn-outline w-full">
                  <Phone className="h-4 w-4" /> {company.phone}
                </a>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
