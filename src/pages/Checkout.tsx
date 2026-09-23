import { useState } from 'react'
import { useNavigate, Link } from 'react-router'
import { getItem } from '../data/menu'
import { peso } from '../lib/format'
import { useStore, saveOrder, summarizeLine, lineTotalLabel, type Order } from '../lib/store'
import { restaurant } from '../lib/settings'
import { activePromotion } from '../data/menu'
import { Button, Field, inputClass, Eyebrow, Badge } from '../components/ui'

const methods = [
  { id: 'pickup', name: 'Pay at pickup', note: 'Cash or card at the counter' },
  { id: 'gcash', name: 'GCash', note: 'Simulated payment' },
  { id: 'maya', name: 'Maya', note: 'Simulated payment' },
]

const today = new Date().toISOString().slice(0, 10)

export function Checkout() {
  const { cart, totals, clearCart, promoApplied, applyPromo, clearPromo } = useStore()
  const nav = useNavigate()
  const [form, setForm] = useState({
    name: '', email: '', phone: '', pickupDate: today, pickupTime: restaurant.timeSlots[6], notes: '',
  })
  const [method, setMethod] = useState('pickup')
  const [promoInput, setPromoInput] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitting, setSubmitting] = useState(false)

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }))

  if (cart.length === 0 && !submitting) {
    return (
      <div className="mx-auto max-w-md px-5 py-28 text-center">
        <h1 className="font-display text-3xl text-ink">Nothing to check out</h1>
        <Link to="/menu" className="mt-4 inline-block text-clay hover:underline">Back to menu</Link>
      </div>
    )
  }

  const validate = () => {
    const e: Record<string, string> = {}
    if (form.name.trim().length < 2) e.name = 'Please enter your name'
    if (!form.email.includes('@')) e.email = 'Enter a valid email'
    if (form.phone.replace(/\D/g, '').length < 7) e.phone = 'Enter a valid mobile number'
    if (!form.pickupDate) e.pickupDate = 'Choose a pickup date'
    if (!form.pickupTime) e.pickupTime = 'Choose a pickup time'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const submit = (ev: React.FormEvent) => {
    ev.preventDefault()
    if (!validate()) return
    setSubmitting(true)
    const num = 'M' + Math.floor(10000 + Math.random() * 89999)
    const order: Order = {
      id: crypto.randomUUID(),
      number: num,
      ...form,
      method: methods.find((m) => m.id === method)!.name,
      lines: cart,
      total: totals.total,
      status: 'Pending',
      createdAt: new Date().toISOString(),
    }
    saveOrder(order)
    clearCart()
    clearPromo()
    nav(`/order/${order.id}`)
  }

  return (
    <div className="mx-auto max-w-6xl px-5 py-12 lg:px-8">
      <Eyebrow>Checkout</Eyebrow>
      <h1 className="mt-3 font-display text-4xl text-ink">Almost at the table</h1>

      <form onSubmit={submit} className="mt-8 grid gap-10 lg:grid-cols-[1.4fr_1fr]">
        <div className="space-y-8">
          <section className="rounded-lg border border-line bg-card p-6">
            <h2 className="font-display text-xl text-ink">Contact details</h2>
            <p className="mt-1 text-sm text-ink-soft">No account needed — guest checkout.</p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <Field label="Full name" error={errors.name}>
                <input className={inputClass} value={form.name} onChange={(e) => set('name', e.target.value)} />
              </Field>
              <Field label="Email" error={errors.email}>
                <input type="email" className={inputClass} value={form.email} onChange={(e) => set('email', e.target.value)} />
              </Field>
              <Field label="Mobile number" error={errors.phone}>
                <input type="tel" placeholder="+63" className={inputClass} value={form.phone} onChange={(e) => set('phone', e.target.value)} />
              </Field>
            </div>
          </section>

          <section className="rounded-lg border border-line bg-card p-6">
            <h2 className="font-display text-xl text-ink">Pickup schedule</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <Field label="Pickup date" error={errors.pickupDate}>
                <input type="date" min={today} className={inputClass} value={form.pickupDate} onChange={(e) => set('pickupDate', e.target.value)} />
              </Field>
              <Field label="Pickup time" error={errors.pickupTime}>
                <select className={inputClass} value={form.pickupTime} onChange={(e) => set('pickupTime', e.target.value)}>
                  {restaurant.timeSlots.map((t) => <option key={t}>{t}</option>)}
                </select>
              </Field>
            </div>
            <Field label="Order notes (optional)">
              <textarea rows={2} className={inputClass} value={form.notes} onChange={(e) => set('notes', e.target.value)} placeholder="Allergies, packing requests, etc." />
            </Field>
          </section>

          <section className="rounded-lg border border-line bg-card p-6">
            <h2 className="font-display text-xl text-ink">Payment</h2>
            <p className="mt-1 text-sm text-ink-soft">All payment methods are <strong>simulated</strong> for this demo.</p>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {methods.map((m) => (
                <button
                  type="button"
                  key={m.id}
                  onClick={() => setMethod(m.id)}
                  className={`rounded-md border px-4 py-3 text-left transition ${
                    method === m.id ? 'border-clay bg-clay/[0.06]' : 'border-line hover:border-ink/30'
                  }`}
                >
                  <span className="block font-medium text-ink">{m.name}</span>
                  <span className="text-xs text-ink-soft">{m.note}</span>
                </button>
              ))}
            </div>
          </section>
        </div>

        <aside className="h-fit rounded-lg border border-line bg-card p-6 lg:sticky lg:top-24">
          <h2 className="font-display text-xl text-ink">Summary</h2>
          <ul className="mt-4 space-y-3 border-b border-line pb-4">
            {cart.map((l) => {
              const item = getItem(l.itemId)
              return (
                <li key={l.lineId} className="flex justify-between gap-3 text-sm">
                  <span className="text-ink">{l.qty}× {item?.name}<br /><span className="text-xs text-ink-soft">{summarizeLine(l)}</span></span>
                  <span className="whitespace-nowrap font-mono text-ink-soft">{lineTotalLabel(l)}</span>
                </li>
              )
            })}
          </ul>

          {!promoApplied ? (
            <div className="mt-4 flex gap-2">
              <input value={promoInput} onChange={(e) => setPromoInput(e.target.value)} placeholder="Promo code" className={`${inputClass} py-2 text-sm`} />
              <Button type="button" variant="outline" size="sm" onClick={() => applyPromo(promoInput)}>Apply</Button>
            </div>
          ) : (
            <div className="mt-4"><Badge tone="green">Promo {activePromotion.code} applied</Badge></div>
          )}

          <dl className="mt-4 space-y-2.5 text-sm">
            <div className="flex justify-between"><dt className="text-ink-soft">Subtotal</dt><dd className="font-mono">{peso(totals.subtotal)}</dd></div>
            {promoApplied && <div className="flex justify-between"><dt className="text-ink-soft">Discount</dt><dd className="font-mono text-clay-deep">−{peso(totals.discount)}</dd></div>}
            <div className="flex justify-between"><dt className="text-ink-soft">Service fee</dt><dd className="font-mono">{peso(totals.serviceFee)}</dd></div>
            <div className="flex justify-between"><dt className="text-ink-soft">VAT</dt><dd className="font-mono">{peso(totals.tax)}</dd></div>
            <div className="flex justify-between border-t border-line pt-3 text-base"><dt className="font-medium text-ink">Total</dt><dd className="font-mono font-medium text-ink">{peso(totals.total)}</dd></div>
          </dl>

          <Button type="submit" size="lg" className="mt-6 w-full" disabled={submitting}>
            {submitting ? 'Placing order…' : `Place order · ${peso(totals.total)}`}
          </Button>
        </aside>
      </form>
    </div>
  )
}
