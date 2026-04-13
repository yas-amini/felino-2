import { useEffect, useMemo, useState } from "react";
import PromoCard from "./PromoCard";
import { getActiveCampaigns } from "../../api/campaignApi";
import type { CampaignDto } from "../../types/campaign";
import "./Promo.css";

const VISIBLE_COUNT = 3;
const ROTATE_INTERVAL_MS = 6000;

function getVisiblePromos(
  promos: CampaignDto[],
  startIndex: number,
  count: number
) {
  if (promos.length <= count) {
    return promos;
  }

  return Array.from({ length: count }, (_, index) => {
    const promoIndex = (startIndex + index) % promos.length;
    return promos[promoIndex];
  });
}

function formatShortDate(dateString: string) {
  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) {
    return dateString;
  }

  return new Intl.DateTimeFormat("sv-SE", {
    day: "numeric",
    month: "short",
  }).format(date);
}

function formatDateRange(startDate: string, endDate: string) {
  return `${formatShortDate(startDate)} – ${formatShortDate(endDate)}`;
}

function getPromoVariant(index: number): "a" | "b" | "c" {
  const variants: Array<"a" | "b" | "c"> = ["a", "b", "c"];
  return variants[index % variants.length];
}

function getPromoLabel(index: number) {
  const labels = ["Veckans special", "Utvalt just nu", "Nytt från köket"];
  return labels[index % labels.length];
}

export default function Promo() {
  const [promos, setPromos] = useState<CampaignDto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    async function loadPromos() {
      try {
        setIsLoading(true);
        const result = await getActiveCampaigns();
        setPromos(result);
      } catch (error) {
        console.error("Kunde inte hämta aktiva kampanjer:", error);
        setPromos([]);
      } finally {
        setIsLoading(false);
      }
    }

    loadPromos();
  }, []);

  useEffect(() => {
    if (promos.length <= VISIBLE_COUNT) {
      return;
    }

    const interval = window.setInterval(() => {
      setStartIndex((prev) => (prev + VISIBLE_COUNT) % promos.length);
    }, ROTATE_INTERVAL_MS);

    return () => window.clearInterval(interval);
  }, [promos.length]);

  const visiblePromos = useMemo(() => {
    return getVisiblePromos(promos, startIndex, VISIBLE_COUNT);
  }, [promos, startIndex]);

  if (isLoading || visiblePromos.length === 0) {
    return null;
  }

  return (
    <section className="promoSection">
      <p className="favoritesKicker">Schyssta deals</p>

      <div className="promoRowShell">
        <div className="heroPromoRow">
          {visiblePromos.map((promo, index) => (
            <PromoCard
              key={promo.id}
              image={promo.imageUrl || "/images/site/campaigns/pizzaaaa.jpg"}
              alt={promo.altText || promo.title}
              eyebrow={formatDateRange(promo.startDate, promo.endDate)}
              title={promo.title}
              text={promo.body}
              label={getPromoLabel(index)}
              variant={getPromoVariant(index)}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}