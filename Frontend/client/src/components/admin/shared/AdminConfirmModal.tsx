import AdminModal from "./AdminModal";
import AdminButton from "./AdminButton";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  confirmVariant?: "danger" | "primary";
};

export default function AdminConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title = "Bekräfta åtgärd",
  message,
  confirmText = "Ja",
  cancelText = "Nej",
  confirmVariant = "danger",
}: Props) {
  return (
    <AdminModal isOpen={isOpen} onClose={onClose} title={title}>
      <p>{message}</p>

      <div style={{ display: "flex", gap: 8, marginTop: 14, flexWrap: "wrap" }}>
        <AdminButton variant="cancel" type="button" onClick={onClose}>
          {cancelText}
        </AdminButton>

        <AdminButton variant={confirmVariant} type="button" onClick={onConfirm}>
          {confirmText}
        </AdminButton>
      </div>
    </AdminModal>
  );
}