import ProductCarousel from "../../components/common/carousel/ProductCarousel";
import "./Favorites.css";

export default function Favorites() {
  return (
    <section className="favoritesSection">

      <div className="favoritesHeader">
        <p className="favoritesKicker">Populärt just nu</p>
        <h2 className="favoritesTitle">
          Sånt våra gäster gärna kommer tillbaka för.
        </h2>
      </div>

      <div className="favoritesContent">
        <ProductCarousel />
      </div>
    </section>
  );
}