import { useState } from "react";
import AdminPage from "../../../components/admin/layout/AdminPage";
import BookingTabs from "../../../components/admin/booking/BookingTabs";
import BookingToolBar from "../../../components/admin/booking/BookingToolBar";
import BookingCalendar from "../../../components/admin/booking/BookingCalendar";
import "./AdminBookingPage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faPhone, faMailBulk, faUsers } from "@fortawesome/free-solid-svg-icons";

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
        </div>
      </div>
    </AdminPage>
  );
}