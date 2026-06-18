<template>
  <NavBar />

  <section id="sobre-mi" class="home-section sobre-mi-section--light py-1 py-md-2">
    <div class="container sobre-mi">
      <div class="sobre-mi-media">
        <div ref="sobreMiClusterRef" class="sobre-mi-cluster">
        <img
          class="sobre-mi-hero-img"
          src="/img/imagen_pap%C3%A1.jpg"
          alt="Especial Día del Padre"
          width="560"
          height="240"
          loading="lazy"
          decoding="async"
        >
        <div ref="sobreMiDedicatoriaWrapRef" class="sobre-mi-dedicatoria-wrap">
        <p ref="sobreMiDedicatoriaRef" class="sobre-mi-dedicatoria">
          <span class="sobre-mi-dedicatoria-line">Por el cariño y la admiración hacia quienes son <span class="sobre-mi-dedicatoria--destacado">padres de verdad</span>...</span>
          <span class="sobre-mi-dedicatoria-line">los que <span class="sobre-mi-dedicatoria--destacado">cuidan</span>, los que <span class="sobre-mi-dedicatoria--destacado">acompañan</span>, los que <span class="sobre-mi-dedicatoria--destacado">dejan huella</span>...</span>
          <span class="sobre-mi-dedicatoria-line">más allá de cualquier nombre o lazo.</span>
        </p>
        </div>
        <img
          class="sobre-mi-logo"
          src="/img/logo-vinologa.png"
          alt="Logo Vinóloga"
          width="180"
          height="180"
          loading="lazy"
          decoding="async"
        >
        </div>
      </div>
    </div>
  </section>
  <section id="packs" class="home-section pt-4 pt-md-5 pb-2 pb-md-3">
    <div class="container text-center packs-encabezado">
      <h3 class="packs-titulo mb-1 fw-bold">Cada uno tiene su estilo</h3>
      <p class="packs-subtitulo mb-3">
        Elige el regalo para quien quieras homenajear — una botella, un pack y/o algún detalle a su medida
      </p>
      <a
        href="#complementos"
        class="packs-complementos-cta"
        aria-label="Desplazarse a la sección de otros regalos"
      >
        <span class="packs-complementos-cta-text">Revisa otros regalos</span>
        <svg
          class="packs-complementos-cta-icon"
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          fill="currentColor"
          viewBox="0 0 16 16"
          aria-hidden="true"
        >
          <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
        </svg>
      </a>
    </div>
    <div
      class="packs-carousel-outer d-flex align-items-center gap-2 gap-sm-3 px-2 px-sm-3"
      @mouseenter="pauseCarousel"
      @mouseleave="resumeCarousel"
      @touchstart.passive="onCarouselTouchStart"
      @touchend.passive="onCarouselTouchEnd"
      @focusin="pauseCarousel"
      @focusout="onCarouselFocusOut"
    >
      <button
        type="button"
        class="packs-carousel-arrow"
        aria-label="Ver packs anteriores"
        @click="scrollCarousel(-1)"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
          <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
        </svg>
      </button>
      <div class="packs-carousel-slot flex-grow-1 min-w-0">
        <div
          ref="carouselRef"
          class="packs-carousel-wrap"
          tabindex="0"
          role="region"
          aria-label="Carrusel de packs, desplazamiento horizontal"
        >
          <div class="packs-carousel-inner">
            <div
              v-for="(proyecto, idx) in proyectosLoop"
              :key="`${proyecto.id}-${idx}`"
              class="packs-carousel-slide"
            >
              <CardComponent
                :pack-id="proyecto.id"
                :title="proyecto.title"
                :valle="proyecto.valle"
                :bloques="proyecto.bloques"
                :image="proyecto.image"
                :price="proyecto.price"
                :price-oferta="proyecto.priceOferta || ''"
                :agotado="Boolean(proyecto.agotado)"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="packs-carousel-rail d-flex flex-column align-items-center flex-shrink-0">
        <div class="packs-carousel-rail-mid d-flex align-items-center justify-content-center">
          <button
            type="button"
            class="packs-carousel-arrow"
            aria-label="Ver packs siguientes"
            @click="scrollCarousel(1)"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
              <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
            </svg>
          </button>
        </div>
        <a
          href="#sobre-mi"
          class="btn btn-sm rounded-circle p-1 btn-top packs-carousel-top"
          title="Volver al inicio"
          aria-label="Volver al inicio"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
            <path d="M8 12a.5.5 0 0 0 .5-.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 0 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 .5.5z"/>
          </svg>
        </a>
      </div>
    </div>
  </section>

  <section
    id="complementos"
    class="home-section complementos-section py-3 py-md-4 pb-2 pb-md-3"
    aria-labelledby="complementos-titulo"
  >
    <div class="container text-center mb-3 mb-md-4">
      <h3 id="complementos-titulo" class="packs-titulo complementos-titulo fw-bold mb-1">Otros regalos</h3>
    </div>
    <div class="packs-carousel-outer d-flex align-items-center gap-2 gap-sm-3 px-2 px-sm-3">
      <button
        type="button"
        class="packs-carousel-arrow"
        aria-label="Ver regalos anteriores"
        @click="scrollRegalosCarousel(-1)"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
          <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
        </svg>
      </button>
      <div class="packs-carousel-slot flex-grow-1 min-w-0">
        <div
          ref="regalosCarouselRef"
          class="packs-carousel-wrap"
          tabindex="0"
          role="region"
          aria-label="Carrusel de otros regalos, desplazamiento horizontal"
        >
          <div class="packs-carousel-inner">
            <div
              v-for="(regalo, idx) in regalosLoop"
              :key="`${regalo.id}-${idx}`"
              class="packs-carousel-slide packs-carousel-slide--regalo"
            >
              <RegaloCardComponent
                compact
                :regalo-id="regalo.id"
                :title="regalo.title"
                :image="regalo.image"
                :price="regalo.price"
                :agotado="Boolean(regalo.agotado)"
              />
            </div>
          </div>
        </div>
      </div>
      <button
        type="button"
        class="packs-carousel-arrow"
        aria-label="Ver regalos siguientes"
        @click="scrollRegalosCarousel(1)"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
          <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
        </svg>
      </button>
    </div>
    <div class="container text-center complementos-cta-wrap">
      <a
        href="#packs"
        class="packs-complementos-cta"
        aria-label="Vuelve a la sección de vinos y packs"
      >
        <span class="packs-complementos-cta-text">Vuelve a los vinos</span>
        <svg
          class="packs-complementos-cta-icon packs-complementos-cta-icon--up"
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          fill="currentColor"
          viewBox="0 0 16 16"
          aria-hidden="true"
        >
          <path fill-rule="evenodd" d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"/>
        </svg>
      </a>
    </div>
  </section>

  <div class="prefooter-pitch--dark">
    <div class="prefooter-pitch container text-center">
      <span class="prefooter-line">Otros vinos y packs disponibles</span>
      <span class="prefooter-sep" aria-hidden="true">·</span>
      <span class="prefooter-line">Compra desde 1 botella</span>
      <span class="prefooter-sep" aria-hidden="true">·</span>
      <span class="prefooter-line">Empaques de regalo sin costo</span>
      <span class="prefooter-sep" aria-hidden="true">·</span>
      <span class="prefooter-line">Consulta valor de despacho a tu comuna</span>
    </div>
  </div>

  <div id="contacto">
    <FooterComponent />
  </div>

