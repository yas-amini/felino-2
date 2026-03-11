import "./BookingCalendar.css";

export default function BookingCalendar() {
  return (
    <div className="calendar-container">
      <div className="calendar-layout">
        <aside>
          <h3>Bokningar</h3>
          <p>17:00 Nilsson</p>
          <p>18:00 Andersson</p>
        </aside>

        <section className="calendar-area">
          <p>Här kommer kalendergrid</p>
        </section>

      </div>
    </div>

  );
}