import { useState } from "react";
import "./bestall-hem.css";
import ProductCard from "./ProductCard";
import ProductModal from "./ProductModal";

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
  products: Product[];
}

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

      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
}
