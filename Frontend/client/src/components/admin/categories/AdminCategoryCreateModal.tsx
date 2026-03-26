import AdminModal from "../shared/AdminModal";
import AdminCategoryForm from "./AdminCategoryForm";

import type {
  AdminCategoryFormValues,
  ProductItem,
} from "./AdminCategoryForm";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: AdminCategoryFormValues) => void;
  allProducts: ProductItem[];
};

export default function AdminCategoryCreateModal({
  isOpen,
  onClose,
  onSubmit,
  allProducts,
}: Props) {
  return (
    <AdminModal
      isOpen={isOpen}
      onClose={onClose}
      title="Lägg till kategori"
      size="lg"
    >
      <AdminCategoryForm
        submitLabel="Lägg till kategori"
        onCancel={onClose}
        onSubmit={onSubmit}
        allProducts={allProducts}
        initialValues={{
          name: "",
          slug: "",
          description: "",
          imageUrl: "",
          productIds: [],
        }}
      />
    </AdminModal>
  );
}