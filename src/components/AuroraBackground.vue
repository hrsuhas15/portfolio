<script setup>
// Decorative animated backdrop: slowly drifting accent-colored glows plus a
// faint grid. Purely cosmetic and aria-hidden. Frozen under reduced motion.
</script>

<template>
  <div class="aurora" aria-hidden="true">
    <div class="grid-lines"></div>
    <span class="blob blob-1"></span>
    <span class="blob blob-2"></span>
    <span class="blob blob-3"></span>
    <div class="noise"></div>
  </div>
</template>

<style scoped>
.aurora {
  position: fixed;
  inset: 0;
  z-index: -1;
  overflow: hidden;
  pointer-events: none;
}

/* Subtle perspective grid that fades toward the top */
.grid-lines {
  position: absolute;
  inset: -2px;
  background-image:
    linear-gradient(to right, var(--border) 1px, transparent 1px),
    linear-gradient(to bottom, var(--border) 1px, transparent 1px);
  background-size: 54px 54px;
  opacity: 0.35;
  mask-image: radial-gradient(ellipse 80% 60% at 50% 0%, #000 10%, transparent 75%);
  -webkit-mask-image: radial-gradient(ellipse 80% 60% at 50% 0%, #000 10%, transparent 75%);
}

.blob {
  position: absolute;
  width: 46vw;
  height: 46vw;
  max-width: 640px;
  max-height: 640px;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.5;
  will-change: transform;
}

.blob-1 {
  top: -14vh;
  left: -8vw;
  background: radial-gradient(circle at 30% 30%, var(--accent), transparent 68%);
  animation: drift-1 22s ease-in-out infinite;
}

.blob-2 {
  top: 24vh;
  right: -12vw;
  background: radial-gradient(circle at 60% 40%, #7c93ff, transparent 68%);
  opacity: 0.35;
  animation: drift-2 27s ease-in-out infinite;
}

.blob-3 {
  bottom: -18vh;
  left: 28vw;
  background: radial-gradient(circle at 50% 50%, var(--accent), transparent 70%);
  opacity: 0.28;
  animation: drift-3 31s ease-in-out infinite;
}

/* Very light film grain so the gradients never band */
.noise {
  position: absolute;
  inset: 0;
  opacity: 0.025;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
}

@keyframes drift-1 {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(8vw, 6vh) scale(1.12); }
  66% { transform: translate(-4vw, 10vh) scale(0.95); }
}

@keyframes drift-2 {
  0%, 100% { transform: translate(0, 0) scale(1); }
  50% { transform: translate(-10vw, 8vh) scale(1.15); }
}

@keyframes drift-3 {
  0%, 100% { transform: translate(0, 0) scale(1); }
  40% { transform: translate(10vw, -8vh) scale(1.1); }
  70% { transform: translate(-6vw, -4vh) scale(0.9); }
}

@media (prefers-reduced-motion: reduce) {
  .blob {
    animation: none !important;
  }
}
</style>
