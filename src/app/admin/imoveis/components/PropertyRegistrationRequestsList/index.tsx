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
import { PropertyType } from "@/generated/prisma"

type PropertyRegistrationRequestsListProps = {
  properties: {
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
  }[]
}

const PropertyRegistrationRequestsList = ({
  properties,
}: PropertyRegistrationRequestsListProps) => {
  console.log("properties", properties)
  return (
    <section className="space-y-6 py-6">
      <h2 className="text-2xl font-semibold">
        Solicitações de Cadastro de Imóveis
      </h2>
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle>Casa com Área Gourmet</CardTitle>
              <CardDescription>
                Solicitação enviada em 05-06-2026
              </CardDescription>
            </div>

            <Badge variant="secondary">Casa</Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Proprietário */}
          <section className="space-y-3">
            <h3 className="text-muted-foreground text-sm font-semibold tracking-wide uppercase">
              Dados do Proprietário
            </h3>

            <div className="grid gap-3 md:grid-cols-2">
              <Info label="Nome" value="João da Silva" />
              <Info label="Email" value="joao.silva@example.com" />
              <Info label="Telefone" value="(11) 99999-9999" />
              <Info label="Localização" value="Centro • São Paulo" />
            </div>
          </section>

          {/* Imóvel */}
          <section className="space-y-3">
            <h3 className="text-muted-foreground text-sm font-semibold tracking-wide uppercase">
              Informações do Imóvel
            </h3>

            <div className="grid gap-4 md:grid-cols-3">
              <Info label="Preço" value="R$ 500.000,00" />

              <Info label="Área" value="120 m²" />

              <Info label="Quartos" value="3" />

              <Info label="Banheiros" value="2" />
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
          </section>
        </CardContent>

        <CardFooter className="flex items-center justify-between p-4">
          <Button variant="destructive">Rejeitar Cadastro</Button>
          <Button className="bg-gradient-wilson-blue">Aprovar Cadastro</Button>
        </CardFooter>
      </Card>
    </section>
  )
}

export default PropertyRegistrationRequestsList
