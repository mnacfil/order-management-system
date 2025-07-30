import { z } from "zod";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Product } from "../../types/Product";
import type { CreateOrderRequest } from "../../types/Order";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { TrashIcon, PlusIcon } from "lucide-react";

const orderItemSchema = z.object({
  productId: z.number().min(1, "Please select a product"),
  quantity: z.number().min(1, "Quantity must be at least 1"),
});

const orderSchema = z.object({
  items: z.array(orderItemSchema).min(1, "At least one item is required"),
});

type OrderFormValues = z.input<typeof orderSchema>;

interface OrderFormProps {
  products: Product[];
  onSubmit: (data: CreateOrderRequest) => void;
  onCancel: () => void;
  loading?: boolean;
}

const OrderForm = ({
  products,
  onSubmit,
  onCancel,
  loading = false,
}: OrderFormProps) => {
  const form = useForm<OrderFormValues>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      items: [{ productId: 0, quantity: 1 }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "items",
  });

  function handleSubmit(values: OrderFormValues) {
    // Filter out items with no product selected
    const validItems = values.items.filter((item) => item.productId > 0);

    if (validItems.length === 0) {
      form.setError("items", { message: "Please select at least one product" });
      return;
    }

    onSubmit({
      items: validItems,
    });
  }

  const getTotalPrice = () => {
    const items = form.watch("items");
    return items.reduce((total, item) => {
      const product = products.find((p) => p.id === item.productId);
      return total + (product ? product.price * item.quantity : 0);
    }, 0);
  };

  const addItem = () => {
    append({ productId: 0, quantity: 1 });
  };

  const removeItem = (index: number) => {
    if (fields.length > 1) {
      remove(index);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Order Items</h3>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addItem}
              className="flex items-center gap-1"
            >
              <PlusIcon className="h-4 w-4" />
              Add Item
            </Button>
          </div>

          {fields.map((field, index) => (
            <div key={field.id} className="border rounded-lg p-4 space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="font-medium">Item {index + 1}</h4>
                {fields.length > 1 && (
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={() => removeItem(index)}
                    className="flex items-center gap-1"
                  >
                    <TrashIcon className="h-4 w-4" />
                    Remove
                  </Button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name={`items.${index}.productId`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Product *</FormLabel>
                      <Select
                        value={field.value.toString()}
                        onValueChange={(value) =>
                          field.onChange(parseInt(value))
                        }
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a product" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {products.map((product) => (
                            <SelectItem
                              key={product.id}
                              value={product.id.toString()}
                            >
                              {product.name} - ₱ {product.price} (Stock:{" "}
                              {product.stock_quantity})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`items.${index}.quantity`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Quantity *</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="1"
                          {...field}
                          value={field.value || ""}
                          onChange={(e) =>
                            field.onChange(parseInt(e.target.value) || 1)
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormItem>
                  <FormLabel>Subtotal</FormLabel>
                  <div className="p-2 text-sm font-medium border rounded bg-gray-50">
                    ₱
                    {(() => {
                      const product = products.find(
                        (p) => p.id === form.watch(`items.${index}.productId`)
                      );
                      const quantity =
                        form.watch(`items.${index}.quantity`) || 0;
                      return product
                        ? (product.price * quantity).toFixed(2)
                        : "0.00";
                    })()}
                  </div>
                </FormItem>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t pt-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Total</h3>
            <div className="text-xl font-bold">
              ₱ {getTotalPrice().toFixed(2)}
            </div>
          </div>
        </div>

        <div className="flex gap-2 justify-end">
          <Button
            type="button"
            onClick={onCancel}
            variant="secondary"
            disabled={loading}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? "Creating Order..." : "Create Order"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default OrderForm;
