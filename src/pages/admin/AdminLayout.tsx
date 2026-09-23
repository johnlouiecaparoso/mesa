import { Link, NavLink, Outlet } from 'react-router'
import {
  LayoutDashboard, ShoppingBag, CalendarCheck, UtensilsCrossed, Tags,
  Percent, FileText, MessageSquare, Users, Settings, ScrollText, ArrowLeft,
} from 'lucide-react'
import { Badge } from '../../components/ui'

type NavItem = { to: string; label: string; icon: typeof LayoutDashboard; end?: boolean }
const groups: { label: string; items: NavItem[] }[] = [
  {
    label: 'Overview',
    items: [{ to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true }],
  },
  {
    label: 'Operations',
    items: [
      { to: '/admin/orders', label: 'Orders', icon: ShoppingBag },
      { to: '/admin/reservations', label: 'Reservations', icon: CalendarCheck },
    ],
  },
  {
    label: 'Menu',
    items: [
      { to: '/admin/menu', label: 'Menu items', icon: UtensilsCrossed },
      { to: '/admin/categories', label: 'Categories', icon: Tags },
      { to: '/admin/promotions', label: 'Promotions', icon: Percent },
    ],
  },
  {
    label: 'Content',
    items: [
      { to: '/admin/content', label: 'Homepage CMS', icon: FileText },
      { to: '/admin/testimonials', label: 'Testimonials', icon: MessageSquare },
      { to: '/admin/subscribers', label: 'Subscribers', icon: Users },
    ],
  },
  {
    label: 'System',
    items: [
      { to: '/admin/settings', label: 'Settings', icon: Settings },
      { to: '/admin/activity', label: 'Activity log', icon: ScrollText },
    ],
  },
]

export function AdminLayout() {
  return (
    <div className="min-h-screen bg-cream lg:grid lg:grid-cols-[264px_1fr]">
      <aside className="hidden border-r border-line bg-card lg:block">
        <div className="sticky top-0 flex h-screen flex-col">
          <div className="flex items-center justify-between border-b border-line px-6 py-5">
            <Link to="/admin" className="flex items-baseline gap-2">
              <span className="font-display text-2xl font-semibold text-ink">Mesa</span>
              <span className="font-mono text-[0.6rem] uppercase tracking-widest text-clay">Admin</span>
            </Link>
          </div>
          <nav className="flex-1 overflow-y-auto px-3 py-4">
            {groups.map((g) => (
              <div key={g.label} className="mb-4">
                <p className="px-3 py-1.5 font-mono text-[0.6rem] uppercase tracking-widest text-ink-soft/70">{g.label}</p>
                {g.items.map(({ to, label, icon: Icon, end }) => (
                  <NavLink
                    key={to}
                    to={to}
                    end={end}
                    className={({ isActive }) =>
                      `flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition ${
                        isActive ? 'bg-clay/10 text-clay-deep' : 'text-ink-soft hover:bg-ink/[0.05] hover:text-ink'
                      }`
                    }
                  >
                    <Icon size={16} /> {label}
                  </NavLink>
                ))}
              </div>
            ))}
          </nav>
          <div className="border-t border-line px-6 py-4">
            <Link to="/" className="flex items-center gap-2 text-sm text-ink-soft hover:text-clay">
              <ArrowLeft size={15} /> Back to site
            </Link>
          </div>
        </div>
      </aside>

      <div className="min-w-0">
        <div className="flex items-center justify-between border-b border-line bg-card px-5 py-3 lg:px-8">
          <div className="flex items-center gap-3 lg:hidden">
            <Link to="/admin" className="font-display text-xl font-semibold text-ink">Mesa</Link>
            <Badge tone="clay">Admin</Badge>
          </div>
          <div className="ml-auto flex items-center gap-3">
            <Badge tone="green">Read-only demo</Badge>
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-ink text-sm font-medium text-cream">M</div>
          </div>
        </div>
        {/* mobile nav */}
        <div className="flex gap-1 overflow-x-auto border-b border-line bg-card px-4 py-2 lg:hidden">
          {groups.flatMap((g) => g.items).map(({ to, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-medium ${isActive ? 'bg-ink text-cream' : 'text-ink-soft'}`
              }
            >
              {label}
            </NavLink>
          ))}
        </div>
        <main className="p-5 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
