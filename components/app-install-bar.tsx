'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { X } from 'lucide-react'
import { GooglePlayIcon } from '@/components/google-play-icon'

const playStoreUrl =
  'https://play.google.com/store/apps/details?id=com.anupampradhan.ethanolfreepetrol'

/**
 * Persistent, dismissible "install the app" bar shown across the site to drive
 * Google Play installs. Remembers dismissal in localStorage. Hidden on /find,
 * which has its own fixed bottom controls.
 */
export function AppInstallBar() {
  const pathname = usePathname()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    try {
      if (localStorage.getItem('e0-install-dismissed') === '1') return
    } catch {
      /* ignore */
    }
    const t = setTimeout(() => setVisible(true), 1400)
    return () => clearTimeout(t)
  }, [])

  const dismiss = () => {
    setVisible(false)
    try {
      localStorage.setItem('e0-install-dismissed', '1')
    } catch {
      /* ignore */
    }
  }

  if (!visible || (pathname && pathname.startsWith('/find'))) return null

  return (
    <div className="e0-fade-up fixed inset-x-0 bottom-0 z-[60] px-3 pb-3">
      <div className="mx-auto flex max-w-3xl items-center gap-3 rounded-2xl border border-border bg-card px-3 py-2.5 shadow-lg ring-1 ring-black/5">
        <img
          src="/app-icon.png"
          alt="E0 Finder app icon"
          className="size-10 shrink-0 rounded-xl object-contain"
        />
        <div className="min-w-0 flex-1">
          <strong className="block text-sm font-black leading-tight text-foreground">
            Get the E0 Finder app
          </strong>
          <span className="block truncate text-xs text-muted-foreground">
            Live 0% ethanol pumps near you, on the map. Free on Android.
          </span>
        </div>
        <a
          href={playStoreUrl}
          target="_blank"
          rel="noreferrer"
          className="e0-btn-gradient inline-flex shrink-0 items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-bold shadow-md"
        >
          <GooglePlayIcon className="size-4" /> Install
        </a>
        <button
          onClick={dismiss}
          aria-label="Dismiss app install banner"
          className="shrink-0 rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  )
}
