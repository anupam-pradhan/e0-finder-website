'use client'

import { useEffect } from 'react'

/**
 * Progressive scroll-reveal for marketing pages.
 * - Reveals every `main > section` (except [data-reveal-skip]) as it scrolls into view.
 * - Fully SSR-safe: the hidden state only applies after JS marks <html class="e0-js">,
 *   so content is never stuck hidden for crawlers or no-JS users.
 * - Sections already in the viewport on load are shown instantly (no flash).
 * - Respects prefers-reduced-motion and gracefully no-ops without IntersectionObserver.
 */
export function ScrollReveal() {
  useEffect(() => {
    if (typeof window === 'undefined') return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const supportsIO = 'IntersectionObserver' in window
    if (prefersReduced || !supportsIO) return

    const els = Array.from(
      document.querySelectorAll<HTMLElement>('main > section:not([data-reveal-skip])'),
    )
    if (els.length === 0) return

    document.documentElement.classList.add('e0-js')

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            io.unobserve(entry.target)
          }
        }
      },
      { threshold: 0.08, rootMargin: '0px 0px -48px 0px' },
    )

    const revealNow = window.innerHeight * 0.92
    for (const el of els) {
      el.classList.add('e0-reveal')
      // Anything already on screen: show immediately (same frame => no animation, no flash).
      if (el.getBoundingClientRect().top < revealNow) {
        el.classList.add('is-visible')
      } else {
        io.observe(el)
      }
    }

    return () => io.disconnect()
  }, [])

  return null
}
