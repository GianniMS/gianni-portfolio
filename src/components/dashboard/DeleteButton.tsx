'use client'

import { buttonCompact, buttonDanger } from './styles'

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
      <button type="submit" className={`${buttonDanger} ${buttonCompact}`}>
        Delete
      </button>
    </form>
  )
}
