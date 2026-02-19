import { redirect } from "next/navigation";
import { Order, OrderStatus } from "@/types/order";
import { auth } from "@/auth";
import { getUserOrders } from "@/api/orders";

export default async function MyOrders() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/signin");
  }

  const orders = await getUserOrders(session?.token);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">My Orders</h1>

      {orders.length === 0 ? (
        <p className="text-center text-muted-foreground">
          You haven't placed any orders yet.
        </p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="rounded-lg border border-border bg-background p-6 shadow-sm"
            >
              {/* Header */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-border pb-4 mb-4">
                <div>
                  <h2 className="font-semibold">
                    Order ID: <span className="text-primary">{order.id}</span>
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {new Date(order.placed_at).toLocaleDateString()}
                  </p>
                </div>

                <span
                  className={`mt-2 md:mt-0 px-3 py-1 rounded-full text-sm font-medium ${getStatusClasses(
                    order.status,
                  )}`}
                >
                  {order.status}
                </span>
              </div>

              {/* Body */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium mb-2">Delivery Details</h3>
                  <p className="text-sm">
                    <strong>Location:</strong> {order.delivery_location}
                  </p>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Items</h3>
                  <ul className="list-disc list-inside text-sm space-y-1">
                    {order.items.map((item) => (
                      <li key={item.id}>
                        {item.name} ×{item.quantity} – MWK
                        {item.price}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="text-right border-t border-border pt-4 mt-4">
                <p className="font-semibold">
                  Total:{" "}
                  <span className="text-primary">
                    MWK{order.total_amount}
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function getStatusClasses(status: OrderStatus) {
  switch (status) {
    case OrderStatus.PENDING:
      return "bg-yellow-100 text-yellow-800";
    case OrderStatus.CANCELLED:
      return "bg-red-100 text-red-800";
    default:
      return "bg-muted text-foreground";
  }
}
