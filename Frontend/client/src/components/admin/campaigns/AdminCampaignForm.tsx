import { useRef, useState } from "react";
import AdminButton from "../shared/AdminButton";
import "./AdminCampaignForm.css";

export type CampaignFormValues = {
  title: string;
  body: string;
  image: string;
  altText: string;
  startDate: string;
  endDate: string;
};

type Props = {
  initialValues: CampaignFormValues;
  onSubmit: (values: CampaignFormValues) => void;
  onCancel: () => void;
  submitLabel: string;
};

export default function AdminCampaignForm({
  initialValues,
  onSubmit,
  onCancel,
  submitLabel,
}: Props) {
  const [values, setValues] = useState<CampaignFormValues>(initialValues);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  function handleChange<K extends keyof CampaignFormValues>(
    field: K,
    value: CampaignFormValues[K]
  ) {
    setValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  function handleImageChange(file: File | null) {
    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      setValues((prev) => ({
        ...prev,
        image: reader.result as string,
        altText: prev.altText || file.name,
      }));
    };

    reader.readAsDataURL(file);
  }

  function handleRemoveImage() {
    setValues((prev) => ({
      ...prev,
      image: "",
      altText: "",
    }));

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onSubmit(values);
  }

  return (
    <form className="adminCampaignForm" onSubmit={handleSubmit}>
      <div className="adminCampaignForm__grid">
        <div className="adminCampaignForm__main">
          <div className="adminCampaignForm__field">
            <label htmlFor="campaign-title">Rubrik</label>
            <input
              id="campaign-title"
              type="text"
              value={values.title}
              onChange={(e) => handleChange("title", e.target.value)}
              placeholder="Ex. 2 för 1 på valfria pizzor"
            />
          </div>

          <div className="adminCampaignForm__field">
            <label htmlFor="campaign-body">Brödtext</label>
            <textarea
              id="campaign-body"
              rows={6}
              value={values.body}
              onChange={(e) => handleChange("body", e.target.value)}
              placeholder="Beskriv kampanjen här..."
            />
          </div>

          <div className="adminCampaignForm__row">
            <div className="adminCampaignForm__field">
              <label htmlFor="campaign-start">Startdatum</label>
              <input
                id="campaign-start"
                type="datetime-local"
                value={values.startDate}
                onChange={(e) => handleChange("startDate", e.target.value)}
              />
            </div>

            <div className="adminCampaignForm__field">
              <label htmlFor="campaign-end">Slutdatum</label>
              <input
                id="campaign-end"
                type="datetime-local"
                value={values.endDate}
                onChange={(e) => handleChange("endDate", e.target.value)}
              />
            </div>
          </div>
        </div>

        <aside className="adminCampaignForm__side">
          <div className="adminCampaignForm__uploadBox">
            <p className="adminCampaignForm__uploadTitle">Kampanjbild</p>

            <div className="adminCampaignForm__imagePreview">
              {values.image ? (
                <img src={values.image} alt={values.altText || values.title} />
              ) : (
                <span>Ingen bild vald</span>
              )}
            </div>

            <input
              ref={fileInputRef}
              id="campaign-image-upload"
              type="file"
              accept="image/*"
              hidden
              onChange={(e) => handleImageChange(e.target.files?.[0] ?? null)}
            />

            <div className="adminCampaignForm__uploadActions">
              <AdminButton
                type="button"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
              >
                Välj bild
              </AdminButton>

              {values.image && (
                <AdminButton
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={handleRemoveImage}
                >
                  Ta bort
                </AdminButton>
              )}
            </div>

            <div className="adminCampaignForm__field">
              <label htmlFor="campaign-alt">Alt-text</label>
              <input
                id="campaign-alt"
                type="text"
                value={values.altText}
                onChange={(e) => handleChange("altText", e.target.value)}
                placeholder="Beskriv bilden"
              />
            </div>
          </div>
        </aside>
      </div>

      <div className="adminCampaignForm__actions">
        <AdminButton variant="ghost" type="button" onClick={onCancel}>
          Avbryt
        </AdminButton>

        <AdminButton type="submit">{submitLabel}</AdminButton>
      </div>
    </form>
  );
}