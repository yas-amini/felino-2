import type { CampaignDto } from "../types/campaign";

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export async function getActiveCampaigns(): Promise<CampaignDto[]> {
  const response = await fetch("/api/campaigns/active", {
    method: "GET",
  });

  return handleResponse<CampaignDto[]>(response);
}