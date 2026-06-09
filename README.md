# Catálogo Día del Padre · Vinóloga

Catálogo web de vinos y packs temáticos para el **Especial Día del Padre** de [Vinóloga](https://catalogopadre.netlify.app). Los visitantes exploran regalos por personalidad (jardinero, testarudo, catador, anfitrión…), ven precios y composición de cada opción, y hacen el pedido directamente por **WhatsApp** con un mensaje prearmado y vista previa del producto.

**Demo en producción:** [https://catalogopadre.netlify.app](https://catalogopadre.netlify.app)

---

## Tabla de contenidos

1. [Características](#características)
2. [Stack tecnológico](#stack-tecnológico)
3. [Requisitos](#requisitos)
4. [Instalación y desarrollo](#instalación-y-desarrollo)
5. [Scripts disponibles](#scripts-disponibles)
6. [Estructura del proyecto](#estructura-del-proyecto)
7. [Catálogo de productos (`catalogoPack.json`)](#catálogo-de-productos-catalogopackjson)
8. [Integración con WhatsApp](#integración-con-whatsapp)
9. [Open Graph y vistas previas al compartir](#open-graph-y-vistas-previas-al-compartir)
10. [Despliegue en Netlify](#despliegue-en-netlify)
11. [Personalización](#personalización)
12. [Diseño responsive](#diseño-responsive)
13. [Accesibilidad](#accesibilidad)
14. [Crear un catálogo nuevo a partir de este proyecto](#crear-un-catálogo-nuevo-a-partir-de-este-proyecto)
15. [Créditos](#créditos)

---

## Características

- **Landing de una sola página** con sección «Sobre mí» (dedicatoria inclusiva) y carrusel horizontal de productos.
- **12 regalos numerados** (N°1–N°12): desde botellas unitarias con empaque de regalo hasta packs de varias botellas y estilos de vino.
- **Tarjetas detalladas** con imagen, valle, composición (tipo de copa, cantidad de botellas, nombre del vino) y precios.
- **Precios de oferta Día del Padre**: precio regular tachado + precio promocional en verde cuando existe `priceOferta`.
- **Estado agotado** opcional por producto (`agotado: true` en el JSON).
- **Carrusel automático** con pausa al pasar el mouse, al tocar o al usar las flechas; respeta `prefers-reduced-motion`.
- **Pedido por WhatsApp** desde cada tarjeta y desde el pie de página, con mensaje y enlace de vista previa.
- **Páginas OG estáticas** (`public/og-pack-*.html`) para que WhatsApp muestre la foto correcta de cada pack.
- **Tema visual** burdeos/negro con Bootstrap 5 y variables CSS propias (`theme_vino_tinto.css`).
- **Tipografía** [Nunito](https://fonts.google.com/specimen/Nunito) (Google Fonts).

---

## Stack tecnológico

| Capa | Tecnología |
|------|------------|
| Framework | Vue 3 (Composition API, `<script setup>`) |
| CLI / build | Vue CLI 5 (`@vue/cli-service`) |
| Enrutamiento | Vue Router 4 (ruta única `/`) |
| Estado global | Vuex 4 (plantilla; sin lógica de negocio activa) |
| UI | Bootstrap 5.3 |
| Datos | JSON estático (`src/data/catalogoPack.json`) |
| Hosting previsto | Netlify (SPA + archivos estáticos OG) |
| Imágenes OG | [sharp](https://sharp.pixelplumbing.com/) (script opcional de optimización) |

---

## Requisitos

- **Node.js** 16 o superior (recomendado 18+)
- **npm** 8+
- Navegador moderno (Chrome, Firefox, Safari, Edge)

---

## Instalación y desarrollo

```bash
# Clonar el repositorio
git clone <url-del-repo>
cd catalogo_padre

# Instalar dependencias
npm install

# Servidor de desarrollo (puerto 8080 por defecto)
npm run serve
```

El proyecto abre automáticamente en `http://localhost:8080` (configurado en `vue.config.js`).

### Variables de entorno

Copia `.env.example` a `.env.development` y/o `.env.production`:

```env
VUE_APP_PUBLIC_SITE_URL=https://catalogopadre.netlify.app
```

| Variable | Uso |
|----------|-----|
| `VUE_APP_PUBLIC_SITE_URL` | URL pública **HTTPS** del sitio desplegado (sin barra final). Necesaria para que los enlaces de vista previa en WhatsApp apunten al dominio real y no a `localhost`. |

Sin esta variable en desarrollo, el código usa el fallback `https://catalogopadre.netlify.app` definido en `src/config/whatsapp.js`.

---

## Scripts disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run serve` | Servidor de desarrollo con hot-reload |
| `npm run build` | Genera páginas OG + build de producción en `dist/` |
| `npm run generate-pack-og` | Regenera `public/og-pack-1.html` … `og-pack-12.html` desde el JSON |
| `npm run lint` | ESLint sobre archivos Vue/JS |
| `npm run optimize-pack-og` | Optimiza JPG en `public/img/` para compartir (requiere `sharp`) |
| `npm run fix-logo` | Script auxiliar para fondo transparente en logo (`knockout-white-logo.cjs`) |

El build de producción **siempre** ejecuta `generate-pack-og-pages.cjs` antes de compilar, para mantener las páginas OG alineadas con `catalogoPack.json`.

---

## Estructura del proyecto

```
catalogo_padre/
├── public/
│   ├── img/                    # Fotos de packs y assets (servidas en /img/...)
│   ├── og-catalogo.html        # Vista previa del catálogo completo
│   ├── og-pack-1.html …        # Vista previa por pack (generadas)
│   ├── index.html              # Plantilla HTML (meta OG inyectadas en build)
│   ├── _redirects              # Reglas Netlify (SPA + OG)
│   └── _headers                # Cache-Control para HTML y OG
├── scripts/
│   ├── generate-pack-og-pages.cjs
│   ├── optimize-pack-share-images.cjs
│   └── knockout-white-logo.cjs
├── src/
│   ├── components/
│   │   ├── CardComponent.vue   # Tarjeta de producto + botón WhatsApp
│   │   ├── FooterComponent.vue
│   │   └── NavBar.vue
│   ├── config/
│   │   └── whatsapp.js         # Número, URLs y mensajes de WhatsApp
│   ├── data/
│   │   └── catalogoPack.json   # Catálogo (fuente de verdad)
│   ├── router/index.js
│   ├── store/index.js
│   ├── styles/
│   │   └── theme_vino_tinto.css
│   ├── views/
│   │   └── HomeView.vue        # Página principal (sobre mí + carrusel)
│   ├── App.vue
│   └── main.js
├── .env.example
├── vue.config.js
├── package.json
└── README.md
```

---

## Catálogo de productos (`catalogoPack.json`)

Cada ítem del array representa un regalo del carrusel. Ejemplo mínimo:

```json
{
  "id": "1",
  "title": "N°1 Papá Jardinero",
  "valle": "Valle del Maipo",
  "image": "/img/jardinero.jpg",
  "price": "$14.990",
  "priceOferta": "$13.000",
  "bloques": [
    {
      "tipoCopa": "tinto",
      "cantidadBotellas": 1,
      "nombreVino": "Jardinero Mezcla Tinta, Viñateros de Raíz"
    }
  ]
}
```

### Campos

| Campo | Obligatorio | Descripción |
|-------|-------------|-------------|
| `id` | Sí | Identificador único (`"1"` … `"12"`). Usado en URLs OG (`og-pack-{id}.html`) |
| `title` | Sí | Nombre visible en la tarjeta (incluye número y adjetivo de personalidad) |
| `valle` | Sí | Valle o región; aparece en tarjeta y en descripción OG |
| `image` | Sí | Ruta bajo `public/` (ej. `/img/jardinero.jpg`) |
| `price` | Sí | Precio en CLP con formato legible (ej. `"$14.990"`) |
| `priceOferta` | No | Si existe, se muestra como precio promocional y el `price` se tacha |
| `ofertaEtiqueta` | No | Etiqueta opcional de oferta (reservado en plantilla) |
| `agotado` | No | `true` deshabilita WhatsApp y muestra badge «Agotado» |
| `bloques` | Sí | Lista de composiciones del regalo (ver abajo) |

### Bloques (`bloques[]`)

Cada bloque describe un grupo de botellas del mismo vino:

| Campo | Valores | Descripción |
|-------|---------|-------------|
| `tipoCopa` | `tinto`, `rosado`, `blanco`, `espumante` | Define el icono de copa en la tarjeta |
| `cantidadBotellas` | Entero ≥ 1 | Cantidad (ej. `1` = botella unitaria, `2` = doble, etc.) |
| `nombreVino` | Texto | Nombre completo del vino |

Un pack puede tener **varios bloques** (vinos distintos). Los packs N°1–N°4 son regalos de **una botella**; del N°5 en adelante hay combinaciones de 2 a más botellas.

### Añadir o editar un producto

1. Edita `src/data/catalogoPack.json`.
2. Añade la imagen en `public/img/` (nombre coherente con `image`).
3. Si es un pack nuevo, actualiza el mapa `OG_SLUG_BY_PACK_ID` en `src/config/whatsapp.js`.
4. Ejecuta `npm run generate-pack-og` (o `npm run build`).
5. Despliega de nuevo en Netlify.

---

## Integración con WhatsApp

Configuración en `src/config/whatsapp.js`:

```js
export const WHATSAPP_NUMBER_DIGITS = '56996450950'
```

Solo dígitos: código de país + número (Chile: `56` + 9 dígitos móvil).

### Mensaje desde una tarjeta

Al pulsar el botón verde de una tarjeta se abre WhatsApp con:

```
¿Vamos con este regalo?
N°3 Papá Infaltable
Valle del Maipo

https://catalogopadre.netlify.app/og-pack-3.html

Precio especial Día del Padre (CLP): 15.000
```

- Si hay `priceOferta`, se usa ese valor y la etiqueta **Precio especial Día del Padre**.
- Si no hay oferta, el texto dice **Precio (CLP): …**
- El enlace OG va en una línea propia para que WhatsApp muestre la miniatura del pack.
- El símbolo `$` se omite en el mensaje (evita truncados en algunos clientes).

### Mensaje desde el pie de página

```
Hola Vinóloga, quiero hacer un pedido de vinos...

https://catalogopadre.netlify.app/og-catalogo.html
```

Usa `api.whatsapp.com` en lugar de `wa.me` para mayor compatibilidad con borradores y vistas previa.

---

## Open Graph y vistas previas al compartir

WhatsApp, Facebook y otras redes leen las meta etiquetas `og:*` de una URL. Una SPA pura (`index.html`) no sirve imágenes distintas por producto, por eso el proyecto genera **HTML estáticos** en `public/`:

| Archivo | Propósito |
|---------|-----------|
| `og-catalogo.html` | Vista previa general (`imagen-papa.jpg`) |
| `og-pack-1.html` … `og-pack-12.html` | Vista previa con la foto de cada pack |

El script `scripts/generate-pack-og-pages.cjs` lee `catalogoPack.json` y escribe esos archivos. La URL base actual del generador es `https://catalogopadre.netlify.app` (cámbiala si despliegas en otro dominio).

### Reglas Netlify (`public/_redirects`)

```
/og-*.html /og-:splat 200
/* /index.html 200
```

Las rutas `/og-*.html` se sirven como archivos estáticos **antes** del fallback SPA. Sin esto, WhatsApp recibiría el `index.html` genérico (logo por defecto).

### Caché (`public/_headers`)

`index.html` y `og-*.html` llevan `Cache-Control: no-cache` para evitar vistas previa desactualizadas tras un deploy.

### Checklist si WhatsApp no muestra la foto correcta

1. ¿El sitio está desplegado en la URL pública?
2. ¿`VUE_APP_PUBLIC_SITE_URL` coincide con ese dominio?
3. ¿Existen `og-pack-N.html` en el deploy?
4. ¿La ruta de imagen en el JSON existe en `public/img/`?
5. ¿Probaste con una conversación nueva? (WhatsApp cachea vistas previa).

---

## Despliegue en Netlify

1. Conecta el repositorio en [Netlify](https://www.netlify.com/).
2. Configuración de build:

   | Campo | Valor |
   |-------|-------|
   | Build command | `npm run build` |
   | Publish directory | `dist` |

3. Variable de entorno (recomendado):

   ```
   VUE_APP_PUBLIC_SITE_URL = https://tu-sitio.netlify.app
   ```

4. Tras el primer deploy, verifica:
   - `https://tu-sitio.netlify.app/`
   - `https://tu-sitio.netlify.app/og-pack-1.html`
   - Botón WhatsApp de una tarjeta en móvil real

---

## Personalización

| Qué cambiar | Dónde |
|-------------|-------|
| Productos y precios | `src/data/catalogoPack.json` |
| Fotos | `public/img/` |
| Número WhatsApp | `src/config/whatsapp.js` → `WHATSAPP_NUMBER_DIGITS` |
| Título de pestaña / OG del index | `vue.config.js` → `pages.index.title` |
| Texto barra superior | `src/components/NavBar.vue` |
| Dedicatoria «Sobre mí» | `src/views/HomeView.vue` (sección `#sobre-mi`) |
| Título y subtítulo del carrusel | `src/views/HomeView.vue` (`.packs-titulo`, `.packs-subtitulo`) |
| Pitch inferior (envío, empaques…) | `src/views/HomeView.vue` (`.prefooter-pitch`) |
| Colores y tema | `src/styles/theme_vino_tinto.css` |
| Dominio en páginas OG generadas | `scripts/generate-pack-og-pages.cjs` → constante `base` |
| Nombre del paquete npm | `package.json` → `"name"` |

---

## Diseño responsive

- **Móvil:** carrusel de 1 tarjeta visible; textos con `clamp()`; sección «Sobre mí» en columna.
- **Tablet (≥768px):** «Sobre mí» en fila (imagen · texto · logo); tipografía ajustada para evitar solapamientos.
- **Desktop (≥1024px):** dedicatoria a `1.25rem`; carrusel con hasta 3 tarjetas visibles según ancho.
- **Carrusel:** ancho de slide calculado con `ResizeObserver` y variable CSS `--packs-carousel-iw`.

---

## Accesibilidad

- Botones con `aria-label` (flechas del carrusel, WhatsApp, volver arriba).
- Carrusel con `role="region"` y pausa en foco / touch / hover.
- Iconos de copa con `role="img"` y etiqueta descriptiva.
- Respeto de `prefers-reduced-motion` (animaciones del carrusel y títulos).
- Contraste elevado en textos sobre fondos oscuros.

---

## Crear un catálogo nuevo a partir de este proyecto

Consulta **`CHECKLIST_NUEVO_CATALOGO.md`** para copiar el proyecto sin historial Git, renombrar, configurar un repo y un sitio Netlify independientes.

---

## Créditos

- **Desarrollo y diseño:** Paula Gajardo Schmidlin © 2026
- **Marca:** Vinóloga
- Proyecto del Bootcamp Frontend 2025 — Módulo 7

---

## Licencia

Proyecto privado (`"private": true` en `package.json`). Uso y distribución según acuerdo con la autora.
