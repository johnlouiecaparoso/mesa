import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from 'react'
import { getItem, activePromotion } from '../data/menu'
import { restaurant } from '../lib/settings'
import { peso } from './format'

export type CartLine = {
  lineId: string
  itemId: string
  qty: number
  variationId?: string
  addOnIds: string[]
  note?: string
}

type Toast = { id: number; message: string }

type StoreCtx = {
  cart: CartLine[]
  addToCart: (line: Omit<CartLine, 'lineId'>) => void
  removeLine: (lineId: string) => void
  setQty: (lineId: string, qty: number) => void
  clearCart: () => void
  cartCount: number
  totals: ReturnType<typeof computeTotals>
  favorites: string[]
  toggleFavorite: (id: string) => void
  isFavorite: (id: string) => boolean
  promoApplied: boolean
  applyPromo: (code: string) => boolean
  clearPromo: () => void
  toasts: Toast[]
  toast: (message: string) => void
}

const Ctx = createContext<StoreCtx | null>(null)

export function linePrice(line: CartLine) {
  const item = getItem(line.itemId)
  if (!item) return 0
  let unit = item.price
  if (line.variationId) {
    const v = item.variations?.find((x) => x.id === line.variationId)
    if (v) unit += v.price
  }
  for (const a of line.addOnIds) {
    const ao = item.addOns?.find((x) => x.id === a)
    if (ao) unit += ao.price
  }
  return unit * line.qty
}

function computeTotals(cart: CartLine[], promoApplied: boolean) {
  const subtotal = cart.reduce((s, l) => s + linePrice(l), 0)
  const discount =
    promoApplied && activePromotion.active
      ? activePromotion.discountType === 'percent'
        ? Math.round((subtotal * activePromotion.discountValue) / 100)
        : activePromotion.discountValue
      : 0
  const taxable = Math.max(0, subtotal - discount)
  const serviceFee = Math.round(taxable * restaurant.serviceFeeRate)
  const tax = Math.round(taxable * restaurant.taxRate)
  const total = taxable + serviceFee + tax
  return { subtotal, discount, serviceFee, tax, total }
}

const load = <T,>(key: string, fallback: T): T => {
  try {
    const raw = localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartLine[]>(() => load('mesa.cart', []))
  const [favorites, setFavorites] = useState<string[]>(() => load('mesa.favorites', []))
  const [promoApplied, setPromoApplied] = useState<boolean>(() => load('mesa.promo', false))
  const [toasts, setToasts] = useState<Toast[]>([])

  useEffect(() => localStorage.setItem('mesa.cart', JSON.stringify(cart)), [cart])
  useEffect(() => localStorage.setItem('mesa.favorites', JSON.stringify(favorites)), [favorites])
  useEffect(() => localStorage.setItem('mesa.promo', JSON.stringify(promoApplied)), [promoApplied])

  const toast = useCallback((message: string) => {
    const id = Date.now() + Math.random()
    setToasts((t) => [...t, { id, message }])
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3200)
  }, [])

  const addToCart: StoreCtx['addToCart'] = (line) => {
    setCart((c) => [...c, { ...line, lineId: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}` }])
    const item = getItem(line.itemId)
    toast(`${item?.name ?? 'Item'} added to cart`)
  }
  const removeLine = (lineId: string) => setCart((c) => c.filter((l) => l.lineId !== lineId))
  const setQty = (lineId: string, qty: number) =>
    setCart((c) => c.map((l) => (l.lineId === lineId ? { ...l, qty: Math.max(1, qty) } : l)))
  const clearCart = () => setCart([])

  const toggleFavorite = (id: string) => {
    setFavorites((f) => {
      const has = f.includes(id)
      toast(has ? 'Removed from favorites' : 'Saved to favorites')
      return has ? f.filter((x) => x !== id) : [...f, id]
    })
  }
  const isFavorite = (id: string) => favorites.includes(id)

  const applyPromo = (code: string) => {
    if (activePromotion.active && code.trim().toUpperCase() === activePromotion.code) {
      setPromoApplied(true)
      toast(`Promo applied — ${activePromotion.discountValue}% off`)
      return true
    }
    toast('That promo code is not valid')
    return false
  }
  const clearPromo = () => setPromoApplied(false)

  const value: StoreCtx = {
    cart,
    addToCart,
    removeLine,
    setQty,
    clearCart,
    cartCount: cart.reduce((s, l) => s + l.qty, 0),
    totals: computeTotals(cart, promoApplied),
    favorites,
    toggleFavorite,
    isFavorite,
    promoApplied,
    applyPromo,
    clearPromo,
    toasts,
    toast,
  }
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useStore() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useStore must be used within StoreProvider')
  return ctx
}

// Simple demo orders/reservations kept in localStorage
export type Order = {
  id: string
  number: string
  name: string
  email: string
  phone: string
  method: string
  pickupDate: string
  pickupTime: string
  notes?: string
  lines: CartLine[]
  total: number
  status: string
  createdAt: string
}

export function saveOrder(order: Order) {
  const orders = load<Order[]>('mesa.orders', [])
  localStorage.setItem('mesa.orders', JSON.stringify([order, ...orders]))
}
export function getOrders() {
  return load<Order[]>('mesa.orders', [])
}
export function getOrder(id: string) {
  return getOrders().find((o) => o.id === id)
}

export type Reservation = {
  id: string
  number: string
  name: string
  email: string
  phone: string
  date: string
  time: string
  partySize: number
  request?: string
  status: string
  createdAt: string
}
export function saveReservation(r: Reservation) {
  const list = load<Reservation[]>('mesa.reservations', [])
  localStorage.setItem('mesa.reservations', JSON.stringify([r, ...list]))
}
export function getReservations() {
  return load<Reservation[]>('mesa.reservations', [])
}

export const summarizeLine = (line: CartLine) => {
  const item = getItem(line.itemId)
  if (!item) return ''
  const parts: string[] = []
  if (line.variationId) {
    const v = item.variations?.find((x) => x.id === line.variationId)
    if (v) parts.push(v.name)
  }
  for (const a of line.addOnIds) {
    const ao = item.addOns?.find((x) => x.id === a)
    if (ao) parts.push(ao.name)
  }
  return parts.join(' · ')
}

export const lineTotalLabel = (line: CartLine) => peso(linePrice(line))
