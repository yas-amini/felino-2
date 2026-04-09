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

export type FeaturedProductDto = {
  id: number;
  name: string;
  slug: string;
  ingredients: string;
  price: number;
  sauce?: string | null;
  altText?: string | null;
  imageUrl?: string | null;
  categoryId?: number | null;
  totalSold: number;
  isFallback: boolean;
};

export type ProductModalData = {
  id: number;
  name: string;
  image: string;
  category: string;
  ingredients?: string[];
  sides?: string[];
  sauce?: string;
  price: number;
};