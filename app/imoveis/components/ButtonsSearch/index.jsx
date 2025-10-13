import { Button } from "@/components/ui/button"

const typesProperties = [
  {
    id: 1,
    label: "casa",
    value: "casa",
  },
  {
    id: 2,
    label: "Apartamento",
    value: "apartamento",
  },
  {
    id: 3,
    label: "Chácara",
    value: "chacara",
  },
  {
    id: 4,
    label: "Sítio",
    value: "sitio",
  },
  {
    id: 5,
    label: "Terreno/lote",
    value: "terreno",
  },
  {
    id: 6,
    label: "Comercial",
    value: "comercial",
  },
  {
    id: 7,
    label: "Outros Imóveis",
    value: "outros",
  },
  {
    id: 8,
    label: "Todos",
    value: "todos",
  },
]

const ButtonsSearch = () => {
  return (
    <div className="flex gap-2 overflow-auto [&::-webkit-scrollbar]:hidden">
      {typesProperties.map((item) => (
        <Button
          key={item.id}
          variant="outline"
          type="submit"
          className="rounded-md p-2"
        >
          {item.label}
        </Button>
      ))}
    </div>
  )
}

export default ButtonsSearch
