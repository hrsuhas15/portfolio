<script setup>
defineProps({
  id: { type: String, default: undefined },
  level: { type: Number, default: 2 },
})
</script>

<template>
  <component :is="`h${level}`" :id="id" class="section-heading">
    <slot />
  </component>
</template>

<style scoped>
.section-heading {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  margin-bottom: var(--space-6);
  font-size: var(--fz-heading);
  white-space: nowrap;
}

.section-heading::after {
  content: '';
  flex: 1;
  max-width: 300px;
  height: 1px;
  background: var(--border);
}

@media (max-width: 480px) {
  .section-heading {
    white-space: normal;
  }

  .section-heading::after {
    display: none;
  }
}
</style>
