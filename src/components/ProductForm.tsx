import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Product } from "../types/Product";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../components/ui/form";

const productSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  price: z.preprocess(
    (val) => Number(val),
    z.number().min(1, "Price is required and must be > 0")
  ),
  stock_quantity: z.preprocess(
    (val) => Number(val),
    z.number().int().min(1, "Stock is required and must be > 0")
  ),
});

type ProductFormValues = z.input<typeof productSchema>;

interface ProductFormProps {
  initialValues?: Partial<Product>;
  onCancel: () => void;
}

export default function ProductForm({
  initialValues = {},
  onCancel,
}: ProductFormProps) {
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: initialValues.name || "",
      description: initialValues.description || "",
      price: initialValues.price ?? 0,
      stock_quantity: initialValues.stock_quantity ?? 0,
    },
  });

  function handleSubmit(values: ProductFormValues) {
    console.log(values);
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
                <input className="border rounded px-2 py-1 w-full" {...field} />
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
                <input
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
        <FormField
          control={form.control}
          name="stock_quantity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Stock Quantity *</FormLabel>
              <FormControl>
                <input
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
        <div className="flex justify-end gap-2">
          <button
            type="button"
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </form>
    </Form>
  );
}
