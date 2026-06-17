/**
 * Arranca vue-cli-service serve y abre el navegador externo cuando el puerto responde.
 */
const { spawn } = require('child_process')
const http = require('http')
const { exec } = require('child_process')

const port = Number(process.env.PORT) || 8080
const url = `http://127.0.0.1:${port}/`
let opened = false

function openBrowser() {
  if (opened) return
  opened = true
  if (process.platform === 'win32') {
    exec(`cmd /c start "" "${url}"`)
  } else if (process.platform === 'darwin') {
    exec(`open "${url}"`)
  } else {
    exec(`xdg-open "${url}"`)
  }
  console.log(`\n→ Navegador externo: ${url}\n`)
}

function waitForServer(attempts = 0) {
  if (opened || attempts > 120) return
  const req = http.get(url, (res) => {
    res.resume()
    openBrowser()
  })
  req.on('error', () => setTimeout(() => waitForServer(attempts + 1), 500))
  req.setTimeout(400, () => {
    req.destroy()
    setTimeout(() => waitForServer(attempts + 1), 500)
  })
}

const isWin = process.platform === 'win32'
const child = spawn(isWin ? 'npx.cmd' : 'npx', ['vue-cli-service', 'serve'], {
  stdio: 'inherit',
  shell: isWin,
  env: { ...process.env, BROWSER: 'none' },
})

setTimeout(() => waitForServer(), 2000)

child.on('exit', (code) => process.exit(code ?? 0))
