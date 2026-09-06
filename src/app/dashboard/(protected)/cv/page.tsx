import { getCV } from '@/lib/content'
import { saveCVAction } from '@/app/dashboard/actions'
import { fromParagraphs } from '@/lib/text'
import {
  buttonPrimary,
  hintClass,
  inputClass,
  labelClass,
  panelClass,
  panelTitle,
} from '@/components/dashboard/styles'

export default async function PagesEditPage() {
  const cv = await getCV()

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold tracking-tight">Pages</h1>
        <p className="text-sm text-foreground/60">
          Text for the About Me, CV and Contact panels
        </p>
      </div>

      <form action={saveCVAction} className="flex max-w-2xl flex-col gap-5">
        <div className={panelClass}>
          <p className={panelTitle}>About Me</p>
          <label className={labelClass}>
            Paragraphs
            <span className={hintClass}>
              Enters are kept as line breaks; a blank line starts a new paragraph
            </span>
            <textarea
              name="about"
              rows={8}
              defaultValue={cv ? fromParagraphs(cv.about) : ''}
              required
              className={inputClass}
            />
          </label>
        </div>

        <div className={panelClass}>
          <p className={panelTitle}>CV</p>
          <label className={labelClass}>
            Download CV — PDF path
            <span className={hintClass}>What the Download CV link points at</span>
            <input name="cvPdfPath" defaultValue={cv?.cvPdfPath} required className={inputClass} />
          </label>
          <label className={labelClass}>
            Involved With
            <span className={hintClass}>
              One per line; shown as one comma-separated line. Hidden when empty
            </span>
            <textarea
              name="involvedWith"
              rows={8}
              defaultValue={cv?.involvedWith.join('\n')}
              className={inputClass}
            />
          </label>
        </div>

        <div className={panelClass}>
          <p className={panelTitle}>Contact</p>
          <span className={hintClass}>
            Also used for the links at the bottom of the mobile menu; blank links are left out
          </span>
          <label className={labelClass}>
            Email
            <input name="email" type="email" defaultValue={cv?.email} required className={inputClass} />
          </label>
          <label className={labelClass}>
            LinkedIn URL
            <input name="linkedin" type="url" defaultValue={cv?.socials.linkedin} className={inputClass} />
          </label>
          <label className={labelClass}>
            Instagram URL
            <input name="instagram" type="url" defaultValue={cv?.socials.instagram} className={inputClass} />
          </label>
        </div>

        <div className={panelClass}>
          <p className={panelTitle}>Metadata</p>
          <label className={labelClass}>
            Name
            <span className={hintClass}>Used for image alt text, not shown on any panel</span>
            <input name="name" defaultValue={cv?.name} required className={inputClass} />
          </label>
        </div>

        <button type="submit" className={`${buttonPrimary} w-fit`}>
          Save changes
        </button>
      </form>
    </div>
  )
}
