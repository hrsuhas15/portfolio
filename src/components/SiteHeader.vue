<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'
import { useRoute } from 'vue-router'
import { Menu, X, Sun, Moon } from 'lucide-vue-next'
import { useTheme } from '../composables/useTheme'
import { profile } from '../data/profile'

const navLinks = [
  { label: 'About', to: '/about' },
  { label: 'Experience', to: { path: '/', hash: '#experience' } },
  { label: 'Projects', to: '/projects' },
  { label: 'Contact', to: { path: '/', hash: '#contact' } },
]

const resumeUrl = import.meta.env.BASE_URL + profile.resumePath
const { theme, toggleTheme } = useTheme()
const menuOpen = ref(false)
const scrolled = ref(false)
const route = useRoute()

watch(() => route.fullPath, () => (menuOpen.value = false))
watch(menuOpen, (open) => document.body.classList.toggle('no-scroll', open))

// Router's exact-active class ignores the #hash, so mark the current page explicitly.
function isCurrent(link) {
  if (typeof link.to === 'string') return route.path === link.to || route.path.startsWith(link.to + '/')
  return route.path === link.to.path && route.hash === link.to.hash
}

function onKeydown(event) {
  if (event.key === 'Escape') menuOpen.value = false
}
function onScroll() {
  scrolled.value = window.scrollY > 8
}

onMounted(() => {
  window.addEventListener('keydown', onKeydown)
  window.addEventListener('scroll', onScroll, { passive: true })
})
onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeydown)
  window.removeEventListener('scroll', onScroll)
})
</script>

<template>
  <header class="site-header" :class="{ scrolled }">
    <div class="container header-inner">
      <RouterLink to="/" class="logo" aria-label="Suhas H R — home">
        <svg viewBox="0 0 64 64" width="40" height="40" aria-hidden="true">
          <polygon points="32,4 56,18 56,46 32,60 8,46 8,18" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linejoin="round" />
          <text x="32" y="42" text-anchor="middle" font-size="26" font-weight="700" fill="currentColor">S</text>
        </svg>
      </RouterLink>

      <nav id="site-nav" class="nav" :class="{ open: menuOpen }" aria-label="Main">
        <ol>
          <li v-for="link in navLinks" :key="link.label">
            <RouterLink
              :to="link.to"
              class="nav-link"
              :class="{ current: isCurrent(link) }"
              :aria-current="isCurrent(link) ? 'page' : undefined"
              active-class=""
              exact-active-class=""
            >
              {{ link.label }}
            </RouterLink>
          </li>
        </ol>
        <a :href="resumeUrl" class="btn btn-sm" target="_blank" rel="noopener">Resume</a>
      </nav>

      <div class="header-actions">
        <button
          type="button"
          class="icon-btn"
          :aria-label="theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'"
          @click="toggleTheme"
        >
          <Sun v-if="theme === 'dark'" :size="20" aria-hidden="true" />
          <Moon v-else :size="20" aria-hidden="true" />
        </button>
        <button
          type="button"
          class="icon-btn menu-btn"
          :aria-expanded="menuOpen"
          aria-controls="site-nav"
          :aria-label="menuOpen ? 'Close menu' : 'Open menu'"
          @click="menuOpen = !menuOpen"
        >
          <X v-if="menuOpen" :size="24" aria-hidden="true" />
          <Menu v-else :size="24" aria-hidden="true" />
        </button>
      </div>
    </div>
    <div v-if="menuOpen" class="backdrop" aria-hidden="true" @click="menuOpen = false"></div>
  </header>
</template>

<style scoped>
.site-header {
  position: fixed;
  inset: 0 0 auto;
  z-index: 50;
  height: var(--header-height);
  background: var(--header-bg);
  backdrop-filter: blur(10px);
  transition: box-shadow var(--duration) var(--ease);
}

.site-header.scrolled {
  box-shadow: var(--shadow);
}

.header-inner {
  display: flex;
  align-items: center;
  height: 100%;
  max-width: none;
  gap: var(--space-4);
}

.logo {
  color: var(--accent);
  margin-right: auto;
}

.logo:hover {
  text-decoration: none;
  opacity: 0.85;
}

.nav ol {
  display: flex;
  gap: var(--space-2);
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-link {
  position: relative;
  display: inline-block;
  padding: var(--space-2) var(--space-3);
  color: var(--text-strong);
  font-size: var(--fz-sm);
  font-weight: 500;
}

.nav-link:hover,
.nav-link.current {
  color: var(--accent);
  text-decoration: none;
}

/* Underline marks the current page */
.nav-link.current::after {
  content: '';
  position: absolute;
  left: var(--space-3);
  right: var(--space-3);
  bottom: 2px;
  height: 2px;
  border-radius: 2px;
  background: var(--accent);
}

.backdrop {
  position: fixed;
  inset: var(--header-height) 0 0;
  z-index: -1;
  background: rgba(0, 0, 0, 0.55);
}

.header-actions {
  display: flex;
  align-items: center;
  gap: var(--space-1);
}

.icon-btn {
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  padding: 0;
  border: none;
  border-radius: var(--radius-sm);
  background: transparent;
  color: var(--accent);
}

.icon-btn:hover {
  background: var(--accent-tint);
}

/* Mobile: nav becomes a full-height drawer */
@media (max-width: 767px) {
  .nav {
    position: fixed;
    inset: var(--header-height) 0 0 auto;
    width: min(80vw, 320px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: var(--space-6);
    background: var(--bg-elevated);
    box-shadow: var(--shadow);
    transform: translateX(100%);
    visibility: hidden;
    transition: transform var(--duration) var(--ease), visibility var(--duration);
  }

  .nav.open {
    transform: none;
    visibility: visible;
  }

  .nav ol {
    flex-direction: column;
    align-items: center;
    gap: var(--space-4);
  }

  .nav-link {
    font-size: var(--fz-lg);
    text-align: center;
  }
}

@media (min-width: 768px) {
  .backdrop {
    display: none;
  }
}

@media (min-width: 768px) {
  .menu-btn {
    display: none;
  }

  .nav {
    display: flex;
    align-items: center;
    gap: var(--space-4);
  }
}
</style>
