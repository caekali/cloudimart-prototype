import React from 'react';
import { CartItem, DeliveryLocation } from '@/types';

interface OrderSummaryProps {
    items: CartItem[];
    subtotal: number;
    total: number;
    location: DeliveryLocation | null;
}

export const OrderSummary: React.FC<OrderSummaryProps> = ({
    items,
    subtotal,
    total,
}) => {
    return (
        <div className="bg-card p-6 rounded-xl shadow-sm border border-border sticky top-8">
            <h2 className="text-lg font-bold text-gray-900">Order Summary</h2>

            <ul className="space-y-4 mb-6 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                {items.map((item) => (
                    <li key={item.id} className="flex justify-between items-start text-sm">
                        <div>
                            <p className="font-medium text-muted-foreground">{item.name}</p>
                            <p className="text-muted-foreground text-xs">Qty: {item.quantity}</p>
                        </div>
                        <span className="font-medium text-muted-foreground">
                            MWK {item.price.toLocaleString()}
                        </span>
                    </li>
                ))}
            </ul>

            <div className="border-t border-border pt-4 space-y-3">
                <div className="flex justify-between text-gray-600">
                    <span className='text-sm'>Subtotal</span>
                    <span className='text-sm'>MWK {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                    <span className='text-sm'>Delivery</span>
                    <span className='text-sm'>Free</span>
                </div>
            </div>

            <div className="border-t border-gray-100 mt-4 pt-4 flex justify-between items-center">
                <span className="font-bold text-gray-900 text-base">Total</span>
                <span className="font-bold text-primary text-xl">
                    MWK {total.toLocaleString()}
                </span>
            </div>
        </div>
    );
};
