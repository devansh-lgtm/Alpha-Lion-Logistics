import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useSearchParams } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2, Loader2, Send, AlertCircle } from 'lucide-react'
import { Field } from '../ui/Field'
import { postForm } from '../../lib/api'
import { states } from '../../lib/geo'
import { company } from '../../data/company'

export const EQUIPMENT = ['Dry Van', 'Reefer', 'Flatbed', 'Step Deck', 'Power Only', 'Container / Drayage', 'Box Truck', 'Sprinter / Cargo Van', 'Other']
export const SERVICES = ['FTL / Dry Van', 'LTL & Partial', 'Drayage', 'Transloading', 'Import & Export Transportation', 'Expedited & Dedicated', 'Spot & Overflow Capacity', 'Not sure yet']

const schema = z.object({
  name: z.string().trim().min(2, 'Please enter your name'),
  company: z.string().trim().min(1, 'Please enter your company'),
  email: z.string().trim().email('Enter a valid email address'),
  phone: z.string().trim().min(7, 'Enter a valid phone number').regex(/^[+()\-.\s\d]+$/, 'Enter a valid phone number'),
  origin: z.string().trim().min(2, 'Where does the freight ship from?'),
  destination: z.string().trim().min(2, 'Where is it going?'),
  equipment: z.enum(EQUIPMENT, { message: 'Choose an equipment type' }),
  service: z.enum(SERVICES).optional(),
  pickupDate: z.string().optional(),
  weight: z.string().trim().max(40).optional(),
  commodity: z.string().trim().max(160).optional(),
  details: z.string().trim().min(5, 'Add a few details: pallet count, dimensions, hours, special handling'),
  website: z.string().max(0).optional(),
})

const stateName = (code) => (code && states[code] ? `${states[code][0]}, ${code}` : '')

export function QuoteForm({ compact = false }) {
  const [params] = useSearchParams()
  const [status, setStatus] = useState({ state: 'idle' })
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      origin: stateName(params.get('origin')),
      destination: stateName(params.get('destination')),
      equipment: EQUIPMENT.includes(params.get('equipment')) ? params.get('equipment') : 'Dry Van',
      service: SERVICES.includes(params.get('service')) ? params.get('service') : 'Not sure yet',
    },
  })

  const onSubmit = async (values) => {
    setStatus({ state: 'idle' })
    try {
      await postForm('quote', values)
      setStatus({ state: 'success' })
      reset()
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (err) {
      if (err.errors) Object.entries(err.errors).forEach(([k, m]) => setError(k, { message: m }))
      setStatus({ state: 'error', message: err.message })
    }
  }

  if (status.state === 'success') {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="rounded-4xl border border-line bg-white p-10 text-center shadow-soft">
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-brand"><CheckCircle2 className="h-8 w-8" /></span>
        <h3 className="mt-5 text-2xl font-extrabold">Quote request received!</h3>
        <p className="mx-auto mt-2 max-w-md text-ink-500">Thanks. A member of our team is reviewing your lane now and will reach out shortly, usually within 15–30 minutes during business hours.</p>
        <p className="mt-4 text-sm text-ink-500">Need it faster? Call <a href={company.phoneHref} className="font-bold text-ink">{company.phone}</a>.</p>
        <button type="button" onClick={() => setStatus({ state: 'idle' })} className="btn-outline mt-6">Submit another request</button>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className={`rounded-4xl border border-line bg-white shadow-soft ${compact ? 'p-6' : 'p-6 sm:p-8'}`}>
      <input type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" {...register('website')} />

      <fieldset className="grid gap-4 sm:grid-cols-2">
        <legend className="mb-3 text-sm font-extrabold uppercase tracking-wider text-ink-500">Your details</legend>
        <Field label="Full name" required error={errors.name?.message}><input placeholder="Jane Smith" autoComplete="name" {...register('name')} /></Field>
        <Field label="Company" required error={errors.company?.message}><input placeholder="Acme Manufacturing" autoComplete="organization" {...register('company')} /></Field>
        <Field label="Email" required error={errors.email?.message}><input type="email" placeholder="jane@acme.com" autoComplete="email" {...register('email')} /></Field>
        <Field label="Phone" required error={errors.phone?.message}><input type="tel" placeholder="(555) 123-4567" autoComplete="tel" {...register('phone')} /></Field>
      </fieldset>

      <fieldset className="mt-8 grid gap-4 sm:grid-cols-2">
        <legend className="mb-3 text-sm font-extrabold uppercase tracking-wider text-ink-500">Shipment</legend>
        <Field label="Origin" required error={errors.origin?.message} hint="City, State or ZIP"><input placeholder="Los Angeles, CA 90001" {...register('origin')} /></Field>
        <Field label="Destination" required error={errors.destination?.message} hint="City, State or ZIP"><input placeholder="Seattle, WA 98101" {...register('destination')} /></Field>
        <Field label="Equipment" required error={errors.equipment?.message}>
          <select {...register('equipment')}>{EQUIPMENT.map((e) => <option key={e}>{e}</option>)}</select>
        </Field>
        <Field label="Service" error={errors.service?.message}>
          <select {...register('service')}>{SERVICES.map((s) => <option key={s}>{s}</option>)}</select>
        </Field>
        <Field label="Pickup date" error={errors.pickupDate?.message}><input type="date" {...register('pickupDate')} /></Field>
        <Field label="Weight" error={errors.weight?.message}><input placeholder="e.g. 38,000 lbs" {...register('weight')} /></Field>
        <Field label="Commodity" className="sm:col-span-2" error={errors.commodity?.message}><input placeholder="e.g. Palletized paper goods" {...register('commodity')} /></Field>
        <Field label="Shipment details" required className="sm:col-span-2" error={errors.details?.message}>
          <textarea rows={4} placeholder="Pallet count, dimensions, dock hours, appointment needs, hazmat, temperature, accessorials…" {...register('details')} />
        </Field>
      </fieldset>

      <AnimatePresence>
        {status.state === 'error' && (
          <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} role="alert" className="mt-6 flex items-start gap-2 rounded-2xl bg-red-50 p-4 text-sm text-red-700">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" /> {status.message}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-ink-300">By submitting you agree to be contacted about your shipment. We never share your information.</p>
        <button type="submit" disabled={isSubmitting} className="btn-primary w-full px-8 py-4 text-base disabled:opacity-60 sm:w-auto">
          {isSubmitting ? <><Loader2 className="h-5 w-5 animate-spin" /> Sending…</> : <><Send className="h-5 w-5" /> Request a Quote</>}
        </button>
      </div>
    </form>
  )
}
