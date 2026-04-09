import { useEffect, useRef, useState } from "react";
import AdminButton from "../shared/AdminButton";
import { uploadImage } from "../../../api/uploadApi";
import "./AdminCampaignForm.css";

export type CampaignFormValues = {
  title: string;
  body: string;
  imageUrl: string;
  altText: string;
  startDate: string;
  endDate: string;
};

type Props = {
  initialValues: CampaignFormValues;
  onSubmit: (values: CampaignFormValues) => void | Promise<void>;
  onCancel: () => void;
  submitLabel: string;
  isSubmitting?: boolean;
};

const TITLE_MAX_LENGTH = 100;
const BODY_MAX_LENGTH = 200;
const ALT_TEXT_MAX_LENGTH = 200;
const IMAGE_URL_MAX_LENGTH = 300;

export default function AdminCampaignForm({
  initialValues,
  onSubmit,
  onCancel,
  submitLabel,
  isSubmitting = false,
}: Props) {
  const [values, setValues] = useState<CampaignFormValues>(initialValues);
  const [errorMessage, setErrorMessage] = useState("");
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setValues(initialValues);
    setErrorMessage("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, [
    initialValues.title,
    initialValues.body,
    initialValues.imageUrl,
    initialValues.altText,
    initialValues.startDate,
    initialValues.endDate,
  ]);

  function handleChange<K extends keyof CampaignFormValues>(
    field: K,
    value: CampaignFormValues[K]
  ) {
    setValues((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (errorMessage) {
      setErrorMessage("");
    }
  }

  function handlePickImage() {
    if (!fileInputRef.current) return;

    fileInputRef.current.value = "";
    fileInputRef.current.click();
  }

  async function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploadingImage(true);
      setErrorMessage("");

      const result = await uploadImage(file);

      if (result.url.length > IMAGE_URL_MAX_LENGTH) {
        setErrorMessage(
          `Bild-URL får max vara ${IMAGE_URL_MAX_LENGTH} tecken.`
        );
        return;
      }

      setValues((prev) => ({
        ...prev,
        imageUrl: result.url,
        altText: prev.altText || file.name,
      }));
    } catch (error) {
      console.error("Kunde inte ladda upp vald kampanjbild:", error);
      setErrorMessage(
        error instanceof Error ? error.message : "Kunde inte ladda upp bilden."
      );
    } finally {
      setIsUploadingImage(false);
    }
  }

  function removeImage() {
    setValues((prev) => ({
      ...prev,
      imageUrl: "",
    }));

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    if (errorMessage) {
      setErrorMessage("");
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (isUploadingImage) {
      setErrorMessage("Vänta tills bilden har laddats upp klart.");
      return;
    }

    const nextValues: CampaignFormValues = {
      title: values.title.trim(),
      body: values.body.trim(),
      imageUrl: values.imageUrl.trim(),
      altText: values.altText.trim(),
      startDate: values.startDate,
      endDate: values.endDate,
    };

    if (!nextValues.title) {
      setErrorMessage("Rubrik är obligatorisk.");
      return;
    }

    if (nextValues.title.length > TITLE_MAX_LENGTH) {
      setErrorMessage(`Rubrik får max vara ${TITLE_MAX_LENGTH} tecken.`);
      return;
    }

    if (!nextValues.body) {
      setErrorMessage("Brödtext är obligatorisk.");
      return;
    }

    if (nextValues.body.length > BODY_MAX_LENGTH) {
      setErrorMessage(`Brödtext får max vara ${BODY_MAX_LENGTH} tecken.`);
      return;
    }

    if (nextValues.altText.length > ALT_TEXT_MAX_LENGTH) {
      setErrorMessage(`Alt-text får max vara ${ALT_TEXT_MAX_LENGTH} tecken.`);
      return;
    }

    if (nextValues.imageUrl.length > IMAGE_URL_MAX_LENGTH) {
      setErrorMessage(`Bild-URL får max vara ${IMAGE_URL_MAX_LENGTH} tecken.`);
      return;
    }

    if (!nextValues.startDate) {
      setErrorMessage("Startdatum är obligatoriskt.");
      return;
    }

    if (!nextValues.endDate) {
      setErrorMessage("Slutdatum är obligatoriskt.");
      return;
    }

    const start = new Date(nextValues.startDate);
    const end = new Date(nextValues.endDate);

    if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
      setErrorMessage("Ange giltiga datum.");
      return;
    }

    if (end < start) {
      setErrorMessage("Slutdatum kan inte vara tidigare än startdatum.");
      return;
    }

    setErrorMessage("");
    await onSubmit(nextValues);
  }

  return (
    <form className="adminCampaignForm" noValidate onSubmit={handleSubmit}>
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
              maxLength={TITLE_MAX_LENGTH}
              disabled={isSubmitting || isUploadingImage}
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
              maxLength={BODY_MAX_LENGTH}
              disabled={isSubmitting || isUploadingImage}
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
                disabled={isSubmitting || isUploadingImage}
              />
            </div>

            <div className="adminCampaignForm__field">
              <label htmlFor="campaign-end">Slutdatum</label>
              <input
                id="campaign-end"
                type="datetime-local"
                value={values.endDate}
                onChange={(e) => handleChange("endDate", e.target.value)}
                disabled={isSubmitting || isUploadingImage}
              />
            </div>
          </div>
        </div>

        <aside className="adminCampaignForm__side">
          <div className="adminCampaignForm__uploadBox">
            <p className="adminCampaignForm__uploadTitle">Kampanjbild</p>

            <input
              ref={fileInputRef}
              id="campaign-image-upload"
              className="sr-only-file"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />

            <div className="adminCampaignForm__imagePreview">
              {values.imageUrl ? (
                <img
                  src={values.imageUrl}
                  alt={values.altText || values.title}
                />
              ) : (
                <span>Ingen bild vald</span>
              )}
            </div>

            <div className="adminCampaignForm__uploadActions">
              <AdminButton
                type="button"
                size="sm"
                onClick={handlePickImage}
                disabled={isSubmitting || isUploadingImage}
              >
                {isUploadingImage
                  ? "Laddar upp..."
                  : values.imageUrl
                  ? "Byt bild"
                  : "Välj bild"}
              </AdminButton>

              {values.imageUrl && (
                <AdminButton
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={removeImage}
                  disabled={isSubmitting || isUploadingImage}
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
                maxLength={ALT_TEXT_MAX_LENGTH}
                disabled={isSubmitting || isUploadingImage}
              />
            </div>
          </div>
        </aside>
      </div>

      {errorMessage ? (
        <p
          style={{
            margin: "0 0 10px",
            color: "#b42318",
            fontSize: "14px",
          }}
        >
          {errorMessage}
        </p>
      ) : null}

      <div className="adminCampaignForm__actions">
        <AdminButton
          variant="ghost"
          type="button"
          onClick={onCancel}
          disabled={isSubmitting || isUploadingImage}
        >
          Avbryt
        </AdminButton>

        <AdminButton
          type="submit"
          disabled={isSubmitting || isUploadingImage}
        >
          {isSubmitting ? "Sparar..." : submitLabel}
        </AdminButton>
      </div>
    </form>
  );
}