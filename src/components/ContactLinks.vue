<script setup>
import { Github, Linkedin, Mail, FileText } from 'lucide-vue-next'
import { profile } from '../data/profile'

const links = [
  { label: 'GitHub', href: profile.links.github, icon: Github, external: true },
  { label: 'LinkedIn', href: profile.links.linkedin, icon: Linkedin, external: true },
  { label: 'Email', href: `mailto:${profile.email}`, icon: Mail },
  { label: 'Resume (PDF)', href: import.meta.env.BASE_URL + profile.resumePath, icon: FileText, external: true },
]
</script>

<template>
  <ul class="contact-links">
    <li v-for="link in links" :key="link.label">
      <a
        :href="link.href"
        :aria-label="link.label"
        :title="link.label"
        :target="link.external ? '_blank' : undefined"
        :rel="link.external ? 'noopener noreferrer' : undefined"
      >
        <component :is="link.icon" :size="20" aria-hidden="true" />
      </a>
    </li>
  </ul>
</template>

<style scoped>
.contact-links {
  display: flex;
  gap: var(--space-2);
  list-style: none;
  margin: 0;
  padding: 0;
}

a {
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  color: var(--text-muted);
  border-radius: var(--radius-sm);
}

a:hover {
  color: var(--accent);
  transform: translateY(-2px);
}
</style>
