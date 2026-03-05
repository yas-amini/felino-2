import Page from "../../components/layout/Page";
import Button from "../../components/common/Button/Button";
import Modal from "../../components/common/Modal/Modal";
import { useState } from "react";

export default function HomePage() {
  const [open, setOpen] = useState(false);

  return (
    <Page>
      <h1>Välkommen till Felino </h1>
      <p>Beställ pizza eller boka bord hos oss!</p>

      {/* TEST-KNAPP */}
      <div style={{ marginTop: "1.5rem" }}>
        <Button onClick={() => setOpen(true)}>Öppna modal</Button>
      </div>

      {/* TEST-MODAL */}
      <Modal isOpen={open} onClose={() => setOpen(false)}>
        <h2>Hej </h2>
        <p>Detta är din modal. Här kan du lägga vad du vill.</p>

        <div style={{ marginTop: "1rem" }}>
          <Button onClick={() => setOpen(false)}>Stäng</Button>
        </div>
      </Modal>
    </Page>
  );
}