<script setup>
import SiteHeader from './components/SiteHeader.vue'
import SiteFooter from './components/SiteFooter.vue'
import AuroraBackground from './components/AuroraBackground.vue'
</script>

<template>
  <a class="skip-link" href="#main">Skip to content</a>
  <AuroraBackground />
  <SiteHeader />
  <main id="main" tabindex="-1">
    <RouterView v-slot="{ Component }">
      <Transition name="route" mode="out-in">
        <component :is="Component" />
      </Transition>
    </RouterView>
  </main>
  <SiteFooter />
</template>

<style>
.skip-link {
  position: absolute;
  top: -100px;
  left: var(--space-4);
  z-index: 100;
  padding: var(--space-3) var(--space-4);
  background: var(--accent);
  color: var(--accent-contrast);
  border-radius: var(--radius-sm);
  font-family: var(--font-mono);
  font-size: var(--fz-sm);
}

.skip-link:focus {
  top: var(--space-4);
}

main {
  min-height: 70vh;
  padding-top: var(--header-height);
}

main:focus {
  outline: none;
}
</style>
