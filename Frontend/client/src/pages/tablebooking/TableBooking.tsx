import { useState } from "react";
import Page from "../../components/layout/Page";
import Button from "../../components/common/Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays, faUsers, faChair } from "@fortawesome/free-solid-svg-icons";
import "./TableBooking.css"

type FormState = {
  date: string;
  time: string;
  guests: string;
  seating: string;
  name: string;
  phone: string;
  email: string;
  requests: string;
  bookingnumber: string;
};

export default function TableBooking() {
  const initialForm: FormState = {
    date: "",
    time: "",
    guests: "",
    seating: "",
    name: "",
    phone: "",
    email: "",
    requests: "",
    bookingnumber: "",
  };

  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [showBooking, setShowBooking] = useState(false);

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
    const newErrors: Partial<FormState> = {};

    if (!form.date) newErrors.date = "Välj ett datum";
    if (!form.time) newErrors.time = "Välj en tid";
    if (!form.guests) newErrors.guests = "Välj antal gäster";
    if (!form.seating) newErrors.seating = "Välj plats";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStepTwo = () => {
    const newErrors: Partial<FormState> = {};

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateStepTwo()) return;

    console.log("Skicka bokning:", form);
    alert("Din bokning är skickad!");
    setForm(initialForm);
    setErrors({});
    setStep(1);
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
                        <label htmlFor="guests">Antal gäster</label>
                        <select
                          id="guests"
                          name="guests"
                          value={form.guests}
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
                        {errors.guests && <p className="field-error">{errors.guests}</p>}
                      </div>

                      <div className="form-group">
                        <label htmlFor="seating">Plats</label>
                        <select
                          id="seating"
                          name="seating"
                          value={form.seating}
                          onChange={handleChange}
                        >
                          <option value="">Välj plats</option>
                          <option value="outdoor">Utomhus</option>
                          <option value="indoor">Inomhus</option>
                        </select>
                        {errors.seating && (
                          <p className="field-error">{errors.seating}</p>
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
                        <p><strong>Gäster:</strong> {form.guests || "-"}</p>
                        <p>
                          <strong>Plats:</strong>{" "}
                          {form.seating === "outdoor"
                            ? "Utomhus"
                            : form.seating === "indoor"
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
                        <label htmlFor="requests">Speciella önskemål</label>
                        <textarea
                          id="requests"
                          name="requests"
                          value={form.requests}
                          onChange={handleChange}
                          rows={4}
                        />
                      </div>

                      <div className="booking-actions">
                        <Button type="button" variant="secondary" onClick={handlePreviousStep}>
                          Tillbaka
                        </Button>
                        <Button type="submit">Bekräfta bokning</Button>
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
              <label htmlFor="bookingnumber">Bokningsnummer</label>
              <input
                id="bookingnumber"
                name="bookingnumber"
                type="text"
                value={form.bookingnumber}
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