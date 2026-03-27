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
    categoryId: ProductFormValues["categoryId"];
    name: string;
    ingredients: string;
    price: string;
    sauce: string;
    altText: string;
    imageUrl?: string;
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
      categoryId: product?.categoryId ?? "",
      name: product?.name ?? "",
      ingredients: product?.ingredients ?? "",
      price: product?.price ?? "",
      sauce: product?.sauce ?? "",
      altText: product?.altText ?? "",
      imageUrl: product?.imageUrl ?? "",
    }),
    [
      product?.categoryId,
      product?.name,
      product?.ingredients,
      product?.price,
      product?.sauce,
      product?.altText,
      product?.imageUrl,
    ]
  );

  const formKey = `${isOpen ? "open" : "closed"}-${product?.id ?? "new"}-${
    product?.imageUrl ?? "no-image"
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