import { useState } from 'react'
import { Link } from 'react-router'
import { Camera, Share2, MapPin, Phone, Mail } from 'lucide-react'
import { restaurant } from '../lib/settings'
import { useStore } from '../lib/store'
import { Button, inputClass } from './ui'

export function Footer() {
  const { toast } = useStore()
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [consent, setConsent] = useState(false)
  const [done, setDone] = useState(false)

  const subscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.includes('@')) return toast('Please enter a valid email')
    if (!consent) return toast('Please agree to receive updates')
    const subs = JSON.parse(localStorage.getItem('mesa.subscribers') || '[]')
    if (subs.some((s: { email: string }) => s.email === email)) {
      return toast('You are already subscribed')
    }
    subs.push({ email, phone, consent, source: 'footer', createdAt: new Date().toISOString() })
    localStorage.setItem('mesa.subscribers', JSON.stringify(subs))
    setDone(true)
    toast('Salamat! You are on the list.')
  }

  return (
    <footer className="mt-24 bg-ink text-cream">
      <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr_1fr_1.4fr]">
          <div>
            <span className="font-display text-3xl font-semibold">Mesa</span>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-cream/70">{restaurant.tagline}</p>
            <div className="mt-5 flex gap-3">
              <a href={restaurant.social.instagram} aria-label="Instagram" className="rounded-full border border-cream/20 p-2.5 transition hover:bg-cream/10">
                <Camera size={17} />
              </a>
              <a href={restaurant.social.facebook} aria-label="Facebook" className="rounded-full border border-cream/20 p-2.5 transition hover:bg-cream/10">
                <Share2 size={17} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-cream/50">Explore</h4>
            <ul className="mt-4 space-y-2.5 text-sm text-cream/80">
              {['Menu', 'Order', 'Reservations', 'About', 'Contact'].map((l) => (
                <li key={l}>
                  <Link to={`/${l.toLowerCase()}`} className="hover:text-clay">
                    {l}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-cream/50">Visit</h4>
            <ul className="mt-4 space-y-3 text-sm text-cream/80">
              <li className="flex gap-2.5"><MapPin size={16} className="mt-0.5 shrink-0 text-clay" />{restaurant.address}</li>
              <li className="flex gap-2.5"><Phone size={16} className="shrink-0 text-clay" />{restaurant.phone}</li>
              <li className="flex gap-2.5"><Mail size={16} className="shrink-0 text-clay" />{restaurant.email}</li>
            </ul>
            <ul className="mt-4 space-y-1 text-xs text-cream/60">
              {restaurant.hours.map((h) => (
                <li key={h.day}>{h.day}: {h.open}–{h.close}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-cream/50">Newsletter</h4>
            {done ? (
              <p className="mt-4 text-sm text-cream/80">Salamat! Watch your inbox for merienda deals and new dishes.</p>
            ) : (
              <form onSubmit={subscribe} className="mt-4 space-y-3">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@email.com"
                  className={`${inputClass} border-cream/20 bg-cream/[0.06] text-cream placeholder:text-cream/40`}
                />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Mobile (optional)"
                  className={`${inputClass} border-cream/20 bg-cream/[0.06] text-cream placeholder:text-cream/40`}
                />
                <label className="flex items-start gap-2 text-xs text-cream/70">
                  <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-0.5 accent-clay" />
                  I agree to receive occasional updates from Mesa.
                </label>
                <Button type="submit" className="w-full">Subscribe</Button>
              </form>
            )}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-cream/15 pt-6 text-xs text-cream/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Mesa Restaurant. A portfolio demo — not a real business.</p>
          <div className="flex gap-5">
            <Link to="/about" className="hover:text-cream">Privacy</Link>
            <Link to="/about" className="hover:text-cream">Terms</Link>
            <Link to="/admin" className="hover:text-cream">Admin</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
