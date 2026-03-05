import type { ReactNode } from "react";
import "./AdminModal.css";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
};

export default function AdminModal({ isOpen, onClose, children, title }: Props) {
  if (!isOpen) return null;

  return (
    <div className="fpAdminModal-overlay" onClick={onClose}>
      <div className="fpAdminModal-content" onClick={(e) => e.stopPropagation()}>
        <div className="fpAdminModal-header">
          {title ? <h2 className="fpAdminModal-title">{title}</h2> : <span />}
          <button className="fpAdminModal-close" onClick={onClose} aria-label="Stäng">
            ✕
          </button>
        </div>

        {children}
      </div>
    </div>
  );
}