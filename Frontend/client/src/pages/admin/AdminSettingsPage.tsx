import { useState } from "react";
import AdminPage from "../../components/admin/AdminPage";
import AdminButton from "../../components/admin/AdminButton";
import AdminModal from "../../components/admin/AdminModal";

export default function AdminSettingsPage() {
  const [open, setOpen] = useState(false);

  return (
    <AdminPage title="Inställningar">
      <section className="admin-settings">
        <p>Här får vi väl lägga in kategori-hallojet sen!</p>

        <section className="admin-section">
          <h2>Formulärknappar</h2>
          <p>Används i formulär och modaler.</p>

          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 10 }}>
            <AdminButton preset="save" />
            <AdminButton variant="ghost" type="button">
              Välj bild
            </AdminButton>
            <AdminButton variant="cancel" type="button">
              Avbryt
            </AdminButton>
          </div>

          <pre>{`<AdminButton preset="save" />
<AdminButton variant="ghost" type="button">
  Välj bild
</AdminButton>
<AdminButton variant="cancel" type="button">
  Avbryt
</AdminButton>`}</pre>
        </section>

        <section className="admin-section">
          <h2>Listknappar</h2>
          <p>Används i tabeller och listor.</p>

          <div style={{ display: "flex", gap: 12, alignItems: "center", marginTop: 10 }}>
            <AdminButton preset="edit" aria-label="Redigera" title="Redigera" />
            <AdminButton preset="delete" aria-label="Ta bort" title="Ta bort" />
            <AdminButton preset="icon-save" aria-label="Spara" title="Spara" />
          </div>

          <pre>{`<AdminButton
  preset="edit"
  aria-label="Redigera"
  title="Redigera"
/>

<AdminButton
  preset="delete"
  aria-label="Ta bort"
  title="Ta bort"
/>`}</pre>
        </section>

        <section className="admin-section">
          <h2>Modal</h2>
          <p>Vanlig admin-modal med Avbryt och Spara.</p>

          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 10 }}>
            <AdminButton type="button" onClick={() => setOpen(true)}>
              Öppna modal
            </AdminButton>
          </div>

          <AdminModal isOpen={open} onClose={() => setOpen(false)} title="Redigera produkt">
            <p>Här kan du lägga formulär, text eller bekräftelse.</p>

            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 14 }}>
              <AdminButton variant="cancel" type="button" onClick={() => setOpen(false)}>
                Avbryt
              </AdminButton>

              <AdminButton preset="save" type="button" onClick={() => setOpen(false)} />
            </div>
          </AdminModal>

          <pre>{`const [open, setOpen] = useState(false);

<AdminButton type="button" onClick={() => setOpen(true)}>
  Öppna modal
</AdminButton>

<AdminModal
  isOpen={open}
  onClose={() => setOpen(false)}
  title="Redigera produkt"
>
  <p>Här kan du lägga formulär, text eller bekräftelse.</p>

  <div style={{ display: "flex", gap: 8, marginTop: 14 }}>
    <AdminButton
      variant="cancel"
      type="button"
      onClick={() => setOpen(false)}
    >
      Avbryt
    </AdminButton>

    <AdminButton
      preset="save"
      type="button"
      onClick={() => setOpen(false)}
    />
  </div>
</AdminModal>`}</pre>
        </section>

        <section className="admin-section">
          <h2>Standardlayout i formulär</h2>
          <p>Vanlig ordning i admin.</p>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: 10,
              marginTop: 10,
            }}
          >
            <AdminButton variant="ghost" type="button">
              Välj bild
            </AdminButton>

            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <AdminButton preset="save" />
              <AdminButton variant="cancel" type="button">
                Avbryt
              </AdminButton>
            </div>
          </div>

          <pre>{`<AdminButton variant="ghost" type="button">
  Välj bild
</AdminButton>

<div style={{ display: "flex", gap: 8 }}>
  <AdminButton preset="save" />
  <AdminButton variant="cancel" type="button">
    Avbryt
  </AdminButton>
</div>`}</pre>
        </section>
      </section>
    </AdminPage>
  );
}