import "./BookingCalendar.css";

export default function BookingCalendar() {
  const timeSlots = [
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
    "18:30",
    "19:00",
    "19:30",
    "20:00",
    "20:30",
    "21:00",
    "21:30",
  ];

  const bookingRows = [
    { id: 1, time: "17:00", name: "Nilsson" },
    { id: 2, time: "18:00", name: "Andersson" },
    { id: 3, time: "19:00", name: "Svensson" },
    { id: 4, time: "20:00", name: "Lindstrand" },
    { id: 5, time: "21:00", name: "Lindberg" },
    { id: 6, time: "22:00", name: "Johansson" },
    { id: 7, time: "23:00", name: "Karlsson" },
    { id: 8, time: "24:00", name: "Persson" },
  ];

  return (
    <div className="calendar">
      <div className="calendar-layout">
        <aside className="calendar-sidebar">
          <div className="calendar-sidebar-header">Bokningar</div>

          <div className="calendar-sidebar-body">
            {bookingRows.map((booking) => (
              <div key={booking.id} className="calendar-sidebar-row">
                <span className="calendar-time-badge">{booking.time}</span>
                <span className="calendar-booking-name">{booking.name}</span>
              </div>
            ))}
          </div>
        </aside>

        <section className="calendar-main">
          <div
            className="calendar-time-header"
            style={{
              gridTemplateColumns: `repeat(${timeSlots.length}, minmax(90px, 1fr))`,
            }}
          >
            {timeSlots.map((time) => (
              <div key={time} className="calendar-time-header-cell">
                {time}
              </div>
            ))}
          </div>

          <div
            className="calendar-grid"
            style={{
              gridTemplateColumns: `repeat(${timeSlots.length}, minmax(90px, 1fr))`,
              gridTemplateRows: `repeat(${bookingRows.length}, 64px)`,
            }}
          >
            {Array.from({
              length: bookingRows.length * timeSlots.length,
            }).map((_, index) => (
              <div key={index} className="calendar-grid-cell" />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}