import { PrismaAdapter } from "@auth/prisma-adapter"
import { db } from "./prisma"
import GoogleProvider from "next-auth/providers/google"

export const authOptions = {
  adapter: PrismaAdapter(db),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      // Quando criar/pegar o usuário, injeta o role no token
      if (user) {
        token.role = user.role
      }
      return token
    },
    async session({ session, token }) {
      session.user = {
        ...session.user,
        id: token.sub,
        role: token.role,
      }
      return session
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
}
