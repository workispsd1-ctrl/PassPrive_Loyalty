'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'

// Animation variants matching Home/Explore
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const } },
}

export default function HelpSupportPage() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate sending email
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setName('')
    setEmail('')
    setSubject('')
    setMessage('')
    setIsSubmitting(false)
    setSubmitted(true)
    
    setTimeout(() => {
      setSubmitted(false)
      router.back()
    }, 1000)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="flex-1 px-5 pt-12 pb-24 space-y-6"
      >
        {/* Header with back arrow */}
        <motion.div variants={fadeUp} className="flex items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.back()}
            className="h-10 w-10 rounded-2xl flex items-center justify-center bg-zinc-900/60 border border-white/10 text-white cursor-pointer"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="h-4 w-4">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </motion.button>
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-white leading-none">Support</h1>
            <p className="text-xs text-white/45 mt-1.5">
              Contact customer support
            </p>
          </div>
        </motion.div>

        {/* Contact Support Note */}
        <motion.div
          variants={fadeUp}
          className="rounded-3xl border border-white/10 bg-zinc-900/40 p-5 backdrop-blur-sm"
        >
          <div className="flex items-start gap-3.5">
            <div className="h-8 w-8 rounded-xl flex-shrink-0 flex items-center justify-center bg-primary/10 border border-primary/20 text-primary">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-4.5 w-4.5">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-bold text-white leading-tight">Get in Touch</p>
              <p className="text-xs text-white/40 mt-1 leading-relaxed">
                Submit a request below and our team will get back to you within 24 hours.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <motion.div variants={stagger} className="space-y-4">
            {/* Name */}
            <motion.div variants={fadeUp}>
              <label className="block text-xs font-bold uppercase tracking-wider text-white/35 mb-2 px-1">
                Your Name <span className="text-primary">*</span>
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                required
                className="w-full px-4 py-3.5 rounded-2xl border border-white/10 bg-zinc-900/40 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-primary/50 transition-colors"
              />
            </motion.div>

            {/* Email */}
            <motion.div variants={fadeUp}>
              <label className="block text-xs font-bold uppercase tracking-wider text-white/35 mb-2 px-1">
                Email Address <span className="text-primary">*</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full px-4 py-3.5 rounded-2xl border border-white/10 bg-zinc-900/40 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-primary/50 transition-colors"
              />
            </motion.div>

            {/* Subject */}
            <motion.div variants={fadeUp}>
              <label className="block text-xs font-bold uppercase tracking-wider text-white/35 mb-2 px-1">Subject</label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="What's this about?"
                className="w-full px-4 py-3.5 rounded-2xl border border-white/10 bg-zinc-900/40 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-primary/50 transition-colors"
              />
            </motion.div>

            {/* Message */}
            <motion.div variants={fadeUp}>
              <label className="block text-xs font-bold uppercase tracking-wider text-white/35 mb-2 px-1">
                Message <span className="text-primary">*</span>
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Describe your issue or question..."
                required
                rows={4}
                className="w-full px-4 py-3.5 rounded-2xl border border-white/10 bg-zinc-900/40 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-primary/50 transition-colors resize-none"
              />
            </motion.div>

            {/* Submit Button */}
            <motion.button
              variants={fadeUp}
              type="submit"
              disabled={isSubmitting || submitted}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full mt-4 py-4 rounded-2xl text-sm font-bold tracking-wide transition-all cursor-pointer border shadow-lg flex items-center justify-center gap-2
                ${submitted
                  ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400 shadow-emerald-500/5'
                  : 'bg-primary/15 border-primary/30 text-primary shadow-primary/5 hover:bg-primary/20 disabled:opacity-50'
                }
              `}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="h-4 w-4">
                <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
              </svg>
              {isSubmitting ? 'Sending...' : submitted ? '✓ Sent Successfully!' : 'Send Message'}
            </motion.button>
          </motion.div>
        </form>

        {/* Alternative Contact */}
        <motion.div variants={fadeUp} className="text-center pt-2">
          <p className="text-xs text-white/35">
            You can also email us directly at{' '}
            <a href="mailto:support@passprive.in" className="font-bold text-primary hover:underline">
              support@passprive.in
            </a>
          </p>
        </motion.div>
      </motion.div>
    </div>
  )
}
