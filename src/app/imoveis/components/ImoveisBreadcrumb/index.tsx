import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import Link from "next/link"

type ImoveisBreadcrumbProps = {
  propertyTitle?: string | null
}

const ImoveisBreadcrumb = ({ propertyTitle }: ImoveisBreadcrumbProps) => {
  return (
    <Breadcrumb>
      <BreadcrumbList className="text-blue-700">
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/">Home</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />

        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/imoveis">Imóveis à venda</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>

        {propertyTitle && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem className="min-w-0">
              {" "}
              {/* O min-w-0 ajuda o flex pai a aceitar o corte */}
              <span
                aria-current="page"
                className="xs:max-w-[200px] block max-w-[150px] truncate font-semibold text-blue-700 sm:max-w-100 md:max-w-none"
                title={propertyTitle} // Dica de ouro: se o usuário segurar o dedo ou passar o mouse, ele vê o título completo!
              >
                {propertyTitle}
              </span>
            </BreadcrumbItem>
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  )
}

export default ImoveisBreadcrumb
