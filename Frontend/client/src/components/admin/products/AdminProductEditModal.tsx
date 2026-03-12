import { useMemo } from "react";
import AdminModal from "../shared/AdminModal";
import AdminProductForm from "./AdminProductForm";
import type {
  ProductCategoryOption,
  ProductFormValues,
} from "./AdminProductForm";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: ProductFormValues) => void;
  categories: ProductCategoryOption[];
  product?: {
    id?: number;
    category: ProductFormValues["category"];
    name: string;
    ingredients: string;
    price: string;
    sauce: string;
    altText: string;
    image?: string;
  } | null;
};

export default function AdminProductEditModal({
  isOpen,
  onClose,
  onSubmit,
  categories,
  product,
}: Props) {
  const initialValues = useMemo(
    () => ({
      category: product?.category ?? "",
      name: product?.name ?? "",
      ingredients: product?.ingredients ?? "",
      price: product?.price ?? "",
      sauce: product?.sauce ?? "",
      altText: product?.altText ?? "",
      image: product?.image ?? "",
    }),
    [
      product?.category,
      product?.name,
      product?.ingredients,
      product?.price,
      product?.sauce,
      product?.altText,
      product?.image,
    ]
  );

  const formKey = `${isOpen ? "open" : "closed"}-${product?.id ?? "new"}-${
    product?.image ?? "no-image"
  }`;

  return (
    <AdminModal
      isOpen={isOpen}
      onClose={onClose}
      title="Redigera produkt"
      size="lg"
    >
      <AdminProductForm
        key={formKey}
        submitLabel="Spara ändringar"
        onCancel={onClose}
        onSubmit={onSubmit}
        categories={categories}
        initialValues={initialValues}
      />
    </AdminModal>
  );
}