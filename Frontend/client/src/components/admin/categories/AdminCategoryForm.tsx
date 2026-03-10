import { useEffect, useMemo, useRef, useState } from "react";
import AdminButton from "../shared/AdminButton";
import "./AdminCategoryForm.css";

export type ProductItem = {
  id: number;
  name: string;
};

export type AdminCategoryFormValues = {
  name: string;
  slug: string;
  description: string;
  image?: string;
  productIds: number[];
};

type Props = {
  submitLabel?: string;
  onCancel: () => void;
  onSubmit: (values: AdminCategoryFormValues) => void;
  initialValues?: {
    name?: string;
    description?: string;
    slug?: string;
    image?: string;
    productIds?: number[];
  };
  allProducts?: ProductItem[];
};

function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error("Kunde inte läsa filen"));

    reader.readAsDataURL(file);
  });
}

export default function AdminCategoryForm({
  submitLabel = "Spara",
  onCancel,
  onSubmit,
  initialValues,
  allProducts = [],
}: Props) {
  const initialName = initialValues?.name ?? "";
  const initialSlug = initialValues?.slug ?? "";
  const initialDescription = initialValues?.description ?? "";
  const initialImage = initialValues?.image ?? "";
  const initialProductIds = initialValues?.productIds ?? [];

  const [name, setName] = useState(initialName);
  const [slug, setSlug] = useState(initialSlug);
  const [description, setDescription] = useState(initialDescription);
  const [search, setSearch] = useState("");
  const [selectedProductIds, setSelectedProductIds] = useState<number[]>(
    initialProductIds
  );
  const [imagePreview, setImagePreview] = useState(initialImage);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setName(initialName);
    setSlug(initialSlug);
    setDescription(initialDescription);
    setSelectedProductIds(initialProductIds);
    setImagePreview(initialImage);
    setSearch("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, [
    initialName,
    initialSlug,
    initialDescription,
    initialImage,
    JSON.stringify(initialProductIds),
  ]);

  const currentCategoryProducts = useMemo(() => {
    return allProducts.filter((product) => selectedProductIds.includes(product.id));
  }, [allProducts, selectedProductIds]);

  const availableProducts = useMemo(() => {
    return allProducts.filter((product) => !selectedProductIds.includes(product.id));
  }, [allProducts, selectedProductIds]);

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return [];

    return availableProducts.filter((product) =>
      product.name.toLowerCase().includes(query)
    );
  }, [search, availableProducts]);

  const hasSearch = search.trim().length > 0;
  const hasVisibleSearchResults = hasSearch && filteredProducts.length > 0;
  const hasNoSearchResults = hasSearch && filteredProducts.length === 0;

  function addProduct(productId: number) {
    setSelectedProductIds((prev) =>
      prev.includes(productId) ? prev : [...prev, productId]
    );
  }

  function removeProduct(productId: number) {
    setSelectedProductIds((prev) => prev.filter((id) => id !== productId));
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

    onSubmit({
      name: name.trim(),
      slug: slug.trim(),
      description: description.trim(),
      image: imagePreview || undefined,
      productIds: selectedProductIds,
    });
  }

  return (
    <form
      className="category-form category-form--modal"
      noValidate
      onSubmit={handleSubmit}
    >
      <div className="category-form__grid">
        <div className="form-field">
          <label className="field-label" htmlFor="cat-name">
            Namn
          </label>
          <input
            id="cat-name"
            name="name"
            type="text"
            className="in text"
            placeholder="Ex. Pizza"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="form-field">
          <label className="field-label" htmlFor="cat-slug">
            URL-slug
          </label>
          <input
            id="cat-slug"
            name="slug"
            type="text"
            className="in text"
            placeholder="pizza"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
          />
        </div>

        <div className="form-field form-field--wide">
          <label className="field-label" htmlFor="cat-description">
            Beskrivning
          </label>
          <textarea
            id="cat-description"
            name="description"
            className="in text"
            rows={4}
            placeholder="Beskriv kategorin..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="form-field form-field--wide">
          <label className="field-label">Produkter i kategorin</label>

          <div className="category-products-panel">
            {currentCategoryProducts.length > 0 && (
              <p className="category-products-panel__count">
                {currentCategoryProducts.length} produkter i kategorin
              </p>
            )}

            <div
              className="category-products-list category-products-list--selected"
              role="group"
              aria-label="Produkter i kategorin"
            >
              {currentCategoryProducts.length > 0 ? (
                currentCategoryProducts.map((product) => (
                  <div
                    key={product.id}
                    className="category-products-list__selected-item"
                  >
                    <span className="category-products-list__name">
                      {product.name}
                    </span>

                    <button
                      type="button"
                      className="category-products-list__remove"
                      aria-label={`Ta bort ${product.name} från kategorin`}
                      title="Ta bort"
                      onClick={() => removeProduct(product.id)}
                    >
                      ×
                    </button>
                  </div>
                ))
              ) : (
                <p className="category-products-list__empty">
                  Inga produkter valda ännu
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="form-field form-field--wide">
          <label className="field-label" htmlFor="cat-product-search">
            Lägg till produkter
          </label>

          <input
            id="cat-product-search"
            type="text"
            className="in text"
            placeholder="Sök produktnamn..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {hasSearch && (
            <p className="category-products-panel__count">
              {filteredProducts.length}{" "}
              {filteredProducts.length === 1 ? "träff" : "träffar"}
            </p>
          )}

          {hasVisibleSearchResults && (
            <div
              className="category-products-list category-products-list--search"
              role="group"
              aria-label="Sökresultat produkter"
            >
              {filteredProducts.map((product) => (
                <label
                  key={product.id}
                  className="category-products-list__search-item"
                >
                  <input
                    type="checkbox"
                    checked={selectedProductIds.includes(product.id)}
                    onChange={() => addProduct(product.id)}
                  />
                  <span className="category-products-list__name">
                    {product.name}
                  </span>
                </label>
              ))}
            </div>
          )}

          {hasNoSearchResults && (
            <p className="category-products-list__empty">
              Inga produkter matchade din sökning.
            </p>
          )}
        </div>

        <div className="form-field form-field--wide">
          <label className="field-label" htmlFor="cat-image">
            Bild
          </label>

          <input
            ref={fileInputRef}
            id="cat-image"
            className="sr-only-file"
            type="file"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
          />

          {imagePreview && (
            <div className="category-image-preview">
              <img src={imagePreview} alt="Förhandsvisning" />
            </div>
          )}

          <div className="category-image-actions">
            <AdminButton
              type="button"
              size="md"
              variant="primary"
              onClick={handlePickImage}
            >
              {imagePreview ? "Byt bild" : "Lägg till bild"}
            </AdminButton>

            {imagePreview && (
              <AdminButton
                type="button"
                size="md"
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