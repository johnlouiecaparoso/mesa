import { LinkButton, Eyebrow } from '../components/ui'
import { restaurant } from '../lib/settings'

export function About() {
  return (
    <div>
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-4xl px-5 py-16 text-center lg:py-24">
          <Eyebrow>Our story</Eyebrow>
          <h1 className="mt-4 font-display text-5xl leading-tight text-ink lg:text-6xl">
            Filipino food, without the fuss
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft">
            {restaurant.description}
          </p>
        </div>
        <div className="mx-auto max-w-6xl px-5 lg:px-8">
          <div className="aspect-[16/9] overflow-hidden rounded-xl bg-cream-deep">
            <img
              src="https://images.unsplash.com/photo-1552566626-52f8b828add9?w=1400&h=800&fit=crop&auto=format"
              alt="The Mesa dining room"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-5 py-20 lg:px-8">
        <div className="prose-lg space-y-6 text-ink-soft">
          <p className="text-xl leading-relaxed text-ink">
            Mesa began in 2019 as a Sunday supper club in a Poblacion walk-up — a few long tables,
            a charcoal grill, and whoever's tita brought the best sinigang recipe that week.
          </p>
          <p className="leading-relaxed">
            Today we're a proper restaurant, but the idea hasn't changed. We source from local
            farms and fishers, grind our own achuete, and cook the dishes we grew up on — just with
            a little more care and a lot more coals. Nothing here is fusion for the sake of it. It's
            Filipino food, cooked well, meant to be shared.
          </p>
          <p className="leading-relaxed">
            <em>Mesa</em> means table. That's the whole point.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-3">
          {[
            { n: '2019', l: 'Founded as a supper club' },
            { n: '30+', l: 'Dishes cooked daily' },
            { n: '4.9★', l: 'From 1,240 diners' },
          ].map((s) => (
            <div key={s.n} className="rounded-lg border border-line bg-card p-6 text-center">
              <p className="font-display text-4xl text-clay">{s.n}</p>
              <p className="mt-1 text-sm text-ink-soft">{s.l}</p>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-wrap justify-center gap-3">
          <LinkButton to="/menu" size="lg">See the menu</LinkButton>
          <LinkButton to="/reservations" variant="outline" size="lg">Reserve a table</LinkButton>
        </div>
      </section>
    </div>
  )
}
