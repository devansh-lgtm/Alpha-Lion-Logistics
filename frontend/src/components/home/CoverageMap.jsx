import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { usOutline, project, pointInPolygon, hubs, lanes } from '../../lib/geo'
import { Section, SectionHeading } from '../ui/Section'
import { Reveal } from '../ui/Reveal'

const typeColor = { Port: '#0D0C22', Rail: '#5f5e73', Hub: '#0D0C22', Border: '#0D0C22', HQ: '#FFDD00' }

export function CoverageMap() {
  const [hover, setHover] = useState(null)
  const [filter, setFilter] = useState('All')

  const outline = useMemo(() => usOutline.map(project), [])
  const dots = useMemo(() => {
    const pts = []
    for (let lon = -125; lon <= -66; lon += 0.85) {
      for (let lat = 24.5; lat <= 49.5; lat += 0.75) {
        if (pointInPolygon([lon, lat], usOutline)) pts.push(project([lon, lat]))
      }
    }
    return pts
  }, [])
  const hubMap = useMemo(() => Object.fromEntries(hubs.map((h) => [h.name, { ...h, xy: project([h.lon, h.lat]) }])), [])
  const types = ['All', 'Port', 'Rail', 'Hub', 'Border']
  const shown = hubs.filter((h) => filter === 'All' || h.type === filter || h.type === 'HQ')

  return (
    <Section id="coverage">
      <div className="grid items-center gap-10 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <SectionHeading
            align="left"
            eyebrow="Nationwide coverage"
            title="Capacity wherever your freight is"
            text="Headquartered in Renton, Washington, in the Seattle–Tacoma corridor, with carrier density at every major port, rail ramp, and distribution hub in the lower 48, plus cross-border lanes to Mexico and Canada."
          />
          <Reveal className="mt-6 flex flex-wrap gap-2">
            {types.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setFilter(t)}
                className={`rounded-full border px-3.5 py-1.5 text-xs font-bold transition ${filter === t ? 'border-ink bg-ink text-white' : 'border-line hover:border-ink'}`}
              >
                {t === 'All' ? 'All hubs' : t === 'Port' ? 'Ports' : t === 'Rail' ? 'Rail ramps' : t === 'Hub' ? 'Distribution hubs' : 'Border'}
              </button>
            ))}
          </Reveal>
          <Reveal className="mt-6 rounded-3xl bg-cloud p-5">
            <p className="text-xs font-bold uppercase tracking-wider text-ink-500">{hover ? hover.type === 'HQ' ? 'Headquarters' : hover.type : 'Hover a hub'}</p>
            <p className="mt-1 font-display text-xl font-extrabold">{hover ? hover.name : 'Explore our network'}</p>
            <p className="mt-1 text-sm text-ink-500">{hover ? 'Daily capacity available on inbound and outbound lanes.' : 'Each dot represents live carrier density in our network.'}</p>
          </Reveal>
        </div>

        <Reveal className="lg:col-span-8">
          <svg viewBox="0 0 600 320" className="w-full" role="img" aria-label="Map of the United States showing Alpha Lion Logistics hubs and lanes">
            <defs>
              <linearGradient id="laneGrad" x1="0" x2="1">
                <stop offset="0" stopColor="#FFDD00" />
                <stop offset="1" stopColor="#0D0C22" />
              </linearGradient>
            </defs>
            <polygon points={outline.map((p) => p.join(',')).join(' ')} fill="#F8F8FA" stroke="#E8E8EE" strokeWidth="1.5" strokeLinejoin="round" />
            {dots.map(([x, y], i) => (
              <circle key={i} cx={x} cy={y} r="1.6" fill="#0D0C22" opacity="0.12" />
            ))}
            {lanes.map(([a, b], i) => {
              const A = hubMap[a]?.xy
              const B = hubMap[b]?.xy
              if (!A || !B) return null
              const mx = (A[0] + B[0]) / 2
              const my = Math.min(A[1], B[1]) - Math.abs(A[0] - B[0]) * 0.18
              const highlighted = hover && (hover.name === a || hover.name === b)
              return (
                <motion.path
                  key={`${a}-${b}`}
                  d={`M ${A[0]} ${A[1]} Q ${mx} ${my} ${B[0]} ${B[1]}`}
                  fill="none"
                  stroke={highlighted ? '#0D0C22' : '#FFDD00'}
                  strokeWidth={highlighted ? 2.5 : 1.5}
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: highlighted ? 1 : 0.9 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.4, delay: 0.2 + i * 0.06, ease: 'easeInOut' }}
                />
              )
            })}
            {shown.map((h) => {
              const [x, y] = hubMap[h.name].xy
              const isHq = h.type === 'HQ'
              const active = hover?.name === h.name
              return (
                <g
                  key={h.name}
                  onMouseEnter={() => setHover(h)}
                  onMouseLeave={() => setHover(null)}
                  onFocus={() => setHover(h)}
                  onBlur={() => setHover(null)}
                  tabIndex={0}
                  role="button"
                  aria-label={`${h.name} (${h.type})`}
                  className="cursor-pointer outline-none"
                >
                  <motion.circle cx={x} cy={y} r={isHq ? 14 : 9} fill={isHq ? '#FFDD00' : '#0D0C22'} opacity="0.15" animate={{ r: isHq ? [14, 20, 14] : active ? 14 : 9 }} transition={{ duration: 2, repeat: isHq ? Infinity : 0 }} />
                  <circle cx={x} cy={y} r={active ? 6 : isHq ? 6 : 4} fill={isHq ? '#FFDD00' : typeColor[h.type]} stroke="#fff" strokeWidth="2" />
                  {active && (
                    <g>
                      <rect x={x - 60} y={y - 34} width="120" height="22" rx="11" fill="#0D0C22" />
                      <text x={x} y={y - 19} textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">{h.name}</text>
                    </g>
                  )}
                </g>
              )
            })}
          </svg>
          <div className="mt-3 flex flex-wrap justify-center gap-5 text-xs font-semibold text-ink-500">
            <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-brand ring-2 ring-brand/40" /> Headquarters</span>
            <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-ink" /> Ports, hubs & borders</span>
            <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-ink-500" /> Rail ramps</span>
            <span className="flex items-center gap-1.5"><span className="h-0.5 w-5 bg-brand" /> High-volume lanes</span>
          </div>
        </Reveal>
      </div>
    </Section>
  )
}
