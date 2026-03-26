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
  category?: {
    id: number;
    name: string;
    slug: string;
    description: string;
    imageUrl?: string;
    productIds: number[];
  } | null;
};

export default function AdminCategoryEditModal({
  isOpen,
  onClose,
  onSubmit,
  allProducts,
  category,
}: Props) {
  return (
    <AdminModal
      isOpen={isOpen}
      onClose={onClose}
      title="Redigera kategori"
      size="lg"
    >
      <AdminCategoryForm
        submitLabel="Spara ändringar"
        onCancel={onClose}
        onSubmit={onSubmit}
        allProducts={allProducts}
        initialValues={{
          name: category?.name ?? "",
          slug: category?.slug ?? "",
          description: category?.description ?? "",
          imageUrl: category?.imageUrl ?? "",
          productIds: category?.productIds ?? [],
        }}
      />
    </AdminModal>
  );
}