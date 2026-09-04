import { getCV } from '@/lib/content'
import { saveCVAction } from '@/app/dashboard/actions'

const inputClass = 'border border-foreground/20 rounded px-3 py-2'

export default async function CVEditPage() {
  const cv = await getCV()

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-lg font-bold">CV page</h1>
      <form action={saveCVAction} className="flex flex-col gap-4 max-w-xl">
        <label className="flex flex-col gap-1 text-sm">
          Name (used for image alt text, not shown on the page)
          <input name="name" defaultValue={cv?.name} required className={inputClass} />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          Download CV — PDF path
          <input name="cvPdfPath" defaultValue={cv?.cvPdfPath} required className={inputClass} />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          About Me (one paragraph per line)
          <textarea
            name="about"
            rows={6}
            defaultValue={cv?.about.join('\n')}
            required
            className={inputClass}
          />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          Clients (one per line)
          <textarea
            name="clients"
            rows={6}
            defaultValue={cv?.clients.join('\n')}
            className={inputClass}
          />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          Email
          <input name="email" type="email" defaultValue={cv?.email} required className={inputClass} />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          LinkedIn URL
          <input name="linkedin" type="url" defaultValue={cv?.socials.linkedin} className={inputClass} />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          Instagram URL
          <input name="instagram" type="url" defaultValue={cv?.socials.instagram} className={inputClass} />
        </label>
        <button type="submit" className="bg-blue text-background rounded px-3 py-2 text-sm w-fit">
          Save
        </button>
      </form>
    </div>
  )
}
