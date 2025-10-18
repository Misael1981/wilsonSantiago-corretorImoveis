"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import { LogIn, LogOut, User } from "lucide-react"
import DialogLogin from "../DailogLogin"
import { signOut, useSession } from "next-auth/react"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const ButtonLogin = () => {
  const { data } = useSession()

  const handleLogout = async () => {
    await signOut("google")
  }
  return (
    <>
      {data?.user ? (
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              className="bg-red-700 text-white hover:bg-red-800"
              variant="icon"
              onClick={handleLogout}
            >
              <LogOut size={16} className="size-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Sair da conta</p>
          </TooltipContent>
        </Tooltip>
      ) : (
        <Dialog>
          <DialogTrigger asChild>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  className="bg-gradient-wilson-golden text-blue-950"
                  variant="icon"
                >
                  <LogIn size={16} className="size-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Entrar na conta</p>
              </TooltipContent>
            </Tooltip>
          </DialogTrigger>
          <DialogLogin />
        </Dialog>
      )}
    </>
  )
}

export default ButtonLogin
