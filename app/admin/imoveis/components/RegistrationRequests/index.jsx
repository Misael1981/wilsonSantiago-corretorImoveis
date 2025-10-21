import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

const RegistrationRequests = ({ listings }) => {
  return (
    <section className="p-4">
      <h2 className="text-center text-2xl font-bold text-gray-900">
        Cadastro de Imóveis
      </h2>
      <Card>
        <CardContent>
          {listings.map((listing) => (
            <div key={listing.id}>
              <div className="flex items-center justify-between">
                <h3>{listing.title}</h3>
                <Badge>{listing.status}</Badge>
              </div>
              <div>
                <ul>
                  <li>
                    <span className="font-bold">Nome do solicitante:</span>{" "}
                    {listing.name}
                  </li>
                  <li>
                    <span className="font-bold">Telefone:</span> {listing.phone}
                  </li>
                  <li>
                    <span className="font-bold">Cidade:</span> {listing.city}
                  </li>
                  <li>
                    <span className="font-bold">Tipo:</span> {listing.type}
                  </li>
                  <li>
                    <span className="font-bold">Descrição:</span>{" "}
                    {listing.description}
                  </li>
                </ul>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </section>
  )
}

export default RegistrationRequests
