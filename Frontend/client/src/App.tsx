import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Layouts
import SiteLayout from "./layouts/SiteLayout";
import AdminLayout from "./layouts/AdminLayout";

// Layout helper
import Container from "./components/layout/Container";

// Pages (site)
import HomePage from "./pages/homepage/HomePage";
import OrderPage from "./pages/orderpage/OrderPage";
import TableBooking from "./pages/tablebooking/TableBooking";
import CartPage from "./pages/cartpage/CartPage";
import CheckoutPage from "./pages/checkoutpage/CheckoutPage";

// Pages (admin)
import AdminHomePage from "./pages/admin/AdminHomePage";
import AdminOrdersPage from "./pages/admin/AdminOrdersPage";
import AdminProductsPage from "./pages/admin/AdminProductsPage";
import AdminBookingPage from "./pages/admin/AdminBookingPage";
import AdminSettingsPage from "./pages/admin/AdminSettingsPage";
import AdminProfilePage from "./pages/admin/AdminProfilePage";

function NotFound() {
  return (
    <Container>
      <h1>404</h1>
      <p>Sidan finns inte.</p>
    </Container>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* SITE */}
        <Route element={<SiteLayout />}>
          <Route path="/" element={<HomePage />} />

          <Route path="/meny" element={<OrderPage />} />
          <Route path="/bestall" element={<OrderPage />} />

          <Route path="/boka-bord" element={<TableBooking />} />

          <Route path="/varukorg" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />

          <Route path="/order" element={<Navigate to="/bestall" replace />} />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Route>

        {/* ADMIN */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="" element={<AdminHomePage />} />
          <Route path="orders" element={<AdminOrdersPage />} />
          <Route path="booking" element={<AdminBookingPage />} />
          <Route path="products" element={<AdminProductsPage />} />
          <Route path="settings" element={<AdminSettingsPage />} />
          <Route path="profile" element={<AdminProfilePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}