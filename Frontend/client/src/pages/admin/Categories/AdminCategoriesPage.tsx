import { useEffect, useState } from "react";
import AdminPage from "../../../components/admin/layout/AdminPage";
import { useAdminTopbar } from "../../../components/admin/useAdminTopbar";
import AdminButton from "../../../components/admin/shared/AdminButton";
import AdminConfirmModal from "../../../components/admin/shared/AdminConfirmModal";
import AdminSectionHead from "../../../components/admin/shared/AdminSectionHead";
import AdminCategoryCreateModal from "../../../components/admin/categories/AdminCategoryCreateModal";
import AdminCategoryCard from "../../../components/admin/categories/AdminCategoryCard";
import type { AdminCategoryFormValues } from "../../../components/admin/categories/AdminCategoryForm";
import type { CategoryDto, CreateCategoryDto } from "../../../types/admin";
import {
  createCategory,
  deleteCategory,
  getCategories,
} from "../../../api/admin/categoryApi";
import { normalizeSlug } from "../../../utils/slug";

import "./AdminCategoriesPage.css";

export default function AdminCategoriesPage() {
  useAdminTopbar("Kategorier");

  const [categories, setCategories] = useState<CategoryDto[]>([]);
  const [openCreate, setOpenCreate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<CategoryDto | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  async function loadCategories() {
    try {
      setIsLoading(true);
      const result = await getCategories();
      setCategories(result);
    } catch (error) {
      console.error("Kunde inte hämta kategorier:", error);
      window.alert("Det gick inte att hämta kategorier.");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadCategories();
  }, []);

  function validateCategory(values: AdminCategoryFormValues, currentId?: number) {
    const name = values.name.trim();
    const slug = normalizeSlug(values.slug);
    const description = values.description.trim();
    const imageUrl = values.imageUrl?.trim() ?? "";

    if (!name) {
      alert("Namn är obligatoriskt.");
      return false;
    }

    if (!slug) {
      alert("Slug är obligatorisk.");
      return false;
    }

    if (!description) {
      alert("Beskrivning är obligatorisk.");
      return false;
    }

    if (name.length > 100) {
      alert("Namn får max vara 100 tecken.");
      return false;
    }

    if (slug.length > 120) {
      alert("Slug får max vara 120 tecken.");
      return false;
    }

    if (description.length > 300) {
      alert("Beskrivning får max vara 300 tecken.");
      return false;
    }

    if (imageUrl.length > 300) {
      alert("Bild-URL får max vara 300 tecken.");
      return false;
    }

    const slugExists = categories.some(
      (category) =>
        category.slug.toLowerCase() === slug &&
        category.id !== currentId
    );

    if (slugExists) {
      alert("Slug måste vara unik.");
      return false;
    }

    return true;
  }

  async function handleCreate(values: AdminCategoryFormValues) {
    if (!validateCategory(values)) return;

    const payload: CreateCategoryDto = {
      name: values.name.trim(),
      slug: normalizeSlug(values.slug),
      description: values.description.trim(),
      imageUrl: values.imageUrl?.trim() || undefined,
    };

    try {
      await createCategory(payload);
      await loadCategories();
      setOpenCreate(false);
    } catch (error) {
      console.error("Kunde inte skapa kategori:", error);
      window.alert("Det gick inte att skapa kategorin.");
    }
  }

  function handleOpenEdit() {
    window.alert("Redigering av kategori kommer när PATCH är på plats.");
  }

  function handleOpenDelete(category: CategoryDto) {
    const hasProducts = category.products.length > 0;

    if (hasProducts) {
      window.alert("Kategorin kan inte tas bort eftersom den har kopplade produkter.");
      return;
    }

    setSelectedCategory(category);
    setOpenDelete(true);
  }

  async function confirmDelete() {
    if (!selectedCategory) return;

    try {
      await deleteCategory(selectedCategory.id);
      await loadCategories();

      setOpenDelete(false);
      setSelectedCategory(null);
    } catch (error) {
      console.error("Kunde inte ta bort kategori:", error);
      window.alert("Det gick inte att ta bort kategorin.");
    }
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
            <div className="categories-grid">
              {categories.map((category) => (
                <AdminCategoryCard
                  key={category.id}
                  category={category}
                  productCount={category.products.length}
                  onEdit={handleOpenEdit}
                  onDelete={() => handleOpenDelete(category)}
                />
              ))}
            </div>
          </section>
        )}

        <AdminCategoryCreateModal
          isOpen={openCreate}
          onClose={() => setOpenCreate(false)}
          onSubmit={handleCreate}
        />

        <AdminConfirmModal
          isOpen={openDelete}
          onClose={() => {
            setOpenDelete(false);
            setSelectedCategory(null);
          }}
          onConfirm={confirmDelete}
          title="Ta bort kategori"
          message={`Är du säker på att du vill ta bort ${
            selectedCategory?.name ?? "kategorin"
          }?`}
          confirmText="Ja, ta bort"
          cancelText="Nej"
          confirmVariant="danger"
        />
      </section>
    </AdminPage>
  );
}