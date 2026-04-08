import type { FeaturedProductDto } from "../../src/types/product";

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export async function getFeaturedProducts(
  take = 6
): Promise<FeaturedProductDto[]> {
  const response = await fetch(`/api/products/featured?take=${take}`, {
    method: "GET",
  });

  return handleResponse<FeaturedProductDto[]>(response);
}