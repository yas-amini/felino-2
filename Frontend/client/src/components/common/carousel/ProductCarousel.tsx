import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import type { FeaturedProductDto, ProductModalData } from "../../../types/product";
import { getFeaturedProducts } from "../../../api/featuredProductApi";
import ProductModal from "../../../components/products/ProductModal";
import "./ProductCarousel.css";

type Props = {
  placeholderCount?: number;
  take?: number;
};

function mapFeaturedProductToModalData(
  product: FeaturedProductDto
): ProductModalData {
  return {
    id: product.id,
    name: product.name,
    image: product.imageUrl ?? "",
    category: "",
    ingredients: product.ingredients
      ? product.ingredients
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean)
      : [],
    sauce: product.sauce ?? undefined,
    price: product.price,
  };
}

export default function ProductCarousel({
  placeholderCount = 8,
  take = 8,
}: Props) {
  const carouselRef = useRef<HTMLDivElement | null>(null);

  const [products, setProducts] = useState<FeaturedProductDto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<ProductModalData | null>(null);

  useEffect(() => {
    async function loadProducts() {
      try {
        setIsLoading(true);
        const result = await getFeaturedProducts(take);
        setProducts(result);
      } catch (error) {
        console.error("Kunde inte hämta featured products:", error);
        setProducts([]);
      } finally {
        setIsLoading(false);
      }
    }

    loadProducts();
  }, [take]);

  function scrollCarousel(direction: "left" | "right") {
    if (!carouselRef.current) return;

    const container = carouselRef.current;
    const scrollAmount = container.clientWidth * 0.8;

    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  }

  return (
    <>
      <div className="productCarouselWrapper">
        <button
          type="button"
          className="productCarouselArrow productCarouselArrowLeft"
          onClick={() => scrollCarousel("left")}
          aria-label="Visa föregående produkter"
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>

        <div className="productCarousel" ref={carouselRef}>
          {isLoading
            ? Array.from({ length: placeholderCount }).map((_, index) => (
                <article className="productPlaceholderCard" key={index}>
                  <div className="productPlaceholderMedia" />
                  <div className="productPlaceholderBody">
                    <div className="productPlaceholderLine productPlaceholderLineText" />
                    <div className="productPlaceholderLine productPlaceholderLineText" />
                  </div>
                </article>
              ))
            : products.map((product) => (
                <button
                  type="button"
                  className="productCarouselCard"
                  key={product.id}
                  onClick={() => setSelectedProduct(mapFeaturedProductToModalData(product))}
                  aria-label={`Visa ${product.name}`}
                >
                  <div className="productCarouselCardMedia">
                    {product.imageUrl ? (
                      <img
                        src={product.imageUrl}
                        alt={product.altText || product.name}
                        className="productCarouselCardImage"
                      />
                    ) : (
                      <div className="productCarouselCardImagePlaceholder">
                        <span>Ingen bild</span>
                      </div>
                    )}
                  </div>

                  <div className="productCarouselCardBody">
                    <h3 className="productCarouselCardTitle">{product.name}</h3>
                    <p className="productCarouselCardPrice">{product.price} kr</p>
                  </div>
                </button>
              ))}
        </div>

        <button
          type="button"
          className="productCarouselArrow productCarouselArrowRight"
          onClick={() => scrollCarousel("right")}
          aria-label="Visa fler produkter"
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>

      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </>
  );
}