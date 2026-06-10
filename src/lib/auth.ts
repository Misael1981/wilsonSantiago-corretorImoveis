import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { db } from "./prisma"
import GoogleProvider from "next-auth/providers/google"

export const { handlers, auth, signIn } = NextAuth({
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
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id
        token.role = user.role
        token.phone = user.phone
      }

      if (trigger === "update" && session) {
        token.phone = session.phone
      }

      return token
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.role = token.role as string
        session.user.phone = token.phone as string
      }
      return session
    },
  },
})
