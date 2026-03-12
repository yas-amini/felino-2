import Button from "../../../components/common/Button/Button";
import "./BookingToolBar.css";

export default function BookingToolBar() {
    return (
        <div className="booking-toolbar">
            <input type="date" className="date-overview"/>
            <Button variant="primary">+ Ny bokning</Button>
        </div>
    );
}