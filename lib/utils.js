import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// Adiciona formatador BRL determinístico (sem depender de locale do ambiente)
export function formatBRL(n) {
  try {
    return `R$ ${new Intl.NumberFormat("pt-BR", { maximumFractionDigits: 0 }).format(Math.round(n ?? 0))}`
  } catch {
    const v = Math.round(n ?? 0)
    return `R$ ${v.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`
  }
}
