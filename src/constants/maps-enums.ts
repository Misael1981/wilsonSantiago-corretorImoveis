import { PropertyStatus, PropertyType } from "@/generated/prisma"

export const roleUsers = {
  USER: "Usuário",
  ADMIN: "Administrador",
  MODERATOR: "Moderador",
} as const

export const badgeClassForStatus = (s: string) => {
  switch (s) {
    case "ACTIVE":
      return "bg-green-500 text-white"
    case "PENDING":
      return "bg-yellow-500 text-white"
    case "SOLD":
      return "bg-gray-500 text-white"
    case "SPECIAL_CONDITION":
      return "bg-purple-600 text-white"
    case "INACTIVE":
      return "bg-slate-400 text-white"
    case "RESERVED":
      return "bg-blue-500 text-white"
    default:
      return "bg-secondary"
  }
}

export const STATUS_LABELS: Record<
  (typeof PropertyStatus)[keyof typeof PropertyStatus],
  string
> = {
  ACTIVE: "Ativo",
  PENDING: "Pendente",
  SOLD: "Vendido",
  RENTED: "Alugado",
  SPECIAL_CONDITION: "Condição especial",
  INACTIVE: "Inativo",
  RESERVED: "Reservado",
}

export const TYPES_lABELS: Record<
  (typeof PropertyType)[keyof typeof PropertyType],
  string
> = {
  CASA: "Casa",
  APARTAMENTO: "Apartamento",
  TERRENO: "Terreno",
  LOJA: "Loja",
  CHACARA: "Chacara",
  SITIO: "Sitio",
  GALPAO: "Galpao",
  SALA_COMERCIAL: "Sala Comercial",
}

type StatusInfo = {
  label: string
  className: string
}

export const STATUS_INFO: Record<
  (typeof PropertyStatus)[keyof typeof PropertyStatus],
  StatusInfo
> = {
  ACTIVE: {
    label: "Disponível",
    className: "bg-green-600 text-white px-4 rounded-full",
  },
  PENDING: {
    label: "Em análise",
    className: "bg-yellow-500 text-black px-4 rounded-full",
  },
  SOLD: {
    label: "Vendido",
    className: "bg-red-700 text-white px-4 rounded-full",
  },
  RENTED: {
    label: "Alugado",
    className: "bg-blue-600 text-white px-4 rounded-full",
  },
  SPECIAL_CONDITION: {
    label: "Condição especial",
    className: "bg-purple-600 text-white px-4 rounded-full",
  },
  INACTIVE: {
    label: "Inativo",
    className: "bg-neutral-500 text-black px-4 rounded-full",
  },
  RESERVED: {
    label: "Reservado",
    className: "bg-blue-600 text-white px-4 rounded-full",
  },
}
