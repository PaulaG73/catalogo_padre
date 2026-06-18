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

const catalogPageUrl = `${base}/og-catalogo.html`
const catalogImgUrl = `${base}/img/portada.jpg`
const catalogDescription =
  'Cuál es el tuyo? Infaltable? Coleccionista? Parrillero? Conocedor? Innovador? Testarudo?'
const catalogHtml = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Especial Día del Padre · Vinóloga</title>
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="Vinóloga">
  <meta property="og:locale" content="es_CL">
  <meta property="og:title" content="Especial Día del Padre · Vinóloga">
  <meta property="og:description" content="${catalogDescription}">
  <meta name="description" content="${catalogDescription}">
  <meta name="twitter:description" content="${catalogDescription}">
  <meta property="og:url" content="${catalogPageUrl}">
  <meta property="og:image" content="${catalogImgUrl}">
  <meta property="og:image:secure_url" content="${catalogImgUrl}">
  <meta property="og:image:type" content="image/jpeg">
  <meta property="og:image:alt" content="Especial Día del Padre · Vinóloga">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Especial Día del Padre · Vinóloga">
  <meta name="twitter:image" content="${catalogImgUrl}">
  <link rel="canonical" href="${catalogPageUrl}">
</head>
<body style="margin:0;font-family:system-ui,sans-serif;background:#1a1a1a;color:#eee;text-align:center;padding:1rem;">
  <p style="margin:0 0 1rem;font-size:1rem;">Vinóloga — Especial Día del Padre</p>
  <img src="${catalogImgUrl}" alt="Especial Día del Padre" width="560" style="max-width:100%;height:auto;border-radius:12px;display:block;margin:0 auto 1rem;">
  <p style="margin:0;"><a href="${base}/#packs" style="color:#5cb85c;">Ver catálogo completo</a></p>
</body>
</html>
`

fs.writeFileSync(path.join(outDir, 'og-catalogo.html'), catalogHtml, 'utf8')
console.log('wrote og-catalogo.html -> portada.jpg')

const shareIntro =
  'Revisa el catálogo de vinos y otros regalos aquí\n\u25BC'
const shareCatalogUrl = catalogPageUrl
const compartirHtml = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Compartir catálogo · Vinóloga</title>
  <meta name="robots" content="noindex">
</head>
<body style="margin:0;font-family:system-ui,sans-serif;background:#1a1a1a;color:#eee;text-align:center;padding:2rem 1rem;">
  <p style="margin:0 0 1rem;">Abriendo WhatsApp para compartir el catálogo…</p>
  <p style="margin:0;"><a id="wa-fallback" href="#" style="color:#5cb85c;">Toca aquí si no se abre WhatsApp</a></p>
  <script>
    (function () {
      if (window.__catalogShareOpened) return
      window.__catalogShareOpened = true
      var intro = ${JSON.stringify(shareIntro)}
      var catalogUrl = ${JSON.stringify(shareCatalogUrl)}
      var text = intro + '\\n\\n' + catalogUrl
      var dest = 'https://wa.me/?text=' + encodeURIComponent(text)
      var link = document.getElementById('wa-fallback')
      if (link) link.href = dest
      window.location.replace(dest)
    })()
  <\/script>
</body>
</html>
`

fs.writeFileSync(path.join(outDir, 'compartir-catalogo.html'), compartirHtml, 'utf8')
console.log('wrote compartir-catalogo.html')
