<script setup>
import { experience } from '../data/experience'
import { getProjectBySlug } from '../data/projects'

defineProps({
  // Compact mode shows the first few highlights only (used on the home page).
  compact: { type: Boolean, default: false },
})
</script>

<template>
  <ol class="timeline">
    <li v-for="job in experience" :key="job.id" class="item">
      <p class="mono dates">{{ job.start }} — {{ job.end }}</p>
      <h3>
        {{ job.role }} <span class="company">@ {{ job.company }}</span>
      </h3>
      <p class="location">{{ job.location }}</p>
      <ul class="styled-list">
        <li v-for="item in compact ? job.highlights.slice(0, 4) : job.highlights" :key="item">{{ item }}</li>
      </ul>

      <template v-if="!compact">
        <h4 class="sub">Platform capabilities delivered</h4>
        <ul class="tags">
          <li v-for="cap in job.capabilities" :key="cap" class="tag">{{ cap }}</li>
        </ul>
        <h4 class="sub">Technologies</h4>
        <ul class="tags">
          <li v-for="tech in job.technologies" :key="tech" class="tag">{{ tech }}</li>
        </ul>
      </template>

      <p class="case-studies">
        <span class="mono">Case studies:</span>
        <template v-for="(slug, i) in job.projectSlugs" :key="slug">
          <RouterLink :to="`/projects/${slug}`">{{ getProjectBySlug(slug)?.title }}</RouterLink><span v-if="i < job.projectSlugs.length - 1">, </span>
        </template>
      </p>
    </li>
  </ol>
</template>

<style scoped>
.timeline {
  list-style: none;
  padding: 0;
  margin: 0;
}

.item {
  position: relative;
  padding-left: var(--space-6);
  border-left: 2px solid var(--border);
}

.item::before {
  content: '';
  position: absolute;
  left: -7px;
  top: 6px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--bg);
  border: 2px solid var(--accent);
}

.dates {
  margin-bottom: var(--space-2);
  color: var(--accent);
  font-size: var(--fz-xs);
}

h3 {
  font-size: var(--fz-xl);
  margin-bottom: var(--space-1);
}

.company {
  color: var(--accent);
}

.location {
  color: var(--text-muted);
  font-size: var(--fz-sm);
}

.styled-list {
  font-size: var(--fz-md);
}

.sub {
  margin-top: var(--space-5);
  font-size: var(--fz-sm);
  font-family: var(--font-mono);
  font-weight: 400;
  color: var(--text-muted);
}

.case-studies {
  margin-top: var(--space-5);
  font-size: var(--fz-sm);
}

.case-studies .mono {
  color: var(--text-muted);
  margin-right: var(--space-2);
}
</style>
