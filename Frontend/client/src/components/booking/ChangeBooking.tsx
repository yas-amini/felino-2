import "./ChangeBooking.css";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays, faUsers, faChair } from "@fortawesome/free-solid-svg-icons";
import FormField from "./ui/FormField";
import Button from "../common/Button/Button";

export default function ChangeBooking() {
    const [showBooking, setShowBooking] = useState(false);
    const [, setBookingnumber] = useState("");
    const [, setEmail] = useState("");


    return (
        <div className="change-booking-container">
            <h1>Hantera bokning</h1>
            <p>Hitta och hantera din bokning genom att ange ditt bokningsnummer och email adress nedan:</p>
            <form className="form-change-booking">
                <div className="change-booking-input">
                    <FormField
                        placeholder="Bokningsnummer"
                        onChange={setBookingnumber}
                    />
                    <FormField
                        placeholder="Email Adress"
                        onChange={setEmail}
                    />
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



        </div>
    );
}