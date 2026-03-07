import { useState } from "react";
import AdminPage from "../../components/admin/AdminPage";
import "./AdminHomePage.css";
import AdminButton from "../../components/admin/AdminButton";
import AdminModal from "../../components/admin/AdminModal";
import { useNavigate } from "react-router-dom";

export default function AdminHomePage() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [isOpenRestaurant, setIsOpenRestaurant] = useState(true);

  const oldestOrder = {
    id: 1001,
    title: "Vesuvio + Coca-Cola",
    service: "Hemleverans",
    comment: "Ingen lök tack. Ring när ni är utanför.",
  };

  return (
    <AdminPage title="Översikt">
      <section className="admin-settings">
        <section className="admin-section">
          <div className="admin-home-section-head">
            <div>
              <h2>Snabb överblick</h2>
              <p>En enkel startsida för restaurangens adminpanel.</p>
            </div>

            <button
              className={`admin-home-status-toggle ${
                isOpenRestaurant
                  ? "admin-home-status-toggle--open"
                  : "admin-home-status-toggle--closed"
              }`}
              onClick={() => setIsOpenRestaurant((prev) => !prev)}
              type="button"
            >
              {isOpenRestaurant ? "Öppet" : "Stängt"}
            </button>
          </div>

          <div className="admin-home-summary">
            <div className="admin-home-summary-left">
              <div className="admin-home-summary-stat">
                <span className="admin-home-summary-label">Dagens försäljning</span>
                <strong className="admin-home-summary-value">12 480 kr</strong>
              </div>

              <div className="admin-home-summary-stat">
                <span className="admin-home-summary-label">Antal beställningar</span>
                <strong className="admin-home-summary-value">18</strong>
              </div>

              <div className="admin-home-summary-stat">
                <span className="admin-home-summary-label">Snittorder</span>
                <strong className="admin-home-summary-value">693 kr</strong>
              </div>
            </div>

            <div className="admin-analytics-card">
              <div className="admin-analytics-card__head">
                <h3>Försäljning per dag</h3>
                <p>Staplar = ordrar, linje = omsättning</p>
              </div>

              <div className="admin-mixed-chart" aria-hidden="true">
                <div className="admin-mixed-chart__y admin-mixed-chart__y--left">
                  <span>3k</span>
                  <span>2k</span>
                  <span>1k</span>
                  <span>0</span>
                </div>

                <div className="admin-mixed-chart__main">
                  <div className="admin-mixed-chart__grid">
                    <span />
                    <span />
                    <span />
                    <span />
                  </div>

                  <div className="admin-mixed-chart__plot">
                    <div className="admin-mixed-chart__bars">
                      <div className="bar-group">
                        <span className="bar" style={{ height: "42%" }} />
                        <small>Mån</small>
                      </div>

                      <div className="bar-group">
                        <span className="bar" style={{ height: "42%" }} />
                        <small>Tis</small>
                      </div>

                      <div className="bar-group">
                        <span className="bar" style={{ height: "34%" }} />
                        <small>Ons</small>
                      </div>

                      <div className="bar-group">
                        <span className="bar" style={{ height: "78%" }} />
                        <small>Tors</small>
                      </div>

                      <div className="bar-group">
                        <span className="bar" style={{ height: "46%" }} />
                        <small>Fre</small>
                      </div>

                      <div className="bar-group">
                        <span className="bar" style={{ height: "18%" }} />
                        <small>Lör</small>
                      </div>
                    </div>

                    <svg
                      viewBox="0 0 600 220"
                      preserveAspectRatio="none"
                      className="admin-mixed-chart__line"
                    >
                      <path
                        d="M30,130
                           L130,130
                           L230,55
                           L330,55
                           L430,55
                           L530,170"
                        fill="none"
                        stroke="#7fcfc5"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />

                      <circle cx="30" cy="130" r="5" fill="#7fcfc5" />
                      <circle cx="130" cy="130" r="5" fill="#7fcfc5" />
                      <circle cx="230" cy="55" r="5" fill="#7fcfc5" />
                      <circle cx="330" cy="55" r="5" fill="#7fcfc5" />
                      <circle cx="430" cy="55" r="5" fill="#7fcfc5" />
                      <circle cx="530" cy="170" r="5" fill="#7fcfc5" />
                    </svg>
                  </div>
                </div>

                <div className="admin-mixed-chart__y admin-mixed-chart__y--right">
                  <span>3k</span>
                  <span>2k</span>
                  <span>1k</span>
                  <span>0</span>
                </div>
              </div>
            </div>
          </div>

          <div className="admin-home-stats">
            <button
              className="admin-home-stat-card admin-home-stat-card--orders"
              onClick={() => navigate("/admin/orders")}
            >
              <span className="admin-home-stat-label">Nya beställningar</span>
              <div className="admin-home-stat-bottom">
                <div className="admin-home-stat-graphic">
                  <span />
                  <span />
                  <span />
                  <span />
                </div>
                <strong className="admin-home-stat-value">4</strong>
              </div>
            </button>

            <button
              className="admin-home-stat-card admin-home-stat-card--booking"
              onClick={() => navigate("/admin/booking")}
            >
              <span className="admin-home-stat-label">Dagens bokningar</span>
              <div className="admin-home-stat-bottom">
                <div className="admin-home-stat-wave" />
                <strong className="admin-home-stat-value">7</strong>
              </div>
            </button>

            <button
              className="admin-home-stat-card admin-home-stat-card--products"
              onClick={() => navigate("/admin/products")}
            >
              <span className="admin-home-stat-label">Aktiva kampanjer</span>

              <div className="admin-home-stat-bottom admin-home-stat-bottom--stack">
                <div className="admin-home-stat-order">
                  <strong className="admin-home-stat-order-title">2 kampanjer live</strong>
                  <span className="admin-home-stat-order-meta">
                    Lunchdeal + Familjepizza fredag
                  </span>
                </div>
              </div>
            </button>

            <button
              className="admin-home-stat-card admin-home-stat-card--urgent"
              onClick={() => navigate(`/admin/orders#order-${oldestOrder.id}`)}
            >
              <span className="admin-home-stat-label">Äldsta order just nu</span>

              <div className="admin-home-stat-bottom admin-home-stat-bottom--stack">
                <div className="admin-home-stat-order">
                  <strong className="admin-home-stat-order-title">{oldestOrder.title}</strong>
                  <div className="admin-home-stat-order-meta-row">
                    <span className="admin-home-stat-order-meta">
                      {oldestOrder.service}
                    </span>

                    {oldestOrder.comment ? (
                      <span className="admin-home-stat-order-note-inline">
                        , "{oldestOrder.comment}"
                      </span>
                    ) : null}
                  </div>
                </div>
              </div>
            </button>
          </div>
        </section>

        <section className="admin-section">
          <h2>Dagens läge</h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: 12,
              marginTop: 10,
            }}
          >
            <div className="admin-home-panel">
              <h3>Beställningar</h3>
              <p>2 nya, 1 tillagas, 1 klar för upphämtning.</p>
            </div>

            <div className="admin-home-panel">
              <h3>Bord</h3>
              <p>Första bokningen 17:30. Flera sällskap ikväll.</p>
            </div>

            <div className="admin-home-panel">
              <h3>Kök</h3>
              <p>Normal belastning just nu. Ingen varning.</p>
            </div>
          </div>
        </section>

        <section className="admin-section">
          <h2>Att göra</h2>

          <ul className="admin-home-list">
            <li>Kontrollera kvällens bokningar</li>
            <li>Uppdatera dagens lunch</li>
            <li>Se över produkter utan bild</li>
            <li>Bekräfta nya beställningar</li>
          </ul>
        </section>

        <AdminModal
          isOpen={open}
          onClose={() => setOpen(false)}
          title="Stäng restaurang?"
        >
          <p>Detta är bara en demo. Här kan du senare lägga riktig funktionalitet.</p>

          <div style={{ display: "flex", gap: 8, marginTop: 14 }}>
            <AdminButton variant="cancel" type="button" onClick={() => setOpen(false)}>
              Avbryt
            </AdminButton>

            <AdminButton variant="danger" type="button" onClick={() => setOpen(false)}>
              Stäng
            </AdminButton>
          </div>
        </AdminModal>
      </section>
    </AdminPage>
  );
}