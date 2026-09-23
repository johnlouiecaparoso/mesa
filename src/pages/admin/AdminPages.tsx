import { useState } from 'react'
import { Search, Star, Percent } from 'lucide-react'
import { categories, menuItems, testimonials, activePromotion } from '../../data/menu'
import { recentOrders, upcomingReservations, activityLog } from '../../data/adminSeed'
import { getItem } from '../../data/menu'
import { getOrders, getReservations } from '../../lib/store'
import { restaurant } from '../../lib/settings'
import { peso } from '../../lib/format'
import { Badge, Button, inputClass, Field } from '../../components/ui'

const orderStatuses = ['Pending', 'Confirmed', 'Preparing', 'Ready for Pickup', 'Completed', 'Cancelled']
const resStatuses = ['Pending', 'Confirmed', 'Completed', 'Cancelled', 'No-show']

function tone(s: string): 'green' | 'gold' | 'red' {
  if (['Completed', 'Confirmed', 'Ready for Pickup'].includes(s)) return 'green'
  if (['Cancelled', 'No-show'].includes(s)) return 'red'
  return 'gold'
}

function Header({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="mb-6">
      <h1 className="font-display text-3xl text-ink">{title}</h1>
      <p className="mt-1 text-ink-soft">{desc}</p>
    </div>
  )
}

