import Page from "../../components/layout/Page";
import Button from "../../components/common/Button/Button";
import Modal from "../../components/common/Modal/Modal";
import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faCalendar,
  faArrowRight,
  faClock,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

export default function HomePage() {
  const [open, setOpen] = useState(false);

  return (
    <Page>
      <h1>Knappbibliotek</h1>
      <p>Snabbguide för knappar på restaurangsidan.</p>

      {/* ===== PRIMARY ===== */}
      <section style={{ marginTop: 28 }}>
        <h2>Primary</h2>
        <p>För huvudhandlingar.</p>

        <div className="fpBtnRow">
          <Button leftIcon={<FontAwesomeIcon icon={faCartShopping} />}>
            Beställ nu
          </Button>

          <Button leftIcon={<FontAwesomeIcon icon={faCalendar} />}>
            Boka bord
          </Button>
        </div>

        <pre>{`<Button>Beställ nu</Button>`}</pre>
      </section>

      {/* ===== SECONDARY ===== */}
      <section style={{ marginTop: 28 }}>
        <h2>Secondary</h2>
        <p>För extra val.</p>

        <div className="fpBtnRow">
          <Button
            variant="secondary"
            leftIcon={<FontAwesomeIcon icon={faClock} />}
          >
            Öppettider
          </Button>

          <Button variant="secondary">Se meny</Button>
        </div>

        <pre>{`<Button variant="secondary">Se meny</Button>`}</pre>
      </section>

      {/* ===== GHOST ===== */}
      <section style={{ marginTop: 28 }}>
        <h2>Ghost</h2>
        <p>För avbryt / tillbaka.</p>

        <div className="fpBtnRow">
          <Button variant="ghost">Tillbaka</Button>

          <Button
            variant="ghost"
            leftIcon={<FontAwesomeIcon icon={faXmark} />}
          >
            Stäng
          </Button>
        </div>

        <pre>{`<Button variant="ghost">Avbryt</Button>`}</pre>
      </section>

      {/* ===== RAD ===== */}
      <section style={{ marginTop: 28 }}>
        <h2>I rad</h2>
        <p>För kort och menyer.</p>

        <div className="fpBtnRow">
          <Button leftIcon={<FontAwesomeIcon icon={faCartShopping} />}>
            Lägg i varukorg
          </Button>

          <Button variant="secondary">Läs mer</Button>

          <Button
            variant="ghost"
            rightIcon={<FontAwesomeIcon icon={faArrowRight} />}
          >
            Visa
          </Button>
        </div>

        <pre>{`<div className="fpBtnRow">
  <Button leftIcon={<FontAwesomeIcon icon={faCartShopping} />}>
    Lägg i varukorg
  </Button>

  <Button variant="secondary">Läs mer</Button>

  <Button
    variant="ghost"
    rightIcon={<FontAwesomeIcon icon={faArrowRight} />}
  >
    Visa
  </Button>
</div>`}</pre>
      </section>

      {/* ===== STAPLAD ===== */}
      <section style={{ marginTop: 28 }}>
        <h2>Staplade</h2>
        <p>För små ytor / mobil.</p>

        <div className="fpBtnCol">
          <Button>Boka bord</Button>
          <Button variant="secondary">Se tider</Button>
          <Button variant="ghost">Tillbaka</Button>
        </div>

        <pre>{`<div className="fpBtnCol">
  <Button>Boka bord</Button>
  <Button variant="secondary">Se tider</Button>
  <Button variant="ghost">Tillbaka</Button>
</div>`}</pre>
      </section>

      {/* ===== MODAL ===== */}
      <section style={{ marginTop: 28 }}>
        <h2>Modal</h2>
        <p>Ghost vänster, primary höger.</p>

        <Button onClick={() => setOpen(true)}>Öppna modal</Button>

        <Modal isOpen={open} onClose={() => setOpen(false)}>
          <h3>Lägg till i varukorg?</h3>
          <p>Vill du lägga till pizzan i varukorgen?</p>

          <div className="fpBtnRow">
            <Button variant="ghost" onClick={() => setOpen(false)}>
              Avbryt
            </Button>

            <Button
              leftIcon={<FontAwesomeIcon icon={faCartShopping} />}
              onClick={() => setOpen(false)}
            >
              Lägg till
            </Button>
          </div>
        </Modal>

        <pre>{`const [open, setOpen] = useState(false);

<Button onClick={() => setOpen(true)}>
  Öppna modal
</Button>

<Modal isOpen={open} onClose={() => setOpen(false)}>
  <h3>Lägg till i varukorg?</h3>
  <p>Vill du lägga till pizzan i varukorgen?</p>

  <div className="fpBtnRow">
    <Button variant="ghost" onClick={() => setOpen(false)}>
      Avbryt
    </Button>

    <Button
      leftIcon={<FontAwesomeIcon icon={faCartShopping} />}
      onClick={() => setOpen(false)}
    >
      Lägg till
    </Button>
  </div>
</Modal>`}</pre>
      </section>
    </Page>
  );
}