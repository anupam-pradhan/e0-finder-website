import { NextResponse } from 'next/server'
import { siteConfig } from '@/lib/site-config'

const INDEXNOW_KEY = 'e0finder49d7b512c129e9f'
const KEY_LOCATION = `${siteConfig.siteUrl}/${INDEXNOW_KEY}.txt`

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}))
    const urlList: string[] = body.urlList || [
      `${siteConfig.siteUrl}/`,
      `${siteConfig.siteUrl}/what-is-e0-petrol`,
      `${siteConfig.siteUrl}/vehicles`,
      `${siteConfig.siteUrl}/highways`,
      `${siteConfig.siteUrl}/report-pump`,
      `${siteConfig.siteUrl}/city`,
      `${siteConfig.siteUrl}/find`,
    ]

    const payload = {
      host: new URL(siteConfig.siteUrl).host,
      key: INDEXNOW_KEY,
      keyLocation: KEY_LOCATION,
      urlList,
    }

    const res = await fetch('https://api.indexnow.org/IndexNow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(payload),
    })

    return NextResponse.json({
      success: res.ok,
      status: res.status,
      submittedUrls: urlList.length,
    })
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    status: 'active',
    protocol: 'IndexNow',
    host: new URL(siteConfig.siteUrl).host,
    keyLocation: KEY_LOCATION,
  })
}
