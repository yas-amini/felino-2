import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import AdminProductCreateModal from "../products/AdminProductCreateModal";
import type {
  ProductCategoryOption,
  ProductFormValues,
} from "../products/AdminProductForm";

type StoredCategory = {
  id: number;
  name: string;
  slug: string;
  description: string;
  image?: string;
  productIds: number[];
  productCount: number;
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

type AdminQuickActionsContextType = {
  openCreateProductModal: () => void;
  canCreateProduct: boolean;
};

const CATEGORY_STORAGE_KEY = "admin_categories";
const PRODUCT_STORAGE_KEY = "admin_products";

const AdminQuickActionsContext =
  createContext<AdminQuickActionsContextType | null>(null);

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

export function AdminQuickActionsProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [categories, setCategories] = useState<StoredCategory[]>([]);

  useEffect(() => {
    const syncCategories = () => {
      setCategories(getStoredCategories());
    };

    syncCategories();

    window.addEventListener("focus", syncCategories);
    window.addEventListener(
      "admin-categories-updated",
      syncCategories as EventListener
    );

    return () => {
      window.removeEventListener("focus", syncCategories);
      window.removeEventListener(
        "admin-categories-updated",
        syncCategories as EventListener
      );
    };
  }, []);

  const categoryOptions: ProductCategoryOption[] = useMemo(
    () =>
      categories.map((category) => ({
        value: category.slug,
        label: category.name,
      })),
    [categories]
  );

  const canCreateProduct = categoryOptions.length > 0;

  function openCreateProductModal() {
    const latestCategories = getStoredCategories();
    setCategories(latestCategories);

    if (latestCategories.length === 0) {
      return;
    }

    setIsCreateOpen(true);
  }

  function closeCreateProductModal() {
    setIsCreateOpen(false);
  }

  function handleCreateProduct(values: ProductFormValues) {
    if (!values.category || typeof window === "undefined") {
      return;
    }

    const existingProducts = getStoredProducts();

    const newProduct: StoredProduct = {
      id: Date.now(),
      category: values.category,
      name: values.name,
      ingredients: values.ingredients,
      price: values.price,
      sauce: values.sauce || "",
      altText: values.altText || "",
      image: values.image,
    };

    window.localStorage.setItem(
      PRODUCT_STORAGE_KEY,
      JSON.stringify([newProduct, ...existingProducts])
    );

    window.dispatchEvent(new Event("admin-products-updated"));
    setIsCreateOpen(false);
  }

  return (
    <AdminQuickActionsContext.Provider
      value={{ openCreateProductModal, canCreateProduct }}
    >
      {children}

      <AdminProductCreateModal
        isOpen={isCreateOpen}
        onClose={closeCreateProductModal}
        onSubmit={handleCreateProduct}
        categories={categoryOptions}
      />
    </AdminQuickActionsContext.Provider>
  );
}

export function useAdminQuickActions() {
  const context = useContext(AdminQuickActionsContext);

  if (!context) {
    throw new Error("useAdminQuickActions måste användas inside AdminPage.");
  }

  return context;
}