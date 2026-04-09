import AdminModal from "../shared/AdminModal";
import AdminCampaignForm, { type CampaignFormValues } from "./AdminCampaignForm";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: CampaignFormValues) => void | Promise<void>;
  initialValues: CampaignFormValues;
  isSubmitting?: boolean;
};

export default function AdminCampaignEditModal({
  isOpen,
  onClose,
  onSubmit,
  initialValues,
  isSubmitting = false,
}: Props) {
  return (
    <AdminModal
      isOpen={isOpen}
      onClose={onClose}
      title="Redigera kampanj"
      size="lg"
    >
      <AdminCampaignForm
        key={isOpen ? `campaign-edit-${initialValues.title}` : "campaign-edit-closed"}
        onCancel={onClose}
        onSubmit={onSubmit}
        submitLabel="Spara ändringar"
        initialValues={initialValues}
        isSubmitting={isSubmitting}
      />
    </AdminModal>
  );
}