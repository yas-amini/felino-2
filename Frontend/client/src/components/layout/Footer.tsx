import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faFacebook,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import AdminProfileModal from "../common/Modal/AdminProfileModal";
import { hasValidAdminToken } from "../../utils/authSession";

type FooterProps = {
  onOpenMenu: () => void;
};

export default function Footer({ onOpenMenu }: FooterProps) {
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setIsProfileModalOpen(false);
  }, [location.pathname]);

  function handleProfileClick() {
    if (hasValidAdminToken()) {
      navigate("/admin");
      return;
    }

    setIsProfileModalOpen(true);
  }

  function handleCloseModal() {
    setIsProfileModalOpen(false);
  }

  return (
    <>
      <footer>
        <nav className="footer-content" aria-label="Sidfotsnavigering">
          <section className="footer-col">
            <div className="footer-brand">
              <img
                src="/images/logga/felinopizzeriaillus.png"
                alt="Felino Pizza"
                className="footerLogo"
              />
            </div>
          </section>

          <section className="footer-col">
            <h3>Din väg till maten</h3>
            <ul>
              <li>
                <Link to="/bestall">Beställ hem</Link>
              </li>
              <li>
                <Link to="/boka-bord">Boka bord</Link>
              </li>
              <li>
                <button
                  type="button"
                  className="footerLinkButton"
                  onClick={onOpenMenu}
                >
                  Meny
                </button>
              </li>
            </ul>
          </section>

          <section className="footer-col">
            <h3>Kontaktuppgifter</h3>
            <ul>
              <li>Adress: Storgatan 1, 123 45 Stad</li>
              <li>
                Email:{" "}
                <a href="mailto:info@felinopizza.se">info@felinopizza.se</a>
              </li>
              <li>
                Telefon: <a href="tel:0123456789">012-345 67 89</a>
              </li>
            </ul>

            <p className="footer-social-text">
              Vi finns även på sociala medier! ⤵
            </p>
          </section>
        </nav>

        <div className="footer-bottom">
          <div className="footer-bottom-inner">
            <p>
              © {new Date().getFullYear()} Felino Pizza. Alla rättigheter
              förbehållna.
            </p>

            <div className="footer-meta">
              <span>Öppettider: 11:00–22:00</span>
              <span>•</span>
              <span>Storgatan 1, 123 45 Stad</span>
            </div>

            <ul className="footer-social-row" aria-label="Sociala medier">
              <li>
                <a href="#" aria-label="Facebook">
                  <FontAwesomeIcon icon={faFacebook} />
                </a>
              </li>
              <li>
                <a href="#" aria-label="Instagram">
                  <FontAwesomeIcon icon={faInstagram} />
                </a>
              </li>
              <li>
                <a href="#" aria-label="X">
                  <FontAwesomeIcon icon={faXTwitter} />
                </a>
              </li>
              <li>
                <button
                  type="button"
                  className="footerIconButton"
                  aria-label="Profil"
                  onClick={handleProfileClick}
                >
                  <FontAwesomeIcon icon={faUser} />
                </button>
              </li>
            </ul>
          </div>
        </div>
      </footer>

      {isProfileModalOpen && (
        <AdminProfileModal
          isOpen={true}
          onClose={handleCloseModal}
          redirectTo="/admin"
        />
      )}
    </>
  );
}