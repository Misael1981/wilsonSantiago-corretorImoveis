import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { UserCardProps } from "../UserCard"

type DialogEditUserProps = {
  open: boolean
  setIsOpen: (value: boolean) => void
  user: UserCardProps["user"]
}

const DialogEditUser = ({ open, setIsOpen, user }: DialogEditUserProps) => {
  console.log(user)

  return (
    <Dialog open={open} onOpenChange={setIsOpen}>
      <form>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <Label htmlFor="name-1">Name</Label>
              <Input id="name-1" name="name" defaultValue={user.name || ""} />
            </Field>
            <Field>
              <Label htmlFor="email-1">Email</Label>
              <Input
                id="email-1"
                name="email"
                defaultValue={user.email || ""}
              />
            </Field>
          </FieldGroup>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}

export default DialogEditUser
