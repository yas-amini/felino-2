import { useEffect, useMemo, useState } from "react";
import AdminPage from "../../../components/admin/layout/AdminPage";
import { useAdminTopbar } from "../../../components/admin/useAdminTopbar";
import AdminButton from "../../../components/admin/shared/AdminButton";
import AdminSectionHead from "../../../components/admin/shared/AdminSectionHead";
import AdminProductsAccordion from "../../../components/admin/products/AdminProductsAccordion";
import AdminProductCreateModal from "../../../components/admin/products/AdminProductCreateModal";
import AdminConfirmModal from "../../../components/admin/shared/AdminConfirmModal";
import type {
  ProductCategoryOption,
  ProductFormValues,
} from "../../../components/admin/products/AdminProductForm";
import type {
  CategoryDto,
  CreateProductDto,
  ProductDto,
} from "../../../types/admin";
import { getCategories } from "../../../api/admin/categoryApi";
import { createProduct, deleteProduct, getProducts } from "../../../api/admin/productApi";

import "./AdminProductsPage.css";

function ProductsPageContent() {
  const [categories, setCategories] = useState<CategoryDto[]>([]);
  const [products, setProducts] = useState<ProductDto[]>([]);
  const [openCreate, setOpenCreate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductDto | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  async function loadData() {
    try {
      setIsLoading(true);

      const [categoriesResult, productsResult] = await Promise.all([
        getCategories(),
        getProducts(1, 200),
      ]);

      setCategories(categoriesResult);
      setProducts(productsResult);
    } catch (error) {
      console.error("Kunde inte hämta produkter eller kategorier:", error);
      window.alert("Det gick inte att hämta produkter.");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  const categoryOptions: ProductCategoryOption[] = useMemo(
    () =>
      categories.map((category) => ({
        value: String(category.id),
        label: category.name,
      })),
    [categories]
  );

  function validateProduct(values: ProductFormValues) {
    const name = values.name.trim();
    const ingredients = values.ingredients.trim();
    const price = values.price.trim().replace(",", ".");
    const sauce = values.sauce.trim();
    const altText = values.altText.trim();
    const imageUrl = values.imageUrl?.trim() ?? "";

    if (!values.categoryId) {
      window.alert("Välj en kategori.");
      return false;
    }

    if (!name) {
      window.alert("Namn är obligatoriskt.");
      return false;
    }

    if (name.length > 100) {
      window.alert("Namn får max vara 100 tecken.");
      return false;
    }

    if (!ingredients) {
      window.alert("Ingredienser är obligatoriskt.");
      return false;
    }

    if (!price) {
      window.alert("Pris är obligatoriskt.");
      return false;
    }

    if (Number.isNaN(Number(price))) {
      window.alert("Ange ett giltigt pris.");
      return false;
    }

    if (sauce.length > 100) {
      window.alert("Sås får max vara 100 tecken.");
      return false;
    }

    if (altText.length > 200) {
      window.alert("Alt-text får max vara 200 tecken.");
      return false;
    }

    if (imageUrl.length > 300) {
      window.alert("Bild-URL får max vara 300 tecken.");
      return false;
    }

    return true;
  }

  async function handleCreate(values: ProductFormValues) {
    if (!validateProduct(values)) return;

    const payload: CreateProductDto = {
      name: values.name.trim(),
      ingredients: values.ingredients.trim(),
      price: Number(values.price.trim().replace(",", ".")),
      sauce: values.sauce.trim() || null,
      altText: values.altText.trim() || null,
      imageUrl: values.imageUrl?.trim() || null,
      categoryId: Number(values.categoryId),
    };

    try {
      await createProduct(payload);
      await loadData();
      setOpenCreate(false);
    } catch (error) {
      console.error("Kunde inte skapa produkt:", error);
      window.alert("Det gick inte att skapa produkten.");
    }
  }

  function handleOpenEdit() {
    window.alert("Redigering av produkt kommer när PATCH är på plats.");
  }

  function handleOpenDelete(product: ProductDto) {
    setSelectedProduct(product);
    setOpenDelete(true);
  }

  async function confirmDelete() {
    if (!selectedProduct) return;

    try {
      await deleteProduct(selectedProduct.id);
      await loadData();

      setOpenDelete(false);
      setSelectedProduct(null);
    } catch (error) {
      console.error("Kunde inte ta bort produkt:", error);
      window.alert("Det gick inte att ta bort produkten.");
    }
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
            onClick={() => setOpenCreate(true)}
            disabled={categories.length === 0}
            title={
              categories.length > 0
                ? "Lägg till produkt"
                : "Lägg först till minst en kategori"
            }
          >
            <span>+ Lägg till produkt</span>
          </AdminButton>
        }
      />

      {isLoading ? (
        <section className="products-empty-state">
          <p className="products-empty-message">Laddar produkter...</p>
        </section>
      ) : categories.length === 0 ? (
        <section className="products-empty-state">
          <p className="products-empty-message">
            Inga kategorier finns ännu. Lägg först till kategorier på kategorisidan.
          </p>
        </section>
      ) : (
        categories.map((category) => {
          const categoryProducts = products.filter(
            (product) => product.categoryId === category.id
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
                                {product.imageUrl ? (
                                  <img
                                    src={product.imageUrl}
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
                              <td data-label="Ingredienser">{product.ingredients}</td>
                              <td data-label="Pris">{product.price} kr</td>
                              <td data-label="Sås">{product.sauce || "-"}</td>
                              <td data-label="Alt-text">{product.altText || "-"}</td>

                              <td data-label="Åtgärder" className="actions">
                                <AdminButton
                                  preset="edit"
                                  size="sm"
                                  type="button"
                                  title="Redigera"
                                  aria-label={`Redigera ${product.name}`}
                                  onClick={handleOpenEdit}
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
                      products={categoryProducts.map((product) => ({
                        id: product.id,
                        name: product.name,
                        ingredients: product.ingredients,
                        price: String(product.price),
                        sauce: product.sauce ?? "",
                        altText: product.altText ?? "",
                        imageUrl: product.imageUrl ?? "",
                        categoryId: String(product.categoryId),
                      }))}
                      onEdit={() => handleOpenEdit()}
                      onDelete={(product) =>
                        handleOpenDelete({
                          id: product.id,
                          name: product.name,
                          slug: "",
                          ingredients: product.ingredients,
                          price: Number(product.price),
                          sauce: product.sauce ?? null,
                          altText: product.altText ?? null,
                          imageUrl: product.imageUrl ?? null,
                          categoryId: Number(product.categoryId),
                        })
                      }
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
  useAdminTopbar("Produkter");

  return (
    <AdminPage>
      <ProductsPageContent />
    </AdminPage>
  );
}