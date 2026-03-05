import React, { useState } from "react";
import type { Product } from "./MenuPage";

interface Props {
  product: Product;
  onClose: () => void;
  onConfirm: (product: Product, quantity: number, instructions: string) => void;
}

const ProductModal: React.FC<Props> = ({ product, onClose, onConfirm }) => {
  const [quantity, setQuantity] = useState(1);
  const [instructions, setInstructions] = useState("");

  const totalPrice = (quantity * product.price).toFixed(2);

  return (
    <div className="modal active" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="modal-close" onClick={onClose}>
          &times;
        </span>

        <div className="modal-image">
          <img src={product.image} alt={product.name} />
        </div>

        <div className="modal-info">
          <h2>{product.name}</h2>

          <p>{product.ingredients?.join(", ")}</p>

          {product.sides && <p>Tillbehör: {product.sides.join(", ")}</p>}

          {product.sauce && <p>Sås: {product.sauce}</p>}

          <span className="modal-price">{totalPrice} SEK</span>
        </div>

        <div className="quantity-selector">
          <label>Antal:</label>
          <input
            type="number"
            value={quantity}
            min="1"
            onChange={(e) =>
              setQuantity(Math.max(1, parseInt(e.target.value) || 1))
            }
          />
        </div>

        <div className="special-instructions">
          <label>Specialinstruktioner:</label>
          <textarea
            placeholder="T.ex. ingen lök, extra sås..."
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
          />
        </div>

        <button
          className="modal-add"
          onClick={() => onConfirm(product, quantity, instructions)}
        >
          Lägg till i varukorgen - {totalPrice} SEK
        </button>
      </div>
    </div>
  );
};

export default ProductModal;
