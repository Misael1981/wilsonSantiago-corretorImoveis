"use client"

import { updateUserRole } from "@/app/actions/update-user-role"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { roleUsers } from "@/constants/maps-enums"
import { Role } from "@/generated/prisma"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

type SelectRoleUserProps = {
  role: Role
  userId: string
}

const SelectRoleUser = ({ role, userId }: SelectRoleUserProps) => {
  const router = useRouter()

  const handleUpdateRoleUser = async (value: Role) => {
    try {
      const result = await updateUserRole({
        userId,
        role: value,
      })

      if (!result.success) {
        toast.error("Erro ao atualizar status do usuário.")
        return
      }

      toast.success("Status atualizado!")
      router.refresh()
    } catch {
      toast.error("Erro inesperado.")
    }
  }

  return (
    <Select
      defaultValue={role}
      onValueChange={(value) => handleUpdateRoleUser(value as Role)}
    >
      <SelectTrigger className="w-55">
        <SelectValue placeholder="Selecione um cargo" />
      </SelectTrigger>

      <SelectContent>
        <SelectGroup>
          {Object.entries(roleUsers).map(([value, label]) => (
            <SelectItem key={value} value={value}>
              {label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export default SelectRoleUser
