import { useEffect } from 'react'
import { site } from '../config/site.js'

// ─────────────────────────────────────────────────────────────────────────
// SEO dinámico para la SPA. Actualiza <title>, meta description, canonical,
// Open Graph, Twitter Cards y datos estructurados (JSON-LD) según la página.
// No usa dependencias externas: manipula <head> directamente.
// ─────────────────────────────────────────────────────────────────────────

function upsertMeta(attr, key, content) {
  if (!content) return
  let el = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function upsertLink(rel, href) {
  let el = document.head.querySelector(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

function upsertJsonLd(id, data) {
  let el = document.getElementById(id)
  if (!data) {
    if (el) el.remove()
    return
  }
  if (!el) {
    el = document.createElement('script')
    el.type = 'application/ld+json'
    el.id = id
    document.head.appendChild(el)
  }
  el.textContent = JSON.stringify(data)
}

export default function Seo({ title, description, path = '', image, type = 'website', jsonLd }) {
  const fullTitle = title ? `${title} · ${site.brand}` : `${site.brand} · Cursos de desarrollo web`
  const desc = description || site.intro
  const url = site.url + path
  const img = site.url + (image || '/img/brand/og-image.svg')
  const ld = jsonLd ? JSON.stringify(jsonLd) : ''

  useEffect(() => {
    document.title = fullTitle
    upsertMeta('name', 'description', desc)
    upsertLink('canonical', url)

    // Open Graph (WhatsApp, LinkedIn, Facebook…)
    upsertMeta('property', 'og:site_name', site.brand)
    upsertMeta('property', 'og:title', fullTitle)
    upsertMeta('property', 'og:description', desc)
    upsertMeta('property', 'og:url', url)
    upsertMeta('property', 'og:type', type)
    upsertMeta('property', 'og:image', img)
    upsertMeta('property', 'og:locale', 'es_ES')

    // Twitter
    upsertMeta('name', 'twitter:card', 'summary_large_image')
    upsertMeta('name', 'twitter:title', fullTitle)
    upsertMeta('name', 'twitter:description', desc)
    upsertMeta('name', 'twitter:image', img)

    // Datos estructurados específicos de la página
    upsertJsonLd('ld-page', ld ? JSON.parse(ld) : null)
  }, [fullTitle, desc, url, img, type, ld])

  return null
}
