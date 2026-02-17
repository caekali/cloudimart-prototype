export async function GET(request: Request) {
  const orders = [
    {
      order_id: "ORD123",
      customer_name: "John Doe",
      phone: "0991234567",
      delivery_location: "Mzuzu Central Hospital",
      items: [{ name: "Milk", quantity: 2 }, { name: "Notebook", quantity: 1 }],
      status: "pending",
    },
  ];
  return new Response(JSON.stringify(orders), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}

export async function POST(request: Request) {
  // Parse the request body
  const body = await request.json();
  const { name } = body;

  // e.g. Insert new user into your DB
  const newUser = { id: Date.now(), name };

  return new Response(JSON.stringify(newUser), {
    status: 201,
    headers: { 'Content-Type': 'application/json' }
  });
}