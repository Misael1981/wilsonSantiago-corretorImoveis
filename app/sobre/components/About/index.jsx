import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"

const About = () => {
  return (
    <section className="boxed p-4">
      <Card>
        <CardContent className="flex flex-wrap items-center justify-between gap-4">
          <div className="relative h-[520px] w-full lg:w-1/3 lg:flex-shrink-0">
            <Image
              src="/assets/foto-wilson.jpg"
              alt="Wilson Santiago"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="rounded-md object-cover"
            />
          </div>
          <div className="w-full lg:max-w-[60%]">
            <p className="text-sm lg:text-base">
              Atuante como corretor de destaque na Essenza Imobiliária, Wilson
              Santiago é formado em Transações Imobiliárias pelo Instituto de
              Ensino Star Brasil e se consolidou como um profissional
              reconhecido pela sua dedicação, ética e compromisso em cada
              negociação. Pai do Lucas e da Mariana e casado com sua esposa,
              Wilson tem na família sua principal motivação para crescer e
              servir com excelência. Antes de ingressar no mercado imobiliário,
              Wilson construiu uma sólida trajetória na indústria, onde se
              formou em Gestão de Produção Industrial e atuou por vários anos em
              cargos que exigiam responsabilidade, planejamento e liderança.
              Essa experiência o ajudou a desenvolver uma visão analítica e
              estratégica, habilidades que hoje aplica com maestria no setor
              imobiliário. Apesar do sucesso na área industrial, Wilson sentia o
              desejo de trabalhar mais próximo das pessoas, em uma profissão que
              lhe permitisse contribuir de forma direta para a realização de
              sonhos e conquistas. Foi então que decidiu migrar para o mercado
              imobiliário, encontrando na corretagem a oportunidade de unir
              propósito e profissão. Desde então, Wilson vem se destacando por
              seu atendimento humanizado, pela transparência nas negociações e
              pela capacidade de compreender as reais necessidades de cada
              cliente. Para ele, cada venda representa muito mais do que um
              negócio — é a chance de participar de um novo capítulo na vida das
              pessoas, ajudando famílias a encontrarem o lar ideal e
              investidores a fazerem escolhas seguras e conscientes.
            </p>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}

export default About
