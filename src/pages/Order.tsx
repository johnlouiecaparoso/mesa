import { Link } from 'react-router'
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react'
import { getItem } from '../data/menu'
import { peso } from '../lib/format'
import { useStore, summarizeLine, lineTotalLabel } from '../lib/store'
import { LinkButton, Eyebrow } from '../components/ui'
import { restaurant } from '../lib/settings'

export function Order() {
  const { cart, setQty, removeLine, totals, promoApplied } = useStore()

  if (cart.length === 0) {
    return (
      <div className="mx-auto max-w-md px-5 py-28 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-cream-deep">
          <ShoppingBag className="text-clay" />
        </div>
        <h1 className="mt-6 font-display text-3xl text-ink">Your cart is empty</h1>
        <p className="mt-2 text-ink-soft">Browse the menu and add a dish or two — the table's waiting.</p>
        <LinkButton to="/menu" size="lg" className="mt-7">Explore the menu</LinkButton>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-6xl px-5 py-12 lg:px-8">
      <Eyebrow>Your order</Eyebrow>
      <h1 className="mt-3 font-display text-4xl text-ink">Cart</h1>

      <div className="mt-8 grid gap-10 lg:grid-cols-[1.6fr_1fr]">
        <ul className="divide-y divide-line rounded-lg border border-line bg-card">
          {cart.map((line) => {
            const item = getItem(line.itemId)
            if (!item) return null
            const sub = summarizeLine(line)
            return (
              <li key={line.lineId} className="flex gap-4 p-4">
                <Link to={`/menu/${item.id}`} className="h-20 w-20 shrink-0 overflow-hidden rounded-md bg-cream-deep">
                  <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                </Link>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="font-display text-lg text-ink">{item.name}</p>
                      {sub && <p className="truncate text-sm text-ink-soft">{sub}</p>}
                      {line.note && <p className="mt-0.5 text-xs italic text-ink-soft">"{line.note}"</p>}
                    </div>
                    <span className="whitespace-nowrap font-mono text-sm text-clay-deep">{lineTotalLabel(line)}</span>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center rounded-md border border-line">
                      <button onClick={() => setQty(line.lineId, line.qty - 1)} className="p-2 text-ink-soft hover:text-ink" aria-label="Decrease">
                        <Minus size={14} />
                      </button>
                      <span className="w-7 text-center font-mono text-sm">{line.qty}</span>
                      <button onClick={() => setQty(line.lineId, line.qty + 1)} className="p-2 text-ink-soft hover:text-ink" aria-label="Increase">
                        <Plus size={14} />
                      </button>
                    </div>
                    <button onClick={() => removeLine(line.lineId)} className="flex items-center gap-1.5 text-xs text-ink-soft hover:text-clay-deep">
                      <Trash2 size={14} /> Remove
                    </button>
                  </div>
                </div>
              </li>
            )
          })}
        </ul>

        <aside className="h-fit rounded-lg border border-line bg-card p-6 lg:sticky lg:top-24">
          <h2 className="font-display text-xl text-ink">Order summary</h2>
          <dl className="mt-5 space-y-3 text-sm">
            <Row label="Subtotal" value={peso(totals.subtotal)} />
            {promoApplied && <Row label="Discount" value={`−${peso(totals.discount)}`} accent />}
            <Row label={`Service fee (${restaurant.serviceFeeRate * 100}%)`} value={peso(totals.serviceFee)} muted />
            <Row label={`VAT (${restaurant.taxRate * 100}%)`} value={peso(totals.tax)} muted />
            <div className="border-t border-line pt-3">
              <Row label="Total" value={peso(totals.total)} bold />
            </div>
          </dl>
          <LinkButton to="/checkout" size="lg" className="mt-6 w-full">
            Checkout <ArrowRight size={18} />
          </LinkButton>
          <Link to="/menu" className="mt-3 block text-center text-sm text-ink-soft hover:text-ink">Add more dishes</Link>
        </aside>
      </div>
    </div>
  )
}

function Row({ label, value, bold, muted, accent }: { label: string; value: string; bold?: boolean; muted?: boolean; accent?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <dt className={muted ? 'text-ink-soft' : 'text-ink'}>{label}</dt>
      <dd className={`font-mono ${bold ? 'text-base font-medium text-ink' : accent ? 'text-clay-deep' : muted ? 'text-ink-soft' : 'text-ink'}`}>{value}</dd>
    </div>
  )
}