</template>

<script setup>
import { computed, nextTick, onMounted, onUnmounted, ref } from 'vue'
import NavBar from '../components/NavBar'
import FooterComponent from '../components/FooterComponent.vue'
import CardComponent from '../components/CardComponent.vue'
import RegaloCardComponent from '../components/RegaloCardComponent.vue'
import catalogoPacks from '../data/catalogoPack.json'
import regalosPadre from '../data/regalosPadre.json'

/** Dos series iguales para bucle de scroll sin salto visible */
const proyectosLoop = computed(() => [...catalogoPacks, ...catalogoPacks])
/** Precio CLP en JSON (ej. "$9.990") → número para ordenar */
function parsePrecioClp(price) {
  if (typeof price !== 'string') return Number.POSITIVE_INFINITY
  const digits = price.replace(/\D/g, '')
  const n = Number.parseInt(digits, 10)
  return Number.isFinite(n) ? n : Number.POSITIVE_INFINITY
}

const regalosOrdenados = computed(() =>
  [...regalosPadre].sort((a, b) => {
    const diff = parsePrecioClp(a.price) - parsePrecioClp(b.price)
    if (diff !== 0) return diff
    return a.title.localeCompare(b.title, 'es', { sensitivity: 'base' })
  }),
)

const regalosLoop = computed(() => [...regalosOrdenados.value, ...regalosOrdenados.value])

const carouselRef = ref(null)
const regalosCarouselRef = ref(null)
const sobreMiClusterRef = ref(null)
const sobreMiDedicatoriaWrapRef = ref(null)
const sobreMiDedicatoriaRef = ref(null)
const carouselPaused = ref(false)
const reduceMotion = ref(false)

/** Píxeles por frame (~60 fps); ~0.3 ≈ 18 px/s */
const SCROLL_STEP = 0.32

/** Ancho del hueco del carrusel (sustituye cqi sin container-type, evita avisos del validador CSS) */
const PACKS_CAROUSEL_IW = '--packs-carousel-iw'
const REGALOS_SLIDES_PER_VIEW = '--regalos-slides-per-view'
const REGALO_CARD_MAX_PX = 11.25 * 16

let rafId = 0
let syncCarouselRaf = null
let syncRegalosCarouselRaf = null
let touchResumeTimer = null
let focusResumeTimer = null
let arrowResumeTimer = null
let carouselResizeObserver = null
let regalosCarouselResizeObserver = null
let sobreMiFitRaf = null
let sobreMiResizeObserver = null

const SOBRE_MI_DEDICATORIA_FS = '--sobre-mi-dedicatoria-fs'
const SOBRE_MI_DEDICATORIA_MIN_PX = 8
const SOBRE_MI_DEDICATORIA_MAX_PX = 40
const SOBRE_MI_DEDICATORIA_FIT_SLACK_PX = 2

