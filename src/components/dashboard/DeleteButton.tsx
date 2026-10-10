'use client'

import { linkClass } from './styles'

export default function DeleteButton({
  action,
  confirmMessage,
}: {
  action: (formData: FormData) => void | Promise<void>
  confirmMessage: string
}) {
  return (
    <form
      action={action}
      onSubmit={(e) => {
        if (!window.confirm(confirmMessage)) e.preventDefault()
      }}
    >
      <button type="submit" className={`${linkClass} text-foreground/50 hover:text-foreground`}>
        Delete
      </button>
    </form>
  )
}
