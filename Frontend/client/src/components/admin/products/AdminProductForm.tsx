import { useEffect, useRef, useState } from "react";
import AdminButton from "../shared/AdminButton";
import { uploadImage } from "../../../api/uploadApi";
import "./AdminProductForm.css";

export type ProductCategoryOption = {
  value: string;
  label: string;
};

export type ProductFormValues = {
  categoryId: string;
  name: string;
  ingredients: string;
  price: string;
  sauce: string;
  altText: string;
  imageUrl?: string;
};

type Props = {
  initialValues?: Partial<ProductFormValues>;
  submitLabel?: string;
  onCancel: () => void;
  onSubmit: (values: ProductFormValues) => void | Promise<void>;
  categories: ProductCategoryOption[];
  isSubmitting?: boolean;
};

const NAME_MAX_LENGTH = 100;
const INGREDIENTS_MAX_LENGTH = 2000;
const SAUCE_MAX_LENGTH = 100;
const ALT_TEXT_MAX_LENGTH = 200;
const IMAGE_URL_MAX_LENGTH = 300;

function getNormalizedInitialValues(
  initialValues?: Partial<ProductFormValues>
): ProductFormValues {
  return {
    categoryId: initialValues?.categoryId ?? "",
    name: initialValues?.name ?? "",
    ingredients: initialValues?.ingredients ?? "",
    price: initialValues?.price ?? "",
    sauce: initialValues?.sauce ?? "",
    altText: initialValues?.altText ?? "",
    imageUrl: initialValues?.imageUrl ?? "",
  };
}

function normalizePrice(value: string): string {
  return value.trim().replace(",", ".");
}

