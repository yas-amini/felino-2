import type { BookingTab } from "../../../pages/admin/Booking/AdminBookingPage";
import "./BookingTabs.css";

type Props = {
  activeTab: BookingTab;
  onChange: (tab: BookingTab) => void;
};

export default function BookingTabs({ activeTab, onChange }: Props) {
  return (
    <nav className="booking-tabs" aria-label="Bokningsvy">
      <button
        type="button"
        className="booking-tab fpAdminBtn fpAdminBtn--primary fpAdminBtn--md"
        data-active={activeTab === "lista"}
        onClick={() => onChange("lista")}
      >
        Lista
      </button>

      <button
        type="button"
        className="booking-tab fpAdminBtn fpAdminBtn--primary fpAdminBtn--md"
        data-active={activeTab === "kalender"}
        onClick={() => onChange("kalender")}
      >
        Kalender
      </button>

      <button
        type="button"
        className="booking-tab fpAdminBtn fpAdminBtn--primary fpAdminBtn--md"
        data-active={activeTab === "bord"}
        onClick={() => onChange("bord")}
      >
        Bord & kapacitet
      </button>
    </nav>
  );
}