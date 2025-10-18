"use client"

import { Button } from "@/components/ui/button"
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { signIn } from "next-auth/react"

const handleLoginClick = async () => {
  await signIn("google")
}

const DialogLogin = () => {
  return (
    <DialogContent className="max-w-[90%]">
      <DialogHeader>
        <DialogTitle>Faça seu login</DialogTitle>
        <DialogDescription>
          Conecte-se usando sua conta Google.
        </DialogDescription>
      </DialogHeader>
      <Button
        className="bg-gradient-wilson-blue text-wilson-golden text-lg"
        onClick={handleLoginClick}
      >
        Login com Google
      </Button>
    </DialogContent>
  )
}

export default DialogLogin
