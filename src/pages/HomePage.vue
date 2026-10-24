<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { ArrowRight, Mail, MapPin } from 'lucide-vue-next'
import SectionHeading from '../components/SectionHeading.vue'
import ProjectCard from '../components/ProjectCard.vue'
import ContactLinks from '../components/ContactLinks.vue'
import ProfilePhoto from '../components/ProfilePhoto.vue'
import { profile } from '../data/profile'
import { projects } from '../data/projects'

const featured = projects.filter((p) => p.featured)

// Typewriter that cycles through the roles in the hero.
const typedRole = ref('')
let timer = null

onMounted(() => {
  const roles = profile.headline
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduce) {
    typedRole.value = roles.join(' · ')
    return
  }
  let r = 0
  let c = 0
  let deleting = false
  const tick = () => {
    const word = roles[r]
    if (!deleting) {
      typedRole.value = word.slice(0, ++c)
      if (c === word.length) {
        deleting = true
        timer = setTimeout(tick, 1800)
        return
      }
    } else {
      typedRole.value = word.slice(0, --c)
      if (c === 0) {
        deleting = false
        r = (r + 1) % roles.length
      }
    }
    timer = setTimeout(tick, deleting ? 40 : 85)
  }
  tick()
})

onBeforeUnmount(() => clearTimeout(timer))
</script>

<template>
  <section class="hero container" aria-labelledby="hero-title">
    <div class="hero-text">
      <p class="mono hello anim-fade-up" style="--anim-delay: 80ms">Hi, I am</p>
      <h1 id="hero-title" class="name" style="--anim-delay: 180ms">{{ profile.name }}.</h1>
      <p class="tagline anim-fade-up" style="--anim-delay: 300ms">{{ profile.tagline }}</p>
      <p class="role anim-fade-up" style="--anim-delay: 400ms" aria-label="Roles">
        <span class="prompt mono" aria-hidden="true">&gt;</span>
        <span class="typed mono">{{ typedRole }}</span><span class="cursor" aria-hidden="true"></span>
      </p>
      <p class="intro anim-fade-up" style="--anim-delay: 480ms">{{ profile.intro }}</p>
      <p class="location anim-fade-up" style="--anim-delay: 560ms"><MapPin :size="16" aria-hidden="true" /> {{ profile.location }}</p>
      <div class="actions anim-fade-up" style="--anim-delay: 640ms">
        <RouterLink to="/about" class="btn">More about me <ArrowRight :size="16" aria-hidden="true" /></RouterLink>
      </div>
      <ContactLinks class="hero-links anim-fade-up" style="--anim-delay: 720ms" />
    </div>
    <ProfilePhoto class="hero-photo" size="clamp(150px, 40vw, 340px)" />
  </section>

  <section class="section container" aria-labelledby="work">
    <SectionHeading id="work" v-reveal>Featured projects</SectionHeading>
    <ul v-reveal.stagger="{ step: 110 }" class="project-grid">
      <li v-for="project in featured" :key="project.slug">
        <ProjectCard :project="project" />
      </li>
    </ul>
    <p v-reveal class="center">
      <RouterLink to="/projects" class="btn">View all projects</RouterLink>
    </p>
  </section>

  <section v-reveal class="section container contact" aria-labelledby="contact">
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
  gap: var(--space-6);
  min-height: calc(90vh - var(--header-height));
  padding-block: var(--space-7);
}

/* Mobile: photo sits at the top, pushed to the right */
.hero-photo {
  order: -1;
  justify-self: end;
}

@media (min-width: 900px) {
  .hero {
    grid-template-columns: 1fr auto;
    align-items: start;
    gap: var(--space-8);
  }

  .hero-photo {
    order: 0;
    margin-top: var(--space-5);
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
  background: linear-gradient(
    110deg,
    var(--text-strong) 0%,
    var(--text-strong) 30%,
    var(--accent) 50%,
    var(--text-strong) 70%,
    var(--text-strong) 100%
  );
  background-size: 200% auto;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  /* Fade/slide in, then keep panning the gradient. Both run together so the
     entrance animation isn't lost (which would leave the name invisible). */
  animation: fade-up 0.7s var(--ease) var(--anim-delay, 0ms) both, gradient-pan 6s linear infinite;
}

@media (prefers-reduced-motion: reduce) {
  .name {
    opacity: 1;
    animation: none;
  }
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
  display: flex;
  align-items: center;
  gap: var(--space-2);
  margin-top: var(--space-5);
  min-height: 1.6em;
  color: var(--text-strong);
  font-size: var(--fz-md);
  font-weight: 500;
}

.role .prompt {
  color: var(--accent);
  font-weight: 700;
}

.role .typed {
  color: var(--accent);
}

/* Blinking terminal cursor after the typed text */
.cursor {
  display: inline-block;
  width: 9px;
  height: 1.1em;
  margin-left: 1px;
  background: var(--accent);
  translate: 0 2px;
  animation: cursor-blink 1s steps(1) infinite;
}

@keyframes cursor-blink {
  0%,
  50% {
    opacity: 1;
  }
  50.01%,
  100% {
    opacity: 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .cursor {
    animation: none;
  }
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
