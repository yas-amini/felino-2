import Page from "../../components/layout/Page";
import Button from "../../components/common/Button/Button";
import Modal from "../../components/common/Modal/Modal";
import { useState } from "react";

export default function CartPage() {
  const [open, setOpen] = useState(false);

  return (
    <Page>
      <h1>Varukorg</h1>
      <p>Här ser du dina valda produkter innan du går vidare till kassan.</p>

      <div style={{ marginTop: "1.5rem" }}>
        <Button onClick={() => setOpen(true)}>Öppna modal</Button>
      </div>

      <Modal isOpen={open} onClose={() => setOpen(false)}>
        <h2>Info</h2>
        <p>Detta är en test-modal på Varukorg-sidan.</p>

        <div style={{ marginTop: "1rem" }}>
          <Button onClick={() => setOpen(false)}>Stäng</Button>
        </div>
      </Modal>
    </Page>
  );
}