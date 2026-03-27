export type CategoryProductListItemDto = {
  id: number;
  name: string;
  slug: string;
  ingredients: string;
  price: number;
  sauce?: string | null;
  altText?: string | null;
  imageUrl?: string | null;
  categoryId: number;
};

export type CategoryDto = {
  id: number;
  name: string;
  slug: string;
  description: string;
  imageUrl?: string | null;
  products: CategoryProductListItemDto[];
};

export type CreateCategoryDto = {
  name: string;
  slug: string;
  description: string;
  imageUrl?: string;
};

export type ProductDto = {
  id: number;
  name: string;
  slug: string;
  ingredients: string;
  price: number;
  sauce?: string | null;
  altText?: string | null;
  imageUrl?: string | null;
  categoryId: number;
};

export type CreateProductDto = {
  name: string;
  ingredients: string;
  price: number;
  sauce?: string | null;
  altText?: string | null;
  imageUrl?: string | null;
  categoryId: number;
};