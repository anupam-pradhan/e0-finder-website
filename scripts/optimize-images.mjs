// One-off image optimizer. Resizes + recompresses heavy assets in place so
// existing /public paths keep working (no code changes needed).
// Run: node scripts/optimize-images.mjs
import sharp from 'sharp'
import { readFile, writeFile, readdir } from 'node:fs/promises'
import { join, extname } from 'node:path'

const KB = (n) => (n / 1024).toFixed(0)

async function listPngJpg(dir) {
  const out = []
  for (const name of await readdir(dir)) {
    const ext = extname(name).toLowerCase()
    if (['.png', '.jpg', '.jpeg'].includes(ext)) out.push(join(dir, name))
  }
  return out
}

// [path, maxWidth|null]  (null = recompress only, keep dimensions)
const targets = [
  ['public/playstore_graphics.png', 1100],
  ['public/playstore_feature_graphic.png', 1200],
  ['public/assets/oil_company_logo/Logo_Nayara_Energy.jpg', 320],
  ['public/app-icon.png', null],
  ['public/apple-icon.png', null],
  ...(await listPngJpg('public/screenshots')).map((p) => [p, 820]),
]

let before = 0
let after = 0

for (const [path, maxW] of targets) {
  try {
    const input = await readFile(path)
    before += input.length

    let pipeline = sharp(input).rotate()
    if (maxW) {
      pipeline = pipeline.resize({ width: maxW, withoutEnlargement: true })
    }

    const ext = extname(path).toLowerCase()
    if (ext === '.jpg' || ext === '.jpeg') {
      pipeline = pipeline.jpeg({ quality: 80, mozjpeg: true })
    } else {
      pipeline = pipeline.png({ palette: true, quality: 82, effort: 9, compressionLevel: 9 })
    }

    const out = await pipeline.toBuffer()
    // Only write if we actually saved space.
    if (out.length < input.length) {
      await writeFile(path, out)
      after += out.length
      console.log(`OK  ${path}  ${KB(input.length)}KB -> ${KB(out.length)}KB`)
    } else {
      after += input.length
      console.log(`skip ${path}  (${KB(input.length)}KB, no gain)`)
    }
  } catch (err) {
    console.log(`ERR ${path}: ${err.message}`)
  }
}

console.log(`\nTOTAL  ${KB(before)}KB -> ${KB(after)}KB  (saved ${KB(before - after)}KB)`)
