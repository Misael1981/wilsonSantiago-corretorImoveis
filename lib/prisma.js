import { PrismaClient } from "@prisma/client"

const globalForPrisma = globalThis

const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    // Logar apenas erros para reduzir o ruído no terminal
    log: ["error"],
  })

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma

export default prisma
export const db = prisma
