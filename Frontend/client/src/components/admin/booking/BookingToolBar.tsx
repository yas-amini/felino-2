import "./BookingToolBar.css";

export default function BookingToolBar() {
  return (
    <div className="booking-toolbar">
      <input
        type="date"
        className="booking-toolbar-date"
        aria-label="Välj datum"
      />

      <button
        type="button"
        className="fpAdminBtn fpAdminBtn--primary fpAdminBtn--field"
      >
        + Ny bokning
      </button>
    </div>
  );
}