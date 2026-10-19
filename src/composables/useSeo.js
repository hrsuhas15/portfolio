const SITE_NAME = 'Suhas H R'
const DEFAULT_TITLE = 'Suhas H R — Lead Software Engineer'
const DEFAULT_DESCRIPTION =
  'Suhas H R is a Lead Software Engineer in Bengaluru building cloud-native platforms, distributed systems, and IoT solutions on AWS.'

function setMeta(attr, key, content) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

/** Updates document title, description, and Open Graph tags for the current page. */
export function setPageMeta({ title, description } = {}) {
  const fullTitle = title ? `${title} · ${SITE_NAME}` : DEFAULT_TITLE
  const desc = description || DEFAULT_DESCRIPTION

  document.title = fullTitle
  setMeta('name', 'description', desc)
  setMeta('property', 'og:title', fullTitle)
  setMeta('property', 'og:description', desc)
  setMeta('property', 'og:url', window.location.href)
}
