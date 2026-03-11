import type { BookingTab } from "../../../pages/admin/Booking/AdminBookingPage";

type Props = {
  activeTab: BookingTab;
  onChange: (tab: BookingTab) => void;
};

export default function BookingTabs({ activeTab, onChange }: Props) {
  return (
    <div>
      <button
        type="button"
        onClick={() => onChange("lista")}
        aria-current={activeTab === "lista" ? "page" : undefined}
      >
        Lista
      </button>

      <button
        type="button"
        onClick={() => onChange("kalender")}
        aria-current={activeTab === "kalender" ? "page" : undefined}
      >
        Kalender
      </button>

      <button
        type="button"
        onClick={() => onChange("bord")}
        aria-current={activeTab === "bord" ? "page" : undefined}
      >
        Bord & kapacitet
      </button>
    </div>
  );
}