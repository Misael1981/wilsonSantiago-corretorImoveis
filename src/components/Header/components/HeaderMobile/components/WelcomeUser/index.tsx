import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { useSession } from "next-auth/react"

const WelcomeUser = () => {
  const { data } = useSession()

  console.log("Imagem está sendo carregada:", data?.user?.image)

  return (
    <div className="w-fit">
      {data?.user ? (
        <div className="max-62 flex items-center gap-2 xl:max-w-75">
          <Avatar>
            <AvatarImage
              src={data?.user?.image ?? ""}
              alt={data?.user?.name || "Avatar do usuário"}
              width={6}
              height={6}
            />
          </Avatar>
          <div>
            <h3 className="truncate text-xl leading-none lg:text-base">
              Olá, <strong>{data?.user?.name}</strong>
            </h3>
            <p className="truncate text-xs leading-none text-gray-400">
              <span className="capitalize">
                {format(new Date(), "EEEE, dd", { locale: ptBR })}
              </span>
              <span>&nbsp;de&nbsp;</span>
              <span className="capitalize">
                {format(new Date(), "MMMM", { locale: ptBR })}
              </span>
            </p>
          </div>
        </div>
      ) : (
        <div>
          <div>
            <h3 className="truncate text-xl leading-none lg:text-base">
              Ola, <strong>faça seu login</strong>
            </h3>
            <p className="truncate text-xs leading-none text-gray-400">
              <span className="text-sm capitalize">
                {format(new Date(), "EEEE, dd", { locale: ptBR })}
              </span>
              <span className="text-sm">&nbsp;de&nbsp;</span>
              <span className="text-sm capitalize">
                {format(new Date(), "MMMM", { locale: ptBR })}
              </span>
            </p>
          </div>
          <p className="text-sm text-gray-300 lg:hidden">
            Faça login com sua conta Google e não perca nenhuma oportunidade.
            Receba notificações assim que novos imóveis forem publicados e
            acompanhe tudo em primeira mão.
          </p>
        </div>
      )}
    </div>
  )
}

export default WelcomeUser
