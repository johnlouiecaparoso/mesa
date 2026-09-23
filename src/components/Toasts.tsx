import { CheckCircle2 } from 'lucide-react'
import { useStore } from '../lib/store'

export function Toasts() {
  const { toasts } = useStore()
  return (
    <div className="pointer-events-none fixed bottom-5 left-1/2 z-[60] flex w-full max-w-sm -translate-x-1/2 flex-col gap-2 px-4">
      {toasts.map((t) => (
        <div
          key={t.id}
          role="status"
          className="animate-toast-in pointer-events-auto flex items-center gap-3 rounded-lg border border-line bg-ink px-4 py-3 text-sm text-cream shadow-xl"
        >
          <CheckCircle2 size={18} className="shrink-0 text-clay" />
          {t.message}
        </div>
      ))}
    </div>
  )
}
