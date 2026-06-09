'use client'

import React, { useState } from 'react'

export default function HelpPage() {
  // Navigation states: 'main' | 'how-works' | 'setup-card' | 'features' | 'stamp-methods' | 'security' | 'billing'
  const [currentView, setCurrentView] = useState<'main' | 'how-works' | 'setup-card' | 'features' | 'stamp-methods' | 'security' | 'billing'>('main')

  // Accordion state for FAQs and feature expansions
  const [activeFaq, setActiveFaq] = useState<string | null>(null)

  // Sub-feature detail view state for 'features' view
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null)

  // Video Modal State
  const [videoModal, setVideoModal] = useState<{ isOpen: boolean; title: string; videoId: string } | null>(null)

  const toggleFaq = (faqId: string) => {
    setActiveFaq(activeFaq === faqId ? null : faqId)
  }

  const featureDetails: Record<string, {
    title: string
    subtitle: string
    description: string
    pdfTitle: string
    pdfDesc: string
    mockType: 'phone-notification' | 'phone-sms' | 'scratch-card' | 'workflow'
    mockData: any
    faqs: Array<{ id: string, q: string, a: string }>
  }> = {
    'pf-1': {
      title: 'Birthday Club',
      subtitle: 'Ensure every loyal customer feels celebrated on their special day with our Birthday Club feature.',
      description: 'It automatically sends a feel-good message and optional reward voucher on or before their special day.',
      pdfTitle: 'Birthday Club one-pager',
      pdfDesc: 'This one-pager guide introduces the Birthday Club campaign and how it works.',
      mockType: 'phone-notification',
      mockData: {
        appName: 'PassPrivé',
        time: '9:41 AM',
        message: 'Happy Birthday! Stop into Coffee Folks today for FREE coffee and pastry of your choice! 🥳🎂'
      },
      faqs: [
        { id: 'fc-1', q: 'What is the Birthday Club?', a: 'The Birthday Club is an automated marketing feature that detects a member\'s birthday and sends them a customizable message and reward voucher.' },
        { id: 'fc-2', q: 'What is the benefit of a Birthday Club?', a: 'It builds strong customer goodwill, increases visit frequency during their birthday week, and drives high redemption rates.' }
      ]
    },
    'pf-2': {
      title: 'Lapsed Customers',
      subtitle: 'Our Lapsed Customer feature automatically contacts inactive customers, encouraging them to return.',
      description: 'Set inactivity rules (e.g. 30 days without visits) to automatically push special coupons or reminders directly to their phone pass wallets.',
      pdfTitle: 'Lapsed Customers one-pager',
      pdfDesc: 'Learn how to setup automation rules to re-engage inactive customers.',
      mockType: 'phone-notification',
      mockData: {
        appName: 'PassPrivé',
        time: '10:00 AM',
        message: 'We miss you! It\'s been a while since your last coffee. Here is a 50% discount voucher to welcome you back! ☕️❤️'
      },
      faqs: [
        { id: 'fc-3', q: 'What counts as a lapsed customer?', a: 'A lapsed customer is a member who has not collected a stamp or visited your store within a user-defined threshold (e.g., 30, 60, or 90 days).' },
        { id: 'fc-4', q: 'How to prevent spamming returning users?', a: 'The system automatically excludes members who have active visits, and limits re-engagement triggers to once every 6 months per customer.' }
      ]
    },
    'pf-3': {
      title: 'Scratch & Win',
      subtitle: 'Spice up your loyalty program with Scratch & Win games. It\'s a digital twist on traditional scratch cards.',
      description: 'Distribute temporary digital scratch cards onto customer phones. They swipe to instantly reveal hidden discount codes, stamp multipliers, or mystery gifts.',
      pdfTitle: 'Scratch & Win campaign guide',
      pdfDesc: 'Guide to setting up win rates, sweepstakes rules, and gift inventory.',
      mockType: 'scratch-card',
      mockData: {
        prize: 'YOU WON: 3 FREE STAMPS! 🎉'
      },
      faqs: [
        { id: 'fc-5', q: 'How do customers receive scratch cards?', a: 'You can reward them automatically when they reach a certain stamp threshold, or distribute game codes via SMS/Push broadcast campaigns.' },
        { id: 'fc-6', q: 'Can I customize the winning probabilities?', a: 'Yes, the console allows you to define exact winning odds, maximum daily payouts, and list of available rewards (e.g., free items, extra stamps).' }
      ]
    },
    'pf-4': {
      title: 'Communications',
      subtitle: 'Engage your customers with our Push Notifications and SMS features, sending offers, updates, or a friendly hello.',
      description: 'Draft templates and send broadcast notifications directly to all members, or filter by specific storefront branches, stamp thresholds, or active tiers.',
      pdfTitle: 'Communications one-pager',
      pdfDesc: 'This guide introduces our Push Notification feature and how it works.',
      mockType: 'phone-sms',
      mockData: {
        sender: 'PassPrivé',
        time: '2:15 PM',
        message: 'Double Stamp Tuesday! Get twice the stamps on all drinks purchased before 6 PM today! ⚡️☕️'
      },
      faqs: [
        { id: 'fc-7', q: 'What does a PassPrivé push notification look like?', a: 'It appears as a rich banner notification on the user\'s home screen, branded with your loyalty card\'s name and icon.' },
        { id: 'fc-8', q: 'What does an SMS text sent look like?', a: 'It arrives as a direct text message from your registered merchant sender ID containing your offer text and card link.' },
        { id: 'fc-9', q: 'What are the PassPrivé push notifications?', a: 'Free push alerts sent directly to users who have installed your digital loyalty pass in their Apple Wallet or Google Wallet.' },
        { id: 'fc-10', q: 'What are the PassPrivé SMS messages?', a: 'Short text messages sent directly to your members\' phone numbers, useful for users who haven\'t enabled push notifications.' },
        { id: 'fc-11', q: 'What plans include push notifications and SMS messages?', a: 'Push notifications are included in all paid subscription tiers. SMS packages are available as add-ons based on destination count.' },
        { id: 'fc-12', q: 'SMS text message charges on PassPrivé', a: 'SMS messages are billed on a pay-as-you-go flat rate per message depending on the target country\'s carrier networks.' }
      ]
    },
    'pf-5': {
      title: 'Mailing integrations',
      subtitle: 'PassPrivé can be seamlessly integrated with your favorite marketing and CRM platforms via Zapier.',
      description: 'Sync new signups directly onto Mailchimp, HubSpot, Salesforce, or Google Sheets to build complex cross-channel loyalty marketing grids automatically.',
      pdfTitle: 'Integrations guide',
      pdfDesc: 'A complete walkthrough of API configurations, webhook triggers, and Zapier setups.',
      mockType: 'workflow',
      mockData: {
        steps: ['PassPrivé API', 'Zapier Connector', 'Mailchimp / HubSpot']
      },
      faqs: [
        { id: 'fc-13', q: 'What apps can PassPrivé be integrated with?', a: 'Via our Zapier connector, you can link with over 3,000+ popular applications, including Mailchimp, HubSpot, ActiveCampaign, Salesforce, and Klaviyo.' },
        { id: 'fc-14', q: 'How does the mailing integration work?', a: 'Every time a new customer registers for your loyalty program, their details (name, email, phone) are automatically sent to your mailing list.' },
        { id: 'fc-15', q: 'How do I integrate PassPrivé with Mailchimp?', a: 'Log into your Zapier account, select PassPrivé as the trigger app (\'New Customer Added\'), and select Mailchimp as the action app (\'Add Subscriber\').' },
        { id: 'fc-16', q: 'How to send a welcome email to new program members', a: 'Configure a welcome automation sequence in your CRM platform triggered immediately whenever a new contact is added to your loyalty list.' }
      ]
    }
  }

  const [selectedStampMethod, setSelectedStampMethod] = useState<string | null>(null)

  const stampMethodDetails: Record<string, {
    title: string
    subtitle: string
    description: string
    pdfTitle: string
    pdfDesc: string
    mockType: 'stamppod' | 'stamptag' | 'textcodes' | 'qrcodes' | 'tempcode' | 'console'
    faqs: Array<{ id: string, q: string, a: string }>
  }> = {
    'sm-1': {
      title: 'StampPod™',
      subtitle: 'The StampPod™ is a battery-powered beacon device that issues stamps via contactless tap technology.',
      description: 'It requires no power cables or internet connection. By emitting a secure, close-range Bluetooth signal, customers simply tap their mobile wallet passes against the physical pod to receive stamps instantly at checkout.',
      pdfTitle: 'StampPod guide',
      pdfDesc: 'This guide introduces the StampPod hardware configuration, battery lifespan, and storefront setup instructions.',
      mockType: 'stamppod',
      faqs: [
        { id: 'sm-faq-1', q: 'How does a StampPod connect?', a: 'It requires no local WiFi or power cables. It uses internal beacon transmitters to emit secure Bluetooth sync triggers to nearby passes.' },
        { id: 'sm-faq-2', q: 'How long does the battery last?', a: 'The built-in lithium cell operates for over 3 years without replacement under daily store traffic.' }
      ]
    },
    'sm-2': {
      title: 'Stamp Tag',
      subtitle: 'Stamp Tags are highly portable NFC stickers or badges used by staff to issue stamps by tapping the client\'s screen.',
      description: 'Perfect for restaurants, table service, or mobile staff. Cashiers simply tap the pocket-sized NFC tag against the customer\'s screen, prompting the mobile pass to register a stamp in real-time.',
      pdfTitle: 'Stamp Tag guide',
      pdfDesc: 'Learn how to bind tags to cashier PINs, manage location parameters, and prevent unauthorized usage.',
      mockType: 'stamptag',
      faqs: [
        { id: 'sm-faq-3', q: 'Do customers need their app open?', a: 'No, the NFC chip inside the tag triggers a push action directly onto the customer\'s phone pass even from the locked home screen.' },
        { id: 'sm-faq-4', q: 'Can tags be cloned or stolen?', a: 'No, each tag runs encrypted, merchant-locked signing keys. If a tag is lost, it can be immediately disabled from the console.' }
      ]
    },
    'sm-3': {
      title: 'OneStamps - Text Codes',
      subtitle: 'Single-use text codes printed on product labels or customer receipts.',
      description: 'Customers manually type a unique 6-character alphanumeric code inside their mobile pass wallet to claim points. Perfect for takeaway orders, packaging labels, or deliveries.',
      pdfTitle: 'OneStamps Text guide',
      pdfDesc: 'A complete walkthrough of generating bulk text codes, configuring validation rules, and printer templates.',
      mockType: 'textcodes',
      faqs: [
        { id: 'sm-faq-5', q: 'Can a customer claim the same code multiple times?', a: 'No, every generated code is checked against database tables and automatically invalidated upon single use.' },
        { id: 'sm-faq-6', q: 'Can codes expire?', a: 'Yes, you can configure expiration settings from hours to weeks depending on store campaign rules.' }
      ]
    },
    'sm-4': {
      title: 'OneStamps - QR Codes',
      subtitle: 'Single-use QR codes printed on product labels, packaging, or receipts.',
      description: 'Similar to text codes, but much faster. Customers scan the unique QR code using their device camera to instantly add a stamp. Once scanned, the QR code immediately becomes invalid.',
      pdfTitle: 'OneStamps QR guide',
      pdfDesc: 'Learn how to export QR code batches, set print layouts, and integrate with POS thermal printers.',
      mockType: 'qrcodes',
      faqs: [
        { id: 'sm-faq-7', q: 'How are OneStamps QR codes generated?', a: 'You can export batches of unique QR codes as PNG images to print directly on custom product stickers or paper receipts.' },
        { id: 'sm-faq-8', q: 'What happens if a customer shares the code?', a: 'The second scan attempt returns an "Already Claimed" error, preventing double stamp fraud.' }
      ]
    },
    'sm-5': {
      title: 'Temporary Stamp Code',
      subtitle: 'A dynamic, auto-refreshing QR code displayed on client-facing screens or checkout tablets.',
      description: 'The console generates a QR code that automatically regenerates every 30 seconds. Customers scan it with their camera at checkout to collect their stamps, ensuring codes cannot be screenshot or shared.',
      pdfTitle: 'Temporary QR guide',
      pdfDesc: 'Setting up customer-facing screens, configuring dynamic refresh intervals, and POS integration guides.',
      mockType: 'tempcode',
      faqs: [
        { id: 'sm-faq-9', q: 'How fast does the temporary code refresh?', a: 'Every 30 seconds the terminal regenerates the encryption vector, ensuring screenshot sharing is useless.' },
        { id: 'sm-faq-10', q: 'What hardware is required?', a: 'Any tablet or screen facing the customers at POS linked to your merchant console dashboard.' }
      ]
    },
    'sm-6': {
      title: 'Merchant Console',
      subtitle: 'Award or redeem stamps manually from your merchant dashboard terminal.',
      description: 'Cashiers search for the customer\'s name, email, or pass ID directly inside this dashboard console and click to add stamps or validate rewards instantly. Ideal for telephone orders or overrides.',
      pdfTitle: 'Merchant Console guide',
      pdfDesc: 'Quick reference guide for cashiers on searching members, manual stamp adjustments, and reward validation.',
      mockType: 'console',
      faqs: [
        { id: 'sm-faq-11', q: 'How do cashiers access the console?', a: 'Via a secure web URL on any cashier terminal, tablet, or phone using authorized staff PIN logins.' },
        { id: 'sm-faq-12', q: 'Can cashiers deduct points or adjust stamps manually?', a: 'Yes, admin users can adjust balances, correct cashier input errors, or redeem card vouchers manually.' }
      ]
    }
  }

  const splitIntoColumns = <T,>(arr: T[]): [T[], T[]] => {
    return [
      arr.filter((_, idx) => idx % 2 === 0),
      arr.filter((_, idx) => idx % 2 !== 0)
    ]
  }

  const platformHelp = [
    {
      title: 'How PassPrivé Works',
      description: 'Learn the ins and outs of PassPrivé. Recommended for getting started.',
      onClick: () => setCurrentView('how-works'),
      icon: (
        <svg className="h-5.5 w-5.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
      )
    },
    {
      title: 'Setting up your loyalty card',
      description: 'Learn how to create a loyalty card that works for your business and wows your customers.',
      onClick: () => setCurrentView('setup-card'),
      icon: (
        <svg className="h-5.5 w-5.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4.5 16.5c-1.5 1.25-2.5 3.5-2.5 3.5s2.25-1 3.5-2.5" />
          <path d="M12 2C6.5 2 2 6.5 2 12c0 1.2.2 2.4.6 3.4L7 11h4v4l-4.4 4.4C7.6 19.8 8.8 20 10 20c5.5 0 10-4.5 10-10C20 4.5 15.5 2 12 2z" />
          <path d="M19 5l-4 4" />
        </svg>
      )
    },
    {
      title: 'Platform features',
      description: 'Explore features that enhance your program with automated engagement campaigns and customer communication.',
      onClick: () => setCurrentView('features'),
      icon: (
        <svg className="h-5.5 w-5.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12.83 2.18a2 2 0 0 0-1.66 0L3.6 5.57a2 2 0 0 0-1.2 1.83v10.2c0 .77.44 1.48 1.2 1.83l7.57 3.39a2 2 0 0 0 1.66 0l7.57-3.39a2 2 0 0 0 1.2-1.83V7.4a2 2 0 0 0-1.2-1.83l-7.57-3.39z" />
          <path d="M12 22V12" />
          <path d="M12 12L3.6 7.8" />
          <path d="M12 12l8.4-4.2" />
        </svg>
      )
    },
    {
      title: 'Stamp methods',
      description: 'Learn the different ways you can distribute stamps to your customers.',
      onClick: () => setCurrentView('stamp-methods'),
      icon: (
        <svg className="h-5.5 w-5.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="5" y="15" width="14" height="6" rx="2" />
          <path d="M12 3c-3 0-5 2-5 5v7h10V8c0-3-2-5-5-5z" />
          <line x1="12" y1="3" x2="12" y2="15" />
        </svg>
      )
    }
  ]

  const accountHelp = [
    {
      title: 'Security, policies & compliance',
      description: 'See all of our policy and compliance documents.',
      onClick: () => setCurrentView('security'),
      icon: (
        <svg className="h-5.5 w-5.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
      )
    },
    {
      title: 'Account and billing',
      description: 'Find out how to manage your account and billing.',
      onClick: () => setCurrentView('billing'),
      icon: (
        <svg className="h-5.5 w-5.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <line x1="2" y1="10" x2="22" y2="10" />
        </svg>
      )
    }
  ]

  const caseStudies = [
    {
      title: 'Cafes',
      imageUrl: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=600'
    },
    {
      title: 'Bars & restaurants',
      imageUrl: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&q=80&w=600'
    },
    {
      title: 'Hair & beauty',
      imageUrl: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=600'
    },
    {
      title: 'Nutrition',
      imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=600'
    },
    {
      title: 'Retail',
      imageUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=600'
    },
    {
      title: 'Services',
      imageUrl: 'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?auto=format&fit=crop&q=80&w=600'
    }
  ]

  const renderDocumentMockup = (featureId: string | null, title: string) => {
    // Determine color theme based on feature
    let themeClass = "bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-900/50"
    let drawing = <span className="text-sm">✉️</span>

    if (featureId === 'pf-1') { // Birthday
      themeClass = "bg-rose-100 text-rose-800 border-rose-200 dark:bg-rose-950/30 dark:text-rose-400 dark:border-rose-900/50"
      drawing = <span className="text-sm">🎂</span>
    } else if (featureId === 'pf-2') { // Lapsed
      themeClass = "bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-950/30 dark:text-orange-400 dark:border-orange-900/50"
      drawing = <span className="text-sm">⏰</span>
    } else if (featureId === 'pf-3') { // Scratch & Win
      themeClass = "bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-950/30 dark:text-purple-400 dark:border-purple-900/50"
      drawing = <span className="text-sm">🏆</span>
    } else if (featureId === 'pf-4') { // Communications
      themeClass = "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-950/30 dark:text-blue-400 dark:border-blue-900/50"
      drawing = <span className="text-sm">💬</span>
    } else if (featureId === 'pf-5') { // Mailing integrations
      themeClass = "bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-900/50"
      drawing = (
        <div className="flex items-center gap-1">
          <div className="w-3.5 h-3.5 rounded-full bg-neutral-900 dark:bg-neutral-800 flex items-center justify-center text-[7px] shadow-xs">🐒</div>
          <div className="flex gap-0.5 text-[5px] text-neutral-300">···</div>
          <div className="w-3.5 h-3.5 rounded-full bg-emerald-600 flex items-center justify-center text-[7px] shadow-xs">✉️</div>
        </div>
      )
    }

    return (
      <div className="w-[125px] h-[165px] bg-white dark:bg-neutral-800 border border-neutral-100 dark:border-neutral-700 shadow-lg rounded-md p-2 flex flex-col gap-1.5 overflow-hidden select-none">
        {/* Paper Header */}
        <div className="flex items-center justify-between border-b border-neutral-100 dark:border-neutral-700 pb-1">
          <span className="text-[6px] font-black text-neutral-800 dark:text-neutral-200 flex items-center gap-0.5">
            <span className="h-1 w-1 rounded-full bg-primary" />
            PassPrivé
          </span>
          <span className="text-[4px] text-neutral-400">One-pager</span>
        </div>

        {/* Title Banner */}
        <div className={`py-1 px-1 rounded-sm text-center border ${themeClass} flex flex-col gap-0.5`}>
          <div className="text-[5px] font-black tracking-wide leading-none">{title}</div>
        </div>

        {/* Content stripes */}
        <div className="flex flex-col gap-1 mt-0.5">
          <div className="h-1 bg-neutral-100 dark:bg-neutral-700 rounded-full w-full" />
          <div className="h-1 bg-neutral-100 dark:bg-neutral-700 rounded-full w-[85%]" />
          <div className="h-1 bg-neutral-50 dark:bg-neutral-800 rounded-full w-[95%]" />
        </div>

        {/* Drawing */}
        <div className="flex-1 flex items-center justify-center mt-1">
          {drawing}
        </div>

        {/* Footer */}
        <div className="h-1 bg-neutral-50 dark:bg-neutral-700 rounded-xs w-full flex items-center justify-between px-1">
          <div className="h-[2px] bg-neutral-200 dark:bg-neutral-600 rounded-full w-4" />
          <div className="h-[2px] w-[2px] rounded-full bg-neutral-300" />
        </div>
      </div>
    )
  }

  // Shared "Need more help?" card component
  const NeedMoreHelpSection = () => (
    <section className="pt-6">
      <div className="relative p-8 rounded-3xl border border-border bg-card/60 backdrop-blur-xl text-center flex flex-col items-center shadow-xl hover:shadow-primary/5 hover:border-primary/30 transition-all duration-500 overflow-hidden">
        {/* Scattered background SVGs */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.04] dark:opacity-[0.02] text-foreground select-none">
          {/* Globe - left top */}
          <svg className="absolute left-8 top-6 h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>
          {/* Present - left middle */}
          <svg className="absolute left-16 bottom-8 h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><rect x="3" y="8" width="18" height="13" rx="2" /><path d="M12 8V3M12 8h-4a2 2 0 0 1 0-4h4m0 4h4a2 2 0 0 0 0-4h-4M12 8v13M3 12h18" /></svg>
          {/* Crown - right top */}
          <svg className="absolute right-12 top-6 h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7z" /></svg>
          {/* Envelope - right middle */}
          <svg className="absolute right-20 bottom-8 h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M3 6l9 6 9-6" /></svg>
        </div>

        {/* Content */}
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-teal-50 dark:bg-teal-950/30 text-teal-600 dark:text-teal-400 mb-4 border border-teal-100 dark:border-teal-900/50 shadow-inner">
          <span className="text-xl font-bold">?</span>
        </div>
        <h3 className="text-lg font-bold text-foreground">Need more help?</h3>
        <p className="text-xs text-muted-foreground mt-2 max-w-sm leading-relaxed">
          Contact us at <a href="mailto:support@passprive.com" className="text-primary hover:underline font-semibold">support@passprive.com</a> for any queries or talk with our experts to get the solution you&apos;re looking for.
        </p>
        <a
          href="mailto:support@passprive.com"
          className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary-600 text-primary-foreground text-xs font-bold rounded-xl transition-all shadow-md shadow-primary/20 hover:scale-[1.02] active:scale-95 cursor-pointer"
        >
          Contact Support
          <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
        </a>
      </div>
    </section>
  )

  return (
    <>
      {/* Header */}
      <header className="flex h-16 items-center justify-between border-b border-border bg-card/40 px-6 backdrop-blur-xl shrink-0 z-10">
        <div>
          <h1 className="text-base font-semibold text-foreground">Help & Support</h1>
          <p className="text-xs text-muted-foreground">Bloom Café · Assistance and guidance</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            Live
          </span>
          <span className="grid h-8 w-8 place-items-center rounded-full bg-primary/15 text-sm font-semibold text-primary">B</span>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 space-y-8 p-6 overflow-auto">

        {/* Render View 1: Main Support Home */}
        {currentView === 'main' && (
          <>
            {/* Intro Banner */}
            <div className="max-w-4xl">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">Help & Support</h2>
              <p className="text-sm text-muted-foreground mt-2">
                Find answers, get support, and make the most of your PassPrivé loyalty program.
              </p>
            </div>

            {/* Section 1: Learn about the platform */}
            <section className="space-y-4">
              <h3 className="text-base font-bold text-foreground uppercase tracking-wider text-primary">Learn about the platform</h3>
              <div className="grid gap-4 sm:grid-cols-2">
                {platformHelp.map((item) => (
                  <div
                    key={item.title}
                    onClick={item.onClick}
                    className="flex items-start justify-between p-5 bg-card border border-border rounded-2xl hover:border-primary/40 hover:bg-muted/30 transition-all duration-300 group cursor-pointer"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary group-hover:scale-105 transition-transform duration-300">
                        {item.icon}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">{item.title}</h4>
                        <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">{item.description}</p>
                      </div>
                    </div>
                    <span className="text-muted-foreground/50 group-hover:text-primary group-hover:translate-x-0.5 transition-all self-center ml-2">
                      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6" /></svg>
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* Section 2: Account management */}
            <section className="space-y-4">
              <h3 className="text-base font-bold text-foreground uppercase tracking-wider text-primary">Account management</h3>
              <div className="grid gap-4 sm:grid-cols-2">
                {accountHelp.map((item) => (
                  <div
                    key={item.title}
                    onClick={item.onClick}
                    className="flex items-start justify-between p-5 bg-card border border-border rounded-2xl hover:border-primary/40 hover:bg-muted/30 transition-all duration-300 group cursor-pointer"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary group-hover:scale-105 transition-transform duration-300">
                        {item.icon}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">{item.title}</h4>
                        <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">{item.description}</p>
                      </div>
                    </div>
                    <span className="text-muted-foreground/50 group-hover:text-primary group-hover:translate-x-0.5 transition-all self-center ml-2">
                      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6" /></svg>
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* Section 3: View our knowledge base */}
            <section className="space-y-4">
              <h3 className="text-base font-bold text-foreground uppercase tracking-wider text-primary">View our knowledge base</h3>
              <div className="max-w-2xl">
                <div className="flex items-start justify-between p-5 bg-card border border-border rounded-2xl hover:border-primary/40 hover:bg-muted/30 transition-all duration-300 group cursor-pointer">
                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary group-hover:scale-105 transition-transform duration-300">
                      <svg className="h-5.5 w-5.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" />
                        <path d="M8 12h8" />
                        <path d="M12 8v8" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">Help Center</h4>
                      <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
                        Couldn&apos;t find what you were looking for? Our Help Center has the answers.
                      </p>
                    </div>
                  </div>
                  <span className="text-muted-foreground/50 group-hover:text-primary group-hover:translate-x-0.5 transition-all self-center ml-2">
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6" /></svg>
                  </span>
                </div>
              </div>
            </section>

            {/* Section 4: Case studies */}
            <section className="space-y-4 border-t border-border pt-6">
              <div>
                <div className="flex justify-between items-center">
                  <h3 className="text-base font-bold text-foreground uppercase tracking-wider text-primary">Case studies</h3>
                  <button className="text-xs font-semibold text-primary hover:underline flex items-center gap-1 cursor-pointer">
                    View more <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6" /></svg>
                  </button>
                </div>
                <p className="text-xs text-muted-foreground mt-1.5">
                  Learn how other businesses in your industry are using PassPrivé to drive repeat visits and increase sales.
                </p>
              </div>

              <div className="grid gap-4 grid-cols-2 md:grid-cols-3">
                {caseStudies.map((cs) => (
                  <div
                    key={cs.title}
                    className="flex flex-col overflow-hidden bg-card border border-border rounded-2xl hover:border-primary/40 hover:bg-muted/30 transition-all duration-300 group cursor-pointer shadow-sm hover:shadow-lg hover:shadow-primary/5"
                  >
                    <div className="relative h-40 w-full overflow-hidden bg-muted/40 border-b border-border">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={cs.imageUrl}
                        alt={cs.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-background/40 to-transparent pointer-events-none" />
                    </div>
                    <div className="flex items-center justify-between p-4 bg-muted/5">
                      <span className="text-xs font-bold text-foreground group-hover:text-primary transition-colors">{cs.title}</span>
                      <span className="text-muted-foreground/60 group-hover:text-primary transition-colors group-hover:translate-x-0.5 transition-all">
                        <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6" /></svg>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <NeedMoreHelpSection />
          </>
        )}

        {/* Render View 2: How PassPrivé Works */}
        {currentView === 'how-works' && (
          <div className="space-y-8 animate-fade-up">

            {/* Back to main portal link */}
            <div>
              <button
                onClick={() => { setCurrentView('main'); setActiveFaq(null); }}
                className="flex items-center gap-1.5 text-xs font-bold text-primary hover:underline cursor-pointer mb-3 select-none"
              >
                <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15 18 9 12 15 6" /></svg>
                Help & Support
              </button>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">How PassPrivé works</h2>
              <p className="text-xs text-muted-foreground mt-2 max-w-2xl leading-relaxed">
                Learn the ins and outs of PassPrivé. Find detailed information on how our platform works, access helpful resources, and find answers to common questions about getting started.
              </p>
            </div>

            {/* Resources Grid */}
            <section className="space-y-4">
              <h3 className="text-base font-bold text-foreground uppercase tracking-wider text-primary">Resources</h3>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {/* Intro Video */}
                <div className="flex flex-col rounded-2xl border border-border bg-card p-4 backdrop-blur-xl">
                  <div className="relative aspect-video rounded-xl bg-linear-to-br from-primary-900/40 via-muted to-primary-600/10 border border-border flex items-center justify-center overflow-hidden group">
                    <span className="absolute top-2 left-2 rounded bg-primary/20 px-2 py-0.5 text-[9px] font-bold text-primary uppercase tracking-wide flex items-center gap-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                      Video
                    </span>
                    <button
                      onClick={() => setVideoModal({ isOpen: true, title: 'Introduction video', videoId: 'dQw4w9WgXcQ' })}
                      className="h-12 w-12 rounded-full bg-primary/95 text-primary-foreground flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300 cursor-pointer"
                    >
                      <svg className="h-5.5 w-5.5 fill-current ml-0.5" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                    </button>
                  </div>
                  <h4 className="text-xs font-bold text-foreground mt-3.5">Introduction video</h4>
                  <p className="text-[11px] text-muted-foreground mt-2 leading-relaxed flex-1">
                    See PassPrivé&apos;s core features and benefits in this engaging intro.
                  </p>
                  <div className="flex items-center justify-between border-t border-border mt-3.5 pt-3">
                    <select className="bg-transparent text-[10px] text-muted-foreground font-semibold border-none focus:outline-none">
                      <option>English</option>
                      <option>French</option>
                    </select>
                    <button
                      onClick={() => setVideoModal({ isOpen: true, title: 'Introduction video', videoId: 'dQw4w9WgXcQ' })}
                      className="px-3.5 py-1.5 bg-primary text-primary-foreground rounded-lg text-[10px] font-bold flex items-center gap-1 hover:bg-primary-600 transition-colors cursor-pointer"
                    >
                      <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                      Play Video
                    </button>
                  </div>
                </div>

                {/* Info Booklet */}
                <div className="flex flex-col rounded-2xl border border-border bg-card p-4 backdrop-blur-xl">
                  <div className="relative aspect-video rounded-xl bg-linear-to-br from-indigo-900/30 via-muted to-primary-900/10 border border-border flex flex-col items-center justify-center overflow-hidden">
                    <span className="absolute top-2 left-2 rounded bg-indigo-500/15 px-2 py-0.5 text-[9px] font-bold text-indigo-400 uppercase tracking-wide">
                      PDF
                    </span>
                    <div className="text-center p-4">
                      <p className="text-xs font-extrabold uppercase tracking-widest text-primary">PASSPRIVÉ</p>
                      <p className="text-[9px] text-muted-foreground mt-1 uppercase font-bold tracking-wider">Digital Loyalty booklet</p>
                    </div>
                  </div>
                  <h4 className="text-xs font-bold text-foreground mt-3.5">Information booklet</h4>
                  <p className="text-[11px] text-muted-foreground mt-2 leading-relaxed flex-1">
                    Learn about all of PassPrivé&apos;s features and benefits in our detailed booklet.
                  </p>
                  <div className="flex items-center justify-between border-t border-border mt-3.5 pt-3">
                    <select className="bg-transparent text-[10px] text-muted-foreground font-semibold border-none focus:outline-none">
                      <option>English</option>
                      <option>French</option>
                    </select>
                    <button onClick={() => alert('Downloading Booklet PDF...')} className="px-3.5 py-1.5 bg-primary text-primary-foreground rounded-lg text-[10px] font-bold flex items-center gap-1 hover:bg-primary-600 transition-colors cursor-pointer">
                      <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
                      Download
                    </button>
                  </div>
                </div>

                {/* Demo Webinar */}
                <div className="flex flex-col rounded-2xl border border-border bg-card p-4 backdrop-blur-xl">
                  <div className="relative aspect-video rounded-xl bg-linear-to-br from-emerald-900/30 via-muted to-primary-900/10 border border-border flex items-center justify-center overflow-hidden group">
                    <span className="absolute top-2 left-2 rounded bg-emerald-500/15 px-2 py-0.5 text-[9px] font-bold text-emerald-400 uppercase tracking-wide">
                      Video
                    </span>
                    <button
                      onClick={() => setVideoModal({ isOpen: true, title: 'Demo webinar', videoId: 'dQw4w9WgXcQ' })}
                      className="h-12 w-12 rounded-full bg-primary/95 text-primary-foreground flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300 cursor-pointer"
                    >
                      <svg className="h-5.5 w-5.5 fill-current ml-0.5" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                    </button>
                  </div>
                  <h4 className="text-xs font-bold text-foreground mt-3.5">Demo webinar</h4>
                  <p className="text-[11px] text-muted-foreground mt-2 leading-relaxed flex-1">
                    Join our webinar for a guided tour of PassPrivé and its loyalty-building tools.
                  </p>
                  <div className="flex items-center justify-between border-t border-border mt-3.5 pt-3">
                    <select className="bg-transparent text-[10px] text-muted-foreground font-semibold border-none focus:outline-none">
                      <option>English</option>
                      <option>French</option>
                    </select>
                    <button
                      onClick={() => setVideoModal({ isOpen: true, title: 'Demo webinar', videoId: 'dQw4w9WgXcQ' })}
                      className="px-3.5 py-1.5 bg-primary text-primary-foreground rounded-lg text-[10px] font-bold flex items-center gap-1 hover:bg-primary-600 transition-colors cursor-pointer"
                    >
                      <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                      Play Video
                    </button>
                  </div>
                </div>

                {/* Program Guide */}
                <div className="flex flex-col rounded-2xl border border-border bg-card p-4 backdrop-blur-xl">
                  <div className="relative aspect-video rounded-xl bg-linear-to-br from-purple-900/30 via-muted to-primary-900/10 border border-border flex flex-col items-center justify-center overflow-hidden">
                    <span className="absolute top-2 left-2 rounded bg-purple-500/15 px-2 py-0.5 text-[9px] font-bold text-purple-400 uppercase tracking-wide">
                      PDF
                    </span>
                    <div className="text-center p-3">
                      <p className="text-[10px] font-bold text-foreground">ALLIANCE & PASSPORT</p>
                      <p className="text-[9px] text-muted-foreground mt-0.5 font-semibold">Program guide</p>
                    </div>
                  </div>
                  <h4 className="text-xs font-bold text-foreground mt-3.5">Alliance & passport program guide</h4>
                  <p className="text-[11px] text-muted-foreground mt-2 leading-relaxed flex-1">
                    Learn about PassPrivé&apos;s Alliance & Passport Programs in this guide.
                  </p>
                  <div className="flex items-center justify-between border-t border-border mt-3.5 pt-3">
                    <span className="text-[10px] text-muted-foreground font-bold">English PDF</span>
                    <button onClick={() => alert('Downloading Alliance Guide PDF...')} className="px-3.5 py-1.5 bg-primary text-primary-foreground rounded-lg text-[10px] font-bold flex items-center gap-1 hover:bg-primary-600 transition-colors cursor-pointer">
                      <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
                      Download
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* Help Center (FAQ) Accordion Grid */}
            <section className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-base font-bold text-foreground uppercase tracking-wider text-primary">Help Center</h3>
                <span className="text-[11px] text-muted-foreground font-semibold">Taps to expand Q&A answers</span>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 items-start">
                {splitIntoColumns([
                  { id: 'hw-1', q: 'What is PassPrivé?', a: 'PassPrivé is an advanced digital loyalty card program that replaces paper punch cards with slick mobile device passes, designed to drive customer retention.' },
                  { id: 'hw-2', q: 'Who does PassPrivé work for?', a: 'PassPrivé is designed for local coffee shops, cafes, bars, restaurants, hair salons, spa centers, retail stores, and service providers.' },
                  { id: 'hw-3', q: 'Is there a free trial?', a: 'Yes! We offer a 14-day free trial so you can design stamp cards, test communication campaigns, and check dashboard functionality.' },
                  { id: 'hw-4', q: 'How do people join?', a: 'Customers join instantly by scanning a unique QR code at checkout, downloading their pass, or through automated invite campaigns.' },
                  { id: 'hw-5', q: 'How do people get stamps?', a: 'Stamps are awarded via this business dashboard (using the "Give Stamps" card), by scanning a customer\'s pass code, or inputting merchant PINs.' },
                  { id: 'hw-6', q: 'How do people redeem rewards?', a: 'When a customer completes a card, they unlock a reward voucher. Cashiers can redeem the reward from the dashboard, or tap the customer\'s phone pass to validate.' }
                ]).map((col, colIdx) => (
                  <div key={colIdx} className="flex flex-col gap-3">
                    {col.map(faq => {
                      const isOpen = activeFaq === faq.id
                      return (
                        <div
                          key={faq.id}
                          onClick={() => toggleFaq(faq.id)}
                          className="border border-border rounded-2xl bg-card hover:border-primary/40 transition-all overflow-hidden cursor-pointer"
                        >
                          <div className="flex items-center justify-between p-4.5">
                            <span className="text-xs font-bold text-foreground">{faq.q}</span>
                            <span className={`text-muted-foreground/60 transition-transform duration-300 ${isOpen ? 'rotate-90 text-primary' : ''}`}>
                              <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6" /></svg>
                            </span>
                          </div>
                          {isOpen && (
                            <div className="px-4.5 pb-4.5 text-xs text-muted-foreground border-t border-border/40 pt-3 leading-relaxed animate-fade-up bg-muted/5">
                              {faq.a}
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                ))}
              </div>
            </section>

            <NeedMoreHelpSection />
          </div>
        )}

        {/* Render View 3: Setting Up Your Loyalty Card */}
        {currentView === 'setup-card' && (
          <div className="space-y-8 animate-fade-up">

            {/* Header / Intro */}
            <div>
              <button
                onClick={() => { setCurrentView('main'); setActiveFaq(null); }}
                className="flex items-center gap-1.5 text-xs font-bold text-primary hover:underline cursor-pointer mb-3 select-none"
              >
                <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15 18 9 12 15 6" /></svg>
                Help & Support
              </button>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">Setting up Your Loyalty Card</h2>
              <p className="text-xs text-muted-foreground mt-2 max-w-2xl leading-relaxed">
                Learn how to create a loyalty card that works for your business and wows your customers.
              </p>
            </div>

            {/* Resources grid */}
            <section className="space-y-4">
              <h3 className="text-base font-bold text-foreground uppercase tracking-wider text-primary">Resources</h3>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {/* Setup Video */}
                <div className="flex flex-col rounded-2xl border border-border bg-card p-4 backdrop-blur-xl">
                  <div className="relative aspect-video rounded-xl bg-linear-to-br from-primary-900/40 via-muted to-primary-600/10 border border-border flex items-center justify-center overflow-hidden group">
                    <span className="absolute top-2 left-2 rounded bg-primary/20 px-2 py-0.5 text-[9px] font-bold text-primary uppercase tracking-wide">
                      Video
                    </span>
                    <button
                      onClick={() => setVideoModal({ isOpen: true, title: 'How to build a Stamp Card video', videoId: 'dQw4w9WgXcQ' })}
                      className="h-12 w-12 rounded-full bg-primary/95 text-primary-foreground flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300 cursor-pointer"
                    >
                      <svg className="h-5.5 w-5.5 fill-current ml-0.5" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                    </button>
                  </div>
                  <h4 className="text-xs font-bold text-foreground mt-3.5">How to build a Stamp Card video</h4>
                  <p className="text-[11px] text-muted-foreground mt-2 leading-relaxed flex-1">
                    Watch our quick video to learn the step-by-step process of building your PassPrivé loyalty card.
                  </p>
                  <div className="flex items-center justify-end border-t border-border mt-3.5 pt-3">
                    <button
                      onClick={() => setVideoModal({ isOpen: true, title: 'How to build a Stamp Card video', videoId: 'dQw4w9WgXcQ' })}
                      className="px-3.5 py-1.5 bg-primary text-primary-foreground rounded-lg text-[10px] font-bold flex items-center gap-1 hover:bg-primary-600 transition-colors cursor-pointer"
                    >
                      <svg className="h-3 w-3 fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                      Play Video
                    </button>
                  </div>
                </div>

                {/* Design Guide Booklet */}
                <div className="flex flex-col rounded-2xl border border-border bg-card p-4 backdrop-blur-xl">
                  <div className="relative aspect-video rounded-xl bg-linear-to-br from-indigo-900/30 via-muted to-primary-900/10 border border-border flex flex-col items-center justify-center overflow-hidden">
                    <span className="absolute top-2 left-2 rounded bg-indigo-500/15 px-2 py-0.5 text-[9px] font-bold text-indigo-400 uppercase tracking-wide">
                      PDF
                    </span>
                    <div className="text-center p-4">
                      <p className="text-[10px] font-extrabold uppercase tracking-widest text-primary">STAMP CARD</p>
                      <p className="text-[9px] text-muted-foreground mt-1 uppercase font-bold tracking-wider">Design Guide</p>
                    </div>
                  </div>
                  <h4 className="text-xs font-bold text-foreground mt-3.5">Stamp Card design guide</h4>
                  <p className="text-[11px] text-muted-foreground mt-2 leading-relaxed flex-1">
                    Create visually appealing loyalty cards that stand out. Our design guide offers tips and best practices.
                  </p>
                  <div className="flex items-center justify-between border-t border-border mt-3.5 pt-3">
                    <select className="bg-transparent text-[10px] text-muted-foreground font-semibold border-none focus:outline-none">
                      <option>English</option>
                      <option>French</option>
                    </select>
                    <button onClick={() => alert('Downloading Design Guide PDF...')} className="px-3.5 py-1.5 bg-primary text-primary-foreground rounded-lg text-[10px] font-bold flex items-center gap-1 hover:bg-primary-600 transition-colors cursor-pointer">
                      <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
                      Download
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* FAQ Subsections */}

            {/* Subsection A: Design FAQs */}
            <section className="space-y-4 border-t border-border pt-6">
              <h3 className="text-base font-bold text-foreground uppercase tracking-wider text-primary">Design FAQs</h3>
              <div className="grid gap-3 sm:grid-cols-2 items-start">
                {splitIntoColumns([
                  { id: 'su-1', q: 'Can I set up multiple Stamp Cards?', a: 'Yes! You can run multiple stamp cards simultaneously, such as a standard coffee stamp card alongside a VIP card.' },
                  { id: 'su-2', q: 'What can be customized on a Stamp Card?', a: 'You can customize colors, stamp icons, reward descriptions, brand logo images, merchant locations, and active periods.' },
                  { id: 'su-3', q: 'How to make changes to a Stamp Card or reward', a: 'Go to the "Stamp Cards" tab in the sidebar, select your active card, edit fields, and save changes. Your customers\' passes will update automatically.' },
                  { id: 'su-4', q: 'How to change the logo on a Stamp Card?', a: 'Within the Stamp Card editor workspace, upload your high-resolution logo under the "Brand styling" tab.' }
                ]).map((col, colIdx) => (
                  <div key={colIdx} className="flex flex-col gap-3">
                    {col.map(faq => {
                      const isOpen = activeFaq === faq.id
                      return (
                        <div
                          key={faq.id}
                          onClick={() => toggleFaq(faq.id)}
                          className="border border-border rounded-2xl bg-card hover:border-primary/40 transition-all overflow-hidden cursor-pointer"
                        >
                          <div className="flex items-center justify-between p-4.5">
                            <span className="text-xs font-bold text-foreground">{faq.q}</span>
                            <span className={`text-muted-foreground/60 transition-transform duration-300 ${isOpen ? 'rotate-90 text-primary' : ''}`}>
                              <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6" /></svg>
                            </span>
                          </div>
                          {isOpen && (
                            <div className="px-4.5 pb-4.5 text-xs text-muted-foreground border-t border-border/40 pt-3 leading-relaxed animate-fade-up bg-muted/5">
                              {faq.a}
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                ))}
              </div>
            </section>

            {/* Subsection B: Structuring your program FAQs */}
            <section className="space-y-4 border-t border-border pt-6">
              <h3 className="text-base font-bold text-foreground uppercase tracking-wider text-primary">Structuring your program</h3>
              <div className="grid gap-3 sm:grid-cols-2 items-start">
                {splitIntoColumns([
                  { id: 'su-5', q: 'Can I have a points based program?', a: 'Yes! In addition to standard stamps, you can configure point accumulation (e.g. 10 points per dollar spent) to award rewards.' },
                  { id: 'su-6', q: 'Can I offer a tiered rewards program?', a: 'Absolutely. You can define bronze, silver, and gold tiers, giving your most frequent customers extra stamps per visit or premium rewards.' },
                  { id: 'su-7', q: 'How to use PassPrivé for prize draw programs?', a: 'You can set up a stamp card that awards a raffle entry once completed, rather than a direct food/service reward.' },
                  { id: 'su-8', q: 'Pre-paid structure options with PassPrivé', a: 'You can sell stamp packages upfront (e.g. buy 10 coffees upfront) and mark stamps off as pre-paid values.' }
                ]).map((col, colIdx) => (
                  <div key={colIdx} className="flex flex-col gap-3">
                    {col.map(faq => {
                      const isOpen = activeFaq === faq.id
                      return (
                        <div
                          key={faq.id}
                          onClick={() => toggleFaq(faq.id)}
                          className="border border-border rounded-2xl bg-card hover:border-primary/40 transition-all overflow-hidden cursor-pointer"
                        >
                          <div className="flex items-center justify-between p-4.5">
                            <span className="text-xs font-bold text-foreground">{faq.q}</span>
                            <span className={`text-muted-foreground/60 transition-transform duration-300 ${isOpen ? 'rotate-90 text-primary' : ''}`}>
                              <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6" /></svg>
                            </span>
                          </div>
                          {isOpen && (
                            <div className="px-4.5 pb-4.5 text-xs text-muted-foreground border-t border-border/40 pt-3 leading-relaxed animate-fade-up bg-muted/5">
                              {faq.a}
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                ))}
              </div>
            </section>

            {/* Subsection C: Locations FAQs */}
            <section className="space-y-4 border-t border-border pt-6">
              <h3 className="text-base font-bold text-foreground uppercase tracking-wider text-primary">Locations</h3>
              <div className="grid gap-3 sm:grid-cols-2 items-start">
                {splitIntoColumns([
                  { id: 'su-9', q: 'How to use PassPrivé over multiple locations?', a: 'You can register all storefront locations in your dashboard settings. Stamps collected at any site will sync onto the user\'s unified loyalty pass.' },
                  { id: 'su-10', q: 'How much is it to add additional locations?', a: 'Additional storefront locations can be added under your account settings, subject to plan billing tiers.' },
                  { id: 'su-11', q: 'How to delete a location from a Stamp Card?', a: 'Go to the Stamp Card location settings and deselect the checkbox for the location you want to remove.' },
                  { id: 'su-12', q: 'How to add another location to your Stamp Card?', a: 'Add the new location address under "Storefronts", then check its name under the active Stamp Card storefront options.' }
                ]).map((col, colIdx) => (
                  <div key={colIdx} className="flex flex-col gap-3">
                    {col.map(faq => {
                      const isOpen = activeFaq === faq.id
                      return (
                        <div
                          key={faq.id}
                          onClick={() => toggleFaq(faq.id)}
                          className="border border-border rounded-2xl bg-card hover:border-primary/40 transition-all overflow-hidden cursor-pointer"
                        >
                          <div className="flex items-center justify-between p-4.5">
                            <span className="text-xs font-bold text-foreground">{faq.q}</span>
                            <span className={`text-muted-foreground/60 transition-transform duration-300 ${isOpen ? 'rotate-90 text-primary' : ''}`}>
                              <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6" /></svg>
                            </span>
                          </div>
                          {isOpen && (
                            <div className="px-4.5 pb-4.5 text-xs text-muted-foreground border-t border-border/40 pt-3 leading-relaxed animate-fade-up bg-muted/5">
                              {faq.a}
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                ))}
              </div>
            </section>

            {/* Subsection D: Rewards FAQs */}
            <section className="space-y-4 border-t border-border pt-6">
              <h3 className="text-base font-bold text-foreground uppercase tracking-wider text-primary">Rewards</h3>
              <div className="grid gap-3 sm:grid-cols-2 items-start">
                {splitIntoColumns([
                  { id: 'su-13', q: 'Can I have multiple rewards?', a: 'Yes, you can set up multiple rewards on a single stamp card (e.g. a small reward at 5 stamps, and a main reward at 10 stamps) or define a selection of rewards for customers to choose from once they complete a card.' },
                  { id: 'su-14', q: 'What is a sign up reward?', a: 'A sign up reward is an immediate incentive (such as a free stamp or a welcome discount voucher) awarded to customers automatically as soon as they scan your QR code and join your loyalty program.' },
                  { id: 'su-15', q: 'What expiry should I add to rewards?', a: 'You can configure custom expiration periods (e.g., 30 days, 90 days, or no expiry) starting from when the reward is earned, giving you flexibility to drive timely return visits while keeping liabilities low.' },
                  { id: 'su-16', q: 'What is the reward voucher?', a: 'A reward voucher is a digital pass/coupon generated on the customer\'s phone once they collect enough stamps. It contains a unique barcode or code that cashiers scan to redeem the reward at checkout.' }
                ]).map((col, colIdx) => (
                  <div key={colIdx} className="flex flex-col gap-3">
                    {col.map(faq => {
                      const isOpen = activeFaq === faq.id
                      return (
                        <div
                          key={faq.id}
                          onClick={() => toggleFaq(faq.id)}
                          className="border border-border rounded-2xl bg-card hover:border-primary/40 transition-all overflow-hidden cursor-pointer"
                        >
                          <div className="flex items-center justify-between p-4.5">
                            <span className="text-xs font-bold text-foreground">{faq.q}</span>
                            <span className={`text-muted-foreground/60 transition-transform duration-300 ${isOpen ? 'rotate-90 text-primary' : ''}`}>
                              <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6" /></svg>
                            </span>
                          </div>
                          {isOpen && (
                            <div className="px-4.5 pb-4.5 text-xs text-muted-foreground border-t border-border/40 pt-3 leading-relaxed animate-fade-up bg-muted/5">
                              {faq.a}
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                ))}
              </div>
            </section>

            <NeedMoreHelpSection />
          </div>
        )}

        {/* Render View 4: Platform Features */}
        {currentView === 'features' && (
          selectedFeature && featureDetails[selectedFeature] ? (
            /* Render Sub-Feature Detail View */
            (() => {
              const details = featureDetails[selectedFeature]
              const mockData = details.mockData
              return (
                <div className="space-y-8 animate-fade-up">
                  {/* Back button */}
                  <div>
                    <button
                      onClick={() => { setSelectedFeature(null); setActiveFaq(null); }}
                      className="flex items-center gap-1.5 text-xs font-bold text-primary hover:underline cursor-pointer mb-3 select-none"
                    >
                      <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15 18 9 12 15 6" /></svg>
                      Platform Features
                    </button>

                    {/* Header Layout (2 Cols on Desktop) */}
                    <div className="flex flex-col md:flex-row gap-8 items-start justify-between">
                      <div className="max-w-xl space-y-4">
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">{details.title}</h2>
                        <p className="text-sm text-foreground/90 leading-relaxed font-semibold">{details.subtitle}</p>
                        <p className="text-xs text-muted-foreground leading-relaxed">{details.description}</p>
                      </div>

                      {/* Visual Mockup column */}
                      <div className="shrink-0 self-center md:self-start">
                        {details.mockType === 'phone-notification' && (
                          <div className="relative mx-auto w-64 h-[280px] bg-neutral-900 rounded-[36px] p-3 shadow-2xl border-4 border-neutral-800 overflow-hidden flex flex-col">
                            {/* Dynamic Island / Speaker notch */}
                            <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-20 h-4 bg-black rounded-full z-20 flex items-center justify-between px-2.5">
                              <div className="h-1.5 w-1.5 rounded-full bg-neutral-800" />
                              <div className="h-1 w-8 rounded-full bg-neutral-900" />
                            </div>
                            {/* Screen */}
                            <div className="relative flex-1 bg-linear-to-br from-indigo-950/90 via-slate-900 to-emerald-950/90 rounded-[28px] p-3 flex flex-col justify-start overflow-hidden pt-7 select-none">
                              {/* Time & Carrier */}
                              <div className="flex justify-between items-center text-[10px] text-white/80 px-2.5 font-semibold">
                                <span>{mockData.time || '9:41 AM'}</span>
                                <div className="flex items-center gap-1">
                                  <svg className="h-3 w-3 fill-current" viewBox="0 0 24 24"><path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9zm0 15c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z" /></svg>
                                  <div className="h-2 w-3.5 border border-white/80 rounded-[2px] p-[1px] flex items-center"><div className="h-full w-full bg-white/80 rounded-[1px]" /></div>
                                </div>
                              </div>
                              {/* Push Notification Banner */}
                              <div className="mt-4 p-3 bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl shadow-lg animate-fade-in text-[10px] text-white leading-tight">
                                <div className="flex items-center justify-between opacity-80 mb-1 font-bold">
                                  <span className="flex items-center gap-1">
                                    <span className="h-3 w-3 rounded-full bg-primary/25 flex items-center justify-center text-[8px] border border-primary/30">P</span>
                                    {mockData.appName || 'PassPrivé'}
                                  </span>
                                  <span>now</span>
                                </div>
                                <p className="font-semibold text-[10.5px] leading-relaxed text-white/95">{mockData.message}</p>
                              </div>
                            </div>
                          </div>
                        )}
                        {details.mockType === 'phone-sms' && (
                          <div className="relative mx-auto w-64 h-[280px] bg-neutral-900 rounded-[36px] p-3 shadow-2xl border-4 border-neutral-800 overflow-hidden flex flex-col">
                            {/* Dynamic Island / Speaker notch */}
                            <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-20 h-4 bg-black rounded-full z-20 flex items-center justify-between px-2.5">
                              <div className="h-1.5 w-1.5 rounded-full bg-neutral-800" />
                              <div className="h-1 w-8 rounded-full bg-neutral-900" />
                            </div>
                            {/* Screen */}
                            <div className="relative flex-1 bg-neutral-950 rounded-[28px] p-3 flex flex-col justify-start overflow-hidden pt-7 select-none">
                              {/* Time & Carrier */}
                              <div className="flex justify-between items-center text-[10px] text-white/80 px-2.5 font-semibold">
                                <span>{mockData.time || '2:15 PM'}</span>
                                <div className="flex items-center gap-1">
                                  <svg className="h-3 w-3 fill-current" viewBox="0 0 24 24"><path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9zm0 15c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z" /></svg>
                                  <div className="h-2 w-3.5 border border-white/80 rounded-[2px] p-[1px] flex items-center"><div className="h-full w-full bg-white/80 rounded-[1px]" /></div>
                                </div>
                              </div>
                              {/* SMS bubble */}
                              <div className="mt-4 p-3 bg-neutral-800 border border-neutral-700 rounded-2xl shadow-lg animate-fade-in text-[10px] text-white leading-tight">
                                <div className="flex items-center justify-between opacity-80 mb-1 font-bold text-primary">
                                  <span>Text Message from {mockData.sender}</span>
                                </div>
                                <p className="font-semibold text-[10.5px] leading-relaxed text-white/95">{mockData.message}</p>
                              </div>
                            </div>
                          </div>
                        )}
                        {details.mockType === 'scratch-card' && (
                          <div className="relative mx-auto w-64 h-[200px] bg-linear-to-br from-neutral-900 to-neutral-950 rounded-2xl p-4 shadow-2xl border border-border flex flex-col items-center justify-center overflow-hidden">
                            <div className="absolute inset-0 bg-primary/5 opacity-50" />
                            <div className="z-10 text-center space-y-2.5">
                              <div className="text-[10px] font-extrabold uppercase tracking-widest text-primary">Scratch & Win Game</div>
                              <div className="relative w-48 h-24 bg-neutral-800 rounded-xl border border-border flex flex-col items-center justify-center overflow-hidden group cursor-pointer shadow-inner">
                                <div className="absolute inset-0 bg-linear-to-tr from-primary/25 via-indigo-900/10 to-transparent flex items-center justify-center p-3 text-center">
                                  <span className="text-xs font-bold text-primary-foreground leading-relaxed drop-shadow-md">{mockData.prize}</span>
                                </div>
                                <div className="absolute inset-0 bg-linear-to-br from-neutral-600 via-neutral-500 to-neutral-700 flex flex-col items-center justify-center text-white/90 group-hover:translate-x-full transition-transform duration-700 ease-in-out select-none shadow-md">
                                  <svg className="h-6 w-6 opacity-75 mb-1.5 animate-bounce" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                                  <span className="text-[10px] font-bold uppercase tracking-wider">Swipe to scratch!</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                        {details.mockType === 'workflow' && (
                          <div className="relative mx-auto w-[280px] h-[160px] flex items-center justify-center select-none overflow-visible">
                            {/* Backdrop gradient circles/blob */}
                            <div className="absolute w-[220px] h-[100px] bg-gradient-to-tr from-pink-100 to-rose-200 dark:from-pink-950/20 dark:to-rose-900/10 rounded-full blur-2xl opacity-85" />
                            <div className="absolute w-[170px] h-[80px] bg-rose-200/40 dark:from-rose-950/10 dark:to-purple-900/10 rounded-full rotate-12 transform" />

                            {/* Floating app circles */}
                            <div className="relative w-full h-full flex items-center justify-center">
                              {/* Mailchimp - Center */}
                              <div className="absolute z-30 w-15 h-15 bg-white dark:bg-neutral-800 rounded-full shadow-lg border border-neutral-100/80 dark:border-neutral-700/50 flex items-center justify-center hover:scale-110 hover:-translate-y-0.5 transition-all duration-300">
                                <span className="text-xl">🐒</span>
                              </div>

                              {/* Zapier - Top Right */}
                              <div className="absolute z-20 top-2 right-12 w-11 h-11 bg-white dark:bg-neutral-800 rounded-full shadow-md border border-neutral-100/80 dark:border-neutral-700/50 flex items-center justify-center hover:scale-110 transition-all duration-300">
                                <svg className="w-5.5 h-5.5 text-orange-500 fill-current" viewBox="0 0 24 24"><path d="M12 2l2.4 7.4h7.6l-6.2 4.5 2.4 7.4-6.2-4.5-6.2 4.5 2.4-7.4-6.2-4.5h7.6z" /></svg>
                              </div>

                              {/* HubSpot - Top Left */}
                              <div className="absolute z-20 top-1.5 left-12 w-11 h-11 bg-white dark:bg-neutral-800 rounded-full shadow-md border border-neutral-100/80 dark:border-neutral-700/50 flex items-center justify-center hover:scale-110 transition-all duration-300">
                                <svg className="w-5.5 h-5.5 text-indigo-600 fill-none stroke-current stroke-2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /><polyline points="3.29 7 12 12 20.71 7" /><line x1="12" y1="22" x2="12" y2="12" /></svg>
                              </div>

                              {/* MailerLite - Left Middle */}
                              <div className="absolute z-10 top-11 left-4 w-12 h-12 bg-white dark:bg-neutral-800 rounded-full shadow-md border border-neutral-100/80 dark:border-neutral-700/50 flex flex-col items-center justify-center p-1.5 hover:scale-110 transition-all duration-300">
                                <div className="text-[7px] font-black text-emerald-600 uppercase tracking-tighter leading-none">mailer</div>
                                <div className="text-[8px] font-black text-emerald-600 uppercase leading-none mt-0.5 bg-emerald-50 dark:bg-emerald-950/20 px-1 rounded-sm">lite</div>
                              </div>

                              {/* ActiveCampaign - Bottom Left */}
                              <div className="absolute z-20 bottom-1 left-10 w-11 h-11 bg-white dark:bg-neutral-800 rounded-full shadow-md border border-neutral-100/80 dark:border-neutral-700/50 flex items-center justify-center hover:scale-110 transition-all duration-300">
                                <svg className="w-5.5 h-5.5 text-blue-600 fill-none stroke-current stroke-2" viewBox="0 0 24 24" strokeLinecap="round"><circle cx="12" cy="12" r="8" /><path d="M8 12a4 4 0 0 1 8 0" /></svg>
                              </div>

                              {/* Klaviyo - Bottom Right */}
                              <div className="absolute z-20 bottom-2 right-12 w-11 h-11 bg-white dark:bg-neutral-800 rounded-full shadow-md border border-neutral-100/80 dark:border-neutral-700/50 flex items-center justify-center hover:scale-110 transition-all duration-300">
                                <span className="text-neutral-950 dark:text-white font-black text-sm italic tracking-tighter">f</span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Resources */}
                  <section className="space-y-4">
                    <h3 className="text-base font-bold text-foreground uppercase tracking-wider text-primary">Resources</h3>
                    <div className="bg-card border border-border rounded-3xl overflow-hidden shadow-sm flex flex-col p-4 w-72">
                      {/* Document Preview Thumbnail */}
                      <div className="relative h-44 rounded-2xl bg-neutral-50/50 dark:bg-neutral-900/30 border border-neutral-100 dark:border-neutral-800/80 overflow-hidden flex items-center justify-center p-3 mb-4 bg-gradient-to-br from-indigo-50/10 to-purple-50/10">
                        {renderDocumentMockup(selectedFeature, details.title)}

                        {/* PDF Pill Badge */}
                        <div className="absolute top-3 right-3 flex items-center gap-1 bg-white dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 border border-neutral-200/50 dark:border-neutral-700/50 px-2 py-0.5 rounded-lg text-[9px] font-extrabold shadow-xs select-none">
                          <svg className="h-3 w-3 text-red-500 fill-none stroke-current stroke-2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                            <polyline points="14 2 14 8 20 8" />
                          </svg>
                          PDF
                        </div>
                      </div>

                      {/* Meta */}
                      <div className="space-y-1 px-1 flex-1 flex flex-col">
                        <h4 className="text-xs font-bold text-foreground leading-snug">{details.pdfTitle}</h4>
                        <p className="text-[10px] text-muted-foreground leading-relaxed mt-1.5 flex-1">{details.pdfDesc}</p>
                      </div>

                      {/* Action */}
                      <div className="mt-4">
                        <button
                          onClick={() => alert(`Downloading ${details.pdfTitle}...`)}
                          className="w-full py-2 bg-primary hover:bg-primary-600 text-primary-foreground text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-md shadow-primary/10 hover:scale-[1.01] active:scale-[0.98] cursor-pointer"
                        >
                          <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
                          Download
                        </button>
                      </div>
                    </div>
                  </section>

                  {/* Help Center */}
                  <section className="space-y-4 border-t border-border pt-6">
                    <div className="flex justify-between items-center">
                      <h3 className="text-base font-bold text-foreground uppercase tracking-wider text-primary">Help Center</h3>
                      <span className="text-[11px] text-muted-foreground font-semibold">Taps to expand Q&A answers</span>
                    </div>
                    <div className="grid gap-3 sm:grid-cols-2 items-start">
                      {splitIntoColumns(details.faqs).map((col, colIdx) => (
                        <div key={colIdx} className="flex flex-col gap-3">
                          {col.map(faq => {
                            const isOpen = activeFaq === faq.id
                            return (
                              <div
                                key={faq.id}
                                onClick={() => toggleFaq(faq.id)}
                                className="border border-border rounded-2xl bg-card hover:border-primary/40 transition-all overflow-hidden cursor-pointer"
                              >
                                <div className="flex items-center justify-between p-4.5">
                                  <span className="text-xs font-bold text-foreground">{faq.q}</span>
                                  <span className={`text-muted-foreground/60 transition-transform duration-300 ${isOpen ? 'rotate-90 text-primary' : ''}`}>
                                    <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6" /></svg>
                                  </span>
                                </div>
                                {isOpen && (
                                  <div className="px-4.5 pb-4.5 text-xs text-muted-foreground border-t border-border/40 pt-3 leading-relaxed animate-fade-up bg-muted/5">
                                    {faq.a}
                                  </div>
                                )}
                              </div>
                            )
                          })}
                        </div>
                      ))}
                    </div>
                  </section>

                  <NeedMoreHelpSection />
                </div>
              )
            })()
          ) : (
            /* Render Sub-Features List View (Original View 4) */
            <div className="space-y-8 animate-fade-up">

              {/* Header */}
              <div>
                <button
                  onClick={() => { setCurrentView('main'); setActiveFaq(null); setSelectedFeature(null); }}
                  className="flex items-center gap-1.5 text-xs font-bold text-primary hover:underline cursor-pointer mb-3 select-none"
                >
                  <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15 18 9 12 15 6" /></svg>
                  Help & Support
                </button>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">Platform features</h2>
                <p className="text-xs text-muted-foreground mt-2 max-w-2xl leading-relaxed">
                  Explore advanced marketing engine tools, birthday automation, game templates, and third-party dashboard links.
                </p>
              </div>

              {/* Features Accordion List */}
              <section className="space-y-4">
                <h3 className="text-base font-bold text-foreground uppercase tracking-wider text-primary">Core Campaign features</h3>

                <div className="grid gap-4 sm:grid-cols-2 items-start">
                  {splitIntoColumns([
                    {
                      id: 'pf-1',
                      title: 'Birthday Club',
                      description: 'Ensure every loyal customer feels celebrated on their special day with our Birthday Club feature.',
                      icon: (
                        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="10" width="18" height="12" rx="2" /><path d="M12 2v8" /><path d="M7 10V7a5 5 0 0 1 10 0v3" /></svg>
                      )
                    },
                    {
                      id: 'pf-2',
                      title: 'Lapsed Customers',
                      description: 'Our Lapsed Customer feature automatically contacts inactive customers, encouraging them to return.',
                      icon: (
                        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                      )
                    },
                    {
                      id: 'pf-3',
                      title: 'Scratch & Win',
                      description: 'Spice up your loyalty program with Scratch & Win games. It\'s a digital twist on traditional scratch cards.',
                      icon: (
                        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polygon points="12 2 15 8.5 22 9.8 17 14.8 18.2 22 12 18.3 5.8 22 7 14.8 2 9.8 9 8.5 12 2" /></svg>
                      )
                    },
                    {
                      id: 'pf-4',
                      title: 'Communications',
                      description: 'Engage your customers with our Push Notifications and SMS features, sending offers, updates, or a friendly hello.',
                      icon: (
                        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
                      )
                    },
                    {
                      id: 'pf-5',
                      title: 'Mailing integrations',
                      description: 'PassPrivé can be seamlessly integrated with your favorite marketing and CRM platforms via Zapier.',
                      icon: (
                        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M3 6l9 6 9-6" /></svg>
                      )
                    }
                  ]).map((col, colIdx) => (
                    <div key={colIdx} className="flex flex-col gap-4">
                      {col.map(feat => {
                        return (
                          <div
                            key={feat.id}
                            onClick={() => { setSelectedFeature(feat.id); setActiveFaq(null); }}
                            className="flex flex-col bg-card border border-border rounded-2xl hover:border-primary/40 transition-all duration-300 group cursor-pointer"
                          >
                            <div className="flex items-start justify-between p-5">
                              <div className="flex items-start gap-4">
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary">
                                  {feat.icon}
                                </div>
                                <div>
                                  <h4 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">{feat.title}</h4>
                                  <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">{feat.description}</p>
                                </div>
                              </div>
                              <span className="text-muted-foreground/50 group-hover:text-primary transition-all self-center ml-2">
                                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6" /></svg>
                              </span>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  ))}
                </div>
              </section>

              {/* Campaign Guide Resource */}
              <section className="space-y-4">
                <h3 className="text-base font-bold text-foreground uppercase tracking-wider text-primary">Resources</h3>

                <div className="max-w-md rounded-2xl border border-border bg-card p-4 backdrop-blur-xl">
                  <div className="relative aspect-video rounded-xl bg-linear-to-br from-indigo-900/30 via-muted to-primary-900/10 border border-border flex flex-col items-center justify-center overflow-hidden">
                    <span className="absolute top-2 left-2 rounded bg-indigo-500/15 px-2 py-0.5 text-[9px] font-bold text-indigo-400 uppercase tracking-wide">
                      PDF
                    </span>
                    <div className="text-center p-3">
                      <p className="text-[10px] font-extrabold text-foreground tracking-wider uppercase">PASSPRIVÉ</p>
                      <p className="text-[9px] text-muted-foreground mt-0.5 font-bold tracking-wide uppercase">Campaign features guide</p>
                    </div>
                  </div>
                  <h4 className="text-xs font-bold text-foreground mt-3.5">PassPrivé campaigns guide</h4>
                  <p className="text-[11px] text-muted-foreground mt-2 leading-relaxed">
                    An overview of all PassPrivé&apos;s exciting customer engagement features.
                  </p>
                  <div className="flex items-center justify-end border-t border-border mt-3.5 pt-3">
                    <button onClick={() => alert('Downloading Campaigns Guide PDF...')} className="px-3.5 py-1.5 bg-primary text-primary-foreground rounded-lg text-[10px] font-bold flex items-center gap-1 hover:bg-primary-600 transition-colors cursor-pointer">
                      <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
                      Download
                    </button>
                  </div>
                </div>
              </section>

              <NeedMoreHelpSection />
            </div>
          )
        )}

        {/* Render View 5: Stamp Methods */}
        {currentView === 'stamp-methods' && (
          selectedStampMethod && stampMethodDetails[selectedStampMethod] ? (
            /* Render Sub-Page Detail View for Stamp Method */
            (() => {
              const details = stampMethodDetails[selectedStampMethod]
              return (
                <div className="space-y-8 animate-fade-up">
                  {/* Back button */}
                  <div>
                    <button
                      onClick={() => { setSelectedStampMethod(null); setActiveFaq(null); }}
                      className="flex items-center gap-1.5 text-xs font-bold text-primary hover:underline cursor-pointer mb-3 select-none"
                    >
                      <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15 18 9 12 15 6" /></svg>
                      Stamp Methods
                    </button>

                    {/* Header Layout */}
                    <div className="flex flex-col md:flex-row gap-8 items-start justify-between">
                      <div className="max-w-xl space-y-4">
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">{details.title}</h2>
                        <p className="text-sm text-foreground/90 leading-relaxed font-semibold">{details.subtitle}</p>
                        <p className="text-xs text-muted-foreground leading-relaxed">{details.description}</p>
                      </div>

                      {/* Visual Mockup column */}
                      <div className="shrink-0 self-center md:self-start">
                        {details.mockType === 'stamppod' && (
                          <div className="relative mx-auto w-64 h-[200px] bg-linear-to-br from-neutral-900 to-neutral-950 rounded-2xl p-4 shadow-2xl border border-border flex flex-col justify-center items-center gap-3 overflow-hidden">
                            {/* Pulse ring animation */}
                            <div className="absolute w-28 h-28 bg-primary/10 rounded-full animate-ping duration-1000" />
                            {/* Tapping Phone silhouette */}
                            <div className="relative w-24 h-24 bg-neutral-800 rounded-full border-4 border-neutral-700 flex flex-col items-center justify-center shadow-lg">
                              <span className="text-2.5xl animate-pulse">📶</span>
                              <span className="text-[9px] text-neutral-400 font-bold uppercase tracking-wide mt-1">StampPod</span>
                            </div>
                            <div className="text-[10.5px] font-semibold text-white/95 text-center mt-2 leading-relaxed">
                              Tap phone on pod to collect stamps
                            </div>
                          </div>
                        )}
                        {details.mockType === 'stamptag' && (
                          <div className="relative mx-auto w-64 h-[200px] bg-linear-to-br from-neutral-900 to-neutral-950 rounded-2xl p-4 shadow-2xl border border-border flex flex-col justify-center items-center gap-3 overflow-hidden">
                            <div className="w-16 h-28 bg-neutral-800 rounded-2xl border-2 border-neutral-700 p-2 flex flex-col justify-between items-center shadow-md relative animate-fade-in">
                              <div className="w-6 h-1 bg-neutral-600 rounded-full" />
                              {/* NFC Puck Tapping */}
                              <div className="w-10 h-10 rounded-full bg-teal-500/90 text-white flex items-center justify-center animate-bounce shadow-md">
                                <span className="text-lg">🎯</span>
                              </div>
                              <div className="w-8 h-8 rounded bg-primary/20 border border-primary/30 flex items-center justify-center"><span className="text-xs">💳</span></div>
                            </div>
                            <div className="text-[10px] text-muted-foreground text-center">Cashier taps NFC Stamp Tag against customer pass screen</div>
                          </div>
                        )}
                        {details.mockType === 'textcodes' && (
                          <div className="relative mx-auto w-64 h-[200px] bg-linear-to-br from-neutral-900 to-neutral-950 rounded-2xl p-4 shadow-2xl border border-border flex items-center justify-center gap-3 overflow-hidden">
                            {/* Coffee Cup */}
                            <div className="w-20 h-28 bg-amber-50/5 dark:bg-amber-900/10 rounded-t-xl rounded-b-md border-2 border-neutral-200 dark:border-neutral-800 relative flex flex-col items-center justify-between p-2 shadow-md">
                              <div className="w-22 h-4 bg-neutral-300 dark:bg-neutral-800 rounded-t-sm absolute -top-4 border border-neutral-200 dark:border-neutral-700" />
                              <div className="w-10 h-10 rounded-full border border-primary/20 bg-primary/5 flex items-center justify-center text-sm">☕️</div>
                              {/* Label sticker */}
                              <div className="w-16 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 p-1 rounded-sm shadow-xs text-center">
                                <div className="text-[5px] text-muted-foreground leading-none">STAMP CODE</div>
                                <div className="text-[7px] font-black text-primary tracking-wide leading-none mt-0.5">PV-8891</div>
                              </div>
                            </div>
                            {/* Text description */}
                            <div className="text-[10px] text-muted-foreground leading-relaxed flex-1">
                              Codes are printed on cups or receipts. Customers enter them in wallet pass to claim stamps.
                            </div>
                          </div>
                        )}
                        {details.mockType === 'qrcodes' && (
                          <div className="relative mx-auto w-64 h-[200px] bg-linear-to-br from-neutral-900 to-neutral-950 rounded-2xl p-4 shadow-2xl border border-border flex flex-col justify-center items-center gap-2.5 overflow-hidden">
                            <div className="w-24 h-24 bg-white dark:bg-neutral-800 p-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 shadow-md relative flex items-center justify-center">
                              {/* Animated Scan Line */}
                              <div className="absolute left-0 right-0 h-0.5 bg-primary animate-pulse" style={{ top: '50%' }} />
                              {/* Stylised QR outline */}
                              <svg className="w-18 h-18 text-neutral-900 dark:text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M3 3h8v8H3zm2 2v4h4V5zm14-2h8v8h-8zm2 2v4h4V5zM3 13h8v8H3zm2 2v4h4v-4zm15-2h4v2h-4zm2 2h2v4h-2zm-2 2h2v2h-2zm-2-4h2v2h-2zm0 4h2v2h-2zm-2-2h2v4h-2zm-2-2h2v2h-2z" />
                              </svg>
                            </div>
                            <div className="text-[10px] text-muted-foreground text-center">Single-use QR code scanned via client phone camera</div>
                          </div>
                        )}
                        {details.mockType === 'tempcode' && (
                          <div className="relative mx-auto w-64 h-[200px] bg-linear-to-br from-neutral-900 to-neutral-950 rounded-2xl p-4 shadow-2xl border border-border flex flex-col justify-center items-center gap-2 overflow-hidden">
                            {/* Tablet frame */}
                            <div className="w-44 h-28 bg-neutral-800 rounded-xl border-4 border-neutral-700 p-1 flex flex-col justify-between relative shadow-md animate-fade-in">
                              {/* Screen */}
                              <div className="flex-1 bg-white dark:bg-neutral-900 rounded-lg p-2 flex items-center justify-between select-none">
                                <div className="flex flex-col justify-center items-start gap-1">
                                  <div className="text-[7px] font-bold text-neutral-800 dark:text-neutral-200">Scan to Stamp</div>
                                  <div className="text-[5px] text-muted-foreground">Expires in 15s</div>
                                  {/* Progress line */}
                                  <div className="w-12 h-1 bg-neutral-200 rounded-full overflow-hidden"><div className="h-full bg-primary w-[60%]" /></div>
                                </div>
                                {/* QR Code */}
                                <svg className="w-12 h-12 text-neutral-900 dark:text-white" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M3 3h8v8H3zm2 2v4h4V5zm14-2h8v8h-8zm2 2v4h4V5zM3 13h8v8H3zm2 2v4h4v-4zm15-2h4v2h-4zm2 2h2v4h-2zm-2 2h2v2h-2zm-2-4h2v2h-2zm0 4h2v2h-2zm-2-2h2v4h-2zm-2-2h2v2h-2z" />
                                </svg>
                              </div>
                            </div>
                            <div className="text-[10px] text-muted-foreground text-center">Merchant counter tablet displaying refreshing QR codes</div>
                          </div>
                        )}
                        {details.mockType === 'console' && (
                          <div className="relative mx-auto w-64 h-[200px] bg-linear-to-br from-neutral-900 to-neutral-950 rounded-2xl p-4 shadow-2xl border border-border flex flex-col justify-center items-center gap-2 overflow-hidden">
                            {/* Laptop/Console Mock screen */}
                            <div className="w-48 h-28 bg-neutral-900 rounded-lg border-2 border-neutral-700 p-1 flex flex-col relative shadow-md">
                              {/* Screen */}
                              <div className="flex-1 bg-card rounded-md p-1.5 flex flex-col gap-1">
                                <div className="flex justify-between items-center pb-1 border-b border-neutral-100 dark:border-neutral-800">
                                  <span className="text-[6px] font-bold text-foreground">Merchant console</span>
                                  <span className="text-[5px] bg-primary/20 text-primary px-1 rounded-sm">Stamping mode</span>
                                </div>
                                {/* Member item */}
                                <div className="flex items-center justify-between bg-muted/30 p-1 rounded-sm border border-border/40">
                                  <div className="flex items-center gap-1">
                                    <div className="w-3.5 h-3.5 rounded-full bg-primary/20 text-[6px] flex items-center justify-center font-bold">JD</div>
                                    <span className="text-[5.5px] font-bold text-foreground">John Doe</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <span className="text-[5px] text-muted-foreground">Card: 4/10</span>
                                    <button className="px-1.5 py-0.5 bg-primary text-primary-foreground text-[4.5px] font-bold rounded-sm">+1 Stamp</button>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="text-[10px] text-muted-foreground text-center">Add or deduct stamps manually from members table</div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Resources */}
                  <section className="space-y-4">
                    <h3 className="text-base font-bold text-foreground uppercase tracking-wider text-primary">Resources</h3>
                    <div className="bg-card border border-border rounded-3xl overflow-hidden shadow-sm flex flex-col p-4 w-72">
                      {/* Document Preview Thumbnail */}
                      <div className="relative h-44 rounded-2xl bg-neutral-50/50 dark:bg-neutral-900/30 border border-neutral-100 dark:border-neutral-800/80 overflow-hidden flex items-center justify-center p-3 mb-4 bg-gradient-to-br from-indigo-50/10 to-purple-50/10">
                        {renderDocumentMockup(selectedStampMethod, details.title)}

                        {/* PDF Pill Badge */}
                        <div className="absolute top-3 right-3 flex items-center gap-1 bg-white dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 border border-neutral-200/50 dark:border-neutral-700/50 px-2 py-0.5 rounded-lg text-[9px] font-extrabold shadow-xs select-none">
                          <svg className="h-3 w-3 text-red-500 fill-none stroke-current stroke-2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                            <polyline points="14 2 14 8 20 8" />
                          </svg>
                          PDF
                        </div>
                      </div>

                      {/* Meta */}
                      <div className="space-y-1 px-1 flex-1 flex flex-col">
                        <h4 className="text-xs font-bold text-foreground leading-snug">{details.pdfTitle}</h4>
                        <p className="text-[10px] text-muted-foreground leading-relaxed mt-1.5 flex-1">{details.pdfDesc}</p>
                      </div>

                      {/* Action */}
                      <div className="mt-4">
                        <button
                          onClick={() => alert(`Downloading ${details.pdfTitle}...`)}
                          className="w-full py-2 bg-primary hover:bg-primary-600 text-primary-foreground text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-md shadow-primary/10 hover:scale-[1.01] active:scale-[0.98] cursor-pointer"
                        >
                          <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
                          Download
                        </button>
                      </div>
                    </div>
                  </section>

                  {/* Help Center */}
                  <section className="space-y-4 border-t border-border pt-6">
                    <div className="flex justify-between items-center">
                      <h3 className="text-base font-bold text-foreground uppercase tracking-wider text-primary">Help Center</h3>
                      <span className="text-[11px] text-muted-foreground font-semibold">Taps to expand Q&A answers</span>
                    </div>
                    <div className="grid gap-3 sm:grid-cols-2 items-start">
                      {splitIntoColumns(details.faqs).map((col, colIdx) => (
                        <div key={colIdx} className="flex flex-col gap-3">
                          {col.map(faq => {
                            const isOpen = activeFaq === faq.id
                            return (
                              <div
                                key={faq.id}
                                onClick={() => toggleFaq(faq.id)}
                                className="border border-border rounded-2xl bg-card hover:border-primary/40 transition-all overflow-hidden cursor-pointer"
                              >
                                <div className="flex items-center justify-between p-4.5">
                                  <span className="text-xs font-bold text-foreground">{faq.q}</span>
                                  <span className={`text-muted-foreground/60 transition-transform duration-300 ${isOpen ? 'rotate-90 text-primary' : ''}`}>
                                    <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6" /></svg>
                                  </span>
                                </div>
                                {isOpen && (
                                  <div className="px-4.5 pb-4.5 text-xs text-muted-foreground border-t border-border/40 pt-3 leading-relaxed animate-fade-up bg-muted/5">
                                    {faq.a}
                                  </div>
                                )}
                              </div>
                            )
                          })}
                        </div>
                      ))}
                    </div>
                  </section>

                  <NeedMoreHelpSection />
                </div>
              )
            })()
          ) : (
            /* Render list of Stamp Methods (Original View 5) */
            <div className="space-y-8 animate-fade-up">

              {/* Header */}
              <div>
                <button
                  onClick={() => { setCurrentView('main'); setActiveFaq(null); setSelectedStampMethod(null); }}
                  className="flex items-center gap-1.5 text-xs font-bold text-primary hover:underline cursor-pointer mb-3 select-none"
                >
                  <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15 18 9 12 15 6" /></svg>
                  Help & Support
                </button>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">Stamp methods</h2>
                <p className="text-xs text-muted-foreground mt-2 max-w-2xl leading-relaxed">
                  Learn the different ways you can distribute stamps to your customers. Review hardware terminals, scan parameters, and digital codes.
                </p>
              </div>

              {/* Methods Grid List */}
              <section className="space-y-4">
                <h3 className="text-base font-bold text-foreground uppercase tracking-wider text-primary">Stamp distribution channels</h3>

                <div className="grid gap-4 sm:grid-cols-2 items-start">
                  {splitIntoColumns([
                    {
                      id: 'sm-1',
                      title: 'StampPod™',
                      description: 'The StampPod is a compact device that issues stamps via \'tap and go\' technology when a member taps their phone.',
                      icon: (
                        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10" /><path d="M8 12h8" /><path d="M12 8v8" /></svg>
                      )
                    },
                    {
                      id: 'sm-2',
                      title: 'Stamp Tag',
                      description: 'Stamp Tags use \'tap and go\' technology, ideal for staff needing a portable stamp validation method when the pod isn\'t suitable.',
                      icon: (
                        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" /><line x1="7" y1="7" x2="7.01" y2="7" /></svg>
                      )
                    },
                    {
                      id: 'sm-3',
                      title: 'OneStamps - Text Codes',
                      description: 'Unique OneStamps codes can be printed on product labels, like coffee cups and takeaway bags, or used digitally.',
                      icon: (
                        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M9 9h6" /><path d="M9 13h6" /><path d="M9 17h3" /></svg>
                      )
                    },
                    {
                      id: 'sm-4',
                      title: 'OneStamps - QR Codes',
                      description: 'Unique OneStamps QR codes can be printed on labels for products or packaging, like coffee cups and takeaway bags, or used digitally.',
                      icon: (
                        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /></svg>
                      )
                    },
                    {
                      id: 'sm-5',
                      title: 'Temporary Stamp Code',
                      description: 'A Temporary Stamp Code is a QR code that lets members collect stamps by scanning it with the app.',
                      icon: (
                        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="3" width="18" height="18" rx="2" /><line x1="9" y1="12" x2="15" y2="12" /><line x1="12" y1="9" x2="12" y2="15" /></svg>
                      )
                    },
                    {
                      id: 'sm-6',
                      title: 'Merchant Console',
                      description: 'Stamps can be applied manually to customer accounts through your Merchant Console.',
                      icon: (
                        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="2" y="3" width="20" height="14" rx="2" ry="2" /><line x1="2" y1="20" x2="22" y2="20" /><line x1="12" y1="17" x2="12" y2="20" /></svg>
                      )
                    }
                  ]).map((col, colIdx) => (
                    <div key={colIdx} className="flex flex-col gap-4">
                      {col.map(feat => {
                        return (
                          <div
                            key={feat.id}
                            onClick={() => { setSelectedStampMethod(feat.id); setActiveFaq(null); }}
                            className="flex flex-col bg-card border border-border rounded-2xl hover:border-primary/40 transition-all duration-300 group cursor-pointer"
                          >
                            <div className="flex items-start justify-between p-5">
                              <div className="flex items-start gap-4">
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary">
                                  {feat.icon}
                                </div>
                                <div>
                                  <h4 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">{feat.title}</h4>
                                  <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">{feat.description}</p>
                                </div>
                              </div>
                              <span className="text-muted-foreground/50 group-hover:text-primary transition-all self-center ml-2">
                                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6" /></svg>
                              </span>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  ))}
                </div>
              </section>

              {/* Resources Guide */}
              <section className="space-y-4">
                <h3 className="text-base font-bold text-foreground uppercase tracking-wider text-primary">Resources</h3>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {/* Reference Guide */}
                  <div className="flex flex-col rounded-2xl border border-border bg-card p-4 backdrop-blur-xl">
                    <div className="relative aspect-video rounded-xl bg-linear-to-br from-indigo-900/30 via-muted to-primary-900/10 border border-border flex flex-col items-center justify-center overflow-hidden">
                      <span className="absolute top-2 left-2 rounded bg-indigo-500/15 px-2 py-0.5 text-[9px] font-bold text-indigo-400 uppercase tracking-wide">
                        PDF
                      </span>
                      <div className="text-center p-3">
                        <p className="text-[10px] font-extrabold text-foreground tracking-wider uppercase">PASSPRIVÉ</p>
                        <p className="text-[9px] text-muted-foreground mt-0.5 font-bold tracking-wide uppercase">Stamp Methods Guide</p>
                      </div>
                    </div>
                    <h4 className="text-xs font-bold text-foreground mt-3.5">Stamp Methods Guide</h4>
                    <p className="text-[11px] text-muted-foreground mt-2 leading-relaxed flex-1">
                      Download our quick reference guide of all available stamp methods.
                    </p>
                    <div className="flex items-center justify-between border-t border-border mt-3.5 pt-3">
                      <select className="bg-transparent text-[10px] text-muted-foreground font-semibold border-none focus:outline-none">
                        <option>English</option>
                        <option>French</option>
                      </select>
                      <button onClick={() => alert('Downloading Stamp Methods Guide PDF...')} className="px-3.5 py-1.5 bg-primary text-primary-foreground rounded-lg text-[10px] font-bold flex items-center gap-1 hover:bg-primary-600 transition-colors cursor-pointer">
                        <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
                        Download
                      </button>
                    </div>
                  </div>

                  {/* Best Way card */}
                  <div className="flex flex-col rounded-2xl border border-border bg-card p-4 backdrop-blur-xl">
                    <div className="relative aspect-video rounded-xl bg-linear-to-br from-emerald-900/30 via-muted to-primary-900/10 border border-border flex flex-col items-center justify-center overflow-hidden">
                      <span className="absolute top-2 left-2 rounded bg-emerald-500/15 px-2 py-0.5 text-[9px] font-bold text-emerald-400 uppercase tracking-wide">
                        Guide
                      </span>
                      <div className="text-center p-3">
                        <p className="text-[10px] font-extrabold text-foreground tracking-wider uppercase">STAMP SELECTION</p>
                        <p className="text-[9px] text-muted-foreground mt-0.5 font-bold tracking-wide uppercase">Best practices</p>
                      </div>
                    </div>
                    <h4 className="text-xs font-bold text-foreground mt-3.5">What&apos;s the best way to issue stamps?</h4>
                    <p className="text-[11px] text-muted-foreground mt-2 leading-relaxed flex-1">
                      Understand our stamp validation methods to choose the best way to issue stamps for your operations.
                    </p>
                    <div className="flex items-center justify-end border-t border-border mt-3.5 pt-3">
                      <button onClick={() => alert('Opening stamp issuance guide site...')} className="px-3.5 py-1.5 bg-primary text-primary-foreground rounded-lg text-[10px] font-bold flex items-center gap-1 hover:bg-primary-600 transition-colors cursor-pointer">
                        Explore
                        <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
                      </button>
                    </div>
                  </div>
                </div>
              </section>

              <NeedMoreHelpSection />
            </div>
          )
        )}

        {/* Render View: Security, Policies & Compliance */}
        {currentView === 'security' && (
          <div className="space-y-8 animate-fade-up">

            {/* Header */}
            <div>
              <button
                onClick={() => { setCurrentView('main'); setActiveFaq(null); }}
                className="flex items-center gap-1.5 text-xs font-bold text-primary hover:underline cursor-pointer mb-3 select-none"
              >
                <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15 18 9 12 15 6" /></svg>
                Help & Support
              </button>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">Security, policies & compliance</h2>
              <p className="text-xs text-muted-foreground mt-2 max-w-2xl leading-relaxed">
                Learn about our company policies and how we ensure compliance with relevant regulations.
              </p>
            </div>

            {/* Explore our documentation */}
            <section className="space-y-4">
              <h3 className="text-base font-bold text-foreground uppercase tracking-wider text-primary">Explore our documentation</h3>
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  {
                    title: 'Merchant terms',
                    description: 'This Agreement details the terms between businesses and PassPrivé for loyalty reward services.',
                    icon: (
                      <svg className="h-5.5 w-5.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                        <line x1="2" y1="10" x2="22" y2="10" />
                        <line x1="12" y1="2" x2="12" y2="3" />
                      </svg>
                    )
                  },
                  {
                    title: 'User terms',
                    description: 'This Agreement details the terms between users and PassPrivé for loyalty reward services.',
                    icon: (
                      <svg className="h-5.5 w-5.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                        <circle cx="8.5" cy="7" r="4" />
                        <polyline points="17 11 19 13 23 9" />
                      </svg>
                    )
                  },
                  {
                    title: 'Privacy Policy',
                    description: 'A privacy policy outlines how our websites, including the console and mobile apps, handle user data and privacy.',
                    icon: (
                      <svg className="h-5.5 w-5.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                        <rect x="9" y="11" width="6" height="5" rx="1" />
                      </svg>
                    )
                  },
                  {
                    title: 'SOC2 Type 2 accreditation',
                    description: 'PassPrivé is SOC 2 Type II accredited, showcasing our commitment to top-tier security and data compliance.',
                    icon: (
                      <svg className="h-5.5 w-5.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" />
                        <path d="M9 12l2 2 4-4" />
                      </svg>
                    )
                  }
                ].map((doc) => (
                  <div
                    key={doc.title}
                    onClick={() => alert(`Opening ${doc.title}...`)}
                    className="flex items-start justify-between p-5 bg-card border border-border rounded-2xl hover:border-primary/40 hover:bg-muted/30 transition-all duration-300 group cursor-pointer"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary group-hover:scale-105 transition-transform duration-300">
                        {doc.icon}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">{doc.title}</h4>
                        <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">{doc.description}</p>
                      </div>
                    </div>
                    <span className="text-muted-foreground/50 group-hover:text-primary group-hover:translate-x-0.5 transition-all self-center ml-2">
                      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6" /></svg>
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* Help Center */}
            <section className="space-y-4 border-t border-border pt-6">
              <div className="flex justify-between items-center">
                <h3 className="text-base font-bold text-foreground uppercase tracking-wider text-primary">Help Center</h3>
                <span className="text-[11px] text-muted-foreground font-semibold">Taps to expand Q&A answers</span>
              </div>
              <div className="grid gap-3 sm:grid-cols-2 items-start">
                {splitIntoColumns([
                  { id: 'sec-1', q: 'Understanding user communication consent', a: 'To send push notifications or SMS campaigns, you must obtain explicit opt-in consent from your members. PassPrivé passes handle this automatically during onboarding.' },
                  { id: 'sec-2', q: 'Is PassPrivé GDPR compliant?', a: 'Yes! We comply fully with GDPR guidelines. Customer details can be accessed, updated, or deleted upon request, and all customer data is processed using safe encryption channels.' },
                  { id: 'sec-3', q: 'How to prevent misuse with stamping and reward redemptions', a: 'PassPrivé employs security features such as unique single-use QR codes, merchant PIN verification, and GPS geofence checks to prevent double-stamping or unauthorized reward claims.' },
                  { id: 'sec-4', q: 'Is PassPrivé PCI compliant?', a: 'Yes, PassPrivé uses secure, PCI-DSS compliant third-party payment processors (such as Stripe) to handle all subscription billing and financial data securely.' }
                ]).map((col, colIdx) => (
                  <div key={colIdx} className="flex flex-col gap-3">
                    {col.map(faq => {
                      const isOpen = activeFaq === faq.id
                      return (
                        <div
                          key={faq.id}
                          onClick={() => toggleFaq(faq.id)}
                          className="border border-border rounded-2xl bg-card hover:border-primary/40 transition-all overflow-hidden cursor-pointer"
                        >
                          <div className="flex items-center justify-between p-4.5">
                            <span className="text-xs font-bold text-foreground">{faq.q}</span>
                            <span className={`text-muted-foreground/60 transition-transform duration-300 ${isOpen ? 'rotate-90 text-primary' : ''}`}>
                              <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6" /></svg>
                            </span>
                          </div>
                          {isOpen && (
                            <div className="px-4.5 pb-4.5 text-xs text-muted-foreground border-t border-border/40 pt-3 leading-relaxed animate-fade-up bg-muted/5">
                              {faq.a}
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                ))}
              </div>
            </section>

            <NeedMoreHelpSection />
          </div>
        )}

        {/* Render View: Account and Billing */}
        {currentView === 'billing' && (
          <div className="space-y-8 animate-fade-up">
            <div>
              <button
                onClick={() => { setCurrentView('main'); setActiveFaq(null); }}
                className="flex items-center gap-1.5 text-xs font-bold text-primary hover:underline cursor-pointer mb-3 select-none"
              >
                <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15 18 9 12 15 6" /></svg>
                Help & Support
              </button>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">Account and billing</h2>
              <p className="text-xs text-muted-foreground mt-2 max-w-2xl leading-relaxed">
                Understand how account management and billing work at PassPrivé.
              </p>
            </div>

            {/* Subscription Subsection */}
            <section className="space-y-4">
              <h3 className="text-base font-bold text-foreground uppercase tracking-wider text-primary">Subscription</h3>
              <div className="grid gap-3 sm:grid-cols-2 items-start">
                {splitIntoColumns([
                  { id: 'bil-1', q: 'Is there a free trial?', a: 'Yes! We offer a 14-day free trial on our premium plans so you can test all features before billing begins.' },
                  { id: 'bil-2', q: 'What are the different plan inclusions?', a: 'Our plans range from Basic (1 location, standard stamps) to Growth and Enterprise (unautomated push campaigns, custom integrations, API keys, and multi-location branches).' }
                ]).map((col, colIdx) => (
                  <div key={colIdx} className="flex flex-col gap-3">
                    {col.map(faq => {
                      const isOpen = activeFaq === faq.id
                      return (
                        <div
                          key={faq.id}
                          onClick={() => toggleFaq(faq.id)}
                          className="border border-border rounded-2xl bg-card hover:border-primary/40 transition-all overflow-hidden cursor-pointer"
                        >
                          <div className="flex items-center justify-between p-4.5">
                            <span className="text-xs font-bold text-foreground">{faq.q}</span>
                            <span className={`text-muted-foreground/60 transition-transform duration-300 ${isOpen ? 'rotate-90 text-primary' : ''}`}>
                              <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6" /></svg>
                            </span>
                          </div>
                          {isOpen && (
                            <div className="px-4.5 pb-4.5 text-xs text-muted-foreground border-t border-border/40 pt-3 leading-relaxed animate-fade-up bg-muted/5">
                              {faq.a}
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                ))}
              </div>
            </section>

            {/* Billing Subsection */}
            <section className="space-y-4 border-t border-border pt-6">
              <h3 className="text-base font-bold text-foreground uppercase tracking-wider text-primary">Billing</h3>
              <div className="grid gap-3 sm:grid-cols-2 items-start">
                {splitIntoColumns([
                  { id: 'bil-3', q: 'How much is PassPrivé?', a: 'PassPrivé offers competitive pricing starting at $49/month. You can view detailed subscription rates under the Subscription Settings page.' },
                  { id: 'bil-4', q: 'When will I be billed?', a: 'Subscriptions are billed monthly or annually on a recurring cycle starting from the day your free trial ends.' },
                  { id: 'bil-5', q: 'What payment methods do you accept?', a: 'We accept all major credit/debit cards (Visa, MasterCard, American Express) and digital wallets via our secure Stripe payment gateway.' },
                  { id: 'bil-6', q: 'What currencies do you accept?', a: 'We accept payments in USD, EUR, GBP, CAD, and AUD. Your card will be billed in your local or chosen default currency.' }
                ]).map((col, colIdx) => (
                  <div key={colIdx} className="flex flex-col gap-3">
                    {col.map(faq => {
                      const isOpen = activeFaq === faq.id
                      return (
                        <div
                          key={faq.id}
                          onClick={() => toggleFaq(faq.id)}
                          className="border border-border rounded-2xl bg-card hover:border-primary/40 transition-all overflow-hidden cursor-pointer"
                        >
                          <div className="flex items-center justify-between p-4.5">
                            <span className="text-xs font-bold text-foreground">{faq.q}</span>
                            <span className={`text-muted-foreground/60 transition-transform duration-300 ${isOpen ? 'rotate-90 text-primary' : ''}`}>
                              <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6" /></svg>
                            </span>
                          </div>
                          {isOpen && (
                            <div className="px-4.5 pb-4.5 text-xs text-muted-foreground border-t border-border/40 pt-3 leading-relaxed animate-fade-up bg-muted/5">
                              {faq.a}
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                ))}
              </div>
            </section>

            <NeedMoreHelpSection />
          </div>
        )}

      </main>

      {/* Video Player Modal */}
      {videoModal && videoModal.isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950/75 backdrop-blur-md transition-all duration-300 p-4"
          onClick={() => setVideoModal(null)}
        >
          <div
            className="relative bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl w-full max-w-3xl shadow-2xl overflow-hidden animate-fade-in flex flex-col p-4 md:p-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-neutral-100 dark:border-neutral-800/60 mb-4">
              <h3 className="text-base sm:text-lg font-bold text-neutral-950 dark:text-white">
                {videoModal.title}
              </h3>
              <button
                onClick={() => setVideoModal(null)}
                className="h-8 w-8 rounded-full bg-rose-600 hover:bg-rose-700 text-white flex items-center justify-center shadow-md hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
              >
                <svg className="h-4.5 w-4.5 stroke-current stroke-[2.5]" viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Video Content */}
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-black border border-neutral-100 dark:border-neutral-800 shadow-inner">
              <iframe
                src={`https://www.youtube.com/embed/${videoModal.videoId}?autoplay=1&rel=0&modestbranding=1`}
                title={videoModal.title}
                className="absolute inset-0 w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
