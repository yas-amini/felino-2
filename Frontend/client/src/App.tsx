import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { CartProvider } from "./context/CartContext";

// Layouts
import SiteLayout from "./layouts/SiteLayout";
import AdminLayout from "./layouts/AdminLayout";

// Layout helper
import Container from "./components/layout/Container";

// Pages (site)
import HomePage from "./pages/homepage/HomePage";
import OrderPage from "./pages/orderpage/OrderPage";
import TableBooking from "./pages/tablebooking/TableBooking";
import BestallHem from "./pages/bestall-hem/MenuPage";
import { sampleProducts } from "./data/products";
import CartPage from "./pages/cartpage/CartPage";
import CheckoutPage from "./pages/checkoutpage/CheckoutPage";

// Pages (admin)
import AdminHomePage from "./pages/admin/Home/AdminHomePage";
import AdminOrdersPage from "./pages/admin/Orders/AdminOrdersPage";
import AdminProductsPage from "./pages/admin/Products/AdminProductsPage";
import AdminBookingPage from "./pages/admin/Booking/AdminBookingPage";
import AdminSettingsPage from "./pages/admin/Settings/AdminSettingsPage";
import AdminProfilePage from "./pages/admin/Profile/AdminProfilePage";
import AdminCategoriesPage from "./pages/admin/Categories/AdminCategoriesPage";
import AdminCampaignsPage from "./pages/admin/Campaigns/AdminCampaignsPage";

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
    <CartProvider>
      <BrowserRouter>
        <Routes>
          {/* SITE */}
          <Route element={<SiteLayout />}>
            <Route path="/" element={<HomePage />} />

            <Route path="/meny" element={<OrderPage />} />
            <Route path="/bestall" element={<BestallHem products={sampleProducts} />} />

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
            <Route path="categories" element={<AdminCategoriesPage />} />
            <Route path="campaigns" element={<AdminCampaignsPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}
