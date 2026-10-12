import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1))
      if (el) {
        // Defer so lazily-rendered sections exist before we scroll to them.
        const t = setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50)
        return () => clearTimeout(t)
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname, hash])
  return null
}
