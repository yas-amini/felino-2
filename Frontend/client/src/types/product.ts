export type ProductDto = {
  id: number;
  name: string;
  slug: string;
  ingredients: string;
  price: number;
  sauce?: string | null;
  altText?: string | null;
  imageUrl?: string | null;
  categoryId?: number | null;
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

export type UpdateProductDto = {
  name?: string;
  ingredients?: string;
  price?: number;
  sauce?: string | null;
  altText?: string | null;
  imageUrl?: string | null;
  categoryId?: number | null;
};