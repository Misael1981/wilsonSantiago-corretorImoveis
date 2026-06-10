import { Info } from "@/components/Info"
import { Card, CardContent } from "@/components/ui/card"
import { PropertyType } from "@/generated/prisma"

type ListPropertiesOrderedProps = {
  properties: {
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
  }[]
}

const ListPropertiesOrdered = ({ properties }: ListPropertiesOrderedProps) => {
  console.log("properties", properties)
  return (
    <section className="space-y-6 py-6">
      <h2 className="text-2xl font-semibold">Lista de Imóveis Encomendados</h2>
      <Card>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-muted-foreground text-sm font-semibold tracking-wide uppercase">
              Dados do Solicitante
            </h3>
            <div className="grid gap-3 md:grid-cols-2">
              <Info label="Nome" value="Maria Oliveira" />
              <Info label="Telefone" value="(35) 99999-9999" />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-muted-foreground text-sm font-semibold tracking-wide uppercase">
              Preferências do Imóvel
            </h3>
            <div className="grid gap-3 md:grid-cols-2">
              <Info label="Tipo do Imóvel" value="Apartamento" />
              <Info label="Cidade" value="Pouso Alegre" />
              <Info label="Bairro" value="Centro" />
            </div>
          </div>

          <div className="bg-muted/30 rounded-lg border p-4">
            <p className="text-sm leading-relaxed">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iusto
              ipsa laborum repudiandae. Sapiente tenetur, ut tempore accusamus
              unde doloremque aperiam. Voluptatum id possimus molestiae quo
              mollitia eaque cum similique asperiores necessitatibus quam rem,
              obcaecati cupiditate veritatis magni consequuntur itaque
              dignissimos dolores quisquam ex? Dolore, harum. Dignissimos
              aliquid voluptate culpa dolore numquam optio aspernatur earum ea
              impedit, mollitia praesentium iure vel!
            </p>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            <Info label="Preço Mínimo" value="R$ 500.000,00" />
            <Info label="Preço Máximo" value="R$ 1.000.000,00" />
          </div>

          <div className="space-y-2 rounded-lg border bg-blue-100/50 p-4">
            <p className="text-xs text-blue-700">Solicitação Registrada em:</p>
            <p className="text-sm leading-relaxed">
              02 de Junho de 2026 às 14:30
            </p>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}

export default ListPropertiesOrdered
