import "./BookingHero.css";
import Button from "../../components/common/Button/Button";
import Modal from "../../components/common/Modal/Modal";
import { useState } from "react";

export default function BookingHero() {
    const [open, setOpen] = useState(false);
    return (
        <div className="booking-hero">
            <div className="booking-hero-media">
                <img src="/images/table-booking-hero.jpg" alt="Table Booking Hero Image" />

            </div>
            <div className="booking-hero-text">
                <h1>Välkommen till Felino Pizzeria</h1>
                <p>Nedan kan du boka en bordplats i vår restaurang</p>
                <div>
                    {/* KNAPP */}
                    <div style={{ marginTop: "1.5rem" }}>
                        <Button onClick={() => setOpen(true)}>Öppna modal</Button>
                    </div>

                    {/* MODAL */}
                    <Modal isOpen={open} onClose={() => setOpen(false)}>
                        <h2>Info</h2>
                        <p>Din text här.</p>

                        <div style={{ marginTop: "1rem" }}>
                            <Button onClick={() => setOpen(false)}>Stäng</Button>
                        </div>
                    </Modal>
                </div>
            </div>

        </div>
    );
}