"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import { LogOut, User } from "lucide-react"
import DialogLogin from "../DailogLogin"
import { signOut, useSession } from "next-auth/react"

const ButtonLogin = () => {
  const { data } = useSession()

  const handleLogout = async () => {
    await signOut("google")
  }
  return (
    <>
      {data?.user ? (
        <Button
          className="bg-red-700 text-white hover:bg-red-800"
          onClick={handleLogout}
        >
          <LogOut size={16} className="size-4" />
          Sair da conta
        </Button>
      ) : (
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-gradient-wilson-golden text-blue-950">
              <User size={24} className="size-6" />
              Login
            </Button>
          </DialogTrigger>
          <DialogLogin />
        </Dialog>
      )}
    </>
  )
}

export default ButtonLogin