function dedicatoriaLineas() {
  const dedicatoria = sobreMiDedicatoriaRef.value
  if (!dedicatoria) return []
  return dedicatoria.querySelectorAll('.sobre-mi-dedicatoria-line')
}

function dedicatoriaCabeEnAncho(maxWidth) {
  const dedicatoria = sobreMiDedicatoriaRef.value
  const lines = dedicatoriaLineas()
  if (!dedicatoria || !lines.length) return false
  for (const line of lines) {
    if (line.scrollWidth > maxWidth + 0.5) return false
  }
  if (dedicatoria.scrollWidth > maxWidth + 0.5) return false
  return true
}

function getSobreMiDedicatoriaMaxWidth() {
  const cluster = sobreMiClusterRef.value
  const wrap = sobreMiDedicatoriaWrapRef.value
  const dedicatoria = sobreMiDedicatoriaRef.value
  if (!wrap || !dedicatoria) return 0

  const wrapStyles = getComputedStyle(wrap)
  let maxWidth =
    dedicatoria.clientWidth ||
    wrap.clientWidth -
      parseFloat(wrapStyles.paddingLeft) -
      parseFloat(wrapStyles.paddingRight)

  if (maxWidth <= 0) return 0

  if (cluster) {
    const hero = cluster.querySelector('.sobre-mi-hero-img')
    const logo = cluster.querySelector('.sobre-mi-logo')
    const clusterStyle = getComputedStyle(cluster)
    const isHorizontal =
      clusterStyle.display === 'grid' || clusterStyle.flexDirection === 'row'

    if (isHorizontal && hero && logo) {
      const wrapRect = wrap.getBoundingClientRect()
      const heroRect = hero.getBoundingClientRect()
      const logoRect = logo.getBoundingClientRect()
      const leftBound = Math.max(wrapRect.left, heroRect.right)
      const rightBound = Math.min(wrapRect.right, logoRect.left)
      const gapWidth = Math.max(0, rightBound - leftBound)
      maxWidth = Math.min(maxWidth, gapWidth)
    }
  }

  return Math.max(0, maxWidth - SOBRE_MI_DEDICATORIA_FIT_SLACK_PX)
}

function fitSobreMiDedicatoria() {
  const wrap = sobreMiDedicatoriaWrapRef.value
  const dedicatoria = sobreMiDedicatoriaRef.value
  if (!wrap || !dedicatoria) return

  const maxWidth = getSobreMiDedicatoriaMaxWidth()
  if (maxWidth <= 0) return

  let lo = SOBRE_MI_DEDICATORIA_MIN_PX
  let hi = SOBRE_MI_DEDICATORIA_MAX_PX
  let best = lo

  while (lo <= hi) {
    const mid = Math.floor((lo + hi) / 2)
    dedicatoria.style.setProperty(SOBRE_MI_DEDICATORIA_FS, `${mid}px`)
    if (dedicatoriaCabeEnAncho(maxWidth)) {
      best = mid
      lo = mid + 1
    } else {
      hi = mid - 1
    }
  }

  dedicatoria.style.setProperty(SOBRE_MI_DEDICATORIA_FS, `${best}px`)
}

function scheduleFitSobreMiDedicatoria() {
  if (sobreMiFitRaf != null) return
  sobreMiFitRaf = requestAnimationFrame(() => {
    sobreMiFitRaf = null
    fitSobreMiDedicatoria()
  })
}

function syncCarouselInlineSize() {
  const el = carouselRef.value
  if (!el) return
  const w = el.clientWidth
  if (w > 0) el.style.setProperty(PACKS_CAROUSEL_IW, `${w}px`)
}

function syncRegalosCarouselInlineSize() {
  const el = regalosCarouselRef.value
  if (!el) return
  const w = el.clientWidth
  if (w <= 0) return
  el.style.setProperty(PACKS_CAROUSEL_IW, `${w}px`)

  const inner = el.querySelector('.packs-carousel-inner')
  const gapPx = inner
    ? parseFloat(getComputedStyle(inner).columnGap || getComputedStyle(inner).gap) || 0
    : 0

  const isDesktop = window.matchMedia('(min-width: 768px)').matches
  let perView = 3
  if (!isDesktop) {
    const twoFit = w >= 2 * REGALO_CARD_MAX_PX + gapPx
    perView = twoFit ? 2 : 1
  }
  el.style.setProperty(REGALOS_SLIDES_PER_VIEW, String(perView))
}

function getRegalosSlidesPerView() {
  const el = regalosCarouselRef.value
  if (!el) return 1
  if (window.matchMedia('(min-width: 768px)').matches) return 3
  const raw = getComputedStyle(el).getPropertyValue(REGALOS_SLIDES_PER_VIEW).trim()
  return parseInt(raw, 10) === 2 ? 2 : 1
}

/**
 * ResizeObserver + setProperty en el mismo frame puede disparar
 * "ResizeObserver loop completed with undelivered notifications".
 * Se aplaza al siguiente paint (rAF).
 */
