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
};

export default function AdminProductCreateModal({
  isOpen,
  onClose,
  onSubmit,
  categories,
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