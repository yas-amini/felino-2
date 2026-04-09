import { useEffect, useMemo, useState } from "react";
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

const MAX_VISIBLE_NOTICES = 6;

export default function AdminNoticeRail() {
  const navigate = useNavigate();
  const [notices, setNotices] = useState<AdminNotice[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const response = await fetch("/api/admin/dashboard/notices", {
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Kunde inte hämta notiser.");
        }

        const data: AdminNotice[] = await response.json();
        setNotices(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Något gick fel.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchNotices();
  }, []);

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

  if (loading) {
    return (
      <div id="admin-subbar" className="admin-subbar" aria-label="Undermenyn">
        <div className="admin-notice-rail" aria-label="Nya händelser">
          <span className="admin-notice-chip__text">Laddar notiser...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div id="admin-subbar" className="admin-subbar" aria-label="Undermenyn">
        <div className="admin-notice-rail" aria-label="Nya händelser">
          <span className="admin-notice-chip__text">{error}</span>
        </div>
      </div>
    );
  }

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