/**
 * Abre http://localhost:8080 en el navegador del sistema (Windows).
 */
const { exec } = require('child_process')

const port = process.env.PORT || 8080
const url = `http://127.0.0.1:${port}/`

if (process.platform === 'win32') {
  exec(`cmd /c start "" "${url}"`)
} else if (process.platform === 'darwin') {
  exec(`open "${url}"`)
} else {
  exec(`xdg-open "${url}"`)
}

console.log(`Abriendo en navegador externo: ${url}`)
