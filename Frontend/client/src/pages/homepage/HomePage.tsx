import { useState } from "react";

import Page from "../../components/layout/Page";
import MenuModal from "../../components/common/Modal/MenuModal";
import Hero from "../../components/home/Hero"
import OpeningHours from "../../components/home/OpeningHours";
import Favorites from "../../components/home/Favorites";
import Promo from "../../components/home/Promo";
import Collage from "../../components/home/Collage";
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
        <div className="homeBox homeBoxHours">
          <OpeningHours hours={openingHours} />
        </div>

        <div className="homeBox homeBoxHero">
          <Hero onOpenMenu={() => setMenuOpen(true)} />
        </div>

        <div className="homeBox homeBoxCollage">
          <Collage />
        </div>



        <div className="homeBox homeBoxPromo">
          <Promo />
        </div>

        <div className="homeBox homeBoxFavorites">
          <Favorites />
        </div>


      </div>

      <MenuModal isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </Page>
  );
}