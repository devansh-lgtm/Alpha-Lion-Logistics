import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2, Loader2, Send, AlertCircle } from 'lucide-react'
import { Field } from '../ui/Field'
import { postForm } from '../../lib/api'

const schema = z.object({
  name: z.string().trim().min(2, 'Please enter your name'),
  company: z.string().trim().min(1, 'Please enter your company'),
  email: z.string().trim().email('Enter a valid email address'),
  phone: z.string().trim().min(7, 'Enter a valid phone number').regex(/^[+()\-.\s\d]+$/, 'Enter a valid phone number'),
  subject: z.string().trim().max(160).optional(),
  message: z.string().trim().min(5, 'Please enter a message'),
  website: z.string().max(0).optional(),
})

export function ContactForm() {
  const [status, setStatus] = useState({ state: 'idle' })
  const { register, handleSubmit, reset, setError, formState: { errors, isSubmitting } } = useForm({ resolver: zodResolver(schema) })

  const onSubmit = async (values) => {
    setStatus({ state: 'idle' })
    try {
      await postForm('contact', values)
      setStatus({ state: 'success' })
      reset()
    } catch (err) {
      if (err.errors) Object.entries(err.errors).forEach(([k, m]) => setError(k, { message: m }))
      setStatus({ state: 'error', message: err.message })
    }
  }

  if (status.state === 'success') {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="rounded-4xl border border-line bg-white p-10 text-center shadow-soft">
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-brand"><CheckCircle2 className="h-8 w-8" /></span>
        <h3 className="mt-5 text-2xl font-extrabold">Message sent!</h3>
        <p className="mx-auto mt-2 max-w-md text-ink-500">Thanks for reaching out. We will get back to you shortly.</p>
        <button type="button" onClick={() => setStatus({ state: 'idle' })} className="btn-outline mt-6">Send another message</button>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="rounded-4xl border border-line bg-white p-6 shadow-soft sm:p-8">
      <input type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" {...register('website')} />
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Full name" required error={errors.name?.message}><input placeholder="Jane Smith" autoComplete="name" {...register('name')} /></Field>
        <Field label="Company" required error={errors.company?.message}><input placeholder="Acme Manufacturing" autoComplete="organization" {...register('company')} /></Field>
        <Field label="Email" required error={errors.email?.message}><input type="email" placeholder="jane@acme.com" autoComplete="email" {...register('email')} /></Field>
        <Field label="Phone" required error={errors.phone?.message}><input type="tel" placeholder="(555) 123-4567" autoComplete="tel" {...register('phone')} /></Field>
        <Field label="Subject" className="sm:col-span-2" error={errors.subject?.message}><input placeholder="How can we help?" {...register('subject')} /></Field>
        <Field label="Message" required className="sm:col-span-2" error={errors.message?.message}><textarea rows={5} placeholder="Tell us about your freight or your question…" {...register('message')} /></Field>
      </div>
      <AnimatePresence>
        {status.state === 'error' && (
          <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} role="alert" className="mt-6 flex items-start gap-2 rounded-2xl bg-red-50 p-4 text-sm text-red-700">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" /> {status.message}
          </motion.div>
        )}
      </AnimatePresence>
      <button type="submit" disabled={isSubmitting} className="btn-primary mt-8 w-full px-8 py-4 text-base disabled:opacity-60 sm:w-auto">
        {isSubmitting ? <><Loader2 className="h-5 w-5 animate-spin" /> Sending…</> : <><Send className="h-5 w-5" /> Send Message</>}
      </button>
    </form>
  )
}
