import type { Product } from "../types/Product";

interface ProductTableProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
}

export default function ProductTable({
  products,
  onEdit,
  onDelete,
}: ProductTableProps) {
  return (
    <table className="min-w-full border rounded">
      <thead className="bg-gray-100">
        <tr>
          <th className="p-2 text-left">Name</th>
          <th className="p-2 text-left">Description</th>
          <th className="p-2 text-right">Price</th>
          <th className="p-2 text-right">Stock</th>
          <th className="p-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product.id} className="border-t">
            <td className="p-2">{product.name}</td>
            <td className="p-2">{product.description}</td>
            <td className="p-2 text-right">${product.price.toFixed(2)}</td>
            <td className="p-2 text-right">{product.stock_quantity}</td>
            <td className="p-2 flex gap-2">
              <button
                className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={() => onEdit(product)}
              >
                Edit
              </button>
              <button
                className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                onClick={() => onDelete(product)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
