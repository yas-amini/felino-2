import React from "react";
import type { Product } from "./MenuPage"; // Adjust path as needed

interface Props {
  product: Product;
  onAdd: (product: Product) => void;
}

const ProductCard: React.FC<Props> = ({ product, onAdd }) => {
  return (
    <div className="product-card">
      <div className="product-image-container">
        <img src={product.image} alt={product.name} className="product-image" />

        <button className="add-to-cart" onClick={() => onAdd(product)}>
          <i className="fi fi-rr-add"></i>
        </button>
      </div>

      <div className="product-info">
        <h3 className="product-title">{product.name}</h3>

        {product.ingredients && product.ingredients.length > 0 && (
          <p className="product-ingredients">
            {product.ingredients.join(", ")}
          </p>
        )}

        {product.sides && product.sides.length > 0 && (
          <p className="product-sides">Tillbehör: {product.sides.join(", ")}</p>
        )}

        {product.sauce && <p className="product-sauce">Sås: {product.sauce}</p>}

        <span className="product-price">{product.price} SEK</span>
      </div>
    </div>
  );
};

export default ProductCard;
