import { useEffect, useState } from "react";
import AdminPage from "../../../components/admin/layout/AdminPage";
import AdminButton from "../../../components/admin/shared/AdminButton";
import AdminSectionHead from "../../../components/admin/shared/AdminSectionHead";
import { useAdminQuickActions } from "../../../components/admin/shared/AdminQuickActionsContext";
import AdminProductsAccordion from "../../../components/admin/products/AdminProductsAccordion";
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

function syncCategoriesWithProducts(
  categories: StoredCategory[],
  products: Product[]
): StoredCategory[] {
  return categories.map((category) => {
    const productIds = products
      .filter((product) => product.category === category.slug)
      .map((product) => product.id);

    return {
      ...category,
      productIds,
      productCount: productIds.length,
    };
  });
}

function ProductsPageContent() {
  const { openCreateProductModal, canCreateProduct } = useAdminQuickActions();

  const [categories, setCategories] = useState<StoredCategory[]>(() =>
    getStoredCategories()
  );
  const [products, setProducts] = useState<Product[]>(() => getStoredProducts());
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    const syncData = () => {
      setCategories(getStoredCategories());
      setProducts(getStoredProducts());
    };

    syncData();

    window.addEventListener("focus", syncData);
    window.addEventListener("admin-products-updated", syncData as EventListener);
    window.addEventListener(
      "admin-categories-updated",
      syncData as EventListener
    );

    return () => {
      window.removeEventListener("focus", syncData);
      window.removeEventListener(
        "admin-products-updated",
        syncData as EventListener
      );
      window.removeEventListener(
        "admin-categories-updated",
        syncData as EventListener
      );
    };
  }, []);

  const categoryOptions: ProductCategoryOption[] = categories.map((category) => ({
    value: category.slug,
    label: category.name,
  }));

  function handleOpenEdit(product: Product) {
    setSelectedProduct(product);
    setOpenEdit(true);
  }

  function handleEditSubmit(values: ProductFormValues) {
    if (!selectedProduct || !values.category || typeof window === "undefined") {
      return;
    }

    const nextProducts = products.map((product) =>
      product.id === selectedProduct.id
        ? {
            ...product,
            category: values.category,
            name: values.name,
            ingredients: values.ingredients,
            price: values.price,
            sauce: values.sauce || "",
            altText: values.altText || "",
            image: product.image,
          }
        : product
    );

    const nextCategories = syncCategoriesWithProducts(
      getStoredCategories(),
      nextProducts
    );

    try {
      window.localStorage.setItem(
        PRODUCT_STORAGE_KEY,
        JSON.stringify(nextProducts)
      );
      window.localStorage.setItem(
        CATEGORY_STORAGE_KEY,
        JSON.stringify(nextCategories)
      );
    } catch (error) {
      console.error("Kunde inte spara ändrad produkt i localStorage:", error);
      window.alert(
        "Produkten kunde inte sparas eftersom lokal lagring är full. Rensa sparade produkter/bilder i localStorage och försök igen."
      );
      return;
    }

    setProducts(nextProducts);
    setCategories(nextCategories);

    window.dispatchEvent(new Event("admin-products-updated"));
    window.dispatchEvent(new Event("admin-categories-updated"));

    setOpenEdit(false);
    setSelectedProduct(null);
  }

  function handleOpenDelete(product: Product) {
    setSelectedProduct(product);
    setOpenDelete(true);
  }

  function confirmDelete() {
    if (!selectedProduct || typeof window === "undefined") return;

    const nextProducts = products.filter(
      (product) => product.id !== selectedProduct.id
    );

    const nextCategories = syncCategoriesWithProducts(
      getStoredCategories(),
      nextProducts
    );

    try {
      window.localStorage.setItem(
        PRODUCT_STORAGE_KEY,
        JSON.stringify(nextProducts)
      );
      window.localStorage.setItem(
        CATEGORY_STORAGE_KEY,
        JSON.stringify(nextCategories)
      );
    } catch (error) {
      console.error("Kunde inte ta bort produkt i localStorage:", error);
      window.alert(
        "Produkten kunde inte uppdateras eftersom lokal lagring är full eller trasig. Rensa localStorage och försök igen."
      );
      return;
    }

    setProducts(nextProducts);
    setCategories(nextCategories);

    window.dispatchEvent(new Event("admin-products-updated"));
    window.dispatchEvent(new Event("admin-categories-updated"));

    setOpenDelete(false);
    setSelectedProduct(null);
  }

  return (
    <section className="admin-products-page" data-scope="products">
      <AdminSectionHead
        level={1}
        title="Aktiva produkter"
        description="Här ser du alla produkter uppdelade per kategori."
        actions={
          <AdminButton
            variant="primary"
            type="button"
            className="fpAdminBtn--field"
            onClick={openCreateProductModal}
            disabled={!canCreateProduct}
            title={
              canCreateProduct
                ? "Lägg till produkt"
                : "Lägg först till minst en kategori"
            }
          >
            
            <span>+ Lägg till produkt</span>
          </AdminButton>
        }
      />

      {categories.length === 0 ? (
        <section className="products-empty-state">
          <p className="products-empty-message">
            Inga kategorier finns ännu. Lägg först till kategorier på
            kategorisidan.
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
              className="product-category-section"
            >
              <AdminSectionHead
                level={3}
                title={category.name}
                actions={
                  <span className="product-category-count">
                    {categoryProducts.length} st
                  </span>
                }
              />

              {categoryProducts.length === 0 ? (
                <p className="products-empty-message">
                  Inga produkter i denna kategori ännu.
                </p>
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
                                  <span className="products-table-muted">Ingen</span>
                                )}
                              </td>

                              <td data-label="Namn">{product.name}</td>
                              <td data-label="Ingredienser">
                                {product.ingredients}
                              </td>
                              <td data-label="Pris">{product.price}</td>
                              <td data-label="Sås">{product.sauce || "-"}</td>
                              <td data-label="Alt-text">
                                {product.altText || "-"}
                              </td>

                              <td data-label="Åtgärder" className="actions">
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
                      onSave={() => {}}
                    />
                  </div>
                </>
              )}
            </section>
          );
        })
      )}

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
                id: selectedProduct.id,
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