import type { ReactNode } from "react";
import "./AdminEntityCard.css";

type Props = {
  media: ReactNode;
  bodyTop?: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
};

export default function AdminEntityCard({
  media,
  bodyTop,
  description,
  actions,
}: Props) {
  return (
    <article className="adminEntityCard">
      <div className="adminEntityCard__media">{media}</div>

      <div className="adminEntityCard__body">
        {bodyTop ? <div className="adminEntityCard__top">{bodyTop}</div> : null}
        {description ? (
          <div className="adminEntityCard__description">{description}</div>
        ) : null}
        {actions ? <div className="adminEntityCard__actions">{actions}</div> : null}
      </div>
    </article>
  );
}