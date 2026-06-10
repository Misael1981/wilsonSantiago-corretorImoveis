export function formatArea(value: string | number, isDeleting = false): string {
  const onlyDigits = String(value).replace(/\D/g, "")

  if (!onlyDigits) return ""

  const formattedNumber = new Intl.NumberFormat("pt-BR").format(
    parseInt(onlyDigits, 10),
  )

  if (isDeleting && String(value).length <= formattedNumber.length + 2) {
    return formattedNumber
  }

  return `${formattedNumber} m²`
}
