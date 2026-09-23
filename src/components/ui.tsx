import { Link } from 'react-router'
import type { ReactNode, ButtonHTMLAttributes } from 'react'

const cx = (...c: (string | false | undefined)[]) => c.filter(Boolean).join(' ')

type Variant = 'primary' | 'outline' | 'ghost' | 'dark'
type Size = 'sm' | 'md' | 'lg'

const base =
  'inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none select-none'
const variants: Record<Variant, string> = {
  primary: 'bg-clay text-white hover:bg-clay-deep shadow-[0_1px_0_rgba(0,0,0,0.05)]',
  outline: 'border border-ink/25 text-ink hover:border-ink hover:bg-ink/[0.03]',
  ghost: 'text-ink hover:bg-ink/[0.06]',
  dark: 'bg-ink text-cream hover:bg-ink/90',
}
const sizes: Record<Size, string> = {
  sm: 'text-sm px-3.5 py-2 rounded-md',
  md: 'text-[0.95rem] px-5 py-2.5 rounded-md',
  lg: 'text-base px-7 py-3.5 rounded-md',
}

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant; size?: Size }) {
  return <button className={cx(base, variants[variant], sizes[size], className)} {...props} />
}

export function LinkButton({
  to,
  variant = 'primary',
  size = 'md',
  className,
  children,
}: {
  to: string
  variant?: Variant
  size?: Size
  className?: string
  children: ReactNode
}) {
  return (
    <Link to={to} className={cx(base, variants[variant], sizes[size], className)}>
      {children}
    </Link>
  )
}

export function Badge({
  children,
  tone = 'neutral',
  className,
}: {
  children: ReactNode
  tone?: 'neutral' | 'clay' | 'olive' | 'gold' | 'muted' | 'red' | 'green'
  className?: string
}) {
  const tones: Record<string, string> = {
    neutral: 'bg-ink/[0.06] text-ink-soft',
    clay: 'bg-clay/10 text-clay-deep',
    olive: 'bg-olive/15 text-olive',
    gold: 'bg-gold/15 text-[#8a5e13]',
    muted: 'bg-ink/[0.06] text-ink-soft',
    red: 'bg-red-100 text-red-800',
    green: 'bg-emerald-100 text-emerald-800',
  }
  return (
    <span
      className={cx(
        'inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium tracking-wide',
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  )
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="font-mono text-xs uppercase tracking-[0.25em] text-clay">{children}</span>
  )
}

export function Field({
  label,
  error,
  children,
  hint,
}: {
  label: string
  error?: string
  hint?: string
  children: ReactNode
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-ink">{label}</span>
      {children}
      {hint && !error && <span className="mt-1 block text-xs text-ink-soft">{hint}</span>}
      {error && <span className="mt-1 block text-xs text-clay-deep">{error}</span>}
    </label>
  )
}

export const inputClass =
  'w-full rounded-md border border-line bg-card px-3.5 py-2.5 text-[0.95rem] text-ink placeholder:text-ink-soft/60 focus:border-clay focus:outline-none focus:ring-2 focus:ring-clay/20 transition'
