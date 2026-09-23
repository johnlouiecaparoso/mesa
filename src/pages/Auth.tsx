import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { signIn, signUp } from '../lib/auth'
import { useStore } from '../lib/store'
import { Button, Field, inputClass, Eyebrow } from '../components/ui'

function AuthShell({ mode }: { mode: 'login' | 'register' }) {
  const nav = useNavigate()
  const { toast } = useStore()
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const isLogin = mode === 'login'

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.email.includes('@') || form.password.length < 6) return toast('Use a valid email and a password with at least 6 characters')

    const result = isLogin
      ? await signIn(form.email, form.password)
      : await signUp(form.email, form.password, form.name || form.email.split('@')[0])

    if (result.error) return toast(result.error.message)
    if (!isLogin && !result.data.session) {
      toast('Account created. Check your email to confirm your account.')
      return
    }
    toast(isLogin ? 'Welcome back!' : 'Account created — welcome to Mesa!')
    nav('/account')
  }

  return (
    <div className="mx-auto flex max-w-md flex-col px-5 py-16">
      <Eyebrow>{isLogin ? 'Welcome back' : 'Join Mesa'}</Eyebrow>
      <h1 className="mt-3 font-display text-4xl text-ink">{isLogin ? 'Sign in' : 'Create account'}</h1>
      <p className="mt-2 text-ink-soft">{isLogin ? 'Access your orders, reservations and favorites.' : 'Save favorites and track every order.'}</p>

      <form onSubmit={submit} className="mt-8 space-y-4 rounded-xl border border-line bg-card p-6">
        {!isLogin && (
          <Field label="Full name"><input className={inputClass} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></Field>
        )}
        <Field label="Email"><input type="email" className={inputClass} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></Field>
        <Field label="Password" hint={isLogin ? 'Forgot it? Reset via email.' : 'At least 6 characters'}>
          <input type="password" className={inputClass} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
        </Field>
        <Button type="submit" size="lg" className="w-full">{isLogin ? 'Sign in' : 'Create account'}</Button>
      </form>

      <p className="mt-6 text-center text-sm text-ink-soft">
        {isLogin ? "Don't have an account? " : 'Already have one? '}
        <Link to={isLogin ? '/register' : '/login'} className="font-medium text-clay hover:underline">
          {isLogin ? 'Register' : 'Sign in'}
        </Link>
      </p>
    </div>
  )
}

export const Login = () => <AuthShell mode="login" />
export const Register = () => <AuthShell mode="register" />
