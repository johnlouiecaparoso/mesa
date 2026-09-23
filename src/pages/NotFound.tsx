import { LinkButton } from '../components/ui'

export function NotFound() {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center px-5 py-32 text-center">
      <p className="font-mono text-sm uppercase tracking-widest text-clay">404</p>
      <h1 className="mt-3 font-display text-5xl text-ink">Wala dito</h1>
      <p className="mt-3 text-ink-soft">That page isn't on the menu. Let's get you back to the table.</p>
      <LinkButton to="/" size="lg" className="mt-7">Back home</LinkButton>
    </div>
  )
}