export function AdminOrders() {
  const live = getOrders().map((o) => ({
    id: o.id, number: o.number, customer: o.name, time: new Date(o.createdAt).toLocaleTimeString('en-PH', { hour: '2-digit', minute: '2-digit' }),
    total: o.total, status: o.status, itemId: o.lines[0]?.itemId ?? 'inasal',
  }))
  const [rows, setRows] = useState([...live, ...recentOrders()])
  const [filter, setFilter] = useState('All')

  const update = (id: string, status: string) => setRows((r) => r.map((x) => (x.id === id ? { ...x, status } : x)))
  const shown = filter === 'All' ? rows : rows.filter((r) => r.status === filter)

  return (
    <div>
      <Header title="Orders" desc="Update status as the kitchen works through the queue." />
      <div className="mb-4 flex flex-wrap gap-2">
        {['All', ...orderStatuses].map((s) => (
          <button key={s} onClick={() => setFilter(s)} className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition ${filter === s ? 'bg-ink text-cream' : 'text-ink-soft hover:bg-ink/[0.06]'}`}>{s}</button>
        ))}
      </div>
      <div className="overflow-x-auto rounded-lg border border-line bg-card">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-line text-left text-xs uppercase tracking-wide text-ink-soft">
              <th className="p-3 font-medium">Order</th>
              <th className="p-3 font-medium">Customer</th>
              <th className="p-3 font-medium">Item</th>
              <th className="p-3 font-medium">Total</th>
              <th className="p-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {shown.map((o) => (
              <tr key={o.id} className="hover:bg-cream-deep/30">
                <td className="p-3 font-mono text-xs text-ink">#{o.number}</td>
                <td className="p-3 text-ink">{o.customer}</td>
                <td className="p-3 text-ink-soft">{getItem(o.itemId)?.name}</td>
                <td className="p-3 font-mono text-ink">{peso(o.total)}</td>
                <td className="p-3">
                  <select value={o.status} onChange={(e) => update(o.id, e.target.value)} className="rounded-md border border-line bg-card px-2 py-1 text-xs focus:border-clay focus:outline-none">
                    {orderStatuses.map((s) => <option key={s}>{s}</option>)}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export function AdminReservations() {
  const live = getReservations().map((r) => ({ id: r.id, number: r.number, customer: r.name, partySize: r.partySize, time: r.time, status: r.status }))
  const [rows, setRows] = useState([...live, ...upcomingReservations()])
  const update = (id: string, status: string) => setRows((r) => r.map((x) => (x.id === id ? { ...x, status } : x)))
  return (
    <div>
      <Header title="Reservations" desc="Confirm, complete or flag no-shows." />
      <div className="overflow-x-auto rounded-lg border border-line bg-card">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-line text-left text-xs uppercase tracking-wide text-ink-soft">
              <th className="p-3 font-medium">Ref</th><th className="p-3 font-medium">Customer</th><th className="p-3 font-medium">Party</th><th className="p-3 font-medium">Time</th><th className="p-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {rows.map((r) => (
              <tr key={r.id} className="hover:bg-cream-deep/30">
                <td className="p-3 font-mono text-xs text-ink">#{r.number}</td>
                <td className="p-3 text-ink">{r.customer}</td>
                <td className="p-3 text-ink-soft">{r.partySize} guests</td>
                <td className="p-3 text-ink-soft">{r.time}</td>
                <td className="p-3">
                  <select value={r.status} onChange={(e) => update(r.id, e.target.value)} className="rounded-md border border-line bg-card px-2 py-1 text-xs focus:border-clay focus:outline-none">
                    {resStatuses.map((s) => <option key={s}>{s}</option>)}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export function AdminMenu() {
  const [items, setItems] = useState(menuItems.map((m) => ({ id: m.id, name: m.name, categoryId: m.categoryId, price: m.price, featured: m.featured, soldOut: m.soldOut, image: m.image })))
  const [q, setQ] = useState('')
  const toggle = (id: string, key: 'featured' | 'soldOut') => setItems((s) => s.map((x) => (x.id === id ? { ...x, [key]: !x[key] } : x)))
  const shown = items.filter((i) => i.name.toLowerCase().includes(q.toLowerCase()))
  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Header title="Menu items" desc={`${menuItems.length} dishes across ${categories.length} categories.`} />
        <Button size="sm">+ New item</Button>
      </div>
      <div className="relative mb-4 max-w-xs">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-soft" />
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search items…" className={`${inputClass} pl-9 py-2 text-sm`} />
      </div>
      <div className="overflow-x-auto rounded-lg border border-line bg-card">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-line text-left text-xs uppercase tracking-wide text-ink-soft">
              <th className="p-3 font-medium">Item</th><th className="p-3 font-medium">Category</th><th className="p-3 font-medium">Price</th><th className="p-3 font-medium">Featured</th><th className="p-3 font-medium">Available</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {shown.map((i) => (
              <tr key={i.id} className="hover:bg-cream-deep/30">
                <td className="p-3">
                  <div className="flex items-center gap-3">
                    <img src={i.image} alt="" className="h-9 w-9 rounded object-cover" />
                    <span className="text-ink">{i.name}</span>
                  </div>
                </td>
                <td className="p-3 capitalize text-ink-soft">{categories.find((c) => c.id === i.categoryId)?.name}</td>
                <td className="p-3 font-mono text-ink">{peso(i.price)}</td>
                <td className="p-3">
                  <button onClick={() => toggle(i.id, 'featured')} aria-label="Toggle featured">
                    <Star size={18} className={i.featured ? 'fill-gold text-gold' : 'text-ink-soft/40'} />
                  </button>
                </td>
                <td className="p-3">
                  <button onClick={() => toggle(i.id, 'soldOut')}>
                    <Badge tone={i.soldOut ? 'red' : 'green'}>{i.soldOut ? 'Sold out' : 'Available'}</Badge>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export function AdminCategories() {
  return (
    <div>
      <div className="flex items-center justify-between"><Header title="Categories" desc="Organize the menu." /><Button size="sm">+ New category</Button></div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((c) => (
          <div key={c.id} className="rounded-lg border border-line bg-card p-5">
            <h3 className="font-display text-lg text-ink">{c.name}</h3>
            <p className="mt-1 text-sm text-ink-soft">{c.blurb}</p>
            <p className="mt-3 text-xs text-ink-soft">{menuItems.filter((m) => m.categoryId === c.id).length} items</p>
            <div className="mt-4 flex gap-2">
              <Button size="sm" variant="outline">Edit</Button>
              <Button size="sm" variant="ghost">Delete</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function AdminPromotions() {
  return (
    <div>
      <div className="flex items-center justify-between"><Header title="Promotions" desc="Discounts applied at checkout." /><Button size="sm">+ New promotion</Button></div>
      <div className="rounded-lg border border-line bg-card p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="rounded-md bg-clay/10 p-2 text-clay"><Percent size={18} /></span>
            <div>
              <h3 className="font-display text-lg text-ink">{activePromotion.title}</h3>
              <p className="text-sm text-ink-soft">{activePromotion.description}</p>
            </div>
          </div>
          <Badge tone="green">Active</Badge>
        </div>
        <div className="mt-4 grid gap-4 border-t border-line pt-4 text-sm sm:grid-cols-4">
          <div><p className="text-ink-soft">Code</p><p className="font-mono text-ink">{activePromotion.code}</p></div>
          <div><p className="text-ink-soft">Discount</p><p className="text-ink">{activePromotion.discountValue}%</p></div>
          <div><p className="text-ink-soft">Type</p><p className="capitalize text-ink">{activePromotion.discountType}</p></div>
          <div><p className="text-ink-soft">Ends</p><p className="text-ink">{activePromotion.endDate}</p></div>
        </div>
      </div>
    </div>
  )
}

export function AdminSubscribers() {
  const subs = JSON.parse(localStorage.getItem('mesa.subscribers') || '[]') as { email: string; phone?: string; source: string; createdAt: string }[]
  const seed = [
    { email: 'andrea.s@email.com', phone: '+63917…', source: 'footer', createdAt: '2026-09-18' },
    { email: 'miguel.tan@email.com', phone: '', source: 'checkout', createdAt: '2026-09-15' },
    { email: 'bea.lim@email.com', phone: '+63920…', source: 'footer', createdAt: '2026-09-11' },
  ]
  const all = [...subs, ...seed]
  return (
    <div>
      <Header title="Subscribers" desc={`${all.length} people on the newsletter.`} />
      <div className="overflow-x-auto rounded-lg border border-line bg-card">
        <table className="w-full text-sm">
          <thead><tr className="border-b border-line text-left text-xs uppercase tracking-wide text-ink-soft"><th className="p-3 font-medium">Email</th><th className="p-3 font-medium">Phone</th><th className="p-3 font-medium">Source</th><th className="p-3 font-medium">Joined</th></tr></thead>
          <tbody className="divide-y divide-line">
            {all.map((s, i) => (
              <tr key={i} className="hover:bg-cream-deep/30">
                <td className="p-3 text-ink">{s.email}</td>
                <td className="p-3 text-ink-soft">{s.phone || '—'}</td>
                <td className="p-3"><Badge>{s.source}</Badge></td>
                <td className="p-3 text-ink-soft">{new Date(s.createdAt).toLocaleDateString('en-PH')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export function AdminTestimonials() {
  return (
    <div>
      <div className="flex items-center justify-between"><Header title="Testimonials" desc="Reviews shown on the homepage." /><Button size="sm">+ Add review</Button></div>
      <div className="grid gap-4 md:grid-cols-2">
        {testimonials.map((t) => (
          <div key={t.id} className="rounded-lg border border-line bg-card p-5">
            <div className="flex items-center justify-between">
              <p className="font-medium text-ink">{t.name} · <span className="text-ink-soft">{t.location}</span></p>
              <span className="flex">{[...Array(t.rating)].map((_, i) => <Star key={i} size={13} className="fill-gold text-gold" />)}</span>
            </div>
            <p className="mt-2 text-sm text-ink-soft">"{t.quote}"</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export function AdminContent() {
  return (
    <div>
      <Header title="Homepage CMS" desc="Edit the content blocks shown on the landing page." />
      <div className="space-y-6">
        <section className="rounded-lg border border-line bg-card p-6">
          <h3 className="font-display text-lg text-ink">Hero</h3>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <Field label="Heading"><input className={inputClass} defaultValue="Made for the table" /></Field>
            <Field label="Primary CTA"><input className={inputClass} defaultValue="Order Online" /></Field>
            <div className="sm:col-span-2"><Field label="Subtitle"><textarea rows={2} className={inputClass} defaultValue={restaurant.description} /></Field></div>
          </div>
          <Button size="sm" className="mt-4">Save hero</Button>
        </section>
        <section className="rounded-lg border border-line bg-card p-6">
          <h3 className="font-display text-lg text-ink">About section</h3>
          <div className="mt-4 grid gap-4">
            <Field label="Heading"><input className={inputClass} defaultValue="Filipino food, without the fuss" /></Field>
          </div>
          <Button size="sm" className="mt-4">Save about</Button>
        </section>
      </div>
    </div>
  )
}

export function AdminSettings() {
  return (
    <div>
      <Header title="Restaurant settings" desc="These drive the site, reservations and checkout." />
      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-lg border border-line bg-card p-6">
          <h3 className="font-display text-lg text-ink">General</h3>
          <div className="mt-4 space-y-4">
            <Field label="Restaurant name"><input className={inputClass} defaultValue={restaurant.name} /></Field>
            <Field label="Phone"><input className={inputClass} defaultValue={restaurant.phone} /></Field>
            <Field label="Email"><input className={inputClass} defaultValue={restaurant.email} /></Field>
            <Field label="Address"><input className={inputClass} defaultValue={restaurant.address} /></Field>
          </div>
        </section>
        <section className="rounded-lg border border-line bg-card p-6">
          <h3 className="font-display text-lg text-ink">Reservations & fees</h3>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <Field label="Capacity (seats)"><input type="number" className={inputClass} defaultValue={restaurant.capacity} /></Field>
            <Field label="Max party size"><input type="number" className={inputClass} defaultValue={restaurant.maxPartySize} /></Field>
            <Field label="Slot duration (min)"><input type="number" className={inputClass} defaultValue={restaurant.slotMinutes} /></Field>
            <Field label="Service fee (%)"><input type="number" className={inputClass} defaultValue={restaurant.serviceFeeRate * 100} /></Field>
            <Field label="VAT (%)"><input type="number" className={inputClass} defaultValue={restaurant.taxRate * 100} /></Field>
          </div>
        </section>
      </div>
      <Button className="mt-6">Save settings</Button>
    </div>
  )
}

export function AdminActivity() {
  return (
    <div>
      <Header title="Activity log" desc="Audit trail of recent admin actions." />
      <ol className="relative space-y-5 border-l border-line pl-6">
        {activityLog.map((a) => (
          <li key={a.id} className="relative">
            <span className="absolute -left-[27px] top-1 h-3 w-3 rounded-full border-2 border-cream bg-clay" />
            <p className="text-sm text-ink"><span className="font-medium">{a.who}</span> {a.action}</p>
            <p className="text-xs text-ink-soft">{a.time}</p>
          </li>
        ))}
      </ol>
    </div>
  )
}
