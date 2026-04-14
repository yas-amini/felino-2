import "./Promo.css";

type PromoCardProps = {
  image: string;
  alt: string;
  eyebrow?: string;
  title: string;
  text: string;
  label?: string;
  variant?: "a" | "b" | "c";
  index?: number;
};

export default function PromoCard({
  image,
  alt,
  eyebrow,
  title,
  text,
  label,
  variant = "a",
  index = 0,
}: PromoCardProps) {
  return (
    <article className={`promoCardItem promoCardItem--${variant}`}>
      <div className="contentBox heroPromoBox">
        <div className="promoInner">
         

          <div className="promoImageWrap">
            <img src={image} alt={alt} className="promoImage" />

            {eyebrow && <p className="promoEyebrow">{eyebrow}</p>}

            <span className="promoNumber" aria-hidden="true">
              0{index + 1}
            </span>
          </div>

          <div className="promoBody">
            {label && (
              <div className="promoTopline">
                <span className="promoToplineDot" />
                <span className="promoLabel">{label}</span>
              </div>
            )}

            <h3 className="promoTitle">{title}</h3>
            <p className="promoText">{text}</p>

            <div className="promoBottomRow">
              <span className="promoBottomRule" />
              <span className="promoBottomText">Gäller under begränsad tid</span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}