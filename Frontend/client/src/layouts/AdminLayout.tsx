import { NavLink, Outlet } from "react-router-dom";
import "./AdminLayout.css";

type TopbarState = {
  title?: string;
  rightImageSrc?: string;
  rightImageAlt?: string;
};

export default function AdminLayout() {
  const setTopbar = (_next: TopbarState) => {
    
  };

  return (
    <div className="admin">
      {/* SIDOMENY */}
      <aside className="admin-sidebar" aria-label="Sidomeny">
        <div className="admin-sidebar-scroll">
          <nav className="admin-menu">
            <NavLink
              to="/admin"
              end
              data-tip="Hem"
              aria-label="Hem"
              className={({ isActive }) =>
                ["admin-tile", "admin-tile--home", isActive ? "is-active" : ""].join(" ")
              }
            >
              <img className="admin-tile-img" src="/images/icons/house_black.png" alt="Hem" />
            </NavLink>

            <NavLink
              to="/admin/orders"
              data-tip="Beställningar"
              aria-label="Beställningar"
              className={({ isActive }) =>
                ["admin-tile", "admin-tile--orders", isActive ? "is-active" : ""].join(" ")
              }
            >
              <img className="admin-tile-img" src="/images/icons/bong_black.png" alt="Beställningar" />
            </NavLink>

            <NavLink
              to="/admin/booking"
              data-tip="Bordsbokningar"
              aria-label="Bordsbokningar"
              className={({ isActive }) =>
                ["admin-tile", "admin-tile--booking", isActive ? "is-active" : ""].join(" ")
              }
            >
              <img className="admin-tile-img" src="/images/icons/bord_black.png" alt="Bordsbokningar" />
            </NavLink>

            <NavLink
              to="/admin/products"
              data-tip="Produkter"
              aria-label="Produkter"
              className={({ isActive }) =>
                ["admin-tile", "admin-tile--products", isActive ? "is-active" : ""].join(" ")
              }
            >
              <img className="admin-tile-img" src="/images/icons/penna_black.png" alt="Produkter" />
            </NavLink>

            <NavLink
              to="/admin/settings"
              data-tip="Inställningar"
              aria-label="Inställningar"
              className={({ isActive }) =>
                ["admin-tile", "admin-tile--settings", isActive ? "is-active" : ""].join(" ")
              }
            >
              <img className="admin-tile-img" src="/images/icons/kugghjul_black.png" alt="Inställningar" />
            </NavLink>
          </nav>
        </div>
      </aside>

      {/* (Valfri) subbar */}
      <nav id="admin-subbar" className="admin-subbar" aria-label="Undermenyn" />

      {/* CONTENT-RUTA */}
      <main className="admin-page" aria-label="Innehåll">
        <Outlet context={{ setTopbar }} />
      </main>

      <footer className="admin-footer" />
    </div>
  );
}