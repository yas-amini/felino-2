import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import AdminPage from "../../../components/admin/layout/AdminPage";
import AdminButton from "../../../components/admin/shared/AdminButton";
import AdminConfirmModal from "../../../components/admin/shared/AdminConfirmModal";
import AdminCategoryCreateModal from "../../../components/admin/categories/AdminCategoryCreateModal";
import AdminCategoryEditModal from "../../../components/admin/categories/AdminCategoryEditModal";
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
    if (typeof window === "undefined") return;
    window.localStorage.setItem(CATEGORY_STORAGE_KEY, JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(PRODUCT_STORAGE_KEY, JSON.stringify(products));
  }, [products]);

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

    setCategories((prev) => [newCategory, ...prev]);

    setProducts((prev) =>
      prev.map((product) =>
        values.productIds.includes(product.id)
          ? { ...product, category: values.slug }
          : product
      )
    );

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

    setCategories((prev) =>
      prev.map((category) =>
        category.id === selectedCategory.id
          ? {
              ...category,
              name: values.name,
              slug: newSlug,
              description: values.description,
              image: values.image,
            }
          : category
      )
    );

    setProducts((prev) =>
      prev.map((product) => {
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
      })
    );

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

    setCategories((prev) =>
      prev.filter((category) => category.id !== selectedCategory.id)
    );

    setProducts((prev) =>
      prev.map((product) =>
        product.category === deletedSlug ? { ...product, category: "" } : product
      )
    );

    setOpenDelete(false);
    setSelectedCategory(null);
  }

  return (
    <AdminPage title="Kategorier">
      <section className="admin-settings" data-scope="categories">
        <section className="admin-section">
          <div className="categories-section-head">
            <div>
              <h2>Alla kategorier</h2>
              <p className="muted">
                Här kan du lägga till, redigera och hantera dina kategorier.
              </p>
            </div>

            <div className="categories-section-actions">
              <AdminButton
                variant="primary"
                type="button"
                onClick={() => setOpenCreate(true)}
              >
                <FontAwesomeIcon icon={faPlus} />
                <span>Lägg till kategori</span>
              </AdminButton>
            </div>
          </div>
        </section>

        <section className="admin-section">
          <div className="categories-grid">
            {categories.map((category) => {
              const productCount = products.filter(
                (product) => product.category === category.slug
              ).length;

              return (
                <article key={category.id} className="category-card">
                  <div className="category-card__image-wrap">
                    <span className="category-card__count">
                      {productCount} produkter
                    </span>

                    {category.image ? (
                      <img
                        src={category.image}
                        alt={category.name}
                        className="category-card__image"
                      />
                    ) : (
                      <div className="category-card__image category-card__image--placeholder">
                        <span>Ingen bild</span>
                      </div>
                    )}
                  </div>

                  <div className="category-card__body">
                    <div className="category-card__top">
                      <div>
                        <h3 className="category-card__title">{category.name}</h3>
                        <p className="category-card__slug">/{category.slug}</p>
                      </div>
                    </div>

                    <p className="category-card__description">
                      {category.description}
                    </p>

                    <div className="category-card__actions">
                      <AdminButton
                        preset="edit"
                        size="sm"
                        type="button"
                        aria-label={`Redigera ${category.name}`}
                        title="Redigera"
                        onClick={() => handleOpenEdit(category)}
                      />

                      <AdminButton
                        preset="delete"
                        size="sm"
                        type="button"
                        aria-label={`Ta bort ${category.name}`}
                        title="Ta bort"
                        onClick={() => handleOpenDelete(category)}
                      />
                    </div>
                  </div>
                </article>
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