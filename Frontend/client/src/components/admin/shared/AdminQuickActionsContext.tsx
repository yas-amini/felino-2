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
import AdminCampaignCreateModal from "../campaigns/AdminCampaignCreateModal";
import type { CampaignFormValues } from "../campaigns/AdminCampaignForm";
import type { Category } from "../../../types/category";
import type { CreateProductDto } from "../../../types/product";
import { getCategories } from "../../../api/admin/categoryApi";
import {
  createProduct,
  ProductApiError,
} from "../../../api/admin/productApi";

type StoredCampaign = {
  id: number;
  title: string;
  body: string;
  image?: string;
  altText?: string;
  startDate: string;
  endDate: string;
  status: "active" | "upcoming";
};

type AdminQuickActionsContextType = {
  openCreateProductModal: () => void;
  canCreateProduct: boolean;
  openCreateCampaignModal: () => void;
  canCreateCampaign: boolean;
};

const CAMPAIGN_STORAGE_KEY = "admin_campaigns";

const AdminQuickActionsContext =
  createContext<AdminQuickActionsContextType | null>(null);

function getStoredCampaigns(): StoredCampaign[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const saved = window.localStorage.getItem(CAMPAIGN_STORAGE_KEY);
    if (!saved) return [];

    const parsed = JSON.parse(saved) as unknown;
    return Array.isArray(parsed) ? (parsed as StoredCampaign[]) : [];
  } catch {
    return [];
  }
}

function getErrorMessage(error: unknown, fallbackMessage: string) {
  if (error instanceof ProductApiError) {
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

  const maybeError = error as { message?: string } | undefined;
  if (maybeError?.message) {
    return maybeError.message;
  }

  return fallbackMessage;
}

export function AdminQuickActionsProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isCreateCampaignOpen, setIsCreateCampaignOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(false);
  const [isCreatingProduct, setIsCreatingProduct] = useState(false);

  useEffect(() => {
    async function loadCategories() {
      try {
        setIsLoadingCategories(true);
        const result = await getCategories();
        setCategories(result);
      } catch (error) {
        console.error("Kunde inte hämta kategorier för quick actions:", error);
      } finally {
        setIsLoadingCategories(false);
      }
    }

    loadCategories();

    const syncCategories = async () => {
      try {
        const result = await getCategories();
        setCategories(result);
      } catch (error) {
        console.error("Kunde inte synka kategorier för quick actions:", error);
      }
    };

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
        value: String(category.id),
        label: category.name,
      })),
    [categories]
  );

  const canCreateProduct = categoryOptions.length > 0 && !isLoadingCategories;
  const canCreateCampaign = true;

  async function openCreateProductModal() {
    try {
      setIsLoadingCategories(true);
      const latestCategories = await getCategories();
      setCategories(latestCategories);

      if (latestCategories.length === 0) {
        return;
      }

      setIsCreateOpen(true);
    } catch (error) {
      console.error("Kunde inte öppna produktmodal:", error);
      window.alert("Det gick inte att hämta kategorier.");
    } finally {
      setIsLoadingCategories(false);
    }
  }

  function closeCreateProductModal() {
    if (isCreatingProduct) return;
    setIsCreateOpen(false);
  }

  async function handleCreateProduct(values: ProductFormValues) {
    if (!values.categoryId) {
      window.alert("Välj en kategori.");
      return;
    }

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
      setIsCreatingProduct(true);

      await createProduct(payload);

      window.dispatchEvent(new Event("admin-products-updated"));
      window.dispatchEvent(new Event("admin-categories-updated"));

      setIsCreateOpen(false);
    } catch (error) {
      console.error("Kunde inte skapa produkt via quick actions:", error);
      window.alert(getErrorMessage(error, "Det gick inte att skapa produkten."));
    } finally {
      setIsCreatingProduct(false);
    }
  }

  function openCreateCampaignModal() {
    setIsCreateCampaignOpen(true);
  }

  function closeCreateCampaignModal() {
    setIsCreateCampaignOpen(false);
  }

  function handleCreateCampaign(values: CampaignFormValues) {
    if (typeof window === "undefined") {
      return;
    }

    const existingCampaigns = getStoredCampaigns();
    const now = new Date();
    const start = values.startDate ? new Date(values.startDate) : null;

    const newCampaign: StoredCampaign = {
      id: Date.now(),
      title: values.title,
      body: values.body,
      image: values.image || undefined,
      altText: values.altText || "",
      startDate: values.startDate,
      endDate: values.endDate,
      status: start && start > now ? "upcoming" : "active",
    };

    const nextCampaigns = [newCampaign, ...existingCampaigns];

    try {
      window.localStorage.setItem(
        CAMPAIGN_STORAGE_KEY,
        JSON.stringify(nextCampaigns)
      );
    } catch (error) {
      console.error("Kunde inte spara kampanj i localStorage:", error);
      window.alert(
        "Kampanjen kunde inte sparas eftersom lokal lagring är full. Rensa sparade bilder/data i localStorage och försök igen."
      );
      return;
    }

    window.dispatchEvent(new Event("admin-campaigns-updated"));
    setIsCreateCampaignOpen(false);
  }

  return (
    <AdminQuickActionsContext.Provider
      value={{
        openCreateProductModal,
        canCreateProduct,
        openCreateCampaignModal,
        canCreateCampaign,
      }}
    >
      {children}

      <AdminProductCreateModal
        isOpen={isCreateOpen}
        onClose={closeCreateProductModal}
        onSubmit={handleCreateProduct}
        categories={categoryOptions}
        isSubmitting={isCreatingProduct}
      />

      <AdminCampaignCreateModal
        isOpen={isCreateCampaignOpen}
        onClose={closeCreateCampaignModal}
        onSubmit={handleCreateCampaign}
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