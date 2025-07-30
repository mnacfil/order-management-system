import type { Product } from "../../types/Product";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import { Button } from "../ui/button";
import {
  MoreHorizontalIcon,
  PencilIcon,
  TrashIcon,
  ShoppingCartIcon,
} from "lucide-react";

interface ProductTableProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
  onOrder: (product: Product) => void;
}

const ProductTable = ({
  products,
  onEdit,
  onDelete,
  onOrder,
}: ProductTableProps) => {
  return (
    <table className="min-w-full border rounded">
      <thead className="bg-gray-100">
        <tr>
          <th className="p-2 text-left">Name</th>
          <th className="p-2 text-left">Description</th>
          <th className="p-2 text-right">Price</th>
          <th className="p-2 text-right">Stock</th>
          <th className="p-2 text-center">Actions</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product.id} className="border-t">
            <td className="p-2">{product.name}</td>
            <td className="p-2">{product.description}</td>
            <td className="p-2 text-right">{product.price}</td>
            <td className="p-2 text-right">{product.stock_quantity}</td>
            <td className="p-2  text-center">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant={"ghost"} size={"icon"}>
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontalIcon className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => onEdit(product)}
                    className="cursor-pointer"
                  >
                    <PencilIcon className="h-4 w-4" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => onDelete(product)}
                    className="cursor-pointer"
                  >
                    <TrashIcon className="h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => onOrder(product)}
                    className="cursor-pointer"
                  >
                    <ShoppingCartIcon className="h-4 w-4" />
                    Order
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProductTable;
