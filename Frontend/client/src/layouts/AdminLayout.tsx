import { useMemo, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import "./AdminLayout.css";

type TopbarState = {
  title?: string;
  rightImageSrc?: string;
  rightImageAlt?: string;
};

type AdminNotice = {
  id: number;
  type: "order" | "booking" | "campaign" | "system";
  text: string;
  to: string;
};

const INITIAL_NOTICES: AdminNotice[] = [
  {
    id: 1,
    type: "order",
    text: "Ny beställning från Elin Andersson",
    to: "/admin/orders",
  },
  {
    id: 2,
    type: "booking",
    text: "Ny bordsbokning för 4 personer kl. 19:30",
    to: "/admin/booking",
  },
  {
    id: 3,
    type: "order",
    text: "Beställning #1042 väntar på bekräftelse",
    to: "/admin/orders",
  },
  {
    id: 4,
    type: "campaign",
    text: "Kampanjen Studentkampanj startar imorgon",
    to: "/admin/campaigns",
  },
  {
    id: 5,
    type: "system",
    text: "Systemet väntar på uppdatering",
    to: "/admin/settings",
  },
  {
    id: 6,
    type: "booking",
    text: "Ny bokning för 2 personer kl. 20:00",
    to: "/admin/booking",
  },
    {
    id: 7,
    type: "booking",
    text: "Ny bokning för 2 personer kl. 20:00",
    to: "/admin/booking",
  },
];

const MAX_VISIBLE_NOTICES = 6;

export default function AdminLayout() {
  const navigate = useNavigate();
  const [notices, setNotices] = useState<AdminNotice[]>(INITIAL_NOTICES);

  const setTopbar = (_next: TopbarState) => {};

  function dismissNotice(id: number) {
    setNotices((prev) => prev.filter((notice) => notice.id !== id));
  }

  function clearAllNotices() {
    setNotices([]);
  }

  const overflowCount = Math.max(0, notices.length - MAX_VISIBLE_NOTICES);

  const visibleNotices = useMemo(
    () => notices.slice(0, MAX_VISIBLE_NOTICES),
    [notices]
  );

  return (
    <div className="admin">
      {/* SIDOMENY */}
      <aside className="admin-sidebar" aria-label="Sidomeny">
        <div className="admin-sidebar-scroll">
          <nav className="admin-menu">
            <NavLink to="/admin/profile" className="admin-tile admin-tile--profile">
              <img className="admin-tile-img" src="/images/admin/icons/profile.png" alt="Användare" title="Admin"/>
            </NavLink>

            <NavLink to="/admin" end className="admin-tile admin-tile--home">
              <img className="admin-tile-img" src="/images/admin/icons/home.png" alt="Hem" title="Översikt"/>
            </NavLink>

            <NavLink to="/admin/orders" className="admin-tile admin-tile--orders">
              <img className="admin-tile-img" src="/images/admin/icons/orders.png" alt="Beställningar" title="Beställningar"/>
            </NavLink>

            <NavLink to="/admin/booking" className="admin-tile admin-tile--booking">
              <img className="admin-tile-img" src="/images/admin/icons/booking.png" alt="Bordsbokningar" title="Bordsbokningar"/>
            </NavLink>

            <NavLink to="/admin/products" className="admin-tile admin-tile--products">
              <img className="admin-tile-img" src="/images/admin/icons/products.png" alt="Produkter" title="Produkter" />
            </NavLink>

            <NavLink to="/admin/settings" className="admin-tile admin-tile--settings">
              <img className="admin-tile-img" src="/images/admin/icons/settings.png" alt="Inställningar" title="Inställningar"/>
            </NavLink>

            <NavLink to="/admin/categories" className="admin-tile admin-tile--categories">
              <img className="admin-tile-img" src="/images/admin/icons/categories.png" alt="Kategorier"title="Kategorier" />
            </NavLink>

            <NavLink to="/admin/campaigns" className="admin-tile admin-tile--campaigns">
              <img className="admin-tile-img" src="/images/admin/icons/campaigns.png" alt="Kampanjer" title="Kampanjer"/>
            </NavLink>
          </nav>
        </div>
      </aside>

      {/* SUBBAR + NOTISER */}
      <div id="admin-subbar" className="admin-subbar" aria-label="Undermenyn">
        <div className="admin-notice-rail" aria-label="Nya händelser">
          {overflowCount > 0 && (
            <div className="admin-notice-counter">+{overflowCount}</div>
          )}

          {visibleNotices.map((notice) => (
            <article
              key={notice.id}
              className={`admin-notice-chip admin-notice-chip--${notice.type}`}
              role="button"
              tabIndex={0}
              onClick={() => navigate(notice.to)}
            >
              <span className={`admin-notice-chip__dot admin-notice-chip__dot--${notice.type}`} />
              <span className="admin-notice-chip__text">{notice.text}</span>

              <button
                type="button"
                className="admin-notice-chip__close"
                onClick={(e) => {
                  e.stopPropagation();
                  dismissNotice(notice.id);
                }}
              >
                ×
              </button>
            </article>
          ))}

          {notices.length > 0 && (
            <button
              className="admin-notice-clear"
              onClick={clearAllNotices}
              title="Rensa alla notiser"
            >
              Rensa alla
            </button>
          )}
        </div>
      </div>

      {/* CONTENT */}
      <main className="admin-page">
        <Outlet context={{ setTopbar }} />
      </main>

      <footer className="admin-footer" />
    </div>
  );
}