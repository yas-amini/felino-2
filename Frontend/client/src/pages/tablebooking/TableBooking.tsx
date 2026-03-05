import Page from "../../components/layout/Page";
import Button from "../../components/common/Button/Button";
import Modal from "../../components/common/Modal/Modal";
import BookingHero from "../../components/booking/BookingHero";
import { useState } from "react";

export default function TableBooking() {
  const [open, setOpen] = useState(false);

  return (
    <Page>
      <BookingHero />
      

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
    </Page>
  );
}