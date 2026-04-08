import { useEffect, useState } from "react";
import { useCart } from "../../context/CartContext";
import { useNotification } from "../../context/NotificationContext";
import type { ProductModalData } from "../../types/product";
import "./ProductModal.css";

type Props = {
  product: ProductModalData | null;
  onClose: () => void;
};

export default function ProductModal({ product, onClose }: Props) {
  const { addToCart } = useCart();
  const { showNotification } = useNotification();

  const [quantity, setQuantity] = useState(1);
  const [specialInstructions, setSpecialInstructions] = useState("");

  useEffect(() => {
    if (product) {
      setQuantity(1);
      setSpecialInstructions("");
    }
  }, [product]);

  if (!product) return null;

  const currentProduct = product;

  function handleAddToCart() {
    addToCart({
      id: currentProduct.id,
      name: currentProduct.name,
      price: currentProduct.price,
      image: currentProduct.image,
      quantity,
      specialInstructions: specialInstructions.trim() || undefined,
    });

    showNotification(`${currentProduct.name} har lagts till i varukorgen!`);
    onClose();
  }

  return (
    <div className="modal-overlay active" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Stäng">
          ×
        </button>

        <div className="modal-image">
          <img src={currentProduct.image} alt={currentProduct.name} />
        </div>

        <div className="modal-info">
          <h2>{currentProduct.name}</h2>

          {currentProduct.ingredients && currentProduct.ingredients.length > 0 && (
            <p>{currentProduct.ingredients.join(", ")}</p>
          )}

          {currentProduct.sides && currentProduct.sides.length > 0 && (
            <p>Tillbehör: {currentProduct.sides.join(", ")}</p>
          )}

          {currentProduct.sauce && <p>Sås: {currentProduct.sauce}</p>}

          <div className="modal-price">{currentProduct.price} SEK</div>
        </div>

        <div className="quantity-selector">
          <label htmlFor="product-modal-quantity">Antal:</label>
          <input
            id="product-modal-quantity"
            type="number"
            value={quantity}
            min={1}
            onChange={(e) =>
              setQuantity(Math.max(1, Number(e.target.value) || 1))
            }
          />
        </div>

        <div className="special-instructions">
          <label htmlFor="product-modal-instructions">
            Speciala önskemål:
          </label>
          <textarea
            id="product-modal-instructions"
            placeholder="T.ex. ingen lök..."
            value={specialInstructions}
            onChange={(e) => setSpecialInstructions(e.target.value)}
          />
        </div>

        <button className="modal-add" onClick={handleAddToCart}>
          Lägg till i beställning
        </button>
      </div>
    </div>
  );
}