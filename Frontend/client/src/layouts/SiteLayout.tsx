import { Outlet } from "react-router-dom";
import { useState } from "react";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
<<<<<<< HEAD
import { useCart } from "../context/CartContext";

export default function SiteLayout() {
  const { cartCount } = useCart();

  return (
    <>
      <Navbar cartCount={cartCount} />
=======
import MenuModal from "../components/common/Modal/MenuModal";

export default function SiteLayout() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <Navbar />

>>>>>>> main
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