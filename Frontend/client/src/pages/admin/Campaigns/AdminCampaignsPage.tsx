import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import AdminPage from "../../../components/admin/layout/AdminPage";
import AdminButton from "../../../components/admin/shared/AdminButton";
import AdminConfirmModal from "../../../components/admin/shared/AdminConfirmModal";
import AdminCampaignEditModal from "../../../components/admin/campaigns/AdminCampaignEditModal";
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
    <section className="admin-settings" data-scope="campaigns">
      <section className="admin-section">
        <div className="campaigns-section-head">
          <div>
            <h2>Alla kampanjer</h2>
            <p className="muted">
              Här kan du lägga till, redigera och schemalägga dina kampanjer.
            </p>
          </div>

          <div className="campaigns-section-actions">
            <AdminButton
              variant="primary"
              type="button"
              onClick={openCreateCampaignModal}
            >
              <FontAwesomeIcon icon={faPlus} />
              <span>Lägg till kampanj</span>
            </AdminButton>
          </div>
        </div>
      </section>

      <section className="admin-section">
        <div className="campaigns-grid">
          {campaigns.map((campaign) => (
            <article key={campaign.id} className="campaign-card">
              <div className="campaign-card__image-wrap">
                <span
                  className={`campaign-card__status ${
                    campaign.status === "active"
                      ? "campaign-card__status--active"
                      : "campaign-card__status--upcoming"
                  }`}
                >
                  {campaign.status === "active" ? "Aktiv" : "Kommande"}
                </span>

                {campaign.image ? (
                  <img
                    src={campaign.image}
                    alt={campaign.altText || campaign.title}
                    className="campaign-card__image"
                  />
                ) : (
                  <div className="campaign-card__image campaign-card__image--placeholder">
                    <span>Ingen bild</span>
                  </div>
                )}
              </div>

              <div className="campaign-card__body">
                <div className="campaign-card__top">
                  <div>
                    <h3 className="campaign-card__title">{campaign.title}</h3>
                    <p className="campaign-card__dates">
                      {campaign.startDate} – {campaign.endDate}
                    </p>
                  </div>
                </div>

                <p className="campaign-card__description">{campaign.body}</p>

                <div className="campaign-card__actions">
                  <AdminButton
                    preset="edit"
                    size="sm"
                    type="button"
                    aria-label={`Redigera ${campaign.title}`}
                    title="Redigera"
                    onClick={() => handleOpenEdit(campaign)}
                  />

                  <AdminButton
                    preset="delete"
                    size="sm"
                    type="button"
                    aria-label={`Ta bort ${campaign.title}`}
                    title="Ta bort"
                    onClick={() => handleOpenDelete(campaign)}
                  />
                </div>
              </div>
            </article>
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
  return (
    <AdminPage title="Kampanjer">
      <AdminCampaignsPageContent />
    </AdminPage>
  );
}