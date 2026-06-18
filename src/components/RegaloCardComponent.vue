<template>
  <div
    class="card card-pack card-regalo h-100 d-flex flex-column shadow-sm"
    :class="[
      agotado ? 'card-pack--agotado border-secondary' : 'border-success',
      { 'card-regalo--compact': compact },
    ]"
  >
    <div class="card-img-wrap card-img-wrap--pack card-img-wrap--regalo flex-shrink-0">
      <div class="card-img-photo">
        <span v-if="agotado" class="card-pack-agotado-badge">Agotado</span>
        <img
          :src="image"
          class="card-img-top"
          :class="{ 'card-pack-img--agotado': agotado }"
          :alt="`${title}${agotado ? ' (agotado)' : ''}`"
          loading="lazy"
        >
      </div>
      <div class="card-img-caption">
        <div class="card-title-wrap">
          <h6 class="card-title fw-bold mb-0">{{ title }}</h6>
        </div>
        <div class="card-img-caption-actions">
          <div class="card-prices">
            <p
              class="card-price mb-0 fw-bold"
              :class="{ 'card-price--agotado': agotado }"
            >
              {{ price }}
            </p>
          </div>
          <a
            class="btn btn-whatsapp wa-cta shadow-sm"
            :href="agotado ? '#' : whatsappUrl"
            :target="agotado ? undefined : '_blank'"
            :rel="agotado ? undefined : 'noopener noreferrer'"
            :aria-disabled="agotado || !whatsappReady"
            :class="{
              'opacity-50': !whatsappReady || agotado,
              'pe-none': agotado,
              'cursor-not-allowed': agotado,
            }"
            :aria-label="whatsappLinkAriaLabel"
            @click="onWaCardClick"
          >
            <svg
              class="wa-cta-icon"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            <span class="wa-cta-text">Lo quiero!</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { getWhatsAppPackUrl, isWhatsAppConfigured } from '@/config/whatsapp'

const props = defineProps({
  regaloId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    default: '',
  },
  agotado: {
    type: Boolean,
    default: false,
  },
  compact: {
    type: Boolean,
    default: false,
  },
})

const whatsappUrl = computed(() =>
  getWhatsAppPackUrl({
    packId: `regalo-${props.regaloId}`,
    title: props.title,
    valle: '',
    price: props.price,
    precioDiaPadre: false,
    image: props.image,
  }),
)
const whatsappReady = computed(() => isWhatsAppConfigured())

const whatsappLinkAriaLabel = computed(() => {
  if (props.agotado) return 'Regalo agotado, pedido no disponible'
  return `Lo quiero! Pedir ${props.title} por WhatsApp`
})

let lastWaOpenMs = 0
function onWaCardClick(e) {
  if (props.agotado) {
    e.preventDefault()
    return
  }
  if (!whatsappReady.value) {
    e.preventDefault()
    return
  }
  const now = Date.now()
  if (now - lastWaOpenMs < 2000) {
    e.preventDefault()
    return
  }
  lastWaOpenMs = now
}
</script>

<style scoped>
.card-pack {
  min-height: 0;
  border-radius: 1.125rem;
  overflow: hidden;
  --bs-card-inner-border-radius: calc(1.125rem - 1px);
  box-shadow:
    0 10px 32px rgba(0, 0, 0, 0.42),
    0 2px 10px rgba(0, 0, 0, 0.28);
}

.card-img-wrap {
  width: 100%;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.04);
}

.card-img-wrap--pack {
  display: flex;
  flex-direction: column;
}

.card-img-wrap--regalo {
  border-radius: 1.125rem;
}

.card-img-photo {
  position: relative;
  flex: 0 0 auto;
  width: 100%;
  aspect-ratio: 3 / 4;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.06);
}