function scheduleSyncCarouselInlineSize() {
  if (syncCarouselRaf != null) return
  syncCarouselRaf = requestAnimationFrame(() => {
    syncCarouselRaf = null
    syncCarouselInlineSize()
  })
}

function scheduleSyncRegalosCarouselInlineSize() {
  if (syncRegalosCarouselRaf != null) return
  syncRegalosCarouselRaf = requestAnimationFrame(() => {
    syncRegalosCarouselRaf = null
    syncRegalosCarouselInlineSize()
  })
}

function pauseCarousel() {
  carouselPaused.value = true
}

function resumeCarousel() {
  carouselPaused.value = false
}

function onCarouselTouchStart() {
  pauseCarousel()
  if (touchResumeTimer) {
    clearTimeout(touchResumeTimer)
    touchResumeTimer = null
  }
}

function onCarouselTouchEnd() {
  if (touchResumeTimer) clearTimeout(touchResumeTimer)
  touchResumeTimer = setTimeout(() => {
    carouselPaused.value = false
    touchResumeTimer = null
  }, 2400)
}

function onCarouselFocusOut(ev) {
  const outer = ev.currentTarget
  const next = ev.relatedTarget
  if (next && outer.contains(next)) return
  if (focusResumeTimer) clearTimeout(focusResumeTimer)
  focusResumeTimer = setTimeout(() => {
    carouselPaused.value = false
    focusResumeTimer = null
  }, 400)
}

function getCarouselSlides(el) {
  const inner = el.querySelector('.packs-carousel-inner')
  if (!inner) return []
  return [...inner.querySelectorAll('.packs-carousel-slide')]
}

/** Índice del snap más cercano a scrollLeft (usa offsetLeft real del layout). */
function nearestCarouselSlideIndex(slides, scrollLeft) {
  if (!slides.length) return 0
  let best = 0
  let bestDist = Infinity
  for (let i = 0; i < slides.length; i++) {
    const dist = Math.abs(slides[i].offsetLeft - scrollLeft)
    if (dist < bestDist) {
      bestDist = dist
      best = i
    }
  }
  return best
}

/** Safari iOS: smooth + scroll-snap mandatory desalinean flechas tras auto-scroll fraccionario. */
function carouselArrowScrollInstant() {
  if (reduceMotion.value) return true
  if (typeof navigator === 'undefined') return false
  const ua = navigator.userAgent
  const iOS =
    /iPad|iPhone|iPod/.test(ua) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
  return iOS
}

function scrollCarousel(direction) {
  const el = carouselRef.value
  if (!el) return
  pauseCarousel()
  if (arrowResumeTimer) clearTimeout(arrowResumeTimer)

  const slides = getCarouselSlides(el)
  if (!slides.length) return

  const packCount = slides.length / 2
  if (!packCount || !Number.isInteger(packCount)) return

  const threeCols = window.matchMedia('(min-width: 768px)').matches
  const step = threeCols ? 3 : 1
  const currentIdx = nearestCarouselSlideIndex(slides, el.scrollLeft)
  const snappedLeft = slides[currentIdx].offsetLeft

  /* Corrige deriva del auto-scroll antes de calcular el destino */
  el.scrollLeft = snappedLeft

  const logicalIdx = currentIdx % packCount
  const rawTarget = logicalIdx + direction * step
  const targetLogical = ((rawTarget % packCount) + packCount) % packCount
  const didWrap = rawTarget < 0 || rawTarget >= packCount

  const targetIdx =
    currentIdx >= packCount ? packCount + targetLogical : targetLogical
  const targetLeft = slides[targetIdx].offsetLeft
  const behavior = carouselArrowScrollInstant() || didWrap ? 'auto' : 'smooth'

  const applyScroll = () => {
    el.scrollTo({ left: targetLeft, behavior })
  }

  if (behavior === 'smooth') {
    requestAnimationFrame(applyScroll)
  } else {
    applyScroll()
  }

  arrowResumeTimer = setTimeout(() => {
    carouselPaused.value = false
    arrowResumeTimer = null
  }, behavior === 'smooth' ? 3200 : 800)
}

function scrollRegalosCarousel(direction) {
  const el = regalosCarouselRef.value
  if (!el) return

  const slides = getCarouselSlides(el)
  if (!slides.length) return

  const regaloCount = slides.length / 2
  if (!regaloCount || !Number.isInteger(regaloCount)) return

  const threeCols = window.matchMedia('(min-width: 768px)').matches
  const step = threeCols ? 3 : getRegalosSlidesPerView()
  const currentIdx = nearestCarouselSlideIndex(slides, el.scrollLeft)
  const snappedLeft = slides[currentIdx].offsetLeft

  el.scrollLeft = snappedLeft

  const logicalIdx = currentIdx % regaloCount
  const rawTarget = logicalIdx + direction * step
  const targetLogical = ((rawTarget % regaloCount) + regaloCount) % regaloCount
  const didWrap = rawTarget < 0 || rawTarget >= regaloCount

  const targetIdx =
    currentIdx >= regaloCount ? regaloCount + targetLogical : targetLogical
  const targetLeft = slides[targetIdx].offsetLeft
  const behavior = carouselArrowScrollInstant() || didWrap ? 'auto' : 'smooth'

  const applyScroll = () => {
    el.scrollTo({ left: targetLeft, behavior })
  }

  if (behavior === 'smooth') {
    requestAnimationFrame(applyScroll)
  } else {
    applyScroll()
  }
}

