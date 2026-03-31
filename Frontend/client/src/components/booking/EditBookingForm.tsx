import Button from "../common/Button/Button";
import "../../pages/tablebooking/TableBooking.css";
import type {
  EditBookingErrors,
  EditBookingFormState,
} from "../../types/booking";

type Props = {
  form: EditBookingFormState;
  errors: EditBookingErrors;
  isUpdating: boolean;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => void;
  onCancel: () => void;
  onSave: () => void;
};

export default function EditBookingForm({
  form,
  errors,
  isUpdating,
  onChange,
  onCancel,
  onSave,
}: Props) {
  return (
    <div className="booking-edit-card">
      <h3>Ändra bokning</h3>

      <div className="form-group">
        <label htmlFor="edit-date">Datum</label>
        <input
          id="edit-date"
          name="date"
          type="date"
          value={form.date}
          onChange={onChange}
          min={new Date().toISOString().split("T")[0]}
        />
        {errors.date && <p className="field-error">{errors.date}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="edit-time">Tid</label>
        <select
          id="edit-time"
          name="time"
          value={form.time}
          onChange={onChange}
        >
          <option value="">Välj tid</option>
          <option value="17:00">17:00</option>
          <option value="18:00">18:00</option>
          <option value="19:00">19:00</option>
          <option value="20:00">20:00</option>
        </select>
        {errors.time && <p className="field-error">{errors.time}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="edit-numberOfGuests">Antal gäster</label>
        <select
          id="edit-numberOfGuests"
          name="numberOfGuests"
          value={form.numberOfGuests}
          onChange={onChange}
        >
          <option value="">Välj antal</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
        </select>
        {errors.numberOfGuests && (
          <p className="field-error">{errors.numberOfGuests}</p>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="edit-outdoorSeating">Plats</label>
        <select
          id="edit-outdoorSeating"
          name="outdoorSeating"
          value={form.outdoorSeating}
          onChange={onChange}
        >
          <option value="">Välj plats</option>
          <option value="true">Utomhus</option>
          <option value="false">Inomhus</option>
        </select>
        {errors.outdoorSeating && (
          <p className="field-error">{errors.outdoorSeating}</p>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="edit-name">Namn</label>
        <input
          id="edit-name"
          name="name"
          type="text"
          value={form.name}
          onChange={onChange}
        />
        {errors.name && <p className="field-error">{errors.name}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="edit-phone">Telefon</label>
        <input
          id="edit-phone"
          name="phone"
          type="tel"
          value={form.phone}
          onChange={onChange}
        />
        {errors.phone && <p className="field-error">{errors.phone}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="edit-email">E-post</label>
        <input
          id="edit-email"
          name="email"
          type="email"
          value={form.email}
          onChange={onChange}
        />
        {errors.email && <p className="field-error">{errors.email}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="edit-specialRequests">Speciella önskemål</label>
        <textarea
          id="edit-specialRequests"
          name="specialRequests"
          value={form.specialRequests}
          onChange={onChange}
          rows={4}
        />
      </div>

      <div className="booking-actions">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Avbryt
        </Button>
        <Button type="button" onClick={onSave} disabled={isUpdating}>
          {isUpdating ? "Sparar..." : "Spara ändringar"}
        </Button>
      </div>
    </div>
  );
}