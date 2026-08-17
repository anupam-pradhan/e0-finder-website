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
  ListOrdered,
  Calculator,
  Compass,
  ArrowRight,
  BookOpen,
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

function parseInlineText(text: string): React.ReactNode {
  const tokens: React.ReactNode[] = []
  let buffer = ''
  let i = 0

  while (i < text.length) {
    if (text.startsWith('**', i)) {
      if (buffer) {
        tokens.push(buffer)
        buffer = ''
      }
      const closeIdx = text.indexOf('**', i + 2)
      if (closeIdx !== -1) {
        const boldText = text.substring(i + 2, closeIdx)
        tokens.push(
          <strong key={i} className="font-bold text-foreground">
            {parseInlineText(boldText)}
          </strong>
        )
        i = closeIdx + 2
        continue
      }
    } else if (text.startsWith('`', i)) {
      if (buffer) {
        tokens.push(buffer)
        buffer = ''
      }
      const closeIdx = text.indexOf('`', i + 1)
      if (closeIdx !== -1) {
        const codeText = text.substring(i + 1, closeIdx)
        tokens.push(
          <code key={i} className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs font-semibold text-primary">
            {codeText}
          </code>
        )
        i = closeIdx + 1
        continue
      }
    } else if (text.startsWith('*', i) && !text.startsWith('**', i)) {
      if (buffer) {
        tokens.push(buffer)
        buffer = ''
      }
      const closeIdx = text.indexOf('*', i + 1)
      if (closeIdx !== -1) {
        const italicText = text.substring(i + 1, closeIdx)
        tokens.push(
          <em key={i} className="italic text-foreground/90">
            {italicText}
          </em>
        )
        i = closeIdx + 1
        continue
      }
    }
    buffer += text[i]
    i++
  }

  if (buffer) {
    tokens.push(buffer)
  }

  return tokens.length === 1 && typeof tokens[0] === 'string' ? tokens[0] : tokens
}

