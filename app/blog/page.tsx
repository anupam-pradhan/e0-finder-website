import Link from 'next/link'
import { ArrowLeft, BookOpen, Clock, Calendar, ChevronRight, Fuel, Search, ShieldCheck, Sparkles, Star, ExternalLink, Award } from 'lucide-react'
import { blogPosts } from '@/lib/blog-data'

export const metadata = {
  title: 'E0 & Ethanol Petrol Knowledge Hub India — Real Biker & Driver Guides',
  description:
    'Comprehensive Indian automotive guides on 0% ethanol petrol, E20 fuel effects on carburettors and EFI, DIY 100ml water extraction tests, dyno benchmarks, and classic motorcycle care.',
}

export default function BlogIndexPage() {
  const featuredPost = blogPosts[0]
  const otherPosts = blogPosts.slice(1)

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Top Header */}
      <header className="border-b border-border/70 bg-background/95 sticky top-0 z-40 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3.5 lg:px-8">
          <Link href="/" className="flex items-center gap-3" aria-label="E0 Finder home">
            <img src="/app-icon.png" alt="E0 Finder Logo" className="size-10 rounded-xl object-contain shadow-sm" />
            <span>
              <strong className="block text-xl leading-none">Finder</strong>
              <small className="text-xs text-muted-foreground">Find Ethanol-Free Petrol</small>
            </span>
          </Link>
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
            >
              <ArrowLeft size={16} /> Back to Home
            </Link>
            <a
              href="https://play.google.com/store/apps/details?id=com.anupampradhan.ethanolfreepetrol"
              target="_blank"
              rel="noreferrer"
              className="hidden sm:inline-flex rounded-lg bg-primary px-4 py-2 text-xs font-bold text-primary-foreground hover:bg-primary/90 shadow-xs"
            >
              Get Android App
            </a>
          </div>
        </div>
      </header>

      {/* Hero Header */}
      <section className="border-b border-border bg-gradient-to-b from-primary/[0.05] to-transparent py-14 lg:py-18">
        <div className="mx-auto max-w-6xl px-5 lg:px-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-primary">
            <BookOpen size={14} /> Indian Automotive Research & Field Data
          </div>
          <h1 className="mt-4 max-w-3xl text-4xl font-black tracking-tight sm:text-5xl text-foreground">
            E0 Petrol & Engine Health <span className="text-primary">Knowledge Hub</span>
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
            Field-tested guides, laboratory chemical analysis, dyno results, and maintenance protocols tailored specifically for Indian roads, weather, and vehicles.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-4 text-xs font-bold text-muted-foreground">
            <span className="flex items-center gap-1 text-primary"><ShieldCheck size={16} /> 100% Verified Field Data</span>
            <span>•</span>
            <span className="flex items-center gap-1 text-amber-600"><Star size={16} className="fill-amber-500" /> Rated 4.9★ by Indian Riders</span>
            <span>•</span>
            <span>Covering IOCL XP100, BPCL Speed & HPCL poWer100</span>
          </div>
        </div>
      </section>

      {/* Featured Lead Post */}
      {featuredPost && (
        <section className="mx-auto max-w-6xl px-5 pt-12 lg:px-8">
          <div className="overflow-hidden rounded-3xl border border-primary/30 bg-card shadow-sm transition-all hover:border-primary">
            <div className="grid lg:grid-cols-2">
              <div className="p-7 sm:p-10 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="rounded-full bg-primary/15 px-3 py-1 font-bold text-primary">
                      ⭐ Featured Investigation
                    </span>
                    <span className="text-muted-foreground">• {featuredPost.readTime}</span>
                  </div>
                  <h2 className="mt-4 text-2xl sm:text-3xl font-black tracking-tight leading-snug">
                    <Link href={`/blog/${featuredPost.slug}`} className="hover:text-primary transition-colors">
                      {featuredPost.title}
                    </Link>
                  </h2>
                  <p className="mt-4 text-sm sm:text-base leading-7 text-muted-foreground">
                    {featuredPost.excerpt}
                  </p>
                </div>
                <div className="mt-8 flex items-center justify-between border-t border-border pt-4">
                  <div className="text-xs text-muted-foreground">
                    By <strong className="text-foreground">{featuredPost.author.name}</strong> • {featuredPost.publishedDate}
                  </div>
                  <Link
                    href={`/blog/${featuredPost.slug}`}
                    className="inline-flex items-center gap-1 text-sm font-bold text-primary hover:underline"
                  >
                    Read Full Investigation <ChevronRight size={16} />
                  </Link>
                </div>
              </div>
              <div className="bg-muted/40 p-4 sm:p-6 flex items-center justify-center">
                <img
                  src={featuredPost.coverImage}
                  alt={featuredPost.title}
                  className="rounded-2xl max-h-[340px] w-full object-cover shadow-sm"
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Articles Grid */}
      <section className="mx-auto max-w-6xl px-5 py-12 lg:px-8 lg:py-16">
        <h2 className="text-2xl font-black text-foreground mb-8">All Research Guides & Tutorials</h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {otherPosts.map((post) => (
            <article
              key={post.slug}
              className="group flex flex-col justify-between rounded-2xl border border-border bg-card p-6 shadow-xs transition-all hover:-translate-y-1 hover:border-primary/50 hover:shadow-md"
            >
              <div>
                <div className="overflow-hidden rounded-xl bg-muted/30 mb-4">
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="h-44 w-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div className="flex items-center justify-between gap-2 text-xs text-muted-foreground">
                  <span className="rounded-full bg-primary/10 px-2.5 py-1 font-bold text-primary">
                    {post.category}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Clock size={13} /> {post.readTime}
                  </span>
                </div>

                <h3 className="mt-3 text-lg font-bold leading-snug tracking-tight group-hover:text-primary transition-colors">
                  <Link href={`/blog/${post.slug}`} className="focus:outline-none">
                    {post.title}
                  </Link>
                </h3>

                <p className="mt-3 text-xs sm:text-sm leading-6 text-muted-foreground line-clamp-3">
                  {post.excerpt}
                </p>
              </div>

              <div className="mt-6 border-t border-border pt-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">{post.publishedDate}</span>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1 font-bold text-primary hover:underline"
                  >
                    Read Guide <ChevronRight size={15} />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* CTA Footer Banner */}
      <section className="border-t border-border bg-primary/[0.04] py-14">
        <div className="mx-auto flex max-w-4xl flex-col items-center justify-between gap-6 px-5 text-center sm:flex-row sm:text-left lg:px-8">
          <div className="flex items-center gap-4">
            <img src="/app-icon.png" alt="E0 Finder App" className="size-14 rounded-2xl object-contain shadow-sm bg-white p-1" />
            <div>
              <h3 className="text-2xl font-black">Locate Pure E0 Petrol Across India</h3>
              <p className="text-sm text-muted-foreground">Download the free E0 Finder Android app with real-time GPS map & density logs.</p>
            </div>
          </div>
          <a
            href="https://play.google.com/store/apps/details?id=com.anupampradhan.ethanolfreepetrol"
            target="_blank"
            rel="noreferrer"
            className="rounded-xl bg-primary px-6 py-3.5 font-bold text-primary-foreground hover:bg-primary/90 transition-transform hover:scale-[1.02] shadow-sm shrink-0"
          >
            Download Free App
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-primary py-8 text-primary-foreground">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 text-sm sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <span>© 2026 E0 Finder. Built for Indian Drivers & Enthusiasts.</span>
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
