import Link from "next/link"
import SubTitle from "../SubTitle"
import { Card, CardContent } from "../ui/card"

const LinksBlogs = ({ articles }) => {
  const displayArticles = Array.isArray(articles) ? articles.slice(0, 4) : []

  const a0 = displayArticles[0]
  const a1 = displayArticles[1]
  const a2 = displayArticles[2]
  const a3 = displayArticles[3]

  return (
    <section className="boxed my-4 p-4">
      <SubTitle title="Explore" className="mb-4" />
      <h3 className="mb-4 text-center text-lg font-bold lg:text-2xl">
        Explore Uma seleção de conteúdos que simplificam sua jornada de compra,
        venda ou manutenção dos seus imóveis
      </h3>
      <div className="flex flex-wrap items-stretch justify-center gap-4 lg:h-[520px]">
        {/* Slot 1 */}
        <Link
          href={a0 ? `/blog/${a0.slug}` : `/blog`}
          className="group relative block h-[300px] w-[500px] max-w-[100%] overflow-hidden rounded-sm transition-transform hover:scale-105 lg:h-[516px] lg:w-[320px]"
        >
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${a0?.imageUrl || "/assets/casa.jpg"})`,
            }}
          />
          <div className="absolute inset-0 bg-black/50 transition-colors group-hover:bg-black/40" />
          <div className="relative z-10 flex h-full flex-col justify-end p-6 text-white">
            <h4 className="mb-2 text-xl leading-tight font-bold">
              {a0?.title || "Sem artigos disponíveis"}
            </h4>
            <p className="line-clamp-3 text-sm text-gray-200">
              {a0?.excerpt || "Visite o Blog para novidades."}
            </p>
          </div>
        </Link>

        {/* Slot 2 e 3 */}
        <div className="flex max-w-[100%] flex-col items-center justify-center gap-4">
          <Link
            href={a1 ? `/blog/${a1.slug}` : `/blog`}
            className="relative block h-[300px] w-[500px] max-w-[100%] overflow-hidden rounded-sm transition-transform hover:scale-105 lg:h-[250px] lg:w-[320px]"
          >
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url(${a1?.imageUrl || "/assets/casa.jpg"})`,
              }}
            />
            <div className="absolute inset-0 bg-black/50 transition-colors group-hover:bg-black/40" />
            <div className="relative z-10 flex h-full flex-col justify-end p-6 text-white">
              <h4 className="mb-2 text-xl leading-tight font-bold">
                {a1?.title || "Sem artigos disponíveis"}
              </h4>
              <p className="line-clamp-3 text-sm text-gray-200">
                {a1?.excerpt || "Visite o Blog para novidades."}
              </p>
            </div>
          </Link>

          <Link
            href={a2 ? `/blog/${a2.slug}` : `/blog`}
            className="relative block h-[300px] w-[500px] max-w-[100%] overflow-hidden rounded-sm transition-transform hover:scale-105 lg:h-[250px] lg:w-[320px]"
          >
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url(${a2?.imageUrl || "/assets/casa.jpg"})`,
              }}
            />
            <div className="absolute inset-0 bg-black/50 transition-colors group-hover:bg-black/40" />
            <div className="relative z-10 flex h-full flex-col justify-end p-6 text-white">
              <h4 className="mb-2 text-xl leading-tight font-bold">
                {a2?.title || "Sem artigos disponíveis"}
              </h4>
              <p className="line-clamp-3 text-sm text-gray-200">
                {a2?.excerpt || "Visite o Blog para novidades."}
              </p>
            </div>
          </Link>
        </div>

        {/* Slot 4 */}
        <Link
          href={a3 ? `/blog/${a3.slug}` : `/blog`}
          className="group relative block h-[300px] w-[500px] max-w-[100%] overflow-hidden rounded-sm transition-transform hover:scale-105 lg:h-[516px] lg:w-[320px]"
        >
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${a3?.imageUrl || "/assets/casa.jpg"})`,
            }}
          />
          <div className="absolute inset-0 bg-black/50 transition-colors group-hover:bg-black/40" />
          <div className="relative z-10 flex h-full flex-col justify-end p-6 text-white">
            <h4 className="mb-2 text-xl leading-tight font-bold">
              {a3?.title || "Sem artigos disponíveis"}
            </h4>
            <p className="line-clamp-3 text-sm text-gray-200">
              {a3?.excerpt || "Visite o Blog para novidades."}
            </p>
          </div>
        </Link>
      </div>
    </section>
  )
}

export default LinksBlogs
