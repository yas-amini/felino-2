import { Link } from "react-router-dom";
import "./Logo.css";

type LogoProps = {
  size?: number;
};

export default function Logo({ size = 120 }: LogoProps) {
  return (
    <Link
      to="/"
      className="logo-wrapper"
      aria-label="Till startsidan"
      style={{ width: size, height: size }}
    >
      <img
        src="/images/Felinoslogga.png"   
        alt="Felino Pizza"
        className="logo-image"
      />
    </Link>
  );
}