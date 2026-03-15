
import { Button } from "@/components/ui/button"
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldError,
    FieldSeparator,
    FieldContent
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectSeparator,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { saleSchema } from "../lib/schemas"
import useStockCall from "../hooks/useStockCall"
import { useEffect } from "react"
import { useSelector } from "react-redux"




export default function SaleModal({ open, onOpenChange, selectedSale }) {

    const { createStockData, updateStockData, getStockResources } = useStockCall()
    const isEditMode = Boolean(selectedSale)

    const { firms, products, brands } = useSelector((state) => state.stock)
    console.log(firms)
    const emptySaleForm = {
        brandId: "",
        productId: "",
        quantity: "",
        price: "",
    };


    const form = useForm({
        resolver: zodResolver(saleSchema),
        defaultValues: emptySaleForm,
    })

    const { isSubmitting } = form.formState;


    const onSubmit = async (formData) => {

        console.log(formData)


        const isSuccess = isEditMode
            ? await updateStockData("sales", selectedSale._id, formData)
            : await createStockData("sales", formData);

        if (isSuccess) {
            form.reset();
            onOpenChange(false);
        }

    }


    useEffect(() => {
        if (!open) return;

        if (isEditMode) {
            form.reset({
                brandId: selectedSale.brandId ?? "",
                productId: selectedSale.productId ?? "",
                quantity: selectedSale.quantity ?? "",
                price: selectedSale.price ?? "",
            });
            return;
        }
        form.reset(emptySaleForm);
    }, [selectedSale, form, isEditMode, open]);


    useEffect(() => {

        const requiredResources = ["brands", "products"];
        if (!open) return;
        getStockResources(requiredResources);

    }, [open]);


    return (
        <Dialog open={open} onOpenChange={onOpenChange} >
            <DialogContent>
                <DialogHeader className="mb-6">
                    <DialogTitle>
                        {isEditMode ? "Edit Sale" : "Create New Sale"}
                    </DialogTitle>
                    <DialogDescription>
                        {isEditMode
                            ? "Update the selected sale information."
                            : "Create a new sale by filling the form below."}
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={form.handleSubmit(onSubmit)} >
                    <FieldGroup>
                        <Controller
                            name="brandId"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="brand">Brand</FieldLabel>
                                    <Select
                                        name={field.name}
                                        value={field.value}
                                        onValueChange={field.onChange}
                                    >
                                        <SelectTrigger
                                            id="brand"
                                            aria-invalid={fieldState.invalid}
                                            className="min-w-30"
                                        >
                                            <SelectValue placeholder="Select brand" />
                                        </SelectTrigger>
                                        <SelectContent position="item-aligned">
                                            <SelectItem value="auto">Select Brand</SelectItem>
                                            <SelectSeparator />
                                            {brands.map((brand) => (
                                                <SelectItem key={brand._id} value={brand._id}>
                                                    {brand.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />
                        <Controller
                            name="productId"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="product">Product</FieldLabel>
                                    <Select
                                        name={field.name}
                                        value={field.value}
                                        onValueChange={field.onChange}
                                    >
                                        <SelectTrigger
                                            id="product"
                                            aria-invalid={fieldState.invalid}
                                            className="min-w-30"
                                        >
                                            <SelectValue placeholder="Select product" />
                                        </SelectTrigger>
                                        <SelectContent position="item-aligned">
                                            <SelectItem value="auto">Select Product</SelectItem>
                                            <SelectSeparator />
                                            {products.map((product) => (
                                                <SelectItem key={product._id} value={product._id}>
                                                    {product.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />
                        <Controller
                            name="quantity"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="quantity">Quantity</FieldLabel>
                                    <Input
                                        {...field}
                                        id="quantity"
                                        type="number"
                                        min="1"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="Enter quantity"
                                        autoComplete="off"
                                        disabled={isSubmitting}
                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />
                        <Controller
                            name="price"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="price">Price</FieldLabel>
                                    <Input
                                        {...field}
                                        id="price"
                                        type="number"
                                        min="1"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="Enter unit price"
                                        autoComplete="off"
                                        disabled={isSubmitting}
                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />
                    </FieldGroup>

                    <DialogFooter className="mt-6 flex gap-4">
                        <Button className="cursor-pointer"
                        > {isSubmitting
                            ? isEditMode
                                ? "Updating Sale..."
                                : "Creating Sale..."
                            : isEditMode
                                ? "Update Sale"
                                : "Create Sale"}
                        </Button>
                        <DialogClose asChild>
                            <Button className="cursor-pointer" variant="outline">Close</Button>
                        </DialogClose>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
