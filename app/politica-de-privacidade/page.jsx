import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import AnimatedContent from "@/components/AnimatedContent"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function PoliticaDePrivacidade() {
  return (
    <Card className="boxed p-0">
      <CardContent className="pt-8 pb-12">
        <div className="mb-8">
          <Link
            href="/"
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar
          </Link>
        </div>
        <main className="min-h-screen bg-white text-gray-800 md:px-20">
          <AnimatedContent
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-4xl"
          >
            <h1 className="mb-6 text-3xl font-bold text-gray-900 md:text-4xl">
              Política de Privacidade
            </h1>

            <p className="mb-10 text-sm text-gray-500">
              Última atualização: <strong>10 de outubro de 2025</strong>
            </p>

            <section className="space-y-6 leading-relaxed">
              <p>
                O corretor <strong>Wilson Santiago</strong> valoriza a sua
                privacidade e se compromete com a proteção dos dados pessoais de
                clientes, parceiros e visitantes do nosso site. Esta Política de
                Privacidade explica como coletamos, usamos e protegemos as
                informações fornecidas durante a navegação em{" "}
                <strong>https://wilsonsantiago-corretor.com.br/</strong>.
              </p>
              <h2 className="mt-10 text-xl font-semibold text-gray-900">
                1. Coleta de informações
              </h2>
              <p>Podemos coletar as seguintes informações:</p>
              <ul className="mt-2 list-inside list-disc space-y-1">
                <li>
                  Dados pessoais fornecidos voluntariamente (como nome,
                  telefone, e-mail e mensagem) por meio de formulários de
                  contato ou de interesse em imóveis.
                </li>
                <li>
                  Informações de navegação (como endereço IP, tipo de navegador,
                  tempo de permanência no site), coletadas automaticamente por
                  ferramentas de análise, como Google Analytics.
                </li>
              </ul>
              <h2 className="mt-10 text-xl font-semibold text-gray-900">
                2. Uso das informações
              </h2>
              <p>As informações coletadas são utilizadas para:</p>
              <ul className="mt-2 list-inside list-disc space-y-1">
                <li>
                  Entrar em contato com o usuário sobre imóveis ou serviços da
                  imobiliária.
                </li>
                <li>
                  Enviar informações, novidades ou promoções, caso o usuário
                  tenha autorizado.
                </li>
                <li>
                  Melhorar a experiência de navegação e personalizar o conteúdo
                  exibido.
                </li>
              </ul>
              <h2 className="mt-10 text-xl font-semibold text-gray-900">
                3. Compartilhamento de dados
              </h2>
              <p>
                O corretor <strong>Wilson Santiago</strong> não vende, aluga ou
                compartilha dados pessoais com terceiros, exceto:
              </p>
              <ul className="mt-2 list-inside list-disc space-y-1">
                <li>
                  Quando necessário para execução de serviços (ex: hospedagem de
                  site, provedores de e-mail).
                </li>
                <li>Quando exigido por lei ou decisão judicial.</li>
              </ul>
              <p>
                Em todos os casos, garantimos que os terceiros mantenham o mesmo
                nível de proteção e confidencialidade.
              </p>
              <h2 className="mt-10 text-xl font-semibold text-gray-900">
                4. Armazenamento e segurança dos dados
              </h2>
              <p>
                Os dados são armazenados em ambientes seguros e acessados apenas
                por pessoas autorizadas. Adotamos medidas técnicas e
                organizacionais adequadas para proteger contra perda, uso
                indevido, acesso não autorizado e divulgação indevida.
              </p>
              <h2 className="mt-10 text-xl font-semibold text-gray-900">
                5. Direitos do titular dos dados
              </h2>
              <p>
                De acordo com a Lei Geral de Proteção de Dados (LGPD - Lei nº
                13.709/2018), você tem direito de:
              </p>
              <ul className="mt-2 list-inside list-disc space-y-1">
                <li>Solicitar acesso, correção ou exclusão dos seus dados.</li>
                <li>
                  Revogar o consentimento para uso de dados pessoais a qualquer
                  momento.
                </li>
              </ul>
              Para exercer seus direitos, entre em contato pelo e-mail:{" "}
              <strong>santiagowilsonrodrigo@gmail.com</strong>.
              <h2 className="mt-10 text-xl font-semibold text-gray-900">
                6. Cookies
              </h2>
              <p>
                Utilizamos cookies para melhorar sua experiência no site. Você
                pode ajustar as configurações do seu navegador para recusar o
                uso de cookies, mas algumas partes do site podem não funcionar
                corretamente sem eles.
              </p>
              <h2 className="mt-10 text-xl font-semibold text-gray-900">
                7. Alterações nesta Política
              </h2>
              <p>
                Esta Política de Privacidade pode ser atualizada periodicamente.
                Recomendamos revisar esta página regularmente para se manter
                informado sobre como protegemos suas informações.
              </p>
              <h2 className="mt-10 text-xl font-semibold text-gray-900">
                8. Contato
              </h2>
              <p>
                Em caso de dúvidas sobre esta Política de Privacidade, entre em
                contato com <strong>Wilson Santiago</strong> pelo e-mail{" "}
                <strong>santiagowilsonrodrigo@gmail.com</strong>.
              </p>
            </section>
          </AnimatedContent>
        </main>
      </CardContent>
    </Card>
  )
}
