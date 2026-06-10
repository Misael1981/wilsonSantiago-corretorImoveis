import { SidebarTrigger } from "@/components/ui/sidebar"
import ImoveisBreadcrumb from "../ImoveisBreadcrumb"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { TYPES_lABELS } from "@/constants/maps-enums"

type HeaderImoveisProps = {
  propertyTitle?: string | null
}

const HeaderImoveis = ({ propertyTitle }: HeaderImoveisProps) => {
  return (
    <header className="space-y-4 bg-white p-4 shadow-lg">
      <div className="flex items-center gap-2">
        <SidebarTrigger />
        <ImoveisBreadcrumb propertyTitle={propertyTitle} />
      </div>
      <div className="mx-auto flex max-w-2xl items-center gap-2">
        <Input
          type="text"
          name="title"
          placeholder="Buscar imóveis por título"
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
        {Object.entries(TYPES_lABELS).map(([value, label]) => (
          <Button key={value} value={value} className="bg-accent text-white">
            {label}
          </Button>
        ))}
      </div>
    </header>
  )
}

export default HeaderImoveis