function tick() {
  const el = carouselRef.value
  if (el && !carouselPaused.value && !reduceMotion.value) {
    const half = el.scrollWidth / 2
    if (half > 1) {
      el.scrollLeft += SCROLL_STEP
      if (el.scrollLeft >= half) {
        el.scrollLeft -= half
      }
    }
  }
  rafId = requestAnimationFrame(tick)
}

onMounted(async () => {
  reduceMotion.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  syncCarouselInlineSize()
  syncRegalosCarouselInlineSize()
  const el = carouselRef.value
  if (el && typeof ResizeObserver !== 'undefined') {
    carouselResizeObserver = new ResizeObserver(() => scheduleSyncCarouselInlineSize())
    carouselResizeObserver.observe(el)
  }
  const regalosEl = regalosCarouselRef.value
  if (regalosEl && typeof ResizeObserver !== 'undefined') {
    regalosCarouselResizeObserver = new ResizeObserver(() => scheduleSyncRegalosCarouselInlineSize())
    regalosCarouselResizeObserver.observe(regalosEl)
  }
  await nextTick()
  scheduleSyncRegalosCarouselInlineSize()
  if (typeof ResizeObserver !== 'undefined') {
    sobreMiResizeObserver = new ResizeObserver(() => scheduleFitSobreMiDedicatoria())
    if (sobreMiClusterRef.value) sobreMiResizeObserver.observe(sobreMiClusterRef.value)
    if (sobreMiDedicatoriaWrapRef.value) sobreMiResizeObserver.observe(sobreMiDedicatoriaWrapRef.value)
  }
  const runFitSobreMi = () => scheduleFitSobreMiDedicatoria()
  if (document.fonts?.ready) {
    document.fonts.ready.then(runFitSobreMi)
  } else {
    runFitSobreMi()
  }
  rafId = requestAnimationFrame(tick)
})

onUnmounted(() => {
  if (syncCarouselRaf != null) {
    cancelAnimationFrame(syncCarouselRaf)
    syncCarouselRaf = null
  }
  if (syncRegalosCarouselRaf != null) {
    cancelAnimationFrame(syncRegalosCarouselRaf)
    syncRegalosCarouselRaf = null
  }
  if (sobreMiFitRaf != null) {
    cancelAnimationFrame(sobreMiFitRaf)
    sobreMiFitRaf = null
  }
  carouselResizeObserver?.disconnect()
  carouselResizeObserver = null
  regalosCarouselResizeObserver?.disconnect()
  regalosCarouselResizeObserver = null
  sobreMiResizeObserver?.disconnect()
  sobreMiResizeObserver = null
  cancelAnimationFrame(rafId)
  if (touchResumeTimer) clearTimeout(touchResumeTimer)
  if (focusResumeTimer) clearTimeout(focusResumeTimer)
  if (arrowResumeTimer) clearTimeout(arrowResumeTimer)
})

</script>

<style scoped>
.home-section {
  background-color: var(--vin-negro-marca);
}

.prefooter-pitch {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  row-gap: 0.45rem;
  column-gap: 0.25rem;
  padding-top: 0.65rem;
  padding-bottom: 1.25rem;
  margin-bottom: 0.35rem;
}

