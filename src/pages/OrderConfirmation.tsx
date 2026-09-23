import { Link, useParams } from 'react-router'
import { CheckCircle2, Clock, MapPin } from 'lucide-react'
import { getOrder, summarizeLine, lineTotalLabel } from '../lib/store'
import { getItem } from '../data/menu'
import { peso } from '../lib/format'
import { restaurant } from '../lib/settings'
import { LinkButton, Badge } from '../components/ui'

const statusFlow = ['Pending', 'Confirmed', 'Preparing', 'Ready for Pickup', 'Completed']

export function OrderConfirmation() {
  const { id } = useParams()
  const order = id ? getOrder(id) : undefined

  if (!order) {
    return (
      <div className="mx-auto max-w-md px-5 py-28 text-center">
        <h1 className="font-display text-3xl text-ink">Order not found</h1>
        <Link to="/menu" className="mt-4 inline-block text-clay hover:underline">Back to menu</Link>
      </div>
    )
  }

  const idx = Math.max(0, statusFlow.indexOf(order.status))

  return (
    <div className="mx-auto max-w-3xl px-5 py-12 lg:px-8">
      <div className="rounded-xl border border-line bg-card p-8 text-center">
        <CheckCircle2 size={48} className="mx-auto text-clay" />
        <h1 className="mt-4 font-display text-4xl text-ink">Salamat, {order.name.split(' ')[0]}!</h1>
        <p className="mt-2 text-ink-soft">
          Your order <span className="font-mono text-ink">#{order.number}</span> is in. A confirmation was sent to {order.email}.
        </p>
      </div>

      {/* Status tracker */}
      <div className="mt-8 rounded-xl border border-line bg-card p-6">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="font-display text-xl text-ink">Order status</h2>
          <Badge tone="gold">{order.status}</Badge>
        </div>
        <ol className="flex flex-col gap-0 sm:flex-row sm:items-center">
          {statusFlow.map((s, i) => (
            <li key={s} className="flex flex-1 items-center gap-3 sm:flex-col sm:gap-2 sm:text-center">
              <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-mono text-xs ${i <= idx ? 'bg-clay text-white' : 'bg-cream-deep text-ink-soft'}`}>{i + 1}</span>
              <span className={`text-xs ${i <= idx ? 'text-ink' : 'text-ink-soft'}`}>{s}</span>
            </li>
          ))}
        </ol>
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <div className="rounded-xl border border-line bg-card p-6">
          <div className="flex items-center gap-2 text-clay"><Clock size={18} /><h3 className="font-medium text-ink">Pickup</h3></div>
          <p className="mt-2 text-sm text-ink">{new Date(order.pickupDate).toLocaleDateString('en-PH', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
          <p className="text-sm text-ink-soft">at {order.pickupTime} · {order.method}</p>
        </div>
        <div className="rounded-xl border border-line bg-card p-6">
          <div className="flex items-center gap-2 text-clay"><MapPin size={18} /><h3 className="font-medium text-ink">Pickup location</h3></div>
          <p className="mt-2 text-sm text-ink-soft">{restaurant.address}</p>
        </div>
      </div>

      <div className="mt-8 rounded-xl border border-line bg-card p-6">
        <h3 className="font-display text-xl text-ink">Your order</h3>
        <ul className="mt-4 divide-y divide-line">
          {order.lines.map((l) => {
            const item = getItem(l.itemId)
            return (
              <li key={l.lineId} className="flex justify-between gap-3 py-3 text-sm">
                <span className="text-ink">{l.qty}× {item?.name}{summarizeLine(l) && <span className="block text-xs text-ink-soft">{summarizeLine(l)}</span>}</span>
                <span className="font-mono text-ink-soft">{lineTotalLabel(l)}</span>
              </li>
            )
          })}
        </ul>
        <div className="mt-4 flex justify-between border-t border-line pt-4 text-base">
          <span className="font-medium text-ink">Total paid</span>
          <span className="font-mono font-medium text-ink">{peso(order.total)}</span>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <LinkButton to="/menu" variant="outline">Order again</LinkButton>
        <LinkButton to="/account/orders">View order history</LinkButton>
      </div>
    </div>
  )
}
