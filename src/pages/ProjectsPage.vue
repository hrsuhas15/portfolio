<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Search } from 'lucide-vue-next'
import SectionHeading from '../components/SectionHeading.vue'
import ProjectCard from '../components/ProjectCard.vue'
import { projects, projectCategories } from '../data/projects'

const route = useRoute()
const router = useRouter()

// Search and category live in the URL so filtered views can be shared and survive refresh.
const query = computed({
  get: () => String(route.query.q ?? ''),
  set: (q) => router.replace({ query: { ...route.query, q: q || undefined } }),
})
const category = computed({
  get: () => String(route.query.category ?? ''),
  set: (c) => router.replace({ query: { ...route.query, category: c || undefined } }),
})

const filtered = computed(() => {
  const q = query.value.trim().toLowerCase()
  return projects.filter((p) => {
    if (category.value && p.category !== category.value) return false
    if (!q) return true
    return [p.title, p.summary, p.category, ...p.tags].some((text) => text.toLowerCase().includes(q))
  })
})

const featured = projects.filter((p) => p.featured)
const isFiltering = computed(() => Boolean(query.value || category.value))

function reset() {
  router.replace({ query: {} })
}
</script>

<template>
  <div class="section container">
    <header class="page-header">
      <p class="mono overline">Projects</p>
      <h1>Things I've built and led</h1>
      <p class="lead">
        Case studies from my professional and academic work. Each one separates what I delivered from general
        technical context.
      </p>
    </header>

    <div class="controls" role="search">
      <label class="search">
        <span class="visually-hidden">Search projects by name or technology</span>
        <Search :size="18" aria-hidden="true" />
        <input v-model="query" type="search" placeholder="Search by name or technology…" />
      </label>
      <div class="chips" role="group" aria-label="Filter by category">
        <button type="button" class="chip" :aria-pressed="!category" @click="category = ''">All</button>
        <button
          v-for="cat in projectCategories"
          :key="cat"
          type="button"
          class="chip"
          :aria-pressed="category === cat"
          @click="category = category === cat ? '' : cat"
        >
          {{ cat }}
        </button>
      </div>
    </div>

    <section v-if="!isFiltering" aria-labelledby="featured" class="block">
      <SectionHeading id="featured">Featured</SectionHeading>
      <ul class="grid">
        <li v-for="project in featured" :key="project.slug"><ProjectCard :project="project" /></li>
      </ul>
    </section>

    <section aria-labelledby="all-projects" class="block">
      <SectionHeading id="all-projects">
        {{ isFiltering ? 'Results' : 'All projects' }}
      </SectionHeading>
      <p class="mono count" aria-live="polite">{{ filtered.length }} of {{ projects.length }} projects</p>
      <ul v-if="filtered.length" class="grid">
        <li v-for="project in filtered" :key="project.slug"><ProjectCard :project="project" /></li>
      </ul>
      <div v-else class="empty">
        <p>No projects match your search.</p>
        <button type="button" class="btn btn-sm" @click="reset">Clear filters</button>
      </div>
    </section>
  </div>
</template>

<style scoped>
.overline {
  color: var(--accent);
  font-size: var(--fz-sm);
}

h1 {
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 700;
}

.lead {
  max-width: var(--prose-max);
  color: var(--text-muted);
}

.controls {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  margin-block: var(--space-6);
}

.search {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  max-width: 480px;
  padding: 0 var(--space-4);
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  color: var(--text-muted);
}

.search:focus-within {
  border-color: var(--accent);
}

.search input {
  flex: 1;
  min-width: 0;
  min-height: 44px;
  border: none;
  background: transparent;
  color: var(--text-strong);
  font: inherit;
  font-size: var(--fz-md);
}

.search input:focus {
  outline: none;
}

.chips {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}

.chip {
  min-height: 36px;
  padding: var(--space-1) var(--space-4);
  border: 1px solid var(--border);
  border-radius: 999px;
  background: transparent;
  color: var(--text);
  font-family: var(--font-mono);
  font-size: var(--fz-xs);
  transition: var(--transition);
}

.chip:hover {
  border-color: var(--accent);
  color: var(--accent);
}

.chip[aria-pressed='true'] {
  border-color: var(--accent);
  background: var(--accent-tint);
  color: var(--accent);
}

.block {
  margin-top: var(--space-7);
}

.count {
  margin-top: calc(-1 * var(--space-4));
  color: var(--text-muted);
  font-size: var(--fz-xs);
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 280px), 1fr));
  gap: var(--space-5);
  list-style: none;
  padding: 0;
}

.empty {
  padding: var(--space-7);
  text-align: center;
  border: 1px dashed var(--border);
  border-radius: var(--radius-md);
}
</style>
