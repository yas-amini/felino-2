import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import "./MenuPage.css";
import Container from "../../components/layout/Container";
import { useCart } from "../../context/CartContext";
import { useNotification } from "../../context/NotificationContext";

type Product = {
  id: number;
  name: string;
  image: string;
  category: string;
  ingredients?: string[];
  price: number;
  sauce?: string;
};

type CategoryData = {
  name: string;
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

export default function MenuPage() {
  const [categories, setCategories] = useState<CategoryData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [specialInstructions, setSpecialInstructions] = useState("");
  const { addToCart } = useCart();
  const { showNotification } = useNotification();

  useEffect(() => {
    async function fetchMenu() {
      try {
        const response = await fetch("/api/categories");
        if (!response.ok) throw new Error("Kunde inte hämta menyn.");
        const data = await response.json();

        // Map CategoryResponseDto to our CategoryData structure
        const mappedCategories: CategoryData[] = data.map((cat: any) => ({
          name: cat.name,
          products: cat.products.map((p: any) => ({
            id: p.id,
            name: p.name,
            price: p.price,
            image: p.imageUrl || "/images/placeholder.png",
            category: cat.slug,
            sauce: p.sauce,
            ingredients: p.ingredients ? JSON.parse(p.ingredients) : []
          }))
        }));

        setCategories(mappedCategories.filter(c => c.products.length > 0));
      } catch (err) {
        console.error(err);
        showNotification("Fel vid hämtning av menyn.", "error");
      } finally {
        setIsLoading(false);
      }
    }

    fetchMenu();
  }, [showNotification]);

  function openProduct(product: Product) {
    setSelectedProduct(product);
    setQuantity(1);
    setSpecialInstructions("");
  }

  if (isLoading) {
    return (
      <Container>
        <div className="menu-loading">Laddar menyn...</div>
      </Container>
    );
  }

  return (
    <Container>
      <div className="menu-content">
        {categories.map((category) => (
          <section key={category.name}>
            <h2>{categoryTranslations[category.name.toLowerCase()] || category.name}</h2>

            <div className="product-container">
              {category.products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product as any}
                  onOpen={openProduct}
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

                {selectedProduct.sauce && <p>Sås: {selectedProduct.sauce}</p>}

                <div className="modal-price">{selectedProduct.price} SEK</div>
              </div>

              <div className="quantity-selector">
                <label>Antal:</label>
                <input
                  type="number"
                  value={quantity}
                  min={1}
                  onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
                />
              </div>

              <div className="special-instructions">
                <label>Speciala önskemål:</label>
                <textarea
                  placeholder="T.ex. ingen lök..."
                  value={specialInstructions}
                  onChange={(e) => setSpecialInstructions(e.target.value)}
                />
              </div>

              <button className="modal-add" onClick={() => {
                addToCart({
                  id: selectedProduct.id,
                  name: selectedProduct.name,
                  price: selectedProduct.price,
                  image: selectedProduct.image,
                  quantity,
                  specialInstructions: specialInstructions.trim() || undefined,
                });
                showNotification(`${selectedProduct.name} har lagts till i varukorgen!`);
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
