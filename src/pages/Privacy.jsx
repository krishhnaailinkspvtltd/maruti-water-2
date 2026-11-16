import { Link } from 'react-router-dom'
import { company } from '../data/products'
import { Phone, Pin } from '../components/Icons'

/* General privacy policy. Describes only what the site actually does: the
   enquiry form builds a WhatsApp / phone message, the cart lives in the
   browser, and nothing is posted to a server of ours. Keep this in step
   with src/pages/Quote.jsx and src/lib/store.jsx if either changes. */

const UPDATED = 'November 2026'

const SECTIONS = [
  {
    title: 'What we collect',
    body: [
      'We collect information only when you choose to send it to us. That is the name, phone number, location, water source, daily requirement and any notes you type into the quotation form, along with the models you have added to your enquiry list.',
      'We do not ask for payment details, identity documents or bank information anywhere on this site.',
    ],
  },
  {
    title: 'How the enquiry form works',
    body: [
      'The quotation form does not submit to a server of ours. It assembles the details you type into a message that opens in WhatsApp, or that you can read out when you call us. Until you press send, the details stay on your own device.',
      'Once you send that message, it reaches us the same way any WhatsApp message or phone call does, and is handled by WhatsApp under their own terms.',
    ],
  },
  {
    title: 'Information stored in your browser',
    body: [
      'The models you add to an enquiry list are saved in your browser so the list survives a page reload. That data stays on your device, is not sent to us automatically, and clearing your browser storage removes it.',
      'We do not use advertising cookies or third-party trackers on this site.',
    ],
  },
  {
    title: 'How we use what you send',
    body: [
      'To answer your enquiry, size a system, quote a price, and arrange installation or service. Nothing else.',
      'We do not sell, rent or trade your details, and we do not add you to a marketing list without you asking for it.',
    ],
  },
  {
    title: 'Who else sees it',
    body: [
      'Only our own staff, and where a job requires it, the technician or supplier working on your installation. We share details with anyone else only where the law requires it.',
    ],
  },
  {
    title: 'How long we keep it',
    body: [
      'Enquiry messages and customer records are kept while they are useful for servicing and warranty, and removed when they are not. If you want your details deleted, call or message either number below and ask.',
    ],
  },
  {
    title: 'Your choices',
    body: [
      'You can ask us what we hold about you, ask for it to be corrected, or ask for it to be deleted. There is no form to fill in — a phone call or a WhatsApp message to either number is enough.',
    ],
  },
  {
    title: 'Links to other sites',
    body: [
      'Some pages link out to WhatsApp, to maps, or to video hosted elsewhere. Once you follow such a link, that service’s own privacy policy applies, not ours.',
    ],
  },
  {
    title: 'Changes to this policy',
    body: [
      'If what we do changes, this page changes with it, and the date above is updated. The current version is always the one you are reading here.',
    ],
  },
]

export default function Privacy() {
  const { address } = company

  return (
    <>
      <section className="shell pt-6 pb-2">
        <div className="canvas water-field px-5 py-14 md:px-14 md:py-20">
          <p className="eyebrow text-blue-ink">Legal</p>
          <h1 className="display-1 mt-6 max-w-[16ch]">Privacy policy</h1>
          <p className="lede mt-6 max-w-2xl !text-ink/70">
            {company.name} is a water-systems dealer in {address.city}, {address.state}. This page
            explains what this website collects, what we do with it, and how to have it removed.
          </p>
          <p className="mt-6 text-[13.5px] text-muted">Last updated: {UPDATED}</p>
        </div>
      </section>

      <section className="shell py-14 md:py-20">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,320px)] lg:gap-20">
          <div className="max-w-2xl">
            {SECTIONS.map(({ title, body }) => (
              <article key={title} className="border-t border-line pt-7 pb-9 first:border-t-0 first:pt-0">
                <h2 className="font-display text-[21px] leading-tight font-semibold">{title}</h2>
                <div className="mt-3 space-y-4 text-[15.5px] leading-relaxed text-muted">
                  {body.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>
              </article>
            ))}
          </div>

          <aside className="h-max rounded-4xl border border-line bg-mist p-6 md:p-7 lg:sticky lg:top-24">
            <p className="eyebrow text-muted-2">Questions about your data</p>
            <h2 className="mt-3 font-display text-[19px] leading-tight font-semibold">
              Ask us directly.
            </h2>
            <address className="mt-5 flex gap-2.5 text-[13.5px] leading-relaxed text-muted not-italic">
              <Pin size={16} className="mt-0.5 shrink-0 text-blue" />
              <span>
                <strong className="font-semibold text-ink">{company.name}</strong>
                <br />
                {address.line1}
                <br />
                {address.line2}
                <br />
                {address.city} {address.pin}, {address.state}
              </span>
            </address>
            <div className="mt-5 space-y-2">
              {company.contacts.map((c) => (
                <a
                  key={c.phone}
                  href={`tel:+${c.phone}`}
                  className="flex items-center gap-2.5 text-[13.5px] text-muted transition-colors hover:text-ink"
                >
                  <Phone size={15} className="shrink-0 text-blue" />
                  <span className="font-medium text-ink">{c.display}</span>
                  <span className="text-muted-2">{c.name.split(' ')[0]}</span>
                </a>
              ))}
            </div>
            <Link to="/delete-account" className="btn-ghost btn-sm mt-6">
              Delete my data
            </Link>
          </aside>
        </div>
      </section>
    </>
  )
}
