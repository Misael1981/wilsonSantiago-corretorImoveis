import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function InputsSearch() {
  return (
    <div className="space-y-4 lg:flex lg:items-end lg:justify-center lg:space-y-0">
      <div className="w-full px-4 lg:max-w-[250px]">
        <h3 className="text-wilson-blue mb-2 text-lg font-semibold">
          Busca por endereço
        </h3>
        <Select>
          <SelectTrigger className="w-full border border-blue-900 focus:border-blue-900 focus:ring-2 focus:ring-blue-200">
            <SelectValue placeholder="Tipos de Imóveis" />
          </SelectTrigger>
          <SelectContent className="">
            <SelectGroup>
              <SelectLabel>Residencial</SelectLabel>
              <SelectItem value="ap">Apartamento</SelectItem>
              <SelectItem value="casa">Casa</SelectItem>
              <SelectItem value="cobertura">Cobertura</SelectItem>
              <SelectItem value="sobrado">Sobrado</SelectItem>
            </SelectGroup>
            <SelectGroup>
              <SelectLabel>Comercial</SelectLabel>
              <SelectItem value="consultorio">Consultório</SelectItem>
              <SelectItem value="galpao">Galpão/Depósito/Armazem</SelectItem>
              <SelectItem value="imovel-comercial">Imóvel Comercial</SelectItem>
              <SelectItem value="ponto-comercial">
                Ponto Comercial/Box/Loja
              </SelectItem>
            </SelectGroup>
            <SelectGroup>
              <SelectLabel>Outros tipos</SelectLabel>
              <SelectItem value="consultorio">Lotes/Terrenos</SelectItem>
              <SelectItem value="galpao">Fazenda</SelectItem>
              <SelectItem value="imovel-comercial">Sítios</SelectItem>
              <SelectItem value="ponto-comercial">Chácaras</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="w-full px-4 lg:max-w-[250px]">
        <h3 className="text-wilson-blue mb-2 text-lg font-semibold">
          Onde você deseja buscar?
        </h3>
        <Input
          className="border border-blue-900"
          placeholder="Digite o endereço"
        />
      </div>
      <div className="w-full px-4 lg:max-w-[250px]">
        <Button className="bg-gradient-wilson-blue text-wilson-golden w-full">
          Buscar
        </Button>
      </div>
    </div>
  )
}
