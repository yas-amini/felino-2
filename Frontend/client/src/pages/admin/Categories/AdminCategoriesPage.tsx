import { useEffect, useMemo, useState } from "react";
import AdminPage from "../../../components/admin/layout/AdminPage";
import { useAdminTopbar } from "../../../components/admin/useAdminTopbar";
import AdminButton from "../../../components/admin/shared/AdminButton";
import AdminConfirmModal from "../../../components/admin/shared/AdminConfirmModal";
import AdminSectionHead from "../../../components/admin/shared/AdminSectionHead";
import AdminCategoryCreateModal from "../../../components/admin/categories/AdminCategoryCreateModal";
import AdminCategoryEditModal from "../../../components/admin/categories/AdminCategoryEditModal";
import AdminCategoryCard from "../../../components/admin/categories/AdminCategoryCard";
import type { AdminCategoryFormValues } from "../../../components/admin/categories/AdminCategoryForm";
import type { Category, ApiValidationErrors } from "../../../types/category";
import type { ProductDto } from "../../../types/product";
import { ApiError } from "../../../types/category";
import {
  createCategory,
  deleteCategory,
  getCategories,
  removeProductFromCategory,
  updateCategory,
} from "../../../api/admin/categoryApi";
import { getProducts, updateProduct } from "../../../api/admin/productApi";
import { normalizeSlug } from "../../../utils/slug";

import "./AdminCategoriesPage.css";

function getErrorMessage(error: unknown, fallbackMessage: string) {
  if (error instanceof ApiError) {
    if (error.errors) {
      const firstErrorGroup = Object.values(error.errors)[0];
      const firstErrorMessage = firstErrorGroup?.[0];

      if (firstErrorMessage) {
        return firstErrorMessage;
      }
    }

    if (error.message) {
      return error.message;
    }
  }

  const maybeError = error as
    | {
        message?: string;
        errors?: ApiValidationErrors;
      }
    | undefined;

  if (maybeError?.errors) {
    const firstErrorGroup = Object.values(maybeError.errors)[0];
    const firstErrorMessage = firstErrorGroup?.[0];

    if (firstErrorMessage) {
      return firstErrorMessage;
    }
  }

  if (maybeError?.message) {
    return maybeError.message;
  }

  return fallbackMessage;
}

