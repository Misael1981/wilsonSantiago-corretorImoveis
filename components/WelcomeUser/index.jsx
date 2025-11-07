"use client"

import { useSession } from "next-auth/react"
import { Avatar, AvatarImage } from "../ui/avatar"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

const WelcomeUser = () => {
  const { data } = useSession()
  return (
    <section className="">
      <div className="w-fit">
        {data?.user ? (
          <div className="flex max-w-[250px] items-center gap-2 xl:max-w-[300px]">
            <Avatar>
              <AvatarImage
                src={data?.user?.image}
                alt={data?.user?.name}
                width={6}
                height={6}
              />
            </Avatar>
            <div>
              <h3 className="truncate text-xl leading-none lg:text-lg xl:text-xl">
                Olá, <strong>{data?.user?.name}</strong>
              </h3>
              <p className="truncate leading-none text-gray-400">
                <span className="text-sm capitalize">
                  {format(new Date(), "EEEE, dd", { locale: ptBR })}
                </span>
                <span className="text-sm">&nbsp;de&nbsp;</span>
                <span className="text-sm capitalize">
                  {format(new Date(), "MMMM", { locale: ptBR })}
                </span>
              </p>
            </div>
          </div>
        ) : (
          <div>
            <h3 className="text-xl leading-none">
              Ola, <strong>faça seu login</strong>
            </h3>
            <p className="leading-none text-gray-400">
              <span className="text-sm capitalize">
                {format(new Date(), "EEEE, dd", { locale: ptBR })}
              </span>
              <span className="text-sm">&nbsp;de&nbsp;</span>
              <span className="text-sm capitalize">
                {format(new Date(), "MMMM", { locale: ptBR })}
              </span>
            </p>
          </div>
        )}
      </div>
    </section>
  )
}

export default WelcomeUser
