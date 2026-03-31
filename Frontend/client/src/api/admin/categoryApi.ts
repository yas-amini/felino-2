import { fetchWithAuth } from "../../api/fetchWithAuth";
import type {
  ApiValidationErrors,
  Category,
  CreateCategoryRequest,
  UpdateCategoryRequest,
} from "../../types/category";
import { ApiError } from "../../types/category";

const CATEGORY_BASE_URL = "/api/categories";

type JsonPatchOperation = {
  op: "replace";
  path: string;
  value: string | null;
};

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
        errors?: ApiValidationErrors;
      }
    | null
    | undefined;

  const message =
    maybeObject?.message ||
    maybeObject?.title ||
    `Request failed with status ${response.status}`;

  throw new ApiError(message, response.status, maybeObject?.errors, data);
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

function buildPatchDocument(
  values: UpdateCategoryRequest
): JsonPatchOperation[] {
  const patch: JsonPatchOperation[] = [];

  if (values.name !== undefined) {
    patch.push({ op: "replace", path: "/name", value: values.name });
  }

  if (values.slug !== undefined) {
    patch.push({ op: "replace", path: "/slug", value: values.slug });
  }

  if (values.description !== undefined) {
    patch.push({
      op: "replace",
      path: "/description",
      value: values.description,
    });
  }

  if (values.imageUrl !== undefined) {
    patch.push({
      op: "replace",
      path: "/imageUrl",
      value: values.imageUrl || null,
    });
  }

  return patch;
}

export async function getCategories(slug?: string): Promise<Category[]> {
  const url = slug
    ? `${CATEGORY_BASE_URL}?slug=${encodeURIComponent(slug)}`
    : CATEGORY_BASE_URL;

  const response = await fetchWithAuth(url, {
    method: "GET",
  });

  return handleResponse<Category[]>(response);
}

export async function getCategoryById(id: number): Promise<Category> {
  const response = await fetchWithAuth(`${CATEGORY_BASE_URL}/${id}`, {
    method: "GET",
  });

  return handleResponse<Category>(response);
}

export async function createCategory(
  payload: CreateCategoryRequest
): Promise<Category> {
  const response = await fetchWithAuth(CATEGORY_BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  return handleResponse<Category>(response);
}

export async function updateCategory(
  id: number,
  payload: UpdateCategoryRequest
): Promise<void> {
  const patchDocument = buildPatchDocument(payload);

  if (patchDocument.length === 0) {
    return;
  }

  const response = await fetchWithAuth(`${CATEGORY_BASE_URL}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json-patch+json",
    },
    body: JSON.stringify(patchDocument),
  });

  return handleResponse<void>(response);
}

export async function deleteCategory(id: number): Promise<void> {
  const response = await fetchWithAuth(`${CATEGORY_BASE_URL}/${id}`, {
    method: "DELETE",
  });

  return handleResponse<void>(response);
}

export async function removeProductFromCategory(
  categoryId: number,
  productId: number
): Promise<void> {
  const response = await fetchWithAuth(
    `${CATEGORY_BASE_URL}/${categoryId}/products/${productId}`,
    {
      method: "DELETE",
    }
  );

  return handleResponse<void>(response);
}