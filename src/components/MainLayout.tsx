import { Link, Outlet, useLocation } from "react-router-dom";

const navItems = [
  { label: "Products", path: "/products" },
  { label: "Orders", path: "/orders" },
  { label: "Inventory", path: "/inventory" },
  { label: "Activity Log", path: "/activity-log" },
  { label: "Reports", path: "/reports" },
];

export default function MainLayout() {
  const location = useLocation();
  return (
    <div className="flex min-h-screen">
      <aside className="w-56 bg-gray-100 border-r p-4">
        <nav className="flex flex-col gap-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`px-3 py-2 rounded hover:bg-gray-200 transition-colors ${
                location.pathname === item.path
                  ? "bg-gray-300 font-semibold"
                  : ""
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>
      <main className="flex-1 p-6 bg-white">
        <Outlet />
      </main>
    </div>
  );
}
