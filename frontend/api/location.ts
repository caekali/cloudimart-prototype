import { ALLOWED_LOCATIONS } from "@/data/locations";
import { AllowedLocation, LocationValidationResponse } from "@/types/location";


  
  export async function validateLocation(
    location: string
  ): Promise<LocationValidationResponse> {
   return new Promise((resolve) => {
      setTimeout(() => {
        const isValid = ALLOWED_LOCATIONS.includes(location as AllowedLocation);
        if (isValid) {
          resolve({ isValid: true });
        } else {
          resolve({ isValid: false, message: 'Sorry, delivery to this location is not available yet.' });
        }
      }, 500); // Simulate network delay
    });
  }