import { CartItem } from "./cart";

export interface CustomerDetails {
    id: number;
    name: string;
    email: string;
    phone?: string;
}

export interface OrderItem {
    id: number;
    product_id: number;
    name: string;
    slug: string;
    image: string;
    quantity: number;
    price: number;
    total_price: number;
}

export enum OrderStatus {
    PENDING = "pending",
    PROCESSING = "processing",
    SHIPPED = "shipped",
    DELIVERED = "delivered",
    CANCELLED = "cancelled",
}

export interface Order {
    id: number;
    order_id: string;
    customer: CustomerDetails;
    items: OrderItem[];
    status: OrderStatus;
    payment_status: "pending" | "paid" | "failed";
    total_amount: number;
    delivery_location: string;
    placed_at: string;
    updated_at: string;
    deliveryDate?: string;
    collectorPhoneNumber?: string;
}
