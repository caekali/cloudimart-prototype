import { CartItem } from "@/context/cart-context";
import { Minus, Plus, Trash, Trash2 } from "lucide-react";


interface CartItemRowProps {
  item: CartItem;
  incrementItem: (id: string) => void;
  decrementItem: (id: string) => void;

  removeItem: (id: string) => void;
}

export function CartItemRow({
  item,
  decrementItem,
  incrementItem,
  removeItem,
}: CartItemRowProps) {
  return (
    <div
      key={item.id}
      className="flex gap-4 p-4 bg-white rounded-xl shadow-sm border border-gray-100 items-center"
    >
      <div className="h-24 w-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
        <img
          src={item.image}
          alt={item.name}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="flex-grow">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-lg text-gray-800">{item.name}</h3>
            <p className="text-muted-foreground text-sm capitalize">{item.category}</p>
          </div>
          <button
            onClick={() => removeItem(item.id)}
            className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50 transition-colors"
          >
            <Trash2 size={20} />
          </button>
        </div>

        <div className="flex justify-between items-end mt-4">
          <div className="flex items-center gap-3 bg-gray-50 rounded-full p-1 border border-gray-200">
            <button
              onClick={() => decrementItem(item.id)}
              className="p-1 rounded-full hover:bg-white shadow-sm transition-all"
            >
              <Minus size={16} className="text-gray-600" />
            </button>
            <span className="w-8 text-center font-medium text-gray-900">
              {item.quantity}
            </span>
            <button
              onClick={() => incrementItem(item.id)}
              className="p-1 rounded-full hover:bg-white shadow-sm transition-all"
            >
              <Plus size={16} className="text-gray-600" />
            </button>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">
              MWK {item.price.toLocaleString()} x {item.quantity}
            </p>
            <p className="font-bold text-lg text-primary">
              MWK {(item.price * item.quantity).toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
