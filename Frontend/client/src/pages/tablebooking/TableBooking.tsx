import { useState } from "react";
import Page from "../../components/layout/Page";
import Button from "../../components/common/Button/Button";
import "./TableBooking.css";
import type {
  CreateBookingFormState,
  ManageBookingFormState,
  EditBookingFormState,
  CreateBookingErrors,
  ManageBookingErrors,
  EditBookingErrors,
  FoundBooking,
} from "../../types/booking";
import {
  createBooking,
  findBooking,
  cancelBooking,
  updateBooking,
} from "../../api/bookingApi";
import BookingResultCard from "../../components/booking/BookingResultCard";
import EditBookingForm from "../../components/booking/EditBookingForm";

export default function TableBooking() {
  const initialCreateBookingForm: CreateBookingFormState = {
    date: "",
    time: "",
    numberOfGuests: "",
    outdoorSeating: "",
    name: "",
    phone: "",
    email: "",
    specialRequests: "",
  };

  const initialManageBookingForm: ManageBookingFormState = {
    bookingId: "",
    email: "",
  };

  const initialEditBookingForm: EditBookingFormState = {
    bookingId: "",
    name: "",
    phone: "",
    email: "",
    date: "",
    time: "",
    numberOfGuests: "",
    outdoorSeating: "",
    specialRequests: "",
  };

  const [editBookingForm, setEditBookingForm] = useState<EditBookingFormState>(initialEditBookingForm);
  const [editErrors, setEditErrors] = useState<EditBookingErrors>({});

  const [step, setStep] = useState(1);

  const [createBookingForm, setCreateBookingForm] =
    useState<CreateBookingFormState>(initialCreateBookingForm);
  const [manageBookingForm, setManageBookingForm] =
    useState<ManageBookingFormState>(initialManageBookingForm);

  const [createErrors, setCreateErrors] = useState<CreateBookingErrors>({});
  const [manageErrors, setManageErrors] = useState<ManageBookingErrors>({});

  const [showBooking, setShowBooking] = useState(false);

  const [apiError, setApiError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdBookingId, setCreatedBookingId] = useState<number | null>(null);

  const [findError, setFindError] = useState("");
  const [isFindingBooking, setIsFindingBooking] = useState(false);
  const [foundBooking, setFoundBooking] = useState<FoundBooking | null>(null);

  const [isCancellingBooking, setIsCancellingBooking] = useState(false);

  const [isEditingBooking, setIsEditingBooking] = useState(false);
  const [isUpdatingBooking, setIsUpdatingBooking] = useState(false);


  const handleCreateBookingChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setCreateBookingForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setCreateErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleManageBookingChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    setManageBookingForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setManageErrors((prev) => ({
      ...prev,
      [name]: "",
    }));

    setFindError("");
  };

  const validateStepOne = () => {
    const newErrors: CreateBookingErrors = {};

    if (!createBookingForm.date) newErrors.date = "Välj ett datum";
    if (!createBookingForm.time) newErrors.time = "Välj en tid";
    if (!createBookingForm.numberOfGuests) {
      newErrors.numberOfGuests = "Välj antal gäster";
    }
    if (!createBookingForm.outdoorSeating) {
      newErrors.outdoorSeating = "Välj plats";
    }

    setCreateErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStepTwo = () => {
    const newErrors: CreateBookingErrors = {};

    if (!createBookingForm.name.trim()) newErrors.name = "Fyll i ditt namn";
    if (!createBookingForm.phone.trim()) {
      newErrors.phone = "Fyll i ditt telefonnummer";
    }

    if (!createBookingForm.email.trim()) {
      newErrors.email = "Fyll i din e-postadress";
    } else if (!/\S+@\S+\.\S+/.test(createBookingForm.email)) {
      newErrors.email = "Fyll i en giltig e-postadress";
    }

    setCreateErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateManageBooking = () => {
    const newErrors: ManageBookingErrors = {};

    if (!manageBookingForm.bookingId.trim()) {
      newErrors.bookingId = "Fyll i bokningsnummer.";
    }

    if (!manageBookingForm.email.trim()) {
      newErrors.email = "Fyll i e-postadress.";
    } else if (!/\S+@\S+\.\S+/.test(manageBookingForm.email)) {
      newErrors.email = "Fyll i en giltig e-postadress";
    }

    setManageErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!validateStepOne()) return;

    setStep(2);
  };

  const handlePreviousStep = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setStep(1);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateStepTwo()) return;

    setApiError("");
    setIsSubmitting(true);

    try {
      const bookingRequest = {
        name: createBookingForm.name,
        phone: createBookingForm.phone,
        email: createBookingForm.email,
        date: createBookingForm.date,
        time: createBookingForm.time,
        numberOfGuests: Number(createBookingForm.numberOfGuests),
        outdoorSeating: createBookingForm.outdoorSeating === "true",
        specialRequests: createBookingForm.specialRequests || "",
      };

      const result = await createBooking(bookingRequest);

      setCreatedBookingId(result.bookingId);
      setCreateBookingForm(initialCreateBookingForm);
      setCreateErrors({});
      setApiError("");
      setStep(1);
    } catch (error) {
      if (error instanceof Error) {
        setApiError(error.message);
      } else {
        setApiError("Något gick fel vid bokningen.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFindBooking = async () => {
    setFindError("");
    setFoundBooking(null);
    setShowBooking(false);
    setIsEditingBooking(false);
    setEditErrors({});

    if (!validateManageBooking()) return;

    setIsFindingBooking(true);

    try {
      const result = await findBooking({
        bookingId: Number(manageBookingForm.bookingId),
        email: manageBookingForm.email,
      });

      setFoundBooking({
        bookingId: result.bookingId,
        date: result.date,
        time: result.time,
        numberOfGuests: result.numberOfGuests,
        outdoorSeating: result.outdoorSeating,
        status: result.status,
        email: result.email,
        name: result.name,
        phone: result.phone,
        specialRequests: result.specialRequests || "",
      });

      setManageErrors({});
      setShowBooking(true);
    } catch (error) {
      if (error instanceof Error) {
        setFindError(error.message);
      } else {
        setFindError("Något gick fel när bokningen hämtades.");
      }
    } finally {
      setIsFindingBooking(false);
    }
  };

  const handleEditBookingClick = () => {
    if (!foundBooking) return;

    setEditBookingForm({
      bookingId: String(foundBooking.bookingId),
      name: foundBooking.name,
      phone: foundBooking.phone,
      email: foundBooking.email,
      date: foundBooking.date,
      time: foundBooking.time,
      numberOfGuests: String(foundBooking.numberOfGuests),
      outdoorSeating: foundBooking.outdoorSeating ? "true" : "false",
      specialRequests: foundBooking.specialRequests || "",
    });

    setEditErrors({});
    setFindError("");
    setIsEditingBooking(true);
  };

  const handleEditBookingChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setEditBookingForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setEditErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validateEditBooking = () => {
    const newErrors: EditBookingErrors = {};

    if (!editBookingForm.name.trim()) newErrors.name = "Fyll i ditt namn";
    if (!editBookingForm.phone.trim()) newErrors.phone = "Fyll i ditt telefonnummer";

    if (!editBookingForm.email.trim()) {
      newErrors.email = "Fyll i din e-postadress";
    } else if (!/\S+@\S+\.\S+/.test(editBookingForm.email)) {
      newErrors.email = "Fyll i en giltig e-postadress";
    }

    if (!editBookingForm.date) newErrors.date = "Välj ett datum";
    if (!editBookingForm.time) newErrors.time = "Välj en tid";
    if (!editBookingForm.numberOfGuests) {
      newErrors.numberOfGuests = "Välj antal gäster";
    }
    if (!editBookingForm.outdoorSeating) {
      newErrors.outdoorSeating = "Välj plats";
    }

    setEditErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleUpdateBooking = async () => {
    if (!validateEditBooking()) return;

    setFindError("");
    setIsUpdatingBooking(true);

    try {
      const result = await updateBooking({
        bookingId: Number(editBookingForm.bookingId),
        email: editBookingForm.email,
        name: editBookingForm.name,
        phone: editBookingForm.phone,
        date: editBookingForm.date,
        time: editBookingForm.time,
        numberOfGuests: Number(editBookingForm.numberOfGuests),
        outdoorSeating: editBookingForm.outdoorSeating === "true",
        specialRequests: editBookingForm.specialRequests || "",
      });

      setFoundBooking({
        bookingId: result.bookingId,
        date: result.date,
        time: result.time,
        numberOfGuests: result.numberOfGuests,
        outdoorSeating: result.outdoorSeating,
        status: result.status,
        email: result.email,
        name: result.name,
        phone: result.phone,
        specialRequests: result.specialRequests || "",
      });

      setIsEditingBooking(false);
      setEditErrors({});
    } catch (error) {
      if (error instanceof Error) {
        setFindError(error.message);
      } else {
        setFindError("Något gick fel när bokningen uppdaterades.");
      }
    } finally {
      setIsUpdatingBooking(false);
    }
  };

  const handleCancelBooking = async () => {
    if (!foundBooking) return;

    setFindError("");
    setIsCancellingBooking(true);

    try {
      const result = await cancelBooking({
        bookingId: foundBooking.bookingId,
        email: foundBooking.email,
      });

      setFoundBooking({
        bookingId: result.bookingId,
        date: result.date,
        time: result.time,
        numberOfGuests: result.numberOfGuests,
        outdoorSeating: result.outdoorSeating,
        status: result.status,
        email: result.email,
        name: result.name,
        phone: result.phone,
        specialRequests: result.specialRequests || "",
      });

      setIsEditingBooking(false);
      setEditErrors({});
    } catch (error) {
      if (error instanceof Error) {
        setFindError(error.message);
      } else {
        setFindError("Något gick fel när bokningen avbokades.");
      }
    } finally {
      setIsCancellingBooking(false);
    }
  };

  return (
    <Page>
      <div className="booking-page">
        <section className="booking-hero-section">
          <h1>Välkommen till Felino Pizzeria</h1>
          <p className="booking-page-intro">
            Nedan kan du boka en bordplats i vår restaurang
          </p>

          <div className="booking-hero-card">
            <div className="booking-layout">
              <div>
                <div className="booking-card-header">
                  <h2>Boka bord</h2>
                  <p>Välj datum och antal gäster för att boka bord hos oss.</p>
                </div>

                {createdBookingId && (
                  <div className="booking-success-message">
                    Din bokning är skapad. Ditt bokningsnummer är #{createdBookingId}.
                  </div>
                )}

                <form className="booking-card" onSubmit={handleSubmit} noValidate>
                  <div className="booking-step">Steg {step} av 2</div>

                  {step === 1 && (
                    <>
                      <div className="form-group">
                        <label htmlFor="date">Datum</label>
                        <input
                          id="date"
                          name="date"
                          type="date"
                          value={createBookingForm.date}
                          onChange={handleCreateBookingChange}
                          min={new Date().toISOString().split("T")[0]}
                        />
                        {createErrors.date && (
                          <p className="field-error">{createErrors.date}</p>
                        )}
                      </div>

                      <div className="form-group">
                        <label htmlFor="time">Tid</label>
                        <select
                          id="time"
                          name="time"
                          value={createBookingForm.time}
                          onChange={handleCreateBookingChange}
                        >
                          <option value="">Välj tid</option>
                          <option value="17:00">17:00</option>
                          <option value="18:00">18:00</option>
                          <option value="19:00">19:00</option>
                          <option value="20:00">20:00</option>
                        </select>
                        {createErrors.time && (
                          <p className="field-error">{createErrors.time}</p>
                        )}
                      </div>

                      <div className="form-group">
                        <label htmlFor="numberOfGuests">Antal gäster</label>
                        <select
                          id="numberOfGuests"
                          name="numberOfGuests"
                          value={createBookingForm.numberOfGuests}
                          onChange={handleCreateBookingChange}
                        >
                          <option value="">Välj antal</option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                          <option value="6">6</option>
                        </select>
                        {createErrors.numberOfGuests && (
                          <p className="field-error">
                            {createErrors.numberOfGuests}
                          </p>
                        )}
                      </div>

                      <div className="form-group">
                        <label htmlFor="outdoorSeating">Plats</label>
                        <select
                          id="outdoorSeating"
                          name="outdoorSeating"
                          value={createBookingForm.outdoorSeating}
                          onChange={handleCreateBookingChange}
                        >
                          <option value="">Välj plats</option>
                          <option value="true">Utomhus</option>
                          <option value="false">Inomhus</option>
                        </select>
                        {createErrors.outdoorSeating && (
                          <p className="field-error">
                            {createErrors.outdoorSeating}
                          </p>
                        )}
                      </div>

                      <Button type="button" onClick={handleNextStep}>
                        Fortsätt
                      </Button>
                    </>
                  )}

                  {step === 2 && (
                    <>
                      <div className="booking-summary">
                        <p><strong>Datum:</strong> {createBookingForm.date || "-"}</p>
                        <p><strong>Tid:</strong> {createBookingForm.time || "-"}</p>
                        <p>
                          <strong>Gäster:</strong>{" "}
                          {createBookingForm.numberOfGuests || "-"}
                        </p>
                        <p>
                          <strong>Plats:</strong>{" "}
                          {createBookingForm.outdoorSeating === "true"
                            ? "Utomhus"
                            : createBookingForm.outdoorSeating === "false"
                              ? "Inomhus"
                              : "-"}
                        </p>
                      </div>

                      <div className="form-group">
                        <label htmlFor="name">Namn</label>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          value={createBookingForm.name}
                          onChange={handleCreateBookingChange}
                        />
                        {createErrors.name && (
                          <p className="field-error">{createErrors.name}</p>
                        )}
                      </div>

                      <div className="form-group">
                        <label htmlFor="phone">Telefon</label>
                        <input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={createBookingForm.phone}
                          onChange={handleCreateBookingChange}
                        />
                        {createErrors.phone && (
                          <p className="field-error">{createErrors.phone}</p>
                        )}
                      </div>

                      <div className="form-group">
                        <label htmlFor="email">E-post</label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          value={createBookingForm.email}
                          onChange={handleCreateBookingChange}
                        />
                        {createErrors.email && (
                          <p className="field-error">{createErrors.email}</p>
                        )}
                      </div>

                      <div className="form-group">
                        <label htmlFor="specialRequests">Speciella önskemål</label>
                        <textarea
                          id="specialRequests"
                          name="specialRequests"
                          value={createBookingForm.specialRequests}
                          onChange={handleCreateBookingChange}
                          rows={4}
                        />
                      </div>

                      {apiError && <p className="field-error">{apiError}</p>}

                      <div className="booking-actions">
                        <Button
                          type="button"
                          variant="secondary"
                          onClick={handlePreviousStep}
                        >
                          Tillbaka
                        </Button>
                        <Button type="submit" disabled={isSubmitting}>
                          {isSubmitting ? "Skickar..." : "Bekräfta bokning"}
                        </Button>
                      </div>
                    </>
                  )}
                </form>
              </div>

              <div className="booking-image">
                <img
                  src="/images/table-booking-hero.jpg"
                  alt="Bild på dukat bord med pizza"
                  className="booking-hero-img"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="handle-booking-section">
          <div className="section-divider" />
          <h2>Hantera bokning</h2>
          <p className="handle-booking-intro">
            Ange bokningsnummer och e-postadress för att hantera din bokning.
          </p>

          <div className="change-booking-card">
            <div className="form-group">
              <label htmlFor="bookingId">Bokningsnummer</label>
              <input
                id="bookingId"
                name="bookingId"
                type="text"
                value={manageBookingForm.bookingId}
                onChange={handleManageBookingChange}
              />
              {manageErrors.bookingId && (
                <p className="field-error">{manageErrors.bookingId}</p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="manage-email">E-postadress</label>
              <input
                id="manage-email"
                name="email"
                type="email"
                value={manageBookingForm.email}
                onChange={handleManageBookingChange}
              />
              {manageErrors.email && (
                <p className="field-error">{manageErrors.email}</p>
              )}
            </div>

            <Button
              type="button"
              onClick={handleFindBooking}
              disabled={isFindingBooking}
            >
              {isFindingBooking ? "Hämtar..." : "Hämta bokning"}
            </Button>

            {findError && <p className="field-error">{findError}</p>}

            {showBooking && foundBooking && (
              <BookingResultCard
                booking={foundBooking}
                onEdit={handleEditBookingClick}
                onCancel={handleCancelBooking}
                isCancelling={isCancellingBooking}
              />
            )}

            {isEditingBooking && (
              <EditBookingForm
                form={editBookingForm}
                errors={editErrors}
                isUpdating={isUpdatingBooking}
                onChange={handleEditBookingChange}
                onCancel={() => setIsEditingBooking(false)}
                onSave={handleUpdateBooking}
              />
            )}
          </div>
        </section>
      </div>
    </Page>
  );
}