<script setup>
import { skillGroups } from '../data/skills'
</script>

<template>
  <div class="skills">
    <section v-for="group in skillGroups" :key="group.id" class="group" :aria-labelledby="`skills-${group.id}`">
      <h3 :id="`skills-${group.id}`" class="mono">{{ group.title }}</h3>
      <ul class="styled-list">
        <li v-for="item in group.items" :key="item">{{ item }}</li>
      </ul>
    </section>
  </div>
</template>

<style scoped>
.skills {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 180px), 1fr));
  gap: var(--space-5);
}

.group {
  padding: var(--space-4) var(--space-5);
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  transition: border-color var(--duration) var(--ease), transform var(--duration) var(--ease),
    box-shadow var(--duration) var(--ease);
}

.group:hover {
  border-color: var(--accent);
  transform: translateY(-4px);
  box-shadow: 0 14px 34px -22px rgba(0, 0, 0, 0.85);
}

h3 {
  font-size: var(--fz-sm);
  font-weight: 400;
  color: var(--accent);
}

.styled-list {
  font-size: var(--fz-sm);
}

.styled-list li {
  margin-bottom: var(--space-2);
}
</style>
