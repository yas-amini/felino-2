import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Layout
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Container from "./components/layout/Container";

// Pages
import HomePage from "./pages/homepage/HomePage";
import OrderPage from "./pages/orderpage/OrderPage";
import TableBooking from "./pages/tablebooking/TableBooking";
import BestallHem from "./pages/bestall-hem/MenuPage";
import { sampleProducts } from "./data/products";
import CartPage from "./pages/cartpage/CartPage";
import CheckoutPage from "./pages/checkoutpage/CheckoutPage";

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
      <Navbar />

      <main>
        <Routes>
          {/* Startsida */}
          <Route path="/" element={<HomePage />} />

          {/* Meny / Beställ */}
          <Route path="/meny" element={<OrderPage />} />
          <Route path="/bestall" element={<BestallHem products={sampleProducts} />} />

          {/* Boka bord */}
          <Route path="/boka-bord" element={<TableBooking />} />

          {/* Varukorg & Checkout */}
          <Route path="/varukorg" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />

          {/* Redirect gammal route */}
          <Route path="/order" element={<Navigate to="/bestall" replace />} />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
    </BrowserRouter>
  );
}
