import AdminPage from "../../../components/admin/layout/AdminPage";
import BookingTabs from "../../../components/admin/booking/BookingTabs";
import BookingToolBar from "../../../components/admin/booking/BookingToolBar";
import BookingCalendar from "../../../components/admin/booking/BookingCalendar";

export default function AdminBookingPage() {
  return (
    <AdminPage title="Bordsbokningar">
      <BookingTabs />
      <BookingToolBar />
      <BookingCalendar />
    </AdminPage>
  );
}