import { NavLink, useNavigate, Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import "./Navbar.css";
import Logo from "../Logo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBasketShopping } from "@fortawesome/free-solid-svg-icons";

type NavbarProps = {
  cartCount?: number;
};

export default function Navbar({ cartCount = 0 }: NavbarProps) {
  const [q, setQ] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [logoFade, setLogoFade] = useState(0);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const searchRef = useRef<HTMLFormElement | null>(null);

  const navigate = useNavigate();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = q.trim();
    if (!query) return;
    navigate(`/sok?q=${encodeURIComponent(query)}`);
  };

  const toggleSearch = () => {
    setSearchOpen((v) => {
      const next = !v;
      if (next) requestAnimationFrame(() => inputRef.current?.focus());
      return next;
    });
  };

  // Stäng sök när man klickar utanför (så bakgrund + fält försvinner)
  useEffect(() => {
    if (!searchOpen) return;

    const onPointerDown = (e: PointerEvent) => {
      const el = searchRef.current;
      if (!el) return;
      if (!el.contains(e.target as Node)) setSearchOpen(false);
    };

    window.addEventListener("pointerdown", onPointerDown);
    return () => window.removeEventListener("pointerdown", onPointerDown);
  }, [searchOpen]);

  // Fadea ut loggan när man scrollar
  useEffect(() => {
    const getY = () =>
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;

    const MAX_FADE_PX = 40; 

    const handle = () => {
      const y = getY();
      const t = Math.min(1, Math.max(0, y / MAX_FADE_PX));
      setLogoFade(t);
    };

    handle();

    window.addEventListener("scroll", handle, { passive: true });
    document.addEventListener("scroll", handle, { passive: true, capture: true });
    window.addEventListener("resize", handle, { passive: true });

    return () => {
      window.removeEventListener("scroll", handle as any);
      document.removeEventListener("scroll", handle as any, true);
      window.removeEventListener("resize", handle as any);
    };
  }, []);

  return (
    <header className={`fpNav-header ${logoFade > 0.02 ? "is-scrolled" : ""}`}>
      <nav className="fpNav-container" aria-label="Huvudnavigering">
        {/* LEFT: menu */}
        <div className="fpNav-left">
          <ul className="fpNav-links">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "fpNav-link is-active" : "fpNav-link"
                }
              >
                Hem
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/meny"
                className={({ isActive }) =>
                  isActive ? "fpNav-link is-active" : "fpNav-link"
                }
              >
                Meny
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/bestall"
                className={({ isActive }) =>
                  isActive ? "fpNav-link is-active" : "fpNav-link"
                }
              >
                Beställ
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/boka-bord"
                className={({ isActive }) =>
                  isActive ? "fpNav-link is-active" : "fpNav-link"
                }
              >
                Boka bord
              </NavLink>
            </li>
          </ul>
        </div>

        <div
          className="fpNav-stickerSlot"
          style={{
            opacity: 1 - logoFade,
          }}
        >
          <Logo size={240} />
        </div>

        {/* RIGHT: search + cart */}
        <div className="fpNav-right">
          <form
            ref={searchRef}
            className={`fpNav-search ${searchOpen ? "is-open" : ""}`}
            role="search"
            onSubmit={onSubmit}
          >
            <button
              type="button"
              className="fpNav-searchToggle"
              onClick={toggleSearch}
              aria-label={searchOpen ? "Stäng sök" : "Öppna sök"}
              aria-expanded={searchOpen}
            >
              ⌕
            </button>

            <input
              ref={inputRef}
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Sök…"
              aria-label="Sök"
            />
          </form>

          <Link to="/varukorg" className="fpNav-cart" aria-label="Varukorg">
            <FontAwesomeIcon icon={faBasketShopping} className="fpNav-cartIcon" />
            {cartCount > 0 && <span className="fpNav-badge">{cartCount}</span>}
          </Link>
        </div>
      </nav>
    </header>
  );
}