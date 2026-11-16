import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useStore } from '../lib/store'
import { company } from '../data/products'
import { whatsappLink } from '../lib/format'
import { ArrowRight, Check, Phone, Shield } from '../components/Icons'

/* Account / data deletion request page.

   This site has no sign-in and no online accounts — what the business holds is
   an enquiry record (name, phone, what you asked about) created when you sent
   a message, plus whatever service history followed. So the page does two
   separate things, and keeps them visually separate:

     1. Clears the data this browser is holding. Instant, local, nobody asked.
     2. Hands you a written deletion request addressed to the business, sent
        the same way every other enquiry here is sent.

   Keep in step with src/pages/Privacy.jsx. */

const KEEPS = [
  ['Your enquiry record', 'Name, phone number, the models you asked about and our replies.', true],
  ['Service history', 'Installation and service visits logged against your phone number.', true],
  ['This browser’s data', 'The enquiry list and comparison list saved on this device.', true],
  [
    'Tax and warranty records',
    'Invoices and warranty paperwork we are required to keep for a statutory period. These cannot be deleted on request, and are not used to contact you.',
    false,
  ],
]

export default function DeleteAccount() {
  const { count, compare, clear, clearCompare, setToast } = useStore()
  const [form, setForm] = useState({ name: '', phone: '', notes: '' })
  const [wiped, setWiped] = useState(false)

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  /* A request with no phone number cannot be matched to a record, so it is
     worse than useless — it reads as handled while deleting nothing. */
  const digits = form.phone.replace(/\D/g, '')
  const ready = digits.length >= 10

  const localCount = count + compare.length

  const wipeLocal = () => {
    clear()
    clearCompare()
    setWiped(true)
    setToast('This browser’s saved data has been cleared')
  }

  const request = [
    'Hello, I would like my data deleted.',
    '',
    `Name: ${form.name || '—'}`,
    `Phone on record: ${form.phone}`,
    form.notes ? `\nNotes: ${form.notes}` : null,
    '',
    'Please delete my enquiry record and service history, and confirm once it is done.',
  ]
    .filter((l) => l !== null)
    .join('\n')

  const primary = company.contacts[0]

  return (
    <>
      <section className="shell pt-6 pb-2">
        <div className="canvas water-field px-5 py-14 md:px-14 md:py-20">
          <p className="eyebrow text-blue-ink">Your data</p>
          <h1 className="display-1 mt-6 max-w-[18ch]">Delete your account and data</h1>
          <p className="lede mt-6 max-w-2xl !text-ink/70">
            This site has no sign-in, so there is no account to close. What {company.name} holds is
            an enquiry record against your phone number. Ask here and we will delete it.
          </p>
        </div>
      </section>

      {/* step one — local data, no request needed */}
      <section className="shell py-14 md:pt-20 md:pb-10">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,380px)] lg:gap-16">
          <div>
            <p className="eyebrow text-muted-2">Step one</p>
            <h2 className="display-2 mt-4 max-w-lg">Clear what this browser is holding.</h2>
            <p className="mt-5 max-w-xl text-[15.5px] leading-relaxed text-muted">
              Your enquiry list and comparison list are saved on this device, not on a server. You
              can remove them yourself, right now, without asking anyone.
            </p>
          </div>

          <div className="h-max rounded-4xl border border-line bg-mist p-6 md:p-7">
            {wiped ? (
              <p className="flex items-start gap-2.5 text-[14.5px] leading-relaxed text-muted">
                <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-blue text-white">
                  <Check size={14} />
                </span>
                Cleared. Nothing from this site is left saved in this browser.
              </p>
            ) : (
              <>
                <p className="font-display text-[15px] font-semibold">
                  {localCount > 0
                    ? `${localCount} saved item${localCount === 1 ? '' : 's'} on this device`
                    : 'Nothing saved on this device'}
                </p>
                <p className="mt-2 text-[13.5px] leading-relaxed text-muted">
                  Clearing this cannot be undone, and does not send us anything.
                </p>
                <button
                  onClick={wipeLocal}
                  disabled={localCount === 0}
                  className="btn-ghost btn-sm mt-5 disabled:cursor-not-allowed disabled:opacity-45"
                >
                  Clear saved data
                </button>
              </>
            )}
          </div>
        </div>
      </section>

      {/* step two — the request */}
      <section className="shell py-14 md:py-20">
        <div className="canvas bg-mist px-6 py-12 md:px-14 md:py-16">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <p className="eyebrow text-muted-2">Step two</p>
              <h2 className="display-2 mt-4 max-w-md">Ask us to delete your record.</h2>
              <p className="mt-5 max-w-md text-[15.5px] leading-relaxed text-muted">
                We match records by phone number, so give us the number you contacted us on. The
                form below writes the request — nothing is sent until you press the button.
              </p>

              <ul className="mt-8 space-y-4">
                {KEEPS.map(([title, body, deleted]) => (
                  <li key={title} className="flex gap-3">
                    <span
                      className={`mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full ${
                        deleted ? 'bg-blue text-white' : 'border border-line bg-white text-muted-2'
                      }`}
                    >
                      {deleted ? <Check size={14} /> : <Shield size={13} />}
                    </span>
                    <span>
                      <span className="block font-display text-[15px] font-semibold">{title}</span>
                      <span className="mt-1 block text-[13.5px] leading-relaxed text-muted">
                        {body}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>

              <p className="mt-7 text-[13.5px] leading-relaxed text-muted">
                We aim to action deletion requests within 30 days, and confirm on the same number
                once it is done.
              </p>
            </div>

            <div className="h-max rounded-4xl border border-line bg-white p-6 md:p-7">
              <div className="grid gap-4">
                <label className="block">
                  <span className="eyebrow text-muted-2">Your name</span>
                  <input
                    value={form.name}
                    onChange={set('name')}
                    className="field mt-2"
                    placeholder="Name as we have it"
                  />
                </label>
                <label className="block">
                  <span className="eyebrow text-muted-2">Phone number on record *</span>
                  <input
                    value={form.phone}
                    onChange={set('phone')}
                    type="tel"
                    inputMode="tel"
                    className="field mt-2"
                    placeholder="+91 90816 46465"
                  />
                </label>
                <label className="block">
                  <span className="eyebrow text-muted-2">Anything to add</span>
                  <textarea
                    value={form.notes}
                    onChange={set('notes')}
                    rows={3}
                    className="field mt-2 resize-y"
                    placeholder="Optional"
                  />
                </label>
              </div>

              {ready ? (
                <div className="mt-6 flex flex-wrap gap-3">
                  <a
                    href={whatsappLink(primary.phone, request)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary btn-sm"
                  >
                    <Phone size={15} /> Send on WhatsApp
                  </a>
                  <a href={`tel:+${primary.phone}`} className="btn-ghost btn-sm">
                    Call instead
                  </a>
                </div>
              ) : (
                <p className="mt-6 text-[13px] leading-relaxed text-muted-2">
                  Enter the phone number we hold your record under to send the request.
                </p>
              )}

              <p className="mt-5 border-t border-line pt-5 text-[12.5px] leading-relaxed text-muted-2">
                The request opens in WhatsApp addressed to {primary.display}. You can read it before
                sending, and edit it if anything is wrong.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="shell pb-20">
        <Link to="/privacy" className="btn-ghost">
          Read the privacy policy <ArrowRight size={17} />
        </Link>
      </section>
    </>
  )
}
