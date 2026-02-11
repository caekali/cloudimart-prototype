import { MapPin, CheckCircle } from "lucide-react";
import clsx from "clsx";
import Button from "@/components/ui/button";
import { DeliveryLocation } from "@/types/location";
import { getDeliveryLocations } from "@/api/location";
import { Suspense } from "react";

interface LocationStepProps {
  locations: DeliveryLocation[];
  selectedLocation: DeliveryLocation | null;
  onSelectCallback: (location: DeliveryLocation) => void;
  onNext: () => void;
  isActive: boolean;
  isCompleted: boolean;
}

export default function LocationStep({
  locations,
  selectedLocation,
  onSelectCallback,
  onNext,
  isActive,
  isCompleted,
}: LocationStepProps) {


  if (!isActive && !isCompleted) {
    return (
      <div className="bg-card p-6 rounded-xl border border-border opacity-50 pointer-events-none">
        <h3 className="text-lg font-bold text-gray-400">
          1. Delivery Location
        </h3>
      </div>
    );
  }

  if (isCompleted && !isActive) {
    return (
      <div className="bg-card  p-6 rounded-xl border border-green-100 flex justify-between items-center">
        <div>
          <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            1. Delivery Location
            <CheckCircle className="w-5 h-5 text-green-500" />
          </h3>
          <p className="text-gray-600 mt-1">{selectedLocation?.name}</p>
        </div>
        <button
          onClick={onNext}
          className="text-primary text-sm font-medium hover:underline"
        >
          Change
        </button>
      </div>
    );
  }

  return (
    <div className="bg-card p-6 rounded-xl shadow-sm border border-border ring-2 ring-blue-50">
      <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
        <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm">
          1
        </div>
        Delivery Location
      </h3>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select your delivery area
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {locations.map((location) => (
              <button
                key={location.id}
                onClick={() => onSelectCallback(location)}
                className={clsx(
                  "flex items-start p-3 border rounded-lg text-left transition-all",
                  selectedLocation?.id === location.id
                    ? "border-primary bg-primary/10 ring-1 ring-primary"
                    : "border-border hover:border-primary hover:bg-primary/10",
                )}
              >
                <MapPin
                  className={clsx(
                    "w-5 h-5 mt-0.5 mr-2 shrink-0",
                    selectedLocation?.id === location.id
                      ? "text-primary"
                      : "text-gray-400",
                  )}
                />
                <div className="font-medium text-gray-900">{location.name}</div>
              </button>
            ))}
          </div>
        </div>

        <Button
          onClick={onNext}
          disabled={!selectedLocation || !selectedLocation.allowed}
          className="w-full mt-4 py-3 "
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
