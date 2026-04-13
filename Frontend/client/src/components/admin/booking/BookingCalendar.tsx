import { getAvailableTimesForDate } from "../../../utils/bookingTimeSlots";

export default function BookingCalendar() {
  const today = new Date().toISOString().split("T")[0];
  const timeSlots = getAvailableTimesForDate(today, 60);

  const tables = [
    { id: 1, name: "Bord 1", capacity: 2, placement: "Indoor" },
    { id: 2, name: "Bord 2", capacity: 4, placement: "Outdoor" },
    { id: 3, name: "Bord 3", capacity: 4, placement: "Indoor" },
    { id: 4, name: "Bord 4", capacity: 6, placement: "Outdoor" },
  ];

  const bookings = [
    { id: 1, tableId: 1, time: "17:00", customerName: "Nilsson", numberOfGuests: 2 },
    { id: 2, tableId: 2, time: "18:00", customerName: "Andersson", numberOfGuests: 4 },
    { id: 3, tableId: 3, time: "19:00", customerName: "Svensson", numberOfGuests: 3 },
    { id: 4, tableId: 4, time: "20:00", customerName: "Lindstrand", numberOfGuests: 5 },
  ];

  return (
    <div className="calendar">
      <div className="calendar-layout">
        <aside className="calendar-sidebar">
          <div className="calendar-sidebar-header">Bord</div>

          <div className="calendar-sidebar-body">
            {tables.map((table) => (
              <div key={table.id} className="calendar-sidebar-row">
                <div className="calendar-table-name">{table.name}</div>
                <div className="calendar-table-meta">
                  {table.capacity} pers · {table.placement === "Outdoor" ? "Utomhus" : "Inomhus"}
                </div>
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
              gridTemplateRows: `repeat(${tables.length}, 64px)`,
            }}
          >
            {tables.flatMap((table) =>
              timeSlots.map((slot) => {
                const booking = bookings.find(
                  (b) => b.tableId === table.id && b.time === slot
                );

                return (
                  <div
                    key={`${table.id}-${slot}`}
                    className={`calendar-grid-cell ${booking ? "booked" : ""}`}
                  >
                    {booking && (
                      <div className="calendar-booking-card">
                        <div className="calendar-booking-name">
                          {booking.customerName}
                        </div>
                        <div className="calendar-booking-meta">
                          {booking.numberOfGuests} pers
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </section>
      </div>
    </div>
  );
}