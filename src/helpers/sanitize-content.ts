export function sanitizeContent(html: string): string {
  return html
    .replace(/&nbsp;/g, " ")
    .replace(/ +/g, " ")
    .replace(/<p>\s*<\/p>/g, "")
}
