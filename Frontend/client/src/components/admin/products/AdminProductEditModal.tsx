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
  return (
    <AdminModal
      isOpen={isOpen}
      onClose={onClose}
      title="Redigera produkt"
      size="lg"
    >
      <AdminProductForm
        submitLabel="Spara ändringar"
        onCancel={onClose}
        onSubmit={onSubmit}
        categories={categories}
        initialValues={{
          category: product?.category ?? "",
          name: product?.name ?? "",
          ingredients: product?.ingredients ?? "",
          price: product?.price ?? "",
          sauce: product?.sauce ?? "",
          altText: product?.altText ?? "",
          image: product?.image ?? "",
        }}
      />
    </AdminModal>
  );
}