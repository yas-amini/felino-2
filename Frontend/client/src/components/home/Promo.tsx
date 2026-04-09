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

function formatDateBadge(startDate: string, endDate: string) {
  return `${formatShortDate(startDate)} – ${formatShortDate(endDate)}`;
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
      <div className="sectionCornerLabel promoSectionLabel">Schyssta deals</div>

      <div className="heroPromoRow">
        {visiblePromos.map((promo) => (
          <PromoCard
            key={promo.id}
            image={promo.imageUrl || "/images/site/campaigns/pizzaaaa.jpg"}
            alt={promo.altText || promo.title}
            title={promo.title}
            text={promo.body}
            dateBadge={formatDateBadge(promo.startDate, promo.endDate)}
          />
        ))}
      </div>
    </section>
  );
}