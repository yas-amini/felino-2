import type { BookingTab } from "../../../pages/admin/Booking/AdminBookingPage";
import Button from "../../../components/common/Button/Button";
import "./BookingTabs.css";

type Props = {
    activeTab: BookingTab;
    onChange: (tab: BookingTab) => void;
};

export default function BookingTabs({ activeTab, onChange }: Props) {
    return (
        <div className="booking-tabs">
            <Button
                type="button"
                variant="secondary"
                onClick={() => onChange("lista")}
                aria-current={activeTab === "lista" ? "page" : undefined}
            >
                Lista
            </Button>

            <Button
                type="button"
                variant="secondary"

                onClick={() => onChange("kalender")}
                aria-current={activeTab === "kalender" ? "page" : undefined}
            >
                Kalender
            </Button>

            <Button
                type="button"
                variant="secondary"

                onClick={() => onChange("bord")}
                aria-current={activeTab === "bord" ? "page" : undefined}
            >
                Bord & kapacitet
            </Button>
        </div>
    );
}