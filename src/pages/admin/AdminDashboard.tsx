import {
  ResponsiveContainer, AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Cell,
} from 'recharts'
import { TrendingUp, ShoppingBag, CalendarCheck, Users, Clock, DollarSign } from 'lucide-react'
import { ordersOverTime, popularItems, reservationVolume, recentOrders, upcomingReservations } from '../../data/adminSeed'
import { getItem } from '../../data/menu'
import { peso } from '../../lib/format'
import { Badge } from '../../components/ui'

const clay = '#b4472e'
const gold = '#c98a2b'
const olive = '#6b6a3c'

function statusTone(s: string): 'green' | 'gold' | 'red' | 'neutral' {
  if (['Completed', 'Confirmed', 'Ready for Pickup'].includes(s)) return 'green'
  if (['Cancelled', 'No-show'].includes(s)) return 'red'
  return 'gold'
}

const kpis = [
  { label: "Today's orders", value: '64', sub: '+12% vs yesterday', icon: ShoppingBag },
  { label: "Today's revenue", value: peso(29900), sub: '+8% vs yesterday', icon: DollarSign },
  { label: "Today's reservations", value: '15', sub: '5 upcoming', icon: CalendarCheck },
  { label: 'Subscribers', value: '1,284', sub: '+34 this week', icon: Users },
  { label: 'Pending orders', value: '7', sub: 'Needs attention', icon: Clock },
  { label: 'Pending reservations', value: '3', sub: 'Awaiting confirm', icon: TrendingUp },
]

export function AdminDashboard() {
  return (
    <div>
      <h1 className="font-display text-3xl text-ink">Dashboard</h1>
      <p className="mt-1 text-ink-soft">Sunday, live demo snapshot of the restaurant.</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {kpis.map(({ label, value, sub, icon: Icon }) => (
          <div key={label} className="rounded-lg border border-line bg-card p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-ink-soft">{label}</p>
                <p className="mt-1 font-display text-3xl text-ink">{value}</p>
              </div>
              <span className="rounded-md bg-clay/10 p-2 text-clay"><Icon size={18} /></span>
            </div>
            <p className="mt-2 text-xs text-ink-soft">{sub}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card title="Revenue over time">
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={ordersOverTime} margin={{ left: -10, right: 8, top: 8 }}>
              <defs>
                <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={clay} stopOpacity={0.3} />
                  <stop offset="100%" stopColor={clay} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#dfd4c0" vertical={false} />
              <XAxis dataKey="day" stroke="#5c554a" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#5c554a" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `${v / 1000}k`} />
              <Tooltip contentStyle={tooltipStyle} formatter={(v) => peso(Number(v))} />
              <Area type="monotone" dataKey="revenue" stroke={clay} strokeWidth={2.5} fill="url(#rev)" />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Orders over time">
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={ordersOverTime} margin={{ left: -18, right: 8, top: 8 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#dfd4c0" vertical={false} />
              <XAxis dataKey="day" stroke="#5c554a" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#5c554a" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={tooltipStyle} cursor={{ fill: '#efe6d6' }} />
              <Bar dataKey="orders" fill={gold} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Popular menu items">
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={popularItems} layout="vertical" margin={{ left: 40, right: 12 }}>
              <XAxis type="number" hide />
              <YAxis type="category" dataKey="name" width={110} stroke="#5c554a" fontSize={11} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={tooltipStyle} cursor={{ fill: '#efe6d6' }} />
              <Bar dataKey="sold" radius={[0, 4, 4, 0]}>
                {popularItems.map((_, i) => (
                  <Cell key={i} fill={i === 0 ? clay : i < 3 ? gold : olive} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Reservation volume">
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={reservationVolume} margin={{ left: -18, right: 8, top: 8 }}>
              <defs>
                <linearGradient id="res" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={olive} stopOpacity={0.35} />
                  <stop offset="100%" stopColor={olive} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#dfd4c0" vertical={false} />
              <XAxis dataKey="day" stroke="#5c554a" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#5c554a" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={tooltipStyle} />
              <Area type="monotone" dataKey="count" stroke={olive} strokeWidth={2.5} fill="url(#res)" />
            </AreaChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <Card title="Recent orders">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-line text-left text-xs uppercase tracking-wide text-ink-soft">
                  <th className="py-2 font-medium">Customer</th>
                  <th className="py-2 font-medium">Order</th>
                  <th className="py-2 font-medium">Time</th>
                  <th className="py-2 font-medium">Total</th>
                  <th className="py-2 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {recentOrders().map((o) => (
                  <tr key={o.id}>
                    <td className="py-2.5 text-ink">{o.customer}</td>
                    <td className="py-2.5 font-mono text-xs text-ink-soft">#{o.number}</td>
                    <td className="py-2.5 text-ink-soft">{o.time}</td>
                    <td className="py-2.5 font-mono text-ink">{peso(o.total)}</td>
                    <td className="py-2.5"><Badge tone={statusTone(o.status)}>{o.status}</Badge></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card title="Upcoming reservations">
          <ul className="divide-y divide-line">
            {upcomingReservations().map((r) => (
              <li key={r.id} className="flex items-center justify-between py-2.5">
                <div>
                  <p className="text-sm text-ink">{r.customer}</p>
                  <p className="text-xs text-ink-soft">Party of {r.partySize} · {r.time}</p>
                </div>
                <Badge tone={statusTone(r.status)}>{r.status}</Badge>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  )
}

const tooltipStyle = {
  background: '#24201b',
  border: 'none',
  borderRadius: 8,
  color: '#f7f1e6',
  fontSize: 12,
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-line bg-card p-5">
      <h2 className="mb-4 font-display text-lg text-ink">{title}</h2>
      {children}
    </div>
  )
}
