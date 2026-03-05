export interface Product {
  id: number;
  name: string;
  category: "pizza" | "burger" | "kebab" | "grill" | "sallad" | "pasta";
  ingredients: string[]; // Parsed from JSON in your DB
  sides?: string[];
  sauce?: string;
  price: number;
  image: string;
}

export interface CartItem extends Product {
  quantity: number;
  specialInstructions: string;
  cartItemId: string;
}

import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import ProductModal from "./ProductModal";

const categoryTranslations: Record<string, string> = {
  pizza: "Pizza",
  burger: "Burgare",
  kebab: "Kebab",
  grill: "Grill",
  sallad: "Sallad",
  pasta: "Pasta",
};

const MenuPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  const handleAddToCart = (
    product: Product,
    quantity: number,
    instructions: string,
  ) => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");

    const newItem = {
      ...product,
      quantity,
      specialInstructions: instructions,
      cartItemId: Date.now().toString(),
    };

    const updatedCart = [...cart, newItem];
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    window.dispatchEvent(new CustomEvent("cartUpdated"));

    setSelectedProduct(null);
  };

  if (loading) return <div>Laddar meny...</div>;

  const categories = Array.from(new Set(products.map((p) => p.category)));

  return (
    <div className="menu-content">
      {categories.map((cat) => (
        <section key={cat} id={cat}>
          <h2>{categoryTranslations[cat] || cat}</h2>

          <div className="product-container">
            {products
              .filter((p) => p.category === cat)
              .map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAdd={setSelectedProduct}
                />
              ))}
          </div>
        </section>
      ))}

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onConfirm={handleAddToCart}
        />
      )}
    </div>
  );
};

export default MenuPage;
