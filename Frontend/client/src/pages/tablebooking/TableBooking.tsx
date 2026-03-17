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
      <section>
        <h1>Välkommen till Felino Pizzeria</h1>
        <p>Nedan kan du boka en bordplats i vår restaurang</p>

        <form className="booking-card" onSubmit={handleSubmit} noValidate>
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
                {errors.date && <p>{errors.date}</p>}
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
                {errors.time && <p>{errors.time}</p>}
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
                {errors.guests && <p>{errors.guests}</p>}
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
                {errors.seating && <p>{errors.seating}</p>}
              </div>

              <Button type="button" onClick={handleNextStep}>
                Fortsätt
              </Button>
            </>
          )}

          {step === 2 && (
            <>
              <div className="form-group">
                <label htmlFor="name">Namn</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                />
                {errors.name && <p>{errors.name}</p>}
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
                {errors.phone && <p>{errors.phone}</p>}
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
                {errors.email && <p>{errors.email}</p>}
              </div>

              <div className="form-group">
                <label htmlFor="requests">Speciella önskemål</label>
                <textarea
                  id="requests"
                  name="requests"
                  value={form.requests}
                  onChange={handleChange}
                />
                {errors.requests && <p>{errors.requests}</p>}
              </div>

              <div>
                <Button type="button" onClick={handlePreviousStep}>
                  Tillbaka
                </Button>
                <Button type="submit">Bekräfta bokning</Button>
              </div>
            </>
          )}
        </form>
      </section>
      <section>
        <h2>Hantera bokning</h2>
        <form className="change-booking-card">
            <div className="form-group">
              <label htmlFor="text">Bokningsnummer</label>
              <input
                id="bookingnumber"
                name="bookingnumber"
                type="bookingnumber"
                value={form.bookingnumber}
                onChange={handleChange}
              />
              {errors.bookingnumber && <p>{errors.bookingnumber}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="email">Emailadress</label>
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
              />
              {errors.email && <p>{errors.email}</p>}
            </div>
          <p>Bokningsnumret finns i ditt bekräftelsemail.</p>
          <Button type="button" onClick={() => setShowBooking(true)}>
            Hämta bokning
          </Button>
        </form>
        {showBooking && (
          <div className="found-booking-container">
            <div className="found-booking-details">
              <div className="found-booking-row">
                {<FontAwesomeIcon icon={faCalendarDays} />}
                <p>Fredag 10 Maj 2026 kl. 18:00</p>
              </div>
              <div className="found-booking-row">

                {<FontAwesomeIcon icon={faUsers} />}
                <p>2 gäster</p>
              </div>
              <div className="found-booking-row">
                {<FontAwesomeIcon icon={faChair} />}
                <p>Uteservering</p>
              </div>

              <div className="booking-actions">
                <Button>Ändra bokning</Button>
                <Button>Avboka</Button>
              </div>
            </div>

          </div>
        )}

      </section>
    </Page>
  );
}