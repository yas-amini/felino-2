type Product = {
  id: number;
  name: string;
  image: string;
  category: string;
  ingredients?: string[];
  sides?: string[];
  sauce?: string;
  price: number;
};

type Props = {
  product: Product | null;
  onClose: () => void;
};

export default function ProductModal({ product, onClose }: Props) {
  if (!product) return null;

  return (
    <div className="modal active" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="modal-close" onClick={onClose}>
          ×
        </span>

        <div className="modal-image">
          <img src={product.image} alt={product.name} />
        </div>

        <div className="modal-info">
          <h2>{product.name}</h2>

          {product.ingredients && <p>{product.ingredients.join(", ")}</p>}

          {product.sides && <p>Tillbehör: {product.sides.join(", ")}</p>}

          {product.sauce && <p>Sås: {product.sauce}</p>}

          <span className="modal-price">{product.price} SEK</span>
        </div>

        <div className="quantity-selector">
          <label>Antal:</label>
          <input type="number" defaultValue={1} min={1} />
        </div>

        <div className="special-instructions">
          <label>Specialinstruktioner:</label>
          <textarea placeholder="T.ex. ingen lök, extra sås..." />
        </div>

        <button className="modal-add">Lägg till i varukorgen</button>
      </div>
    </div>
  );
}
