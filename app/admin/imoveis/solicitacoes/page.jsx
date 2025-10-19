import prisma from "@/lib/prisma"

export default async function SolicitacoesPage() {
  const listings = await prisma.listingRequest.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      phone: true,
      city: true,
      type: true,
      title: true,
      price: true,
      status: true,
      createdAt: true,
    },
  })

  return (
    <div className="p-6">
      <h1 className="mb-4 text-2xl font-semibold">Solicitações de Anúncio</h1>
      <div className="overflow-x-auto rounded border">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-3 py-2 text-left">Título</th>
              <th className="px-3 py-2 text-left">Tipo</th>
              <th className="px-3 py-2 text-left">Cidade</th>
              <th className="px-3 py-2 text-left">Cliente</th>
              <th className="px-3 py-2 text-left">Valor</th>
              <th className="px-3 py-2 text-left">Status</th>
              <th className="px-3 py-2 text-left">Criado em</th>
            </tr>
          </thead>
          <tbody>
            {listings.map((l) => (
              <tr key={l.id} className="border-t">
                <td className="px-3 py-2">{l.title}</td>
                <td className="px-3 py-2">{l.type}</td>
                <td className="px-3 py-2">{l.city}</td>
                <td className="px-3 py-2">{l.name} — {l.phone}</td>
                <td className="px-3 py-2">{l.price ? `R$ ${Math.round(l.price).toLocaleString("pt-BR")}` : "-"}</td>
                <td className="px-3 py-2">
                  <span className="rounded bg-slate-200 px-2 py-1">{l.status}</span>
                </td>
                <td className="px-3 py-2">
                  {new Date(l.createdAt).toLocaleDateString("pt-BR")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}