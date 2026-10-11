import { getCVFresh } from '@/lib/content'
import { saveCVAction } from '@/app/dashboard/actions'
import { fromParagraphs } from '@/lib/text'
import PageHeader from '@/components/dashboard/PageHeader'
import {
  buttonPrimary,
  hintClass,
  inputClass,
  labelClass,
  panelClass,
  panelTitle,
} from '@/components/dashboard/styles'

export default async function PagesEditPage() {
  const cv = await getCVFresh()

  return (
    <>
      <PageHeader title="Pages" meta="About Me, CV and Contact" />

      <form key={JSON.stringify(cv)} action={saveCVAction} className="flex max-w-2xl flex-col gap-10">
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
              One per line, shown on the About Me page. Hidden when empty
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
            Shown on the Contact page; blank links are left out
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
            <span className={hintClass}>Used for search engines, not shown on any page</span>
            <input name="name" defaultValue={cv?.name} required className={inputClass} />
          </label>
        </div>

        <button type="submit" className={buttonPrimary}>
          Save changes
        </button>
      </form>
    </>
  )
}
