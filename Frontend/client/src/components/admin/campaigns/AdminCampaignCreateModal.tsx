import { useMemo } from "react";
import AdminModal from "../shared/AdminModal";
import AdminCampaignForm, {
  type CampaignFormValues,
} from "../campaigns/AdminCampaignForm";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: CampaignFormValues) => void | Promise<void>;
  isSubmitting?: boolean;
};

export default function AdminCampaignCreateModal({
  isOpen,
  onClose,
  onSubmit,
  isSubmitting = false,
}: Props) {
  const initialValues = useMemo(
    () => ({
      title: "",
      body: "",
      imageUrl: "",
      altText: "",
      startDate: "",
      endDate: "",
    }),
    []
  );

  return (
    <AdminModal
      isOpen={isOpen}
      onClose={onClose}
      title="Skapa kampanj"
      size="lg"
    >
      <AdminCampaignForm
        onCancel={onClose}
        onSubmit={onSubmit}
        submitLabel="Lägg till kampanj"
        isSubmitting={isSubmitting}
        initialValues={initialValues}
      />
    </AdminModal>
  );
}