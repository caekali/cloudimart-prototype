import { Product } from "./product";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export interface CartItem extends Product {
  quantity: number;
}