import type { ReactNode } from "react";
import "./AdminSectionHead.css";

type Props = {
  title: string;
  description?: string;
  actions?: ReactNode;
  className?: string;
  level?: 1 | 2 | 3;
};

export default function AdminSectionHead({
  title,
  description,
  actions,
  className = "",
  level = 2,
}: Props) {
  const TitleTag =
    level === 1 ? "h2" : level === 2 ? "h3" : "h3";

  return (
    <section
      className={`adminSectionHead adminSectionHead--level${level} ${className}`.trim()}
    >
      <div className="adminSectionHead__main">
        <TitleTag className="adminSectionHead__title">{title}</TitleTag>

        {description && (
          <p className="adminSectionHead__description">{description}</p>
        )}
      </div>

      {actions && (
        <div className="adminSectionHead__actions">{actions}</div>
      )}
    </section>
  );
}