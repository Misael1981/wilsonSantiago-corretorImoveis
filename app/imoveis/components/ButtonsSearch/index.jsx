import { Button } from "@/components/ui/button"

const typesProperties = [
  { id: 9, label: "Todos", value: "todos" },
  { id: 1, label: "Casa", value: "casa" },
  { id: 2, label: "Apartamento", value: "apartamento" },
  { id: 3, label: "Terreno/Lote", value: "terreno" },
  { id: 5, label: "Chácara", value: "chacara" },
  { id: 8, label: "Sala Comercial", value: "sala_comercial" },
]

const ButtonsSearch = ({ submitName = "type", selectedType = "todos" }) => {
  return (
    <div className="flex gap-2 overflow-auto [&::-webkit-scrollbar]:hidden">
      {typesProperties.map((item) => {
        const isSelected = selectedType === item.value
        const valueToSubmit = item.value === "todos" ? "" : item.value

        return (
          <Button
            key={item.id}
            variant={isSelected ? "default" : "outline"}
            type="submit"
            name={submitName}
            value={valueToSubmit}
            aria-pressed={isSelected}
            className={`rounded-md border border-blue-800 p-2 text-blue-800 ${isSelected ? "bg-accent text-white" : ""}`}
          >
            {item.label}
          </Button>
        )
      })}
    </div>
  )
}

export default ButtonsSearch