.prefooter-pitch--dark {
  width: 100%;
  background-color: var(--vin-negro-marca, #0a0a0a);
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.prefooter-pitch--dark .prefooter-line {
  color: var(--vin-texto-muted);
}

.prefooter-line {
  font-size: clamp(0.78rem, 2.1vw, 0.92rem);
  line-height: 1.4;
  color: var(--vin-texto-muted);
}

.prefooter-sep {
  color: var(--vin-acento, #6d2c35);
  font-weight: 800;
  font-size: 1.65em;
  line-height: 1;
  padding-inline: 0.28rem;
  user-select: none;
}

/* Móvil: una línea por texto, sin separadores */
@media (max-width: 575.98px) {
  .prefooter-pitch {
    flex-direction: column;
    flex-wrap: nowrap;
    align-items: center;
    row-gap: 0.45rem;
    column-gap: 0;
  }

  .prefooter-sep {
    display: none;
  }
}

.home-section h3 {
  font-family: 'Nunito', system-ui, sans-serif;
  font-size: clamp(1.3rem, 4vw, 1.9rem);
  letter-spacing: 0.02em;
  display: inline-block;
  position: relative;
  padding: 0.2em 0.85em 1rem;
  margin-bottom: 0.4rem;
  z-index: 0;
  color: var(--vin-texto-claro);
}

/* Línea burdeos + corazón bajo el título del carrusel (Día del Padre) */
#packs .packs-encabezado {
  max-width: 42rem;
}

#packs .packs-subtitulo {
  margin: 0 auto;
  max-width: 36rem;
  font-family: 'Nunito', system-ui, sans-serif;
  font-size: clamp(0.88rem, 2.4vw, 1.05rem);
  font-weight: 500;
  line-height: 1.45;
  color: var(--vin-texto-muted);
}

#packs .packs-complementos-cta,
#complementos .packs-complementos-cta {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.45rem;
  margin: 0 auto;
  padding: 0.48rem 1.05rem 0.52rem;
  border-radius: 2rem;
  font-family: 'Nunito', system-ui, sans-serif;
  font-size: clamp(0.78rem, 2.1vw, 0.92rem);
  font-weight: 800;
  letter-spacing: 0.02em;
  line-height: 1.2;
  text-decoration: none;
  color: #fff;
  background: linear-gradient(145deg, var(--vin-acento, #6d2c35), var(--vin-profundo, #3a0f18));
  border: 1px solid rgba(255, 255, 255, 0.22);
  box-shadow:
    0 0 0 1px rgba(var(--vin-acento-rgb), 0.35),
    0 4px 16px rgba(0, 0, 0, 0.35);
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    background 0.2s ease;
}

#packs .packs-complementos-cta {
  margin-bottom: 1.35rem;
}

#complementos .complementos-cta-wrap {
  margin-top: 0.35rem;
  padding-bottom: 0.25rem;
}

#packs .packs-complementos-cta:hover,
#packs .packs-complementos-cta:focus-visible,
#complementos .packs-complementos-cta:hover,
#complementos .packs-complementos-cta:focus-visible {
  color: #fff;
  transform: translateY(-1px);
  box-shadow:
    0 0 0 2px rgba(255, 255, 255, 0.15),
    0 6px 20px rgba(0, 0, 0, 0.45);
}

#packs .packs-complementos-cta:active,
#complementos .packs-complementos-cta:active {
  transform: translateY(0);
}

.packs-complementos-cta-icon {
  flex-shrink: 0;
  animation: packs-complementos-bounce 1.8s ease-in-out infinite;
}

.packs-complementos-cta-icon--up {
  animation: packs-complementos-bounce-up 1.8s ease-in-out infinite;
}

@keyframes packs-complementos-bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(3px);
  }
}

@keyframes packs-complementos-bounce-up {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-3px);
  }
}

@media (prefers-reduced-motion: reduce) {
  .packs-complementos-cta-icon {
    animation: none;
  }

  #packs .packs-complementos-cta:hover,
  #packs .packs-complementos-cta:focus-visible,
  #complementos .packs-complementos-cta:hover,
  #complementos .packs-complementos-cta:focus-visible {
    transform: none;
  }
}

#complementos.complementos-section {
  scroll-margin-top: 0.75rem;
  background-color: #fff;
}

#complementos .complementos-titulo {
  color: var(--vin-profundo, #3a0f18);
}

#complementos .packs-carousel-outer {
  align-items: stretch;
  overflow: visible;
}

#complementos .packs-carousel-wrap {
  overflow-x: auto;
  overflow-y: visible;
  padding-block: 0.4rem 1rem;
}

#complementos .packs-carousel-inner {
  --packs-gap: clamp(0.55rem, 1.8vw, 0.95rem);
  align-items: stretch;
  padding-inline: 0.1rem;
}

#complementos .packs-carousel-slide--regalo {
  width: calc(
    (
        var(--packs-carousel-iw, 100%) -
        (var(--regalos-slides-per-view, 1) - 1) * var(--packs-gap)
      ) / var(--regalos-slides-per-view, 1)
  );
  scroll-snap-align: start;
  scroll-snap-stop: always;
  overflow: visible;
}

#complementos .packs-carousel-slide--regalo > * {
  height: 100%;
}

@media (min-width: 768px) {
  #complementos .packs-carousel-slide--regalo {
    width: min(
      11rem,
      calc((var(--packs-carousel-iw, 100%) - 2 * var(--packs-gap)) / 3)
    );
  }
}

.packs-titulo {
  padding-bottom: 1.35rem;
}

.packs-titulo::before {
  content: '';
  position: absolute;
  z-index: 0;
  left: 50%;
  bottom: 0.45rem;
  width: clamp(5.5rem, 38vw, 9.5rem);
  height: 3px;
  transform: translateX(-50%);
  border-radius: 3px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(var(--vin-acento-rgb), 0.35) 10%,
    rgba(var(--vin-acento-rgb), 1) 28%,
    rgba(var(--vin-acento-rgb), 1) 72%,
    rgba(var(--vin-acento-rgb), 0.35) 90%,
    transparent 100%
  );
  box-shadow: 0 0 10px rgba(var(--vin-acento-rgb), 0.45);
  pointer-events: none;
}

