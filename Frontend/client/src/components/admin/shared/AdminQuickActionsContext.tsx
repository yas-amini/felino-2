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
import {
  createCampaign,
  CampaignApiError,
} from "../../../api/admin/campaignsApi";

type AdminQuickActionsContextType = {
  openCreateProductModal: () => void;
  canCreateProduct: boolean;
  openCreateCampaignModal: () => void;
  canCreateCampaign: boolean;
};

const AdminQuickActionsContext =
  createContext<AdminQuickActionsContextType | null>(null);

function getErrorMessage(error: unknown, fallbackMessage: string) {
  if (error instanceof ProductApiError || error instanceof CampaignApiError) {
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

function validateCampaign(values: CampaignFormValues) {
  const title = values.title.trim();
  const body = values.body.trim();
  const imageUrl = values.imageUrl.trim();
  const altText = values.altText.trim();
  const startDate = values.startDate.trim();
  const endDate = values.endDate.trim();

  if (!title) {
    window.alert("Rubrik är obligatorisk.");
    return false;
  }

  if (title.length > 100) {
    window.alert("Rubrik får max vara 100 tecken.");
    return false;
  }

  if (!body) {
    window.alert("Brödtext är obligatorisk.");
    return false;
  }

  if (body.length > 200) {
    window.alert("Brödtext får max vara 200 tecken.");
    return false;
  }

  if (imageUrl.length > 300) {
    window.alert("Bild-URL får max vara 300 tecken.");
    return false;
  }

  if (altText.length > 200) {
    window.alert("Alt-text får max vara 200 tecken.");
    return false;
  }

  if (!startDate) {
    window.alert("Startdatum är obligatoriskt.");
    return false;
  }

  if (!endDate) {
    window.alert("Slutdatum är obligatoriskt.");
    return false;
  }

  const start = new Date(startDate);
  const end = new Date(endDate);

  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
    window.alert("Ange giltiga datum.");
    return false;
  }

  if (end < start) {
    window.alert("Slutdatum kan inte vara tidigare än startdatum.");
    return false;
  }

  return true;
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
  const [isCreatingCampaign, setIsCreatingCampaign] = useState(false);

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
    if (isCreatingCampaign) return;
    setIsCreateCampaignOpen(false);
  }

  async function handleCreateCampaign(values: CampaignFormValues) {
    if (!validateCampaign(values)) return;

    try {
      setIsCreatingCampaign(true);

      await createCampaign({
        title: values.title.trim(),
        body: values.body.trim(),
        imageUrl: values.imageUrl.trim() || null,
        altText: values.altText.trim() || null,
        startDate: values.startDate,
        endDate: values.endDate,
      });

      window.dispatchEvent(new Event("admin-campaigns-updated"));
      setIsCreateCampaignOpen(false);
    } catch (error) {
      console.error("Kunde inte skapa kampanj via quick actions:", error);
      window.alert(getErrorMessage(error, "Det gick inte att skapa kampanjen."));
    } finally {
      setIsCreatingCampaign(false);
    }
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
        isSubmitting={isCreatingCampaign}
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