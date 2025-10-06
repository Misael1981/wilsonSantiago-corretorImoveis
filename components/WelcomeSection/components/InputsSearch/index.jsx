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

const InputsSearch = () => {
  return (
    <div className="space-y-4">
      <div className="px-4">
        <h3 className="text-wilson-blue mb-2 text-lg font-semibold">
          Busca por endereço
        </h3>
        <Select>
          <SelectTrigger className="w-full">
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
      <div className="px-4">
        <h3 className="text-wilson-blue mb-2 text-lg font-semibold">
          Onde você deseja buscar?
        </h3>
        <Input placeholder="Digite o endereço" />
      </div>
    </div>
  )
}

export default InputsSearch