.packs-titulo::after {
  content: '♥';
  position: absolute;
  z-index: 1;
  left: 50%;
  bottom: 0.18rem;
  width: auto;
  height: auto;
  transform: translateX(-50%);
  color: var(--vin-acento, #6d2c35);
  font-size: clamp(0.9rem, 4.5vw, 1.2rem);
  line-height: 1;
  text-shadow:
    0 0 8px rgba(var(--vin-acento-rgb), 0.65),
    0 1px 2px rgba(0, 0, 0, 0.35);
  pointer-events: none;
}

@media (prefers-reduced-motion: no-preference) {
  .packs-titulo::before {
    animation: packsTituloLinea 4.5s ease-in-out infinite;
  }

  .packs-titulo::after {
    animation: packsTituloCorazon 4.5s ease-in-out infinite;
  }
}

@keyframes packsTituloLinea {
  0%,
  100% {
    opacity: 0.9;
    transform: translateX(-50%) scaleX(1);
    box-shadow: 0 0 8px rgba(var(--vin-acento-rgb), 0.35);
  }
  50% {
    opacity: 1;
    transform: translateX(-50%) scaleX(1.08);
    box-shadow: 0 0 14px rgba(var(--vin-acento-rgb), 0.6);
  }
}

@keyframes packsTituloCorazon {
  0%,
  100% {
    transform: translateX(-50%) scale(1);
    opacity: 0.92;
  }
  50% {
    transform: translateX(-50%) scale(1.18);
    opacity: 1;
  }
}

@media (prefers-reduced-motion: reduce) {
  .packs-titulo::before,
  .packs-titulo::after {
    animation: none !important;
  }
}

#sobre-mi.sobre-mi-section--light {
  background-color: #fff;
}

#sobre-mi .sobre-mi-media {
  display: flex;
  justify-content: center;
  width: 100%;
}

#sobre-mi .sobre-mi-cluster {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: clamp(0.55rem, 2vw, 1.25rem);
  text-align: center;
  max-width: 100%;
  overflow-x: clip;
}

#sobre-mi .sobre-mi-dedicatoria-wrap {
  width: 100%;
  min-width: 0;
  max-width: 100%;
  overflow-x: clip;
}

#sobre-mi .sobre-mi-dedicatoria {
  margin: 0;
  width: 100%;
  max-width: 100%;
  min-width: 0;
  text-align: center;
  font-family: 'Nunito', system-ui, sans-serif;
  font-size: var(--sobre-mi-dedicatoria-fs, 0.85rem);
  font-weight: 600;
  line-height: 1.3;
  color: var(--vin-profundo);
  overflow-x: clip;
}

#sobre-mi .sobre-mi-dedicatoria-line {
  display: block;
  white-space: nowrap;
  max-width: 100%;
  overflow-x: clip;
  text-overflow: clip;
}

#sobre-mi .sobre-mi-dedicatoria--destacado {
  color: var(--vin-acento);
  font-weight: 800;
  font-style: italic;
}

#sobre-mi .sobre-mi-hero-img {
  display: block;
  max-width: 100%;
  height: auto;
  object-fit: contain;
  position: relative;
  z-index: 1;
  flex-shrink: 0;
}

#sobre-mi .sobre-mi-logo {
  display: block;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
  box-shadow: 0 0 0 2px rgba(109, 44, 53, 0.15);
  position: relative;
  z-index: 1;
  flex-shrink: 0;
}

@media (max-width: 767.98px) {
  #sobre-mi.sobre-mi-section--light {
    padding-top: 0.35rem !important;
    padding-bottom: 0.35rem !important;
  }

  #sobre-mi .sobre-mi-cluster {
    gap: 0.45rem;
    width: 100%;
  }

  #sobre-mi .sobre-mi-hero-img {
    width: clamp(96px, 30vw, 160px);
    flex-shrink: 1;
    min-width: 0;
  }

  #sobre-mi .sobre-mi-logo {
    width: clamp(60px, 18vw, 84px);
    height: clamp(60px, 18vw, 84px);
    flex-shrink: 1;
    min-width: 0;
  }
}

@media (max-width: 359.98px) {
  #sobre-mi .sobre-mi-hero-img {
    width: clamp(84px, 27vw, 120px);
  }

  #sobre-mi .sobre-mi-logo {
    width: clamp(52px, 16vw, 72px);
    height: clamp(52px, 16vw, 72px);
  }
}

@media (min-width: 768px) {
  #sobre-mi .sobre-mi.container {
    max-width: 100%;
    padding-inline: 30px;
  }

  #sobre-mi .sobre-mi-media {
    width: 100%;
  }

  #sobre-mi .sobre-mi-cluster {
    display: grid;
    grid-template-columns: auto minmax(0, 1fr) auto;
    grid-template-rows: auto;
    align-items: center;
    justify-items: center;
    width: 100%;
    max-width: none;
    column-gap: clamp(0.65rem, 2vw, 1.75rem);
    row-gap: 0;
  }

  #sobre-mi .sobre-mi-hero-img {
    grid-column: 1;
    grid-row: 1;
    width: clamp(96px, 10vw, 168px);
    margin: 0;
  }

  #sobre-mi .sobre-mi-dedicatoria-wrap {
    grid-column: 2;
    grid-row: 1;
    width: 100%;
    min-width: 0;
    max-width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-inline: clamp(0.35rem, 1.5vw, 1.25rem);
    z-index: 0;
  }

  #sobre-mi .sobre-mi-logo {
    grid-column: 3;
    grid-row: 1;
    width: clamp(64px, 7vw, 112px);
    height: clamp(64px, 7vw, 112px);
    margin: 0;
  }
}

