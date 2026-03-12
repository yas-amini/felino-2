import { Outlet } from "react-router-dom";
import { useState } from "react";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import MenuModal from "../components/common/Modal/MenuModal";
import { useCart } from "../context/CartContext";

export default function SiteLayout() {
  const { cartCount } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <Navbar cartCount={cartCount} />
      <main>
        <Outlet />
      </main>

      <Footer onOpenMenu={() => setMenuOpen(true)} />

      <MenuModal
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
      />
    </>
  );
}