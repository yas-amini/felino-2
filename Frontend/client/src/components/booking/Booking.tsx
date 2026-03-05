import "./Booking.css";
import { useMemo, useState } from "react";
import BookingField from "./ui/BookingField";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays, faClock, faUsers, faChair } from "@fortawesome/free-solid-svg-icons";
import Button from "../common/Button/Button";

export default function Booking() {
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [guests, setGuests] = useState("");
    const [seating, setSeating] = useState("");

    const timeOptions = useMemo(() => {

        const opts: { value: string; label: string }[] = [];
        for (let h = 10; h <= 21; h++) {
            for (const m of [0, 30]) {
                const label = `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
                if (h === 21 && m === 30) continue;
                opts.push({ value: label, label });
            }
        }
        return opts;
    }, []);

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
            { value: "Utomhus", label: "Uteservering" },
            { value: "Inomhus", label: "Inomhus" },
        ],
        []
    );

    return (
        <div className="booking-container">
            <h1>Boka bord</h1>
            <div className="booking-fields">
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

                <Button>Boka bord</Button>
            </div>
        </div>
    );
}
