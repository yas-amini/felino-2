import { useEffect, useState } from "react";
import { getAvailableTimesForDate } from "../../../utils/bookingTimeSlots";
import "./BookingCalendar.css";
import { getAdminTables, type TableDto } from "../../../api/tableApi";
import {
  getBookingsOverviewByDate,
  type BookingOverviewDto,
} from "../../../api/bookingApi";

type BookingCalendarProps = {
  selectedDate: string;
};

export default function BookingCalendar({
  selectedDate,
}: BookingCalendarProps) {
  const timeSlots = getAvailableTimesForDate(selectedDate, 60);

  const [tables, setTables] = useState<TableDto[]>([]);
  const [bookings, setBookings] = useState<BookingOverviewDto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadCalendarData = async () => {
      if (!selectedDate) return;

      setIsLoading(true);
      setError("");

      try {
        const [tablesResult, bookingsResult] = await Promise.all([
          getAdminTables(),
          getBookingsOverviewByDate(selectedDate),
        ]);

        setTables(tablesResult);
        setBookings(bookingsResult);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("Kunde inte hämta kalenderdata.");
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadCalendarData();
  }, [selectedDate]);

  if (isLoading) {
    return <p>Laddar kalender...</p>;
  }

  if (error) {
    return <p className="field-error">{error}</p>;
  }

  return (
    <div className="calendar">
      <div className="calendar-layout">
        <aside className="calendar-sidebar">
          <div className="calendar-sidebar-header">Kalender</div>

          <div className="calendar-sidebar-body">
            {tables.map((table) => (
              <div key={table.id} className="calendar-sidebar-row">
                <div className="calendar-table-name">{table.name}</div>
                <div className="calendar-table-meta">
                  {table.capacity} pers ·{" "}
                  {table.placement === "Outdoor" ? "Utomhus" : "Inomhus"}
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
            }}
          >
            {tables.flatMap((table) =>
              timeSlots.map((slot) => {
                const booking = bookings.find(
                  (b) =>
                    b.tableId === table.id &&
                    b.time.slice(0, 5) === slot &&
                    b.status === "Confirmed"
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