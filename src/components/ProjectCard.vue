<script setup>
import { ArrowRight } from 'lucide-vue-next'

defineProps({
  project: { type: Object, required: true },
})
</script>

<template>
  <article class="card">
    <p class="mono meta">{{ project.category }}<template v-if="project.context"> · {{ project.context }}</template></p>
    <h3>
      <RouterLink :to="`/projects/${project.slug}`" class="title-link">{{ project.title }}</RouterLink>
    </h3>
    <p class="summary">{{ project.problem }}</p>
    <p class="outcome"><strong>Outcome:</strong> {{ project.outcome }}</p>
    <ul class="tags" aria-label="Technologies">
      <li v-for="tag in project.tags" :key="tag" class="tag">{{ tag }}</li>
    </ul>
    <span class="read-more mono" aria-hidden="true">Read case study <ArrowRight :size="14" /></span>
  </article>
</template>

<style scoped>
.card {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: var(--space-5);
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  transition: var(--transition);
}

.card:hover,
.card:focus-within {
  transform: translateY(-4px);
  border-color: var(--accent);
  box-shadow: var(--shadow);
}

.meta {
  margin-bottom: var(--space-2);
  color: var(--accent);
  font-size: var(--fz-xxs);
}

h3 {
  font-size: var(--fz-xl);
}

/* Whole card is clickable via the stretched title link */
.title-link {
  color: var(--text-strong);
}

.title-link::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
}

.title-link:hover {
  text-decoration: none;
}

.summary,
.outcome {
  font-size: var(--fz-md);
}

.outcome {
  color: var(--text-muted);
}

.outcome strong {
  color: var(--text);
  font-weight: 600;
}

.read-more {
  display: inline-flex;
  align-items: center;
  gap: var(--space-1);
  margin-top: auto;
  padding-top: var(--space-4);
  color: var(--accent);
  font-size: var(--fz-xs);
}
</style>
