import { Button } from "@/components/ui/button"

const SubTitleImoveis = () => {
  return (
    <section className="flex w-full flex-wrap items-center justify-between p-4">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Gerenciar Imóveis</h2>
        <p className="text-gray-600">
          Gerencie imóveis, cadastre imóveis e encomendas de imóveis
        </p>
      </div>
      <div className="">
        <Button className="bg-gradient-wilson-blue px-6 py-4 text-lg text-white">
          + Novo Imóvel
        </Button>
      </div>
    </section>
  )
}

export default SubTitleImoveis
