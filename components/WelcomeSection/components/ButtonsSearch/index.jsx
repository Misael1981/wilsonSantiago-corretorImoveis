import { Button } from "@/components/ui/button"

const BUTTONS_SEARCH = [
  {
    label: "Residencial",
    type: "outline",
  },
  {
    label: "Comercial",
    type: "outline",
  },
  {
    label: "Outros Tipos",
    type: "outline",
  },
]

const ButtonsSearch = () => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      {BUTTONS_SEARCH.map(({ label, type }) => (
        <Button
          className="border border-blue-900 !bg-transparent text-blue-900"
          key={label}
          variant={type}
        >
          {label}
        </Button>
      ))}
    </div>
  )
}

export default ButtonsSearch
