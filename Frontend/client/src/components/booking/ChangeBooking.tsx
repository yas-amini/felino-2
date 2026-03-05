import "./ChangeBooking.css";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays, faUsers, faChair } from "@fortawesome/free-solid-svg-icons";
import FormField from "./ui/FormField";
import Button from "../common/Button/Button";

export default function ChangeBooking() {
    const [showBooking, setShowBooking] = useState(false);

    return (
        <div className="change-booking-container">
            <h1>Hantera bokning</h1>
            <p>Hitta och hantera din bokning genom att ange ditt bokningsnummer och email adress nedan:</p>
            <form className="form-change-booking">
                <div className="change-booking-input">
                    <FormField
                        placeholder="Bokningsnummer" />
                    <FormField
                        placeholder="Email Adress" />
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


            {/*
            <div className="change-booking-input">
                <div className="change-booking-input-name">
                    <label htmlFor="bookingNumber">Bokningsnummer</label>
                    <input type="text" name="bookingNumber" id="bookingNumber" placeholder="Bokningsnummer" />
                </div>
                <div className="change-booking-input-name">
                    <label htmlFor="email">Email Adress</label>
                    <input type="email" name="email" id="email" placeholder="Email Adress" />
                </div>
                <p>Bokningsnumret finns i ditt bekräftelsemail.</p>

                <button type="button" className="get-booking-button" onClick={() => setShowBooking(true)}>Hämta bokning</button>

            </div>
            {showBooking && (
                <div className="found-booking-container">
                    <div className="found-booking-details">
                        <div className="found-booking-row">
                            <img src={CalendarRange} alt="Calendar Range Icon" />
                            <p>Fredag 10 Maj 2026 kl. 18:00</p>
                        </div>
                        <div className="found-booking-row">

                            <img src={Users} alt="Users Icon" />
                            <p>2 gäster</p>
                        </div>
                        <div className="found-booking-row">
                            <img src={MapPin} alt="Map Pin Icon" />
                            <p>Uteservering</p>
                        </div>
                    </div>
                    <div className="booking-actions">

                        <button className="change-booking-button">Ändra bokning</button>
                        <button className="cancel-booking-button">Avboka</button>
                    </div>
                </div>
            )}
            */}
        </div>
    );
}