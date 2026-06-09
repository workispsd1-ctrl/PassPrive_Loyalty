import React from 'react'

const LockIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4.5 w-4.5 text-warning">
    <path d="M12 1a5 5 0 0 0-5 5v3H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V11a2 2 0 0 0-2-2h-2V6a5 5 0 0 0-5-5zm3 8H9V6a3 3 0 0 1 6 0v3z" />
  </svg>
)

const BirthdayCakeIllustration = () => (
  <svg viewBox="0 0 100 90" className="h-18 w-22" fill="none">
    <rect x="10" y="48" width="80" height="34" rx="4" fill="rgba(249,115,22,0.12)" stroke="rgba(249,115,22,0.35)" strokeWidth="1.5" />
    <rect x="20" y="56" width="12" height="16" rx="2" fill="rgba(255,255,255,0.06)" stroke="rgba(249,115,22,0.3)" strokeWidth="1.2" />
    <rect x="44" y="56" width="12" height="16" rx="2" fill="rgba(255,255,255,0.06)" stroke="rgba(249,115,22,0.3)" strokeWidth="1.2" />
    <rect x="68" y="56" width="12" height="16" rx="2" fill="rgba(255,255,255,0.06)" stroke="rgba(249,115,22,0.3)" strokeWidth="1.2" />
    <rect x="10" y="43" width="80" height="9" rx="3" fill="rgba(249,115,22,0.18)" stroke="rgba(249,115,22,0.35)" strokeWidth="1.2" />
    <line x1="50" y1="43" x2="50" y2="25" stroke="rgba(249,115,22,0.5)" strokeWidth="2" strokeLinecap="round" />
    <ellipse cx="50" cy="22" rx="3" ry="5" fill="#f97316" opacity="0.9" />
    <ellipse cx="50" cy="18" rx="2" ry="3" fill="#fb923c" opacity="0.7" />
  </svg>
)

const BellIllustration = () => (
  <svg viewBox="0 0 100 90" className="h-18 w-22" fill="none">
    <path d="M50 12 C35 12 24 24 24 40 L24 54 L16 62 L84 62 L76 54 L76 40 C76 24 65 12 50 12Z" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
    <path d="M41 62 C41 67 45 71 50 71 C55 71 59 67 59 62" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.2)" strokeWidth="1.2" />
    <circle cx="66" cy="58" r="9" fill="rgba(249,115,22,0.25)" stroke="rgba(249,115,22,0.6)" strokeWidth="1.5" />
    <circle cx="66" cy="58" r="5" fill="#f97316" opacity="0.8" />
  </svg>
)

const ScratchCardIllustration = () => (
  <svg viewBox="0 0 100 90" className="h-18 w-22" fill="none">
    <rect x="16" y="14" width="52" height="66" rx="4" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
    <circle cx="42" cy="38" rx="9" ry="9" r="9" fill="rgba(249,115,22,0.2)" stroke="rgba(249,115,22,0.5)" strokeWidth="1.5" />
    <rect x="26" y="55" width="32" height="4" rx="2" fill="rgba(255,255,255,0.1)" />
    <rect x="26" y="64" width="22" height="4" rx="2" fill="rgba(255,255,255,0.07)" />
    <path d="M58 50 Q72 42 80 56 Q74 64 66 60Z" fill="#f97316" opacity="0.6" />
  </svg>
)

const MailingIllustration = () => (
  <svg viewBox="0 0 100 90" className="h-18 w-22" fill="none">
    <rect x="10" y="16" width="72" height="50" rx="4" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
    <rect x="10" y="16" width="72" height="12" rx="4" fill="rgba(255,255,255,0.08)" />
    <rect x="10" y="66" width="72" height="6" rx="2" fill="rgba(255,255,255,0.06)" />
    <rect x="24" y="36" width="44" height="4" rx="2" fill="rgba(255,255,255,0.08)" />
    <path d="M42 50 L52 57 L62 50" stroke="#f97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <line x1="52" y1="57" x2="52" y2="44" stroke="#f97316" strokeWidth="2" strokeLinecap="round" />
  </svg>
)

const campaigns = [
  {
    title: 'Birthday Club',
    description: "An automated message and/or reward voucher sent to celebrate your members' special day.",
    illustration: <BirthdayCakeIllustration />,
  },
  {
    title: 'Lapsed Customers',
    description: "An automated Push Notification sent to members' after a certain interval of no stamps engagement.",
    illustration: <BellIllustration />,
  },
  {
    title: 'Scratch & Win',
    description: 'Add a bit of fun with a game based on the idea of a scratch card - but digital!',
    illustration: <ScratchCardIllustration />,
  },
  {
    title: 'Integrate with Mailing Platforms',
    description: 'Automatically add new loyalty contacts to your mailing platform lists, so you can send members EDMs and newsletters.',
    illustration: <MailingIllustration />,
  },
]

export default function CampaignsPage() {
  return (
    <div className="flex flex-col overflow-auto">
      {/* Page header */}
      <div className="flex items-start justify-between px-4 pt-5 pb-4 sm:px-6 sm:pt-8 sm:pb-5 md:px-8">
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">Campaigns</h1>
        <button
          type="button"
          aria-label="Profile"
          className="grid h-9 w-9 place-items-center rounded-full bg-muted text-muted-foreground transition-colors hover:bg-card"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-5 w-5">
            <circle cx="12" cy="8" r="4" />
            <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
          </svg>
        </button>
      </div>

      <div className="flex flex-col gap-4 px-4 pb-8 sm:gap-5 sm:px-6 md:px-8">

        {/* Demo banner */}
        <div className="flex flex-col gap-2 rounded-xl border border-primary/20 bg-accent px-4 py-3 sm:flex-row sm:items-center sm:gap-3 sm:py-2.5">
          <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-primary/20 px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-primary">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="h-3 w-3">
              <rect x="3" y="11" width="18" height="11" rx="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            Demo View
          </span>
          <p className="text-sm text-muted-foreground">
            Create &amp; publish a Stamp Card first to unlock this area with your real functionality.{' '}
            <span className="font-semibold text-foreground">(Available to Pro &amp; Elite plans only).</span>
          </p>
        </div>

        {/* Subtitle */}
        <p className="text-sm text-muted-foreground">
          Create exciting set-and-forget campaigns to engage your loyalty members!
        </p>

        {/* Campaign cards grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {campaigns.map((campaign) => (
            <div
              key={campaign.title}
              className="group relative flex cursor-pointer items-center gap-5 rounded-2xl border border-border bg-card px-6 py-10 backdrop-blur-xl transition-colors hover:border-primary/30 hover:bg-muted"
            >
              {/* Lock */}
              <div className="absolute right-4 top-4">
                <LockIcon />
              </div>

              {/* Illustration */}
              <div className="shrink-0">
                {campaign.illustration}
              </div>

              {/* Text */}
              <div className="pr-4">
                <h3 className="text-sm font-semibold text-foreground">{campaign.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{campaign.description}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}
