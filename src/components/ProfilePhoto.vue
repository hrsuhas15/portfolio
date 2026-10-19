<script setup>
import { profile } from '../data/profile'

defineProps({
  size: { type: String, default: '280px' },
})

const src = profile.photo ? import.meta.env.BASE_URL + profile.photo : null
</script>

<template>
  <div class="photo" :style="{ '--size': size }">
    <img v-if="src" :src="src" :alt="`Portrait of ${profile.name}`" width="600" height="600" />
    <span v-else class="initials" role="img" :aria-label="profile.name">{{ profile.initials }}</span>
  </div>
</template>

<style scoped>
/* Square photo with an offset accent frame, as in the reference design */
.photo {
  position: relative;
  width: var(--size);
  max-width: 100%;
  aspect-ratio: 1;
  isolation: isolate;
}

.photo::after {
  content: '';
  position: absolute;
  inset: 0;
  z-index: -1;
  border: 2px solid var(--accent);
  border-radius: var(--radius-md);
  transform: translate(14px, 14px);
  transition: var(--transition);
}

.photo:hover::after {
  transform: translate(8px, 8px);
}

img,
.initials {
  width: 100%;
  height: 100%;
  border-radius: var(--radius-md);
}

img {
  object-fit: cover;
}

.initials {
  display: grid;
  place-items: center;
  background: var(--bg-elevated);
  border: 1px solid var(--border-strong);
  color: var(--accent);
  font-size: calc(var(--size) * 0.3);
  font-weight: 700;
  letter-spacing: -0.02em;
}
</style>
