"use client"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

const ImoveisBreadcrumb = () => {
  const pathname = usePathname()
  const [propertyTitle, setPropertyTitle] = useState("")
  const segments = (pathname || "").split("/").filter(Boolean)
  const isPropertyDetails =
    segments.length >= 2 && segments[0] === "imoveis" && !!segments[1]
  const slugOrId = isPropertyDetails ? segments[1] : null

  useEffect(() => {
    let active = true
    if (!slugOrId) {
      setPropertyTitle("")
      return
    }
    ;(async () => {
      try {
        const res = await fetch(`/api/imoveis/${slugOrId}`, {
          cache: "no-store",
        })
        if (!active) return
        if (res.ok) {
          const data = await res.json()
          setPropertyTitle(data?.title || "")
        } else {
          setPropertyTitle("")
        }
      } catch {
        if (active) setPropertyTitle("")
      }
    })()
    return () => {
      active = false
    }
  }, [slugOrId])

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
        {isPropertyDetails && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <span aria-current="page" className="font-semibold">
                {propertyTitle || "Detalhes"}
              </span>
            </BreadcrumbItem>
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  )
}

export default ImoveisBreadcrumb
