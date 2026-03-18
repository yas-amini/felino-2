import { useNavigate } from "react-router-dom";
import "./AdminHomeToday.css";

const adminEvents = [
  {
    label: "Ordrar",
    text: "Ny order inkom från hemleverans.",
    meta: 'Order #1001: "Vesuvio + Coca-Cola".',
    route: "/admin/orders",
    variant: "orders",
  },
  {
    label: "Bokningar",
    text: "Ny bokning registrerad för idag.",
    meta: "7 bokningar ligger just nu inlagda.",
    route: "/admin/booking",
    variant: "booking",
  },
  {
    label: "Produkter",
    text: 'Produkten "Kebabpizza Special" har lagts till.',
    meta: "Senaste ändringen gjordes i menyn.",
    route: "/admin/products",
    variant: "products",
  },
  {
    label: "Kampanjer",
    text: "Ny kampanj skapad: Familjepizza fredag.",
    meta: "Kampanjen är aktiv just nu.",
    route: "/admin/campaigns",
    variant: "campaigns",
  },
];

export default function AdminHomeToday() {
  const navigate = useNavigate();

  return (
    <div className="admin-home-today-grid">
      {adminEvents.map((item) => (
        <div
          key={item.route}
          className={`admin-home-today-item admin-home-today-item--${item.variant}`}
        >
          <span className="admin-home-today-label">{item.label}</span>

          <button
            type="button"
            className={`admin-home-today-card admin-home-today-card--${item.variant}`}
            onClick={() => navigate(item.route)}
          >
            <div className="admin-home-today-card-content">
              <strong className="admin-home-today-card-value">{item.text}</strong>
              <span className="admin-home-today-card-meta">{item.meta}</span>
            </div>
          </button>
        </div>
      ))}
    </div>
  );
}