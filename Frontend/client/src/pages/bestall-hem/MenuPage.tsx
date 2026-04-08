import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import "./MenuPage.css";
import Container from "../../components/layout/Container";
import ProductModal from "../../components/products/ProductModal";
import { useNotification } from "../../context/NotificationContext";
import type { ProductModalData } from "../../types/product";

type Product = ProductModalData;

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
  const { showNotification } = useNotification();

  useEffect(() => {
    async function fetchMenu() {
      try {
        const response = await fetch("/api/categories");
        if (!response.ok) throw new Error("Kunde inte hämta menyn.");
        const data = await response.json();

        const mappedCategories: CategoryData[] = data.map((cat: any) => ({
          name: cat.name,
          products: cat.products.map((p: any) => ({
            id: p.id,
            name: p.name,
            price: p.price,
            image: p.imageUrl || "/images/placeholder.png",
            category: cat.slug,
            sauce: p.sauce,
            ingredients: p.ingredients
              ? p.ingredients.split(",").map((x: string) => x.trim()).filter(Boolean)
              : [],
          })),
        }));

        setCategories(mappedCategories.filter((c) => c.products.length > 0));
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

      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </Container>
  );
}