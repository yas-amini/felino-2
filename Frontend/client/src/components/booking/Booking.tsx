import "./Booking.css";
import { useMemo, useState } from "react";
import BookingField from "./ui/BookingField";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays, faClock, faUsers, faChair } from "@fortawesome/free-solid-svg-icons";
import Button from "../common/Button/Button";
import FormField from "./ui/FormField";

function isWeekend(dateStr: string) {
    const d = new Date(`${dateStr}T12:00:00`);
    const day = d.getDay();
    return day === 0 || day === 6;
}
function formatTimeNumber(n: number) {
    return String(n).padStart(2, "0");
}
function generateQuarterHours(openHour: number, closeHour: number) {
    const times: string[] = [];
    for (let h = openHour; h < closeHour; h++) {
        for (const m of [0, 15, 30, 45]) {
            times.push(`${formatTimeNumber(h)}:${formatTimeNumber(m)}`);
        }
    }
    return times;
}

type Booking = {
    date: string;
    time: string;
    guests: number;
    seating: string;
    firstName: string;
    lastName: string;
    email: string;
    specialRequests?: string;
};


export default function Booking() {

    const [, setBookings] = useState<Booking[]>([]);

    const [step, setStep] = useState(1);

    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [guests, setGuests] = useState("");
    const [seating, setSeating] = useState("");

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [specialRequests, setSpecialRequests] = useState("");

    const timeOptions = useMemo(() => {
        if (!date) return [];
        const open = isWeekend(date) ? 11 : 10;
        const close = 21;
        return generateQuarterHours(open, close).map((t) => ({ label: t, value: t }));
    }, [date]);

    const guestOptions = useMemo(
        () =>
            Array.from({ length: 12 }, (_, i) => {
                const n = i + 1;
                return { value: String(n), label: `${n} ${n === 1 ? "gäst" : "gäster"}` };
            }),
        []
    );

    const seatingOptions = useMemo(
        () => [
            { value: "Utomhus", label: "Utomhus" },
            { value: "Inomhus", label: "Inomhus" },
        ],
        []
    );

    const canGoToStep2 = date && time && guests && seating;

    const handleNextStep = () => {
        if (!canGoToStep2) return;
        setStep(2);
    };

    const handleBack = () => {
        setStep(1);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const newBooking: Booking = {
            date,
            time,
            guests: Number(guests),
            seating,
            firstName,
            lastName,
            email,
            specialRequests,
        };

        setBookings((prev) => [...prev, newBooking]);

        console.log("Bokning skickad:", newBooking);
        alert("bokning bekräftad. Du är välkommen");

        setDate("");
        setTime("");
        setGuests("");
        setSeating("");
        setFirstName("");
        setLastName("");
        setEmail("");
        setSpecialRequests("");
        setStep(1);
    };

    return (
        <div className="booking-container">
            <h1>Boka bord</h1>
            <div className="booking-container-two">
                <form className="booking-fields" onSubmit={handleSubmit}>
                    {step === 1 && (
                        <>
                            <BookingField
                                label="Datum"
                                value={date}
                                type="date"
                                placeholder="Välj Datum"
                                onChange={setDate}
                                icon={<FontAwesomeIcon icon={faCalendarDays} />}

                            />
                            <BookingField
                                label="Tid"
                                value={time}
                                type="select"
                                placeholder="Välj tid"
                                onChange={setTime}
                                options={timeOptions}
                                icon={<FontAwesomeIcon icon={faClock} />}
                            />
                            <BookingField
                                label="Gäster"
                                value={guests}
                                type="select"
                                placeholder="Antal gäster"
                                onChange={setGuests}
                                options={guestOptions}
                                icon={<FontAwesomeIcon icon={faUsers} />} />

                            <BookingField
                                label="Uteservering"
                                value={seating}
                                type="select"
                                placeholder="Uteservering"
                                onChange={setSeating}
                                options={seatingOptions}
                                icon={<FontAwesomeIcon icon={faChair} />} />


                            <Button type="button" onClick={handleNextStep} disabled={!canGoToStep2}>Fortsätt</Button>
                        </>
                    )}
                    {step === 2 && (
                        <>
                            <div className="booking-step-title">Dina uppgifter</div>

                            <FormField
                                placeholder="Förnamn"
                                value={firstName}
                                onChange={setFirstName}
                            />

                            <FormField
                                placeholder="Efternamn"
                                value={lastName}
                                onChange={setLastName}
                            />

                            <FormField
                                placeholder="E-postadress"
                                type="email"
                                value={email}
                                onChange={setEmail}
                            />

                            <label className="form-field">
                                <textarea
                                    placeholder="Speciella önskemål"
                                    rows={4}
                                    value={specialRequests}
                                    onChange={(e) => setSpecialRequests(e.target.value)}
                                />
                            </label>
                            <div className="booking-buttons">
                                <Button type="button" onClick={handleBack}>
                                    Tillbaka
                                </Button>
                                <Button type="submit">Bekräfta bokning</Button>
                            </div>
                        </>
                    )}
                </form>
                <div className="image-container">
                    <img src="/images/table-booking-hero.jpg" alt="Bild på bord i restaurangen" />
                </div>
            </div>

        </div>

    );
}
