import { useState } from "react";
import { Link } from "react-router-dom";

import Page from "../../components/layout/Page";
import Button from "../../components/common/Button/Button";
import MenuModal from "../../components/common/Modal/MenuModal";
import ProductCarousel from "../../components/common/carousel/ProductCarousel";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faCalendar,
  faClipboard,
} from "@fortawesome/free-solid-svg-icons";

import "./HomePage.css";

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
          <div className="contentBox openingHoursBox">
            <div className="openingHoursContent">
              <h2 className="openingTitle">ÖPPETTIDER</h2>

              <div className="hoursList">
                {openingHours.map((item) => (
                  <div className="hoursBlock" key={item.day}>
                    <span className="hoursDay">{item.day}</span>
                    <strong className="hoursTime">{item.time}</strong>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="contentBox heroContentBox">
            <div className="heroContent">
              <h1>You hangry?</h1>
              <p>
                Vi fattar. När hungern slår till ska det gå snabbt — och vara riktigt gott.
                Hos oss får du nybakade pizzor, schyssta råvaror och smaker som levererar varje gång.
              </p>

              <p>
                Beställ online, hämta snabbt eller slå dig ner hos oss.
                Enkelt, snabbt och riktigt bra.
              </p>


              <div className="heroButtons">
                <Button
                  onClick={() => setMenuOpen(true)}
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
          </div>


        </section>
        <section className="favoritesSectionWrapper">
          <div className="sectionCornerLabel favoritesSectionLabel">
            Kundernas favoriter
          </div>

          <div className="contentBox favoritesBox">
            <div className="homeSection favoritesSection">
              <div className="favoritesCarouselBox">
                <ProductCarousel />
              </div>
            </div>
          </div>
        </section>
        <section className="promoSection">
          <div className="sectionCornerLabel promoSectionLabel">Schyssta deals</div>

          <div className="heroPromoRow">
            <div className="contentBox heroPromoBox">
              <div className="promoInner">
                <img
                  src="/images/site/campaigns/pizzaaaa.jpg"
                  alt="Kampanj 1"
                  className="promoImage"
                />
                <div className="promoOverlay" />
                <div className="promoContent">
                  <h3>Dagens tips</h3>
                  <p className="promoTitle">2 för 1 på utvalda pizzor</p>
                  <p className="promoText">
                    Gäller vardagar mellan 14:00–17:00.
                  </p>
                </div>
              </div>
            </div>

            <div className="contentBox heroPromoBox">
              <div className="promoInner">
                <img
                  src="/images/site/campaigns/cheeseburger.jpg"
                  alt="Kampanj 2"
                  className="promoImage"
                />
                <div className="promoOverlay" />
                <div className="promoContent">
                  <h3>Veckans kampanj</h3>
                  <p className="promoTitle">Läsk på köpet</p>
                  <p className="promoText">Vid köp av valfri familjepizza.</p>
                </div>
              </div>
            </div>

            <div className="contentBox heroPromoBox">
              <div className="promoInner">
                <img
                  src="/images/site/campaigns/pizzeria1.jpg"
                  alt="Kampanj 3"
                  className="promoImage"
                />
                <div className="promoOverlay" />
                <div className="promoContent">
                  <h3>Lunchdeal</h3>
                  <p className="promoTitle">Pizza + dryck 109:-</p>
                  <p className="promoText">Alla vardagar.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <MenuModal isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </Page>
  );
}