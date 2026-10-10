'use client'

import { useActionState } from 'react'
import { login } from '@/app/dashboard/actions'
import { buttonPrimary, errorClass, inputClass, labelClass } from '@/components/dashboard/styles'

export default function LoginPage() {
  const [state, formAction, pending] = useActionState(login, undefined)

  return (
    <div className="flex min-h-dvh items-center justify-center px-5">
      <form action={formAction} className="flex w-full max-w-sm flex-col gap-5">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl">Dashboard</h1>
          <p className="text-foreground/50">Sign in to manage your content</p>
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

        {state?.error && <p className={errorClass}>{state.error}</p>}

        <button type="submit" disabled={pending} className={buttonPrimary}>
          {pending ? 'Signing in…' : 'Sign in'}
        </button>
      </form>
    </div>
  )
}
