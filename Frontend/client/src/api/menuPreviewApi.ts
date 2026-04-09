export type MenuPreviewItemDto = {
  id: number;
  name: string;
  price: number;
};

export type MenuPreviewCategoryDto = {
  title: string;
  items: MenuPreviewItemDto[];
};

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export async function getMenuPreview(
  takePerCategory = 5
): Promise<MenuPreviewCategoryDto[]> {
  const response = await fetch(
    `/api/categories/featured-preview?takePerCategory=${takePerCategory}`,
    {
      method: "GET",
    }
  );

  return handleResponse<MenuPreviewCategoryDto[]>(response);
}