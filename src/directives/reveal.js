// v-reveal: fade/slide an element into view the first time it enters the viewport.
//
// Usage:
//   v-reveal                     default fade-up
//   v-reveal="{ y: 40 }"         custom travel distance (px)
//   v-reveal:left                slide in from the left
//   v-reveal="{ delay: 120 }"    per-element delay (ms)
//   v-reveal.stagger             reveal direct children one after another
//
// Honors prefers-reduced-motion: elements show immediately with no motion.

const prefersReducedMotion =
  typeof window !== 'undefined' &&
  window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

const DIRECTIONS = {
  up: { x: 0, y: 28 },
  down: { x: 0, y: -28 },
  left: { x: 36, y: 0 },
  right: { x: -36, y: 0 },
}

let observer = null
function getObserver() {
  if (observer) return observer
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed')
          observer.unobserve(entry.target)
        }
      }
    },
    { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
  )
  return observer
}

function prime(el, { x, y, duration, delay }) {
  el.style.setProperty('--reveal-x', `${x}px`)
  el.style.setProperty('--reveal-y', `${y}px`)
  el.style.setProperty('--reveal-duration', `${duration}ms`)
  el.style.setProperty('--reveal-delay', `${delay}ms`)
  el.classList.add('reveal')
}

export const reveal = {
  mounted(el, binding) {
    const opts = typeof binding.value === 'object' && binding.value ? binding.value : {}
    const dir = DIRECTIONS[binding.arg] || DIRECTIONS.up
    const base = {
      x: opts.x ?? dir.x,
      y: opts.y ?? dir.y,
      duration: opts.duration ?? 650,
      delay: opts.delay ?? 0,
    }

    if (prefersReducedMotion) {
      el.classList.add('is-revealed')
      if (binding.modifiers.stagger) {
        Array.from(el.children).forEach((c) => c.classList.add('is-revealed'))
      }
      return
    }

    if (binding.modifiers.stagger) {
      const step = opts.step ?? 90
      Array.from(el.children).forEach((child, i) => {
        prime(child, { ...base, delay: base.delay + i * step })
        getObserver().observe(child)
      })
    } else {
      prime(el, base)
      getObserver().observe(el)
    }
  },
  unmounted(el) {
    if (!observer) return
    observer.unobserve(el)
    Array.from(el.children).forEach((c) => observer.unobserve(c))
  },
}
