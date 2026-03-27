import { useEffect, useRef, useState } from "react";
import AdminButton from "../shared/AdminButton";
import "./AdminCategoryForm.css";

export type AdminCategoryFormValues = {
  name: string;
  slug: string;
  description: string;
  imageUrl?: string;
};

type Props = {
  submitLabel?: string;
  onCancel: () => void;
  onSubmit: (values: AdminCategoryFormValues) => void;
  initialValues?: {
    name?: string;
    description?: string;
    slug?: string;
    imageUrl?: string;
  };
};

const NAME_MAX_LENGTH = 100;
const SLUG_MAX_LENGTH = 120;
const DESCRIPTION_MAX_LENGTH = 300;
const IMAGE_URL_MAX_LENGTH = 300;

function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error("Kunde inte läsa filen"));

    reader.readAsDataURL(file);
  });
}

function normalizeSlug(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[åä]/g, "a")
    .replace(/ö/g, "o")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export default function AdminCategoryForm({
  submitLabel = "Spara",
  onCancel,
  onSubmit,
  initialValues,
}: Props) {
  const initialName = initialValues?.name ?? "";
  const initialSlug = initialValues?.slug ?? "";
  const initialDescription = initialValues?.description ?? "";
  const initialImageUrl = initialValues?.imageUrl ?? "";

  const [name, setName] = useState(initialName);
  const [slug, setSlug] = useState(initialSlug);
  const [description, setDescription] = useState(initialDescription);
  const [imagePreview, setImagePreview] = useState(initialImageUrl);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setName(initialName);
    setSlug(initialSlug);
    setDescription(initialDescription);
    setImagePreview(initialImageUrl);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, [initialName, initialSlug, initialDescription, initialImageUrl]);

  function handlePickImage() {
    if (!fileInputRef.current) return;

    fileInputRef.current.value = "";
    fileInputRef.current.click();
  }

  async function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const nextImageUrl = await fileToDataUrl(file);

      if (nextImageUrl.length > IMAGE_URL_MAX_LENGTH) {
        alert(`Bildens data är för lång. Max ${IMAGE_URL_MAX_LENGTH} tecken tillåts.`);
        return;
      }

      setImagePreview(nextImageUrl);
    } catch (error) {
      console.error("Kunde inte läsa vald bild:", error);
    }
  }

  function removeImage() {
    setImagePreview("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const trimmedName = name.trim();
    const normalizedSlug = normalizeSlug(slug);
    const trimmedDescription = description.trim();
    const trimmedImageUrl = imagePreview.trim();

    if (!trimmedName) {
      alert("Namn är obligatoriskt.");
      return;
    }

    if (!normalizedSlug) {
      alert("Slug är obligatorisk.");
      return;
    }

    if (!trimmedDescription) {
      alert("Beskrivning är obligatorisk.");
      return;
    }

    if (trimmedName.length > NAME_MAX_LENGTH) {
      alert(`Namn får max vara ${NAME_MAX_LENGTH} tecken.`);
      return;
    }

    if (normalizedSlug.length > SLUG_MAX_LENGTH) {
      alert(`Slug får max vara ${SLUG_MAX_LENGTH} tecken.`);
      return;
    }

    if (trimmedDescription.length > DESCRIPTION_MAX_LENGTH) {
      alert(`Beskrivning får max vara ${DESCRIPTION_MAX_LENGTH} tecken.`);
      return;
    }

    if (trimmedImageUrl.length > IMAGE_URL_MAX_LENGTH) {
      alert(`Bild-URL får max vara ${IMAGE_URL_MAX_LENGTH} tecken.`);
      return;
    }

    onSubmit({
      name: trimmedName,
      slug: normalizedSlug,
      description: trimmedDescription,
      imageUrl: trimmedImageUrl || undefined,
    });
  }

  return (
    <form className="adminCategoryForm" noValidate onSubmit={handleSubmit}>
      <div className="adminCategoryForm__grid">
        <div className="adminCategoryForm__main">
          <div className="adminCategoryForm__row">
            <div className="adminCategoryForm__field">
              <label htmlFor="cat-name">Namn</label>
              <input
                id="cat-name"
                name="name"
                type="text"
                placeholder="Ex. Pizza"
                value={name}
                maxLength={NAME_MAX_LENGTH}
                required
                onChange={(e) => setName(e.target.value)}
              />
              <small>
                {name.trim().length}/{NAME_MAX_LENGTH}
              </small>
            </div>

            <div className="adminCategoryForm__field">
              <label htmlFor="cat-slug">URL-slug</label>
              <input
                id="cat-slug"
                name="slug"
                type="text"
                placeholder="pizza"
                value={slug}
                maxLength={SLUG_MAX_LENGTH}
                required
                onChange={(e) => setSlug(normalizeSlug(e.target.value))}
              />
              <small>
                {slug.trim().length}/{SLUG_MAX_LENGTH}
              </small>
            </div>
          </div>

          <div className="adminCategoryForm__field">
            <label htmlFor="cat-description">Beskrivning</label>
            <textarea
              id="cat-description"
              name="description"
              rows={4}
              placeholder="Beskriv kategorin..."
              value={description}
              maxLength={DESCRIPTION_MAX_LENGTH}
              required
              onChange={(e) => setDescription(e.target.value)}
            />
            <small>
              {description.trim().length}/{DESCRIPTION_MAX_LENGTH}
            </small>
          </div>
        </div>

        <aside className="adminCategoryForm__side">
          <div className="adminCategoryForm__uploadBox">
            <p className="adminCategoryForm__uploadTitle">Kategori-bild</p>

            <div className="adminCategoryForm__imagePreview">
              {imagePreview ? (
                <img src={imagePreview} alt="Förhandsvisning" />
              ) : (
                <span>Ingen bild vald</span>
              )}
            </div>

            <input
              ref={fileInputRef}
              id="cat-image"
              className="adminCategoryForm__fileInput"
              type="file"
              name="imageUrl"
              accept="image/*"
              onChange={handleImageChange}
            />

            <div className="adminCategoryForm__uploadActions">
              <AdminButton type="button" size="sm" onClick={handlePickImage}>
                {imagePreview ? "Byt bild" : "Lägg till bild"}
              </AdminButton>

              {imagePreview && (
                <AdminButton
                  type="button"
                  size="sm"
                  variant="ghost"
                  onClick={removeImage}
                >
                  Ta bort
                </AdminButton>
              )}
            </div>
          </div>
        </aside>
      </div>

      <div className="adminCategoryForm__actions">
        <AdminButton type="button" variant="ghost" onClick={onCancel}>
          Avbryt
        </AdminButton>

        <AdminButton type="submit">{submitLabel}</AdminButton>
      </div>
    </form>
  );
}