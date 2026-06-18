const { defineConfig } = require('@vue/cli-service')
const { exec } = require('child_process')

/** Sin barra final; para Open Graph / WhatsApp (VUE_APP_PUBLIC_SITE_URL en .env.production) */
function publicSiteOrigin() {
  return (process.env.VUE_APP_PUBLIC_SITE_URL || '').replace(/\/+$/, '')
}

/** Abre la URL en el navegador del sistema (evita el browser integrado de Cursor en Windows). */
function openInSystemBrowser(url) {
  if (process.env.BROWSER === 'none') return
  if (process.platform === 'win32') {
    exec(`start "" "${url}"`, { shell: 'cmd.exe' })
  } else if (process.platform === 'darwin') {
    exec(`open "${url}"`)
  } else {
    exec(`xdg-open "${url}"`)
  }
}

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: '/',
  pages: {
    index: {
      entry: 'src/main.js',
      title: 'Especial Día del Padre · Vinóloga',
    },
  },
  devServer: {
    port: 8080,
    host: 'localhost',
    open: false,
    setupMiddlewares(middlewares, devServer) {
      let opened = false
      const tryOpen = () => {
        if (opened || process.env.BROWSER === 'none') return
        opened = true
        const port = devServer.options?.port || 8080
        openInSystemBrowser(`http://127.0.0.1:${port}/`)
      }
      const server = devServer.server
      if (server?.listening) {
        tryOpen()
      } else if (server) {
        server.once('listening', tryOpen)
      }
      return middlewares
    },
    headers: {
      'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
    },
  },
  chainWebpack(config) {
    /* Con `pages`, el plugin de HtmlWebpackPlugin se llama `html-<nombrePagina>` */
    config.plugin('html-index').tap((args) => {
      const origin = publicSiteOrigin()
      const opts = args[0]
      opts.ogPageUrl = origin ? `${origin}/` : ''
      opts.ogImageUrl = origin ? `${origin}/img/portada.jpg` : ''
      return args
    })
  },
})
