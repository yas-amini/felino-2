import { useState } from "react";
import AdminPage from "../../../components/admin/layout/AdminPage";
import BookingTabs from "../../../components/admin/booking/BookingTabs";
import BookingToolBar from "../../../components/admin/booking/BookingToolBar";
import BookingCalendar from "../../../components/admin/booking/BookingCalendar";

export type BookingTab = "lista" | "kalender" | "bord";

export default function AdminBookingPage() {

  const [activeTab, setActiveTab] = useState<BookingTab>("kalender");

  return (
    <AdminPage title="Bordsbokningar">
      <div>
        <BookingTabs activeTab={activeTab} onChange={setActiveTab} />

        <BookingToolBar />

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

    </AdminPage>
  );
}