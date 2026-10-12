import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { LayoutGrid } from 'lucide-react'

const trailers = {
  "53' Dry Van": { length: 636, width: 100, maxWeight: 45000 },
  "48' Dry Van": { length: 576, width: 100, maxWeight: 45000 },
  "53' Reefer": { length: 630, width: 98, maxWeight: 43500 },
  "40' Container": { length: 474, width: 92, maxWeight: 44000 },
  "20' Container": { length: 232, width: 92, maxWeight: 44000 },
  '26\' Box Truck': { length: 312, width: 96, maxWeight: 10000 },
}

export function PalletCalculator() {
  const [trailer, setTrailer] = useState("53' Dry Van")
  const [p, setP] = useState({ length: 48, width: 40, weight: 1500, stackable: false })
  const t = trailers[trailer]

  const result = useMemo(() => {
    const fitA = Math.floor(t.length / p.length) * Math.floor(t.width / p.width)
    const fitB = Math.floor(t.length / p.width) * Math.floor(t.width / p.length)
    const floor = Math.max(fitA, fitB)
    const pallets = p.stackable ? floor * 2 : floor
    const byWeight = p.weight ? Math.floor(t.maxWeight / p.weight) : pallets
    const max = Math.min(pallets, byWeight)
    const limit = byWeight < pallets ? 'weight' : 'floor space'
    return { floor, pallets, byWeight, max, limit }
  }, [t, p])

  return (
    <div className="card">
      <div className="flex items-center gap-3">
        <span className="grid h-11 w-11 place-items-center rounded-2xl bg-brand"><LayoutGrid className="h-5 w-5" /></span>
        <div>
          <h3 className="text-lg font-extrabold">Pallet & Trailer Fit</h3>
          <p className="text-xs text-ink-500">How many pallets fit, and whether weight or space limits you.</p>
        </div>
      </div>
      <div className="mt-6 grid grid-cols-2 gap-3">
        <div className="col-span-2">
          <label className="label" htmlFor="pc-trailer">Equipment</label>
          <select id="pc-trailer" value={trailer} onChange={(e) => setTrailer(e.target.value)}>
            {Object.keys(trailers).map((k) => <option key={k}>{k}</option>)}
          </select>
        </div>
        <div><label className="label" htmlFor="pc-l">Pallet length (in)</label><input id="pc-l" type="number" min="1" value={p.length} onChange={(e) => setP({ ...p, length: Number(e.target.value) || 1 })} /></div>
        <div><label className="label" htmlFor="pc-w">Pallet width (in)</label><input id="pc-w" type="number" min="1" value={p.width} onChange={(e) => setP({ ...p, width: Number(e.target.value) || 1 })} /></div>
        <div><label className="label" htmlFor="pc-wt">Weight per pallet (lbs)</label><input id="pc-wt" type="number" min="0" value={p.weight} onChange={(e) => setP({ ...p, weight: Number(e.target.value) })} /></div>
        <label className="flex cursor-pointer items-center gap-3 self-end rounded-xl border border-line px-4 py-3">
          <input type="checkbox" className="h-5 w-5 rounded accent-ink" checked={p.stackable} onChange={(e) => setP({ ...p, stackable: e.target.checked })} />
          <span className="text-sm font-semibold">Stackable (2 high)</span>
        </label>
      </div>
      <motion.div key={result.max} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="mt-6 flex items-center justify-between gap-4 rounded-3xl bg-cloud p-5">
        <div>
          <p className="text-xs font-semibold text-ink-500">Max pallets</p>
          <p className="font-display text-4xl font-extrabold">{result.max}</p>
        </div>
        <div className="text-right text-xs text-ink-500">
          <p>Floor positions: <b className="text-ink">{result.floor}</b>{p.stackable && ' × 2'}</p>
          <p>Weight allows: <b className="text-ink">{result.byWeight}</b></p>
          <p className="mt-1 font-semibold text-ink">Limited by {result.limit}</p>
        </div>
      </motion.div>
    </div>
  )
}
