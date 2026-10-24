<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'
import { useRoute } from 'vue-router'
import { Menu, X, Sun, Moon } from 'lucide-vue-next'
import { useTheme } from '../composables/useTheme'
import { profile } from '../data/profile'

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Experience', to: { path: '/about', hash: '#experience' } },
  { label: 'Projects', to: '/projects' },
  { label: 'Contact', to: { path: '/', hash: '#contact' } },
]

const resumeUrl = import.meta.env.BASE_URL + profile.resumePath
const { theme, toggleTheme } = useTheme()
const menuOpen = ref(false)
const scrolled = ref(false)
const progress = ref(0)
const isMobile = ref(false)
const route = useRoute()

// On mobile the nav is teleported to <body> so the full-screen overlay can't be
// trapped (or click-blocked) by the header's stacking context.
let mq = null
function onMqChange(e) {
  isMobile.value = e.matches
  if (!e.matches) menuOpen.value = false
}

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
  const doc = document.documentElement
  const max = doc.scrollHeight - doc.clientHeight
  progress.value = max > 0 ? Math.min(1, window.scrollY / max) : 0
}

onMounted(() => {
  window.addEventListener('keydown', onKeydown)
  window.addEventListener('scroll', onScroll, { passive: true })
  mq = window.matchMedia('(max-width: 767px)')
  isMobile.value = mq.matches
  mq.addEventListener('change', onMqChange)
})
onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeydown)
  window.removeEventListener('scroll', onScroll)
  if (mq) mq.removeEventListener('change', onMqChange)
  document.body.classList.remove('no-scroll')
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

      <Teleport to="body" :disabled="!isMobile">
        <nav
          id="site-nav"
          class="nav"
          :class="{ open: menuOpen, 'nav-mobile': isMobile }"
          aria-label="Main"
        >
          <ol>
            <li v-for="link in navLinks" :key="link.label">
              <RouterLink
                :to="link.to"
                class="nav-link"
                :class="{ current: isCurrent(link) }"
                :aria-current="isCurrent(link) ? 'page' : undefined"
                active-class=""
                exact-active-class=""
                @click="menuOpen = false"
              >
                {{ link.label }}
              </RouterLink>
            </li>
          </ol>
          <a :href="resumeUrl" class="btn btn-sm" target="_blank" rel="noopener">Download Resume</a>
        </nav>
      </Teleport>

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
    <div class="scroll-progress" :style="{ transform: `scaleX(${progress})` }" aria-hidden="true"></div>
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

/* Reading-progress bar pinned to the bottom edge of the header */
.scroll-progress {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 2px;
  transform-origin: left;
  transform: scaleX(0);
  background: linear-gradient(90deg, var(--accent), #7c93ff);
  will-change: transform;
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
  counter-reset: nav;
}

.nav ol li {
  counter-increment: nav;
}

.nav-link {
  position: relative;
  display: inline-block;
  padding: var(--space-2) var(--space-3);
  color: var(--text-strong);
  font-size: var(--fz-sm);
  font-weight: 500;
}

/* Monospace index prefix, e.g. "01." — a classic dev-portfolio touch */
.nav-link::before {
  content: counter(nav, decimal-leading-zero) '.';
  margin-right: 5px;
  color: var(--accent);
  font-family: var(--font-mono);
  font-size: 0.78em;
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
  z-index: 40;
  background: rgba(0, 0, 0, 0.55);
  backdrop-filter: blur(2px);
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

/* Mobile: nav becomes a full-screen overlay */
@media (max-width: 767px) {
  .nav {
    position: fixed;
    inset: var(--header-height) 0 0 0;
    z-index: 100;
    width: 100vw;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: center;
    gap: var(--space-5);
    padding: var(--space-6);
    overflow-y: auto;
    overscroll-behavior: contain;
    background: var(--bg);
    opacity: 0;
    visibility: hidden;
    transform: translateY(-10px);
    transition: opacity var(--duration) var(--ease), transform var(--duration) var(--ease),
      visibility var(--duration);
  }

  .nav.open {
    opacity: 1;
    visibility: visible;
    transform: none;
  }

  .nav ol {
    flex-direction: column;
    align-items: stretch;
    width: 100%;
    gap: var(--space-3);
  }

  .nav ol li {
    width: 100%;
  }

  .nav-link {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    width: 100%;
    padding: var(--space-4) var(--space-5);
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
    background: var(--bg-elevated);
    font-size: var(--fz-xl);
    font-weight: 600;
  }

  .nav-link::before {
    font-size: 0.9em;
  }

  .nav-link:hover,
  .nav-link.current {
    border-color: var(--accent);
    background: var(--accent-tint);
  }

  /* The underline marker is awkward on big rows; the tint/border is clearer */
  .nav-link.current::after {
    display: none;
  }

  .nav .btn {
    width: 100%;
    margin-top: var(--space-4);
    min-height: 54px;
    font-size: var(--fz-md);
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
