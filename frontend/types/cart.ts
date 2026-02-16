import { Product } from "./product";

export interface CartState {
  items: CartItem[];
}

export interface Cart {
  id: number;
  total_amount: number;
  items: CartItem[]
}


export interface CartItem extends Product {
  quantity: number;
}
