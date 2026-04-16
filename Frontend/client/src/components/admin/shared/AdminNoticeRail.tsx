import { useEffect, useMemo, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminNoticeRail.css";
import { fetchWithAuth } from "../../../api/fetchWithAuth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

type AdminNotice = {
  id: number;
  type: "order" | "booking" | "campaign" | "system";
  text: string;
  to: string;
};

const MAX_VISIBLE_NOTICES = 6;
const POLL_INTERVAL_MS = 5000;

export default function AdminNoticeRail() {
  const navigate = useNavigate();
  const [notices, setNotices] = useState<AdminNotice[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const fetchNotices = useCallback(async (isInitialLoad = false) => {
    try {
      if (isInitialLoad) {
        setLoading(true);
      }

      const response = await fetchWithAuth("/api/admin/dashboard/notices", {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Kunde inte hämta notiser.");
      }

      const data: AdminNotice[] = await response.json();
      setNotices(data);
      setError("");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Något gick fel.");
      }
    } finally {
      if (isInitialLoad) {
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    fetchNotices(true);

    const intervalId = window.setInterval(() => {
      fetchNotices(false);
    }, POLL_INTERVAL_MS);

    const handleWindowFocus = () => {
      fetchNotices(false);
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        fetchNotices(false);
      }
    };

    const handleManualRefresh = () => {
      fetchNotices(false);
    };

    window.addEventListener("focus", handleWindowFocus);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("admin-notices-refresh", handleManualRefresh);

    return () => {
      window.clearInterval(intervalId);
      window.removeEventListener("focus", handleWindowFocus);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("admin-notices-refresh", handleManualRefresh);
    };
  }, [fetchNotices]);

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
            title={notice.text} 
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