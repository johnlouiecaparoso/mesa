import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router'
import { Users, CalendarCheck, CheckCircle2 } from 'lucide-react'
import { restaurant } from '../lib/settings'
import { useStore, saveReservation, getReservations, type Reservation } from '../lib/store'
import { Button, Field, inputClass, Eyebrow, Badge } from '../components/ui'

const today = new Date().toISOString().slice(0, 10)

export function Reservations() {
  const nav = useNavigate()
  const { toast } = useStore()
  const [form, setForm] = useState({
    name: '', email: '', phone: '', date: today, time: '', partySize: 2, request: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [confirmed, setConfirmed] = useState<Reservation | null>(null)

  const existing = getReservations()

  // seats already booked per time slot on chosen date
  const seatsByTime = useMemo(() => {
    const map: Record<string, number> = {}
    existing
      .filter((r) => r.date === form.date && r.status !== 'Cancelled')
      .forEach((r) => (map[r.time] = (map[r.time] || 0) + r.partySize))
    return map
  }, [existing, form.date])

  const set = (k: string, v: string | number) => setForm((f) => ({ ...f, [k]: v }))
  const blocked = restaurant.blockedDates.includes(form.date)

  const remainingFor = (time: string) => restaurant.capacity - (seatsByTime[time] || 0)

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    const err: Record<string, string> = {}
    if (form.name.trim().length < 2) err.name = 'Please enter your name'
    if (!form.email.includes('@')) err.email = 'Enter a valid email'
    if (form.phone.replace(/\D/g, '').length < 7) err.phone = 'Enter a valid mobile'
    if (!form.time) err.time = 'Pick a time slot'
    if (form.partySize < 1 || form.partySize > restaurant.maxPartySize) err.partySize = `1–${restaurant.maxPartySize} guests`
    if (blocked) err.date = 'We are closed on this date'
    if (form.time && remainingFor(form.time) < form.partySize) {
      err.time = `Only ${remainingFor(form.time)} seats left at ${form.time}`
    }
    setErrors(err)
    if (Object.keys(err).length) return

    const r: Reservation = {
      id: crypto.randomUUID(),
      number: 'R' + Math.floor(1000 + Math.random() * 8999),
      ...form,
      status: 'Pending',
      createdAt: new Date().toISOString(),
    }
    saveReservation(r)
    setConfirmed(r)
    toast('Reservation request sent!')
  }

  if (confirmed) {
    return (
      <div className="mx-auto max-w-lg px-5 py-24 text-center">
        <CheckCircle2 size={48} className="mx-auto text-clay" />
        <h1 className="mt-4 font-display text-4xl text-ink">Table requested</h1>
        <p className="mt-2 text-ink-soft">
          Reservation <span className="font-mono text-ink">#{confirmed.number}</span> for {confirmed.partySize} on{' '}
          {new Date(confirmed.date).toLocaleDateString('en-PH', { weekday: 'long', month: 'long', day: 'numeric' })} at {confirmed.time}.
        </p>
        <p className="mt-2 text-sm text-ink-soft">We'll confirm by email shortly. Salamat!</p>
        <div className="mt-8 flex justify-center gap-3">
          <Button variant="outline" onClick={() => nav('/account/reservations')}>My reservations</Button>
          <Button onClick={() => setConfirmed(null)}>Book another</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-6xl px-5 py-12 lg:px-8">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr]">
        <div>
          <Eyebrow>Reservations</Eyebrow>
          <h1 className="mt-3 font-display text-5xl text-ink">Save your seat</h1>
          <p className="mt-4 text-ink-soft">
            Tables fill fast on weekends. Reserve ahead and we'll have your spot ready. Walk-ins
            always welcome when there's room.
          </p>
          <div className="mt-8 space-y-4">
            {[
              { icon: Users, t: `Parties up to ${restaurant.maxPartySize}`, d: 'Larger groups? Call us and we\'ll arrange it.' },
              { icon: CalendarCheck, t: `${restaurant.slotMinutes}-minute seatings`, d: 'Plenty of time for a full Filipino spread.' },
            ].map(({ icon: Icon, t, d }) => (
              <div key={t} className="flex gap-3 rounded-lg border border-line bg-card p-4">
                <Icon className="shrink-0 text-clay" />
                <div>
                  <p className="font-medium text-ink">{t}</p>
                  <p className="text-sm text-ink-soft">{d}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-lg border border-line bg-cream-deep/40 p-5">
            <p className="text-sm font-medium text-ink">Opening hours</p>
            <ul className="mt-2 space-y-1 text-sm text-ink-soft">
              {restaurant.hours.map((h) => <li key={h.day}>{h.day}: {h.open}–{h.close}</li>)}
            </ul>
          </div>
        </div>

        <form onSubmit={submit} className="rounded-xl border border-line bg-card p-6 lg:p-8">
          <h2 className="font-display text-2xl text-ink">Booking details</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <Field label="Full name" error={errors.name}>
              <input className={inputClass} value={form.name} onChange={(e) => set('name', e.target.value)} />
            </Field>
            <Field label="Mobile number" error={errors.phone}>
              <input type="tel" className={inputClass} value={form.phone} onChange={(e) => set('phone', e.target.value)} />
            </Field>
            <Field label="Email" error={errors.email}>
              <input type="email" className={inputClass} value={form.email} onChange={(e) => set('email', e.target.value)} />
            </Field>
            <Field label="Party size" error={errors.partySize}>
              <select className={inputClass} value={form.partySize} onChange={(e) => set('partySize', Number(e.target.value))}>
                {Array.from({ length: restaurant.maxPartySize }, (_, i) => i + 1).map((n) => (
                  <option key={n} value={n}>{n} {n === 1 ? 'guest' : 'guests'}</option>
                ))}
              </select>
            </Field>
            <Field label="Date" error={errors.date}>
              <input type="date" min={today} className={inputClass} value={form.date} onChange={(e) => set('date', e.target.value)} />
            </Field>
            <Field label="Time" error={errors.time}>
              <select className={inputClass} value={form.time} onChange={(e) => set('time', e.target.value)}>
                <option value="">Select a slot</option>
                {restaurant.timeSlots.map((t) => {
                  const left = remainingFor(t)
                  return <option key={t} value={t} disabled={left <= 0}>{t}{left <= 8 ? ` · ${left} seats left` : ''}</option>
                })}
              </select>
            </Field>
          </div>
          <Field label="Special request (optional)">
            <textarea rows={3} className={inputClass} value={form.request} onChange={(e) => set('request', e.target.value)} placeholder="Birthday, high chair, dietary needs…" />
          </Field>
          {blocked && <div className="mb-4"><Badge tone="red">We're closed on this date — please pick another.</Badge></div>}
          <Button type="submit" size="lg" className="w-full">Request reservation</Button>
          <p className="mt-3 text-center text-xs text-ink-soft">
            Availability shown reflects live demo bookings against our {restaurant.capacity}-seat capacity.
          </p>
        </form>
      </div>
    </div>
  )
}
