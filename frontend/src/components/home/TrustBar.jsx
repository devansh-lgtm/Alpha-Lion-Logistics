const items = ['Retail & E-commerce', 'Manufacturing', 'Food & Beverage', 'Automotive', 'CPG', 'Building Materials', 'Paper & Packaging', 'Importers & Forwarders', 'Chemicals', 'Pharmaceutical', 'Furniture', 'Electronics']

export function TrustBar() {
  const doubled = [...items, ...items]
  return (
    <section aria-label="Industries we serve" className="border-y border-line bg-cloud py-5">
      <div className="container-x flex flex-col items-center gap-4 sm:flex-row">
        <p className="shrink-0 text-xs font-bold uppercase tracking-wider text-ink-500">Trusted by shippers in</p>
        <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div className="marquee flex w-max gap-10">
            {doubled.map((t, i) => (
              <span key={`${t}-${i}`} className="whitespace-nowrap font-display text-base font-bold text-ink-700">{t}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
