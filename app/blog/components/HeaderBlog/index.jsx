// HeaderBlog (component)
import Link from "next/link"

const HeaderBlog = () => {
  return (
    <header className="bg-[#f8f5ef] text-gray-900">
      <div className="mx-auto max-w-5xl px-4 py-8">
        {/* Masthead */}
        <div className="flex flex-col items-center justify-center">
          <div
            className="text-center"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            <p className="mb-1 text-xs tracking-[0.2em] text-gray-600 uppercase">
              Jornal de Imóveis &amp; Dicas
            </p>
            <h1 className="text-4xl font-bold tracking-wide">
              Wilson Corretor • Blog
            </h1>
            <p className="mt-1 text-xs tracking-[0.2em] text-gray-600 uppercase">
              Edição digital • Fundado em 2025
            </p>
          </div>

          {/* Divider */}
          <div className="mt-6 flex w-full items-center">
            <span className="h-px flex-1 bg-gray-300" />
            <span className="mx-3 text-[10px] tracking-[0.3em] text-gray-600">
              • • •
            </span>
            <span className="h-px flex-1 bg-gray-300" />
          </div>

          {/* Navegação */}
          <nav className="mt-4">
            <ul className="flex flex-wrap items-center justify-center gap-6 text-sm tracking-[0.2em] uppercase">
              <li>
                <Link
                  href="/"
                  className="transition-colors hover:text-gray-700"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/imoveis"
                  className="transition-colors hover:text-gray-700"
                >
                  Imóveis
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="transition-colors hover:text-gray-700"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/sobre"
                  className="transition-colors hover:text-gray-700"
                >
                  Sobre
                </Link>
              </li>
            </ul>
          </nav>

          {/* Bottom rule */}
          <div className="mt-4 h-px w-full bg-gray-300" />
        </div>
      </div>
    </header>
  )
}

export default HeaderBlog
