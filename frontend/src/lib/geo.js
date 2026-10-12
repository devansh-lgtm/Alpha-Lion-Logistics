// Approximate centroids (lon, lat) for the contiguous US + DC, used by the rate estimator.
export const states = {
  AL: ['Alabama', -86.8, 32.8], AZ: ['Arizona', -111.7, 34.3], AR: ['Arkansas', -92.4, 34.9],
  CA: ['California', -119.6, 36.8], CO: ['Colorado', -105.5, 39.0], CT: ['Connecticut', -72.7, 41.6],
  DE: ['Delaware', -75.5, 39.0], DC: ['Washington DC', -77.0, 38.9], FL: ['Florida', -81.7, 28.1],
  GA: ['Georgia', -83.4, 32.7], ID: ['Idaho', -114.6, 44.4], IL: ['Illinois', -89.2, 40.0],
  IN: ['Indiana', -86.3, 39.9], IA: ['Iowa', -93.5, 42.1], KS: ['Kansas', -98.4, 38.5],
  KY: ['Kentucky', -85.3, 37.5], LA: ['Louisiana', -92.0, 31.1], ME: ['Maine', -69.2, 45.4],
  MD: ['Maryland', -76.8, 39.0], MA: ['Massachusetts', -71.8, 42.3], MI: ['Michigan', -84.5, 44.3],
  MN: ['Minnesota', -94.3, 46.3], MS: ['Mississippi', -89.7, 32.7], MO: ['Missouri', -92.5, 38.5],
  MT: ['Montana', -109.6, 47.0], NE: ['Nebraska', -99.8, 41.5], NV: ['Nevada', -116.6, 39.3],
  NH: ['New Hampshire', -71.6, 43.7], NJ: ['New Jersey', -74.5, 40.1], NM: ['New Mexico', -106.1, 34.4],
  NY: ['New York', -75.5, 42.9], NC: ['North Carolina', -79.4, 35.6], ND: ['North Dakota', -100.5, 47.5],
  OH: ['Ohio', -82.8, 40.4], OK: ['Oklahoma', -97.5, 35.6], OR: ['Oregon', -120.6, 43.9],
  PA: ['Pennsylvania', -77.8, 40.9], RI: ['Rhode Island', -71.5, 41.7], SC: ['South Carolina', -80.9, 33.9],
  SD: ['South Dakota', -100.2, 44.4], TN: ['Tennessee', -86.3, 35.9], TX: ['Texas', -99.3, 31.5],
  UT: ['Utah', -111.7, 39.3], VT: ['Vermont', -72.7, 44.1], VA: ['Virginia', -78.8, 37.5],
  WA: ['Washington', -120.4, 47.4], WV: ['West Virginia', -80.6, 38.6], WI: ['Wisconsin', -89.8, 44.6],
  WY: ['Wyoming', -107.5, 43.0],
}

export const stateOptions = Object.entries(states)
  .map(([code, [name]]) => ({ code, name }))
  .sort((a, b) => a.name.localeCompare(b.name))

const toRad = (d) => (d * Math.PI) / 180

export function haversineMiles([lon1, lat1], [lon2, lat2]) {
  const R = 3958.8
  const dLat = toRad(lat2 - lat1)
  const dLon = toRad(lon2 - lon1)
  const a =
    Math.sin(dLat / 2) ** 2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2
  return 2 * R * Math.asin(Math.sqrt(a))
}

// Indicative national average rate bands ($/mile, all-in). Replace with live pricing when available.
export const rateBands = {
  'Dry Van': { low: 2.1, high: 2.7, minimum: 450 },
  Reefer: { low: 2.6, high: 3.3, minimum: 550 },
  Flatbed: { low: 2.5, high: 3.2, minimum: 550 },
  'Step Deck': { low: 2.7, high: 3.5, minimum: 600 },
  'Power Only': { low: 1.8, high: 2.3, minimum: 400 },
  'Sprinter / Cargo Van': { low: 1.4, high: 1.9, minimum: 300 },
  'Box Truck': { low: 1.9, high: 2.5, minimum: 350 },
}

export function estimateLane(originCode, destCode, equipment) {
  const o = states[originCode]
  const d = states[destCode]
  if (!o || !d) return null
  const straight = haversineMiles([o[1], o[2]], [d[1], d[2]])
  // Road distance is typically ~20% longer than great-circle; intrastate moves get a floor.
  const miles = Math.max(120, Math.round(straight * 1.21))
  const band = rateBands[equipment] || rateBands['Dry Van']
  // Short hauls carry higher $/mile; apply a gentle curve.
  const shortHaulFactor = miles < 300 ? 1.35 : miles < 600 ? 1.15 : 1
  const low = Math.max(band.minimum, Math.round((miles * band.low * shortHaulFactor) / 10) * 10)
  const high = Math.max(band.minimum + 150, Math.round((miles * band.high * shortHaulFactor) / 10) * 10)
  const transitDays = Math.max(1, Math.ceil(miles / 550))
  return { miles, low, high, transitDays }
}

