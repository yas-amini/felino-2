import { useEffect, useMemo, useState } from "react";
import "./AdminHomeOverviewSummary.css";
import AdminSectionHead from "../../../components/admin/shared/AdminSectionHead";

type WeeklySalesDay = {
  day: string;
  sales: number;
};

const mockWeeklySales: WeeklySalesDay[] = [
  { day: "Mån", sales: 4200 },
  { day: "Tis", sales: 6100 },
  { day: "Ons", sales: 5300 },
  { day: "Tor", sales: 7200 },
  { day: "Fre", sales: 9800 },
  { day: "Lör", sales: 12400 },
  { day: "Sön", sales: 7600 },
];

export default function AdminHomeOverviewSummary() {
  const [weeklySales, setWeeklySales] = useState<WeeklySalesDay[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    try {
      // När backend finns:
      // fetch("/api/admin/statistics/weekly-sales")
      //   .then((res) => res.json())
      //   .then((data: WeeklySalesDay[]) => setWeeklySales(data));

      setWeeklySales(mockWeeklySales);
    } catch (error) {
      console.error("Kunde inte ladda veckostatistik", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const maxSales = useMemo(() => {
    if (!weeklySales.length) return 0;
    return Math.max(...weeklySales.map((item) => item.sales));
  }, [weeklySales]);

  const yAxisTicks = useMemo(() => {
    if (!maxSales) return [0, 1000, 2000, 3000];

    const roundedTop = Math.ceil(maxSales / 1000) * 1000;
    const step = roundedTop / 4;

    return [
      roundedTop,
      Math.round(step * 3),
      Math.round(step * 2),
      Math.round(step),
      0,
    ];
  }, [maxSales]);

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("sv-SE", {
      style: "currency",
      currency: "SEK",
      maximumFractionDigits: 0,
    }).format(value);

  const formatTick = (value: number) => {
    if (value === 0) return "0";
    return `${Math.round(value / 1000)}k`;
  };

  return (
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
  <AdminSectionHead
    title="Försäljning per veckodag"
    description="Stapeldiagram över försäljning från måndag till söndag"
    level={2}
  />

        <div className="admin-week-chart" aria-label="Försäljning per veckodag">
          <div className="admin-week-chart__y">
            {yAxisTicks.map((tick) => (
              <span key={tick}>{formatTick(tick)}</span>
            ))}
          </div>

          <div className="admin-week-chart__main">
            <div className="admin-week-chart__grid">
              {yAxisTicks.slice(0, -1).map((tick) => (
                <span key={tick} />
              ))}
            </div>

            {loading ? (
              <p className="admin-week-chart__loading">Laddar statistik...</p>
            ) : (
              <div className="admin-week-chart__bars">
                {weeklySales.map((item) => {
                  const height =
                    maxSales > 0 ? `${(item.sales / maxSales) * 100}%` : "0%";

                  return (
                    <div className="admin-week-chart__group" key={item.day}>
                      <div className="admin-week-chart__bar-wrap">
                        <button
                          type="button"
                          className="admin-week-chart__bar-button"
                          title={`${item.day}: ${formatCurrency(item.sales)}`}
                          aria-label={`${item.day}: ${formatCurrency(item.sales)}`}
                        >
                          <span
                            className="admin-week-chart__bar"
                            style={{ height }}
                          />
                        </button>
                      </div>

                      <small>{item.day}</small>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}