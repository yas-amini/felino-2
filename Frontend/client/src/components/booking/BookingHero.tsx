import "./BookingHero.css";
import Button from "../../components/common/Button/Button";


export default function BookingHero() {
    return (
        <div className="booking-hero">
            <div className="booking-hero-media">
                <img src="/images/table-booking-hero.jpg" alt="Table Booking Hero Image" />

            </div>
            <div className="booking-hero-text">
                <h1>Välkommen till Felino Pizzeria</h1>
                <p>Nedan kan du boka en bordplats i vår restaurang</p>
                <Button>Boka bord</Button>
            </div>
        </div>
    );
}