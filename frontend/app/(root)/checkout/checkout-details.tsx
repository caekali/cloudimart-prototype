"use client";

import { OrderSummary } from "@/components/checkout/order-summary";
import { PaymentStep } from "@/components/checkout/payment-step";
import { ContactStep } from "@/components/checkout/contact-step";
import { useCart } from "@/context/cart-context";
import { ContactDetails } from "@/types/user";
import { redirect, RedirectType, useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { DeliveryLocation } from "@/types/location";
import LocationStep from "@/components/checkout/location-step";
import { checkout } from "@/api/orders";
import { useSession } from "next-auth/react";

type CheckoutStep = 1 | 2 | 3;

interface CheckoutDetailsProps {
  initialContactDetails: ContactDetails;
  locations: DeliveryLocation[];
}

export default function CheckoutDetails({
  initialContactDetails,
  locations,
}: CheckoutDetailsProps) {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<CheckoutStep>(1);
  const { cart, subtotal } = useCart();
  const [selectedLocation, setSelectedLocation] =
    useState<DeliveryLocation | null>(null);

  const [contactDetails, setContactDetails] = useState<ContactDetails>(
    initialContactDetails,
  );

  const [isProcessing, setIsProcessing] = useState(false);

  const handleLocationSelect = (location: DeliveryLocation) => {
    setSelectedLocation(location);
  };

  const handleStep2Back = () => {
    setCurrentStep(1);
  };

  const handleLocationNext = () => {
    if (selectedLocation?.allowed) {
      setCurrentStep(2);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleContactSave = (details: ContactDetails) => {
    setContactDetails(details);
    setCurrentStep(3);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const session = useSession();
  const handlePayment = async () => {
    setIsProcessing(true);

    const sessionData = {
      items: cart.items,
      location: selectedLocation,
      contact: contactDetails,
      subtotal,
      sessionId: `SESS-${Date.now()}`,
    };

    localStorage.setItem("checkout_session", JSON.stringify(sessionData));
    try {
      const res = await checkout(
        { deliveryLocationId: selectedLocation?.id ?? "" },
        session.data?.token,
      );
      window.open(res.payment_link, "_blank");
    } catch (error) {
      console.log(error)
    } finally {
      setIsProcessing(false);
    }

    // setTimeout(() => {
    //   const params = new URLSearchParams({
    //     amount: subtotal.toString(),
    //     sessionId: sessionData.sessionId,
    //     callbackUrl: "/checkout/success", // Relative URL
    //   });

    //   router.push(`/mock-gateway?${params.toString()}`);
    // }, 1500);
  };

  return (
    <div>
      <div className="bg-white border-b border-gray-100 sticky top-0 z-10 w-full mb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="text-gray-500 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="text-xl font-bold text-primary  bg-clip-text">
              Cloudimart Checkout
            </h1>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        <div className="lg:col-span-7 space-y-8">
          <LocationStep
            locations={locations}
            selectedLocation={selectedLocation}
            onSelectCallback={handleLocationSelect}
            onNext={handleLocationNext}
            isActive={currentStep === 1}
            isCompleted={currentStep > 1}
          />

          <ContactStep
            initialContact={contactDetails}
            onSaveContact={handleContactSave}
            onBack={handleStep2Back}
            isActive={currentStep === 2}
            isCompleted={currentStep > 2}
          />

          <PaymentStep
            items={cart.items}
            totalAmount={subtotal}
            deliveryLocation={selectedLocation}
            contactDetails={contactDetails}
            onProceedToPayment={handlePayment}
            isActive={currentStep === 3}
            isProcessing={isProcessing}
          />
        </div>

        <div className="lg:col-span-5 hidden lg:block h-full">
          <OrderSummary
            items={cart.items}
            subtotal={subtotal}
            total={subtotal}
            location={selectedLocation}
          />
        </div>

        {/* order summary for mobile  */}
        <div className="lg:hidden col-span-1">
          <div className="mt-8">
            <OrderSummary
              items={cart.items}
              subtotal={subtotal}
              total={subtotal}
              location={selectedLocation}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
