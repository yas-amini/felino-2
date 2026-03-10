import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import AdminPage from "../../../components/admin/layout/AdminPage";
import AdminButton from "../../../components/admin/shared/AdminButton";
import AdminProductsAccordion from "../../../components/admin/products/AdminProductsAccordion";
import AdminProductCreateModal from "../../../components/admin/products/AdminProductCreateModal";
import AdminProductEditModal from "../../../components/admin/products/AdminProductEditModal";
import AdminConfirmModal from "../../../components/admin/shared/AdminConfirmModal";
import type {
  ProductCategoryOption,
  ProductFormValues,
} from "../../../components/admin/products/AdminProductForm";

import "./AdminProductsPage.css";

type StoredCategory = {
  id: number;
  name: string;
  slug: string;
  description: string;
  image?: string;
  productIds: number[];
  productCount: number;
};

type Product = {
  id: number;
  category: string;
  name: string;
  ingredients: string;
  price: string;
  sauce?: string;
  altText?: string;
  image?: string;
};

const CATEGORY_STORAGE_KEY = "admin_categories";
const PRODUCT_STORAGE_KEY = "admin_products";

function getStoredCategories(): StoredCategory[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const saved = window.localStorage.getItem(CATEGORY_STORAGE_KEY);
    if (!saved) return [];

    const parsed = JSON.parse(saved) as unknown;
    return Array.isArray(parsed) ? (parsed as StoredCategory[]) : [];
  } catch {
    return [];
  }
}

function getStoredProducts(): Product[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const saved = window.localStorage.getItem(PRODUCT_STORAGE_KEY);
    if (!saved) return [];

    const parsed = JSON.parse(saved) as unknown;
    return Array.isArray(parsed) ? (parsed as Product[]) : [];
  } catch {
    return [];
  }
}

