import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Scale } from 'lucide-react'

// NMFC density-based class guide (lbs per cubic foot).
const classes = [
  [50, 50], [35, 55], [30, 60], [22.5, 65], [15, 70], [13.5, 77.5], [12, 85], [10.5, 92.5], [9, 100], [8, 110], [7, 125], [6, 150], [5, 175], [4, 200], [3, 250], [2, 300], [1, 400], [0, 500],
]

export function FreightClassCalculator() {
  const [f, setF] = useState({ length: 48, width: 40, height: 48, weight: 1200, count: 1 })
  const set = (k) => (e) => setF((s) => ({ ...s, [k]: Number(e.target.value) }))

  const result = useMemo(() => {
    const cubicFt = ((f.length * f.width * f.height) / 1728) * f.count
    if (!cubicFt || !f.weight) return null
    const density = (f.weight * f.count) / cubicFt
    const cls = classes.find(([min]) => density >= min)?.[1] ?? 500
    return { cubicFt, density, cls }
  }, [f])

  const fields = [
    ['length', 'Length (in)'],
    ['width', 'Width (in)'],
    ['height', 'Height (in)'],
    ['weight', 'Weight per unit (lbs)'],
    ['count', 'Units'],
  ]

  return (
    <div className="card">
      <div className="flex items-center gap-3">
        <span className="grid h-11 w-11 place-items-center rounded-2xl bg-brand"><Scale className="h-5 w-5" /></span>
        <div>
          <h3 className="text-lg font-extrabold">Freight Class Calculator</h3>
          <p className="text-xs text-ink-500">Estimate NMFC class from density for LTL quotes.</p>
        </div>
      </div>
      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {fields.map(([k, label]) => (
          <div key={k}>
            <label className="label" htmlFor={`fc-${k}`}>{label}</label>
            <input id={`fc-${k}`} type="number" min="0" value={f[k]} onChange={set(k)} />
          </div>
        ))}
      </div>
      {result && (
        <motion.div key={result.cls} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="mt-6 grid grid-cols-3 gap-3 rounded-3xl bg-cloud p-5 text-center">
          <div><p className="text-xs font-semibold text-ink-500">Volume</p><p className="font-display text-xl font-extrabold">{result.cubicFt.toFixed(1)} ft³</p></div>
          <div><p className="text-xs font-semibold text-ink-500">Density</p><p className="font-display text-xl font-extrabold">{result.density.toFixed(1)} lb/ft³</p></div>
          <div><p className="text-xs font-semibold text-ink-500">Est. class</p><p className="font-display text-xl font-extrabold text-ink"><span className="rounded-full bg-brand px-3 py-0.5">{result.cls}</span></p></div>
        </motion.div>
      )}
      <p className="mt-3 text-[11px] text-ink-300">Density-based estimate only. Some commodities carry a fixed NMFC class regardless of density.</p>
    </div>
  )
}
