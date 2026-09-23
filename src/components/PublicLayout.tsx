import { useEffect } from 'react'
import { Outlet, useLocation, ScrollRestoration } from 'react-router'
import { Navbar } from './Navbar'
import { Footer } from './Footer'

export function PublicLayout() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <ScrollRestoration />
    </div>
  )
}
