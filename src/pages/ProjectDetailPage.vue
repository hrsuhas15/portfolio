<script setup>
import { computed } from 'vue'
import { ArrowLeft, ArrowRight } from 'lucide-vue-next'
import ProjectCard from '../components/ProjectCard.vue'
import { getProjectBySlug, getAdjacentProjects, getRelatedProjects } from '../data/projects'

const props = defineProps({
  slug: { type: String, required: true },
})

const project = computed(() => getProjectBySlug(props.slug))
const adjacent = computed(() => getAdjacentProjects(props.slug))
const related = computed(() => (project.value ? getRelatedProjects(project.value) : []))
</script>

<template>
  <article v-if="project" class="section container case-study">
    <RouterLink to="/projects" class="back mono"><ArrowLeft :size="14" aria-hidden="true" /> All projects</RouterLink>

    <header class="header anim-fade-up">
      <p class="mono overline">{{ project.category }}<template v-if="project.context"> · {{ project.context }}</template></p>
      <h1>{{ project.title }}</h1>
      <p class="subtitle">{{ project.subtitle }}</p>
      <ul class="tags" aria-label="Technologies">
        <li v-for="tag in project.tags" :key="tag" class="tag">{{ tag }}</li>
      </ul>
    </header>

    <section v-reveal class="cs-section" aria-labelledby="overview">
      <h2 id="overview">Project overview</h2>
      <p>{{ project.summary }}</p>
    </section>

    <dl v-reveal class="facts">
      <div>
        <dt class="mono">Problem</dt>
        <dd>{{ project.problem }}</dd>
      </div>
      <div>
        <dt class="mono">Outcome</dt>
        <dd>{{ project.outcome }}</dd>
      </div>
    </dl>

    <section v-if="related.length" class="related" aria-labelledby="related">
      <h2 id="related">Related projects</h2>
      <ul class="grid">
        <li v-for="item in related" :key="item.slug"><ProjectCard :project="item" /></li>
      </ul>
    </section>

    <nav class="pager" aria-label="Project navigation">
      <RouterLink v-if="adjacent.previous" v-tilt="{ max: 5 }" :to="`/projects/${adjacent.previous.slug}`" class="pager-link prev">
        <span class="mono"><ArrowLeft :size="14" aria-hidden="true" /> Previous</span>
        {{ adjacent.previous.title }}
      </RouterLink>
      <RouterLink v-if="adjacent.next" v-tilt="{ max: 5 }" :to="`/projects/${adjacent.next.slug}`" class="pager-link next">
        <span class="mono">Next <ArrowRight :size="14" aria-hidden="true" /></span>
        {{ adjacent.next.title }}
      </RouterLink>
    </nav>
  </article>

  <div v-else class="section container not-found">
    <p class="mono overline">404</p>
    <h1>Project not found</h1>
    <p>There's no case study at this address. It may have been renamed.</p>
    <RouterLink to="/projects" class="btn">Browse all projects</RouterLink>
  </div>
</template>

<style scoped>
.case-study {
  max-width: calc(820px + 2 * var(--gutter));
}

.back {
  display: inline-flex;
  align-items: center;
  gap: var(--space-1);
  font-size: var(--fz-xs);
}

.header {
  margin-top: var(--space-5);
}

.overline {
  color: var(--accent);
  font-size: var(--fz-xs);
}

h1 {
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 700;
  line-height: var(--lh-tight);
}

.subtitle {
  color: var(--text-muted);
  font-size: var(--fz-xl);
}

.facts {
  display: grid;
  gap: var(--space-4);
  margin: var(--space-6) 0;
  padding: var(--space-5);
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
}

@media (min-width: 700px) {
  .facts {
    grid-template-columns: 1fr 1fr;
  }
}

dt.mono {
  color: var(--accent);
  font-size: var(--fz-xs);
  margin-bottom: var(--space-1);
}

dd {
  margin: 0;
  font-size: var(--fz-md);
}

.legend {
  display: flex;
  gap: var(--space-3);
  padding: var(--space-4);
  border-radius: var(--radius-md);
  background: var(--warning-tint);
  color: var(--text);
  font-size: var(--fz-sm);
}

.legend svg {
  flex-shrink: 0;
  margin-top: 3px;
  color: var(--warning);
}

.legend p {
  margin: 0;
}

.badge {
  display: inline-block;
  padding: 0 var(--space-2);
  border: 1px solid var(--warning);
  border-radius: var(--radius-sm);
  color: var(--warning);
  font-size: var(--fz-xxs);
  white-space: nowrap;
}

.toc {
  margin: var(--space-6) 0;
  font-size: var(--fz-sm);
}

.toc p {
  color: var(--text-muted);
  font-size: var(--fz-xs);
  margin-bottom: var(--space-2);
}

.toc ol {
  padding-left: var(--space-5);
  columns: 2 220px;
}

.toc li {
  margin-bottom: var(--space-1);
}

.cs-section {
  margin-top: var(--space-7);
}

.cs-section h2 {
  font-size: var(--fz-2xl);
}

.cs-section > .badge {
  margin-bottom: var(--space-4);
}

.cs-section.context {
  padding-left: var(--space-5);
  border-left: 2px solid var(--warning);
}

.note {
  color: var(--text-muted);
  font-size: var(--fz-sm);
  font-style: italic;
}

.items div {
  margin-bottom: var(--space-4);
}

.items dt {
  color: var(--text-strong);
  font-weight: 600;
}

.related {
  margin-top: var(--space-8);
  padding-top: var(--space-6);
  border-top: 1px solid var(--border);
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 260px), 1fr));
  gap: var(--space-5);
  list-style: none;
  padding: 0;
}

.pager {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-4);
  margin-top: var(--space-7);
}

.pager-link {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
  padding: var(--space-4);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  color: var(--text-strong);
  font-size: var(--fz-sm);
  font-weight: 600;
}

.pager-link:hover {
  border-color: var(--accent);
  text-decoration: none;
}

.pager-link .mono {
  display: inline-flex;
  align-items: center;
  gap: var(--space-1);
  color: var(--accent);
  font-size: var(--fz-xxs);
  font-weight: 400;
}

.next {
  grid-column: 2;
  text-align: right;
  align-items: flex-end;
}

@media (max-width: 520px) {
  .pager {
    grid-template-columns: 1fr;
  }

  .next {
    grid-column: 1;
  }
}

.not-found {
  text-align: center;
}
</style>
