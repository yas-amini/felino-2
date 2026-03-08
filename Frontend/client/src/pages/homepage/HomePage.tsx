import Page from "../../components/layout/Page";
import Button from "../../components/common/Button/Button";
import Modal from "../../components/common/Modal/Modal";
import { useState } from "react";
import "./HomePage.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faCalendar,
  faArrowRight,
  faClock,
  faPhone,
  faLocationDot,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);

  const menuItems = [
    {
      name: "Margherita",
      description: "Tomatsås, mozzarella, basilika",
      price: "105 kr",
    },
    {
      name: "Vesuvio",
      description: "Tomatsås, mozzarella, skinka",
      price: "115 kr",
    },
    {
      name: "Capricciosa",
      description: "Tomatsås, mozzarella, skinka, champinjoner",
      price: "125 kr",
    },
    {
      name: "Kebabpizza",
      description: "Tomatsås, mozzarella, kebabkött, lök, feferoni, sås",
      price: "135 kr",
    },
    {
      name: "Vegetariana",
      description: "Tomatsås, mozzarella, paprika, lök, oliver, champinjoner",
      price: "125 kr",
    },
    {
      name: "Calzone",
      description: "Inbakad pizza med skinka och mozzarella",
      price: "130 kr",
    },
  ];

  const openingHours = [
    { day: "Måndag", time: "11:00 – 21:00" },
    { day: "Tisdag", time: "11:00 – 21:00" },
    { day: "Onsdag", time: "11:00 – 21:00" },
    { day: "Torsdag", time: "11:00 – 21:00" },
    { day: "Fredag", time: "11:00 – 22:00" },
    { day: "Lördag", time: "12:00 – 22:00" },
    { day: "Söndag", time: "12:00 – 21:00" },
  ];

  return (
    <Page>
      <div className="homePage">
        <section className="heroSection">
          <div className="heroContent">
            <span className="heroBadge">Äkta stenugnsbakad pizza</span>
            <h1>Välkommen till Felino Pizza!</h1>
            <p>
              Njut av nybakade pizzor, fräscha råvaror och en skön stämning.
              Beställ för avhämtning eller kom förbi och ät hos oss.
            </p>

            <div className="heroButtons">
              <Button leftIcon={<FontAwesomeIcon icon={faCartShopping} />}>
                Beställ nu
              </Button>

              <Button
                variant="secondary"
                leftIcon={<FontAwesomeIcon icon={faCalendar} />}
              >
                Boka bord
              </Button>

              <Button
                variant="ghost"
                rightIcon={<FontAwesomeIcon icon={faArrowRight} />}
                onClick={() => setMenuOpen(true)}
              >
                Se hela menyn
              </Button>
            </div>
          </div>

          <div className="heroCard">
            <h3>Dagens tips</h3>
            <p className="heroCardTitle">Familjepizza + 1,5L dryck</p>
            <p className="heroCardText">
              Perfekt för fredagskvällen. Fråga personalen om dagens erbjudande.
            </p>

            <div className="heroInfoRow">
              <FontAwesomeIcon icon={faClock} />
              <span>Öppet idag till 22:00</span>
            </div>

            <div className="heroInfoRow">
              <FontAwesomeIcon icon={faLocationDot} />
              <span>Storgatan 12, Göteborg</span>
            </div>

            <div className="heroInfoRow">
              <FontAwesomeIcon icon={faPhone} />
              <span>031-123 45 67</span>
            </div>
          </div>
        </section>

        <section className="homeSection">
          <div className="sectionHeading">
            <div>
              <p className="sectionLabel">Meny</p>
              <h2>Populära pizzor</h2>
            </div>

            <Button variant="secondary" onClick={() => setMenuOpen(true)}>
              Se hela menyn
            </Button>
          </div>

          <div className="menuGrid">
            {menuItems.slice(0, 4).map((item) => (
              <article className="menuCard" key={item.name}>
                <div className="menuCardTop">
                  <h3>{item.name}</h3>
                  <span>{item.price}</span>
                </div>
                <p>{item.description}</p>
                <Button
                  leftIcon={<FontAwesomeIcon icon={faCartShopping} />}
                >
                  Beställ
                </Button>
              </article>
            ))}
          </div>
        </section>

        <section className="infoGrid">
          <div className="infoCard">
            <div className="infoCardHeader">
              <FontAwesomeIcon icon={faClock} />
              <h2>Öppettider</h2>
            </div>

            <div className="hoursList">
              {openingHours.map((item) => (
                <div className="hoursRow" key={item.day}>
                  <span>{item.day}</span>
                  <strong>{item.time}</strong>
                </div>
              ))}
            </div>
          </div>

          <div className="infoCard">
            <div className="infoCardHeader">
              <FontAwesomeIcon icon={faLocationDot} />
              <h2>Hitta hit</h2>
            </div>

            <p className="contactText">
              Felino Pizza
              <br />
              Storgatan 1
              <br />
              123 45 Stad
            </p>

            <p className="contactText">
              Telefon: 012-345 67 89
              <br />
              E-post: info@felinopizza.se
            </p>

            <div className="contactButtons">
              <Button variant="secondary">Visa karta</Button>
              <Button variant="ghost">Kontakta oss</Button>
            </div>
          </div>
        </section>

        <section className="ctaSection">
          <div>
            <p className="sectionLabel">Hungrig?</p>
            <h2>Beställ din favoritpizza idag</h2>
            <p>
              Snabb service, goda råvaror och pizzor för hela familjen.
            </p>
          </div>

          <div className="ctaButtons">
            <Button leftIcon={<FontAwesomeIcon icon={faCartShopping} />}>
              Beställ online
            </Button>
            <Button variant="secondary">Ring och beställ</Button>
          </div>
        </section>
      </div>

      <Modal isOpen={menuOpen} onClose={() => setMenuOpen(false)}>
        <div className="menuModalHeader">
          <div>
            <h3>Vår meny</h3>
            <p>Här är ett urval av våra mest uppskattade pizzor.</p>
          </div>

          <Button
            variant="ghost"
            leftIcon={<FontAwesomeIcon icon={faXmark} />}
            onClick={() => setMenuOpen(false)}
          >
            Stäng
          </Button>
        </div>

        <div className="menuModalList">
          {menuItems.map((item) => (
            <div className="menuModalRow" key={item.name}>
              <div>
                <h4>{item.name}</h4>
                <p>{item.description}</p>
              </div>
              <strong>{item.price}</strong>
            </div>
          ))}
        </div>
      </Modal>
    </Page>
  );
}