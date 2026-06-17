const path = require('path')
const os = require('os')
const fs = require('fs')
const { DatabaseSync } = require('node:sqlite')

const STORAGE_KEY =
  'src.vs.platform.reactivestorage.browser.reactiveStorageServiceImpl.persistentStorage.applicationUser'

const dbPath = path.join(
  os.homedir(),
  'AppData',
  'Roaming',
  'Cursor',
  'User',
  'globalStorage',
  'state.vscdb',
)

const db = new DatabaseSync(dbPath)
const row = db.prepare('SELECT value FROM ItemTable WHERE key = ?').get(STORAGE_KEY)
if (!row?.value) {
  console.error('No se encontró el storage de Cursor.')
  process.exit(1)
}

const json = JSON.parse(row.value.toString())
const before = json.autoOpenLocalhostUrls
json.autoOpenLocalhostUrls = false
json.glassOpenWebLinksInBrowser = false

const updated = Buffer.from(JSON.stringify(json), 'utf8')
db.prepare('UPDATE ItemTable SET value = ? WHERE key = ?').run(updated, STORAGE_KEY)

console.log('autoOpenLocalhostUrls:', before, '→', json.autoOpenLocalhostUrls)
console.log('glassOpenWebLinksInBrowser →', json.glassOpenWebLinksInBrowser)
console.log('Listo. Reinicia Cursor (cierra y abre, o Reload Window).')
