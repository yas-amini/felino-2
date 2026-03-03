// src/components/layout/Navbar.tsx
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Navbar.css";

type NavbarProps = {
  /** Path to your logo image, e.g. "/images/logo.png" */
  logoSrc?: string;
  /** Alt text for the logo image */
  logoAlt?: string;
  /** Cart count badge */
  cartCount?: number;
};

export default function Navbar({
  logoSrc = "/images/logo-placeholder.png",
  logoAlt = "Felino Pizza",
  cartCount = 0,
}: NavbarProps) {
  const [q, setQ] = useState("");
  const navigate = useNavigate();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = q.trim();
    if (!query) return;
    navigate(`/sok?q=${encodeURIComponent(query)}`);
  };

  return (
    <header className="site-header">
      <nav className="navbar" aria-label="Huvudnavigering">
        {/* Left: Logo */}
        <div className="nav-left">
          <Link to="/" className="brand" aria-label="Till startsidan">
            <img className="brand-logo" src={logoSrc} alt={logoAlt} />
          </Link>
        </div>

        {/* Center: Menu */}
        <div className="nav-center">
          <ul className="nav-links" id="primary-menu">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
              >
                Hem
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/meny"
                className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
              >
                Meny
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/boka-bord"
                className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
              >
                Boka bord
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Right: Search + Cart */}
        <div className="nav-right">
          <form className="search-form" role="search" onSubmit={onSubmit}>
            <input
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Sök…"
              aria-label="Sök"
            />
            <button type="submit" className="search-submit" aria-label="Sök">
              🔍
            </button>
          </form>

          <Link to="/varukorg" className="cart-link" aria-label="Varukorg">
            <span className="cart-icon" aria-hidden="true">
              🛒
            </span>
            <span className="cart-badge" aria-label={`${cartCount} varor i varukorgen`}>
              {cartCount}
            </span>
          </Link>
        </div>
      </nav>
    </header>
  );
}