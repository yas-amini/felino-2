import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../Modal/Modal";
import AdminButton from "../../admin/shared/AdminButton";
import { loginAdmin } from "../../../api/authApi";
import { saveToken } from "../../../utils/authStorage";
import "./AdminProfileModal.css";

type AdminProfileModalProps = {
  isOpen: boolean;
  onClose: () => void;
  redirectTo?: string;
};

export default function AdminProfileModal({
  isOpen,
  onClose,
  redirectTo = "/admin",
}: AdminProfileModalProps) {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showReset, setShowReset] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setErrorMessage("");
    setIsLoading(true);

    try {
      const result = await loginAdmin({
        username,
        password,
      });

      const token =
        (result as any).access_token ?? (result as any).accessToken;

      if (!token) {
        throw new Error("Ingen token mottogs från servern");
      }

      console.log("TOKEN:", token);

      saveToken(token);

      onClose();
      navigate(redirectTo, { replace: true });
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("Något gick fel vid inloggning.");
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="default">
      <div className="adminProfileModal">
        <div className="adminProfileModal__header">
          <p className="adminProfileModal__eyebrow">Admin</p>
          <h2>Logga in</h2>
          <p className="adminProfileModal__text">
            Logga in för att komma åt adminsidorna för Felino Pizza.
          </p>
        </div>

        <form className="adminProfileModal__form" onSubmit={handleSubmit}>
          <div className="adminProfileModal__field">
            <label htmlFor="admin-username">Användarnamn</label>
            <input
              id="admin-username"
              type="text"
              placeholder="Ange användarnamn"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
            />
          </div>

          <div className="adminProfileModal__field">
            <label htmlFor="admin-password">Lösenord</label>
            <input
              id="admin-password"
              type="password"
              placeholder="Skriv ditt lösenord"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />

            <button
              type="button"
              className="adminProfileModal__forgot"
              onClick={() => setShowReset((prev) => !prev)}
            >
              Har du glömt lösenordet?
            </button>
          </div>

          {errorMessage && (
            <p className="adminProfileModal__error">{errorMessage}</p>
          )}

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
                Design just nu — senare skickar vi återställningslänk.
              </p>

              <AdminButton size="sm" type="button">
                Skicka återställningslänk
              </AdminButton>
            </div>
          )}

          <div className="adminProfileModal__actions">
            <AdminButton variant="ghost" onClick={onClose} type="button">
              Avbryt
            </AdminButton>

            <AdminButton type="submit" disabled={isLoading}>
              {isLoading ? "Loggar in..." : "Logga in"}
            </AdminButton>
          </div>
        </form>
      </div>
    </Modal>
  );
}