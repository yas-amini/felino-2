import { useEffect, useState } from "react";
import AdminPage from "../../../components/admin/layout/AdminPage";
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
  image?: string;
};

type StoredProduct = {
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

export default function AdminCategoriesPage() {
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

  function getCategoryProductIds(categorySlug: string): number[] {
    return products
      .filter((product) => product.category === categorySlug)
      .map((product) => product.id);
  }

  function handleCreate(values: AdminCategoryFormValues) {
    const newCategory: Category = {
      id: Date.now(),
      name: values.name,
      slug: values.slug,
      description: values.description,
      image: values.image,
    };

    const nextCategories = [newCategory, ...categories];
    const nextProducts = products.map((product) =>
      values.productIds.includes(product.id)
        ? { ...product, category: values.slug }
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

    const oldSlug = selectedCategory.slug;
    const newSlug = values.slug;

    const nextCategories = categories.map((category) =>
      category.id === selectedCategory.id
        ? {
            ...category,
            name: values.name,
            slug: newSlug,
            description: values.description,
            image: values.image,
          }
        : category
    );

    const nextProducts = products.map((product) => {
      const wasInThisCategory = product.category === oldSlug;
      const shouldBeInThisCategory = values.productIds.includes(product.id);

      if (shouldBeInThisCategory) {
        return {
          ...product,
          category: newSlug,
        };
      }

      if (wasInThisCategory) {
        return {
          ...product,
          category: "",
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
    setSelectedCategory(category);
    setOpenDelete(true);
  }

  function confirmDelete() {
    if (!selectedCategory) return;

    const deletedSlug = selectedCategory.slug;

    const nextCategories = categories.filter(
      (category) => category.id !== selectedCategory.id
    );

    const nextProducts = products.map((product) =>
      product.category === deletedSlug ? { ...product, category: "" } : product
    );

    setCategories(nextCategories);
    setProducts(nextProducts);

    saveCategories(nextCategories);
    saveProducts(nextProducts);

    setOpenDelete(false);
    setSelectedCategory(null);
  }

  return (
    <AdminPage title="Kategorier">
      <section className="admin-categories-page" data-scope="categories">
        <AdminSectionHead
  level={1}
  title="Alla kategorier"
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
                (product) => product.category === category.slug
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
                  productIds: getCategoryProductIds(selectedCategory.slug),
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