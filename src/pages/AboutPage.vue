<script setup>
import SectionHeading from '../components/SectionHeading.vue'
import ExperienceTimeline from '../components/ExperienceTimeline.vue'
import SkillsGrid from '../components/SkillsGrid.vue'
import ContactLinks from '../components/ContactLinks.vue'
import { profile } from '../data/profile'
import { education } from '../data/experience'
</script>

<template>
  <div class="section container about">
    <header>
      <p class="mono overline">About</p>
      <h1>{{ profile.name }}</h1>
      <p class="headline mono">{{ profile.headline.join(' · ') }}</p>
      <p class="location">{{ profile.location }}</p>
    </header>

    <section aria-labelledby="background" class="block">
      <SectionHeading id="background">Background</SectionHeading>
      <div class="prose">
        <p v-for="para in profile.summary" :key="para">{{ para }}</p>
      </div>
      <h3 class="sub">Technical focus</h3>
      <ul class="styled-list">
        <li v-for="area in profile.focusAreas" :key="area">{{ area }}</li>
      </ul>
    </section>

    <section aria-labelledby="experience" class="block">
      <SectionHeading id="experience">Experience</SectionHeading>
      <ExperienceTimeline />
    </section>

    <section aria-labelledby="skills" class="block">
      <SectionHeading id="skills">Skills</SectionHeading>
      <SkillsGrid />
    </section>

    <section aria-labelledby="education" class="block">
      <SectionHeading id="education">Education</SectionHeading>
      <ul class="education">
        <li v-for="item in education" :key="item.id">
          <p class="mono dates">{{ item.start }} — {{ item.end }}</p>
          <h3>{{ item.degree }} — {{ item.field }}</h3>
          <p class="institution">{{ item.institution }}</p>
        </li>
      </ul>
    </section>

    <section aria-labelledby="connect" class="block">
      <SectionHeading id="connect">Connect</SectionHeading>
      <p>
        Email me at <a :href="`mailto:${profile.email}`">{{ profile.email }}</a> or find me on
        <a :href="profile.links.linkedin" target="_blank" rel="noopener noreferrer">LinkedIn</a>.
      </p>
      <ContactLinks />
    </section>
  </div>
</template>

<style scoped>
.about {
  max-width: calc(860px + 2 * var(--gutter));
}

.overline {
  color: var(--accent);
  font-size: var(--fz-sm);
}

h1 {
  font-size: clamp(2.25rem, 6vw, 3.5rem);
  font-weight: 700;
  line-height: var(--lh-tight);
}

.headline {
  color: var(--accent);
  font-size: var(--fz-sm);
}

.location {
  color: var(--text-muted);
  font-size: var(--fz-sm);
}

.block {
  margin-top: var(--space-8);
}

.prose {
  max-width: var(--prose-max);
}

.sub {
  margin-top: var(--space-5);
  font-size: var(--fz-lg);
}

.education {
  display: grid;
  gap: var(--space-5);
  list-style: none;
  padding: 0;
}

.education li {
  padding: var(--space-5);
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
}

.education h3 {
  font-size: var(--fz-lg);
}

.dates {
  margin-bottom: var(--space-2);
  color: var(--accent);
  font-size: var(--fz-xs);
}

.institution {
  margin: 0;
  color: var(--text-muted);
  font-size: var(--fz-md);
}
</style>
