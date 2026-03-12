import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faCalendar,
  faClipboard,
} from "@fortawesome/free-solid-svg-icons";

import Button from "../common/Button/Button";
import "./Hero.css";

type HeroProps = {
  onOpenMenu: () => void;
};

export default function Hero({ onOpenMenu }: HeroProps) {
  return (
    <div className="heroContent">
      <h1>You hangry?</h1>

      <p>
        Vi fattar. När hungern slår till ska det gå snabbt — och vara riktigt
        gott. Hos oss får du nybakade pizzor, schyssta råvaror och smaker som
        levererar varje gång.
      </p>

      <p>
        Beställ online, hämta snabbt eller slå dig ner hos oss. Enkelt,
        snabbt och riktigt bra.
      </p>

      <div className="heroButtons">
        <Button
          onClick={onOpenMenu}
          leftIcon={<FontAwesomeIcon icon={faClipboard} />}
        >
          Felino&apos;s Meny
        </Button>

        <Link to="/bestall">
          <Button leftIcon={<FontAwesomeIcon icon={faCartShopping} />}>
            Beställ nu
          </Button>
        </Link>

        <Link to="/boka-bord">
          <Button leftIcon={<FontAwesomeIcon icon={faCalendar} />}>
            Boka bord
          </Button>
        </Link>
      </div>

      <div className="heroContactInfo">
        <div className="heroContactItem">
          <span className="heroContactLabel">Telefon</span>
          <a href="tel:0123456789" className="heroContactValue">
            012-345 67 89
          </a>
        </div>

        <div className="heroContactItem">
          <span className="heroContactLabel">E-post</span>
          <a href="mailto:info@felinopizza.se" className="heroContactValue">
            info@felinopizza.se
          </a>
        </div>

        <div className="heroContactItem">
          <span className="heroContactLabel">Adress</span>
          <a
            href="https://www.google.com/maps/search/?api=1&query=Storgatan+1+123+45+Stockholm"
            target="_blank"
            rel="noopener noreferrer"
            className="heroContactValue"
          >
            Storgatan 1, 123 45 Stockholm
          </a>
        </div>
      </div>
    </div>
  );
}