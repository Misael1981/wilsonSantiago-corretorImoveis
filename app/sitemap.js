export default async function sitemap() {
  const base =
    process.env.NEXT_PUBLIC_SITE_URL ||
    "https://www.wilsonsantiago-corretor.com.br"

  // Páginas estáticas essenciais
  const staticPages = [
    { url: `${base}/`, lastModified: new Date() },
    { url: `${base}/sobre`, lastModified: new Date() },
    { url: `${base}/imoveis`, lastModified: new Date() },
    { url: `${base}/politica-de-privacidade`, lastModified: new Date() },
  ]

  // Espaço para buscar imóveis e outros conteúdos dinâmicos

  return staticPages
}
