import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Toaster } from "sonner";
import MainLayout from "./components/MainLayout";
import ProductsPage from "./pages/ProductsPage";
import OrdersPage from "./pages/OrdersPage";
import InventoryPage from "./pages/InventoryPage";
import ActivityLogPage from "./pages/ActivityLogPage";
import ReportsPage from "./pages/ReportsPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Navigate to="/products" replace />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="orders" element={<OrdersPage />} />
          <Route path="inventory" element={<InventoryPage />} />
          <Route path="activity-log" element={<ActivityLogPage />} />
          <Route path="reports" element={<ReportsPage />} />
        </Route>
      </Routes>
      <Toaster richColors position="top-right" />
    </Router>
  );
}

export default App;
