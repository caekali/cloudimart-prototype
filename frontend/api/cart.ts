import { auth } from '@/auth';
import { CartItem } from '@/types/cart';

export function addToCart(item: CartItem) {
  console.log('Add to cart', item);
}

export function removeFromCart(itemId: string) {
  console.log('Remove from cart', itemId);
}

export function updateCartQuantity(itemId: string, quantity: number) {
  console.log('Update quantity', itemId, quantity);
}
