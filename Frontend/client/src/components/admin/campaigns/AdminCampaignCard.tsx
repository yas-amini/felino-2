import AdminButton from "../shared/AdminButton";
import AdminEntityCard from "../shared/AdminEntityCard";
import type { Campaign } from "../../../types/campaign";

type Props = {
  campaign: Campaign;
  onEdit: () => void;
  onDelete: () => void;
};

function formatDate(dateString: string) {
  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) {
    return dateString;
  }

  return new Intl.DateTimeFormat("sv-SE", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

function getStatusLabel(status: Campaign["status"]) {
  switch (status) {
    case "active":
      return "Aktiv";
    case "upcoming":
      return "Kommande";
    case "expired":
      return "Avslutad";
    default:
      return "";
  }
}

function getStatusClass(status: Campaign["status"]) {
  switch (status) {
    case "active":
      return "campaign-card__status--active";
    case "upcoming":
      return "campaign-card__status--upcoming";
    case "expired":
      return "campaign-card__status--expired";
    default:
      return "";
  }
}

export default function AdminCampaignCard({
  campaign,
  onEdit,
  onDelete,
}: Props) {
  return (
    <AdminEntityCard
      media={
        <>
          <span
            className={`campaign-card__status ${getStatusClass(campaign.status)}`}
          >
            {getStatusLabel(campaign.status)}
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
        </>
      }
      bodyTop={
        <div>
          <h3 className="campaign-card__title">{campaign.title}</h3>
          <p className="campaign-card__dates">
            {formatDate(campaign.startDate)} – {formatDate(campaign.endDate)}
          </p>
        </div>
      }
      description={<p className="campaign-card__description">{campaign.body}</p>}
      actions={
        <>
          <AdminButton
            preset="edit"
            size="sm"
            type="button"
            aria-label={`Redigera ${campaign.title}`}
            title="Redigera"
            onClick={onEdit}
          />
          <AdminButton
            preset="delete"
            size="sm"
            type="button"
            aria-label={`Ta bort ${campaign.title}`}
            title="Ta bort"
            onClick={onDelete}
          />
        </>
      }
    />
  );
}