import { imageSitemapPages } from '@/lib/seo-images'

function escapeXml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

export function GET() {
  const urls = imageSitemapPages
    .map((page) => {
      const images = page.images
        .map((image) => `    <image:image>\n      <image:loc>${escapeXml(`${page.loc.startsWith('http') ? new URL(image.path, page.loc).origin : ''}${image.path}`)}</image:loc>\n    </image:image>`)
        .join('\n')

      return `  <url>\n    <loc>${escapeXml(page.loc)}</loc>\n${images}\n  </url>`
    })
    .join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${urls}\n</urlset>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  })
}