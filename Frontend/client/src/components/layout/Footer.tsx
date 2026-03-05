import { Link } from "react-router-dom";
import "./Footer.css";
import Logo from "../Logo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faFacebook, faXTwitter } from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
  return (
    <footer>
      <nav className="footer-content" aria-label="Sidfotsnavigering">
        <section className="footer-col">
          <div className="footer-brand">
            <Logo size={150} />
          </div>
        </section>

        <section className="footer-col">
          <h3>Din väg till maten</h3>
          <ul>
            <li><Link to="/meny">Beställ hem</Link></li>
            <li><Link to="/boka-bord">Boka bord</Link></li>
            <li><a href="/#meny">Meny</a></li>
          </ul>
        </section>

        <section className="footer-col">
          <h3>Kontaktuppgifter</h3>
          <ul>
            <li>Adress: Storgatan 1, 123 45 Stad</li>
            <li>Email: <a href="mailto:info@felinopizza.se">info@felinopizza.se</a></li>
            <li>Telefon: <a href="tel:0123456789">012-345 67 89</a></li>
          </ul>

          <p className="footer-social-text">Vi finns även på sociala medier! ⤵</p>
        </section>
      </nav>

      {/* ===== FOOTER BOTTOM ===== */}
      <div className="footer-bottom">
        <div className="footer-bottom-inner">
          <p>© {new Date().getFullYear()} Felino Pizza. Alla rättigheter förbehållna.</p>

          <div className="footer-meta">
            <span>Öppettider: 11:00–22:00</span>
            <span>•</span>
            <span>Storgatan 1, 123 45 Stad</span>
          </div>

          <ul className="footer-social-row" aria-label="Sociala medier">
            <li><a href="#" aria-label="Facebook"><FontAwesomeIcon icon={faFacebook} /></a></li>
            <li><a href="#" aria-label="Instagram"><FontAwesomeIcon icon={faInstagram} /></a></li>
            <li><a href="#" aria-label="X"><FontAwesomeIcon icon={faXTwitter} /></a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}