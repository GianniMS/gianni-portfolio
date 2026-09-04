'use client'

import { useActionState } from 'react'
import { login } from '@/app/dashboard/actions'

export default function LoginPage() {
  const [state, formAction, pending] = useActionState(login, undefined)

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <form action={formAction} className="w-full max-w-sm flex flex-col gap-4">
        <h1 className="font-body text-lg text-foreground">Dashboard login</h1>
        <input
          name="username"
          placeholder="Username"
          required
          autoComplete="username"
          className="border border-foreground/20 rounded px-3 py-2 text-sm text-foreground"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          autoComplete="current-password"
          className="border border-foreground/20 rounded px-3 py-2 text-sm text-foreground"
        />
        {state?.error && <p className="text-sm text-red-600">{state.error}</p>}
        <button
          type="submit"
          disabled={pending}
          className="bg-blue text-background rounded px-3 py-2 text-sm disabled:opacity-50"
        >
          {pending ? 'Signing in…' : 'Sign in'}
        </button>
      </form>
    </div>
  )
}
