import { useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router'
import { ShoppingBag, Menu as MenuIcon, X, User } from 'lucide-react'
import { useStore } from '../lib/store'

const links = [
  { to: '/menu', label: 'Menu' },
  { to: '/order', label: 'Order' },
  { to: '/reservations', label: 'Reservations' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

export function Navbar() {
  const { cartCount } = useStore()
  const [open, setOpen] = useState(false)
  const loc = useLocation()
  const onHome = loc.pathname === '/'

  return (
    <header
      className={`sticky top-0 z-40 border-b border-line/70 backdrop-blur-md ${
        onHome ? 'bg-cream/80' : 'bg-cream/90'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
        <Link to="/" className="flex items-baseline gap-2">
          <span className="font-display text-2xl font-semibold tracking-tight text-ink">Mesa</span>
          <span className="hidden font-mono text-[0.6rem] uppercase tracking-[0.3em] text-clay sm:inline">
            Makati
          </span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors ${
                  isActive ? 'text-clay' : 'text-ink-soft hover:text-ink'
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-1.5">
          <Link
            to="/account"
            aria-label="Account"
            className="hidden h-10 w-10 items-center justify-center rounded-full text-ink-soft transition hover:bg-ink/[0.06] hover:text-ink sm:flex"
          >
            <User size={19} />
          </Link>
          <Link
            to="/order"
            aria-label={`Cart, ${cartCount} items`}
            className="relative flex h-10 w-10 items-center justify-center rounded-full text-ink transition hover:bg-ink/[0.06]"
          >
            <ShoppingBag size={19} />
            {cartCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-clay px-1 font-mono text-[0.65rem] font-medium text-white">
                {cartCount}
              </span>
            )}
          </Link>
          <button
            className="flex h-10 w-10 items-center justify-center rounded-full text-ink lg:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? <X size={20} /> : <MenuIcon size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-line bg-cream px-5 py-3 lg:hidden">
          {[...links, { to: '/account', label: 'Account' }].map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `block py-3 text-base font-medium ${isActive ? 'text-clay' : 'text-ink'}`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  )
}
