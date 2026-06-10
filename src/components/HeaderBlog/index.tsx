import Link from "next/link"

const HeaderBlog = () => {
  return (
    <header className="bg-[#f8f5ef] py-8 text-gray-900">
      <div className="mx-auto max-w-5xl px-4">
        {/* Masthead */}
        <div className="flex flex-col items-center justify-center gap-4">
          <div
            className="w-full space-y-2 text-center"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            {/* Reduzido o tracking no mobile (tracking-widest é 0.1em, ideal para textos micro) */}
            <p className="text-xs tracking-widest text-gray-600 uppercase">
              Jornal de Imóveis &amp; Dicas
            </p>

            {/* 🟢 CORRIGIDO: text-3xl no celular e text-5xl a partir do desktop */}
            <h1 className="text-3xl leading-tight font-bold tracking-wide">
              Wilson Corretor • Blog
            </h1>

            <p className="text-xs tracking-widest text-gray-600 uppercase">
              Edição digital • Fundado em 2025
            </p>
          </div>

          <div className="w-full">
            {/* Divider */}
            <div className="flex w-full items-center">
              {/* A mágica do border-t (borda superior de 1px) */}
              <div className="flex-1 border-t border-gray-300" />
              <span className="mx-3 text-[10px] tracking-widest text-gray-500">
                • • •
              </span>
              <div className="flex-1 border-t border-gray-300" />
            </div>
            {/* Navegação */}
            <nav className="w-full py-2">
              {/* 🟢 CORRIGIDO: tracking normalizado para evitar quebras bizarras de tamanho */}
              <ul className="flex flex-wrap items-center justify-center gap-4 text-xs font-medium tracking-wider uppercase md:text-sm">
                <li>
                  <Link href="/" className="text-gray-500 hover:text-gray-600">
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/imoveis"
                    className="text-gray-500 transition-colors hover:text-gray-600"
                  >
                    Imóveis
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog"
                    className="text-gray-500 transition-colors hover:text-gray-600"
                  >
                    Blog
                  </Link>
                </li>
              </ul>
            </nav>
            {/* Bottom rule - Agora com largura total garantida */}
            <div className="w-full border-b border-gray-300 py-1" />
          </div>
        </div>
      </div>
    </header>
  )
}

export default HeaderBlog
