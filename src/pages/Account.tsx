import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useNavigate } from 'react-router'
import { User, ClipboardList, CalendarCheck, Heart, LogOut } from 'lucide-react'
import { currentUser, initializeAuth, signOut, subscribeToAuth, type AuthUser } from '../lib/auth'
import { getOrders, getReservations, useStore, summarizeLine, lineTotalLabel } from '../lib/store'
import { getItem } from '../data/menu'
import { peso } from '../lib/format'
import { MenuCard } from '../components/MenuCard'
import { Badge, LinkButton } from '../components/ui'

function useUser() {
  const [user, setUser] = useState<AuthUser | null>(currentUser())
  useEffect(() => {
    const h = () => setUser(currentUser())
    initializeAuth()
    const unsubscribe = subscribeToAuth()
    window.addEventListener('mesa-auth', h)
    return () => {
      unsubscribe()
      window.removeEventListener('mesa-auth', h)
    }
  }, [])
  return user
}

const nav = [
  { to: '/account', label: 'Overview', icon: User, end: true },
  { to: '/account/orders', label: 'Orders', icon: ClipboardList },
  { to: '/account/reservations', label: 'Reservations', icon: CalendarCheck },
  { to: '/account/favorites', label: 'Favorites', icon: Heart },
]

export function AccountLayout() {
  const user = useUser()
  const navigate = useNavigate()

  if (!user) {
    return (
      <div className="mx-auto max-w-md px-5 py-28 text-center">
        <h1 className="font-display text-3xl text-ink">Sign in to your account</h1>
        <p className="mt-2 text-ink-soft">View your orders, reservations and favorites.</p>
        <div className="mt-6 flex justify-center gap-3">
          <LinkButton to="/login">Sign in</LinkButton>
          <LinkButton to="/register" variant="outline">Register</LinkButton>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-6xl px-5 py-12 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
        <aside>
          <div className="rounded-lg border border-line bg-card p-5">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-clay text-lg font-medium text-white">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <p className="mt-3 font-display text-lg text-ink">{user.name}</p>
            <p className="text-sm text-ink-soft">{user.email}</p>
          </div>
          <nav className="mt-3 space-y-1">
            {nav.map(({ to, label, icon: Icon, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-md px-4 py-2.5 text-sm font-medium transition ${
                    isActive ? 'bg-ink text-cream' : 'text-ink-soft hover:bg-ink/[0.06]'
                  }`
                }
              >
                <Icon size={17} /> {label}
              </NavLink>
            ))}
            <button
              onClick={() => { signOut(); navigate('/') }}
              className="flex w-full items-center gap-3 rounded-md px-4 py-2.5 text-sm font-medium text-ink-soft transition hover:bg-ink/[0.06]"
            >
              <LogOut size={17} /> Sign out
            </button>
          </nav>
        </aside>
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

function statusTone(s: string) {
  if (['Completed', 'Confirmed', 'Ready for Pickup'].includes(s)) return 'green'
  if (['Cancelled', 'No-show'].includes(s)) return 'red'
  return 'gold'
}

export function AccountHome() {
  const orders = getOrders()
  const reservations = getReservations()
  const { favorites } = useStore()
  const stats = [
    { label: 'Orders', value: orders.length, to: '/account/orders' },
    { label: 'Reservations', value: reservations.length, to: '/account/reservations' },
    { label: 'Favorites', value: favorites.length, to: '/account/favorites' },
  ]
  return (
    <div>
      <h1 className="font-display text-3xl text-ink">Overview</h1>
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {stats.map((s) => (
          <Link key={s.label} to={s.to} className="rounded-lg border border-line bg-card p-6 transition hover:border-clay">
            <p className="font-display text-4xl text-clay">{s.value}</p>
            <p className="mt-1 text-sm text-ink-soft">{s.label}</p>
          </Link>
        ))}
      </div>
      {orders[0] && (
        <div className="mt-8 rounded-lg border border-line bg-card p-6">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-xl text-ink">Latest order</h2>
            <Badge tone={statusTone(orders[0].status)}>{orders[0].status}</Badge>
          </div>
          <p className="mt-2 text-sm text-ink-soft">#{orders[0].number} · {peso(orders[0].total)} · {orders[0].lines.length} items</p>
          <Link to={`/order/${orders[0].id}`} className="mt-3 inline-block text-sm font-medium text-clay hover:underline">View details</Link>
        </div>
      )}
    </div>
  )
}

export function AccountOrders() {
  const orders = getOrders()
  if (!orders.length)
    return <Empty title="No orders yet" body="Your placed orders will appear here." cta="/menu" ctaLabel="Browse menu" />
  return (
    <div>
      <h1 className="font-display text-3xl text-ink">Order history</h1>
      <div className="mt-6 space-y-4">
        {orders.map((o) => (
          <div key={o.id} className="rounded-lg border border-line bg-card p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="font-mono text-sm text-ink">#{o.number}</p>
                <p className="text-xs text-ink-soft">{new Date(o.createdAt).toLocaleString('en-PH')}</p>
              </div>
              <Badge tone={statusTone(o.status)}>{o.status}</Badge>
            </div>
            <ul className="mt-3 space-y-1 border-t border-line pt-3 text-sm">
              {o.lines.map((l) => {
                const item = getItem(l.itemId)
                return (
                  <li key={l.lineId} className="flex justify-between">
                    <span className="text-ink-soft">{l.qty}× {item?.name} {summarizeLine(l) && <span className="text-xs">· {summarizeLine(l)}</span>}</span>
                    <span className="font-mono text-ink-soft">{lineTotalLabel(l)}</span>
                  </li>
                )
              })}
            </ul>
            <div className="mt-3 flex justify-between border-t border-line pt-3">
              <Link to={`/order/${o.id}`} className="text-sm font-medium text-clay hover:underline">Track order</Link>
              <span className="font-mono text-sm font-medium text-ink">{peso(o.total)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function AccountReservations() {
  const [list, setList] = useState(getReservations())
  const { toast } = useStore()
  const cancel = (id: string) => {
    const updated = list.map((r) => (r.id === id ? { ...r, status: 'Cancelled' } : r))
    localStorage.setItem('mesa.reservations', JSON.stringify(updated))
    setList(updated)
    toast('Reservation cancelled')
  }
  if (!list.length)
    return <Empty title="No reservations yet" body="Book a table and it'll show up here." cta="/reservations" ctaLabel="Reserve a table" />
  return (
    <div>
      <h1 className="font-display text-3xl text-ink">Reservations</h1>
      <div className="mt-6 space-y-4">
        {list.map((r) => (
          <div key={r.id} className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-line bg-card p-5">
            <div>
              <p className="font-mono text-sm text-ink">#{r.number}</p>
              <p className="mt-0.5 text-sm text-ink">
                {new Date(r.date).toLocaleDateString('en-PH', { weekday: 'short', month: 'short', day: 'numeric' })} · {r.time} · {r.partySize} guests
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Badge tone={statusTone(r.status)}>{r.status}</Badge>
              {['Pending', 'Confirmed'].includes(r.status) && (
                <button onClick={() => cancel(r.id)} className="text-sm text-ink-soft hover:text-clay-deep">Cancel</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function AccountFavorites() {
  const { favorites } = useStore()
  const items = favorites.map(getItem).filter(Boolean)
  if (!items.length)
    return <Empty title="No favorites yet" body="Tap the heart on any dish to save it here." cta="/menu" ctaLabel="Browse menu" />
  return (
    <div>
      <h1 className="font-display text-3xl text-ink">Favorites</h1>
      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        {items.map((item) => <MenuCard key={item!.id} item={item!} />)}
      </div>
    </div>
  )
}

function Empty({ title, body, cta, ctaLabel }: { title: string; body: string; cta: string; ctaLabel: string }) {
  return (
    <div className="rounded-lg border border-dashed border-line bg-card/50 py-20 text-center">
      <p className="font-display text-2xl text-ink">{title}</p>
      <p className="mt-2 text-ink-soft">{body}</p>
      <LinkButton to={cta} className="mt-6">{ctaLabel}</LinkButton>
    </div>
  )
}
