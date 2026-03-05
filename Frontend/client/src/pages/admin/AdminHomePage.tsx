import { useState } from "react";
import AdminPage from "../../components/admin/AdminPage";
import AdminButton from "../../components/admin/AdminButton";
import AdminModal from "../../components/admin/AdminModal";

export default function AdminHomePage() {
  const [open, setOpen] = useState(false);

  return (
    <AdminPage title="Admin – Översikt">
      <p>Det här är en test-sida för att se knappar och modal.</p>

      <AdminButton onClick={() => setOpen(true)}>Öppna modal</AdminButton>

      <AdminModal isOpen={open} onClose={() => setOpen(false)} title="Hej!">
        <p>Det här är en admin-modal.</p>

        <div style={{ marginTop: 12 }}>
          <AdminButton variant="ghost" onClick={() => setOpen(false)}>
            Stäng
          </AdminButton>
        </div>
      </AdminModal>
    </AdminPage>
  );
}