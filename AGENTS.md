# AGENTS.md

## Cursor Cloud specific instructions

This is a **Vue 3 (Vue CLI 5) single-page app** — a static wine catalog ("Especial Día del Padre · Vinóloga"). There is **no backend, database, or external service**; data lives in `src/data/catalogoPack.json` and the only integration is outbound WhatsApp deep links.

Dependencies are installed by the startup update script (`npm install`). Standard commands are documented in `README.md` and `package.json` scripts.

Notes for running services here:

- **Dev server:** run `BROWSER=none npm run serve:vue` (serves on `http://localhost:8080`). Use `serve:vue`, not `serve` — the `serve` script wraps the dev server in `scripts/serve-with-browser.cjs`, which tries to auto-launch a system browser (`xdg-open`) that doesn't exist in this headless VM. Setting `BROWSER=none` also prevents the `vue.config.js` middleware from attempting to open a browser.
- **Lint:** `npm run lint`. **Build:** `npm run build` (this first runs `scripts/generate-pack-og-pages.cjs` to regenerate the `public/og-pack-*.html` Open Graph pages, then `vue-cli-service build` into `dist/`).
- **WhatsApp button:** clicking a product's order button opens `api.whatsapp.com` with a prefilled message. In dev it uses the production fallback URL from `src/config/whatsapp.js` (WhatsApp cannot open `localhost`), so this is expected behavior, not a misconfiguration.
