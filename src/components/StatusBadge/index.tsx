import { STATUS_INFO } from "@/constants/maps-enums"
import { Badge } from "../ui/badge"

type StatusBadgeProps = {
  status: keyof typeof STATUS_INFO
}

const StatusBadge = ({ status }: StatusBadgeProps) => {
  const info = STATUS_INFO[status]

  return (
    <div className="absolute top-2 left-2">
      <Badge variant="secondary" className={info.className}>
        {info.label}
      </Badge>
    </div>
  )
}

export default StatusBadge
