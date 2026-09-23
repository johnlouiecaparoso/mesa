import { useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router'
import { Heart, Minus, Plus, ArrowLeft, Check } from 'lucide-react'
import { getItem } from '../data/menu'
import { peso } from '../lib/format'
import { useStore } from '../lib/store'
import { Button, Badge } from '../components/ui'

export function MenuItemPage() {
  const { id } = useParams()
  const item = id ? getItem(id) : undefined
  const nav = useNavigate()
  const { addToCart, isFavorite, toggleFavorite } = useStore()

  const [variationId, setVariationId] = useState(item?.variations?.[0]?.id)
  const [addOnIds, setAddOnIds] = useState<string[]>([])
  const [qty, setQty] = useState(1)
  const [note, setNote] = useState('')

  if (!item) {
    return (
      <div className="mx-auto max-w-xl px-5 py-32 text-center">
        <h1 className="font-display text-3xl text-ink">Dish not found</h1>
        <Link to="/menu" className="mt-4 inline-block text-clay hover:underline">Back to menu</Link>
      </div>
    )
  }

  const varPrice = item.variations?.find((v) => v.id === variationId)?.price ?? 0
  const addOnPrice = (item.addOns ?? []).filter((a) => addOnIds.includes(a.id)).reduce((s, a) => s + a.price, 0)
  const unit = item.price + varPrice + addOnPrice
  const fav = isFavorite(item.id)

  const add = () => {
    addToCart({ itemId: item.id, qty, variationId, addOnIds, note: note.trim() || undefined })
    nav('/order')
  }

  return (
    <div className="mx-auto max-w-6xl px-5 py-8 lg:px-8">
      <Link to="/menu" className="inline-flex items-center gap-1.5 text-sm text-ink-soft hover:text-ink">
        <ArrowLeft size={16} /> Back to menu
      </Link>

      <div className="mt-6 grid gap-10 lg:grid-cols-2">
        <div className="relative aspect-square overflow-hidden rounded-xl bg-cream-deep">
          <img src={item.image.replace('w=900&h=700', 'w=1000&h=1000')} alt={item.name} className={`h-full w-full object-cover ${item.soldOut ? 'grayscale' : ''}`} />
          <button
            onClick={() => toggleFavorite(item.id)}
            aria-pressed={fav}
            className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-card/90 backdrop-blur transition hover:scale-110"
          >
            <Heart size={20} className={fav ? 'fill-clay text-clay' : 'text-ink-soft'} />
          </button>
        </div>

        <div>
          <div className="flex flex-wrap gap-2">
            {item.tags.map((t) => (
              <Badge key={t} tone="olive">{t.replace('-', ' ')}</Badge>
            ))}
          </div>
          <h1 className="mt-3 font-display text-4xl text-ink">{item.name}</h1>
          <p className="mt-1 font-mono text-xl text-clay-deep">{peso(item.price)}</p>
          <p className="mt-5 text-ink-soft leading-relaxed">{item.description}</p>

          {item.soldOut ? (
            <div className="mt-8 rounded-lg border border-line bg-cream-deep/50 p-6 text-center">
              <p className="font-display text-xl text-ink">Sold out for today</p>
              <p className="mt-1 text-sm text-ink-soft">Check back tomorrow — this one goes fast.</p>
            </div>
          ) : (
            <div className="mt-8 space-y-6">
              {item.variations && (
                <div>
                  <p className="mb-2 text-sm font-medium text-ink">Choose one</p>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {item.variations.map((v) => (
                      <button
                        key={v.id}
                        onClick={() => setVariationId(v.id)}
                        className={`flex items-center justify-between rounded-md border px-4 py-3 text-left text-sm transition ${
                          variationId === v.id ? 'border-clay bg-clay/[0.06]' : 'border-line hover:border-ink/30'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span className={`flex h-4 w-4 items-center justify-center rounded-full border ${variationId === v.id ? 'border-clay bg-clay' : 'border-ink/30'}`}>
                            {variationId === v.id && <Check size={11} className="text-white" />}
                          </span>
                          {v.name}
                        </span>
                        <span className="font-mono text-xs text-ink-soft">{v.price ? `+${peso(v.price)}` : 'included'}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {item.addOns && (
                <div>
                  <p className="mb-2 text-sm font-medium text-ink">Add-ons <span className="text-ink-soft">(optional)</span></p>
                  <div className="space-y-2">
                    {item.addOns.map((a) => {
                      const on = addOnIds.includes(a.id)
                      return (
                        <button
                          key={a.id}
                          onClick={() => setAddOnIds((s) => (on ? s.filter((x) => x !== a.id) : [...s, a.id]))}
                          className={`flex w-full items-center justify-between rounded-md border px-4 py-3 text-left text-sm transition ${
                            on ? 'border-clay bg-clay/[0.06]' : 'border-line hover:border-ink/30'
                          }`}
                        >
                          <span className="flex items-center gap-2.5">
                            <span className={`flex h-4 w-4 items-center justify-center rounded border ${on ? 'border-clay bg-clay' : 'border-ink/30'}`}>
                              {on && <Check size={11} className="text-white" />}
                            </span>
                            {a.name}
                          </span>
                          <span className="font-mono text-xs text-clay-deep">+{peso(a.price)}</span>
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}

              <div>
                <label className="mb-2 block text-sm font-medium text-ink">Special instructions</label>
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  rows={2}
                  placeholder="e.g. extra spicy, no onions"
                  className="w-full rounded-md border border-line bg-card px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-soft/60 focus:border-clay focus:outline-none focus:ring-2 focus:ring-clay/20"
                />
              </div>

              <div className="flex items-center gap-4 border-t border-line pt-6">
                <div className="flex items-center rounded-md border border-line">
                  <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="p-3 text-ink-soft hover:text-ink" aria-label="Decrease">
                    <Minus size={16} />
                  </button>
                  <span className="w-8 text-center font-mono">{qty}</span>
                  <button onClick={() => setQty((q) => q + 1)} className="p-3 text-ink-soft hover:text-ink" aria-label="Increase">
                    <Plus size={16} />
                  </button>
                </div>
                <Button size="lg" className="flex-1" onClick={add}>
                  Add to cart · {peso(unit * qty)}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
