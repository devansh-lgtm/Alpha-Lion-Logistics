import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react'
import { testimonials } from '../../data/testimonials'
import { Section, SectionHeading } from '../ui/Section'
import { Reveal } from '../ui/Reveal'

export function Testimonials() {
  const [[index, dir], setIndex] = useState([0, 1])
  const go = (d) => setIndex(([i]) => [(i + d + testimonials.length) % testimonials.length, d])

  useEffect(() => {
    const t = setInterval(() => go(1), 6000)
    return () => clearInterval(t)
  }, [])

  const t = testimonials[index]

  return (
    <Section tone="cloud">
      <SectionHeading eyebrow="Shipper stories" title="Why shippers stay with Alpha Lion" />
      <Reveal className="relative mx-auto mt-12 max-w-3xl">
        <div className="relative overflow-hidden rounded-4xl border border-line bg-white p-8 shadow-soft sm:p-12">
          <Quote className="absolute right-8 top-8 h-16 w-16 text-brand/70" aria-hidden="true" />
          <AnimatePresence mode="wait" custom={dir}>
            <motion.figure
              key={index}
              custom={dir}
              initial={{ opacity: 0, x: dir * 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: dir * -40 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <div className="flex gap-1" aria-label={`${t.rating} out of 5 stars`}>
                {Array.from({ length: t.rating }).map((_, i) => <Star key={i} className="h-4 w-4 fill-brand text-brand" />)}
              </div>
              <blockquote className="mt-5 font-display text-xl font-bold leading-snug sm:text-2xl">“{t.quote}”</blockquote>
              <figcaption className="mt-6 text-sm">
                <span className="font-bold">{t.name}</span>
                <span className="text-ink-500"> · {t.company}</span>
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>
        <div className="mt-6 flex items-center justify-center gap-3">
          <button type="button" onClick={() => go(-1)} aria-label="Previous testimonial" className="grid h-11 w-11 place-items-center rounded-full border border-line bg-white transition hover:bg-ink hover:text-white"><ChevronLeft className="h-5 w-5" /></button>
          <div className="flex gap-1.5">
            {testimonials.map((_, i) => (
              <button key={i} type="button" aria-label={`Go to testimonial ${i + 1}`} onClick={() => setIndex([i, i > index ? 1 : -1])} className={`h-2 rounded-full transition-all ${i === index ? 'w-6 bg-ink' : 'w-2 bg-ink-300'}`} />
            ))}
          </div>
          <button type="button" onClick={() => go(1)} aria-label="Next testimonial" className="grid h-11 w-11 place-items-center rounded-full border border-line bg-white transition hover:bg-ink hover:text-white"><ChevronRight className="h-5 w-5" /></button>
        </div>
      </Reveal>
    </Section>
  )
}
