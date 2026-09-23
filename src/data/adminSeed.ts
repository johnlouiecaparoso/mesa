import { menuItems } from './menu'

// Deterministic-ish demo analytics for the admin dashboard.
const names = ['Andrea Salcedo', 'Miguel Tan', 'Patricia Reyes', 'Jomar dela Cruz', 'Bea Lim', 'Carlo Ramos', 'Nadine Cruz', 'Paolo Reyes']
const statuses = ['Pending', 'Confirmed', 'Preparing', 'Ready for Pickup', 'Completed']

export type AdminOrder = {
  id: string
  number: string
  customer: string
  time: string
  total: number
  status: string
  itemId: string
}

export function recentOrders(): AdminOrder[] {
  return Array.from({ length: 8 }, (_, i) => {
    const item = menuItems[(i * 3) % menuItems.length]
    return {
      id: 'demo-' + i,
      number: 'M' + (24870 + i * 7),
      customer: names[i % names.length],
      time: `${11 + (i % 9)}:${i % 2 ? '30' : '00'} ${i > 4 ? 'PM' : 'AM'}`,
      total: 280 + i * 145,
      status: statuses[i % statuses.length],
      itemId: item.id,
    }
  })
}

export function upcomingReservations() {
  return Array.from({ length: 6 }, (_, i) => ({
    id: 'r-' + i,
    number: 'R' + (4120 + i),
    customer: names[(i + 2) % names.length],
    partySize: 2 + (i % 5),
    time: ['5:30 PM', '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM', '8:00 PM'][i],
    status: ['Confirmed', 'Pending', 'Confirmed', 'Confirmed', 'Pending', 'Confirmed'][i],
  }))
}

export const ordersOverTime = [
  { day: 'Mon', orders: 42, revenue: 18400 },
  { day: 'Tue', orders: 38, revenue: 16200 },
  { day: 'Wed', orders: 51, revenue: 22800 },
  { day: 'Thu', orders: 47, revenue: 20100 },
  { day: 'Fri', orders: 73, revenue: 34600 },
  { day: 'Sat', orders: 89, revenue: 42300 },
  { day: 'Sun', orders: 64, revenue: 29900 },
]

export const popularItems = [
  { name: 'Chicken Inasal', sold: 148 },
  { name: 'Crispy Pork Belly', sold: 132 },
  { name: 'Sizzling Sisig', sold: 121 },
  { name: 'Kare-Kare', sold: 98 },
  { name: 'Halo-Halo', sold: 87 },
  { name: 'Pancit Bihon', sold: 74 },
]

export const reservationVolume = [
  { day: 'Mon', count: 8 },
  { day: 'Tue', count: 6 },
  { day: 'Wed', count: 11 },
  { day: 'Thu', count: 9 },
  { day: 'Fri', count: 18 },
  { day: 'Sat', count: 24 },
  { day: 'Sun', count: 15 },
]

export const activityLog = [
  { id: 1, who: 'Chef Malou', action: 'marked order #M24905 as Ready for Pickup', time: '2 min ago' },
  { id: 2, who: 'Admin', action: 'updated Chicken Inasal price to ₱320', time: '18 min ago' },
  { id: 3, who: 'Front desk', action: 'confirmed reservation #R4123 (party of 6)', time: '41 min ago' },
  { id: 4, who: 'Admin', action: 'activated promotion MERIENDA15', time: '2 hrs ago' },
  { id: 5, who: 'Chef Malou', action: 'marked Kwek-Kwek as sold out', time: '3 hrs ago' },
]
