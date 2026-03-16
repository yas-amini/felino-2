import { useRef, useState } from "react";
import AdminButton from "../shared/AdminButton";
import "./AdminProductForm.css";

export type ProductCategory = string;

export type ProductCategoryOption = {
  value: string;
  label: string;
};

export type ProductFormValues = {
  category: ProductCategory | "";
  name: string;
  ingredients: string;
  price: string;
  sauce: string;
  altText: string;
  image?: string;
};

type Props = {
  initialValues?: Partial<ProductFormValues>;
  submitLabel?: string;
  onCancel: () => void;
  onSubmit: (values: ProductFormValues) => void;
  categories: ProductCategoryOption[];
};

function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error("Kunde inte läsa filen"));

    reader.readAsDataURL(file);
  });
}

function getNormalizedInitialValues(
  initialValues?: Partial<ProductFormValues>
): ProductFormValues {
  return {
    category: initialValues?.category ?? "",
    name: initialValues?.name ?? "",
    ingredients: initialValues?.ingredients ?? "",
    price: initialValues?.price ?? "",
    sauce: initialValues?.sauce ?? "",
    altText: initialValues?.altText ?? "",
    image: initialValues?.image ?? "",
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
}: Props) {
  const normalized = getNormalizedInitialValues(initialValues);

  const [category, setCategory] = useState<ProductCategory | "">(
    normalized.category
  );
  const [name, setName] = useState(normalized.name);
  const [ingredients, setIngredients] = useState(normalized.ingredients);
  const [price, setPrice] = useState(normalized.price);
  const [sauce, setSauce] = useState(normalized.sauce);
  const [altText, setAltText] = useState(normalized.altText);
  const [imagePreview, setImagePreview] = useState(normalized.image ?? "");
  const [errorMessage, setErrorMessage] = useState("");

  const fileInputRef = useRef<HTMLInputElement | null>(null);

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
      const imageUrl = await fileToDataUrl(file);
      setImagePreview(imageUrl);
      clearError();
    } catch (error) {
      console.error("Kunde inte läsa vald bild:", error);
      setErrorMessage("Kunde inte läsa vald bild.");
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

    const normalizedPrice = normalizePrice(price);

    const values: ProductFormValues = {
      category,
      name: name.trim(),
      ingredients: ingredients.trim(),
      price: normalizedPrice,
      sauce: sauce.trim(),
      altText: altText.trim(),
      image: imagePreview || undefined,
    };

    console.log("AdminProductForm submit", values);

    if (!values.category) {
      setErrorMessage("Välj en kategori.");
      return;
    }

    if (values.name.length < 2) {
      setErrorMessage("Ange ett namn på minst 2 tecken.");
      return;
    }

    if (!values.ingredients) {
      setErrorMessage("Fyll i ingredienser.");
      return;
    }

    if (!values.price) {
      setErrorMessage("Fyll i ett pris.");
      return;
    }

    if (Number.isNaN(Number(values.price))) {
      setErrorMessage("Ange ett giltigt pris.");
      return;
    }

    setErrorMessage("");
    console.log("AdminProductForm calling onSubmit");
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
            name="category"
            className="in select"
            value={category}
            onChange={(e) => {
              setCategory(e.target.value as ProductCategory | "");
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
            minLength={2}
            maxLength={120}
            placeholder="Ex. Vesuvio"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              clearError();
            }}
          />
        </div>

        <div className="form-field form-field--wide">
          <label className="field-label" htmlFor="prod-ings">
            Ingredienser (kommaseparerade)
          </label>
          <input
            id="prod-ings"
            name="ingredients"
            type="text"
            className="in text"
            maxLength={800}
            placeholder="tomatsås, ost, skinka"
            value={ingredients}
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
            placeholder="bearnaisesås"
            value={sauce}
            onChange={(e) => {
              setSauce(e.target.value);
              clearError();
            }}
          />
        </div>

        <div className="form-field form-field--wide">
          <label className="field-label" htmlFor="prod-alt">
            Alt-text (tillgänglighet)
          </label>
          <input
            id="prod-alt"
            name="alt_text"
            type="text"
            className="in text"
            maxLength={200}
            placeholder="Capricciosa pizza med skinka och champinjoner"
            value={altText}
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
            name="image"
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
            >
              {imagePreview ? "Byt bild" : "Lägg till bild"}
            </AdminButton>

            {imagePreview && (
              <AdminButton
                type="button"
                size="sm"
                variant="cancel"
                onClick={removeImage}
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
            <AdminButton type="submit" variant="primary">
              {submitLabel}
            </AdminButton>

            <AdminButton type="button" variant="cancel" onClick={onCancel}>
              Avbryt
            </AdminButton>
          </div>
        </div>
      </div>
    </form>
  );
}