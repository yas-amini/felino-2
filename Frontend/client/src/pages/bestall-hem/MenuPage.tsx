import { useState } from "react";
import ProductCard from "./ProductCard";
import "./MenuPage.css";
import Container from "../../components/layout/Container";

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
  products: Product[];
};

const categoryTranslations: Record<string, string> = {
  pizza: "Pizza",
  burger: "Burgare",
  kebab: "Kebab",
  grill: "Grill",
  sallad: "Sallad",
  pasta: "Pasta",
};

export default function MenuPage({ products = [] }: Props) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const categories = [...new Set(products.map((p) => p.category))];

  return (
    <Container>
      <div className="menu-content">
        {categories.map((category) => (
          <section key={category}>
            <h2>{categoryTranslations[category] || category}</h2>

            <div className="product-container">
              {products
                .filter((p) => p.category === category)
                .map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onOpen={setSelectedProduct}
                  />
                ))}
            </div>
          </section>
        ))}
      </div>

      {/* MODAL OVERLAY - Recreating your old project structure */}
      <div className={`modal-overlay ${selectedProduct ? "active" : ""}`} onClick={() => setSelectedProduct(null)}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <button className="modal-close" onClick={() => setSelectedProduct(null)}>×</button>
          
          {selectedProduct && (
            <>
              <div className="modal-image">
                <img src={selectedProduct.image} alt={selectedProduct.name} />
              </div>

              <div className="modal-info">
                <h2>{selectedProduct.name}</h2>

                {selectedProduct.ingredients && (
                  <p>{selectedProduct.ingredients.join(", ")}</p>
                )}

                {selectedProduct.sides && (
                  <p>Tillbehör: {selectedProduct.sides.join(", ")}</p>
                )}

                {selectedProduct.sauce && <p>Sås: {selectedProduct.sauce}</p>}

                <div className="modal-price">{selectedProduct.price} SEK</div>
              </div>

              <div className="quantity-selector">
                <label>Antal:</label>
                <input type="number" defaultValue={1} min={1} />
              </div>

              <div className="special-instructions">
                <label>Speciella önskemål:</label>
                <textarea placeholder="T.ex. ingen lök..."></textarea>
              </div>

              <button className="modal-add" onClick={() => {
                alert(`Tillagd i varukorgen: ${selectedProduct.name}`);
                setSelectedProduct(null);
              }}>
                Lägg till i beställning
              </button>
            </>
          )}
        </div>
      </div>
    </Container>
  );
}
