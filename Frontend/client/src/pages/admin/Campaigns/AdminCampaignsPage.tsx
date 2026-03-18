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

import "./AdminCampaignsPage.css";

type Campaign = {
  id: number;
  title: string;
  body: string;
  image?: string;
  altText?: string;
  startDate: string;
  endDate: string;
  status: "active" | "upcoming";
};

const CAMPAIGN_STORAGE_KEY = "admin_campaigns";

const fallbackCampaigns: Campaign[] = [
  {
    id: 1,
    title: "2 för 1 på valfria pizzor",
    body: "Gäller måndag till torsdag mellan 14:00 och 20:00.",
    image: "/images/site/campaigns/cheeseburger.jpg",
    altText: "Två pizzor på ett bord",
    startDate: "2026-03-01T14:00",
    endDate: "2026-03-31T20:00",
    status: "active",
  },
  {
    id: 2,
    title: "Gratis dryck till familjepizza",
    body: "Vid köp av familjepizza ingår valfri 33 cl dryck.",
    image: "/images/site/campaigns/pizzaaaa.jpg",
    altText: "Familjepizza med dryck",
    startDate: "2026-03-10T11:00",
    endDate: "2026-03-25T22:00",
    status: "active",
  },
  {
    id: 3,
    title: "Helgerbjudande med dessert",
    body: "Beställ två huvudrätter och få en dessert på köpet.",
    image: "/images/site/campaigns/pizzeria1.jpg",
    altText: "Dessert bredvid pizza",
    startDate: "2026-04-05T12:00",
    endDate: "2026-04-20T22:00",
    status: "upcoming",
  },
  {
    id: 4,
    title: "Studentkampanj",
    body: "Visa studentlegitimation och få 15% rabatt på utvalda pizzor.",
    image: "/images/site/campaigns/cheeseburger.jpg",
    altText: "Student med pizzakartong",
    startDate: "2026-04-15T11:00",
    endDate: "2026-05-01T22:00",
    status: "upcoming",
  },
];

function getStoredCampaigns(): Campaign[] {
  if (typeof window === "undefined") {
    return fallbackCampaigns;
  }

  try {
    const saved = window.localStorage.getItem(CAMPAIGN_STORAGE_KEY);
    if (!saved) return fallbackCampaigns;

    const parsed = JSON.parse(saved) as unknown;
    return Array.isArray(parsed) ? (parsed as Campaign[]) : fallbackCampaigns;
  } catch {
    return fallbackCampaigns;
  }
}

function saveCampaigns(nextCampaigns: Campaign[]) {
  if (typeof window === "undefined") return;

  window.localStorage.setItem(
    CAMPAIGN_STORAGE_KEY,
    JSON.stringify(nextCampaigns)
  );
  window.dispatchEvent(new Event("admin-campaigns-updated"));
}

function AdminCampaignsPageContent() {
  const [campaigns, setCampaigns] = useState<Campaign[]>(() =>
    getStoredCampaigns()
  );
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(
    null
  );

  const { openCreateCampaignModal } = useAdminQuickActions();

  useEffect(() => {
    const syncCampaigns = () => {
      setCampaigns(getStoredCampaigns());
    };

    syncCampaigns();

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

  function handleEditSubmit(values: CampaignFormValues) {
    if (!selectedCampaign) return;

    const now = new Date();
    const start = values.startDate ? new Date(values.startDate) : null;
    const nextStatus: Campaign["status"] =
      start && start > now ? "upcoming" : "active";

    const nextCampaigns: Campaign[] = campaigns.map((campaign) =>
      campaign.id === selectedCampaign.id
        ? {
            ...campaign,
            title: values.title,
            body: values.body,
            image: values.image || undefined,
            altText: values.altText || "",
            startDate: values.startDate,
            endDate: values.endDate,
            status: nextStatus,
          }
        : campaign
    );

    setCampaigns(nextCampaigns);
    saveCampaigns(nextCampaigns);

    setOpenEdit(false);
    setSelectedCampaign(null);
  }

  function handleOpenDelete(campaign: Campaign) {
    setSelectedCampaign(campaign);
    setOpenDelete(true);
  }

  function confirmDelete() {
    if (!selectedCampaign) return;

    const nextCampaigns: Campaign[] = campaigns.filter(
      (campaign) => campaign.id !== selectedCampaign.id
    );

    setCampaigns(nextCampaigns);
    saveCampaigns(nextCampaigns);

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
      </section>

      <AdminCampaignEditModal
        isOpen={openEdit}
        onClose={() => {
          setOpenEdit(false);
          setSelectedCampaign(null);
        }}
        onSubmit={handleEditSubmit}
        initialValues={
          selectedCampaign
            ? {
                title: selectedCampaign.title,
                body: selectedCampaign.body,
                image: selectedCampaign.image ?? "",
                altText: selectedCampaign.altText ?? "",
                startDate: selectedCampaign.startDate,
                endDate: selectedCampaign.endDate,
              }
            : {
                title: "",
                body: "",
                image: "",
                altText: "",
                startDate: "",
                endDate: "",
              }
        }
      />

      <AdminConfirmModal
        isOpen={openDelete}
        onClose={() => {
          setOpenDelete(false);
          setSelectedCampaign(null);
        }}
        onConfirm={confirmDelete}
        title="Ta bort kampanj"
        message={`Är du säker på att du vill ta bort ${
          selectedCampaign?.title ?? "kampanjen"
        }?`}
        confirmText="Ja, ta bort"
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
      <AdminCampaignsPageContent />
    </AdminPage>
  );
}