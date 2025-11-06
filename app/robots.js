export default function robots() {
  const base =
    process.env.NEXT_PUBLIC_SITE_URL ||
    "https://www.wilsonsantiago-corretor.com.br"
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: [`${base}/sitemap.xml`],
    host: base,
  }
}
