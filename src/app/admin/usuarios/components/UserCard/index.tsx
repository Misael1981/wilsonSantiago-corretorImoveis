"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Role } from "@/generated/prisma"
import { formatPhoneNumber } from "@/helpers/format-phone-number"
import { format } from "date-fns"
import { Mail, Phone, Shield } from "lucide-react"
import SelectRoleUser from "../SelectRoleUser"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { deleteUser } from "@/app/actions/delete-user"

export type UserCardProps = {
  user: {
    name: string | null
    id: string
    email: string | null
    phone: string | null
    role: Role
    isActive: boolean
    createdAt: Date
  }
}

const UserCard = ({ user }: UserCardProps) => {
  const router = useRouter()

  const handleDeleteUser = async () => {
    try {
      const result = await deleteUser(user.id)

      if (!result.success) {
        toast.error("Erro ao deletar usuário.")
        return
      }

      toast.success("Usuário deletado!")
      router.refresh()
    } catch {
      toast.error("Erro inesperado.")
    }
  }

  return (
    <Card className="py-4">
      <CardHeader className="flex items-center justify-between border-b border-gray-300">
        <CardTitle>{user.name || "Usuário sem nome"}</CardTitle>
        {/* Status + Data */}
        <div className="flex flex-col items-center justify-center gap-1">
          <span className="text-muted-foreground text-xs">
            {user.createdAt
              ? format(new Date(user.createdAt), "dd/MM/yyyy")
              : "-"}
          </span>
          <Badge
            className={
              user.role === "ADMIN"
                ? "bg-green-400 text-white"
                : "bg-secondary text-secondary-foreground"
            }
          >
            <Shield className="mr-1 h-3 w-3" />
            {user.role}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Contato */}
        <div className="text-muted-foreground space-y-2 text-sm">
          {user.phone && (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <Phone className="h-3 w-3" />
                {formatPhoneNumber(user.phone!)}
              </div>
              <Button
                variant="outline"
                onClick={() =>
                  navigator.clipboard.writeText(formatPhoneNumber(user.phone!))
                }
              >
                📋 Copiar
              </Button>
            </div>
          )}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1 truncate">
              <Mail className="h-3 w-3" />
              {user.email}
            </div>
            <Button
              variant="outline"
              onClick={() => navigator.clipboard.writeText(user.email!)}
            >
              📋 Copiar
            </Button>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between border-t border-gray-300 py-0 pb-0">
        <Button variant="destructive" onClick={handleDeleteUser}>
          Delete
        </Button>
        <SelectRoleUser role={user.role} userId={user.id} />
      </CardFooter>
      {/* Modal de edição */}
    </Card>
  )
}

export default UserCard
