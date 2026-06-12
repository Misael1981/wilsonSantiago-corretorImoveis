import { Info } from "@/components/Info"
import { Card, CardContent } from "@/components/ui/card"
import { TYPES_lABELS } from "@/constants/maps-enums"
import { PropertyType } from "@/generated/prisma"
import { formatCurrency } from "@/helpers/format-currency"
import { formatDate } from "@/helpers/format-date"

type PropertieOrderedCardProps = {
  propertie: {
    name: string
    id: string
    phone: string
    createdAt: Date
    type: PropertyType
    description: string | null
    neighborhood: string | null
    city: string
    minPrice: number | null
    maxPrice: number | null
  }
}

const PropertieOrderedCard = ({ propertie }: PropertieOrderedCardProps) => {
  return (
    <Card>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-muted-foreground text-sm font-semibold tracking-wide uppercase">
            Dados do Solicitante
          </h3>
          <div className="grid gap-3 md:grid-cols-2">
            <Info label="Nome" value={propertie.name} />
            <Info label="Telefone" value={propertie.phone} />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-muted-foreground text-sm font-semibold tracking-wide uppercase">
            Preferências do Imóvel
          </h3>
          <div className="grid gap-3 md:grid-cols-2">
            <Info label="Tipo do Imóvel" value={TYPES_lABELS[propertie.type]} />
            <Info
              label="Bairro"
              value={propertie.neighborhood || "Dado não informado!"}
            />
            <Info label="Cidade" value={propertie.city} />
          </div>
        </div>

        <div className="bg-muted/30 rounded-lg border p-4">
          <p className="text-sm leading-relaxed">{propertie.description}</p>
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          <Info
            label="Preço Mínimo"
            value={formatCurrency(propertie.minPrice!)}
          />
          <Info
            label="Preço Máximo"
            value={formatCurrency(propertie.maxPrice!)}
          />
        </div>

        <div className="space-y-2 rounded-lg border bg-blue-100/50 p-4">
          <p className="text-xs text-blue-700">Solicitação Registrada em:</p>
          <p className="text-sm leading-relaxed">
            {formatDate(propertie.createdAt)}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

export default PropertieOrderedCard
