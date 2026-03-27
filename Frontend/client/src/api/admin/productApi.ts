import type { CreateProductDto, ProductDto } from "../../types/admin";

export async function getProducts(
  page = 1,
  pageSize = 200
): Promise<ProductDto[]> {
  const response = await fetch(
    `/api/products?page=${page}&pageSize=${pageSize}`
  );

  if (!response.ok) {
    throw new Error("Kunde inte hämta produkter.");
  }

  return response.json();
}

export async function getProductById(id: number): Promise<ProductDto> {
  const response = await fetch(`/api/products/${id}`);

  if (!response.ok) {
    throw new Error("Kunde inte hämta produkt.");
  }

  return response.json();
}

export async function getProductBySlug(slug: string): Promise<ProductDto[]> {
  const response = await fetch(
    `/api/products?slug=${encodeURIComponent(slug)}`
  );

  if (!response.ok) {
    throw new Error("Kunde inte hämta produkt via slug.");
  }

  return response.json();
}

export async function createProduct(
  data: CreateProductDto
): Promise<ProductDto> {
  const response = await fetch("/api/products", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Kunde inte skapa produkt.");
  }

  return response.json();
}

export async function deleteProduct(id: number): Promise<void> {
  const response = await fetch(`/api/products/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Kunde inte ta bort produkt.");
  }
}