import { Button } from "@/components/ui/button"
import { User } from "lucide-react"

const ButtonLogin = () => {
  return (
    <Button className="bg-gradient-wilson-golden text-blue-950">
      <User size={24} className="size-6" />
      Login
    </Button>
  )
}

export default ButtonLogin
