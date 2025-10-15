import Link from "next/link"

const sections = [
  { label: "Notícias", href: "/blog?tag=noticias" },
  { label: "Dicas", href: "/blog?tag=dicas" },
  { label: "Financiamento", href: "/blog?tag=financiamento" },
  { label: "Mercado", href: "/blog?tag=mercado" },
  { label: "Guia do comprador", href: "/blog?tag=guia" },
]

const WelcomeBlogs = () => {
  return (
    <section className="boxed p-4">
      <div className="mx-auto max-w-5xl">
        <div className="grid gap-6 md:grid-cols-3">
          {/* Intro editorial */}
          <div className="md:col-span-2">
            <div style={{ fontFamily: "var(--font-playfair)" }}>
              <h2 className="text-2xl font-bold text-gray-900">
                Bem-vindo ao nosso Blog
              </h2>
            </div>
            <p className="mt-2 text-sm text-gray-700">
              Novidades do mercado imobiliário, dicas práticas para comprar e
              vender, e conteúdos para te ajudar a tomar decisões com segurança.
              Explore as seções abaixo.
            </p>

            {/* Seções (chips) */}
            <ul className="mt-4 flex flex-wrap gap-2">
              {sections.map((s) => (
                <li key={s.href}>
                  <Link
                    href={s.href}
                    className="rounded-full border border-gray-300 px-3 py-1 text-xs tracking-wide text-gray-700 uppercase hover:bg-gray-100"
                  >
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Busca GET simples */}
            <form
              action="/blog"
              method="GET"
              className="mt-4 flex max-w-md gap-2"
            >
              <input
                type="search"
                name="q"
                placeholder="Buscar artigos"
                className="w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-600"
                aria-label="Buscar artigos"
              />
              <button
                type="submit"
                className="rounded-md bg-blue-700 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-800"
              >
                Buscar
              </button>
            </form>
          </div>

          {/* Callout editorial */}
          <aside className="rounded-md border bg-[#f8f5ef] p-4">
            <div style={{ fontFamily: "var(--font-playfair)" }}>
              <h3 className="text-lg font-semibold text-gray-900">
                Edição semanal
              </h3>
            </div>
            <p className="mt-2 text-sm text-gray-700">
              Receba dicas e análises direto no seu e-mail. Em breve, newsletter
              com conteúdos exclusivos.
            </p>
            <Link
              href="/sobre"
              className="mt-3 inline-block text-sm font-semibold text-blue-700 hover:underline"
            >
              Saiba mais
            </Link>
          </aside>
        </div>
      </div>
    </section>
  )
}

export default WelcomeBlogs
