export function Field({ label, error, children, required, hint, className = '' }) {
  return (
    <div className={className}>
      <label className="label">
        {label} {required && <span className="text-brand-700">*</span>}
      </label>
      {children}
      {hint && !error && <p className="mt-1 text-xs text-ink-300">{hint}</p>}
      {error && <p className="error-text" role="alert">{error}</p>}
    </div>
  )
}
