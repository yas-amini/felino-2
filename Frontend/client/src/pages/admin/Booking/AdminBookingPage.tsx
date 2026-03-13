import { useState } from "react";
import AdminPage from "../../../components/admin/layout/AdminPage";
import BookingTabs from "../../../components/admin/booking/BookingTabs";
import BookingToolBar from "../../../components/admin/booking/BookingToolBar";
import BookingCalendar from "../../../components/admin/booking/BookingCalendar";
import "./AdminBookingPage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faPhone, faMailBulk, faUsers, faMapPin } from "@fortawesome/free-solid-svg-icons";
import Button from "../../../components/common/Button/Button";


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
      status: "Bekräftad"
    },
    {
      name: "Svensson",
      time: "17:00 - 19:00",
      people: 6,
      phone: "+46 70 123 4567",
      email: "andersson@example.com",
      table: "Nr 2",
      status: "Bekräftad"
    }
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

      <div className="tabs-Toolbar">
        <div className="header-calendar">
          <p>Här kan du se bokingar</p>
          <BookingToolBar />
        </div>

        <div>
          <BookingTabs activeTab={activeTab} onChange={setActiveTab} />
          {activeTab === "kalender" && <BookingCalendar />}

          {activeTab === "lista" && (
            <div>
              <section className="booking-section">
                <h3>Bokningar (2)</h3>

                {bookings.map((booking, i) => (
                  <div className="booking-item" key={i}>
                    <div className="booking-header">
                      <strong>{booking.name}</strong>
                      <span className="badge confirmed">{booking.status}</span>
                    </div>

                    <div className="booking-info">
                      <span><FontAwesomeIcon icon={faClock} /> {booking.time}</span>
                      <span><FontAwesomeIcon icon={faUsers} /> {booking.people} personer</span>
                    </div>

                    {booking.phone && (
                      <div className="booking-info">
                        <span><FontAwesomeIcon icon={faPhone} /> {booking.phone}</span>
                        <span><FontAwesomeIcon icon={faMailBulk} /> {booking.email}</span>
                      </div>
                    )}

                    <div className="booking-table">
                      Bord: {booking.table}
                    </div>
                  </div>
                ))}
              </section>
            </div>
          )}
          {activeTab === "bord" && (
            <section className="tables-section">
              <div className="tables-section-header">
                <h3>Bord & Kapacitet</h3>
                <Button variant="primary">Lägg till bord</Button>
              </div>

              <div className="tables-grid">
                {tables.map((table) => (
                  <div className="table-card" key={table.name}>
                    <div className="table-card-top">
                      <h4>{table.name}</h4>
                      <span className="table-status available">✓ {table.status}</span>
                    </div>

                    <div className="table-meta">
                      <p><FontAwesomeIcon icon={faUsers} /> Kapacitet: {table.capacity} personer</p>
                      <p><FontAwesomeIcon icon={faMapPin} /> {table.location}</p>
                    </div>

                    <div className="table-card-actions">
                      <Button variant="secondary">Redigera</Button>
                      <Button variant="primary">Boka</Button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

      </div>
    </AdminPage>
  );
}