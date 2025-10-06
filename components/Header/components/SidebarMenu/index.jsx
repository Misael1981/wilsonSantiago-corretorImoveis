import { SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import Image from "next/image"
import ButtonLogin from "../ButtonLogin"
import NavMenu from "../NavMenu"

const SidebarMenu = () => {
  return (
    <SheetContent className="bg-wilson-blue w-[90%] p-4 text-white">
      <SheetHeader>
        <SheetTitle className="sr-only">Menu de Navegação</SheetTitle>
        <Image
          src="/icons/logo-horizontal.svg"
          alt="Logo Wilson Corretor Imóveis"
          width={160}
          height={80}
        />
      </SheetHeader>
      <div className="space-y-4">
        <ButtonLogin />
        <NavMenu />
      </div>
    </SheetContent>
  )
}

export default SidebarMenu