function ProductsPageContent() {
  const [categories, setCategories] = useState<StoredCategory[]>(() =>
    getStoredCategories()
  );
  const [products, setProducts] = useState<Product[]>(() => getStoredProducts());
  const [openCreate, setOpenCreate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    setCategories(getStoredCategories());
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(PRODUCT_STORAGE_KEY, JSON.stringify(products));
  }, [products]);

  const categoryOptions: ProductCategoryOption[] = categories.map((category) => ({
    value: category.slug,
    label: category.name,
  }));

  function handleCreate(values: ProductFormValues) {
    if (!values.category) return;

    const newProduct: Product = {
      id: Date.now(),
      category: values.category,
      name: values.name,
      ingredients: values.ingredients,
      price: values.price,
      sauce: values.sauce || "",
      altText: values.altText || "",
      image: values.image,
    };

    setProducts((prev) => [newProduct, ...prev]);
    setOpenCreate(false);
  }

  function handleOpenEdit(product: Product) {
    setSelectedProduct(product);
    setOpenEdit(true);
  }

  function handleEditSubmit(values: ProductFormValues) {
    if (!selectedProduct || !values.category) return;

    setProducts((prev) =>
      prev.map((product) =>
        product.id === selectedProduct.id
          ? {
              ...product,
              category: values.category,
              name: values.name,
              ingredients: values.ingredients,
              price: values.price,
              sauce: values.sauce || "",
              altText: values.altText || "",
              image: values.image,
            }
          : product
      )
    );

    setOpenEdit(false);
    setSelectedProduct(null);
  }

  function handleOpenDelete(product: Product) {
    setSelectedProduct(product);
    setOpenDelete(true);
  }

  function confirmDelete() {
    if (!selectedProduct) return;

    setProducts((prev) =>
      prev.filter((product) => product.id !== selectedProduct.id)
    );

    setOpenDelete(false);
    setSelectedProduct(null);
  }

  function handleSave(product: Product) {
    console.log("Spara produkt:", product);
  }

  return (
    <section className="admin-settings" data-scope="products">
      <section className="admin-section">
        <div className="products-section-head">
          <div>
            <h2>Aktiva produkter</h2>
            <p className="muted">
              Här ser du alla produkter uppdelade per kategori.
            </p>
          </div>

          <div className="products-section-actions">
            <AdminButton
              variant="primary"
              type="button"
              onClick={() => setOpenCreate(true)}
              disabled={categories.length === 0}
              title={
                categories.length === 0
                  ? "Lägg först till minst en kategori"
                  : "Lägg till produkt"
              }
            >
              <FontAwesomeIcon icon={faPlus} />
              <span>Lägg till produkt</span>
            </AdminButton>
          </div>
        </div>
      </section>

      {categories.length === 0 ? (
        <section className="admin-section">
          <p className="muted">
            Inga kategorier finns ännu. Lägg först till kategorier på kategorisidan.
          </p>
        </section>
      ) : (
        categories.map((category) => {
          const categoryProducts = products.filter(
            (product) => product.category === category.slug
          );

          return (
            <section
              key={category.id}
              className="admin-section product-category-section"
            >
              <div className="product-category-head">
                <h3>{category.name}</h3>
                <span className="product-category-count">
                  {categoryProducts.length} st
                </span>
              </div>

              {categoryProducts.length === 0 ? (
                <p className="muted">Inga produkter i denna kategori ännu.</p>
              ) : (
                <>
                  <div className="products-desktop-view">
                    <div className="table-wrap">
                      <table className="products-table">
                        <thead>
                          <tr>
                            <th>Bild</th>
                            <th>Namn</th>
                            <th>Ingredienser</th>
                            <th>Pris</th>
                            <th>Sås</th>
                            <th>Alt-text</th>
                            <th>Åtgärder</th>
                          </tr>
                        </thead>

                        <tbody>
                          {categoryProducts.map((product) => (
                            <tr key={product.id}>
                              <td data-label="Bild">
                                {product.image ? (
                                  <img
                                    src={product.image}
                                    alt={product.altText || product.name}
                                    className="thumb"
                                    width={64}
                                    height={64}
                                  />
                                ) : (
                                  <span className="muted">Ingen</span>
                                )}
                              </td>

                              <td data-label="Namn">{product.name}</td>
                              <td data-label="Ingredienser">{product.ingredients}</td>
                              <td data-label="Pris">{product.price}</td>
                              <td data-label="Sås">{product.sauce || "-"}</td>
                              <td data-label="Alt-text">{product.altText || "-"}</td>

                              <td data-label="Åtgärder" className="actions">
                                <AdminButton
                                  preset="icon-save"
                                  size="sm"
                                  type="button"
                                  title="Spara"
                                  aria-label={`Spara ${product.name}`}
                                  onClick={() => handleSave(product)}
                                />

                                <AdminButton
                                  preset="edit"
                                  size="sm"
                                  type="button"
                                  title="Redigera"
                                  aria-label={`Redigera ${product.name}`}
                                  onClick={() => handleOpenEdit(product)}
                                />

                                <AdminButton
                                  preset="delete"
                                  size="sm"
                                  type="button"
                                  title="Ta bort"
                                  aria-label={`Ta bort ${product.name}`}
                                  onClick={() => handleOpenDelete(product)}
                                />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="products-mobile-view">
                    <AdminProductsAccordion
                      products={categoryProducts}
                      onEdit={handleOpenEdit}
                      onDelete={handleOpenDelete}
                      onSave={handleSave}
                    />
                  </div>
                </>
              )}
            </section>
          );
        })
      )}

      <AdminProductCreateModal
        isOpen={openCreate}
        onClose={() => setOpenCreate(false)}
        onSubmit={handleCreate}
        categories={categoryOptions}
      />

      <AdminProductEditModal
        isOpen={openEdit}
        onClose={() => {
          setOpenEdit(false);
          setSelectedProduct(null);
        }}
        onSubmit={handleEditSubmit}
        categories={categoryOptions}
        product={
          selectedProduct
            ? {
                category: selectedProduct.category,
                name: selectedProduct.name,
                ingredients: selectedProduct.ingredients,
                price: selectedProduct.price,
                sauce: selectedProduct.sauce ?? "",
                altText: selectedProduct.altText ?? "",
                image: selectedProduct.image ?? "",
              }
            : null
        }
      />

      <AdminConfirmModal
        isOpen={openDelete}
        onClose={() => {
          setOpenDelete(false);
          setSelectedProduct(null);
        }}
        onConfirm={confirmDelete}
        title="Ta bort produkt"
        message={`Är du säker på att du vill ta bort ${
          selectedProduct?.name ?? "produkten"
        }?`}
        confirmText="Ja, ta bort"
        cancelText="Nej"
        confirmVariant="danger"
      />
    </section>
  );
}

export default function AdminProductsPage() {
  return (
    <AdminPage title="Produkter">
      <ProductsPageContent />
    </AdminPage>
  );
}