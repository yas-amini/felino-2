/**
 * =========================================================
 * HUR DU ANVÄNDER MODAL
 * =========================================================
 *
 * IMPORTERA:
 * import { Modal, Button } from "@/components";
 *
 * EXEMPEL:
 *
 * const [open, setOpen] = useState(false);
 *
 * <Button onClick={() => setOpen(true)}>Öppna</Button>
 *
 * <Modal isOpen={open} onClose={() => setOpen(false)}>
 *   <h2>Hej!</h2>
 *   <Button onClick={() => setOpen(false)}>Stäng</Button>
 * </Modal>
 *
 *
 *  RULE:
 *
 *  lägg inte innehåll i Modal.tsx
 *  skicka in innehåll via children
 *
 * =========================================================
 */
import React from "react";
import "./Modal.css";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fpModal-overlay" onClick={onClose}>
      <div
        className="fpModal-content"
        onClick={(e) => e.stopPropagation()} 
      >
        <button className="fpModal-close" onClick={onClose}>
          ✕
        </button>

        {children}
      </div>
    </div>
  );
}