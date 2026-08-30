'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Mail,
  ShieldAlert,
  Send,
  CheckCircle2,
  MapPin,
  Smartphone,
  Clock,
  HelpCircle,
  ChevronDown,
  Sparkles,
} from 'lucide-react'
import { SitePage, PolicySection } from '@/components/site-page'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: 'Station Correction / New E0 Pump',
    subject: '',
    message: '',
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [copiedEmail, setCopiedEmail] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('support@e0-finder.app')
    setCopiedEmail(true)
    setTimeout(() => setCopiedEmail(false), 2500)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Open user's default email client with structured mailto
    const mailtoUrl = `mailto:support@e0-finder.app?subject=[${encodeURIComponent(formData.category)}] ${encodeURIComponent(formData.subject || formData.name)}&body=Sender Name: ${encodeURIComponent(formData.name)}%0D%0ASender Email: ${encodeURIComponent(formData.email)}%0D%0A%0D%0AMessage:%0D%0A${encodeURIComponent(formData.message)}`
    window.location.href = mailtoUrl
    setIsSubmitted(true)
  }

  const faqs = [
    {
      q: 'How do I submit a new 0% ethanol petrol pump?',
      a: 'You can submit pump locations directly inside the E0 Finder mobile app or on the Web Radar (/find) by tapping "Submit Pump Report". Include the station name, brand (IndianOil XP100, HPCL poWer100), and morning Form-8 density reading if available.',
    },
    {
      q: 'How quickly does the moderation team review fuel corrections?',
      a: 'Community reports and density revisions are validated through our verification pipeline within 2 to 6 hours during operating days.',
    },
    {
      q: 'How do I permanently delete my account and user data?',
      a: 'Visit our dedicated Data Deletion Portal at /delete-account or email support@e0-finder.app with the subject "Delete My Account". Your profile and uploaded logs will be purged permanently within 24 to 48 hours in compliance with Google Play Data Safety policies.',
    },
    {
      q: 'Can I advertise my fuel outlet or automotive brand on E0 Finder?',
      a: 'For business inquiries, verified fuel depot listings, or partnership opportunities, select "Business & Partnerships" in the form or email partnerships@e0-finder.app.',
    },
  ]

  return (
    <SitePage
      eyebrow="Help & Support"
      title="Contact E0 Finder Support Hub"
      intro="Have a question about pure E0 petrol, need station data updated, or require app assistance? Our dedicated automotive support team is here to assist you."
    >
      <div className="flex flex-col gap-10">
        {/* Quick Action Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {/* Email Support Card */}
          <div className="flex flex-col justify-between rounded-2xl border border-border bg-card p-5 shadow-xs transition-all hover:border-primary/50 hover:shadow-md">
            <div>
              <div className="grid size-10 place-items-center rounded-xl bg-primary/10 text-primary mb-3">
                <Mail size={20} />
              </div>
              <strong className="block text-sm font-bold text-foreground">Direct Email Support</strong>
              <p className="mt-1 text-xs text-muted-foreground leading-5">
                support@e0-finder.app
              </p>
            </div>
            <div className="mt-4 flex gap-2">
              <a
                href="mailto:support@e0-finder.app"
                className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-xs font-bold text-primary-foreground hover:bg-primary/90"
              >
                Send Email
              </a>
              <button
                onClick={handleCopyEmail}
                className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-semibold text-foreground hover:bg-muted"
              >
                {copiedEmail ? 'Copied! ✓' : 'Copy'}
              </button>
            </div>
          </div>

          {/* Account Deletion Card */}
          <Link
            href="/delete-account"
            className="group flex flex-col justify-between rounded-2xl border border-border bg-card p-5 shadow-xs transition-all hover:border-primary/50 hover:shadow-md"
          >
            <div>
              <div className="grid size-10 place-items-center rounded-xl bg-destructive/10 text-destructive mb-3">
                <ShieldAlert size={20} />
              </div>
              <strong className="block text-sm font-bold text-foreground group-hover:text-primary transition-colors">
                Account & Data Deletion
              </strong>
              <p className="mt-1 text-xs text-muted-foreground leading-5">
                Google Play compliant data deletion portal and privacy controls.
              </p>
            </div>
            <span className="mt-4 text-xs font-bold text-primary group-hover:underline">
              Open Deletion Portal →
            </span>
          </Link>

          {/* Android App Support */}
          <a
            href="https://play.google.com/store/apps/details?id=com.anupampradhan.ethanolfreepetrol"
            target="_blank"
            rel="noreferrer"
            className="group flex flex-col justify-between rounded-2xl border border-border bg-card p-5 shadow-xs transition-all hover:border-primary/50 hover:shadow-md sm:col-span-2 lg:col-span-1"
          >
            <div>
              <div className="grid size-10 place-items-center rounded-xl bg-blue-500/10 text-blue-600 mb-3">
                <Smartphone size={20} />
              </div>
              <strong className="block text-sm font-bold text-foreground group-hover:text-primary transition-colors">
                Google Play Store Listing
              </strong>
              <p className="mt-1 text-xs text-muted-foreground leading-5">
                Download the latest version or report app feedback on Google Play.
              </p>
            </div>
            <span className="mt-4 text-xs font-bold text-primary group-hover:underline">
              View on Google Play ↗
            </span>
          </a>
        </div>

        {/* Interactive Contact Form */}
        <div className="rounded-3xl border border-border bg-card p-6 lg:p-8 shadow-sm">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
              <Sparkles size={13} /> Fast Response Form
            </span>
            <h2 className="mt-3 text-xl font-black text-foreground sm:text-2xl">
              Send a Message to Support
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-muted-foreground">
              Fill out the details below and our team will get back to you promptly.
            </p>
          </div>

          {isSubmitted ? (
            <div className="mt-6 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-6 text-center">
              <CheckCircle2 size={36} className="mx-auto text-emerald-600 mb-2" />
              <h3 className="text-base font-bold text-emerald-800">
                Message Dispatched to support@e0-finder.app
              </h3>
              <p className="mt-1 text-xs text-emerald-700 max-w-md mx-auto">
                Your email client was opened with your structured request. We review all incoming motorist tickets within 24 hours.
              </p>
              <button
                onClick={() => setIsSubmitted(false)}
                className="mt-4 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-700"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-6 grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-bold text-foreground mb-1.5">
                  Your Full Name <span className="text-destructive">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary shadow-2xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-foreground mb-1.5">
                  Email Address <span className="text-destructive">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="e.g. rahul@example.com"
                  className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary shadow-2xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-foreground mb-1.5">
                  Inquiry Category <span className="text-destructive">*</span>
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-xs font-semibold text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary shadow-2xs"
                >
                  <option value="Station Correction / New E0 Pump">Station Correction / New E0 Pump</option>
                  <option value="App Bug / Technical Support">App Bug / Technical Support</option>
                  <option value="Privacy & Account Deletion">Privacy & Account Deletion</option>
                  <option value="Business & Partnerships">Business & Partnerships</option>
                  <option value="General Feedback">General Feedback</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-foreground mb-1.5">
                  Subject / Summary <span className="text-destructive">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="e.g. New XP100 Bunk in Whitefield"
                  className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary shadow-2xs"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-foreground mb-1.5">
                  Message Details <span className="text-destructive">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Please describe your issue, station address, observed Form-8 density, or question in detail..."
                  className="w-full rounded-xl border border-border bg-background p-3 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary shadow-2xs resize-none"
                />
              </div>

              <div className="sm:col-span-2 flex items-center justify-between gap-4 pt-2">
                <span className="text-[11px] text-muted-foreground">
                  🔒 We respect your privacy. No spam guaranteed.
                </span>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-xs font-bold text-primary-foreground shadow-md transition-transform hover:scale-[1.02] hover:bg-primary/90"
                >
                  <Send size={14} /> Send Message
                </button>
              </div>
            </form>
          )}
        </div>

        {/* What to Include Guide */}
        <div className="grid gap-6 sm:grid-cols-2">
          <PolicySection title="Fuel Station Corrections">
            <p>
              When reporting an unlisted or closed pump, please provide the <strong>Station Name</strong>, <strong>Brand (IndianOil, BPCL, HPCL)</strong>, <strong>City/Pincode</strong>, and observed <strong>Form-8 Density</strong>. Attaching a photo of your fuel receipt accelerates verification!
            </p>
          </PolicySection>

          <PolicySection title="App Support & Bug Reports">
            <p>
              If encountering an app glitch, please mention your <strong>Device Model</strong> (e.g. Samsung Galaxy S24, OnePlus 12), <strong>Android Version</strong>, and what occurred prior to the issue.
            </p>
          </PolicySection>
        </div>

        {/* Frequently Asked Questions */}
        <div>
          <div className="mb-4">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
              <HelpCircle size={13} /> Knowledge Base
            </span>
            <h3 className="mt-2 text-xl font-bold text-foreground">
              Frequently Asked Support Questions
            </h3>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-border bg-card overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-4 text-left font-bold text-xs sm:text-sm text-foreground hover:bg-muted/50"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    size={16}
                    className={`text-muted-foreground transition-transform duration-200 shrink-0 ml-2 ${
                      openFaq === idx ? 'rotate-180 text-primary' : ''
                    }`}
                  />
                </button>
                {openFaq === idx && (
                  <div className="px-4 pb-4 pt-1 text-xs leading-relaxed text-muted-foreground border-t border-border/40 bg-muted/20">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Support SLA Banner */}
        <div className="flex items-center gap-3 rounded-2xl bg-primary/[0.07] border border-primary/20 p-4 text-xs text-foreground font-medium">
          <Clock size={18} className="shrink-0 text-primary" />
          <span>
            <strong>Support Hours:</strong> Monday – Saturday, 9:00 AM – 7:00 PM IST. Typical email response time is under 12 hours.
          </span>
        </div>
      </div>
    </SitePage>
  )
}
