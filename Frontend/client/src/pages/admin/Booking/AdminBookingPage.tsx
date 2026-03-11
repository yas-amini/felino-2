import { useState } from "react";
import AdminPage from "../../../components/admin/layout/AdminPage";
import BookingTabs from "../../../components/admin/booking/BookingTabs";
import BookingToolBar from "../../../components/admin/booking/BookingToolBar";
import BookingCalendar from "../../../components/admin/booking/BookingCalendar";
import "./AdminBookingPage.css";

export type BookingTab = "lista" | "kalender" | "bord";

export default function AdminBookingPage() {

  const [activeTab, setActiveTab] = useState<BookingTab>("kalender");

  return (
    <AdminPage title="Bordsbokningar">

      <div className="tabs-Toolbar">
        <BookingToolBar />
        <div>
          <BookingTabs activeTab={activeTab} onChange={setActiveTab} />
          {activeTab === "kalender" && <BookingCalendar />}

          {activeTab === "lista" && (
            <div>
              Lista-vyn byggs senare.
            </div>
          )}

          {activeTab === "bord" && (
            <div>
              Bord & kapacitet-vyn byggs senare.
            </div>
          )}
        </div>


      </div>



    </AdminPage>
  );
}