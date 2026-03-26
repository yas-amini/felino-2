import { useEffect, useState } from "react";
import AdminPage from "../../../components/admin/layout/AdminPage";
import { useAdminTopbar } from "../../../components/admin/useAdminTopbar";
import AdminButton from "../../../components/admin/shared/AdminButton";
import AdminConfirmModal from "../../../components/admin/shared/AdminConfirmModal";
import AdminSectionHead from "../../../components/admin/shared/AdminSectionHead";
import AdminCategoryCreateModal from "../../../components/admin/categories/AdminCategoryCreateModal";
import AdminCategoryEditModal from "../../../components/admin/categories/AdminCategoryEditModal";
import AdminCategoryCard from "../../../components/admin/categories/AdminCategoryCard";
import type {
  AdminCategoryFormValues,
  ProductItem,
} from "../../../components/admin/categories/AdminCategoryForm";

import "./AdminCategoriesPage.css";

type Category = {
  id: number;
  name: string;
  slug: string;
  description: string;
  imageUrl?: string;
};

type StoredProduct = {
  id: number;
  categoryId: number | null;
  name: string;
  ingredients: string;
  price: string;
  sauce?: string;
  altText?: string;
  image?: string;
};

const CATEGORY_STORAGE_KEY = "admin_categories";
const PRODUCT_STORAGE_KEY = "admin_products";

function getStoredCategories(): Category[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const saved = window.localStorage.getItem(CATEGORY_STORAGE_KEY);
    if (!saved) return [];

    const parsed = JSON.parse(saved) as unknown;
    return Array.isArray(parsed) ? (parsed as Category[]) : [];
  } catch {
    return [];
  }
}

function getStoredProducts(): StoredProduct[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const saved = window.localStorage.getItem(PRODUCT_STORAGE_KEY);
    if (!saved) return [];

    const parsed = JSON.parse(saved) as unknown;
    return Array.isArray(parsed) ? (parsed as StoredProduct[]) : [];
  } catch {
    return [];
  }
}

function saveCategories(nextCategories: Category[]) {
  if (typeof window === "undefined") return;

  window.localStorage.setItem(
    CATEGORY_STORAGE_KEY,
    JSON.stringify(nextCategories)
  );
  window.dispatchEvent(new Event("admin-categories-updated"));
}

function saveProducts(nextProducts: StoredProduct[]) {
  if (typeof window === "undefined") return;

  window.localStorage.setItem(PRODUCT_STORAGE_KEY, JSON.stringify(nextProducts));
  window.dispatchEvent(new Event("admin-products-updated"));
}

function normalizeSlug(value: string) {
  return value.trim().toLowerCase();
}

export default function AdminCategoriesPage() {
  useAdminTopbar("Kategorier");

  const [categories, setCategories] = useState<Category[]>(() =>
    getStoredCategories()
  );
  const [products, setProducts] = useState<StoredProduct[]>(() =>
    getStoredProducts()
  );
  const [openCreate, setOpenCreate] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  useEffect(() => {
    const syncData = () => {
      setCategories(getStoredCategories());
      setProducts(getStoredProducts());
    };

    syncData();

    window.addEventListener("focus", syncData);
    window.addEventListener(
      "admin-categories-updated",
      syncData as EventListener
    );
    window.addEventListener("admin-products-updated", syncData as EventListener);

    return () => {
      window.removeEventListener("focus", syncData);
      window.removeEventListener(
        "admin-categories-updated",
        syncData as EventListener
      );
      window.removeEventListener(
        "admin-products-updated",
        syncData as EventListener
      );
    };
  }, []);

  const allProductsForForm: ProductItem[] = products.map((product) => ({
    id: product.id,
    name: product.name,
  }));

  function getCategoryProductIds(categoryId: number): number[] {
    return products
      .filter((product) => product.categoryId === categoryId)
      .map((product) => product.id);
  }

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

  function handleCreate(values: AdminCategoryFormValues) {
    if (!validateCategory(values)) return;

    const newCategory: Category = {
      id: Date.now(),
      name: values.name.trim(),
      slug: normalizeSlug(values.slug),
      description: values.description.trim(),
      imageUrl: values.imageUrl?.trim() || undefined,
    };

    const nextCategories = [newCategory, ...categories];
    const nextProducts = products.map((product) =>
      values.productIds.includes(product.id)
        ? { ...product, categoryId: newCategory.id }
        : product
    );

    setCategories(nextCategories);
    setProducts(nextProducts);

    saveCategories(nextCategories);
    saveProducts(nextProducts);

    setOpenCreate(false);
  }

  function handleOpenEdit(category: Category) {
    setSelectedCategory(category);
    setOpenEdit(true);
  }

  function handleEditSubmit(values: AdminCategoryFormValues) {
    if (!selectedCategory) return;
    if (!validateCategory(values, selectedCategory.id)) return;

    const nextCategories = categories.map((category) =>
      category.id === selectedCategory.id
        ? {
            ...category,
            name: values.name.trim(),
            slug: normalizeSlug(values.slug),
            description: values.description.trim(),
            imageUrl: values.imageUrl?.trim() || undefined,
          }
        : category
    );

    const nextProducts = products.map((product) => {
      const wasInThisCategory = product.categoryId === selectedCategory.id;
      const shouldBeInThisCategory = values.productIds.includes(product.id);

      if (shouldBeInThisCategory) {
        return {
          ...product,
          categoryId: selectedCategory.id,
        };
      }

      if (wasInThisCategory) {
        return {
          ...product,
          categoryId: null,
        };
      }

      return product;
    });

    setCategories(nextCategories);
    setProducts(nextProducts);

    saveCategories(nextCategories);
    saveProducts(nextProducts);

    setOpenEdit(false);
    setSelectedCategory(null);
  }

  function handleOpenDelete(category: Category) {
    const hasProducts = products.some(
      (product) => product.categoryId === category.id
    );

    if (hasProducts) {
      alert("Kategorin kan inte tas bort eftersom den har kopplade produkter.");
      return;
    }

    setSelectedCategory(category);
    setOpenDelete(true);
  }

  function confirmDelete() {
    if (!selectedCategory) return;

    const nextCategories = categories.filter(
      (category) => category.id !== selectedCategory.id
    );

    setCategories(nextCategories);
    saveCategories(nextCategories);

    setOpenDelete(false);
    setSelectedCategory(null);
  }

  return (
    <AdminPage>
      <section className="admin-categories-page" data-scope="categories">
        <AdminSectionHead
          level={1}
          title="Våra kategorier"
          description="Här kan du lägga till, redigera och hantera kategorier."
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

        <section className="admin-categories-content">
          <div className="categories-grid">
            {categories.map((category) => {
              const productCount = products.filter(
                (product) => product.categoryId === category.id
              ).length;

              return (
                <AdminCategoryCard
                  key={category.id}
                  category={category}
                  productCount={productCount}
                  onEdit={() => handleOpenEdit(category)}
                  onDelete={() => handleOpenDelete(category)}
                />
              );
            })}
          </div>
        </section>

        <AdminCategoryCreateModal
          isOpen={openCreate}
          onClose={() => setOpenCreate(false)}
          onSubmit={handleCreate}
          allProducts={allProductsForForm}
        />

        <AdminCategoryEditModal
          isOpen={openEdit}
          onClose={() => {
            setOpenEdit(false);
            setSelectedCategory(null);
          }}
          onSubmit={handleEditSubmit}
          allProducts={allProductsForForm}
          category={
            selectedCategory
              ? {
                  ...selectedCategory,
                  productIds: getCategoryProductIds(selectedCategory.id),
                }
              : null
          }
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