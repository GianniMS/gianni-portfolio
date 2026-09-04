import { getCV } from '@/lib/content'
import { saveCVAction } from '@/app/dashboard/actions'

const inputClass = 'border border-foreground/20 rounded px-3 py-2'

export default async function CVEditPage() {
  const cv = await getCV()

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-lg font-bold">CV / bio</h1>
      <form action={saveCVAction} className="flex flex-col gap-4 max-w-xl">
        <label className="flex flex-col gap-1 text-sm">
          Name
          <input name="name" defaultValue={cv?.name} required className={inputClass} />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          Date of birth
          <input name="dob" defaultValue={cv?.dob} required className={inputClass} />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          Bio (one paragraph per line)
          <textarea
            name="bio"
            rows={6}
            defaultValue={cv?.bio.join('\n')}
            required
            className={inputClass}
          />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          CV PDF path
          <input name="cvPdfPath" defaultValue={cv?.cvPdfPath} required className={inputClass} />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          Email
          <input name="email" type="email" defaultValue={cv?.email} required className={inputClass} />
        </label>
        <button type="submit" className="bg-blue text-background rounded px-3 py-2 text-sm w-fit">
          Save
        </button>
      </form>
    </div>
  )
}
