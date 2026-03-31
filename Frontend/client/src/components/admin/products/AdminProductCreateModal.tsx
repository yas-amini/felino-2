import AdminModal from "../shared/AdminModal";
import AdminProductForm from "./AdminProductForm";
import type {
  ProductCategoryOption,
  ProductFormValues,
} from "./AdminProductForm";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: ProductFormValues) => void | Promise<void>;
  categories: ProductCategoryOption[];
  isSubmitting?: boolean;
};

export default function AdminProductCreateModal({
  isOpen,
  onClose,
  onSubmit,
  categories,
  isSubmitting = false,
}: Props) {
  return (
    <AdminModal
      isOpen={isOpen}
      onClose={onClose}
      title="Lägg till produkt"
      size="lg"
    >
      <AdminProductForm
        key={isOpen ? "create-open" : "create-closed"}
        submitLabel="Lägg till produkt"
        onCancel={onClose}
        onSubmit={onSubmit}
        categories={categories}
        isSubmitting={isSubmitting}
        initialValues={{
          categoryId: "",
          name: "",
          ingredients: "",
          price: "",
          sauce: "",
          altText: "",
          imageUrl: "",
        }}
      />
    </AdminModal>
  );
}