import PromoCard from "./PromoCard";
import "./Promo.css";

const promos = [
  {
    image: "/images/site/campaigns/pizzaaaa.jpg",
    alt: "Kampanj 1",
    eyebrow: "Dagens tips",
    title: "2 för 1 på utvalda pizzor",
    text: "Gäller vardagar mellan 14:00–17:00.",
  },
  {
    image: "/images/site/campaigns/cheeseburger.jpg",
    alt: "Kampanj 2",
    eyebrow: "Veckans kampanj",
    title: "Läsk på köpet",
    text: "Vid köp av valfri familjepizza.",
  },
  {
    image: "/images/site/campaigns/pizzeria1.jpg",
    alt: "Kampanj 3",
    eyebrow: "Lunchdeal",
    title: "Pizza + dryck 109:-",
    text: "Alla vardagar.",
  },
];

export default function Promo() {
  return (
    <section className="promoSection">
      <div className="sectionCornerLabel promoSectionLabel">Schyssta deals</div>

      <div className="heroPromoRow">
        {promos.map((promo) => (
          <PromoCard
            key={promo.title}
            image={promo.image}
            alt={promo.alt}
            eyebrow={promo.eyebrow}
            title={promo.title}
            text={promo.text}
          />
        ))}
      </div>
    </section>
  );
}