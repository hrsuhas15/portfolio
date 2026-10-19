<script setup>
import { ArrowRight, Mail, MapPin } from 'lucide-vue-next'
import SectionHeading from '../components/SectionHeading.vue'
import ProjectCard from '../components/ProjectCard.vue'
import ExperienceTimeline from '../components/ExperienceTimeline.vue'
import SkillsGrid from '../components/SkillsGrid.vue'
import ContactLinks from '../components/ContactLinks.vue'
import ProfilePhoto from '../components/ProfilePhoto.vue'
import { profile, achievements } from '../data/profile'
import { projects } from '../data/projects'

const featured = projects.filter((p) => p.featured)
const resumeUrl = import.meta.env.BASE_URL + profile.resumePath
</script>

<template>
  <section class="hero container" aria-labelledby="hero-title">
    <div class="hero-text">
      <p class="mono hello">Hi, my name is</p>
      <h1 id="hero-title" class="name">{{ profile.name }}.</h1>
      <p class="tagline">{{ profile.tagline }}</p>
      <p class="role">{{ profile.headline.join(' · ') }}</p>
      <p class="intro">{{ profile.intro }}</p>
      <p class="location"><MapPin :size="16" aria-hidden="true" /> {{ profile.location }}</p>
      <div class="actions">
        <RouterLink to="/projects" class="btn btn-primary">View projects <ArrowRight :size="16" aria-hidden="true" /></RouterLink>
        <a :href="resumeUrl" class="btn" target="_blank" rel="noopener">Download resume</a>
      </div>
      <ContactLinks class="hero-links" />
    </div>
    <ProfilePhoto class="hero-photo" size="clamp(140px, 28vw, 300px)" />
  </section>

  <section class="section container" aria-labelledby="about">
    <SectionHeading id="about">About me</SectionHeading>
    <div class="about-grid">
      <div>
        <p v-for="para in profile.summary" :key="para">{{ para }}</p>
        <RouterLink to="/about" class="more-link mono">More about me <ArrowRight :size="14" aria-hidden="true" /></RouterLink>
      </div>
      <div>
        <h3 class="mono small-heading">Here are the technologies I work with:</h3>
        <SkillsGrid />
      </div>
    </div>
  </section>

  <section class="section container" aria-labelledby="experience">
    <SectionHeading id="experience">Where I've worked</SectionHeading>
    <ExperienceTimeline compact />

    <h3 class="achievements-title">Key achievements</h3>
    <ul class="achievements">
      <li v-for="item in achievements" :key="item.title" class="achievement">
        <h4>{{ item.title }}</h4>
        <p>{{ item.description }}</p>
        <RouterLink v-if="item.projectSlug" :to="`/projects/${item.projectSlug}`" class="mono more-link">
          Case study <ArrowRight :size="14" aria-hidden="true" />
        </RouterLink>
      </li>
    </ul>
  </section>

  <section class="section container" aria-labelledby="work">
    <SectionHeading id="work">Featured projects</SectionHeading>
    <ul class="project-grid">
      <li v-for="project in featured" :key="project.slug">
        <ProjectCard :project="project" />
      </li>
    </ul>
    <p class="center">
      <RouterLink to="/projects" class="btn">View all projects</RouterLink>
    </p>
  </section>

  <section class="section container contact" aria-labelledby="contact">
    <p class="mono overline">What's next?</p>
    <h2 id="contact" class="contact-title">Get in touch</h2>
    <p>
      Whether you have a question about my work or want to talk about cloud platforms and
      distributed systems, the best way to reach me is by email or LinkedIn.
    </p>
    <a :href="`mailto:${profile.email}`" class="btn"><Mail :size="16" aria-hidden="true" /> {{ profile.email }}</a>
    <ContactLinks class="contact-links" />
  </section>
</template>

<style scoped>
.hero {
  display: grid;
  align-items: center;
  gap: var(--space-7);
  min-height: calc(90vh - var(--header-height));
  padding-block: var(--space-7);
}

/* Mobile: photo sits above the text */
.hero-photo {
  order: -1;
}

@media (min-width: 900px) {
  .hero {
    grid-template-columns: 1fr auto;
  }

  .hero-photo {
    order: 0;
  }
}

.hello {
  margin-bottom: var(--space-4);
  color: var(--accent);
  font-size: var(--fz-md);
}

.name {
  margin: 0;
  font-size: var(--fz-display);
  font-weight: 700;
  line-height: var(--lh-tight);
  letter-spacing: -0.02em;
}

.tagline {
  margin: var(--space-2) 0 0;
  color: var(--text-muted);
  font-size: var(--fz-display-sub);
  font-weight: 700;
  line-height: var(--lh-tight);
  letter-spacing: -0.02em;
}

.role {
  margin-top: var(--space-5);
  color: var(--text-strong);
  font-size: var(--fz-md);
  font-weight: 500;
}

.intro {
  max-width: 560px;
  color: var(--text);
}

.location {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  color: var(--text-muted);
  font-size: var(--fz-sm);
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-4);
  margin-top: var(--space-5);
}

.hero-links {
  margin-top: var(--space-5);
  margin-left: -10px;
}

.about-grid {
  display: grid;
  gap: var(--space-6);
}

@media (min-width: 900px) {
  .about-grid {
    grid-template-columns: 1fr 1fr;
  }
}

.small-heading {
  font-size: var(--fz-sm);
  font-weight: 400;
  color: var(--text-muted);
  margin-bottom: var(--space-4);
}

.more-link {
  display: inline-flex;
  align-items: center;
  gap: var(--space-1);
  font-size: var(--fz-sm);
}

.achievements-title {
  margin-top: var(--space-8);
  font-size: var(--fz-xl);
}

.achievements,
.project-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 280px), 1fr));
  gap: var(--space-5);
  list-style: none;
  padding: 0;
}

.achievement {
  padding: var(--space-5);
  border: 1px solid var(--border);
  border-left: 3px solid var(--accent);
  border-radius: var(--radius-md);
}

.achievement h4 {
  font-size: var(--fz-md);
}

.achievement p {
  font-size: var(--fz-sm);
  color: var(--text-muted);
}

.center {
  margin-top: var(--space-7);
  text-align: center;
}

.contact {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 640px;
  text-align: center;
}

.overline {
  color: var(--accent);
  font-size: var(--fz-md);
}

.contact-title {
  font-size: clamp(2.5rem, 6vw, 3.5rem);
  font-weight: 700;
}

.contact .btn {
  margin-top: var(--space-4);
  overflow-wrap: anywhere;
}

.contact-links {
  margin-top: var(--space-6);
}
</style>
