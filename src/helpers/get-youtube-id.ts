export function getYoutubeId(url: string) {
  const shorts = url.match(/shorts\/([^?&]+)/)

  if (shorts) return shorts[1]

  const watch = url.match(/[?&]v=([^&]+)/)

  if (watch) return watch[1]

  const shortUrl = url.match(/youtu\.be\/([^?&]+)/)

  if (shortUrl) return shortUrl[1]

  return null
}
