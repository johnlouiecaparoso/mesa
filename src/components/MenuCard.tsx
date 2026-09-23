import { Link } from 'react-router'
import { Heart } from 'lucide-react'
import type { MenuItem } from '../data/menu'
import { peso } from '../lib/format'
import { useStore } from '../lib/store'
import { Badge } from './ui'

const tagTone: Record<string, 'clay' | 'olive' | 'gold' | 'neutral'> = {
  bestseller: 'gold',
  spicy: 'clay',
  vegetarian: 'olive',
  vegan: 'olive',
  'gluten-free': 'olive',
}

export function MenuCard({ item }: { item: MenuItem }) {
  const { isFavorite, toggleFavorite } = useStore()
  const fav = isFavorite(item.id)
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-lg border border-line bg-card transition-shadow duration-300 hover:shadow-[0_18px_40px_-24px_rgba(36,32,27,0.45)]">
      <Link to={`/menu/${item.id}`} className="relative block aspect-[4/3] overflow-hidden bg-cream-deep">
        <img
          src={item.image}
          alt={item.name}
          loading="lazy"
          className={`h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 ${
            item.soldOut ? 'grayscale' : ''
          }`}
        />
        {item.soldOut && (
          <div className="absolute inset-0 flex items-center justify-center bg-ink/40">
            <span className="rounded-full bg-ink px-4 py-1.5 text-sm font-medium text-cream">Sold out</span>
          </div>
        )}
        {item.featured && !item.soldOut && (
          <span className="absolute left-3 top-3">
            <Badge tone="gold">Featured</Badge>
          </span>
        )}
      </Link>
      <button
        onClick={() => toggleFavorite(item.id)}
        aria-label={fav ? 'Remove from favorites' : 'Add to favorites'}
        aria-pressed={fav}
        className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-card/90 text-ink backdrop-blur transition hover:scale-110"
      >
        <Heart size={17} className={fav ? 'fill-clay text-clay' : 'text-ink-soft'} />
      </button>

      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-start justify-between gap-3">
          <Link to={`/menu/${item.id}`}>
            <h3 className="font-display text-lg leading-tight text-ink hover:text-clay">{item.name}</h3>
          </Link>
          <span className="whitespace-nowrap font-mono text-sm font-medium text-clay-deep">{peso(item.price)}</span>
        </div>
        <p className="mt-1.5 line-clamp-2 flex-1 text-sm text-ink-soft">{item.description}</p>
        {item.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {item.tags.slice(0, 3).map((t) => (
              <Badge key={t} tone={tagTone[t] ?? 'neutral'}>
                {t.replace('-', ' ')}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </article>
  )
}
