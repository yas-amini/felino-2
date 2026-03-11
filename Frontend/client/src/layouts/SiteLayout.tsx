import { Outlet } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { useCart } from "../context/CartContext";

export default function SiteLayout() {
  const { cartCount } = useCart();

  return (
    <>
      <Navbar cartCount={cartCount} />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}