// This file is used to preload critical resources
export function preload() {
  // Preload critical CSS
  const linkPreload = document.createElement('link')
  linkPreload.rel = 'preload'
  linkPreload.as = 'style'
  linkPreload.href = '/styles.css'
  document.head.appendChild(linkPreload)

  // Preconnect to external domains
  const domains = [
    'fonts.googleapis.com',
    'fonts.gstatic.com'
  ]

  domains.forEach(domain => {
    const link = document.createElement('link')
    link.rel = 'preconnect'
    link.href = `https://${domain}`
    link.crossOrigin = 'anonymous'
    document.head.appendChild(link)
  })

  // Preload critical fonts
  const fontPreload = document.createElement('link')
  fontPreload.rel = 'preload'
  fontPreload.as = 'font'
  fontPreload.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap'
  fontPreload.crossOrigin = 'anonymous'
  document.head.appendChild(fontPreload)
}
