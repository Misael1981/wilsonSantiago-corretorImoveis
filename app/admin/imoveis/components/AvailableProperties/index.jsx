import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MoreHorizontal } from "lucide-react"

const AvailableProperties = ({ properties }) => {
  return (
    <div className="rounded-md border">
      {properties.length === 0 ? (
        <div className="text-muted-foreground p-4 text-sm">
          Nenhum imóvel encontrado.
        </div>
      ) : (
        <ul className="space-y-4">
          {properties.map((p) => (
            <li key={p.id} className="p-4">
              <Card className="w-full">
                <CardContent className="flex items-center justify-between p-4">
                  <div>
                    <div className="font-medium">{p.title}</div>
                    <div className="text-muted-foreground text-sm">
                      {p.type} •{" "}
                      <Badge className="bg-green-500 text-xs font-medium text-white">
                        {p.status}
                      </Badge>{" "}
                      • {p.city}
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="font-semibold">
                        {typeof p.price === "number"
                          ? p.price.toLocaleString("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            })
                          : "-"}
                      </div>
                      <div className="text-muted-foreground text-xs">
                        {new Date(p.createdAt).toLocaleDateString("pt-BR")}
                      </div>
                    </div>
                    <div>
                      <Button
                        className="border-accent border"
                        variant="ghost"
                        size="sm"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default AvailableProperties
