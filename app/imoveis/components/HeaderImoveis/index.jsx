import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SidebarTrigger } from "@/components/ui/sidebar"
import ImoveisBreadcrumb from "../BreadcrumbPage"
import ButtonsSearch from "../ButtonsSearch"

const HeaderImoveis = () => {
  return (
    <header className="w-full p-4">
      <div className="flex w-full flex-col gap-2">
        <div className="flex items-center gap-2">
          <SidebarTrigger />
          <ImoveisBreadcrumb />
        </div>
        <div className="flex items-center gap-2">
          <Input
            type="text"
            placeholder="Buscar imóveis"
            className="w-full rounded-md border border-blue-800 p-2"
          />
          <Button
            type="submit"
            className="bg-gradient-wilson-blue rounded-md p-2 text-white"
          >
            Buscar
          </Button>
        </div>
        <div className="flex items-center justify-center gap-2">
          <ButtonsSearch />
        </div>
      </div>
    </header>
  )
}

export default HeaderImoveis
