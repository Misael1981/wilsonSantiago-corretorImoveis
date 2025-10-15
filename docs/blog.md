```
<div className="min-h-screen bg-[#f8f5ef] font-serif text-gray-900">
        <section className="mx-auto max-w-5xl px-4 py-10">
          <Card className="border-0 bg-transparent shadow-none">
            <Image
              src={posts[0].imageUrl}
              alt="Imagem principal"
              width={1200}
              height={600}
              className="rounded-lg grayscale transition-all duration-300 hover:grayscale-0"
            />
            <CardContent className="mt-4 space-y-2">
              <h2 className="text-3xl leading-tight font-bold">
                O futuro das imobiliárias digitais
              </h2>
              <p className="leading-relaxed text-gray-700">
                Plataformas online, inteligência artificial e experiências
                personalizadas estão redefinindo o mercado imobiliário moderno.
                Saiba como as imobiliárias estão se adaptando.
              </p>
              <p className="text-sm text-gray-500 italic">
                Por Redação Essenza
              </p>
            </CardContent>
          </Card>
        </section>

        <Separator className="mx-auto max-w-5xl" />

        {/* Grid de artigos */}
        <section className="mx-auto grid max-w-5xl gap-10 px-4 py-10 md:grid-cols-2">
          {posts.map((article) => (
            <Card
              key={article.id}
              className="group border-0 bg-transparent shadow-none"
            >
              <Image
                src={article.imageUrl}
                alt={article.title}
                width={600}
                height={300}
                className="rounded-md grayscale transition-all duration-300 group-hover:grayscale-0"
              />
              <CardContent className="mt-3 space-y-2">
                <h3 className="text-xl leading-tight font-bold transition-colors group-hover:text-gray-800">
                  {article.title}
                </h3>
                <p className="text-sm leading-relaxed text-gray-700">
                  {article.excerpt}
                </p>
                <p className="text-xs text-gray-500 italic">
                  {article.author} — {article.date}
                </p>
              </CardContent>
            </Card>
          ))}
        </section>
      </div>
      <section className="boxed p-4">
        <h1 className="mb-2 text-2xl font-bold">Blog</h1>
        {posts.map((post) => (
          <div key={post.id} className="mb-4">
            <h2 className="text-xl font-bold">{post.title}</h2>
            <p className="text-gray-600">{post.excerpt}</p>
            <a
              href={`/blog/${post.slug}`}
              className="text-blue-500 hover:underline"
            >
              Ler mais
            </a>
          </div>
        ))}
      </section>
      <footer className="border-t border-gray-300 py-8 text-center text-sm text-gray-600">
        <p>© 2025 Essenza Imobiliária — Todos os direitos reservados.</p>
      </footer>
```
