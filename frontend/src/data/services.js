export const services = [
  {
    slug: 'ftl-dry-van',
    title: 'FTL / Dry Van',
    short: 'Full truckload capacity for palletized and non‑perishable freight, coast to coast.',
    icon: 'Truck',
    hero: 'Full truckload dry van shipping with vetted carriers and real-time tracking.',
    description:
      'Our full truckload (FTL) dry van service gives your freight a dedicated 53-foot trailer from dock to dock. No shared space, no extra handling, and fewer touchpoints means less risk and faster transit. We source capacity from a network of thousands of vetted carriers across all 48 contiguous states.',
    features: [
      '53′ and 48′ dry vans, plus team drivers for long hauls',
      'Same-day and next-day pickups in major markets',
      'Live GPS tracking and proactive status updates',
      'Drop trailer programs for high-volume shippers',
      'Hazmat-certified carriers on request',
    ],
    equipment: ['53′ Dry Van', '48′ Dry Van', 'Team Drivers', 'Drop Trailer'],
    bestFor: ['Palletized goods', 'Retail & CPG', 'Manufacturing', 'Paper & packaging'],
    faqs: [
      { q: 'How fast can you cover a dry van load?', a: 'In major lanes we routinely cover same-day. Most loads are covered within two hours of tendering.' },
      { q: 'What is the maximum weight for a dry van?', a: 'Standard dry vans carry up to roughly 44,000–45,000 lbs depending on the tractor and axle configuration.' },
    ],
  },
  {
    slug: 'ltl-partial',
    title: 'LTL & Partial',
    short: 'Pay only for the space you use with consolidated and partial truckload options.',
    icon: 'Boxes',
    hero: 'Less-than-truckload and partial shipping that balances cost with transit time.',
    description:
      'When a full trailer is more than you need, our LTL and partial truckload solutions keep costs in line. We compare national and regional LTL carriers for smaller shipments and arrange shared or partial truckloads for freight that is too big for LTL but does not justify a full truck.',
    features: [
      'Instant LTL rate comparison across top carriers',
      'Partial / volume quotes for 6–20 pallets',
      'Fewer terminals and touches than standard LTL on partials',
      'Liftgate, residential, inside delivery and appointment options',
      'Freight class and density guidance to avoid reclass fees',
    ],
    equipment: ['LTL', 'Volume LTL', 'Partial TL', 'Straight Truck'],
    bestFor: ['1–20 pallets', 'E-commerce replenishment', 'Multi-stop distribution', 'Cost-sensitive freight'],
    faqs: [
      { q: 'When should I choose partial over LTL?', a: 'If you are shipping 6+ pallets, over 5,000 lbs, or fragile freight, a partial often costs the same as LTL with far less handling.' },
      { q: 'Do you handle accessorials?', a: 'Yes. We quote liftgate, residential, limited access, and appointment fees upfront so there are no surprises.' },
    ],
  },
  {
    slug: 'drayage',
    title: 'Drayage',
    short: 'Container moves between ports, rail ramps and your warehouse with chassis management.',
    icon: 'Container',
    hero: 'Port and rail drayage that keeps your containers moving and your demurrage at zero.',
    description:
      'Drayage is where delays get expensive. Our drayage team manages container pickups and returns at major US ports and intermodal rail ramps, including chassis sourcing, appointment scheduling, per diem monitoring, and empty returns. We work with TWIC-certified, UIIA-approved carriers.',
    features: [
      'Coverage at LA/Long Beach, Houston, Savannah, NY/NJ, Norfolk, Oakland, Seattle/Tacoma and more',
      'Rail ramp drayage at Chicago, Dallas, Kansas City, Memphis and Atlanta',
      'Chassis sourcing and tri-axle / overweight permits',
      'Demurrage and per diem tracking with daily alerts',
      'Street turns and empty returns coordination',
    ],
    equipment: ['20′ / 40′ / 45′ Containers', 'Tri-Axle Chassis', 'Overweight Permits'],
    bestFor: ['Importers & exporters', 'Freight forwarders', 'Intermodal shippers', 'Retail imports'],
    faqs: [
      { q: 'Can you handle overweight containers?', a: 'Yes. We arrange tri-axle chassis and overweight permits in states that allow them, and transload when they do not.' },
      { q: 'How do you prevent demurrage?', a: 'We monitor last free days daily and prioritize pickup appointments before charges start.' },
    ],
  },
  {
    slug: 'transloading',
    title: 'Transloading',
    short: 'Move freight between containers, trailers and railcars at strategic cross-dock facilities.',
    icon: 'ArrowLeftRight',
    hero: 'Transloading and cross-docking that turns ocean containers into domestic truckloads.',
    description:
      'Transloading lets you shift freight from an ocean container into a 53-foot trailer, or from one mode to another, near the port or rail ramp. That means fewer containers, lower per diem exposure, and the ability to consolidate or split shipments before they head inland.',
    features: [
      'Container-to-trailer and trailer-to-container transfers',
      'Palletizing, shrink-wrapping and labeling',
      'Short-term storage and inventory counts',
      'Consolidation and deconsolidation programs',
      'Facilities near major ports and rail hubs',
    ],
    equipment: ['Cross-Dock Facilities', 'Forklifts & Clamps', 'Short-Term Storage'],
    bestFor: ['Ocean imports', 'Overweight containers', 'Retail distribution', 'Multi-destination freight'],
    faqs: [
      { q: 'Why transload instead of moving the container inland?', a: 'One 53′ trailer holds the contents of up to two 40′ containers, so you cut inland line-haul costs and return containers quickly.' },
    ],
  },
  {
    slug: 'import-export',
    title: 'Import & Export Transportation',
    short: 'Door-to-port and port-to-door moves coordinated with your forwarder and customs broker.',
    icon: 'Globe',
    hero: 'Inland transportation for international freight, coordinated end to end.',
    description:
      'We handle the domestic leg of your international shipments, from the port, airport, or border crossing to your facility and back. Our team coordinates with freight forwarders, customs brokers, and terminals so your cargo clears, loads, and delivers without a gap in communication.',
    features: [
      'Port-to-door and door-to-port trucking',
      'Cross-border US–Mexico and US–Canada coordination',
      'Bonded carriers and in-bond movements',
      'Airport cargo pickup and delivery',
      'Documentation support: BOL, delivery orders, PARS/PAPS',
    ],
    equipment: ['Dry Van', 'Container', 'Flatbed', 'Bonded Carriers'],
    bestFor: ['Importers', 'Exporters', 'Freight forwarders', 'Cross-border manufacturers'],
    faqs: [
      { q: 'Do you handle customs clearance?', a: 'We coordinate with your customs broker and can recommend trusted partners, but we focus on the transportation leg.' },
    ],
  },
  {
    slug: 'expedited-dedicated',
    title: 'Expedited & Dedicated Transportation',
    short: 'Time-critical team service and dedicated capacity for recurring lanes.',
    icon: 'Zap',
    hero: 'When the clock is the customer: expedited freight and dedicated fleets.',
    description:
      'Expedited service puts your shipment on a sprinter van, straight truck, or team-driven tractor the moment it is ready, with direct, non-stop delivery. Dedicated transportation gives you committed trucks and drivers on your recurring lanes with guaranteed capacity and predictable pricing.',
    features: [
      'Sprinter vans, straight trucks and team tractors on standby',
      'Direct, non-stop expedited service with live updates',
      'Dedicated contract carriage with fixed weekly capacity',
      'Plant shutdown, line-down and recovery freight',
      'Weekend and holiday coverage',
    ],
    equipment: ['Sprinter Van', 'Straight Truck', 'Team Tractor', 'Dedicated Fleet'],
    bestFor: ['Automotive', 'Aerospace', 'Medical', 'Just-in-time manufacturing'],
    faqs: [
      { q: 'How quickly can expedited freight be picked up?', a: 'In most metro areas we can have a vehicle at your dock within 1–3 hours.' },
      { q: 'What is a dedicated lane?', a: 'A set of trucks and drivers assigned exclusively to your freight on a fixed schedule, priced per week or per mile.' },
    ],
  },
  {
    slug: 'spot-overflow',
    title: 'Spot & Overflow Capacity',
    short: 'Surge, seasonal and overflow freight covered fast when your routing guide fails.',
    icon: 'TrendingUp',
    hero: 'Spot market capacity in minutes when your primary carriers fall through.',
    description:
      'When volumes spike, carriers reject tenders, or a shipment falls out of the routing guide, we are the call. Our spot desk sources capacity in real time across our carrier network and load board partnerships, giving you competitive rates without sacrificing service.',
    features: [
      'Real-time spot quotes, typically within 15 minutes',
      'Coverage for seasonal peaks and promotional surges',
      'Routing guide backup and tender rejection recovery',
      'Transparent market-based pricing',
      'Single point of contact from quote to delivery',
    ],
    equipment: ['Dry Van', 'Reefer', 'Flatbed', 'Power Only'],
    bestFor: ['Peak season', 'Tender rejections', 'New lanes', 'Project freight'],
    faqs: [
      { q: 'How fast will I get a spot quote?', a: 'Most quotes come back within 15 minutes during business hours and within the hour after hours.' },
    ],
  },
]

export const getService = (slug) => services.find((s) => s.slug === slug)
