import { useState } from "react";
import AdminPage from "../../../components/admin/layout/AdminPage";
import BookingTabs from "../../../components/admin/booking/BookingTabs";
import BookingToolBar from "../../../components/admin/booking/BookingToolBar";
import BookingCalendar from "../../../components/admin/booking/BookingCalendar";
import AdminSectionHead from "../../../components/admin/shared/AdminSectionHead";
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
  const [activeTab, setActiveTab] = useState<BookingTab>("kalender");

  const bookings = [
    {
      name: "Andersson",
      time: "17:00 - 19:00",
      people: 4,
      phone: "+46 70 123 4567",
      email: "andersson@example.com",
      table: "Nr 11",
      status: "Bekräftad",
    },
    {
      name: "Svensson",
      time: "17:00 - 19:00",
      people: 6,
      phone: "+46 70 123 4567",
      email: "andersson@example.com",
      table: "Nr 2",
      status: "Bekräftad",
    },
  ];

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

  return (
    <AdminPage title="Bordsbokningar">
      <section className="admin-booking-page">
        <AdminSectionHead
  level={1}
  title="Hantera bokningar"
  description="Här kan du se, skapa och hantera restaurangens bokningar."
          actions={<BookingToolBar />}
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

              {bookings.map((booking, i) => (
                <div className="booking-item" key={i}>
                  <div className="booking-header">
                    <strong>{booking.name}</strong>
                    <span className="badge confirmed">{booking.status}</span>
                  </div>

                  <div className="booking-info">
                    <span>
                      <FontAwesomeIcon icon={faClock} /> {booking.time}
                    </span>
                    <span>
                      <FontAwesomeIcon icon={faUsers} /> {booking.people} personer
                    </span>
                  </div>

                  {booking.phone && (
                    <div className="booking-info">
                      <span>
                        <FontAwesomeIcon icon={faPhone} /> {booking.phone}
                      </span>
                      <span>
                        <FontAwesomeIcon icon={faMailBulk} /> {booking.email}
                      </span>
                    </div>
                  )}

                  <div className="booking-table">Bord: {booking.table}</div>
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