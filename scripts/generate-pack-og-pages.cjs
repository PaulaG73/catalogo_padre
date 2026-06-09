const fs = require('fs')
const path = require('path')

const packs = require('../src/data/catalogoPack.json')
const base = 'https://catalogopadre.netlify.app'
const outDir = path.join(__dirname, '..', 'public')

function esc(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
}

for (const pack of packs) {
  const slug = `pack-${pack.id}`
  const page = `${slug}.html`
  const pageUrl = `${base}/og-${page}`
  const imgPath = pack.image.startsWith('/') ? pack.image : `/${pack.image}`
  const imgUrl = `${base}${encodeURI(imgPath)}`
  const ogTitle = esc(`${pack.title} · Vinóloga`)
  const ogDesc = esc(pack.valle)
  const ogAlt = esc(`Regalo ${pack.title}`)

  const html = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${ogTitle}</title>
  <meta property="og:type" content="website">
  <meta property="og:title" content="${ogTitle}">
  <meta property="og:description" content="${ogDesc}">
  <meta name="description" content="${ogDesc}">
  <meta name="twitter:description" content="${ogDesc}">
  <meta property="og:url" content="${pageUrl}">
  <meta property="og:image" content="${imgUrl}">
  <meta property="og:image:secure_url" content="${imgUrl}">
  <meta property="og:image:type" content="image/jpeg">
  <meta property="og:image:alt" content="${ogAlt}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${ogTitle}">
  <meta name="twitter:image" content="${imgUrl}">
  <link rel="canonical" href="${pageUrl}">
</head>
<body style="margin:0;font-family:system-ui,sans-serif;background:#1a1a1a;color:#eee;text-align:center;padding:1rem;">
  <p style="margin:0 0 1rem;font-size:1rem;">Vinóloga</p>
  <img src="${imgUrl}" alt="${ogAlt}" width="360" style="max-width:100%;height:auto;border-radius:12px;display:block;margin:0 auto 1rem;">
  <p style="margin:0;"><a href="${base}/#packs" style="color:#5cb85c;">Ver catálogo completo</a></p>
</body>
</html>
`

  fs.writeFileSync(path.join(outDir, `og-${page}`), html, 'utf8')
  console.log(`wrote og-${page} -> ${pack.title}`)
}
