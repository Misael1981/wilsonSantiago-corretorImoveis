import Image from "next/image"

const WelcomeSobre = () => {
  return (
    <section className="bg-gradient-wilson-blue flex min-h-[40vh] w-full items-center justify-center">
      <div className="boxed flex flex-wrap-reverse items-center justify-around gap-12 p-6">
        <div className="max-w-xl">
          <h1 className="text-wilson-golden mb-4 text-center text-3xl font-bold lg:text-left">
            Um pouco sobre Wilson Santiago
          </h1>
          <p className="text-center text-lg font-medium text-white/70 lg:text-left">
            Conheça um pouco mais sobre Wilson Santiago, saiba mais sobre sua
            experiência no mercado e serviços prestados.
          </p>
        </div>
        <div>
          <Image
            src="/icons/logo-vertical.svg"
            alt="Logo Wilson Corretor Imóveis"
            width={200}
            height={200}
          />
        </div>
      </div>
    </section>
  )
}

export default WelcomeSobre
