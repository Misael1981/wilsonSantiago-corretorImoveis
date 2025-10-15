import prisma from "@/lib/prisma"
import Link from "next/link"

export default async function SectionBar({ activeSlug }) {
  let tags = []
  try {
    tags = await prisma.tag.findMany({
      orderBy: { name: "asc" },
      select: { id: true, name: true, slug: true, color: true },
    })
  } catch {
    tags = []
  }

  if (!Array.isArray(tags) || tags.length === 0) {
    return (
      <div className="boxed p-4">
        <div className="rounded-md border bg-white p-4 text-center text-sm text-gray-600">
          Nenhuma seção disponível no momento.
        </div>
      </div>
    )
  }

  return (
    <nav className="boxed p-4">
      <ul className="flex flex-wrap items-center gap-2">
        {tags.map((t) => {
          const isActive = t.slug === activeSlug
          return (
            <li key={t.id}>
              <Link
                href={`/blog/tag/${t.slug}`}
                className={[
                  "rounded-full border px-3 py-1 text-xs font-semibold",
                  "transition-colors",
                  isActive
                    ? "border-gray-800 bg-[#f8f5ef] text-gray-900"
                    : "border-gray-300 bg-white text-gray-700 hover:bg-gray-100",
                ].join(" ")}
                style={t.color ? { borderColor: t.color } : undefined}
                aria-current={isActive ? "page" : undefined}
              >
                {t.name}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}