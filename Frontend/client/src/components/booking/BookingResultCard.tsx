import Button from "../../components/common/Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDays,
  faUsers,
  faChair,
} from "@fortawesome/free-solid-svg-icons";
import type { FoundBooking } from "../../types/booking";
import "../../pages/tablebooking/TableBooking.css";

type Props = {
  booking: FoundBooking;
  onEdit: () => void;
  onCancel: () => void;
  isCancelling: boolean;
};

export default function BookingResultCard({
  booking,
  onEdit,
  onCancel,
  isCancelling,
}: Props) {
  return (
    <div className="booking-result-card">
      <h3>Din bokning</h3>

      <div className="found-booking-row">
        <FontAwesomeIcon icon={faCalendarDays} />
        <p>
          {booking.date} kl. {booking.time}
        </p>
      </div>

      <div className="found-booking-row">
        <FontAwesomeIcon icon={faUsers} />
        <p>{booking.numberOfGuests} gäster</p>
      </div>

      <div className="found-booking-row">
        <FontAwesomeIcon icon={faChair} />
        <p>{booking.outdoorSeating ? "Uteservering" : "Inomhus"}</p>
      </div>

      <p className="booking-status">
        <strong>Status:</strong> {booking.status}
      </p>

      {booking.status === "Cancelled" && (
        <p className="field-error">Den här bokningen är avbokad.</p>
      )}

      <div className="booking-actions">
        <Button
          type="button"
          onClick={onEdit}
          disabled={booking.status === "Cancelled"}
        >
          Ändra bokning
        </Button>

        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
          disabled={isCancelling || booking.status === "Cancelled"}
        >
          {isCancelling ? "Avbokar..." : "Avboka"}
        </Button>
      </div>

      <p className="booking-id">#{booking.bookingId}</p>
    </div>
  );
}