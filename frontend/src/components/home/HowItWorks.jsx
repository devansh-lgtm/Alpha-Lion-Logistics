import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FileText, Search, Radar, PackageCheck } from 'lucide-react'
import { steps } from '../../data/testimonials'
import { Section, SectionHeading } from '../ui/Section'
import { Reveal } from '../ui/Reveal'

const icons = [FileText, Search, Radar, PackageCheck]

export function HowItWorks() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return
    const t = setInterval(() => setActive((a) => (a + 1) % steps.length), 3500)
    return () => clearInterval(t)
  }, [paused])

  const Ic = icons[active]

  return (
    <Section tone="cloud" id="how-it-works">
      <SectionHeading eyebrow="How it works" title="From quote to delivery in four simple steps" text="We keep the process transparent so you always know where your freight is and what it costs." />
      <div className="mt-12 grid gap-8 lg:grid-cols-2 lg:gap-14" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
        <Reveal className="flex flex-col gap-2">
          {steps.map((s, i) => {
            const on = i === active
            const StepIc = icons[i]
            return (
              <button
                key={s.title}
                type="button"
                onClick={() => setActive(i)}
                className={`relative flex items-start gap-4 rounded-3xl border p-5 text-left transition ${on ? 'border-ink bg-white shadow-soft' : 'border-transparent hover:bg-white/60'}`}
                aria-current={on}
              >
                <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-2xl font-display text-lg font-extrabold transition ${on ? 'bg-brand' : 'bg-white text-ink-500'}`}>
                  {i + 1}
                </span>
                <span>
                  <span className="flex items-center gap-2 font-display text-lg font-extrabold">{s.title} <StepIc className="h-4 w-4 text-ink-300" /></span>
                  <span className="mt-1 block text-sm leading-relaxed text-ink-500">{s.text}</span>
                </span>
                {on && !paused && (
                  <motion.span
                    key={`bar-${i}`}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 3.5, ease: 'linear' }}
                    className="absolute bottom-0 left-5 right-5 h-0.5 origin-left rounded-full bg-brand"
                  />
                )}
              </button>
            )
          })}
        </Reveal>

        <Reveal className="relative min-h-[320px] overflow-hidden rounded-4xl bg-ink p-8 text-white">
          <div className="dot-grid absolute inset-0 opacity-20" aria-hidden="true" />
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.98 }}
              transition={{ duration: 0.35 }}
              className="relative flex h-full flex-col justify-between"
            >
              <span className="grid h-16 w-16 place-items-center rounded-3xl bg-brand text-ink"><Ic className="h-8 w-8" /></span>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-brand">Step {active + 1} of {steps.length}</p>
                <h3 className="mt-2 text-3xl font-extrabold text-white">{steps[active].title}</h3>
                <p className="mt-3 max-w-md text-white/70">{steps[active].text}</p>
              </div>
            </motion.div>
          </AnimatePresence>
          <motion.div
            aria-hidden="true"
            className="absolute -bottom-10 -right-10 h-48 w-48 rounded-full bg-brand/30 blur-3xl"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 6, repeat: Infinity }}
          />
        </Reveal>
      </div>
    </Section>
  )
}
