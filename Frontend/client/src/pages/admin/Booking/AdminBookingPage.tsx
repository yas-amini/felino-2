import { useState, useEffect } from "react";
import AdminPage from "../../../components/admin/layout/AdminPage";
import { useAdminTopbar } from "../../../components/admin/useAdminTopbar";
import BookingTabs from "../../../components/admin/booking/BookingTabs";
import BookingCalendar from "../../../components/admin/booking/BookingCalendar";
import BookingTables from "../../../components/admin/booking/BookingTables";
import AdminSectionHead from "../../../components/admin/shared/AdminSectionHead";
import { getBookingsByDate } from "../../../api/bookingApi";
import type { BookingResponse } from "../../../types/booking";
import "./AdminBookingPage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faPhone,
  faMailBulk,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";

export type BookingTab = "lista" | "kalender" | "bord";

export default function AdminBookingPage() {
  useAdminTopbar("Bordsbokningar");

  const [activeTab, setActiveTab] = useState<BookingTab>("kalender");

  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [bookings, setBookings] = useState<BookingResponse[]>([]);
  const [isLoadingBookings, setIsLoadingBookings] = useState(false);
  const [bookingsError, setBookingsError] = useState("");

  useEffect(() => {
    const loadBookings = async () => {
      if (!selectedDate) return;

      setIsLoadingBookings(true);
      setBookingsError("");

      try {
        const result = await getBookingsByDate(selectedDate);
        setBookings(result);
      } catch (error) {
        if (error instanceof Error) {
          setBookingsError(error.message);
        } else {
          setBookingsError("Kunde inte hämta bokningar.");
        }
      } finally {
        setIsLoadingBookings(false);
      }
    };

    loadBookings();
  }, [selectedDate]);


  return (
    <AdminPage>
      <section className="admin-booking-page">
        <AdminSectionHead
          level={1}
          title="Hantera bokningar"
          description="Här kan du se, skapa och hantera restaurangens bokningar."
          actions={<div className="booking-toolbar">
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />


            <button
              type="button"
              className="fpAdminBtn fpAdminBtn--primary fpAdminBtn--field"
            >
              + Ny bokning
            </button>
          </div>}
        />

        <section className="admin-booking-tabs-section">
          <BookingTabs activeTab={activeTab} onChange={setActiveTab} />
        </section>

        <section className="admin-booking-content">
          {activeTab === "kalender" && (
            <BookingCalendar selectedDate={selectedDate} />
          )}

          {activeTab === "lista" && (
            <section className="booking-section">
              <AdminSectionHead
                level={2}
                title={`Bokningar (${bookings.length})`}
                description="Översikt över aktuella bokningar."
              />

              {isLoadingBookings && <p>Laddar bokningar...</p>}
              {bookingsError && <p className="field-error">{bookingsError}</p>}

              {!isLoadingBookings && !bookingsError && bookings.length === 0 && (
                <p>Inga bokningar för valt datum.</p>
              )}

              {bookings.map((booking) => (
                <div key={booking.bookingId} className="admin-booking-item">
                  <div className="admin-booking-header">
                    <h3>{booking.name}</h3>
                    <span className="booking-status button">
                      {booking.status}
                    </span>
                  </div>
                  <div className="admin-booking-details">
                    <FontAwesomeIcon icon={faClock} />
                    <p>
                      {booking.time.slice(0, 5)}
                    </p>
                    <FontAwesomeIcon icon={faUsers} />
                    <p>{booking.numberOfGuests} personer
                    </p>
                  </div>

                  <div className="admin-booking-contact">
                    <FontAwesomeIcon icon={faPhone} />
                    <p>
                      {booking.phone}
                    </p>
                    <FontAwesomeIcon icon={faMailBulk} />
                    <p>{booking.email}
                    </p>
                  </div>


                  <p className="table-assigned">Bord: {booking.tableName}</p>
                </div>
              ))}

            </section>
          )}

          {activeTab === "bord" && <BookingTables />}
        </section>
      </section>
    </AdminPage>
  );
}