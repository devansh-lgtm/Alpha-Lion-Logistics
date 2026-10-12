import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Calculator, MapPin } from 'lucide-react'
import { stateOptions, estimateLane, rateBands } from '../../lib/geo'

const equipmentOptions = Object.keys(rateBands)

export function QuoteEstimator({ compact = false }) {
  const [origin, setOrigin] = useState('CA')
  const [dest, setDest] = useState('TX')
  const [equipment, setEquipment] = useState('Dry Van')
  const result = useMemo(() => estimateLane(origin, dest, equipment), [origin, dest, equipment])

  const query = new URLSearchParams({ origin, destination: dest, equipment }).toString()

  return (
    <div className="relative rounded-4xl border border-line bg-white p-6 shadow-lift sm:p-7">
      <div className="absolute -top-3 right-6 rounded-full bg-ink px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-brand">Instant estimate</div>
      <div className="flex items-center gap-3">
        <span className="grid h-11 w-11 place-items-center rounded-2xl bg-brand"><Calculator className="h-5 w-5" /></span>
        <div>
          <h2 className="font-display text-lg font-extrabold leading-tight">Rate Estimator</h2>
          <p className="text-xs text-ink-500">Ballpark pricing in seconds. Final quote in minutes.</p>
        </div>
      </div>

      <div className="mt-6 grid gap-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="label" htmlFor="est-origin">Origin</label>
            <div className="relative">
              <MapPin className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-300" />
              <select id="est-origin" value={origin} onChange={(e) => setOrigin(e.target.value)} className="pl-9">
                {stateOptions.map((s) => <option key={s.code} value={s.code}>{s.name}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="label" htmlFor="est-dest">Destination</label>
            <div className="relative">
              <MapPin className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-300" />
              <select id="est-dest" value={dest} onChange={(e) => setDest(e.target.value)} className="pl-9">
                {stateOptions.map((s) => <option key={s.code} value={s.code}>{s.name}</option>)}
              </select>
            </div>
          </div>
        </div>

        <div>
          <span className="label">Equipment</span>
          <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Equipment type">
            {equipmentOptions.map((eq) => (
              <button
                key={eq}
                type="button"
                role="radio"
                aria-checked={equipment === eq}
                onClick={() => setEquipment(eq)}
                className={`rounded-full border px-3 py-1.5 text-xs font-bold transition ${
                  equipment === eq ? 'border-ink bg-ink text-white' : 'border-line bg-white text-ink-700 hover:border-ink'
                }`}
              >
                {eq}
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {result && (
            <motion.div
              key={`${origin}-${dest}-${equipment}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="rounded-3xl bg-cloud p-5"
            >
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-ink-500">Estimated rate</p>
                  <p className="mt-1 font-display text-3xl font-extrabold">
                    ${result.low.toLocaleString()} – ${result.high.toLocaleString()}
                  </p>
                </div>
                <div className="text-right text-sm text-ink-500">
                  <p><span className="font-bold text-ink">{result.miles.toLocaleString()}</span> mi</p>
                  <p><span className="font-bold text-ink">{result.transitDays}</span> day{result.transitDays > 1 ? 's' : ''} transit</p>
                </div>
              </div>
              <p className="mt-3 text-[11px] leading-snug text-ink-300">
                Estimates use national average lane rates and are not a binding quote. Fuel, accessorials, and market conditions vary.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <Link to={`/quote?${query}`} className="btn-primary w-full py-3.5">
          Get my exact quote <ArrowRight className="h-4 w-4" />
        </Link>
        {!compact && <p className="text-center text-xs text-ink-300">No account needed · Response in ~15 min</p>}
      </div>
    </div>
  )
}
