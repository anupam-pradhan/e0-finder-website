import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  ArrowLeft,
  Clock,
  Calendar,
  Share2,
  Fuel,
  ShieldCheck,
  Download,
  ExternalLink,
  ChevronRight,
  Sparkles,
  CheckCircle2,
  MapPin,
  Star,
  Users,
  AlertTriangle,
  Smartphone,
} from 'lucide-react'
import { blogPosts } from '@/lib/blog-data'
import type { Metadata } from 'next'

export function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = blogPosts.find((p) => p.slug === slug)
  if (!post) return {}

  const url = `https://e0-finder.app/blog/${post.slug}`

  return {
    title: post.metaTitle,
    description: post.metaDescription,
    keywords: post.keywords,
    authors: [{ name: post.author.name }],
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: 'article',
      url,
      title: post.metaTitle,
      description: post.metaDescription,
      publishedTime: new Date(post.publishedDate).toISOString(),
      authors: [post.author.name],
      images: [
        {
          url: post.coverImage,
          width: 1024,
          height: 500,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.metaTitle,
      description: post.metaDescription,
      images: [post.coverImage],
    },
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = blogPosts.find((p) => p.slug === slug)

  if (!post) {
    notFound()
  }

  const relatedPosts = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 3)

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.metaDescription,
    image: `https://e0-finder.app${post.coverImage}`,
    author: {
      '@type': 'Person',
      name: post.author.name,
      jobTitle: post.author.role,
    },
    publisher: {
      '@type': 'Organization',
      name: 'E0 Finder',
      logo: {
        '@type': 'ImageObject',
        url: 'https://e0-finder.app/app-icon.png',
      },
    },
    datePublished: new Date(post.publishedDate).toISOString(),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://e0-finder.app/blog/${post.slug}`,
    },
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Schema.org Article Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      {/* Top Navigation */}
      <header className="sticky top-0 z-40 border-b border-border/70 bg-background/95 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-5 py-3.5 lg:px-8">
          <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline">
            <ArrowLeft size={16} /> All Guides & Research
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2">
              <img src="/app-icon.png" alt="E0 Finder Logo" className="size-8 rounded-lg object-contain shadow-xs" />
              <span className="font-bold text-sm">E0 Finder</span>
            </Link>
            <a
              href="https://play.google.com/store/apps/details?id=com.anupampradhan.ethanolfreepetrol"
              target="_blank"
              rel="noreferrer"
              className="hidden sm:inline-flex rounded-lg bg-primary px-3.5 py-1.5 text-xs font-bold text-primary-foreground hover:bg-primary/90"
            >
              Get Free App
            </a>
          </div>
        </div>
      </header>

      {/* Article Container */}
      <article className="mx-auto max-w-4xl px-5 py-10 lg:px-8 lg:py-14">
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center gap-2 text-xs text-muted-foreground">
          <Link href="/" className="hover:text-primary">Home</Link>
          <ChevronRight size={12} />
          <Link href="/blog" className="hover:text-primary">Blog</Link>
          <ChevronRight size={12} />
          <span className="text-foreground font-medium truncate max-w-[240px] sm:max-w-md">{post.category}</span>
        </nav>

        {/* Category & Meta Header */}
        <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
          <span className="rounded-full bg-primary/10 px-3 py-1 font-bold text-primary">
            {post.category}
          </span>
          <span>•</span>
          <span className="inline-flex items-center gap-1 font-medium">
            <Clock size={13} /> {post.readTime}
          </span>
          <span>•</span>
          <span>{post.publishedDate}</span>
        </div>

        {/* Title */}
        <h1 className="mt-4 text-3xl font-black leading-tight tracking-tight sm:text-4xl lg:text-5xl text-foreground">
          {post.title}
        </h1>

        {/* Excerpt Lead */}
        <p className="mt-5 text-lg leading-8 text-muted-foreground border-l-4 border-primary pl-4 py-1 italic bg-muted/30 rounded-r-xl">
          {post.excerpt}
        </p>

        {/* Author Card */}
        <div className="mt-6 flex items-center justify-between border-y border-border py-4">
          <div className="flex items-center gap-3">
            <div className="grid size-11 place-items-center rounded-full bg-primary/10 font-black text-primary text-base">
              {post.author.name.charAt(0)}
            </div>
            <div>
              <strong className="block text-sm font-bold text-foreground">{post.author.name}</strong>
              <span className="text-xs text-muted-foreground">{post.author.role} • India</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-bold text-amber-600">
            <Star size={13} className="fill-amber-500" /> 4.9★ E0 Finder App
          </div>
        </div>

        {/* Featured Cover Graphic */}
        <div className="mt-8 overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full max-h-[380px] object-cover"
          />
        </div>

        {/* Key Takeaways Box (Indian Automotive Context) */}
        {post.keyTakeaways && post.keyTakeaways.length > 0 && (
          <div className="mt-8 rounded-2xl border border-primary/25 bg-gradient-to-br from-primary/[0.06] to-primary/[0.02] p-6">
            <h3 className="flex items-center gap-2 text-base font-bold text-primary">
              <Sparkles size={18} /> Key Takeaways for Indian Motorists:
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm leading-6 text-foreground">
              {post.keyTakeaways.map((item, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <CheckCircle2 size={16} className="mt-1 text-primary shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Main Article Content */}
        <div className="prose prose-neutral mt-10 max-w-none text-foreground/90 leading-8">
          <div className="whitespace-pre-line font-sans text-base space-y-5">
            {post.content}
          </div>
        </div>

        {/* In-Article Screenshots & Figures */}
        {post.articleImages && post.articleImages.length > 0 && (
          <div className="mt-12 space-y-8">
            <h3 className="text-xl font-bold text-foreground border-b border-border pb-3">
              Visual Evidence & E0 Finder In-App Verification
            </h3>
            <div className="grid gap-6 sm:grid-cols-2">
              {post.articleImages.map((img, idx) => (
                <figure key={idx} className="overflow-hidden rounded-2xl border border-border bg-card shadow-xs">
                  <div className="bg-muted/40 p-3 flex justify-center">
                    <img
                      src={img.src}
                      alt={img.alt}
                      className="max-h-[320px] rounded-xl object-contain shadow-xs"
                    />
                  </div>
                  <figcaption className="p-4 text-xs text-muted-foreground leading-5 border-t border-border">
                    <strong className="text-foreground block mb-1">Live App Data:</strong>
                    {img.caption}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        )}

        {/* Marketing App Feature Banner */}
        <div className="mt-14 overflow-hidden rounded-3xl border border-primary/30 bg-gradient-to-br from-primary/10 via-primary/5 to-background p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-start gap-5">
              <img
                src="/app-icon.png"
                alt="E0 Finder Official App"
                className="size-16 rounded-2xl object-contain shadow-md shrink-0 bg-white p-1"
              />
              <div>
                <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/20 px-2.5 py-0.5 text-xs font-bold text-primary mb-2">
                  <ShieldCheck size={13} /> India&apos;s #1 E0 Petrol App
                </div>
                <h3 className="text-2xl font-black text-foreground">
                  Don&apos;t Let Blended E20 Fuel Damage Your Engine
                </h3>
                <p className="mt-2 text-sm text-muted-foreground leading-6">
                  Get real-time directions to verified 0% ethanol petrol pumps in Bengaluru, Delhi NCR, Mumbai, Pune, Chennai, and all Indian highways.
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-4 text-xs font-semibold text-foreground/80">
                  <span className="flex items-center gap-1"><CheckCircle2 size={14} className="text-primary" /> 100% Free Forever</span>
                  <span className="flex items-center gap-1"><CheckCircle2 size={14} className="text-primary" /> Live Density Logs</span>
                  <span className="flex items-center gap-1"><CheckCircle2 size={14} className="text-primary" /> GPS Turn-by-Turn</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row md:flex-col items-center gap-3 shrink-0 w-full sm:w-auto">
              <a
                href="https://play.google.com/store/apps/details?id=com.anupampradhan.ethanolfreepetrol"
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-7 py-3.5 text-sm font-bold text-primary-foreground shadow-md transition-transform hover:scale-[1.03] hover:bg-primary/90"
              >
                Download on Google Play <ExternalLink size={16} />
              </a>
              <span className="text-[11px] text-muted-foreground text-center">
                Rated 4.9★ by 2,500+ Indian Motorists
              </span>
            </div>
          </div>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="mt-16 border-t border-border pt-10">
            <h3 className="text-2xl font-black text-foreground">More Automotive Fuel Guides</h3>
            <div className="mt-6 grid gap-6 sm:grid-cols-3">
              {relatedPosts.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/blog/${rel.slug}`}
                  className="group flex flex-col justify-between rounded-2xl border border-border bg-card p-5 transition-all hover:border-primary/50 hover:shadow-xs"
                >
                  <div>
                    <span className="text-xs font-bold text-primary">{rel.category}</span>
                    <h4 className="mt-2 text-sm font-bold group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                      {rel.title}
                    </h4>
                    <p className="mt-2 text-xs text-muted-foreground line-clamp-2 leading-5">
                      {rel.excerpt}
                    </p>
                  </div>
                  <span className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-primary">
                    Read guide <ChevronRight size={13} />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>

      {/* Footer */}
      <footer className="border-t border-border bg-primary py-8 text-primary-foreground">
        <div className="mx-auto flex max-w-5xl flex-col gap-4 px-5 text-sm sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <span>© 2026 E0 Finder. Built for Indian Drivers & Enthusiasts.</span>
          <div className="flex gap-4">
            <Link href="/" className="hover:underline">Home</Link>
            <Link href="/blog" className="hover:underline">All Guides</Link>
            <Link href="/privacy" className="hover:underline">Privacy</Link>
            <Link href="/contact" className="hover:underline">Contact</Link>
          </div>
        </div>
      </footer>
    </main>
  )
}