@media (min-width: 768px) and (max-width: 991.98px) {
  #sobre-mi .sobre-mi-hero-img {
    width: clamp(92px, 9.5vw, 124px);
  }

  #sobre-mi .sobre-mi-dedicatoria-wrap {
    padding-inline: clamp(0.5rem, 1.5vw, 1rem);
  }

  #sobre-mi .sobre-mi-logo {
    width: clamp(60px, 6.5vw, 80px);
    height: clamp(60px, 6.5vw, 80px);
  }
}

.btn-top {
  width: 2.35rem;
  height: 2.35rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
  background-color: #fff;
  color: var(--vin-acento);
  border: 2px solid rgba(255, 255, 255, 0.95);
  box-shadow:
    0 0 0 1px rgba(var(--vin-acento-rgb), 0.45),
    0 4px 16px rgba(0, 0, 0, 0.55);
  transition:
    background-color 0.2s ease,
    color 0.2s ease,
    box-shadow 0.2s ease,
    transform 0.2s ease;
}

.btn-top:hover,
.btn-top:focus-visible {
  background-color: var(--vin-acento);
  color: #fff;
  border-color: var(--vin-acento);
  box-shadow:
    0 0 0 2px rgba(255, 255, 255, 0.2),
    0 6px 18px rgba(0, 0, 0, 0.6);
  transform: translateY(-1px);
}

.btn-top:active {
  transform: translateY(0);
}

.packs-carousel-outer {
  max-width: 100%;
  min-height: 0;
}

.packs-carousel-slot {
  min-width: 0;
}

.packs-carousel-rail {
  align-self: stretch;
}

.packs-carousel-rail-mid {
  flex: 1 1 auto;
  min-height: 0;
  width: 100%;
}

.packs-carousel-top {
  flex-shrink: 0;
  margin-bottom: 0.75rem;
}

.packs-carousel-top.btn-top {
  width: clamp(2.5rem, 8vw, 2.85rem);
  height: clamp(2.5rem, 8vw, 2.85rem);
}

.packs-carousel-arrow {
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: clamp(2.5rem, 8vw, 2.85rem);
  height: clamp(2.5rem, 8vw, 2.85rem);
  padding: 0;
  border: none;
  border-radius: 50%;
  background-color: var(--vin-acento);
  color: #fff;
  box-shadow: 0 2px 8px rgba(var(--vin-acento-rgb), 0.35);
  cursor: pointer;
  transition:
    background-color 0.2s ease,
    transform 0.15s ease,
    box-shadow 0.2s ease;
}

.packs-carousel-arrow:hover {
  background-color: var(--vin-acento-hover);
  box-shadow: 0 3px 12px rgba(var(--vin-acento-rgb), 0.45);
}

.packs-carousel-arrow:active {
  background-color: var(--vin-acento-active);
  transform: scale(0.96);
}

.packs-carousel-arrow:focus-visible {
  outline: 2px solid rgba(var(--vin-acento-rgb), 0.55);
  outline-offset: 3px;
}

.packs-carousel-wrap {
  width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: thin;
  scrollbar-color: rgba(var(--vin-acento-rgb), 0.45) transparent;
  padding-block: 0.25rem 0.75rem;
  outline: none;
}

.packs-carousel-wrap:focus-visible {
  box-shadow: 0 0 0 2px rgba(var(--vin-acento-rgb), 0.35);
  border-radius: 0.35rem;
}

.packs-carousel-wrap::-webkit-scrollbar {
  height: 6px;
}

.packs-carousel-wrap::-webkit-scrollbar-thumb {
  background: rgba(var(--vin-acento-rgb), 0.4);
  border-radius: 4px;
}

.packs-carousel-inner {
  --packs-gap: clamp(0.75rem, 2vw, 1.15rem);
  display: flex;
  flex-direction: row;
  align-items: stretch;
  gap: var(--packs-gap);
  width: max-content;
  min-height: 100%;
}

/*
 * Siempre tarjetas enteras en el viewport: 1 columna en móvil, 3 en md+.
 * --packs-carousel-iw = ancho del área scroll (ResizeObserver).
 */
.packs-carousel-slide {
  flex: 0 0 auto;
  box-sizing: border-box;
  scroll-snap-align: start;
  scroll-snap-stop: normal;
  min-height: 0;
  width: var(--packs-carousel-iw, 100%);
  display: flex;
  flex-direction: column;
}

@media (min-width: 768px) {
  .packs-carousel-slide {
    width: calc((var(--packs-carousel-iw, 100%) - 2 * var(--packs-gap)) / 3);
  }
}

.packs-carousel-slide > * {
  flex: 1 1 auto;
  width: 100%;
  min-height: 0;
  align-self: stretch;
}
</style>