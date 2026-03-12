import "./Promo.css";

type PromoCardProps = {
  image: string;
  alt: string;
  eyebrow: string;
  title: string;
  text: string;
};

export default function PromoCard({
  image,
  alt,
  eyebrow,
  title,
  text,
}: PromoCardProps) {
  return (
    <div className="contentBox heroPromoBox">
      <div className="promoInner">
        <img src={image} alt={alt} className="promoImage" />
        <div className="promoOverlay" />
        <div className="promoContent">
          <h3>{eyebrow}</h3>
          <p className="promoTitle">{title}</p>
          <p className="promoText">{text}</p>
        </div>
      </div>
    </div>
  );
}