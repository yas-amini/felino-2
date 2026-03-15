// Modal wrapper used across the admin UI
import AdminModal from "../shared/AdminModal";

// Form used for creating/editing categories
import AdminCategoryForm from "./AdminCategoryForm";

// Types used by the form
import type {
  AdminCategoryFormValues, // shape of the form data when submitted
  ProductItem, // product option used when linking products to a category
} from "./AdminCategoryForm";

/**
  Props for AdminCategoryCreateModal
 */
type Props = {
  isOpen: boolean; // controls if the modal is visible
  onClose: () => void; // called when the modal should close
  onSubmit: (values: AdminCategoryFormValues) => void; // handles form submission
  allProducts: ProductItem[]; // list of all products available to attach
};

/**
 Modal used to create a new category in the admin panel.
 
 Responsibilities:
 - Render a modal container
 - Render the category form inside it
 - Provide default (empty) form values
 */
export default function AdminCategoryCreateModal({
  isOpen,
  onClose,
  onSubmit,
  allProducts,
}: Props) {
  return (
    <AdminModal
      // Controls modal visibility
      isOpen={isOpen}
      // Triggered when user closes the modal
      onClose={onClose}
      // Modal title (Swedish: "Add category")
      title="Lägg till kategori"
      // Larger modal layout (used for forms with more fields)
      size="lg"
    >
      <AdminCategoryForm
        // Text shown on the submit button
        submitLabel="Lägg till kategori"
        // Cancel button closes the modal
        onCancel={onClose}
        // Pass submit handler up to parent component
        onSubmit={onSubmit}
        // Products available to attach to this category
        allProducts={allProducts}
        // Default values for a new category
        initialValues={{
          name: "", // category display name
          slug: "", // URL friendly name
          description: "", // optional description text
          image: "", // image URL or path
          productIds: [], // products linked to this category
        }}
      />
    </AdminModal>
  );
}
