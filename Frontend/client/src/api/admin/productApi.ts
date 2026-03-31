import { fetchWithAuth } from "../fetchWithAuth";
import type {
  CreateProductDto,
  ProductDto,
  UpdateProductDto,
} from "../../types/product";

type ApiValidationErrors = Record<string, string[]>;

export class ProductApiError extends Error {
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
    this.name = "ProductApiError";
    this.status = status;
    this.errors = errors;
    this.data = data;
  }
}

type JsonPatchOperation = {
  op: "replace";
  path: string;
  value: string | number | null;
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

  throw new ProductApiError(message, response.status, maybeObject?.errors, data);
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

function buildPatchDocument(values: UpdateProductDto): JsonPatchOperation[] {
  const patch: JsonPatchOperation[] = [];

  if (values.name !== undefined) {
    patch.push({ op: "replace", path: "/name", value: values.name });
  }

  if (values.ingredients !== undefined) {
    patch.push({
      op: "replace",
      path: "/ingredients",
      value: values.ingredients,
    });
  }

  if (values.price !== undefined) {
    patch.push({ op: "replace", path: "/price", value: values.price });
  }

  if (values.sauce !== undefined) {
    patch.push({
      op: "replace",
      path: "/sauce",
      value: values.sauce || null,
    });
  }

  if (values.altText !== undefined) {
    patch.push({
      op: "replace",
      path: "/altText",
      value: values.altText || null,
    });
  }

  if (values.imageUrl !== undefined) {
    patch.push({
      op: "replace",
      path: "/imageUrl",
      value: values.imageUrl || null,
    });
  }

  if (values.categoryId !== undefined) {
    patch.push({
      op: "replace",
      path: "/categoryId",
      value: values.categoryId,
    });
  }

  return patch;
}

export async function getProducts(
  page = 1,
  pageSize = 200
): Promise<ProductDto[]> {
  const response = await fetchWithAuth(
    `/api/products?page=${page}&pageSize=${pageSize}`,
    {
      method: "GET",
    }
  );

  return handleResponse<ProductDto[]>(response);
}

export async function getProductById(id: number): Promise<ProductDto> {
  const response = await fetchWithAuth(`/api/products/${id}`, {
    method: "GET",
  });

  return handleResponse<ProductDto>(response);
}

export async function getProductBySlug(slug: string): Promise<ProductDto[]> {
  const response = await fetchWithAuth(
    `/api/products?slug=${encodeURIComponent(slug)}`,
    {
      method: "GET",
    }
  );

  return handleResponse<ProductDto[]>(response);
}

export async function createProduct(
  data: CreateProductDto
): Promise<ProductDto> {
  const response = await fetchWithAuth("/api/products", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return handleResponse<ProductDto>(response);
}

export async function updateProduct(
  id: number,
  data: UpdateProductDto
): Promise<ProductDto> {
  const patchDocument = buildPatchDocument(data);

  if (patchDocument.length === 0) {
    throw new Error("Inga ändringar att spara.");
  }

  const response = await fetchWithAuth(`/api/products/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json-patch+json",
    },
    body: JSON.stringify(patchDocument),
  });

  return handleResponse<ProductDto>(response);
}

export async function deleteProduct(id: number): Promise<void> {
  const response = await fetchWithAuth(`/api/products/${id}`, {
    method: "DELETE",
  });

  return handleResponse<void>(response);
}