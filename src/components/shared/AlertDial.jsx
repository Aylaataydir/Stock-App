import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Trash2Icon } from "lucide-react"
import { useState, useTransition } from "react"

export function AlertDial({ children, title = "Are you absolutely sure?", description = "This action can not be undone.", onDelete }) {

  const [isPending, startTransition] = useTransition()
  const [open, setOpen] = useState(false);

  const handleConfirm = async (e) => {
    e.preventDefault()

    startTransition(async () => {
      await onDelete()
      setOpen(false)
    })

  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {children}
      </AlertDialogTrigger>
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
            <Trash2Icon />
          </AlertDialogMedia>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending} variant="outline">Cancel</AlertDialogCancel>
          <AlertDialogAction disabled={isPending} variant="destructive" onClick={handleConfirm} >{isPending ? "Deleting..." : "Delete"}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
