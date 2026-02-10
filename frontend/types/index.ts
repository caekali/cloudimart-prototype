export interface CartItem {
    id: string;
    name: string;
    quantity: number;
    price: number;
    image?: string;
}

export interface DeliveryLocation {
    id: string;
    name: string;
    allowed:boolean;
}

export interface ContactDetails {
    name: string;
    phone: string;
    hostel: string;
}

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

export type CheckoutStep = 1 | 2 | 3;
