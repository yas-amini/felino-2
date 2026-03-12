import { Outlet } from "react-router-dom";
import { useState } from "react";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import MenuModal from "../components/common/Modal/MenuModal";

export default function SiteLayout() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <Navbar />

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