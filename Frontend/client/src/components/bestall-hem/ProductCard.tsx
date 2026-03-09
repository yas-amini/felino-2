interface Product {
  id: number;
  name: string;
  image: string;
  category: string;
  ingredients?: string[];
  sides?: string[];
  sauce?: string;
  price: number;
}

interface Props {
  product: Product;
  onOpen: (product: Product) => void;
}

export default function ProductCard({ product, onOpen }: Props) {
  return (
    <div className="product-card" onClick={() => onOpen(product)}>
      <div className="product-image-container">
        <img src={product.image} alt={product.name} className="product-image" />

        <button
          className="add-to-cart"
          onClick={(e) => {
            e.stopPropagation();
            console.log("Add to cart", product);
          }}
        >
          +
        </button>
      </div>

      <div className="product-info">
        <h3 className="product-title">{product.name}</h3>

        {product.ingredients && (
          <p className="product-ingredients">
            {product.ingredients.join(", ")}
          </p>
        )}

        {product.sides && (
          <p className="product-sides">Tillbehör: {product.sides.join(", ")}</p>
        )}

        {product.sauce && <p className="product-sauce">Sås: {product.sauce}</p>}

        <span className="product-price">{product.price} SEK</span>
      </div>
    </div>
  );
}
