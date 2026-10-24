<script setup>
import { profile } from '../data/profile'

defineProps({
  size: { type: String, default: '280px' },
})

const src = profile.photo ? import.meta.env.BASE_URL + profile.photo : null
const fileName = (profile.shortName || 'profile').toLowerCase().replace(/\s+/g, '_') + '.jpg'
</script>

<template>
  <div class="photo-wrap" :style="{ '--size': size }">
    <div v-tilt="{ max: 9, scale: 1.03, glare: true }" class="window tilt-glare">
      <div class="titlebar">
        <span class="dot"></span>
        <span class="dot"></span>
        <span class="dot"></span>
        <span class="fname mono">{{ fileName }}</span>
      </div>
      <div class="screen">
        <img v-if="src" :src="src" :alt="`Portrait of ${profile.name}`" width="600" height="600" />
        <span v-else class="initials" role="img" :aria-label="profile.name">{{ profile.initials }}</span>
      </div>
    </div>
    <!-- Decorative corner brackets -->
    <span class="corner tl"></span>
    <span class="corner tr"></span>
    <span class="corner bl"></span>
    <span class="corner br"></span>
  </div>
</template>

<style scoped>
.photo-wrap {
  position: relative;
  width: var(--size);
  max-width: 100%;
  isolation: isolate;
  animation: photo-in 0.7s var(--ease) 0.25s both, float-soft 7s ease-in-out 1s infinite;
}

@keyframes photo-in {
  from {
    opacity: 0;
    transform: translateY(24px) scale(0.96);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* Ambient accent glow behind the window */
.photo-wrap::before {
  content: '';
  position: absolute;
  inset: -16%;
  z-index: -1;
  border-radius: 50%;
  background: radial-gradient(circle, var(--accent), transparent 68%);
  opacity: 0.28;
  filter: blur(30px);
  transition: opacity var(--duration) var(--ease);
}

.photo-wrap:hover::before {
  opacity: 0.5;
}

/* The portrait framed like a code editor / terminal window */
.window {
  position: relative;
  border: 1px solid var(--border-strong);
  border-radius: var(--radius-md);
  background: var(--bg-elevated);
  box-shadow: 0 24px 50px -24px rgba(0, 0, 0, 0.6);
  overflow: hidden;
}

.titlebar {
  display: flex;
  align-items: center;
  gap: 7px;
  padding: 10px 12px;
  background: var(--bg-subtle);
  border-bottom: 1px solid var(--border);
}

.dot {
  width: 11px;
  height: 11px;
  border-radius: 50%;
  background: var(--border-strong);
}

.dot:nth-child(1) {
  background: #ff5f56;
}
.dot:nth-child(2) {
  background: #ffbd2e;
}
.dot:nth-child(3) {
  background: #27c93f;
}

.fname {
  margin-left: auto;
  color: var(--text-muted);
  font-size: var(--fz-xxs);
  letter-spacing: 0.02em;
}

.screen {
  position: relative;
  aspect-ratio: 1;
}

img,
.initials {
  width: 100%;
  height: 100%;
}

img {
  object-fit: cover;
  filter: brightness(0.85) contrast(1.03) saturate(0.98);
  transition: filter var(--duration) var(--ease);
}

.photo-wrap:hover img {
  filter: brightness(0.95) contrast(1.03) saturate(1);
}

.initials {
  display: grid;
  place-items: center;
  background: var(--bg-elevated);
  color: var(--accent);
  font-size: calc(var(--size) * 0.3);
  font-weight: 700;
  letter-spacing: -0.02em;
}

/* L-shaped accent corner brackets around the frame */
.corner {
  position: absolute;
  width: 18px;
  height: 18px;
  border: 2px solid var(--accent);
  z-index: 1;
  transition: all var(--duration) var(--ease);
}

.corner.tl {
  top: -7px;
  left: -7px;
  border-right: none;
  border-bottom: none;
}
.corner.tr {
  top: -7px;
  right: -7px;
  border-left: none;
  border-bottom: none;
}
.corner.bl {
  bottom: -7px;
  left: -7px;
  border-right: none;
  border-top: none;
}
.corner.br {
  bottom: -7px;
  right: -7px;
  border-left: none;
  border-top: none;
}

.photo-wrap:hover .corner.tl {
  top: -11px;
  left: -11px;
}
.photo-wrap:hover .corner.tr {
  top: -11px;
  right: -11px;
}
.photo-wrap:hover .corner.bl {
  bottom: -11px;
  left: -11px;
}
.photo-wrap:hover .corner.br {
  bottom: -11px;
  right: -11px;
}

@media (prefers-reduced-motion: reduce) {
  .photo-wrap {
    animation: none;
  }
}
</style>
