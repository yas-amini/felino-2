import type { Campaign, CampaignDto } from "../types/campaign";

export function getCampaignStatus(
  startDate: string,
  endDate: string
): Campaign["status"] {
  const now = new Date();
  const start = new Date(startDate);
  const end = new Date(endDate);

  if (end < now) return "expired";
  if (start > now) return "upcoming";
  return "active";
}

export function mapCampaignFromApi(dto: CampaignDto): Campaign {
  return {
    id: dto.id,
    title: dto.title,
    body: dto.body,
    image: dto.imageUrl ?? undefined,
    altText: dto.altText ?? "",
    startDate: dto.startDate,
    endDate: dto.endDate,
    status: getCampaignStatus(dto.startDate, dto.endDate),
  };
}