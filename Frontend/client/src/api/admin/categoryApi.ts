import type { CategoryDto, CreateCategoryDto } from "../../types/admin";

export async function getCategories(): Promise<CategoryDto[]> {
  const response = await fetch("/api/categories");

  if (!response.ok) {
    throw new Error("Kunde inte hämta kategorier.");
  }

  return response.json();
}

export async function getCategoryById(id: number): Promise<CategoryDto> {
  const response = await fetch(`/api/categories/${id}`);

  if (!response.ok) {
    throw new Error("Kunde inte hämta kategori.");
  }

  return response.json();
}

export async function getCategoryBySlug(slug: string): Promise<CategoryDto[]> {
  const response = await fetch(
    `/api/categories?slug=${encodeURIComponent(slug)}`
  );

  if (!response.ok) {
    throw new Error("Kunde inte hämta kategori via slug.");
  }

  return response.json();
}

export async function createCategory(
  data: CreateCategoryDto
): Promise<CategoryDto> {
  const response = await fetch("/api/categories", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Kunde inte skapa kategori.");
  }

  return response.json();
}

export async function deleteCategory(id: number): Promise<void> {
  const response = await fetch(`/api/categories/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Kunde inte ta bort kategori.");
  }
}