import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminHomeToday.css";

type AdminTodayEvent = {
  label: string;
  text: string;
  meta: string;
  route: string;
  variant: string;
};

export default function AdminHomeToday() {
  const navigate = useNavigate();
  const [adminEvents, setAdminEvents] = useState<AdminTodayEvent[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await fetch("/api/admin/dashboard/today", {
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Kunde inte hämta senaste händelser.");
        }

        const data: AdminTodayEvent[] = await response.json();
        setAdminEvents(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Något gick fel.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) {
    return <p>Laddar senaste händelser...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

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