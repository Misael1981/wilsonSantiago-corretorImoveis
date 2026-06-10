import { Button } from "@/components/ui/button"
import { useState } from "react"
import { BiMenuAltRight } from "react-icons/bi"
import SidebarMenu from "./components/SidebarMenu"

const HeaderMobile = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const handleMenuOpen = () => {
    setIsMenuOpen(true)
  }
  return (
    <div className="flex justify-end lg:hidden">
      <Button
        variant="ghost"
        size="icon"
        onClick={handleMenuOpen}
        aria-label="Abrir menu de navegação"
      >
        <BiMenuAltRight className="size-8" />
      </Button>
      <SidebarMenu open={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </div>
  )
}

export default HeaderMobile
