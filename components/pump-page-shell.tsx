import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

/** Shared header/footer chrome for the pump and fuel-grade pages (server component). */
export function PumpPageShell({ children, backHref = '/find', backLabel = 'Live finder' }: { children: React.ReactNode; backHref?: string; backLabel?: string }) {
  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground focus:shadow-lg"
      >
        Skip to content
      </a>
      <header className="sticky top-0 z-40 border-b border-border/70 bg-background/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3.5 lg:px-8">
          <Link href="/" className="flex items-center gap-2.5 shrink-0" aria-label="E0 Finder home">
            <img src="/app-icon.png" alt="E0 Finder Logo" className="size-9 rounded-xl object-contain shadow-xs shrink-0" />
            <span className="text-xl font-black tracking-tight text-foreground">
              <span className="text-primary">E0</span>Finder
            </span>
          </Link>
          <nav aria-label="Section navigation" className="flex items-center gap-4 text-sm font-semibold">
            <Link href="/fuel/xp100" className="hidden sm:inline text-foreground/80 hover:text-primary">
              XP100
            </Link>
            <Link href="/fuel/power100" className="hidden sm:inline text-foreground/80 hover:text-primary">
              poWer100
            </Link>
            <Link href="/fuel/ethanol-free" className="hidden sm:inline text-foreground/80 hover:text-primary">
              E0 pumps
            </Link>
            <Link href="/city" className="hidden sm:inline text-foreground/80 hover:text-primary">
              Cities
            </Link>
            <Link href={backHref} className="inline-flex items-center gap-1.5 text-primary hover:underline">
              <ArrowLeft size={16} /> {backLabel}
            </Link>
          </nav>
        </div>
      </header>
      <div id="main">{children}</div>
      <footer className="border-t border-border bg-muted/20 py-8 text-center text-xs text-muted-foreground">
        <p>
          Listings come from oil company locators, community reports and Google Maps. Availability changes daily. Confirm the grade at the pump.{' '}
          <Link href="/methodology" className="font-semibold text-primary hover:underline">
            How we verify
          </Link>
        </p>
      </footer>
    </main>
  )
}
