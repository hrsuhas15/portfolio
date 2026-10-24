import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../pages/HomePage.vue'
import { getProjectBySlug } from '../data/projects'
import { setPageMeta } from '../composables/useSeo'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage,
    meta: { title: '', description: '' },
  },
  {
    path: '/projects',
    name: 'projects',
    component: () => import('../pages/ProjectsPage.vue'),
    meta: {
      title: 'Projects',
      description: 'Case studies on cloud platforms, data migration, test automation, and AI tooling by Suhas H R.',
    },
  },
  {
    path: '/projects/:slug',
    name: 'project',
    component: () => import('../pages/ProjectDetailPage.vue'),
    props: true,
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../pages/AboutPage.vue'),
    meta: {
      title: 'About',
      description: 'Background, experience, skills, and education of Suhas H R, Lead Software Engineer.',
    },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('../pages/NotFoundPage.vue'),
    meta: { title: 'Page not found' },
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    // The page uses an out-in route transition, so the target section isn't in
    // the DOM yet when navigation resolves. Wait past the transition, then
    // scroll to the anchor.
    if (to.hash) {
      return new Promise((resolve) => {
        setTimeout(() => resolve({ el: to.hash, top: 80, behavior: 'smooth' }), 320)
      })
    }
    return { top: 0 }
  },
})

router.afterEach((to) => {
  if (to.name === 'project') {
    const project = getProjectBySlug(to.params.slug)
    setPageMeta(
      project
        ? { title: project.title, description: project.summary }
        : { title: 'Project not found' },
    )
    return
  }
  setPageMeta(to.meta)
})

export default router
