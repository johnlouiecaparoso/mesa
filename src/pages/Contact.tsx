import { useState } from 'react'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import { restaurant } from '../lib/settings'
import { useStore } from '../lib/store'
import { Button, Field, inputClass, Eyebrow } from '../components/ui'

export function Contact() {
  const { toast } = useStore()
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const send = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.email.includes('@') || !form.message) return toast('Please complete the form')
    toast('Message sent — salamat! We\'ll reply soon.')
    setForm({ name: '', email: '', message: '' })
  }
  return (
    <div className="mx-auto max-w-6xl px-5 py-12 lg:px-8">
      <Eyebrow>Contact</Eyebrow>
      <h1 className="mt-3 font-display text-5xl text-ink">Get in touch</h1>
      <div className="mt-10 grid gap-10 lg:grid-cols-2">
        <div className="space-y-4">
          {[
            { icon: MapPin, t: 'Address', d: restaurant.address },
            { icon: Phone, t: 'Phone', d: restaurant.phone },
            { icon: Mail, t: 'Email', d: restaurant.email },
          ].map(({ icon: Icon, t, d }) => (
            <div key={t} className="flex gap-4 rounded-lg border border-line bg-card p-5">
              <Icon className="shrink-0 text-clay" />
              <div>
                <p className="font-medium text-ink">{t}</p>
                <p className="text-sm text-ink-soft">{d}</p>
              </div>
            </div>
          ))}
          <div className="flex gap-4 rounded-lg border border-line bg-card p-5">
            <Clock className="shrink-0 text-clay" />
            <div>
              <p className="font-medium text-ink">Hours</p>
              {restaurant.hours.map((h) => <p key={h.day} className="text-sm text-ink-soft">{h.day}: {h.open}–{h.close}</p>)}
            </div>
          </div>
          <div className="aspect-[16/10] overflow-hidden rounded-lg bg-cream-deep">
            <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=500&fit=crop&auto=format" alt="Map to Mesa" className="h-full w-full object-cover" />
          </div>
        </div>

        <form onSubmit={send} className="h-fit rounded-xl border border-line bg-card p-6 lg:p-8">
          <h2 className="font-display text-2xl text-ink">Send a message</h2>
          <div className="mt-6 space-y-4">
            <Field label="Name"><input className={inputClass} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></Field>
            <Field label="Email"><input type="email" className={inputClass} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></Field>
            <Field label="Message"><textarea rows={5} className={inputClass} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} /></Field>
            <Button type="submit" size="lg" className="w-full">Send message</Button>
          </div>
        </form>
      </div>
    </div>
  )
}
