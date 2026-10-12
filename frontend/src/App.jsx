import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Layout } from './components/layout/Layout'
import Home from './pages/Home'

const Services = lazy(() => import('./pages/Services'))
const ServiceDetail = lazy(() => import('./pages/ServiceDetail'))
const Industries = lazy(() => import('./pages/Industries'))
const About = lazy(() => import('./pages/About'))
const Carriers = lazy(() => import('./pages/Carriers'))
const Quote = lazy(() => import('./pages/Quote'))
const Contact = lazy(() => import('./pages/Contact'))
const Faq = lazy(() => import('./pages/Faq'))
const Resources = lazy(() => import('./pages/Resources'))
const NotFound = lazy(() => import('./pages/NotFound'))

const Privacy = lazy(() => import('./pages/Legal').then((m) => ({ default: m.Privacy })))
const Terms = lazy(() => import('./pages/Legal').then((m) => ({ default: m.Terms })))

function Fallback() {
  return (
    <div className="container-x flex min-h-[50vh] items-center justify-center" aria-busy="true">
      <span className="h-10 w-10 animate-spin rounded-full border-4 border-line border-t-brand" />
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Fallback />}>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="services" element={<Services />} />
            <Route path="services/:slug" element={<ServiceDetail />} />
            <Route path="industries" element={<Industries />} />
            <Route path="about" element={<About />} />
            <Route path="carriers" element={<Carriers />} />
            <Route path="quote" element={<Quote />} />
            <Route path="contact" element={<Contact />} />
            <Route path="faq" element={<Faq />} />
            <Route path="resources" element={<Resources />} />
            <Route path="privacy" element={<Privacy />} />
            <Route path="terms" element={<Terms />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
