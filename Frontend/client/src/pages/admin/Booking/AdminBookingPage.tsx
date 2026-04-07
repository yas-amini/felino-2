import { useState, useEffect } from "react";
import AdminPage from "../../../components/admin/layout/AdminPage";
import { useAdminTopbar } from "../../../components/admin/useAdminTopbar";
import BookingTabs from "../../../components/admin/booking/BookingTabs";
import BookingCalendar from "../../../components/admin/booking/BookingCalendar";
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
  faMapPin,
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


  const tables = [
    { name: "Nr 1", capacity: 4, location: "Utomhus", status: "Tillgänglig" },
    { name: "Nr 2", capacity: 6, location: "Inomhus", status: "Tillgänglig" },
    { name: "Nr 3", capacity: 2, location: "Utomhus", status: "Tillgänglig" },
    { name: "Nr 4", capacity: 8, location: "Inomhus", status: "Tillgänglig" },
    { name: "Nr 5", capacity: 4, location: "Inomhus", status: "Tillgänglig" },
    { name: "Nr 6", capacity: 6, location: "Inomhus", status: "Tillgänglig" },
    { name: "Nr 7", capacity: 2, location: "Utomhus", status: "Tillgänglig" },
    { name: "Nr 8", capacity: 4, location: "Utomhus", status: "Tillgänglig" },
  ];
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
          {activeTab === "kalender" && <BookingCalendar />}

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
                    <span>{booking.status}</span>
                  </div>

                  <p>
                    {booking.time} • {booking.numberOfGuests} personer
                  </p>

                  <p>
                    {booking.phone} • {booking.email}
                  </p>

                  <p>Bord: {booking.tableName}</p>
                </div>
              ))}

            </section>
          )}

          {activeTab === "bord" && (
            <section className="tables-section">
              <AdminSectionHead
                level={2}
                title="Bord & kapacitet"
                description="Hantera restaurangens bord, placeringar och tillgänglighet."
                actions={
                  <button
                    type="button"
                    className="fpAdminBtn fpAdminBtn--primary"
                  >
                    Lägg till bord
                  </button>
                }
              />

              <div className="tables-grid">
                {tables.map((table) => (
                  <div className="table-card" key={table.name}>
                    <div className="table-card-top">
                      <h4>{table.name}</h4>
                      <span className="table-status available">
                        ✓ {table.status}
                      </span>
                    </div>

                    <div className="table-meta">
                      <p>
                        <FontAwesomeIcon icon={faUsers} /> Kapacitet: {table.capacity} personer
                      </p>
                      <p>
                        <FontAwesomeIcon icon={faMapPin} /> {table.location}
                      </p>
                    </div>

                    <div className="table-card-actions">
                      <button
                        type="button"
                        className="fpAdminBtn fpAdminBtn--primary fpAdminBtn--md"
                      >
                        Redigera
                      </button>
                      <button
                        type="button"
                        className="fpAdminBtn fpAdminBtn--primary fpAdminBtn--md"
                      >
                        Boka
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </section>
      </section>
    </AdminPage>
  );
}