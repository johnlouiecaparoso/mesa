import { createBrowserRouter } from 'react-router'
import { PublicLayout } from './components/PublicLayout'
import { Home } from './pages/Home'
import { Menu } from './pages/Menu'
import { MenuItemPage } from './pages/MenuItem'
import { Order } from './pages/Order'
import { Checkout } from './pages/Checkout'
import { OrderConfirmation } from './pages/OrderConfirmation'
import { Reservations } from './pages/Reservations'
import { About } from './pages/About'
import { Contact } from './pages/Contact'
import { Login, Register } from './pages/Auth'
import {
  AccountLayout, AccountHome, AccountOrders, AccountReservations, AccountFavorites,
} from './pages/Account'
import { NotFound } from './pages/NotFound'
import { AdminLayout } from './pages/admin/AdminLayout'
import { AdminDashboard } from './pages/admin/AdminDashboard'
import {
  AdminOrders, AdminReservations, AdminMenu, AdminCategories, AdminPromotions,
  AdminSubscribers, AdminTestimonials, AdminContent, AdminSettings, AdminActivity,
} from './pages/admin/AdminPages'

export const router = createBrowserRouter([
  {
    path: '/',
    Component: PublicLayout,
    children: [
      { index: true, Component: Home },
      { path: 'menu', Component: Menu },
      { path: 'menu/:id', Component: MenuItemPage },
      { path: 'order', Component: Order },
      { path: 'checkout', Component: Checkout },
      { path: 'order/:id', Component: OrderConfirmation },
      { path: 'reservations', Component: Reservations },
      { path: 'about', Component: About },
      { path: 'contact', Component: Contact },
      { path: 'login', Component: Login },
      { path: 'register', Component: Register },
      {
        path: 'account',
        Component: AccountLayout,
        children: [
          { index: true, Component: AccountHome },
          { path: 'orders', Component: AccountOrders },
          { path: 'reservations', Component: AccountReservations },
          { path: 'favorites', Component: AccountFavorites },
        ],
      },
      { path: '*', Component: NotFound },
    ],
  },
  {
    path: '/admin',
    Component: AdminLayout,
    children: [
      { index: true, Component: AdminDashboard },
      { path: 'orders', Component: AdminOrders },
      { path: 'orders/:id', Component: AdminOrders },
      { path: 'reservations', Component: AdminReservations },
      { path: 'menu', Component: AdminMenu },
      { path: 'categories', Component: AdminCategories },
      { path: 'promotions', Component: AdminPromotions },
      { path: 'content', Component: AdminContent },
      { path: 'testimonials', Component: AdminTestimonials },
      { path: 'subscribers', Component: AdminSubscribers },
      { path: 'settings', Component: AdminSettings },
      { path: 'activity', Component: AdminActivity },
    ],
  },
])
