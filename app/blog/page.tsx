'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Clock,
  Calendar,
  ChevronRight,
  Fuel,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  ExternalLink,
  Award,
  Layers,
  Flame,
  Wrench,
  Gauge,
  CheckCircle2,
  SlidersHorizontal,
  X,
  Compass,
  ArrowUpRight,
} from 'lucide-react'
import { blogPosts } from '@/lib/blog-data'

const categories = [
  'All Research',
  'Fuel Investigation',
  'Superbikes & Performance',
  'Cars & Turbo Engines',
  'Classic Bikes & Cruisers',
  'Fuel Quality & Rights',
  'DIY Testing',
  'Performance Testing',
  'Two-Wheeler Care',
  'Fuel Chemistry',
]

export default function BlogIndexPage() {
  const [selectedCategory, setSelectedCategory] = useState('All Research')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredPosts = useMemo(() => {
    return blogPosts.filter((post) => {
      const matchesCategory =
        selectedCategory === 'All Research' || post.category === selectedCategory
      const matchesSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.keywords?.some((kw) => kw.toLowerCase().includes(searchQuery.toLowerCase()))

      return matchesCategory && matchesSearch
    })
  }, [selectedCategory, searchQuery])

  const featuredPost = blogPosts[0]
  const listPosts = searchQuery || selectedCategory !== 'All Research' ? filteredPosts : filteredPosts.slice(1)

  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Top Header */}
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
                Knowledge & Research Hub
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
              className="hidden sm:inline-flex rounded-lg bg-primary px-4 py-2 text-xs font-bold text-primary-foreground hover:bg-primary/90 shadow-xs"
            >
              Get Android App
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative border-b border-border bg-gradient-to-b from-primary/[0.07] via-primary/[0.02] to-transparent py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-primary">
                <BookOpen size={14} /> Indian Automotive Engineering & Field Research
              </div>
              <h1 className="mt-4 max-w-3xl text-3xl font-black tracking-tight sm:text-5xl lg:text-6xl text-foreground leading-[1.1]">
                E0 Petrol & Engine Health <span className="text-primary">Knowledge Hub</span>
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
                Independent field research, laboratory chemical analysis, chassis dyno benchmarks, and maintenance guides tailored specifically for Indian roads, weather, and vehicles.
              </p>

              {/* Trust Badges */}
              <div className="mt-6 flex flex-wrap items-center gap-3 sm:gap-6 text-xs font-bold text-muted-foreground">
                <span className="flex items-center gap-1.5 text-foreground">
                  <ShieldCheck size={16} className="text-primary" /> Verified Field Telemetry
                </span>
                <span className="hidden sm:inline text-border">•</span>
                <span className="flex items-center gap-1.5 text-foreground">
                  <Star size={16} className="fill-amber-500 text-amber-500" /> Rated 4.9★ by 2,500+ Motorists
                </span>
                <span className="hidden sm:inline text-border">•</span>
                <span className="text-foreground">IS 2796 & ASTM-53B Standards</span>
              </div>
            </div>

            {/* Quick Search Widget */}
            <div className="w-full lg:max-w-md shrink-0">
              <div className="relative rounded-2xl border border-border bg-card p-2 shadow-sm">
                <div className="relative flex items-center">
                  <Search size={18} className="absolute left-3 text-muted-foreground" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search guides, vehicles, fuel grades..."
                    className="w-full rounded-xl bg-muted/40 py-2.5 pl-10 pr-10 text-sm font-medium text-foreground placeholder:text-muted-foreground focus:bg-background focus:outline-none focus:ring-2 focus:ring-primary/30"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 text-muted-foreground hover:text-foreground"
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Category Filter Pills */}
          <div className="mt-10 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => {
              const count =
                cat === 'All Research'
                  ? blogPosts.length
                  : blogPosts.filter((p) => p.category === cat).length

              if (count === 0 && cat !== 'All Research') return null

              const isActive = selectedCategory === cat
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`inline-flex shrink-0 items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-primary text-primary-foreground shadow-sm shadow-primary/25 scale-[1.02]'
                      : 'border border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground'
                  }`}
                >
                  <span>{cat}</span>
                  <span
                    className={`rounded-full px-1.5 py-0.2 text-[10px] ${
                      isActive ? 'bg-white/20 text-white' : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* Featured Lead Post (Only shown when not actively filtering by query) */}
      {!searchQuery && selectedCategory === 'All Research' && featuredPost && (
        <section className="mx-auto max-w-7xl px-4 pt-12 lg:px-8">
          <div className="group relative overflow-hidden rounded-3xl border border-border bg-card shadow-sm transition-all hover:border-primary/50 hover:shadow-md">
            <div className="grid lg:grid-cols-12">
              <div className="p-6 sm:p-10 lg:col-span-7 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 text-xs">
                    <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 font-bold text-primary">
                      <Sparkles size={13} /> Featured Lead Investigation
                    </span>
                    <span className="text-muted-foreground flex items-center gap-1">
                      <Clock size={13} /> {featuredPost.readTime}
                    </span>
                  </div>

                  <h2 className="mt-4 text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight leading-tight text-foreground group-hover:text-primary transition-colors">
                    <Link href={`/blog/${featuredPost.slug}`}>
                      {featuredPost.title}
                    </Link>
                  </h2>

                  <p className="mt-4 text-sm sm:text-base leading-7 text-muted-foreground line-clamp-3">
                    {featuredPost.excerpt}
                  </p>
                </div>

                <div className="mt-8 border-t border-border pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="grid size-10 place-items-center rounded-full bg-primary/10 font-black text-primary text-sm">
                      {featuredPost.author.name.charAt(0)}
                    </div>
                    <div>
                      <strong className="block text-xs font-bold text-foreground">
                        {featuredPost.author.name}
                      </strong>
                      <span className="text-[11px] text-muted-foreground">
                        {featuredPost.author.role} • {featuredPost.publishedDate}
                      </span>
                    </div>
                  </div>

                  <Link
                    href={`/blog/${featuredPost.slug}`}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-5 py-2.5 text-xs font-bold text-primary-foreground shadow-xs transition-transform hover:scale-[1.02]"
                  >
                    Read Investigation <ArrowRight size={14} />
                  </Link>
                </div>
              </div>

              <div className="relative bg-muted/40 p-6 lg:col-span-5 flex items-center justify-center border-t lg:border-t-0 lg:border-l border-border">
                <img
                  src={featuredPost.coverImage}
                  alt={featuredPost.title}
                  className="rounded-2xl max-h-[360px] w-full object-cover shadow-sm group-hover:scale-[1.02] transition-transform duration-300"
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Main Articles Grid */}
      <section className="mx-auto max-w-7xl px-4 py-12 lg:px-8 lg:py-16">
        <div className="flex items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-black text-foreground">
              {searchQuery
                ? `Search Results for "${searchQuery}"`
                : selectedCategory === 'All Research'
                ? 'All Automotive Research & Field Guides'
                : `${selectedCategory} Guides`}
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              Showing {filteredPosts.length} in-depth technical {filteredPosts.length === 1 ? 'guide' : 'guides'}
            </p>
          </div>
        </div>

        {filteredPosts.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-border bg-card p-12 text-center max-w-lg mx-auto my-8">
            <div className="mx-auto grid size-12 place-items-center rounded-2xl bg-primary/10 text-primary">
              <Search size={22} />
            </div>
            <h3 className="mt-4 text-lg font-bold text-foreground">No matching research articles</h3>
            <p className="mt-2 text-xs text-muted-foreground">
              Try searching with another keyword like "XP100", "Royal Enfield", "Superbike", or "Density".
            </p>
            <button
              onClick={() => {
                setSearchQuery('')
                setSelectedCategory('All Research')
              }}
              className="mt-6 rounded-xl bg-primary px-4 py-2 text-xs font-bold text-primary-foreground hover:bg-primary/90"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {listPosts.map((post) => (
              <article
                key={post.slug}
                className="group flex flex-col justify-between rounded-2xl border border-border bg-card p-6 shadow-xs transition-all duration-200 hover:-translate-y-1 hover:border-primary/50 hover:shadow-md"
              >
                <div>
                  <div className="relative overflow-hidden rounded-xl bg-muted/40 mb-4 aspect-[16/9]">
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <span className="absolute top-3 left-3 rounded-full bg-background/90 backdrop-blur px-2.5 py-1 text-[11px] font-bold text-primary shadow-xs">
                      {post.category}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-2 text-xs text-muted-foreground mb-2.5">
                    <span className="flex items-center gap-1">
                      <Calendar size={13} /> {post.publishedDate}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={13} /> {post.readTime}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold leading-snug tracking-tight text-foreground group-hover:text-primary transition-colors">
                    <Link href={`/blog/${post.slug}`} className="focus:outline-none">
                      {post.title}
                    </Link>
                  </h3>

                  <p className="mt-2.5 text-xs sm:text-sm leading-6 text-muted-foreground line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>

                <div className="mt-6 border-t border-border pt-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="grid size-7 place-items-center rounded-full bg-primary/10 font-bold text-primary text-xs">
                      {post.author.name.charAt(0)}
                    </div>
                    <span className="text-xs font-semibold text-foreground truncate max-w-[120px]">
                      {post.author.name}
                    </span>
                  </div>

                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-primary group-hover:underline"
                  >
                    Read Guide <ChevronRight size={14} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* App Marketing CTA Banner */}
      <section className="border-t border-border bg-gradient-to-br from-primary/[0.06] via-primary/[0.02] to-background py-16">
        <div className="mx-auto max-w-5xl px-4 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 rounded-3xl border border-primary/30 bg-card p-8 shadow-sm">
            <div className="flex items-start gap-5">
              <img
                src="/app-icon.png"
                alt="E0 Finder Official App"
                className="size-16 rounded-2xl object-contain shadow-md bg-white p-1 shrink-0"
              />
              <div>
                <span className="inline-flex items-center gap-1 rounded-full bg-primary/15 px-3 py-1 text-xs font-bold text-primary uppercase tracking-wider">
                  <ShieldCheck size={14} /> Real-Time Engine Protection
                </span>
                <h3 className="mt-2 text-2xl sm:text-3xl font-black text-foreground">
                  Find Pure 0% Ethanol Petrol Near You
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-xl">
                  Download <strong>E0 Finder</strong> for Android. Real-time verified pumps, live density logs (Form-8), turn-by-turn navigation, and crowd-verified reports across 500+ Indian cities.
                </p>
              </div>
            </div>

            <div className="flex flex-col items-center gap-2 shrink-0 w-full md:w-auto">
              <a
                href="https://play.google.com/store/apps/details?id=com.anupampradhan.ethanolfreepetrol"
                target="_blank"
                rel="noreferrer"
                className="flex w-full md:w-auto items-center justify-center gap-2.5 rounded-2xl bg-primary px-8 py-4 text-sm font-bold text-primary-foreground shadow-lg transition-transform hover:scale-[1.02] hover:bg-primary/90"
              >
                Download on Google Play <ExternalLink size={16} />
              </a>
              <span className="text-[11px] font-medium text-muted-foreground">
                100% Free • Rated 4.9★ by 2,500+ Motorists
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-primary py-8 text-primary-foreground">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 text-sm sm:flex-row sm:items-center sm:justify-between lg:px-8">
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
