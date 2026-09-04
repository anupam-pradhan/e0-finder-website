'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, BookOpen } from 'lucide-react'

const navItems = [
  ['Calculator', 'calculator'],
  ['Vehicles', 'vehicles'],
  ['E0 vs E20', 'fuel-guide'],
  ['State Index', 'state-index'],
  ['Trends', 'trends'],
  ['Reviews', 'reviews'],
  ['Cities', 'cities'],
  ['FAQ', 'faq'],
]

const playStoreUrl =
  'https://play.google.com/store/apps/details?id=com.anupampradhan.ethanolfreepetrol'

function GooglePlayIcon({ className = 'size-5 shrink-0' }: { className?: string }) {
  return (
    <img
      src="/assets/images/google-play-icon.png"
      alt="Google Play"
      className={`${className} object-contain`}
      loading="eager"
    />
  )
}

export function InteractiveHeader() {
  const [menuOpen, setMenuOpen] = useState(false)

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 lg:px-8">
        <a href="#home" className="flex items-center gap-2.5 shrink-0" aria-label="E0 Finder home">
          <img src="/app-icon.png" alt="E0 Finder Logo" className="size-9 sm:size-10 rounded-xl object-contain shadow-xs shrink-0" />
          <div className="flex flex-col justify-center leading-none">
            <span className="text-xl sm:text-2xl font-black tracking-tight text-foreground flex items-center gap-1">
              <span className="text-primary">E0</span>Finder
            </span>
            <span className="text-[10px] sm:text-[11px] font-medium text-muted-foreground mt-1 whitespace-nowrap hidden min-[400px]:block">
              Find 0% Ethanol Petrol
            </span>
          </div>
        </a>

        <nav className="hidden items-center gap-4 xl:gap-5 lg:flex">
          {navItems.map(([label, id]) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className="cursor-pointer text-xs xl:text-sm font-semibold text-foreground/80 transition-colors hover:text-primary whitespace-nowrap"
            >
              {label}
            </button>
          ))}
          <Link
            href="/blog"
            className="text-xs xl:text-sm font-semibold text-foreground/80 hover:text-primary flex items-center gap-1 whitespace-nowrap"
          >
            <BookOpen size={14} /> Blog &amp; Guides
          </Link>
        </nav>

        <div className="flex items-center gap-3 shrink-0">
          <a
            href={playStoreUrl}
            target="_blank"
            rel="noreferrer"
            className="hidden items-center gap-2 rounded-xl bg-primary px-4 py-2 text-xs xl:text-sm font-bold text-primary-foreground transition-transform hover:scale-[1.02] sm:flex shadow-xs whitespace-nowrap"
          >
            <GooglePlayIcon className="size-4" /> Get App
          </a>
          <button
            className="rounded-lg p-2 lg:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="flex flex-col gap-1 border-t border-border px-5 py-4 lg:hidden">
          {[['Home', 'home'], ...navItems].map(([label, id]) => (
            <button
              key={id}
              className="rounded-md px-3 py-2 text-left font-semibold hover:bg-muted"
              onClick={() => scrollTo(id)}
            >
              {label}
            </button>
          ))}
          <Link
            href="/blog"
            className="rounded-md px-3 py-2 text-left font-semibold text-foreground/80 hover:bg-muted flex items-center gap-2"
            onClick={() => setMenuOpen(false)}
          >
            <BookOpen size={16} /> Blog &amp; Knowledge Hub
          </Link>
        </nav>
      )}
    </header>
  )
}