// --- Coverage map geometry -------------------------------------------------
// Simplified outline of the contiguous US as [lon, lat] pairs.
export const usOutline = [
  [-123.0, 49.0], [-95.2, 49.0], [-95.1, 49.4], [-94.6, 48.7], [-92.0, 48.3], [-89.5, 48.0], [-88.3, 48.2],
  [-86.5, 47.6], [-84.8, 46.6], [-84.3, 46.2], [-83.6, 45.9], [-82.5, 45.3], [-82.1, 43.5], [-82.4, 42.9],
  [-83.1, 42.1], [-82.5, 41.7], [-80.5, 42.3], [-79.0, 42.8], [-79.0, 43.3], [-76.8, 43.6], [-76.2, 44.2],
  [-74.8, 45.0], [-71.5, 45.0], [-70.0, 46.7], [-69.2, 47.4], [-67.8, 47.1], [-67.8, 45.7], [-67.0, 44.8],
  [-68.5, 44.3], [-70.2, 43.6], [-70.6, 42.9], [-70.0, 41.7], [-71.4, 41.4], [-72.9, 41.2], [-74.0, 40.6],
  [-74.1, 39.5], [-75.0, 38.9], [-75.5, 38.0], [-76.0, 37.0], [-75.6, 35.8], [-77.9, 34.0], [-79.0, 33.5],
  [-80.9, 32.0], [-81.4, 30.4], [-80.4, 27.9], [-80.1, 25.8], [-81.1, 25.2], [-82.0, 26.5], [-82.8, 27.8],
  [-83.0, 29.2], [-84.3, 30.0], [-85.6, 30.2], [-87.5, 30.3], [-89.5, 30.2], [-90.1, 29.2], [-91.5, 29.5],
  [-93.5, 29.8], [-94.8, 29.3], [-96.5, 28.4], [-97.2, 27.5], [-97.2, 25.9], [-99.0, 26.4], [-100.0, 28.0],
  [-101.4, 29.8], [-103.0, 29.0], [-104.5, 29.6], [-106.5, 31.8], [-108.2, 31.8], [-111.0, 31.3],
  [-114.8, 32.5], [-117.1, 32.5], [-118.5, 34.0], [-120.6, 34.6], [-121.9, 36.6], [-122.5, 37.8],
  [-123.8, 39.5], [-124.2, 41.8], [-124.0, 43.5], [-123.9, 46.2], [-124.7, 48.4],
]

export const project = ([lon, lat]) => [(lon + 125.5) * 10, (49.8 - lat) * 12.4]

export function pointInPolygon([x, y], poly) {
  let inside = false
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, yi] = poly[i]
    const [xj, yj] = poly[j]
    const intersect = yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi
    if (intersect) inside = !inside
  }
  return inside
}

export const hubs = [
  { name: 'Los Angeles / Long Beach', type: 'Port', lon: -118.2, lat: 34.0 },
  { name: 'Seattle / Tacoma', type: 'HQ', lon: -122.3, lat: 47.6 },
  { name: 'Oakland', type: 'Port', lon: -122.3, lat: 37.8 },
  { name: 'Phoenix', type: 'Hub', lon: -112.1, lat: 33.4 },
  { name: 'Salt Lake City', type: 'Hub', lon: -111.9, lat: 40.8 },
  { name: 'Denver', type: 'Hub', lon: -104.9, lat: 39.7 },
  { name: 'Dallas – Fort Worth', type: 'Hub', lon: -96.8, lat: 32.8 },
  { name: 'Houston', type: 'Port', lon: -95.4, lat: 29.8 },
  { name: 'Laredo', type: 'Border', lon: -99.5, lat: 27.5 },
  { name: 'Kansas City', type: 'Rail', lon: -94.6, lat: 39.1 },
  { name: 'Minneapolis', type: 'Hub', lon: -93.3, lat: 45.0 },
  { name: 'Chicago', type: 'Rail', lon: -87.6, lat: 41.9 },
  { name: 'Memphis', type: 'Rail', lon: -90.0, lat: 35.1 },
  { name: 'Atlanta', type: 'Hub', lon: -84.4, lat: 33.7 },
  { name: 'Savannah', type: 'Port', lon: -81.1, lat: 32.1 },
  { name: 'Miami', type: 'Port', lon: -80.2, lat: 25.8 },
  { name: 'Charlotte', type: 'Hub', lon: -80.8, lat: 35.2 },
  { name: 'Columbus', type: 'Hub', lon: -83.0, lat: 40.0 },
  { name: 'Norfolk', type: 'Port', lon: -76.3, lat: 36.9 },
  { name: 'New York / New Jersey', type: 'Port', lon: -74.1, lat: 40.7 },
  { name: 'Boston', type: 'Hub', lon: -71.1, lat: 42.4 },
]

export const lanes = [
  ['Los Angeles / Long Beach', 'Dallas – Fort Worth'],
  ['Los Angeles / Long Beach', 'Chicago'],
  ['Dallas – Fort Worth', 'Chicago'],
  ['Dallas – Fort Worth', 'Atlanta'],
  ['Dallas – Fort Worth', 'Laredo'],
  ['Houston', 'Memphis'],
  ['Chicago', 'New York / New Jersey'],
  ['Atlanta', 'New York / New Jersey'],
  ['Savannah', 'Atlanta'],
  ['Seattle / Tacoma', 'Denver'],
  ['Seattle / Tacoma', 'Los Angeles / Long Beach'],
  ['Seattle / Tacoma', 'Salt Lake City'],
  ['Denver', 'Kansas City'],
  ['Kansas City', 'Columbus'],
  ['Memphis', 'Charlotte'],
  ['Miami', 'Atlanta'],
  ['Norfolk', 'Columbus'],
  ['Oakland', 'Salt Lake City'],
  ['Phoenix', 'Dallas – Fort Worth'],
  ['Minneapolis', 'Chicago'],
  ['New York / New Jersey', 'Boston'],
]
