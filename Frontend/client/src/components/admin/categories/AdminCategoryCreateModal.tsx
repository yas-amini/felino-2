import AdminModal from "../shared/AdminModal";
import AdminCategoryForm from "./AdminCategoryForm";
import type { AdminCategoryFormValues } from "./AdminCategoryForm";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: AdminCategoryFormValues) => void | Promise<void>;
  isSubmitting?: boolean;
};

export default function AdminCategoryCreateModal({
  isOpen,
  onClose,
  onSubmit,
  isSubmitting = false,
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
        isSubmitting={isSubmitting}
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