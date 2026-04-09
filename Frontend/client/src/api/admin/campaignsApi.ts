import { fetchWithAuth } from "../fetchWithAuth";
import type {
  CampaignDto,
  CreateCampaignRequest,
  UpdateCampaignRequest,
} from "../../types/campaign";

type ApiValidationErrors = Record<string, string[]>;

export class CampaignApiError extends Error {
  status: number;
  errors?: ApiValidationErrors;
  data?: unknown;

  constructor(
    message: string,
    status: number,
    errors?: ApiValidationErrors,
    data?: unknown
  ) {
    super(message);
    this.name = "CampaignApiError";
    this.status = status;
    this.errors = errors;
    this.data = data;
  }
}

async function parseErrorResponse(response: Response): Promise<never> {
  let data: unknown = null;

  try {
    data = await response.json();
  } catch {
    data = null;
  }

  const maybeObject = data as
    | {
        title?: string;
        message?: string;
        error?: string;
        errors?: ApiValidationErrors;
      }
    | null
    | undefined;

  const message =
    maybeObject?.message ||
    maybeObject?.error ||
    maybeObject?.title ||
    `Request failed with status ${response.status}`;

  throw new CampaignApiError(message, response.status, maybeObject?.errors, data);
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    await parseErrorResponse(response);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json() as Promise<T>;
}

export async function getCampaigns(): Promise<CampaignDto[]> {
  const response = await fetchWithAuth("/api/campaigns", {
    method: "GET",
  });

  return handleResponse<CampaignDto[]>(response);
}

export async function createCampaign(
  data: CreateCampaignRequest
): Promise<CampaignDto> {
  const response = await fetchWithAuth("/api/campaigns", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return handleResponse<CampaignDto>(response);
}

export async function updateCampaign(
  id: number,
  data: UpdateCampaignRequest
): Promise<void> {
  const response = await fetchWithAuth(`/api/campaigns/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return handleResponse<void>(response);
}

export async function deleteCampaign(id: number): Promise<void> {
  const response = await fetchWithAuth(`/api/campaigns/${id}`, {
    method: "DELETE",
  });

  return handleResponse<void>(response);
}