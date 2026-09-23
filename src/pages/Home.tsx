import { Link } from 'react-router'
import { Star, ArrowRight, Clock, MapPin, Phone, Quote } from 'lucide-react'
import { featuredItems, testimonials, activePromotion } from '../data/menu'
import { restaurant } from '../lib/settings'
import { MenuCard } from '../components/MenuCard'
import { Button, LinkButton, Eyebrow, Badge } from '../components/ui'

const heroImg =
  'https://images.unsplash.com/photo-1555126634-323283e090fa?w=1400&h=1600&fit=crop&auto=format'

const socialImgs = [
  '1504674900247-0877df9cc836',
  '1567620905732-2d1ec7ab7445',
  '1476224203421-9ac39bcb3327',
  '1540189549336-e6e99c3679fe',
  '1414235077428-338989a2e8c0',
  '1533777324565-a040eb52facd',
]

export function Home() {
  const featured = featuredItems().slice(0, 6)

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 pb-16 pt-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:px-8 lg:pb-24 lg:pt-20">
          <div className="animate-fade-up">
            <Eyebrow>Modern Filipino · Poblacion, Makati</Eyebrow>
            <h1 className="mt-5 font-display text-5xl leading-[1.02] tracking-tight text-ink sm:text-6xl lg:text-7xl">
              Made for the
              <span className="relative ml-3 inline-block italic text-clay">
                table
                <svg className="absolute -bottom-2 left-0 w-full" height="10" viewBox="0 0 200 10" fill="none" preserveAspectRatio="none">
                  <path d="M2 7C60 2 140 2 198 7" stroke="#c98a2b" strokeWidth="3" strokeLinecap="round" />
                </svg>
              </span>
            </h1>
            <p className="mt-7 max-w-md text-lg leading-relaxed text-ink-soft">
              Heritage recipes cooked with intention — inasal over live coals, kare-kare
              simmered slow, halo-halo built tall. Come hungry, leave family.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <LinkButton to="/order" size="lg">
                Order Online <ArrowRight size={18} />
              </LinkButton>
              <LinkButton to="/reservations" variant="outline" size="lg">
                Reserve a Table
              </LinkButton>
            </div>
            <div className="mt-9 flex items-center gap-6 text-sm text-ink-soft">
              <span className="flex items-center gap-1.5">
                <span className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={15} className="fill-gold text-gold" />
                  ))}
                </span>
                4.9 · 1,240 reviews
              </span>
              <span className="hidden sm:inline">Open until 10 PM today</span>
            </div>
          </div>

          <div className="relative animate-fade-up">
            <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-cream-deep shadow-[0_40px_80px_-40px_rgba(36,32,27,0.5)]">
              <img src={heroImg} alt="A spread of Filipino dishes on a wooden table" className="h-full w-full object-cover" />
            </div>
            <div className="absolute -bottom-5 -left-5 hidden rounded-lg border border-line bg-card p-4 shadow-lg sm:block">
              <p className="font-mono text-xs uppercase tracking-widest text-clay">Tonight's fire</p>
              <p className="mt-1 font-display text-lg text-ink">Chicken Inasal</p>
              <p className="text-sm text-ink-soft">Grilled to order over coals</p>
            </div>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="border-y border-line bg-cream-deep/50">
        <div className="mx-auto grid max-w-5xl gap-6 px-5 py-16 text-center lg:px-8">
          <Eyebrow>Our story</Eyebrow>
          <h2 className="mx-auto max-w-3xl font-display text-3xl leading-snug text-ink sm:text-4xl">
            {restaurant.description}
          </h2>
          <Link to="/about" className="mx-auto mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-clay hover:gap-2.5 transition-all">
            Read the full story <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* Featured */}
      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <Eyebrow>From the kitchen</Eyebrow>
            <h2 className="mt-3 font-display text-4xl text-ink">Featured dishes</h2>
          </div>
          <Link to="/menu" className="hidden shrink-0 items-center gap-1.5 text-sm font-medium text-clay hover:gap-2.5 transition-all sm:flex">
            Full menu <ArrowRight size={16} />
          </Link>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((item) => (
            <MenuCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      {/* Promotion */}
      <section className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid items-center gap-8 overflow-hidden rounded-xl bg-ink px-8 py-12 text-cream lg:grid-cols-2 lg:px-14">
          <div>
            <Badge tone="gold">Limited promo</Badge>
            <h2 className="mt-4 font-display text-4xl text-cream">{activePromotion.title}</h2>
            <p className="mt-4 max-w-md text-cream/75">{activePromotion.description}</p>
            <div className="mt-7 flex items-center gap-4">
              <span className="rounded-md border border-dashed border-cream/40 px-4 py-2.5 font-mono text-lg tracking-widest text-gold">
                {activePromotion.code}
              </span>
              <LinkButton to="/menu" variant="primary">Order now</LinkButton>
            </div>
          </div>
          <div className="relative hidden aspect-[16/10] overflow-hidden rounded-lg bg-cream/10 lg:block">
            <img src="https://images.unsplash.com/photo-1585032226651-759b368d7246?w=800&h=500&fit=crop&auto=format" alt="Pancit noodles" className="h-full w-full object-cover" />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <div className="text-center">
          <Eyebrow>Kwento ng mesa</Eyebrow>
          <h2 className="mt-3 font-display text-4xl text-ink">What the table says</h2>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <figure key={t.id} className="flex flex-col rounded-lg border border-line bg-card p-7">
              <Quote size={26} className="text-clay/30" />
              <blockquote className="mt-4 flex-1 text-[0.97rem] leading-relaxed text-ink">"{t.quote}"</blockquote>
              <figcaption className="mt-6 flex items-center justify-between border-t border-line pt-4">
                <div>
                  <p className="font-medium text-ink">{t.name}</p>
                  <p className="text-sm text-ink-soft">{t.location}</p>
                </div>
                <span className="flex">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} size={14} className="fill-gold text-gold" />
                  ))}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* Social */}
      <section className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="flex items-end justify-between">
          <div>
            <Eyebrow>@mesa.ph</Eyebrow>
            <h2 className="mt-3 font-display text-4xl text-ink">On the gram</h2>
          </div>
          <a href={restaurant.social.instagram} className="text-sm font-medium text-clay hover:underline">Follow us</a>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {socialImgs.map((id) => (
            <a key={id} href={restaurant.social.instagram} className="group relative aspect-square overflow-hidden rounded-md bg-cream-deep">
              <img
                src={`https://images.unsplash.com/photo-${id}?w=400&h=400&fit=crop&auto=format`}
                alt="Mesa on Instagram"
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </a>
          ))}
        </div>
      </section>

      {/* Info + CTA */}
      <section className="mx-auto mt-20 max-w-7xl px-5 lg:px-8">
        <div className="grid gap-6 rounded-xl border border-line bg-cream-deep/40 p-8 sm:grid-cols-3 lg:p-12">
          <div className="flex gap-3">
            <MapPin className="shrink-0 text-clay" />
            <div>
              <p className="font-medium text-ink">Find us</p>
              <p className="mt-1 text-sm text-ink-soft">{restaurant.address}</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Clock className="shrink-0 text-clay" />
            <div>
              <p className="font-medium text-ink">Hours</p>
              {restaurant.hours.map((h) => (
                <p key={h.day} className="mt-1 text-sm text-ink-soft">{h.day}: {h.open}–{h.close}</p>
              ))}
            </div>
          </div>
          <div className="flex gap-3">
            <Phone className="shrink-0 text-clay" />
            <div>
              <p className="font-medium text-ink">Reach us</p>
              <p className="mt-1 text-sm text-ink-soft">{restaurant.phone}</p>
              <p className="text-sm text-ink-soft">{restaurant.email}</p>
              <Button size="sm" variant="outline" className="mt-3" onClick={() => (window.location.href = '/reservations')}>
                Reserve a table
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
