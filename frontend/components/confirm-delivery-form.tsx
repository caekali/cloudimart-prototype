"use client";

import { useState } from "react";
import Button from "@/components/ui/button";
import FormField from "./ui/form-field";
import { confirmDelivery } from "@/api/delivery";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";

interface ConfirmDeliveryProps {
  onComplete?: () => void;
}

export default function ConfirmDeliveryForm({
  onComplete,
}: ConfirmDeliveryProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [collectorPhone, setCollectorPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { data: session } = useSession();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await confirmDelivery(
        orderId,
        collectorPhone,
        session?.token,
      );

      toast.success("Delivery Confirmed!");

      setIsOpen(false);
      setOrderId("");
      setCollectorPhone("");

      if (onComplete) onComplete();
    } catch (err: any) {
      if (err.errors) {
        setError(err.message);
      } else {
        toast.error(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        onClick={() => {
          setOrderId("");
          setCollectorPhone("");
          setIsOpen(true);
        }}
      >
        Complete Delivery
      </Button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-lg font-semibold mb-4 text-card-foreground">
              Complete Delivery
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <FormField
                id="orderId"
                label="Order ID"
                type="text"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                required
              />

              <FormField
                id="collectorPhone"
                label="Collector Phone"
                type="text"
                value={collectorPhone}
                onChange={(e) => setCollectorPhone(e.target.value)}
                required
              />

              {error && <p className="text-red-500">{error}</p>}

              <div className="flex justify-end space-x-2">
                <Button onClick={() => setIsOpen(false)} variant="secondary">
                  Cancel
                </Button>
                <Button disabled={loading}>
                  {loading ? "Completing..." : "Complete"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
