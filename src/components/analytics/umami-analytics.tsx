import Script from 'next/script'

export default function UmamiAnalytics() {
  const umamiSrc = "https://cloud.umami.is/script.js"
  const umamiId = "08867e0a-3b4e-4d81-9ced-8fe3d83516a4"

  if (!umamiSrc || !umamiId) {
    console.error('Umami Analytics is not configured.')
    return null
  }

  return (
    <Script
      id="umami-analytics"
      src={umamiSrc}
      data-website-id={umamiId}
      strategy="afterInteractive"
      async
    />
  )
}