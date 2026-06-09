const PushNotificationIllustration = () => (
  <svg viewBox="0 0 120 140" className="h-28 w-24" fill="none">
    {/* Phone body */}
    <rect x="25" y="10" width="70" height="120" rx="10" fill="var(--color-muted)" stroke="var(--color-border)" strokeWidth="1.5" />
    {/* Screen */}
    <rect x="32" y="22" width="56" height="88" rx="4" fill="var(--color-card)" />
    {/* Notch */}
    <rect x="45" y="10" width="30" height="6" rx="3" fill="var(--color-border)" />
    {/* Notification card on screen */}
    <rect x="37" y="30" width="46" height="28" rx="4" fill="var(--color-primary)" fillOpacity="0.12" stroke="var(--color-primary)" strokeOpacity="0.3" strokeWidth="1" />
    {/* Bell icon */}
    <circle cx="46" cy="41" r="5" fill="var(--color-primary)" fillOpacity="0.25" />
    <path d="M43.5 41a2.5 2.5 0 0 1 5 0v2h-5v-2z" fill="var(--color-primary)" />
    <path d="M44.5 43.5a1.5 1.5 0 0 0 3 0" stroke="var(--color-primary)" strokeWidth="0.8" />
    {/* Notification text lines */}
    <rect x="54" y="37" width="24" height="3" rx="1.5" fill="var(--color-foreground)" fillOpacity="0.5" />
    <rect x="54" y="42" width="18" height="2.5" rx="1.25" fill="var(--color-muted-foreground)" fillOpacity="0.5" />
    {/* Content lines below notification */}
    <rect x="37" y="66" width="46" height="3" rx="1.5" fill="var(--color-border)" />
    <rect x="37" y="72" width="38" height="3" rx="1.5" fill="var(--color-border)" />
    <rect x="37" y="78" width="42" height="3" rx="1.5" fill="var(--color-border)" />
    {/* Home button */}
    <circle cx="60" cy="118" r="5" fill="var(--color-border)" />
  </svg>
)

const SmsIllustration = () => (
  <svg viewBox="0 0 120 140" className="h-28 w-24" fill="none">
    {/* Phone body */}
    <rect x="25" y="10" width="70" height="120" rx="10" fill="var(--color-muted)" stroke="var(--color-border)" strokeWidth="1.5" />
    {/* Screen */}
    <rect x="32" y="22" width="56" height="88" rx="4" fill="var(--color-card)" />
    {/* Notch */}
    <rect x="45" y="10" width="30" height="6" rx="3" fill="var(--color-border)" />
    {/* Incoming message bubble */}
    <rect x="37" y="30" width="34" height="18" rx="6" fill="var(--color-success)" fillOpacity="0.18" stroke="var(--color-success)" strokeOpacity="0.3" strokeWidth="1" />
    <rect x="41" y="35" width="22" height="2.5" rx="1.25" fill="var(--color-success)" fillOpacity="0.6" />
    <rect x="41" y="40" width="16" height="2.5" rx="1.25" fill="var(--color-success)" fillOpacity="0.4" />
    {/* Outgoing message bubble */}
    <rect x="49" y="56" width="34" height="18" rx="6" fill="var(--color-primary)" fillOpacity="0.18" stroke="var(--color-primary)" strokeOpacity="0.3" strokeWidth="1" />
    <rect x="53" y="61" width="22" height="2.5" rx="1.25" fill="var(--color-primary)" fillOpacity="0.6" />
    <rect x="53" y="66" width="16" height="2.5" rx="1.25" fill="var(--color-primary)" fillOpacity="0.4" />
    {/* Incoming message bubble 2 */}
    <rect x="37" y="82" width="28" height="14" rx="5" fill="var(--color-success)" fillOpacity="0.18" stroke="var(--color-success)" strokeOpacity="0.3" strokeWidth="1" />
    <rect x="41" y="86" width="18" height="2.5" rx="1.25" fill="var(--color-success)" fillOpacity="0.5" />
    <rect x="41" y="91" width="12" height="2.5" rx="1.25" fill="var(--color-success)" fillOpacity="0.35" />
    {/* Home button */}
    <circle cx="60" cy="118" r="5" fill="var(--color-border)" />
  </svg>
)

const LockBadge = () => (
  <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" stroke="var(--color-warning)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
)

export default function CommunicationsPage() {
  return (
    <div className="flex flex-col overflow-auto">
      {/* Header */}
      <div className="flex items-start justify-between px-4 pt-5 pb-4 sm:px-6 sm:pt-8 sm:pb-5 md:px-8">
        <div>
          <h1 className="text-2xl font-bold text-foreground sm:text-3xl">Communications</h1>
          {/* Demo banner */}
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-primary/20 px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-primary">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="h-3 w-3">
                <rect x="3" y="11" width="18" height="11" rx="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              Demo View
            </span>
            <p className="text-sm text-muted-foreground">
              Create &amp; publish a Stamp Card first to unlock this area with your real functionality.{' '}
              <span className="font-semibold text-primary">Pro &amp; Elite plans</span> only.
            </p>
          </div>
        </div>
        <button
          type="button"
          aria-label="Profile"
          className="ml-4 grid h-9 w-9 shrink-0 place-items-center rounded-full bg-muted text-muted-foreground transition-colors hover:bg-card"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-5 w-5">
            <circle cx="12" cy="8" r="4" />
            <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
          </svg>
        </button>
      </div>

      <div className="flex flex-col gap-6 px-4 pb-8 sm:px-6 md:px-8">
        <p className="text-sm font-semibold text-foreground">Send a new message</p>

        {/* Channel cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:gap-6">

          {/* Push notification */}
          <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-6 backdrop-blur-xl transition-colors hover:border-primary/30 sm:p-8">
            {/* Lock badge */}
            <div className="absolute right-4 top-4">
              <LockBadge />
            </div>

            <div className="flex flex-col items-center gap-4 text-center">
              <PushNotificationIllustration />
              <div>
                <h2 className="text-lg font-bold text-foreground">Push notification</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Send free &amp; unlimited push notification (with or without reward voucher attached) through the PassPrivé App, direct to member&apos;s pockets!
                </p>
              </div>
            </div>
          </div>

          {/* SMS */}
          <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-6 backdrop-blur-xl transition-colors hover:border-primary/30 sm:p-8">
            {/* Lock badge */}
            <div className="absolute right-4 top-4">
              <LockBadge />
            </div>

            <div className="flex flex-col items-center gap-4 text-center">
              <SmsIllustration />
              <div>
                <h2 className="text-lg font-bold text-foreground">SMS</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Activate SMS to communicate with loyalty members via text message.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
