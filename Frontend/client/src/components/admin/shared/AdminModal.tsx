import type { ReactNode } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import "./AdminModal.css";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
  size?: "sm" | "md" | "lg";
};

export default function AdminModal({
  isOpen,
  onClose,
  children,
  title,
  size = "md",
}: Props) {
  if (!isOpen) return null;

  return (
    <div className="fpAdminModal-overlay" onClick={onClose}>
      <div
        className={`fpAdminModal-content fpAdminModal-content--${size}`}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={title ?? "Modal"}
      >
        <div className="fpAdminModal-header">
          {title ? <h2 className="fpAdminModal-title">{title}</h2> : <span />}

          <button
            type="button"
            className="fpAdminModal-close"
            onClick={onClose}
            aria-label="Stäng"
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>

        <div className="fpAdminModal-body">{children}</div>
      </div>
    </div>
  );
}