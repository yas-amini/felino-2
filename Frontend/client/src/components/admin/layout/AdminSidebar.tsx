import { NavLink } from "react-router-dom";
import "./AdminSidebar.css";

export default function AdminSidebar() {
  return (
    <aside className="admin-sidebar" aria-label="Sidomeny">
      <div className="admin-sidebar-scroll">
        <nav className="admin-menu">
          <NavLink
            to="/admin/profile"
            className={({ isActive }) =>
              `admin-tile admin-tile--profile ${isActive ? "is-active" : ""}`
            }
          >
            <img
              className="admin-tile-img"
              src="/images/admin/icons/profile.png"
              alt="Användare"
              title="Admin"
            />
          </NavLink>

          <NavLink
            to="/admin"
            end
            className={({ isActive }) =>
              `admin-tile admin-tile--home ${isActive ? "is-active" : ""}`
            }
          >
            <img
              className="admin-tile-img"
              src="/images/admin/icons/home.png"
              alt="Hem"
              title="Översikt"
            />
          </NavLink>

          <NavLink
            to="/admin/orders"
            className={({ isActive }) =>
              `admin-tile admin-tile--orders ${isActive ? "is-active" : ""}`
            }
          >
            <img
              className="admin-tile-img"
              src="/images/admin/icons/orders.png"
              alt="Beställningar"
              title="Beställningar"
            />
          </NavLink>

          <NavLink
            to="/admin/booking"
            className={({ isActive }) =>
              `admin-tile admin-tile--booking ${isActive ? "is-active" : ""}`
            }
          >
            <img
              className="admin-tile-img"
              src="/images/admin/icons/booking.png"
              alt="Bordsbokningar"
              title="Bordsbokningar"
            />
          </NavLink>

          <NavLink
            to="/admin/products"
            className={({ isActive }) =>
              `admin-tile admin-tile--products ${isActive ? "is-active" : ""}`
            }
          >
            <img
              className="admin-tile-img"
              src="/images/admin/icons/products.png"
              alt="Produkter"
              title="Produkter"
            />
          </NavLink>

          <NavLink
            to="/admin/settings"
            className={({ isActive }) =>
              `admin-tile admin-tile--settings ${isActive ? "is-active" : ""}`
            }
          >
            <img
              className="admin-tile-img"
              src="/images/admin/icons/settings.png"
              alt="Inställningar"
              title="Inställningar"
            />
          </NavLink>

          <NavLink
            to="/admin/categories"
            className={({ isActive }) =>
              `admin-tile admin-tile--categories ${isActive ? "is-active" : ""}`
            }
          >
            <img
              className="admin-tile-img"
              src="/images/admin/icons/categories.png"
              alt="Kategorier"
              title="Kategorier"
            />
          </NavLink>

          <NavLink
            to="/admin/campaigns"
            className={({ isActive }) =>
              `admin-tile admin-tile--campaigns ${isActive ? "is-active" : ""}`
            }
          >
            <img
              className="admin-tile-img"
              src="/images/admin/icons/campaigns.png"
              alt="Kampanjer"
              title="Kampanjer"
            />
          </NavLink>
        </nav>
      </div>
    </aside>
  );
}