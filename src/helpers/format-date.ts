export const formatDate = (isoString: Date | string) => {
  const date = new Date(isoString)
  return date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })
}
