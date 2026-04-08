import { useEffect, useState } from "react";
import AdminPage from "../../../components/admin/layout/AdminPage";
import { useAdminTopbar } from "../../../components/admin/useAdminTopbar";
import AdminButton from "../../../components/admin/shared/AdminButton";
import AdminCampaignCard from "../../../components/admin/campaigns/AdminCampaignCard";
import AdminConfirmModal from "../../../components/admin/shared/AdminConfirmModal";
import AdminCampaignEditModal from "../../../components/admin/campaigns/AdminCampaignEditModal";
import AdminSectionHead from "../../../components/admin/shared/AdminSectionHead";
import type { CampaignFormValues } from "../../../components/admin/campaigns/AdminCampaignForm";
import { useAdminQuickActions } from "../../../components/admin/shared/AdminQuickActionsContext";

import type { Campaign } from "../../../types/campaign";
import {
  deleteCampaign,
  getCampaigns,
  updateCampaign,
} from "../../../api/admin/campaignsApi";
import { mapCampaignFromApi } from "../../../utils/campaignUtils";

import "./AdminCampaignsPage.css";

function toDateTimeLocalValue(dateString: string) {
  if (!dateString) return "";

  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  const pad = (value: number) => String(value).padStart(2, "0");

  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());

  return `${year}-${month}-${day}T${hours}:${minutes}`;
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

function getErrorMessage(error: unknown, fallbackMessage: string) {
  if (error instanceof Error && error.message) {
    return error.message;
  }

  return fallbackMessage;
}

function CampaignsPageContent() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const { openCreateCampaignModal } = useAdminQuickActions();

  async function loadData() {
    try {
      setIsLoading(true);

      const result = await getCampaigns();
      setCampaigns(result.map(mapCampaignFromApi));
    } catch (error) {
      console.error("Kunde inte hämta kampanjer:", error);
      window.alert(getErrorMessage(error, "Det gick inte att hämta kampanjer."));
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadData();

    const syncCampaigns = () => {
      loadData();
    };

    window.addEventListener("focus", syncCampaigns);
    window.addEventListener(
      "admin-campaigns-updated",
      syncCampaigns as EventListener
    );

    return () => {
      window.removeEventListener("focus", syncCampaigns);
      window.removeEventListener(
        "admin-campaigns-updated",
        syncCampaigns as EventListener
      );
    };
  }, []);

  function handleOpenEdit(campaign: Campaign) {
    setSelectedCampaign(campaign);
    setOpenEdit(true);
  }

  async function handleEditSubmit(values: CampaignFormValues) {
    if (!selectedCampaign) return;
    if (!validateCampaign(values)) return;

    try {
      setIsUpdating(true);

      await updateCampaign(selectedCampaign.id, {
        title: values.title.trim(),
        body: values.body.trim(),
        imageUrl: values.imageUrl.trim() || null,
        altText: values.altText.trim() || null,
        startDate: values.startDate,
        endDate: values.endDate,
      });

      await loadData();
      setOpenEdit(false);
      setSelectedCampaign(null);
    } catch (error) {
      console.error("Kunde inte uppdatera kampanj:", error);
      window.alert(
        getErrorMessage(error, "Det gick inte att uppdatera kampanjen.")
      );
    } finally {
      setIsUpdating(false);
    }
  }

  function handleOpenDelete(campaign: Campaign) {
    setSelectedCampaign(campaign);
    setOpenDelete(true);
  }

  async function confirmDelete() {
    if (!selectedCampaign) return;

    try {
      setIsDeleting(true);

      await deleteCampaign(selectedCampaign.id);
      await loadData();

      setOpenDelete(false);
      setSelectedCampaign(null);
    } catch (error) {
      console.error("Kunde inte ta bort kampanj:", error);
      window.alert(getErrorMessage(error, "Det gick inte att ta bort kampanjen."));
    } finally {
      setIsDeleting(false);
    }
  }

  function closeEditModal() {
    if (isUpdating) return;
    setOpenEdit(false);
    setSelectedCampaign(null);
  }

  function closeDeleteModal() {
    if (isDeleting) return;
    setOpenDelete(false);
    setSelectedCampaign(null);
  }

  return (
    <section className="admin-campaigns-page" data-scope="campaigns">
      <AdminSectionHead
        level={1}
        title="Våra kampanjer"
        description="Här kan du lägga till, redigera och hantera kampanjer."
        actions={
          <AdminButton
            variant="primary"
            type="button"
            onClick={openCreateCampaignModal}
            className="fpAdminBtn--field"
          >
            <span>+ Lägg till kampanj</span>
          </AdminButton>
        }
      />

      <section className="admin-campaigns-content">
        {isLoading ? (
          <section className="campaigns-empty-state">
            <p className="campaigns-empty-message">Laddar kampanjer...</p>
          </section>
        ) : campaigns.length === 0 ? (
          <section className="campaigns-empty-state">
            <p className="campaigns-empty-message">
              Det finns inga kampanjer ännu.
            </p>
          </section>
        ) : (
          <div className="campaigns-grid">
            {campaigns.map((campaign) => (
              <AdminCampaignCard
                key={campaign.id}
                campaign={campaign}
                onEdit={() => handleOpenEdit(campaign)}
                onDelete={() => handleOpenDelete(campaign)}
              />
            ))}
          </div>
        )}
      </section>

      <AdminCampaignEditModal
        isOpen={openEdit}
        onClose={closeEditModal}
        onSubmit={handleEditSubmit}
        isSubmitting={isUpdating}
        initialValues={
          selectedCampaign
            ? {
                title: selectedCampaign.title,
                body: selectedCampaign.body,
                imageUrl: selectedCampaign.image ?? "",
                altText: selectedCampaign.altText ?? "",
                startDate: toDateTimeLocalValue(selectedCampaign.startDate),
                endDate: toDateTimeLocalValue(selectedCampaign.endDate),
              }
            : {
                title: "",
                body: "",
                imageUrl: "",
                altText: "",
                startDate: "",
                endDate: "",
              }
        }
      />

      <AdminConfirmModal
        isOpen={openDelete}
        onClose={closeDeleteModal}
        onConfirm={confirmDelete}
        title="Ta bort kampanj"
        message={`Är du säker på att du vill ta bort ${
          selectedCampaign?.title ?? "kampanjen"
        }?`}
        confirmText={isDeleting ? "Tar bort..." : "Ja, ta bort"}
        cancelText="Nej"
        confirmVariant="danger"
      />
    </section>
  );
}

export default function AdminCampaignsPage() {
  useAdminTopbar("Kampanjer");

  return (
    <AdminPage>
      <CampaignsPageContent />
    </AdminPage>
  );
}