import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Plus } from 'lucide-react'

export function Accordion({ items, className = '' }) {
  const [open, setOpen] = useState(0)
  return (
    <div className={`divide-y divide-line rounded-3xl border border-line bg-white ${className}`}>
      {items.map((item, i) => {
        const isOpen = open === i
        return (
          <div key={item.q}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? -1 : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left sm:px-6"
            >
              <span className="font-display text-base font-bold sm:text-lg">{item.q}</span>
              <motion.span
                animate={{ rotate: isOpen ? 45 : 0, backgroundColor: isOpen ? '#FFDD00' : '#F8F8FA' }}
                className="grid h-9 w-9 shrink-0 place-items-center rounded-full"
              >
                <Plus className="h-4 w-4" />
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="px-5 pb-6 text-ink-500 leading-relaxed sm:px-6">{item.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}
