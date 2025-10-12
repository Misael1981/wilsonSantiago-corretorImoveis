import { PrismaClient } from "@prisma/client"

const globalForPrisma = globalThis

// Em dev, reutiliza a instância por causa do hot-reload.
// Em produção, cria apenas uma instância.
const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    // Logar apenas erros para reduzir o ruído no terminal
    log: ["error"],
  })

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma

export default prisma