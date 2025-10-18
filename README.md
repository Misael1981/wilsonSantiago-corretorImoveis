This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

```
"use client"

import { useSession } from "next-auth/react"
import { Avatar, AvatarImage } from "../ui/avatar"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

const WelcomeUser = () => {
  const { data } = useSession()
  return (
    <section className="boxed p-4 lg:flex lg:items-end lg:justify-end">
      <div className="w-fit">
        {data?.user ? (
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage
                src={data?.user?.image}
                alt={data?.user?.name}
                width={6}
                height={6}
              />
            </Avatar>
            <h3 className="text-xl leading-none">
              Olá, <strong>{data?.user?.name}</strong>
            </h3>
          </div>
        ) : (
          <h3 className="text-xl leading-none">
            Ola, <strong>faça seu login</strong>
          </h3>
        )}
        <p className="ml-10 leading-none">
          <span className="text-sm text-gray-700 capitalize">
            {format(new Date(), "EEEE, dd", { locale: ptBR })}
          </span>
          <span className="text-sm text-gray-700">&nbsp;de&nbsp;</span>
          <span className="text-sm text-gray-700 capitalize">
            {format(new Date(), "MMMM", { locale: ptBR })}
          </span>
        </p>
      </div>
    </section>
  )
}

export default WelcomeUser

```
