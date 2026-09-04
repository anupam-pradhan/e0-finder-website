import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { GooglePlayIcon } from '@/components/google-play-icon'
import { BlogClientSection } from '@/components/blog/blog-client-section'

export const metadata = {
  title: 'E0 Petrol & Engine Health Knowledge Hub | Blog & Research Guides',
  description:
    'Independent field research, dyno benchmarks, DIY fuel tests, and maintenance guides for Indian bikes and cars. All about 0% ethanol petrol, E20 damage prevention, and engine protection.',
}

export default function BlogIndexPage() {
  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Top Header — static, server-rendered */}
      <header className="sticky top-0 z-40 border-b border-border/70 bg-background/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 lg:px-8">
          <Link href="/" className="flex items-center gap-2.5 shrink-0" aria-label="E0 Finder home">
            <img
              src="/app-icon.png"
              alt="E0 Finder Logo"
              className="size-9 rounded-xl object-contain shadow-xs shrink-0"
            />
            <div className="flex flex-col justify-center leading-none">
              <span className="text-xl font-black tracking-tight text-foreground flex items-center gap-1">
                <span className="text-primary">E0</span>Finder
              </span>
              <span className="text-[10px] font-medium text-muted-foreground mt-0.5 whitespace-nowrap hidden min-[400px]:block">
                Knowledge &amp; Research Hub
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-primary hover:underline"
            >
              <ArrowLeft size={16} /> Home
            </Link>
            <a
              href="https://play.google.com/store/apps/details?id=com.anupampradhan.ethanolfreepetrol"
              target="_blank"
              rel="noreferrer"
              className="hidden sm:inline-flex items-center gap-2 rounded-lg bg-primary px-3.5 py-1.5 text-xs font-bold text-primary-foreground hover:bg-primary/90 shadow-xs"
            >
              <GooglePlayIcon className="size-3.5" /> Get App
            </a>
          </div>
        </div>
      </header>

      {/* All interactive content (search, filter, post grid) — client component */}
      <BlogClientSection />

      {/* Footer — static, server-rendered */}
      <footer className="border-t border-border bg-primary py-8 text-primary-foreground">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 text-sm sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <span>© 2026 E0 Finder. Built for Indian Drivers &amp; Enthusiasts.</span>
          <div className="flex gap-4">
            <Link href="/" className="hover:underline">Home</Link>
            <Link href="/privacy" className="hover:underline">Privacy</Link>
            <Link href="/terms" className="hover:underline">Terms</Link>
            <Link href="/contact" className="hover:underline">Contact</Link>
          </div>
        </div>
      </footer>
    </main>
  )
}
