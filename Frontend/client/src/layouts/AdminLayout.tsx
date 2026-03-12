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
              to="/admin/profile"
              data-tip="Användare"
              aria-label="Användare"
              className={({ isActive }) =>
                ["admin-tile", "admin-tile--profile", isActive ? "is-active" : ""].join(" ")
              }
            >
              <img className="admin-tile-img" src="/images/admin/icons/profile.png" alt="Användare" />
            </NavLink>
            <NavLink
              to="/admin"
              end
              data-tip="Översikt"
              aria-label="Hem"
              className={({ isActive }) =>
                ["admin-tile", "admin-tile--home", isActive ? "is-active" : ""].join(" ")
              }
            >
              <img className="admin-tile-img" src="/images/admin/icons/home.png" alt="Hem" />
            </NavLink>

            <NavLink
              to="/admin/orders"
              data-tip="Beställningar"
              aria-label="Beställningar"
              className={({ isActive }) =>
                ["admin-tile", "admin-tile--orders", isActive ? "is-active" : ""].join(" ")
              }
            >
              <img className="admin-tile-img" src="/images/admin/icons/orders.png" alt="Beställningar" />
            </NavLink>

            <NavLink
              to="/admin/booking"
              data-tip="Bordsbokningar"
              aria-label="Bordsbokningar"
              className={({ isActive }) =>
                ["admin-tile", "admin-tile--booking", isActive ? "is-active" : ""].join(" ")
              }
            >
              <img className="admin-tile-img" src="/images/admin/icons/booking.png" alt="Bordsbokningar" />
            </NavLink>

            <NavLink
              to="/admin/products"
              data-tip="Produkter"
              aria-label="Produkter"
              className={({ isActive }) =>
                ["admin-tile", "admin-tile--products", isActive ? "is-active" : ""].join(" ")
              }
            >
              <img className="admin-tile-img" src="/images/admin/icons/products.png" alt="Produkter" />
            </NavLink>

            <NavLink
              to="/admin/settings"
              data-tip="Inställningar"
              aria-label="Inställningar"
              className={({ isActive }) =>
                ["admin-tile", "admin-tile--settings", isActive ? "is-active" : ""].join(" ")
              }
            >
              <img className="admin-tile-img" src="/images/admin/icons/settings.png" alt="Inställningar" />
            </NavLink>

             <NavLink
              to="/admin/categories"
              data-tip="Kategorier"
              aria-label="Kategorier"
              className={({ isActive }) =>
                ["admin-tile", "admin-tile--categories", isActive ? "is-active" : ""].join(" ")
              }
            >
              <img className="admin-tile-img" src="/images/admin/icons/categories.png" alt="Kategorier" />
            </NavLink>

              <NavLink
              to="/admin/campaigns"
              data-tip="Kampanjer"
              aria-label="Kampanjer"
              className={({ isActive }) =>
                ["admin-tile", "admin-tile--campaigns", isActive ? "is-active" : ""].join(" ")
              }
            >
              <img className="admin-tile-img" src="/images/admin/icons/campaigns.png" alt="Kampanjer" />
            </NavLink>
          </nav>
        </div>
      </aside>

      <nav id="admin-subbar" className="admin-subbar" aria-label="Undermenyn" />

      {/* CONTENT-RUTA */}
      <main className="admin-page" aria-label="Innehåll">
        <Outlet context={{ setTopbar }} />
      </main>

      <footer className="admin-footer" />
    </div>
  );
}