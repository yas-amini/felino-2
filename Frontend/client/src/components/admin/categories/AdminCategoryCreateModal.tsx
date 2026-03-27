import AdminModal from "../shared/AdminModal";
import AdminCategoryForm from "./AdminCategoryForm";
import type { AdminCategoryFormValues } from "./AdminCategoryForm";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: AdminCategoryFormValues) => void;
};

export default function AdminCategoryCreateModal({
  isOpen,
  onClose,
  onSubmit,
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
        initialValues={{
          name: "",
          slug: "",
          description: "",
          imageUrl: "",
        }}
      />
    </AdminModal>
  );
}