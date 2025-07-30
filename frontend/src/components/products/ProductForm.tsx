import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Product } from "../../types/Product";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../../components/ui/form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const productSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  price: z.preprocess(
    (val) => Number(val),
    z.number().min(1, "Price is required and must be >= 1")
  ),
  stock_quantity: z.preprocess(
    (val) => Number(val),
    z.number().int().min(1, "Stock is required and must be >= 1")
  ),
});

type ProductFormValues = z.input<typeof productSchema>;

interface ProductFormProps {
  initialValues?: Partial<Product>;
  onSubmit: (values: ProductFormValues) => void;
  onCancel: () => void;
  loading?: boolean;
}

const ProductForm = ({
  initialValues = {},
  onSubmit,
  onCancel,
  loading = false,
}: ProductFormProps) => {
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: initialValues.name || "",
      description: initialValues.description || "",
      price: initialValues.price ?? 1,
      stock_quantity: initialValues.stock_quantity ?? 1,
    },
  });

  function handleSubmit(values: ProductFormValues) {
    onSubmit(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name *</FormLabel>
              <FormControl>
                <input className="border rounded px-2 py-1 w-full" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input className="border rounded px-2 py-1 w-full" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price *</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min="0"
                  step="0.01"
                  className="border rounded px-2 py-1 w-full"
                  {...field}
                  value={
                    field.value === undefined || field.value === null
                      ? ""
                      : String(field.value)
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="stock_quantity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Stock Quantity *</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min="0"
                  step="1"
                  className="border rounded px-2 py-1 w-full"
                  {...field}
                  value={
                    field.value === undefined || field.value === null
                      ? ""
                      : String(field.value)
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-2 justify-end">
          <Button
            type="button"
            onClick={onCancel}
            variant={"secondary"}
            disabled={loading}
            className="cursor-pointer"
          >
            Cancel
          </Button>
          <Button type="submit" disabled={loading} className="cursor-pointer">
            {loading ? "Saving..." : "Save"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ProductForm;
