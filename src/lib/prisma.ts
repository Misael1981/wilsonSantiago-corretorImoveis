import { PrismaClient } from "@/generated/prisma"
import { PrismaPg } from "@prisma/adapter-pg"

type GlobalWithPrisma = {
  prisma?: PrismaClient
}

const globalForPrisma = globalThis as unknown as GlobalWithPrisma

function makePrisma() {
  const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! })
  return new PrismaClient({
    adapter,
    log: ["error"],
  })
}

const prisma = globalForPrisma.prisma ?? makePrisma()

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma

export default prisma
export const db = prisma
export { Prisma } from "@/generated/prisma"
