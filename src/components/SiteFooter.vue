<script setup>
import ContactLinks from './ContactLinks.vue'
import { profile } from '../data/profile'
</script>

<template>
  <footer class="site-footer">
    <div class="container footer-inner">
      <ContactLinks />
      <p class="mono">Designed &amp; built by {{ profile.name }} · Vue 3 + Vite</p>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  padding-block: var(--space-7);
  border-top: 1px solid var(--border);
}

.footer-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-4);
  text-align: center;
}

p {
  margin: 0;
  font-size: var(--fz-xxs);
  color: var(--text-muted);
}
</style>
