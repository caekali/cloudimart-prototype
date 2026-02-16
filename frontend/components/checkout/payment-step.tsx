import React, { useState } from "react";
import { ShieldCheck, AlertCircle } from "lucide-react";
import { CartItem } from "@/types/cart";
import { ContactDetails } from "@/types/user";
import Button from "../ui/button";
import { DeliveryLocation } from "@/types/location";

interface PaymentStepProps {
  items: CartItem[];
  totalAmount: number;
  deliveryLocation: DeliveryLocation | null;
  contactDetails: ContactDetails | null;
  onProceedToPayment: () => void;
  isActive: boolean;
  isProcessing: boolean;
}

export const PaymentStep: React.FC<PaymentStepProps> = ({
  totalAmount,
  deliveryLocation,
  contactDetails,
  onProceedToPayment,
  isActive,
  isProcessing,
}) => {
  if (!isActive) {
    return (
      <div className="b-card p-6 rounded-xl border border-border opacity-50 pointer-events-none">
        <h3 className="text-lg font-bold text-muted-foreground">3. Payment</h3>
      </div>
    );
  }

  return (
    <div className="bg-card p-6 rounded-xl shadow-sm border border-border">
      <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
        <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm">
          3
        </div>
        Payment
      </h3>

      <div className="space-y-6">
        <div className="bg-gray-50 p-4 rounded-lg space-y-2 text-sm text-gray-600">
          <div className="flex justify-between">
            <span>Deliver to:</span>
            <span className="font-medium text-gray-900">
              {deliveryLocation?.name}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Contact:</span>
            <span className="font-medium text-gray-900">
              {contactDetails?.phone}
            </span>
          </div>
          <div className="flex justify-between pt-2 border-t border-border mt-2">
            <span className="font-bold text-gray-900 text-base">
              Total to Pay
            </span>
            <span className="font-bold text-primary text-base">
              MWK{totalAmount.toLocaleString()}
            </span>
          </div>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg flex gap-3 text-sm text-yellow-800">
          <AlertCircle className="w-5 h-5 shrink-0 text-yellow-600" />
          <p>
            You will be redirected to a payment gateway to complete your
            purchase.
          </p>
        </div>

        <Button
          onClick={onProceedToPayment}
          disabled={isProcessing}
          className="w-full flex items-center justify-center gap-2"
        >
          {isProcessing ? (
            <>Processing...</>
          ) : (
            <>
              <ShieldCheck className="w-5 h-5" />
              Place order and proceed to Payment
            </>
          )}
        </Button>
      </div>
    </div>
  );
};
