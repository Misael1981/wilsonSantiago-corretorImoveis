"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"

export default function SeeMoreButton({
  hasMore,
  nextParams,
  pathname = "/imoveis",
}) {
  const [pending, setPending] = useState(false)
  const searchParams = useSearchParams()

  // Zera loading quando a URL muda (ex.: page/pageSize)
  useEffect(() => {
    if (pending) setPending(false)
  }, [searchParams, nextParams?.page, nextParams?.pageSize])

  const href = { pathname, query: nextParams }

  if (!hasMore) {
    return (
      <p className="text-muted-foreground text-sm">
        Você chegou ao fim dos resultados.
      </p>
    )
  }

  const currentPage = searchParams.get("page") ?? "1"
  const currentSize = searchParams.get("pageSize") ?? "12"
  const remountKey = `${currentPage}-${currentSize}`

  return (
    <div key={remountKey} className="my-8">
      <Link href={href} prefetch>
        <Button
          onClick={() => setPending(true)}
          disabled={pending}
          aria-busy={pending}
          className="bg-gradient-wilson-blue text-primary-foreground inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition hover:opacity-90"
        >
          {pending ? "Carregando..." : "+ Ver mais imóveis"}
        </Button>
      </Link>
    </div>
  )
}
