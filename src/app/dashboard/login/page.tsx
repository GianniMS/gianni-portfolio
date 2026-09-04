'use client'

import { useActionState } from 'react'
import { login } from '@/app/dashboard/actions'
import { buttonPrimary, inputClass, labelClass } from '@/components/dashboard/styles'

export default function LoginPage() {
  const [state, formAction, pending] = useActionState(login, undefined)

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6 text-foreground">
      <form action={formAction} className="flex w-full max-w-sm flex-col gap-5">
        <div className="flex flex-col gap-1">
          <p className="text-blue text-lg font-bold tracking-tight">Dashboard</p>
          <h1 className="text-sm text-foreground/60">Sign in to manage your content</h1>
        </div>

        <label className={labelClass}>
          Username
          <input name="username" required autoComplete="username" className={inputClass} />
        </label>

        <label className={labelClass}>
          Password
          <input
            name="password"
            type="password"
            required
            autoComplete="current-password"
            className={inputClass}
          />
        </label>

        {state?.error && (
          <p className="border-l-2 border-blue bg-foreground/5 px-3 py-2 text-sm">{state.error}</p>
        )}

        <button type="submit" disabled={pending} className={buttonPrimary}>
          {pending ? 'Signing in…' : 'Sign in'}
        </button>
      </form>
    </div>
  )
}
