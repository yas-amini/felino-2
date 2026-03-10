import { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import "./ProductCarousel.css";

type Props = {
  children?: React.ReactNode;
  placeholderCount?: number;
};

export default function ProductCarousel({
  children,
  placeholderCount = 8,
}: Props) {
  const carouselRef = useRef<HTMLDivElement | null>(null);

  function scrollCarousel(direction: "left" | "right") {
    if (!carouselRef.current) return;

    const container = carouselRef.current;
    const scrollAmount = container.clientWidth * 0.8;

    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  }

  const hasChildren = !!children;

  return (
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
        {hasChildren
          ? children
          : Array.from({ length: placeholderCount }).map((_, index) => (
              <article className="productPlaceholderCard" key={index}>
                <div className="productPlaceholderMedia" />
                <div className="productPlaceholderBody">
                  <div className="productPlaceholderLine productPlaceholderLineText" />
                  <div className="productPlaceholderLine productPlaceholderLineText" />
                  <div className="productPlaceholderLine productPlaceholderLineText" />
                </div>
              </article>
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
  );
}