export default function AdminProductForm({
  initialValues,
  submitLabel = "Spara",
  onCancel,
  onSubmit,
  categories,
  isSubmitting = false,
}: Props) {
  const normalized = getNormalizedInitialValues(initialValues);

  const [categoryId, setCategoryId] = useState(normalized.categoryId);
  const [name, setName] = useState(normalized.name);
  const [ingredients, setIngredients] = useState(normalized.ingredients);
  const [price, setPrice] = useState(normalized.price);
  const [sauce, setSauce] = useState(normalized.sauce);
  const [altText, setAltText] = useState(normalized.altText);
  const [imagePreview, setImagePreview] = useState(normalized.imageUrl ?? "");
  const [errorMessage, setErrorMessage] = useState("");
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const next = getNormalizedInitialValues(initialValues);
    setCategoryId(next.categoryId);
    setName(next.name);
    setIngredients(next.ingredients);
    setPrice(next.price);
    setSauce(next.sauce);
    setAltText(next.altText);
    setImagePreview(next.imageUrl ?? "");
    setErrorMessage("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, [initialValues]);

  function clearError() {
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

      setImagePreview(result.url);
    } catch (error) {
      console.error("Kunde inte ladda upp vald bild:", error);
      setErrorMessage(
        error instanceof Error ? error.message : "Kunde inte ladda upp bilden."
      );
    } finally {
      setIsUploadingImage(false);
    }
  }

  function removeImage() {
    setImagePreview("");
    clearError();

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (isUploadingImage) {
      setErrorMessage("Vänta tills bilden har laddats upp klart.");
      return;
    }

    const normalizedPrice = normalizePrice(price);

    const values: ProductFormValues = {
      categoryId: categoryId.trim(),
      name: name.trim(),
      ingredients: ingredients.trim(),
      price: normalizedPrice,
      sauce: sauce.trim(),
      altText: altText.trim(),
      imageUrl: imagePreview.trim() || undefined,
    };

    if (!values.categoryId) {
      setErrorMessage("Välj en kategori.");
      return;
    }

    if (!values.name) {
      setErrorMessage("Ange ett namn.");
      return;
    }

    if (values.name.length > NAME_MAX_LENGTH) {
      setErrorMessage(`Namn får max vara ${NAME_MAX_LENGTH} tecken.`);
      return;
    }

    if (!values.ingredients) {
      setErrorMessage("Fyll i ingredienser.");
      return;
    }

    if (values.ingredients.length > INGREDIENTS_MAX_LENGTH) {
      setErrorMessage(
        `Ingredienser får max vara ${INGREDIENTS_MAX_LENGTH} tecken.`
      );
      return;
    }

    if (!values.price) {
      setErrorMessage("Fyll i ett pris.");
      return;
    }

    const parsedPrice = Number(values.price);

    if (Number.isNaN(parsedPrice)) {
      setErrorMessage("Ange ett giltigt pris.");
      return;
    }

    if (parsedPrice <= 0) {
      setErrorMessage("Pris måste vara större än 0.");
      return;
    }

    if (values.sauce.length > SAUCE_MAX_LENGTH) {
      setErrorMessage(`Sås får max vara ${SAUCE_MAX_LENGTH} tecken.`);
      return;
    }

    if (values.altText.length > ALT_TEXT_MAX_LENGTH) {
      setErrorMessage(`Alt-text får max vara ${ALT_TEXT_MAX_LENGTH} tecken.`);
      return;
    }

    if ((values.imageUrl ?? "").length > IMAGE_URL_MAX_LENGTH) {
      setErrorMessage(`Bild-URL får max vara ${IMAGE_URL_MAX_LENGTH} tecken.`);
      return;
    }

    setErrorMessage("");
    onSubmit(values);
  }

  return (
    <form
      className="product-form product-form--modal"
      noValidate
      onSubmit={handleSubmit}
    >
      <div className="product-form__grid">
        <div className="form-field">
          <label className="field-label" htmlFor="prod-cat">
            Kategori
          </label>
          <select
            id="prod-cat"
            name="categoryId"
            className="in select"
            value={categoryId}
            disabled={isSubmitting || isUploadingImage}
            onChange={(e) => {
              setCategoryId(e.target.value);
              clearError();
            }}
          >
            <option value="">Välj kategori</option>
            {categories.map((categoryOption) => (
              <option key={categoryOption.value} value={categoryOption.value}>
                {categoryOption.label}
              </option>
            ))}
          </select>
        </div>

        <div className="form-field">
          <label className="field-label" htmlFor="prod-name">
            Namn
          </label>
          <input
            id="prod-name"
            name="name"
            type="text"
            className="in text"
            maxLength={NAME_MAX_LENGTH}
            placeholder="Ex. Vesuvio"
            value={name}
            disabled={isSubmitting || isUploadingImage}
            onChange={(e) => {
              setName(e.target.value);
              clearError();
            }}
          />
        </div>

        <div className="form-field form-field--wide">
          <label className="field-label" htmlFor="prod-ings">
            Ingredienser
          </label>
          <input
            id="prod-ings"
            name="ingredients"
            type="text"
            className="in text"
            maxLength={INGREDIENTS_MAX_LENGTH}
            placeholder="Tomatsås, ost, skinka"
            value={ingredients}
            disabled={isSubmitting || isUploadingImage}
            onChange={(e) => {
              setIngredients(e.target.value);
              clearError();
            }}
          />
        </div>

        <div className="form-field">
          <label className="field-label" htmlFor="prod-price">
            Pris (SEK)
          </label>
          <input
            id="prod-price"
            name="price"
            type="text"
            className="in price"
            inputMode="decimal"
            placeholder="99.00"
            value={price}
            disabled={isSubmitting || isUploadingImage}
            onChange={(e) => {
              setPrice(e.target.value);
              clearError();
            }}
          />
        </div>

        <div className="form-field">
          <label className="field-label" htmlFor="prod-sauce">
            Sås (valfritt)
          </label>
          <input
            id="prod-sauce"
            name="sauce"
            type="text"
            className="in text"
            maxLength={SAUCE_MAX_LENGTH}
            placeholder="bearnaisesås"
            value={sauce}
            disabled={isSubmitting || isUploadingImage}
            onChange={(e) => {
              setSauce(e.target.value);
              clearError();
            }}
          />
        </div>

        <div className="form-field form-field--wide">
          <label className="field-label" htmlFor="prod-alt">
            Alt-text
          </label>
          <input
            id="prod-alt"
            name="altText"
            type="text"
            className="in text"
            maxLength={ALT_TEXT_MAX_LENGTH}
            placeholder="Capricciosa pizza med skinka och champinjoner"
            value={altText}
            disabled={isSubmitting || isUploadingImage}
            onChange={(e) => {
              setAltText(e.target.value);
              clearError();
            }}
          />
        </div>

        <div className="form-field form-field--wide">
          <label className="field-label" htmlFor="prod-image">
            Bild
          </label>

          <input
            ref={fileInputRef}
            id="prod-image"
            className="sr-only-file"
            type="file"
            name="imageUrl"
            accept="image/*"
            onChange={handleImageChange}
          />

          {imagePreview && (
            <div className="product-image-preview">
              <img src={imagePreview} alt="Förhandsvisning" />
            </div>
          )}

          <div className="product-image-actions">
            <AdminButton
              type="button"
              size="sm"
              variant="primary"
              onClick={handlePickImage}
              disabled={isSubmitting || isUploadingImage}
            >
              {isUploadingImage
                ? "Laddar upp..."
                : imagePreview
                ? "Byt bild"
                : "Lägg till bild"}
            </AdminButton>

            {imagePreview && (
              <AdminButton
                type="button"
                size="sm"
                variant="cancel"
                onClick={removeImage}
                disabled={isSubmitting || isUploadingImage}
              >
                Ta bort bild
              </AdminButton>
            )}
          </div>
        </div>

        <div className="form-field form-field--wide">
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

          <div className="btn-row-bottom">
            <AdminButton
              type="submit"
              variant="primary"
              disabled={isSubmitting || isUploadingImage}
            >
              {isSubmitting ? "Sparar..." : submitLabel}
            </AdminButton>

            <AdminButton
              type="button"
              variant="cancel"
              onClick={onCancel}
              disabled={isSubmitting || isUploadingImage}
            >
              Avbryt
            </AdminButton>
          </div>
        </div>
      </div>
    </form>
  );
}