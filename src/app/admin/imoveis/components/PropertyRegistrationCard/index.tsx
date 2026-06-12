import { Info } from "@/components/Info"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { TYPES_lABELS } from "@/constants/maps-enums"
import { PropertyType } from "@/generated/prisma"
import { formatArea } from "@/helpers/format-area"
import { formatCurrency } from "@/helpers/format-currency"
import { formatDate } from "@/helpers/format-date"

type PropertyRegistrationCardProps = {
  propertie: {
    area: number | null
    title: string
    name: string
    id: string
    email: string | null
    phone: string
    createdAt: Date
    type: PropertyType
    description: string | null
    price: number | null
    bedrooms: number | null
    imageUrls: string[]
    neighborhood: string | null
    city: string
  }
}

const PropertyRegistrationCard = ({
  propertie,
}: PropertyRegistrationCardProps) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle>{propertie.title}</CardTitle>
            <CardDescription>
              Solicitação enviada em {formatDate(propertie.createdAt)}
            </CardDescription>
          </div>

          <Badge variant="secondary">{TYPES_lABELS[propertie.type]}</Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Proprietário */}
        <section className="space-y-3">
          <h3 className="text-muted-foreground text-sm font-semibold tracking-wide uppercase">
            Dados do Proprietário
          </h3>

          <div className="grid gap-3 md:grid-cols-2">
            <Info label="Nome" value={propertie.name} />
            <Info
              label="Email"
              value={propertie.email || "Email não informado"}
            />
            <Info label="Telefone" value={propertie.phone} />
            <Info
              label="Localização"
              value={`${propertie.neighborhood} - ${propertie.city}}`}
            />
          </div>
        </section>

        {/* Imóvel */}
        <section className="space-y-3">
          <h3 className="text-muted-foreground text-sm font-semibold tracking-wide uppercase">
            Informações do Imóvel
          </h3>

          <div className="grid gap-4 md:grid-cols-3">
            <Info label="Preço" value={formatCurrency(propertie.price!)} />

            <Info label="Área" value={formatArea(propertie.area!)} />

            <Info
              label="Quartos"
              value={propertie.bedrooms?.toString() || "Dado não informado!"}
            />
          </div>

          <div className="bg-muted/30 rounded-lg border p-4">
            <p className="text-sm leading-relaxed">
              {propertie.description || "Descrição não informada!"}
            </p>
          </div>
        </section>
      </CardContent>

      <CardFooter className="flex items-center justify-between p-4">
        <Button variant="destructive">Rejeitar Cadastro</Button>
        <Button className="bg-gradient-wilson-blue">Aprovar Cadastro</Button>
      </CardFooter>
    </Card>
  )
}

export default PropertyRegistrationCard
