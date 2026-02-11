import { CartItem } from "./cart";
import { DeliveryLocation } from "./location";
import { ContactDetails } from "./user";

export interface Order {
    id: string;
    items: CartItem[];
    subtotal: number;
    deliveryFee: number;
    total: number;
    location: DeliveryLocation;
    contact: ContactDetails;
    status: 'pending' | 'paid' | 'failed' | 'delivered';
    createdAt: string;
}