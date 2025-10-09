import Link from "next/link"
import SubTitle from "../SubTitle"
import { Card, CardContent } from "../ui/card"

const LinksBlogs = ({ articles }) => {
  const displayArticles = articles?.slice(0, 4) || []

  return (
    <section className="boxed my-4 p-4">
      <SubTitle title="Explore" className="mb-4" />
      <h3 className="mb-4 text-center text-lg font-bold lg:text-2xl">
        Explore Uma seleção de conteúdos que simplificam sua jornada de compra,
        venda ou manutenção dos seus imóveis
      </h3>
      <div className="flex flex-wrap items-stretch justify-center gap-4 lg:h-[520px]">
        <Link
          href={`/blog/${displayArticles[0].slug}`}
          className="group relative block h-[300px] w-[500px] max-w-[100%] overflow-hidden rounded-sm transition-transform hover:scale-105 lg:h-[516px] lg:w-[320px]"
        >
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${displayArticles[0].imageUrl || "/assets/casa.jpg"})`,
            }}
          />
          {/* Overlay escuro */}
          <div className="absolute inset-0 bg-black/50 transition-colors group-hover:bg-black/40" />

          {/* Conteúdo */}
          <div className="relative z-10 flex h-full flex-col justify-end p-6 text-white">
            <h4 className="mb-2 text-xl leading-tight font-bold">
              {displayArticles[0].title}
            </h4>
            <p className="line-clamp-3 text-sm text-gray-200">
              {displayArticles[0].excerpt}
            </p>
          </div>
        </Link>

        <div className="flex max-w-[100%] flex-col items-center justify-center gap-4">
          <Link
            href={`/blog/${displayArticles[1].slug}`}
            className="relative block h-[300px] w-[500px] max-w-[100%] overflow-hidden rounded-sm transition-transform hover:scale-105 lg:h-[250px] lg:w-[320px]"
          >
            {/* Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url(${displayArticles[1].imageUrl || "/assets/casa.jpg"})`,
              }}
            />
            {/* Overlay escuro */}
            <div className="absolute inset-0 bg-black/50 transition-colors group-hover:bg-black/40" />

            {/* Conteúdo */}
            <div className="relative z-10 flex h-full flex-col justify-end p-6 text-white">
              <h4 className="mb-2 text-xl leading-tight font-bold">
                {displayArticles[1].title}
              </h4>
              <p className="line-clamp-3 text-sm text-gray-200">
                {displayArticles[1].excerpt}
              </p>
            </div>
          </Link>
          <Link
            href={`/blog/${displayArticles[2].slug}`}
            className="relative block h-[300px] w-[500px] max-w-[100%] overflow-hidden rounded-sm transition-transform hover:scale-105 lg:h-[250px] lg:w-[320px]"
          >
            {/* Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url(${displayArticles[2].imageUrl || "/assets/casa.jpg"})`,
              }}
            />
            {/* Overlay escuro */}
            <div className="absolute inset-0 bg-black/50 transition-colors group-hover:bg-black/40" />

            {/* Conteúdo */}
            <div className="relative z-10 flex h-full flex-col justify-end p-6 text-white">
              <h4 className="mb-2 text-xl leading-tight font-bold">
                {displayArticles[2].title}
              </h4>
              <p className="line-clamp-3 text-sm text-gray-200">
                {displayArticles[2].excerpt}
              </p>
            </div>
          </Link>
        </div>
        <Link
          href={`/blog/${displayArticles[3].slug}`}
          className="group relative block h-[300px] w-[500px] max-w-[100%] overflow-hidden rounded-sm transition-transform hover:scale-105 lg:h-[516px] lg:w-[320px]"
        >
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${displayArticles[3].imageUrl || "/assets/casa.jpg"})`,
            }}
          />
          {/* Overlay escuro */}
          <div className="absolute inset-0 bg-black/50 transition-colors group-hover:bg-black/40" />

          {/* Conteúdo */}
          <div className="relative z-10 flex h-full flex-col justify-end p-6 text-white">
            <h4 className="mb-2 text-xl leading-tight font-bold">
              {displayArticles[3].title}
            </h4>
            <p className="line-clamp-3 text-sm text-gray-200">
              {displayArticles[3].excerpt}
            </p>
          </div>
        </Link>
      </div>
    </section>
  )
}

export default LinksBlogs
