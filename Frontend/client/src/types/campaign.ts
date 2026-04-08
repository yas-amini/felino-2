export type CampaignDto = {
  id: number;
  title: string;
  body: string;
  imageUrl?: string | null;
  altText?: string | null;
  startDate: string;
  endDate: string;
};

export type Campaign = {
  id: number;
  title: string;
  body: string;
  image?: string;
  altText?: string;
  startDate: string;
  endDate: string;
  status: "active" | "upcoming" | "expired";
};

export type CreateCampaignRequest = {
  title: string;
  body: string;
  imageUrl?: string | null;
  altText?: string | null;
  startDate: string;
  endDate: string;
};

export type UpdateCampaignRequest = CreateCampaignRequest;