export default function AdminCategoriesPage() {
  useAdminTopbar("Kategorier");

  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<ProductDto[]>([]);
  const [openCreate, setOpenCreate] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isRemovingProduct, setIsRemovingProduct] = useState(false);
  const [isAssigningProduct, setIsAssigningProduct] = useState(false);

  async function loadData(): Promise<{
    categories: Category[];
    products: ProductDto[];
  }> {
    try {
      setIsLoading(true);

      const [categoriesResult, productsResult] = await Promise.all([
        getCategories(),
        getProducts(1, 200),
      ]);

      setCategories(categoriesResult);
      setProducts(productsResult);

      return {
        categories: categoriesResult,
        products: productsResult,
      };
    } catch (error) {
      console.error("Kunde inte hämta kategorier eller produkter:", error);
      window.alert("Det gick inte att hämta kategorier.");
      return {
        categories: [],
        products: [],
      };
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  const uncategorizedProducts = useMemo(
    () =>
      products.filter(
        (product) => product.categoryId === null || product.categoryId === undefined
      ),
    [products]
  );

  function validateCategory(
    values: AdminCategoryFormValues,
    currentId?: number
  ) {
    const name = values.name.trim();
    const slug = normalizeSlug(values.slug);
    const description = values.description.trim();
    const imageUrl = values.imageUrl?.trim() ?? "";

    if (!name) {
      window.alert("Namn är obligatoriskt.");
      return false;
    }

    if (!slug) {
      window.alert("Slug är obligatorisk.");
      return false;
    }

    if (!description) {
      window.alert("Beskrivning är obligatorisk.");
      return false;
    }

    if (name.length > 100) {
      window.alert("Namn får max vara 100 tecken.");
      return false;
    }

    if (slug.length > 120) {
      window.alert("Slug får max vara 120 tecken.");
      return false;
    }

    if (description.length > 300) {
      window.alert("Beskrivning får max vara 300 tecken.");
      return false;
    }

    if (imageUrl.length > 300) {
      window.alert("Bild-URL får max vara 300 tecken.");
      return false;
    }

    const slugExists = categories.some(
      (category) =>
        category.slug.toLowerCase() === slug.toLowerCase() &&
        category.id !== currentId
    );

    if (slugExists) {
      window.alert("Slug måste vara unik.");
      return false;
    }

    return true;
  }

  async function handleCreate(values: AdminCategoryFormValues) {
    if (!validateCategory(values)) return;

    try {
      setIsCreating(true);

      await createCategory({
        name: values.name.trim(),
        slug: normalizeSlug(values.slug),
        description: values.description.trim(),
        imageUrl: values.imageUrl?.trim() || undefined,
      });

      await loadData();
      setOpenCreate(false);
    } catch (error) {
      console.error("Kunde inte skapa kategori:", error);
      window.alert(
        getErrorMessage(error, "Det gick inte att skapa kategorin.")
      );
    } finally {
      setIsCreating(false);
    }
  }

  function handleOpenEdit(category: Category) {
    setSelectedCategory(category);
    setOpenEdit(true);
  }

  async function handleEdit(values: AdminCategoryFormValues) {
    if (!selectedCategory) return;
    if (!validateCategory(values, selectedCategory.id)) return;

    try {
      setIsUpdating(true);

      await updateCategory(selectedCategory.id, {
        name: values.name.trim(),
        slug: normalizeSlug(values.slug),
        description: values.description.trim(),
        imageUrl: values.imageUrl?.trim() || "",
      });

      const refreshed = await loadData();
      const refreshedSelectedCategory =
        refreshed.categories.find((c) => c.id === selectedCategory.id) ?? null;

      setSelectedCategory(refreshedSelectedCategory);
      setOpenEdit(false);
      setSelectedCategory(null);
    } catch (error) {
      console.error("Kunde inte uppdatera kategori:", error);
      window.alert(
        getErrorMessage(error, "Det gick inte att uppdatera kategorin.")
      );
    } finally {
      setIsUpdating(false);
    }
  }

  async function handleRemoveProductFromCategory(productId: number) {
    if (!selectedCategory) return;

    try {
      setIsRemovingProduct(true);

      await removeProductFromCategory(selectedCategory.id, productId);

      const refreshed = await loadData();
      const refreshedSelectedCategory =
        refreshed.categories.find((c) => c.id === selectedCategory.id) ?? null;

      setSelectedCategory(refreshedSelectedCategory);
    } catch (error) {
      console.error("Kunde inte ta bort produkt från kategori:", error);
      window.alert(
        getErrorMessage(
          error,
          "Det gick inte att ta bort produkten från kategorin."
        )
      );
    } finally {
      setIsRemovingProduct(false);
    }
  }

  async function handleAssignProductToCategory(productId: number) {
    if (!selectedCategory) return;

    try {
      setIsAssigningProduct(true);

      await updateProduct(productId, {
        categoryId: selectedCategory.id,
      });

      const refreshed = await loadData();
      const refreshedSelectedCategory =
        refreshed.categories.find((c) => c.id === selectedCategory.id) ?? null;

      setSelectedCategory(refreshedSelectedCategory);
    } catch (error) {
      console.error("Kunde inte lägga till produkt i kategori:", error);
      window.alert(
        getErrorMessage(
          error,
          "Det gick inte att lägga till produkten i kategorin."
        )
      );
    } finally {
      setIsAssigningProduct(false);
    }
  }

  function handleOpenDelete(category: Category) {
    if (category.products.length > 0) {
      window.alert(
        "Kategorin kan inte tas bort eftersom den har kopplade produkter."
      );
      return;
    }

    setSelectedCategory(category);
    setOpenDelete(true);
  }

  async function confirmDelete() {
    if (!selectedCategory) return;

    try {
      setIsDeleting(true);

      await deleteCategory(selectedCategory.id);
      await loadData();

      setOpenDelete(false);
      setSelectedCategory(null);
    } catch (error) {
      console.error("Kunde inte ta bort kategori:", error);
      window.alert(
        getErrorMessage(error, "Det gick inte att ta bort kategorin.")
      );
    } finally {
      setIsDeleting(false);
    }
  }

  function closeCreateModal() {
    if (isCreating) return;
    setOpenCreate(false);
  }

  function closeEditModal() {
    if (isUpdating || isRemovingProduct || isAssigningProduct) return;
    setOpenEdit(false);
    setSelectedCategory(null);
  }

  function closeDeleteModal() {
    if (isDeleting) return;
    setOpenDelete(false);
    setSelectedCategory(null);
  }

  return (
    <AdminPage>
      <section className="admin-categories-page" data-scope="categories">
        <AdminSectionHead
          level={1}
          title="Våra kategorier"
          description="Här kan du lägga till och hantera kategorier."
          actions={
            <AdminButton
              variant="primary"
              type="button"
              className="fpAdminBtn--field"
              onClick={() => setOpenCreate(true)}
            >
              <span>+ Lägg till kategori</span>
            </AdminButton>
          }
        />

        {isLoading ? (
          <section className="admin-categories-content">
            <p>Laddar kategorier...</p>
          </section>
        ) : (
          <section className="admin-categories-content">
            {categories.length === 0 ? (
              <p>Det finns inga kategorier ännu.</p>
            ) : (
              <div className="categories-grid">
                {categories.map((category) => (
                  <AdminCategoryCard
                    key={category.id}
                    category={category}
                    onEdit={() => handleOpenEdit(category)}
                    onDelete={() => handleOpenDelete(category)}
                  />
                ))}
              </div>
            )}
          </section>
        )}

        <AdminCategoryCreateModal
          isOpen={openCreate}
          onClose={closeCreateModal}
          onSubmit={handleCreate}
          isSubmitting={isCreating}
        />

        <AdminCategoryEditModal
          isOpen={openEdit}
          onClose={closeEditModal}
          onSubmit={handleEdit}
          onRemoveProduct={handleRemoveProductFromCategory}
          onAssignProduct={handleAssignProductToCategory}
          isSubmitting={isUpdating}
          isRemovingProduct={isRemovingProduct}
          isAssigningProduct={isAssigningProduct}
          category={selectedCategory}
          uncategorizedProducts={uncategorizedProducts}
        />

        <AdminConfirmModal
          isOpen={openDelete}
          onClose={closeDeleteModal}
          onConfirm={confirmDelete}
          title="Ta bort kategori"
          message={`Är du säker på att du vill ta bort ${
            selectedCategory?.name ?? "kategorin"
          }?`}
          confirmText={isDeleting ? "Tar bort..." : "Ja, ta bort"}
          cancelText="Nej"
          confirmVariant="danger"
        />
      </section>
    </AdminPage>
  );
}