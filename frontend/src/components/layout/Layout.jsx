import { Suspense } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Header } from './Header'
import { Footer } from './Footer'
import { StickyCta } from './StickyCta'
import { ScrollToTop } from './ScrollToTop'
import { pageTransition } from '../../lib/motion'

function Fallback() {
  return (
    <div className="container-x flex min-h-[50vh] items-center justify-center" aria-busy="true">
      <span className="h-10 w-10 animate-spin rounded-full border-4 border-line border-t-brand" />
    </div>
  )
}

export function Layout() {
  const { pathname } = useLocation()
  return (
    <div className="flex min-h-screen flex-col">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-brand focus:px-4 focus:py-2 focus:font-bold">
        Skip to content
      </a>
      <ScrollToTop />
      <Header />
      <main id="main" className="flex-1">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={pathname} {...pageTransition}>
            <Suspense fallback={<Fallback />}>
              <Outlet />
            </Suspense>
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
      <StickyCta />
    </div>
  )
}
