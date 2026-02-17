export default function AdminNavbar() {
  return (
    <nav className=" p-4 flex justify-between">
      <div>Cloudimart Admin</div>
      <div className="space-x-4">
        <a href="/admin/dashboard">Dashboard</a>
        <a href="/admin/users">Users</a>
        <a href="/admin/orders">Orders</a>
      </div>
    </nav>
  );
}
