import { Button } from "@/components/ui/button"
import { Sheet, SheetTrigger } from "@/components/ui/sheet"
import { MenuIcon } from "lucide-react"
import SidebarMenu from "../SidebarMenu"

const ButtonMenuTrigger = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost">
          <MenuIcon size={24} className="size-8" />
        </Button>
      </SheetTrigger>
      <SidebarMenu />
    </Sheet>
  )
}

export default ButtonMenuTrigger
