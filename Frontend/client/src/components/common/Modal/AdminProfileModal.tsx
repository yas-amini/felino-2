import { useState } from "react";
import Modal from "../Modal/Modal";
import AdminButton from "../../admin/shared/AdminButton";
import "./AdminProfileModal.css";

type AdminProfileModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function AdminProfileModal({
  isOpen,
  onClose,
}: AdminProfileModalProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showReset, setShowReset] = useState(false);
  const [resetEmail, setResetEmail] = useState("");

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="default">
      <div className="adminProfileModal">
        <div className="adminProfileModal__header">
          <p className="adminProfileModal__eyebrow">Admin</p>
          <h2>Logga in</h2>
          <p className="adminProfileModal__text">
            Logga in för att komma åt adminsidorna för Felino Pizza.

            (Klicka på Logga in för att komma till Admin-sidorna, inget behöver fyllas i just nu)
          </p>
        </div>

        <form
          className="adminProfileModal__form"
          onSubmit={(e) => e.preventDefault()}
        >
          {/* EMAIL */}
          <div className="adminProfileModal__field">
            <label htmlFor="admin-email">E-post</label>
            <input
              id="admin-email"
              type="email"
              placeholder="namn@felinopizza.se"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* PASSWORD */}
          <div className="adminProfileModal__field">
            <label htmlFor="admin-password">Lösenord</label>
            <input
              id="admin-password"
              type="password"
              placeholder="Skriv ditt lösenord"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              type="button"
              className="adminProfileModal__forgot"
              onClick={() => setShowReset((prev) => !prev)}
            >
              Har du glömt lösenordet?
            </button>
          </div>

          {/* RESET (email istället) */}
          {showReset && (
            <div className="adminProfileModal__resetBox">
              <div className="adminProfileModal__field">
                <label htmlFor="admin-reset-email">
                  Ange din e-postadress
                </label>
                <input
                  id="admin-reset-email"
                  type="email"
                  placeholder="namn@felinopizza.se"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                />
              </div>

              <p className="adminProfileModal__note">
                (Design just nu — senare skickar vi återställningslänk)
              </p>

              <AdminButton size="sm">
                Skicka återställningslänk
              </AdminButton>
            </div>
          )}

          <div className="adminProfileModal__actions">
            <AdminButton variant="ghost" onClick={onClose}>
              Avbryt
            </AdminButton>

            <AdminButton to="/admin/profile" onClick={onClose}>
              Logga in
            </AdminButton>
          </div>
        </form>
      </div>
    </Modal>
  );
}