"use client"

import { Badge } from "../ui/badge"

const STATUS_INFO = {
  ACTIVE: {
    label: "Disponível",
    className: "bg-green-600 text-white text-lg px-4 rounded-full",
  },
  PENDING: {
    label: "Em análise",
    className: "bg-yellow-500 text-black px-4 rounded-full",
  },
  SOLD: {
    label: "Vendido",
    className: "bg-red-700 text-white px-4 rounded-full",
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

const StatusBadge = ({ status }) => {
  return (
    <div className="absolute top-2 left-2">
      {(() => {
        const info = STATUS_INFO[status] ?? {
          label: "Status",
          className: "bg-zinc-500 text-white px-4 rounded-full",
        }
        return (
          <Badge variant="secondary" className={info.className}>
            {info.label}
          </Badge>
        )
      })()}
    </div>
  )
}

export default StatusBadge
