export interface DeliveryListItem {
    delivery_id: number;
    order_id: string;
    status: string;
    delivered_at: string | null;
    customer_name: string;
    total_amount: string;
    items_count: number;
}


export interface DeliveryDetail {
    delivery_id: number;
    order_id: string;
    status: string;
    delivered_at: string | null;
    collector_phone: string | null;
    customer: {
        id: number;
        name: string;
        email: string;
    };
    total_amount: string;
    payment_status: string;
    order_status: string;
    placed_at: string;
    items: {
        id: number;
        product_id: number;
        name: string;
        slug: string;
        image: string;
        quantity: number;
        price: string;
        total_price: number;
    }[];
}
