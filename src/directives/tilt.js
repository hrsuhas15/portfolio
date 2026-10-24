// v-tilt: real 3D perspective tilt that follows the cursor, with a moving glare
// highlight. Pointer-driven only (no tilt on touch), and disabled under
// prefers-reduced-motion.
//
// Usage:
//   v-tilt                       default (max 8deg)
//   v-tilt="{ max: 12, glare: true, scale: 1.03 }"
//
// The element gets CSS custom properties the stylesheet can read:
//   --tilt-rx, --tilt-ry  (rotation in deg)
//   --tilt-mx, --tilt-my  (pointer position 0–100%, for the glare)
//   --tilt-active         (0 or 1)

const prefersReducedMotion =
  typeof window !== 'undefined' &&
  window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

const canHover =
  typeof window !== 'undefined' &&
  window.matchMedia &&
  window.matchMedia('(hover: hover) and (pointer: fine)').matches

export const tilt = {
  mounted(el, binding) {
    if (prefersReducedMotion || !canHover) return

    const opts = binding.value || {}
    const max = opts.max ?? 8
    const scale = opts.scale ?? 1.0
    const glare = opts.glare ?? false

    el.classList.add('tilt')
    if (glare) el.classList.add('tilt-glare')
    el.style.setProperty('--tilt-scale', scale)

    let frame = null

    function onMove(e) {
      const rect = el.getBoundingClientRect()
      const px = (e.clientX - rect.left) / rect.width // 0..1
      const py = (e.clientY - rect.top) / rect.height // 0..1
      const ry = (px - 0.5) * 2 * max // left/right
      const rx = (0.5 - py) * 2 * max // up/down

      if (frame) cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        el.style.setProperty('--tilt-rx', `${rx.toFixed(2)}deg`)
        el.style.setProperty('--tilt-ry', `${ry.toFixed(2)}deg`)
        el.style.setProperty('--tilt-mx', `${(px * 100).toFixed(1)}%`)
        el.style.setProperty('--tilt-my', `${(py * 100).toFixed(1)}%`)
      })
    }

    function onEnter() {
      el.style.setProperty('--tilt-active', '1')
    }

    function onLeave() {
      if (frame) cancelAnimationFrame(frame)
      el.style.setProperty('--tilt-active', '0')
      el.style.setProperty('--tilt-rx', '0deg')
      el.style.setProperty('--tilt-ry', '0deg')
    }

    el.addEventListener('pointerenter', onEnter)
    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerleave', onLeave)
    el._tiltCleanup = () => {
      el.removeEventListener('pointerenter', onEnter)
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', onLeave)
      if (frame) cancelAnimationFrame(frame)
    }
  },
  unmounted(el) {
    if (el._tiltCleanup) el._tiltCleanup()
  },
}
