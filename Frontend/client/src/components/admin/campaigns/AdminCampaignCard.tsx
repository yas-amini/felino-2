import AdminButton from "../shared/AdminButton";
import AdminEntityCard from "../shared/AdminEntityCard";

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

type Props = {
  campaign: Campaign;
  onEdit: () => void;
  onDelete: () => void;
};

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
        </>
      }
      bodyTop={
        <div>
          <h3 className="campaign-card__title">{campaign.title}</h3>
          <p className="campaign-card__dates">
            {campaign.startDate} – {campaign.endDate}
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