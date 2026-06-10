import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import Image from "next/image"
import WelcomeUser from "../WelcomeUser"
import ButtonLogin from "../ButtonLogin"
import NavMenuMobile from "../NavMenuMobile"

type SidebarMenuProps = {
  open: boolean
  onClose: () => void
}

const SidebarMenu = ({ open, onClose }: SidebarMenuProps) => {
  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="bg-wilson-blue border-none p-4 text-white">
        <SheetHeader>
          <SheetTitle className="sr-only">Menu de Navegação</SheetTitle>
          <SheetDescription aria-describedby={undefined} className="sr-only">
            Navegação principal
          </SheetDescription>
          <div className="relative h-16 w-32">
            <Image
              src="/icons/logo-horizontal.svg"
              alt="Logo Wilson Corretor Imóveis"
              fill
              className="object-contain"
            />
          </div>
        </SheetHeader>
        <div className="space-y-4">
          <WelcomeUser />

          <NavMenuMobile />
        </div>
        <SheetFooter>
          <ButtonLogin />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

export default SidebarMenu
