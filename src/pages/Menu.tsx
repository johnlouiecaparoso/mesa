import { useMemo, useState } from 'react'
import { Search, SlidersHorizontal } from 'lucide-react'
import { categories, menuItems } from '../data/menu'
import { MenuCard } from '../components/MenuCard'
import { Eyebrow } from '../components/ui'

const dietary = ['vegetarian', 'vegan', 'gluten-free', 'spicy']

export function Menu() {
  const [cat, setCat] = useState<string>('all')
  const [q, setQ] = useState('')
  const [diet, setDiet] = useState<string[]>([])

  const filtered = useMemo(() => {
    return menuItems.filter((m) => {
      if (cat !== 'all' && m.categoryId !== cat) return false
      if (q && !(`${m.name} ${m.description}`.toLowerCase().includes(q.toLowerCase()))) return false
      if (diet.length && !diet.every((d) => m.tags.includes(d))) return false
      return true
    })
  }, [cat, q, diet])

  const grouped = categories
    .map((c) => ({ cat: c, items: filtered.filter((m) => m.categoryId === c.id) }))
    .filter((g) => g.items.length)

  return (
    <div className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
      <div className="max-w-2xl">
        <Eyebrow>The menu</Eyebrow>
        <h1 className="mt-3 font-display text-5xl text-ink">Everything on the table</h1>
        <p className="mt-4 text-ink-soft">
          {menuItems.length} dishes across six categories, cooked fresh daily. Tap any dish to
          customize and add to your order.
        </p>
      </div>

      {/* Controls */}
      <div className="sticky top-[73px] z-30 -mx-5 mt-8 border-y border-line bg-cream/90 px-5 py-4 backdrop-blur lg:mx-0 lg:rounded-lg lg:border lg:px-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full lg:max-w-xs">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-soft" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search dishes…"
              className="w-full rounded-md border border-line bg-card py-2.5 pl-10 pr-3 text-sm text-ink placeholder:text-ink-soft/60 focus:border-clay focus:outline-none focus:ring-2 focus:ring-clay/20"
            />
          </div>
          <div className="flex items-center gap-2 text-ink-soft">
            <SlidersHorizontal size={16} className="shrink-0" />
            <div className="flex flex-wrap gap-2">
              {dietary.map((d) => {
                const on = diet.includes(d)
                return (
                  <button
                    key={d}
                    onClick={() => setDiet((s) => (on ? s.filter((x) => x !== d) : [...s, d]))}
                    className={`rounded-full border px-3 py-1 text-xs font-medium capitalize transition ${
                      on ? 'border-clay bg-clay text-white' : 'border-line text-ink-soft hover:border-ink/40'
                    }`}
                  >
                    {d.replace('-', ' ')}
                  </button>
                )
              })}
            </div>
          </div>
        </div>
        <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
          {[{ id: 'all', name: 'All' }, ...categories].map((c) => (
            <button
              key={c.id}
              onClick={() => setCat(c.id)}
              className={`whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-medium transition ${
                cat === c.id ? 'bg-ink text-cream' : 'text-ink-soft hover:bg-ink/[0.06]'
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {grouped.length === 0 ? (
        <div className="py-24 text-center">
          <p className="font-display text-2xl text-ink">Walang nahanap</p>
          <p className="mt-2 text-ink-soft">No dishes match your filters. Try clearing your search.</p>
        </div>
      ) : (
        grouped.map((g) => (
          <section key={g.cat.id} className="mt-14 scroll-mt-40" id={g.cat.slug}>
            <div className="flex items-baseline gap-4">
              <h2 className="font-display text-3xl text-ink">{g.cat.name}</h2>
              <span className="text-sm text-ink-soft">{g.cat.blurb}</span>
            </div>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {g.items.map((item) => (
                <MenuCard key={item.id} item={item} />
              ))}
            </div>
          </section>
        ))
      )}
    </div>
  )
}
