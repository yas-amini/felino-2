import ProductCarousel from "../../components/common/carousel/ProductCarousel";
import "./Favorites.css";

export default function Favorites() {
  return (
    <div className="favoritesSection">
      <div className="favoritesSectionLabel">Kundernas favoriter</div>
      <div className="favoritesContent">
        <ProductCarousel />
      </div>
    </div>
  );
}