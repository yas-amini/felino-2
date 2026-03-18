import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminNoticeRail.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

type AdminNotice = {
  id: number;
  type: "order" | "booking" | "campaign" | "system";
  text: string;
  to: string;
};

const INITIAL_NOTICES: AdminNotice[] = [
  {
    id: 1,
    type: "order",
    text: "Ny beställning från Elin Andersson",
    to: "/admin/orders",
  },
  {
    id: 2,
    type: "booking",
    text: "Ny bordsbokning för 4 personer kl. 19:30",
    to: "/admin/booking",
  },
  {
    id: 3,
    type: "order",
    text: "Beställning #1042 väntar på bekräftelse",
    to: "/admin/orders",
  },
  {
    id: 4,
    type: "campaign",
    text: "Kampanjen Studentkampanj startar imorgon",
    to: "/admin/campaigns",
  },
  {
    id: 5,
    type: "system",
    text: "Systemet väntar på uppdatering",
    to: "/admin/settings",
  },
  {
    id: 6,
    type: "booking",
    text: "Ny bokning för 2 personer kl. 20:00",
    to: "/admin/booking",
  },
  {
    id: 7,
    type: "booking",
    text: "Ny bokning för 2 personer kl. 20:00",
    to: "/admin/booking",
  },
];

const MAX_VISIBLE_NOTICES = 6;

export default function AdminNoticeRail() {
  const navigate = useNavigate();
  const [notices, setNotices] = useState<AdminNotice[]>(INITIAL_NOTICES);

  function dismissNotice(id: number) {
    setNotices((prev) => prev.filter((notice) => notice.id !== id));
  }

  function clearAllNotices() {
    setNotices([]);
  }

  const overflowCount = Math.max(0, notices.length - MAX_VISIBLE_NOTICES);

  const visibleNotices = useMemo(
    () => notices.slice(0, MAX_VISIBLE_NOTICES),
    [notices]
  );

  return (
    <div id="admin-subbar" className="admin-subbar" aria-label="Undermenyn">
      <div className="admin-notice-rail" aria-label="Nya händelser">
        {overflowCount > 0 && (
          <div className="admin-notice-counter">+{overflowCount}</div>
        )}

        {visibleNotices.map((notice) => (
          <article
            key={notice.id}
            className={`admin-notice-chip admin-notice-chip--${notice.type}`}
            role="button"
            tabIndex={0}
            onClick={() => navigate(notice.to)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                navigate(notice.to);
              }
            }}
          >
            <span
              className={`admin-notice-chip__dot admin-notice-chip__dot--${notice.type}`}
            />
            <span className="admin-notice-chip__text">{notice.text}</span>

            <button
              type="button"
              className="admin-notice-chip__close"
              onClick={(e) => {
                e.stopPropagation();
                dismissNotice(notice.id);
              }}
              aria-label={`Stäng notis: ${notice.text}`}
            >
              ×
            </button>
          </article>
        ))}

        {notices.length > 0 && (
          <button
            className="admin-notice-clear"
            onClick={clearAllNotices}
            title="Rensa alla notiser"
            aria-label="Rensa alla notiser"
          >
            <FontAwesomeIcon icon={faX} />
          </button>
        )}
      </div>
    </div>
  );
}