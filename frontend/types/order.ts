import { CartItem } from "./cart";
import { DeliveryLocation } from "./location";
import { ContactDetails } from "./user";


export interface OrderItem {
    product_name:string;
    quantity:number;
    price:number;
    subtotal:number;

}

export interface Order {
    order_id: string;
    items: OrderItem[];
    payment_status: string;
    total_amount: number;
    delivery_location: string;
    contact: ContactDetails;
    status: 'pending' | 'paid' | 'failed' | 'delivered';
    created_at: string;
}
