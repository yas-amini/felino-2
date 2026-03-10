import Page from "../../components/layout/Page";
import Button from "../../components/common/Button/Button";
import MenuModal from "../../components/common/Modal/MenuModal";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";
import ProductCarousel from "../../components/common/carousel/ProductCarousel";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faCalendar,
  faPhone,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);

  const openingHours = [
    { day: "Måndag - Torsdag", time: "11:00 – 21:00" },
    { day: "Fredag - Lördag", time: "11:00 – 22:00" },
    { day: "Söndag", time: "12:00 – 21:00" },
  ];

  return (
    <Page>
      <div className="homePage">
        <section className="heroSection">
          <div className="contentBox heroContentBox">
            <div className="heroContent">
              <h1>Sugen på pizza?</h1>
              <p>
                Då har du hamnat rätt! 
                Njut av nybakade pizzor, fräscha råvaror och en skön stämning.
                Beställ för avhämtning eller kom förbi och ät hos oss.
              </p>


              <div className="heroButtons">
                <Link to="/bestall">
                  <Button leftIcon={<FontAwesomeIcon icon={faCartShopping} />}>
                    Beställ nu
                  </Button>
                </Link>

                <Link to="/boka-bord">
                  <Button
                    variant="secondary"
                    leftIcon={<FontAwesomeIcon icon={faCalendar} />}
                  >
                    Boka bord
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          <div className="contentBox openingHoursBox">
            <div className="infoCard openingHoursText">
              <h2 className="openingTitle">ÖPPETTIDER</h2>


              <div className="hoursListCentered">
                {openingHours.map((item) => (
                  <div className="hoursBlock" key={item.day}>
                    <span className="hoursDay">{item.day}</span>
                    <strong className="hoursTime">{item.time}</strong>
                  </div>
                ))}
              </div>
            </div>
          </div>


        </section>
         <section className="contentBox favoritesBox">
          <div className="homeSection favoritesSection">
            <div className="sectionHeading">
              <div>
                <p className="sectionLabel">Kundernas favoriter</p>
              </div>

              <Button variant="secondary" onClick={() => setMenuOpen(true)}>
                Felino&apos;s Meny
              </Button>
            </div>

            <div className="favoritesCarouselBox">
              <ProductCarousel />
            </div>
          </div>
        </section>



        <section className="infoGrid">

          <div className="contentBox heroPromoBox">
            <div className="heroCard">
              <h3>Dagens tips</h3>
              <p className="heroCardTitle">Kampanj-rubrik</p>
              <p className="heroCardText">Kampanjtext</p>



              <div className="heroInfoRow">
                <FontAwesomeIcon icon={faLocationDot} />
                <span>Storgatan 1, Stockholm</span>
              </div>

              <div className="heroInfoRow">
                <FontAwesomeIcon icon={faPhone} />
                <span>012-345 67 89</span>
              </div>
            </div>
          </div>

          <div className="contentBox contactBox">
            <div className="infoCard">
              <div className="infoCardHeader">

                <h2>Hitta hit</h2>
              </div>

              {/* BILD HÄR */}
              <div className="contactImageWrapper">
                <img src="/images/logga/felinopizzeriaillus.png" alt="Karta till Felino Pizza" />
              </div>

              <div className="contactInfoBox">
                <p className="contactText">
                  Storgatan 1
                </p>
                <p className="contactTextCity">
                  123 45 Stockholm
                </p>

                <p className="contactTextTE">
                  Telefon: 012-345 67 89
                  <br />
                  E-post: info@felinopizza.se
                </p>
              </div>

              <div className="contactButtonsBox">
                <div className="contactButtons">
                  <Button variant="secondary">Visa karta</Button>
                  <Button variant="ghost">Kontakta oss</Button>
                </div>
              </div>
            </div>
          </div>
        </section>
       

        <section className="contentBox ctaBox">
          <div className="ctaSection">
            <div className="ctaContent">
              <p className="sectionLabel">Hungrig?</p>
              <h2>Beställ din favoritpizza idag</h2>
              <p>Snabb service, goda råvaror och pizzor för hela familjen.</p>
            </div>

            <div className="ctaButtonsBox">
              <div className="ctaButtons">
                <Link to="/bestall">
                  <Button leftIcon={<FontAwesomeIcon icon={faCartShopping} />}>
                    Beställ online
                  </Button>
                </Link>

                <Link to="/boka-bord">
                  <Button
                    variant="secondary"
                    leftIcon={<FontAwesomeIcon icon={faCalendar} />}
                  >
                    Boka bord
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>

      <MenuModal isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </Page>
  );
}