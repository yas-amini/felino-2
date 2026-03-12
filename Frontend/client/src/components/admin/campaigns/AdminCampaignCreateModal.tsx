import AdminModal from "../shared/AdminModal";
import AdminCampaignForm, { type CampaignFormValues } from "../campaigns/AdminCampaignForm";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: CampaignFormValues) => void;
};

export default function AdminCampaignCreateModal({
  isOpen,
  onClose,
  onSubmit,
}: Props) {
  return (
    <AdminModal
      isOpen={isOpen}
      onClose={onClose}
      title="Skapa kampanj"
      size="lg"
    >
      <AdminCampaignForm
        key={isOpen ? "campaign-create-open" : "campaign-create-closed"}
        onCancel={onClose}
        onSubmit={onSubmit}
        submitLabel="Lägg till kampanj"
        initialValues={{
          title: "",
          body: "",
          image: "",
          altText: "",
          startDate: "",
          endDate: "",
        }}
      />
    </AdminModal>
  );
}