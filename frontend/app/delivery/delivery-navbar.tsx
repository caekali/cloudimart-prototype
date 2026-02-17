import ConfirmDeliveryForm from "@/components/confirm-delivery-form";

export default function DeliveryNavbar() {

  return (
    <nav className="  p-4 flex justify-between items-center">
      <div>Delivery Dashboard</div>
      <ConfirmDeliveryForm />
    </nav>
  );
}
