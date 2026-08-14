'use client'

import Link from 'next/link'
import { ArrowLeft, Mail } from 'lucide-react'

export function SitePage({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string
  title: string
  intro: string
  children: React.ReactNode
}) {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border/70 bg-background/95">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-5 py-4 lg:px-8">
          <Link href="/" className="flex items-center gap-3" aria-label="EO Finder home">
            <span className="grid size-10 place-items-center rounded-xl bg-primary font-black text-primary-foreground">E0</span>
            <span><strong className="block text-xl leading-none">Finder</strong><small className="text-xs text-muted-foreground">Find Ethanol-Free Petrol</small></span>
          </Link>
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"><ArrowLeft size={16} /> Back to home</Link>
        </div>
      </header>
      <div className="mx-auto max-w-5xl px-5 py-12 lg:px-8 lg:py-20">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary">{eyebrow}</p>
        <h1 className="mt-3 max-w-3xl text-4xl font-black tracking-tight sm:text-5xl">{title}</h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">{intro}</p>
        <article className="mt-10 max-w-3xl rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-10">{children}</article>
      </div>
      <footer className="border-t border-border bg-primary py-8 text-primary-foreground"><div className="mx-auto flex max-w-5xl flex-col gap-4 px-5 text-sm sm:flex-row sm:items-center sm:justify-between lg:px-8"><span>© 2026 EO Finder. All rights reserved.</span><Link href="mailto:support@eofinder.app" className="inline-flex items-center gap-2 hover:underline"><Mail size={16} /> support@eofinder.app</Link></div></footer>
    </main>
  )
}

export function PolicySection({ title, children }: { title: string; children: React.ReactNode }) {
  return <section className="flex flex-col gap-3 border-b border-border pb-7 last:border-0 last:pb-0"><h2 className="text-xl font-bold">{title}</h2><div className="flex flex-col gap-3 leading-7 text-muted-foreground">{children}</div></section>
}

export function BulletList({ items }: { items: string[] }) {
  return <ul className="flex list-disc flex-col gap-2 pl-5">{items.map((item) => <li key={item}>{item}</li>)}</ul>
}

export const pageLinks = [{ href: '/privacy', label: 'Privacy Policy' }, { href: '/terms', label: 'Terms of Use' }, { href: '/disclaimer', label: 'Disclaimer' }, { href: '/contact', label: 'Contact Support' }, { href: '/delete-account', label: 'Delete Account' }]
