import Link from "next/link"

type PaginationButtonsProps = {
  currentPage: number
  totalPages: number
}

const PaginationButtons = ({
  currentPage,
  totalPages,
}: PaginationButtonsProps) => {
  return (
    <div className="flex items-center justify-center gap-6 py-4">
      {/* Botão Anterior */}
      <Link
        href={`/imoveis?page=${currentPage - 1}`}
        className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
      >
        Anterior
      </Link>

      {/* Botão Próximo */}
      <Link
        href={`/imoveis?page=${currentPage + 1}`}
        className={
          currentPage === totalPages ? "pointer-events-none opacity-50" : ""
        }
      >
        Próximo
      </Link>
    </div>
  )
}

export default PaginationButtons
