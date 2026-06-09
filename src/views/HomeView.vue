<template>
  <NavBar />

  <section id="sobre-mi" class="home-section sobre-mi-section--light py-1 py-md-2">
    <div class="container sobre-mi">
      <div class="sobre-mi-media">
        <img
          class="sobre-mi-hero-img"
          src="/img/imagen_pap%C3%A1.jpg"
          alt="Especial Día del Padre"
          width="560"
          height="240"
          loading="lazy"
          decoding="async"
        >
        <p class="sobre-mi-dedicatoria">
          Por el cariño y la admiración hacia quienes son
          <span class="sobre-mi-dedicatoria--destacado">padres de verdad</span>...
          <span class="sobre-mi-dedicatoria-part">los que <span class="sobre-mi-dedicatoria--destacado">cuidan</span>, los que <span class="sobre-mi-dedicatoria--destacado">acompañan</span>, los que <span class="sobre-mi-dedicatoria--destacado">dejan huella</span>...</span>
          <span class="sobre-mi-dedicatoria-part">más allá de cualquier nombre o lazo.</span>
        </p>
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
  </section>
  <section id="packs" class="home-section home-section--slate pt-4 pt-md-5 pb-2 pb-md-3">
    <div class="container text-center">
      <h3 class="packs-titulo mb-4 fw-bold">Elige un regalo para Papá...</h3>
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
        class="packs-carousel-arrow packs-carousel-arrow--prev"
        aria-label="Ver packs anteriores"
        @click="scrollCarousel(-1)"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
          <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
        </svg>
      </button>
      <div
        ref="carouselRef"
        class="packs-carousel-wrap flex-grow-1 min-w-0"
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
              :oferta-etiqueta="proyecto.ofertaEtiqueta || ''"
              :price-oferta="proyecto.priceOferta || ''"
              :agotado="Boolean(proyecto.agotado)"
            />
          </div>
        </div>
      </div>
      <button
        type="button"
        class="packs-carousel-arrow packs-carousel-arrow--next"
        aria-label="Ver packs siguientes"
        @click="scrollCarousel(1)"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
          <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
        </svg>
      </button>
    </div>
    <div class="container text-end mt-2">
      <a href="#" class="btn btn-sm btn-outline-success rounded-circle p-1 btn-top" title="Volver al inicio" aria-label="Volver al inicio">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
          <path d="M8 12a.5.5 0 0 0 .5-.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 0 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 .5.5z"/>
        </svg>
      </a>
    </div>
  </section>

  <div class="prefooter-pitch--light">
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
import { computed, onMounted, onUnmounted, ref } from 'vue'
import NavBar from '../components/NavBar'
import FooterComponent from '../components/FooterComponent.vue'
import CardComponent from '../components/CardComponent.vue'
import catalogoPacks from '../data/catalogoPack.json'

/** Dos series iguales para bucle de scroll sin salto visible */
const proyectosLoop = computed(() => [...catalogoPacks, ...catalogoPacks])

const carouselRef = ref(null)
const carouselPaused = ref(false)
const reduceMotion = ref(false)

/** Píxeles por frame (~60 fps); ~0.3 ≈ 18 px/s */
const SCROLL_STEP = 0.32

/** Ancho del hueco del carrusel (sustituye cqi sin container-type, evita avisos del validador CSS) */
const PACKS_CAROUSEL_IW = '--packs-carousel-iw'

let rafId = 0
let syncCarouselRaf = null
let touchResumeTimer = null
let focusResumeTimer = null
let arrowResumeTimer = null
let carouselResizeObserver = null

