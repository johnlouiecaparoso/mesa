import { RouterProvider } from 'react-router'
import { StoreProvider } from './lib/store'
import { Toasts } from './components/Toasts'
import { router } from './routes'

export default function App() {
  return (
    <StoreProvider>
      <RouterProvider router={router} />
      <Toasts />
    </StoreProvider>
  )
}
