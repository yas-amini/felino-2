import { useEffect, useMemo, useRef, useState } from "react";
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

export default function AdminProductForm({
  initialValues,
  submitLabel = "Spara",
  onCancel,
  onSubmit,
  categories,
}: Props) {
  const [category, setCategory] = useState<ProductCategory | "">(
    initialValues?.category ?? ""
  );
  const [name, setName] = useState(initialValues?.name ?? "");
  const [ingredients, setIngredients] = useState(initialValues?.ingredients ?? "");
  const [price, setPrice] = useState(initialValues?.price ?? "");
  const [sauce, setSauce] = useState(initialValues?.sauce ?? "");
  const [altText, setAltText] = useState(initialValues?.altText ?? "");
  const [imagePreview, setImagePreview] = useState(initialValues?.image ?? "");

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setCategory(initialValues?.category ?? "");
    setName(initialValues?.name ?? "");
    setIngredients(initialValues?.ingredients ?? "");
    setPrice(initialValues?.price ?? "");
    setSauce(initialValues?.sauce ?? "");
    setAltText(initialValues?.altText ?? "");
    setImagePreview(initialValues?.image ?? "");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, [initialValues]);

  const isValid = useMemo(() => {
    return (
      category.trim() !== "" &&
      name.trim().length >= 2 &&
      ingredients.trim() !== "" &&
      price.trim() !== ""
    );
  }, [category, name, ingredients, price]);

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

    const values: ProductFormValues = {
      category,
      name: name.trim(),
      ingredients: ingredients.trim(),
      price: price.trim(),
      sauce: sauce.trim(),
      altText: altText.trim(),
      image: imagePreview || undefined,
    };

    if (!values.category || !values.name || !values.ingredients || !values.price) {
      return;
    }

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
            onChange={(e) => setCategory(e.target.value as ProductCategory | "")}
            required
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
            onChange={(e) => setName(e.target.value)}
            required
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
            onChange={(e) => setIngredients(e.target.value)}
            required
          />
        </div>

        <div className="form-field">
          <label className="field-label" htmlFor="prod-price">
            Pris (SEK)
          </label>
          <input
            id="prod-price"
            name="price"
            type="number"
            className="in price"
            inputMode="decimal"
            min={0}
            step="0.01"
            placeholder="99.00"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
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
            onChange={(e) => setSauce(e.target.value)}
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
            onChange={(e) => setAltText(e.target.value)}
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
          <div className="btn-row-bottom">
            <AdminButton type="submit" variant="primary" disabled={!isValid}>
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