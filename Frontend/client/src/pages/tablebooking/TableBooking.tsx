import { useState } from "react";
import Page from "../../components/layout/Page";
import Button from "../../components/common/Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays, faUsers, faChair } from "@fortawesome/free-solid-svg-icons";
import "./TableBooking.css"

type FormState = {
  date: string;
  time: string;
  numberOfGuests: string;
  outdoorSeating: "" | "true" | "false";
  name: string;
  phone: string;
  email: string;
  specialRequests: string;
  bookingId: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

export default function TableBooking() {
  const initialForm: FormState = {
    date: "",
    time: "",
    numberOfGuests: "",
    outdoorSeating: "",
    name: "",
    phone: "",
    email: "",
    specialRequests: "",
    bookingId: "",
  };

  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [showBooking, setShowBooking] = useState(false);

  const [apiError, setApiError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdBookingId, setCreatedBookingId] = useState<number | null>(null);


  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validateStepOne = () => {
    const newErrors: FormErrors = {};

    if (!form.date) newErrors.date = "Välj ett datum";
    if (!form.time) newErrors.time = "Välj en tid";
    if (!form.numberOfGuests) newErrors.numberOfGuests = "Välj antal gäster";
    if (!form.outdoorSeating) newErrors.outdoorSeating = "Välj plats";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStepTwo = () => {
    const newErrors: FormErrors = {};

    if (!form.name.trim()) newErrors.name = "Fyll i ditt namn";
    if (!form.phone.trim()) newErrors.phone = "Fyll i ditt telefonnummer";
    if (!form.email.trim()) {
      newErrors.email = "Fyll i din e-postadress";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Fyll i en giltig e-postadress";
    }

    setErrors(newErrors);
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
        name: form.name,
        phone: form.phone,
        email: form.email,
        date: form.date,
        time: form.time,
        numberOfGuests: Number(form.numberOfGuests),
        outdoorSeating: form.outdoorSeating === "true",
        specialRequests: form.specialRequests || "",
      };

      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingRequest),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Kunde inte skapa bokningen.");
      }

      const result = await response.json();

      setCreatedBookingId(result.bookingId);

      // Reset form
      setForm(initialForm);
      setErrors({});
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
                          value={form.date}
                          onChange={handleChange}
                          min={new Date().toISOString().split("T")[0]}
                        />
                        {errors.date && <p className="field-error">{errors.date}</p>}
                      </div>

                      <div className="form-group">
                        <label htmlFor="time">Tid</label>
                        <select
                          id="time"
                          name="time"
                          value={form.time}
                          onChange={handleChange}
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
                        <label htmlFor="numberOfGuests">Antal gäster</label>
                        <select
                          id="numberOfGuests"
                          name="numberOfGuests"
                          value={form.numberOfGuests}
                          onChange={handleChange}
                        >
                          <option value="">Välj antal</option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                          <option value="6">6</option>
                        </select>
                        {errors.numberOfGuests && <p className="field-error">{errors.numberOfGuests}</p>}
                      </div>

                      <div className="form-group">
                        <label htmlFor="outdoorSeating">Plats</label>
                        <select
                          id="outdoorSeating"
                          name="outdoorSeating"
                          value={form.outdoorSeating}
                          onChange={handleChange}
                        >
                          <option value="">Välj plats</option>
                          <option value="true">Utomhus</option>
                          <option value="false">Inomhus</option>
                        </select>
                        {errors.outdoorSeating && (
                          <p className="field-error">{errors.outdoorSeating}</p>
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
                        <p><strong>Datum:</strong> {form.date || "-"}</p>
                        <p><strong>Tid:</strong> {form.time || "-"}</p>
                        <p><strong>Gäster:</strong> {form.numberOfGuests || "-"}</p>
                        <p>
                          <strong>Plats:</strong>{" "}
                          {form.outdoorSeating === "true"
                            ? "Utomhus"
                            : form.outdoorSeating === "false"
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
                          value={form.name}
                          onChange={handleChange}
                        />
                        {errors.name && <p className="field-error">{errors.name}</p>}
                      </div>

                      <div className="form-group">
                        <label htmlFor="phone">Telefon</label>
                        <input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={form.phone}
                          onChange={handleChange}
                        />
                        {errors.phone && <p className="field-error">{errors.phone}</p>}
                      </div>

                      <div className="form-group">
                        <label htmlFor="email">E-post</label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          value={form.email}
                          onChange={handleChange}
                        />
                        {errors.email && <p className="field-error">{errors.email}</p>}
                      </div>

                      <div className="form-group">
                        <label htmlFor="specialRequests">Speciella önskemål</label>
                        <textarea
                          id="specialRequests"
                          name="specialRequests"
                          value={form.specialRequests}
                          onChange={handleChange}
                          rows={4}
                        />
                      </div>

                      {apiError && <p className="field-error">{apiError}</p>}


                      <div className="booking-actions">
                        <Button type="button" variant="secondary" onClick={handlePreviousStep}>
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
                value={form.bookingId}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="manage-email">E-postadress</label>
              <input
                id="manage-email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
              />
            </div>

            <Button type="button" onClick={() => setShowBooking(true)}>
              Hämta bokning
            </Button>

            {showBooking && (
              <div className="booking-result-card">
                <h3>Din bokning</h3>

                <div className="found-booking-row">
                  <FontAwesomeIcon icon={faCalendarDays} />
                  <p>Fredag 10 Maj 2026 kl. 18:00</p>
                </div>

                <div className="found-booking-row">
                  <FontAwesomeIcon icon={faUsers} />
                  <p>2 gäster</p>
                </div>

                <div className="found-booking-row">
                  <FontAwesomeIcon icon={faChair} />
                  <p>Uteservering</p>
                </div>

                <div className="booking-actions">
                  <Button type="button" >Ändra bokning</Button>
                  <Button type="button" variant="secondary">Avboka</Button>
                </div>

                <p className="booking-id">#A12345678</p>
              </div>
            )}
          </div>
        </section>
      </div>

    </Page>
  );
}