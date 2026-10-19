import { ref } from 'vue'

const STORAGE_KEY = 'theme'
const THEME_COLORS = { dark: '#050b14', light: '#f8fafc' }

// index.html sets data-theme before first paint; read it back as the initial value.
const theme = ref(document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark')

function apply(value) {
  document.documentElement.setAttribute('data-theme', value)
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', THEME_COLORS[value])
}

export function useTheme() {
  function toggleTheme() {
    theme.value = theme.value === 'dark' ? 'light' : 'dark'
    apply(theme.value)
    try {
      localStorage.setItem(STORAGE_KEY, theme.value)
    } catch {
      // Storage can be unavailable (private mode); the theme still applies for this visit.
    }
  }

  return { theme, toggleTheme }
}
