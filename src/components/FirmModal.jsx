
import { Button } from "@/components/ui/button"
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldError,
    FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { firmSchema } from "../lib/schemas"
import useStockCall from "../hooks/useStockCall"
import { useEffect } from "react"




export default function DialogStickyFooter({ modalOpen, handleModalChange, selectedFirm }) {

    const { createStockData, updateStockData } = useStockCall()
    const isEditMode = Boolean(selectedFirm)

    const emptyFirmForm = {
        name: "",
        phone: "",
        address: "",
        image: "",
    };

    const form = useForm({
        resolver: zodResolver(firmSchema),
        defaultValues: emptyFirmForm,
    })

    const { isSubmitting } = form.formState;


    const onSubmit = async (formData) => {

        const isSuccess = isEditMode
            ? await updateStockData("firms", selectedFirm._id, formData)
            : await createStockData("firms", formData);

        if (isSuccess) {
            form.reset();
            onOpenChange(false);
        }

    }

    useEffect(() => {
        if (!open) return;
        if (isEditMode) {
            form.reset({
                name: selectedFirm.name ?? "",
                phone: selectedFirm.phone ?? "",
                address: selectedFirm.address ?? "",
                image: selectedFirm.image ?? "",
            });
        } else {
            form.reset(emptyFirmForm);
        }
    }, [selectedFirm, form, isEditMode, open]);


    return (
        <Dialog open={modalOpen} onOpenChange={handleModalChange} >
            <DialogTrigger asChild>
                <Button variant="outline">Create New Firm</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader className="mb-6">
                    <DialogTitle>
                        {isEditMode ? "Edit Firm" : "Create New Firm"}
                    </DialogTitle>
                    <DialogDescription>
                        {isEditMode
                            ? "Update the selected firm information."
                            : "Create a new firm by filling the form below."}
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={form.handleSubmit(onSubmit)} >
                    <FieldGroup>
                        <Controller
                            name="name"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field className="" data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="username">Name</FieldLabel>
                                    <Input {...field} id="username" aria-invalid={fieldState.invalid} />
                                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                </Field>
                            )}
                        />
                        <Controller
                            name="phone"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field className="" data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="phone">Phone</FieldLabel>
                                    <Input {...field} id="phone" aria-invalid={fieldState.invalid} />
                                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                </Field>
                            )}
                        />
                        <Controller
                            name="address"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field className="" data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="address">Address</FieldLabel>
                                    <Input {...field} id="addres" aria-invalid={fieldState.invalid} />
                                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                </Field>
                            )}
                        />
                        <Controller
                            name="image"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field className="" data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="image">Image Link</FieldLabel>
                                    <Input {...field} id="image" aria-invalid={fieldState.invalid} />
                                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                </Field>
                            )}
                        />
                    </FieldGroup>

                    <DialogFooter className="mt-6">
                        <DialogClose className="flex gap-4">
                            <Button className="cursor-pointer"
                            > {isSubmitting
                                ? isEditMode
                                    ? "Updating Firm..."
                                    : "Creating Firm..."
                                : isEditMode
                                    ? "Update Firm"
                                    : "Create Firm"}
                            </Button>
                            <Button className="cursor-pointer" variant="outline">Close</Button>
                        </DialogClose>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