function syncCarouselInlineSize() {
  const el = carouselRef.value
  if (!el) return
  const w = el.clientWidth
  if (w > 0) el.style.setProperty(PACKS_CAROUSEL_IW, `${w}px`)
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

function scrollCarousel(direction) {
  const el = carouselRef.value
  if (!el) return
  pauseCarousel()
  if (arrowResumeTimer) clearTimeout(arrowResumeTimer)

  const inner = el.querySelector('.packs-carousel-inner')
  const firstSlide = inner?.querySelector('.packs-carousel-slide')
  let delta = el.clientWidth * direction
  if (inner && firstSlide) {
    const gapPx = parseFloat(getComputedStyle(inner).gap) || 0
    const slideW = firstSlide.offsetWidth
    const threeCols = window.matchMedia('(min-width: 768px)').matches
    /* Móvil: un avance = 1 tarjeta + hueco; desktop: el viewport ya encaja 3 enteras */
    if (!threeCols) delta = (slideW + gapPx) * direction
  }

  el.scrollBy({
    left: delta,
    behavior: reduceMotion.value ? 'auto' : 'smooth',
  })
  arrowResumeTimer = setTimeout(() => {
    carouselPaused.value = false
    arrowResumeTimer = null
  }, 3200)
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

onMounted(() => {
  reduceMotion.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  syncCarouselInlineSize()
  const el = carouselRef.value
  if (el && typeof ResizeObserver !== 'undefined') {
    carouselResizeObserver = new ResizeObserver(() => scheduleSyncCarouselInlineSize())
    carouselResizeObserver.observe(el)
  }
  rafId = requestAnimationFrame(tick)
})

onUnmounted(() => {
  if (syncCarouselRaf != null) {
    cancelAnimationFrame(syncCarouselRaf)
    syncCarouselRaf = null
  }
  carouselResizeObserver?.disconnect()
  carouselResizeObserver = null
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

.home-section--ink {
  background-color: var(--vin-negro-marca);
}

.home-section--slate {
  background-color: var(--vin-negro-marca);
}

.home-divider {
  max-width: min(100%, 960px);
  margin-left: auto;
  margin-right: auto;
  opacity: 0.35;
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

.prefooter-pitch--light {
  width: 100%;
  background-color: #fff;
  border-top: 1px solid rgba(58, 15, 24, 0.1);
  border-bottom: 1px solid rgba(58, 15, 24, 0.1);
}

.prefooter-pitch--light .prefooter-line {
  color: #000;
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

/*
 * Línea tipo viña bajo el título (CSS):
 * ::before = tallo en curva (cuarto de elipse con bordes).
 * ::after  = “hojas” (elipses + box-shadow) y un puntito tipo uva.
 */
.home-section h3:not(.packs-titulo)::before {
  content: '';
  position: absolute;
  z-index: -1;
  left: 50%;
  bottom: 0.18rem;
  width: clamp(2.35rem, 14vw, 3.15rem);
  height: clamp(1.1rem, 5.5vw, 1.45rem);
  transform: translateX(calc(-50% - 0.12rem)) rotate(-13deg);
  transform-origin: 0 100%;
  border: none;
  border-bottom: 2.5px solid rgba(var(--vin-acento-rgb), 0.88);
  border-left: 2.5px solid rgba(var(--vin-acento-rgb), 0.88);
  border-radius: 0 0 0 100%;
  background: transparent;
  opacity: 0.9;
  pointer-events: none;
}

/* Guiño al arco del logo: franja breve, sin verdes de “viña” */
.home-section h3:not(.packs-titulo)::after {
  content: '';
  position: absolute;
  z-index: 0;
  left: 50%;
  bottom: 0.12rem;
  width: clamp(2.5rem, 18vw, 3.75rem);
  height: 3px;
  transform: translateX(-50%);
  border-radius: 2px;
  pointer-events: none;
  background: linear-gradient(
    90deg,
    #c9a227 0%,
    #3ddc84 22%,
    #4dabf7 44%,
    #9775fa 66%,
    #f783ac 88%,
    var(--vin-acento) 100%
  );
  opacity: 0.88;
}

/* Línea burdeos + corazón bajo el título del carrusel (Día del Padre) */
#packs .packs-titulo {
  padding-bottom: 1.35rem;
}

#packs .packs-titulo::before {
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

#packs .packs-titulo::after {
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
  .home-section h3:not(.packs-titulo)::before {
    animation: homeTituloVinaTallo 5s ease-in-out infinite;
  }

  .home-section h3:not(.packs-titulo)::after {
    animation: homeTituloVinaHojas 5s ease-in-out infinite;
  }

  #packs .packs-titulo::before {
    animation: packsTituloLinea 4.5s ease-in-out infinite;
  }

  #packs .packs-titulo::after {
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

@keyframes homeTituloVinaTallo {
  0%,
  100% {
    transform: translateX(calc(-50% - 0.12rem)) rotate(-13deg);
  }
  50% {
    transform: translateX(calc(-50% - 0.06rem)) rotate(-10deg);
  }
}

@keyframes homeTituloVinaHojas {
  0%,
  100% {
    transform: translateX(-50%) scaleX(1);
    opacity: 0.88;
  }
  50% {
    transform: translateX(-50%) scaleX(1.06);
    opacity: 1;
  }
}

@media (prefers-reduced-motion: reduce) {
  .home-section h3::before,
  .home-section h3::after {
    animation: none !important;
  }

  #packs .packs-titulo::before,
  #packs .packs-titulo::after {
    animation: none !important;
  }
}

#sobre-mi.sobre-mi-section--light {
  background-color: #fff;
}

#sobre-mi .sobre-mi-media {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: clamp(0.85rem, 3vw, 1.75rem);
  text-align: center;
}

@media (min-width: 768px) {
  #sobre-mi .sobre-mi-media {
    flex-direction: row;
    gap: clamp(1rem, 3vw, 2rem);
  }
}

#sobre-mi .sobre-mi-dedicatoria {
  margin: 0;
  max-width: 22rem;
  text-align: center;
  font-family: 'Nunito', system-ui, sans-serif;
  font-size: clamp(0.9rem, 2.4vw, 1.05rem);
  font-weight: 600;
  line-height: 1.55;
  color: var(--vin-profundo);
}

#sobre-mi .sobre-mi-dedicatoria--destacado {
  color: var(--vin-acento);
  font-weight: 800;
  font-style: italic;
}

#sobre-mi .sobre-mi-dedicatoria-part {
  display: block;
}

#sobre-mi .sobre-mi-hero-img {
  display: block;
  width: clamp(155px, 48vw, 330px);
  max-width: 100%;
  height: auto;
  object-fit: contain;
  flex-shrink: 0;
}

#sobre-mi .sobre-mi-logo {
  display: block;
  width: clamp(100px, 32vw, 180px);
  height: clamp(100px, 32vw, 180px);
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
  flex-shrink: 0;
  box-shadow: 0 0 0 2px rgba(109, 44, 53, 0.15);
}

.highlight {
  color: var(--vin-acento);
  font-style: italic;
  font-weight: bold;
}

.frase-final {
  font-style: italic;
  animation: colorPulse 3s ease-in-out infinite;
}

@keyframes colorPulse {
  0% {
    color: var(--vin-texto-muted);
  }
  50% {
    color: var(--vin-acento);
  }
  100% {
    color: var(--vin-texto-muted);
  }
}

.btn-top {
  width: 2rem;
  height: 2rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
}

.packs-carousel-outer {
  max-width: 100%;
  min-height: 0;
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