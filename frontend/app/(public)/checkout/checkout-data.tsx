import { getDeliveryLocations } from "@/api/location";
import CheckoutDetails from "./checkout-details";
import { getContactDetails } from "@/api/profile";

export default async function CheckoutData() {
  const locations = await getDeliveryLocations(); 
  const contactDetails = await getContactDetails();

  return (
    <CheckoutDetails initialContactDetails={contactDetails} locations={locations} />
  );
}
