export type ProductListItem = {
  id: number;
  name: string;
  slug: string;
  ingredients?: string | null;
  price: number;
  sauce?: string | null;
  altText?: string | null;
  imageUrl?: string | null;
  categoryId?: number | null;
};

export type Category = {
  id: number;
  name: string;
  slug: string;
  description: string;
  imageUrl?: string | null;
  products: ProductListItem[];
};

export type CreateCategoryRequest = {
  name: string;
  slug?: string;
  description: string;
  imageUrl?: string;
};

export type UpdateCategoryRequest = {
  name?: string;
  slug?: string;
  description?: string;
  imageUrl?: string;
};

export type CategoryFormValues = {
  name: string;
  slug: string;
  description: string;
  imageUrl?: string;
};

export type ApiValidationErrors = Record<string, string[]>;

export class ApiError extends Error {
  status: number;
  errors?: ApiValidationErrors;
  data?: unknown;

  constructor(message: string, status: number, errors?: ApiValidationErrors, data?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.errors = errors;
    this.data = data;
  }
}