.card-img-caption {
  flex: 0 0 auto;
  z-index: 1;
  padding: 0.55rem clamp(0.65rem, 3vw, 0.9rem) 0.6rem;
  text-align: center;
  background: linear-gradient(180deg, #2a1014 0%, #14080a 100%);
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.card-img-caption-actions {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  margin-top: 0.45rem;
  padding: 0.4rem 0.1rem 0.05rem;
  border-top: 1px solid rgba(255, 255, 255, 0.18);
}

.card-img-caption .card-title {
  font-family: 'Nunito', system-ui, sans-serif;
  color: #fff;
  font-size: clamp(0.82rem, 2.45vw, 1.05rem);
  line-height: 1.2;
  font-weight: 800;
  overflow-wrap: break-word;
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.45);
}

.card-pack--agotado .card-img-caption .card-title,
.card-pack--agotado .card-img-caption .card-prices {
  opacity: 0.88;
}

.card-pack-agotado-badge {
  position: absolute;
  top: 0.55rem;
  left: 50%;
  z-index: 2;
  translate: -50% 0;
  padding: 0.38rem 0.85rem;
  font-size: 0.68rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #fff;
  background: linear-gradient(145deg, #6a6a6a, #3d3d3d);
  border: 1px solid rgba(255, 255, 255, 0.4);
  border-radius: 0.4rem;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.4);
  pointer-events: none;
}

.card-pack-img--agotado {
  filter: grayscale(1) brightness(0.9);
}

.card-img-top {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center center;
}

@media (max-width: 575.98px) {
  .card-img-photo {
    aspect-ratio: unset;
    height: min(68vw, 320px);
  }
}

.card-prices {
  flex: 1 1 auto;
  min-width: 0;
  text-align: left;
  line-height: 1.15;
}

.card-img-caption .card-price {
  color: #9ef0b8;
  font-size: clamp(0.82rem, 2vw, 0.98rem);
  text-align: left;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.35);
}

.card-img-caption .card-price--agotado {
  color: rgba(255, 255, 255, 0.5);
  text-decoration: line-through;
  text-align: left;
}

.card-regalo--compact {
  border-radius: 0.9rem;
  box-shadow:
    0 6px 20px rgba(0, 0, 0, 0.32),
    0 1px 6px rgba(0, 0, 0, 0.2);
}

.card-regalo--compact .card-img-wrap--regalo {
  border-radius: 0.9rem;
}

.card-regalo--compact .card-img-photo {
  flex: 0 0 auto;
  width: 100%;
  height: clamp(9.75rem, 38vw, 11.75rem);
  aspect-ratio: unset;
}

.card-regalo--compact .card-img-caption {
  flex: 0 0 auto;
  padding: 0.48rem 0.55rem 0.52rem;
}

.card-regalo--compact .card-title-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(2 * 1.2em);
}

.card-regalo--compact .card-img-caption .card-title {
  font-size: clamp(0.7rem, 1.95vw, 0.86rem);
  line-height: 1.2;
  overflow-wrap: break-word;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}

.card-regalo--compact .card-prices {
  flex: 0 1 auto;
  min-width: 0;
}

.card-regalo--compact .card-img-caption .card-price {
  font-size: clamp(0.66rem, 1.8vw, 0.8rem);
  white-space: nowrap;
  line-height: 1.1;
}

.card-regalo--compact .card-img-caption-actions {
  flex-shrink: 0;
  margin-top: 0.32rem;
  padding: 0.32rem 0.05rem 0;
  gap: 0.35rem;
  align-items: center;
}

.card-regalo--compact .card-pack-agotado-badge {
  top: 0.45rem;
  padding: 0.3rem 0.65rem;
  font-size: 0.6rem;
}

.card-regalo--compact :deep(.wa-cta) {
  flex-shrink: 0;
  padding: 0.26rem 0.5rem;
  font-size: clamp(0.58rem, 1.55vw, 0.7rem);
  gap: 0.22rem;
}

.card-regalo--compact :deep(.wa-cta-icon) {
  width: 13px;
  height: 13px;
}
</style>