function ArticleRenderer({ content }: { content: string }) {
  const lines = content.trim().split('\n')
  const blocks: React.ReactNode[] = []
  let currentList: { type: 'ul' | 'ol'; items: string[] } | null = null

  const flushList = (keyPrefix: number) => {
    if (!currentList) return null
    const listComponent =
      currentList.type === 'ul' ? (
        <ul key={`ul-${keyPrefix}`} className="my-4 space-y-2.5 pl-1">
          {currentList.items.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2.5 text-sm sm:text-base leading-7 text-foreground/90">
              <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-primary" />
              <div>{parseInlineText(item)}</div>
            </li>
          ))}
        </ul>
      ) : (
        <ol key={`ol-${keyPrefix}`} className="my-4 space-y-2.5 list-decimal pl-6 text-sm sm:text-base leading-7 text-foreground/90">
          {currentList.items.map((item, idx) => (
            <li key={idx} className="pl-1">
              {parseInlineText(item)}
            </li>
          ))}
        </ol>
      )
    currentList = null
    return listComponent
  }

  lines.forEach((rawLine, idx) => {
    const line = rawLine.trim()

    if (!line) {
      const flushed = flushList(idx)
      if (flushed) blocks.push(flushed)
      return
    }

    if (line === '---' || line === '***' || line === '___') {
      const flushed = flushList(idx)
      if (flushed) blocks.push(flushed)
      blocks.push(<hr key={idx} className="my-8 border-border" />)
      return
    }

    if (line.startsWith('$$') && line.endsWith('$$')) {
      const flushed = flushList(idx)
      if (flushed) blocks.push(flushed)
      const mathText = line.replace(/\$\$/g, '').replace(/\\text\{([^}]+)\}/g, '$1').replace(/\\times/g, '×').replace(/\\%/g, '%')
      blocks.push(
        <div key={idx} className="my-6 rounded-2xl border border-primary/20 bg-primary/[0.04] p-5 text-center font-mono text-sm sm:text-base font-bold text-primary shadow-xs">
          {mathText}
        </div>
      )
      return
    }

    // Markdown Table Parser
    if (line.startsWith('|') && line.endsWith('|')) {
      const flushed = flushList(idx)
      if (flushed) blocks.push(flushed)
      // Check if divider line
      if (line.includes('---')) return

      const cells = line.split('|').filter((c) => c.trim().length > 0)
      blocks.push(
        <div key={idx} className="my-1 flex items-center justify-between gap-4 rounded-xl border border-border/80 bg-card px-4 py-2.5 text-xs sm:text-sm font-medium text-foreground">
          {cells.map((cell, cIdx) => (
            <span key={cIdx} className={cIdx === 0 ? 'font-bold text-foreground shrink-0' : 'text-muted-foreground'}>
              {parseInlineText(cell.trim())}
            </span>
          ))}
        </div>
      )
      return
    }

    if (line.startsWith('#### ')) {
      const flushed = flushList(idx)
      if (flushed) blocks.push(flushed)
      blocks.push(
        <h4 key={idx} className="mt-6 mb-2 text-base sm:text-lg font-bold text-foreground tracking-tight">
          {parseInlineText(line.replace(/^####\s+/, ''))}
        </h4>
      )
      return
    }

    if (line.startsWith('### ')) {
      const flushed = flushList(idx)
      if (flushed) blocks.push(flushed)
      const headingText = line.replace(/^###\s+/, '')
      const anchorId = headingText.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
      blocks.push(
        <h3 id={anchorId} key={idx} className="scroll-mt-20 mt-8 mb-3 text-xl sm:text-2xl font-bold text-foreground tracking-tight">
          {parseInlineText(headingText)}
        </h3>
      )
      return
    }

    if (line.startsWith('## ')) {
      const flushed = flushList(idx)
      if (flushed) blocks.push(flushed)
      const headingText = line.replace(/^##\s+/, '')
      const anchorId = headingText.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
      blocks.push(
        <h2 id={anchorId} key={idx} className="scroll-mt-20 mt-10 mb-4 text-2xl sm:text-3xl font-black text-foreground tracking-tight border-b border-border pb-2">
          {parseInlineText(headingText)}
        </h2>
      )
      return
    }

    if (line.startsWith('- ') || line.startsWith('* ')) {
      const itemText = line.substring(2)
      if (currentList && currentList.type === 'ul') {
        currentList.items.push(itemText)
      } else {
        const flushed = flushList(idx)
        if (flushed) blocks.push(flushed)
        currentList = { type: 'ul', items: [itemText] }
      }
      return
    }

    const numMatch = line.match(/^(\d+)\.\s+(.*)/)
    if (numMatch) {
      const itemText = numMatch[2]
      if (currentList && currentList.type === 'ol') {
        currentList.items.push(itemText)
      } else {
        const flushed = flushList(idx)
        if (flushed) blocks.push(flushed)
        currentList = { type: 'ol', items: [itemText] }
      }
      return
    }

    const flushed = flushList(idx)
    if (flushed) blocks.push(flushed)
    blocks.push(
      <p key={idx} className="my-3.5 text-base sm:text-lg leading-8 text-foreground/90">
        {parseInlineText(line)}
      </p>
    )
  })

  const trailingList = flushList(lines.length)
  if (trailingList) blocks.push(trailingList)

  return <div className="article-prose space-y-1">{blocks}</div>
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

  // Extract Table of Contents headers (## and ###)
  const tocHeadings = post.content
    .split('\n')
    .filter((line) => line.startsWith('### ') || line.startsWith('## '))
    .map((line) => {
      const isH2 = line.startsWith('## ')
      const title = line.replace(/^#{2,3}\s+/, '').replace(/\*\*/g, '').trim()
      const id = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
      return { title, id, isH2 }
    })

  const relatedPosts = blogPosts
    .filter((p) => p.slug !== post.slug)
    .sort((a, b) => (a.category === post.category ? -1 : 1))
    .slice(0, 3)

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
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Schema.org Article Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      {/* Top Navigation */}
      <header className="sticky top-0 z-40 border-b border-border/70 bg-background/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3.5 lg:px-8">
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
      <article className="mx-auto max-w-4xl px-4 py-10 lg:px-8 lg:py-16">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-muted-foreground mb-6">
          <Link href="/" className="hover:text-primary">Home</Link>
          <ChevronRight size={12} />
          <Link href="/blog" className="hover:text-primary">Knowledge Hub</Link>
          <ChevronRight size={12} />
          <span className="text-foreground font-medium truncate max-w-[240px] sm:max-w-none">{post.category}</span>
        </nav>

        {/* Category & Date */}
        <div className="flex flex-wrap items-center gap-3 text-xs">
          <span className="rounded-full bg-primary/10 px-3 py-1 font-bold text-primary">
            {post.category}
          </span>
          <span className="flex items-center gap-1 text-muted-foreground">
            <Calendar size={14} /> {post.publishedDate}
          </span>
          <span className="flex items-center gap-1 text-muted-foreground">
            <Clock size={14} /> {post.readTime}
          </span>
        </div>

        {/* Title */}
        <h1 className="mt-4 text-3xl font-black leading-tight tracking-tight sm:text-4xl lg:text-5xl text-foreground">
          {post.title}
        </h1>

        {/* Excerpt Lead */}
        <p className="mt-5 text-base sm:text-lg leading-8 text-muted-foreground border-l-4 border-primary pl-4 py-1.5 italic bg-muted/20 rounded-r-xl">
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
            <Star size={13} className="fill-amber-500 text-amber-500" /> 4.9★ E0 Finder App
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
          <div className="mt-8 rounded-2xl border border-primary/25 bg-gradient-to-br from-primary/[0.07] to-primary/[0.02] p-6 shadow-xs">
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

        {/* Table of Contents (TOC) */}
        {tocHeadings.length > 2 && (
          <div className="mt-8 rounded-2xl border border-border bg-muted/20 p-5">
            <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
              <ListOrdered size={16} className="text-primary" /> Table of Contents
            </h4>
            <ul className="mt-3 space-y-1.5 text-xs sm:text-sm">
              {tocHeadings.map((h, idx) => (
                <li key={idx} className={h.isH2 ? 'font-bold' : 'pl-4 text-muted-foreground'}>
                  <a href={`#${h.id}`} className="hover:text-primary hover:underline transition-colors">
                    {h.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Main Article Content (Rendered Cleanly Without Raw Symbols) */}
        <div className="mt-10 max-w-none text-foreground leading-8">
          <ArticleRenderer content={post.content} />
        </div>

        {/* Interactive Savings Calculator Callout Widget */}
        <div className="my-10 rounded-2xl border border-primary/30 bg-primary/[0.04] p-6 sm:p-7">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="grid size-12 place-items-center rounded-xl bg-primary text-primary-foreground shrink-0 shadow-xs">
                <Calculator size={24} />
              </div>
              <div>
                <h4 className="text-base sm:text-lg font-bold text-foreground">
                  Calculate Your Fuel & Maintenance Savings
                </h4>
                <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                  See how much fuel and preventive repair costs your bike or car saves on pure E0 petrol.
                </p>
              </div>
            </div>
            <Link
              href="/#calculator"
              className="inline-flex shrink-0 items-center gap-1.5 rounded-xl bg-primary px-5 py-2.5 text-xs font-bold text-primary-foreground hover:bg-primary/90 shadow-xs"
            >
              Open Calculator <ArrowRight size={14} />
            </Link>
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
                      src={img.url}
                      alt={img.caption}
                      className="max-h-[320px] rounded-xl object-contain shadow-xs"
                    />
                  </div>
                  <figcaption className="p-4 text-xs text-muted-foreground leading-5 border-t border-border">
                    <strong className="text-foreground block mb-1">Live App Telemetry:</strong>
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
                className="size-16 rounded-2xl object-contain shadow-md bg-white p-1 shrink-0"
              />
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/20 px-3 py-1 text-xs font-bold text-primary uppercase tracking-wider">
                  <ShieldCheck size={14} /> Official E0 Station Network
                </span>
                <h3 className="mt-2 text-2xl sm:text-3xl font-black text-foreground">
                  Find 0% Ethanol Petrol Near You Instantly
                </h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed max-w-xl">
                  Download <strong>E0 Finder</strong> for Android. Real-time verified pumps, live density logs (Form-8), turn-by-turn navigation, and crowd-verified reports across 500+ Indian cities.
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-4 text-xs font-bold text-foreground/80">
                  <span className="flex items-center gap-1"><CheckCircle2 size={14} className="text-primary" /> 100% Free Forever</span>
                  <span className="flex items-center gap-1"><CheckCircle2 size={14} className="text-primary" /> 10,000+ Active Drivers</span>
                  <span className="flex items-center gap-1"><CheckCircle2 size={14} className="text-primary" /> Live GPS Routing</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center gap-2 shrink-0 w-full sm:w-auto">
              <a
                href="https://play.google.com/store/apps/details?id=com.anupampradhan.ethanolfreepetrol"
                target="_blank"
                rel="noreferrer"
                className="flex w-full sm:w-auto items-center justify-center gap-3 rounded-2xl bg-primary px-8 py-4 text-base font-bold text-primary-foreground shadow-lg transition-transform hover:scale-[1.02] hover:bg-primary/90"
              >
                <Download size={20} /> Install E0 Finder on Google Play
              </a>
              <span className="text-[11px] text-muted-foreground">
                Rated 4.9★ by 2,500+ Indian Motorists
              </span>
            </div>
          </div>
        </div>

        {/* Related Guides */}
        {relatedPosts.length > 0 && (
          <div className="mt-16 border-t border-border pt-10">
            <h3 className="text-2xl font-black text-foreground">Related Research Guides</h3>
            <div className="mt-6 grid gap-6 sm:grid-cols-3">
              {relatedPosts.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/blog/${rel.slug}`}
                  className="group flex flex-col justify-between rounded-2xl border border-border bg-card p-5 transition-all hover:border-primary/50 shadow-xs"
                >
                  <div>
                    <span className="text-[11px] font-bold text-primary uppercase tracking-wider">
                      {rel.category}
                    </span>
                    <h4 className="mt-2 text-sm font-bold leading-snug group-hover:text-primary transition-colors line-clamp-2">
                      {rel.title}
                    </h4>
                  </div>
                  <span className="mt-4 text-xs font-semibold text-primary inline-flex items-center gap-1">
                    Read Guide →
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
