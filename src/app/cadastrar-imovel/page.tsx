import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import ListingRequestForm from "./components/ListingRequestForm"

export default async function RegisterPropertyPage() {
  return (
    <div className="bg-gradient-wilson-blue min-h-screen w-full space-y-4 p-4 lg:space-y-6">
      <div>
        <Link
          href="/"
          className="flex items-center gap-2 text-gray-100 hover:text-gray-100"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar
        </Link>
      </div>

      <main className="flex flex-col items-center justify-center">
        <ListingRequestForm />
      </main>
    </div>
  )
}
