import type { AuthChangeEvent, Session } from '@supabase/supabase-js'
import { supabase } from './supabase'

export type AuthUser = { id: string; name: string; email: string }

let cachedUser: AuthUser | null = null

function mapUser(session: Session | null): AuthUser | null {
  if (!session?.user.email) return null
  return {
    id: session.user.id,
    name: session.user.user_metadata.full_name || session.user.email.split('@')[0],
    email: session.user.email,
  }
}

export function currentUser() {
  return cachedUser
}

export async function initializeAuth() {
  const { data } = await supabase.auth.getSession()
  cachedUser = mapUser(data.session)
  window.dispatchEvent(new Event('mesa-auth'))
  return cachedUser
}

export function subscribeToAuth() {
  const { data } = supabase.auth.onAuthStateChange((_event: AuthChangeEvent, session) => {
    cachedUser = mapUser(session)
    window.dispatchEvent(new Event('mesa-auth'))
  })
  return () => data.subscription.unsubscribe()
}

export function signIn(email: string, password: string) {
  return supabase.auth.signInWithPassword({ email, password })
}

export function signUp(email: string, password: string, fullName: string) {
  return supabase.auth.signUp({
    email,
    password,
    options: { data: { full_name: fullName } },
  })
}

export function signOut() {
  return supabase.auth.signOut()
}
