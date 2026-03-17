import { useState, useEffect } from "react";
import AdminPage from "../../../components/admin/layout/AdminPage";
import AdminButton from "../../../components/admin/shared/AdminButton";
import AdminSectionHead from "../../../components/admin/shared/AdminSectionHead";
import "./AdminSettingsPage.css";

type DayHours = {
  open: string;
  close: string;
  closed: boolean;
};

type HoursSettings = Record<string, DayHours>;

const DAYS_MAP: Record<string, string> = {
  mon: "Måndag",
  tue: "Tisdag",
  wed: "Onsdag",
  thu: "Torsdag",
  fri: "Fredag",
  sat: "Lördag",
  sun: "Söndag",
};

const DEFAULT_HOURS: HoursSettings = {
  mon: { open: "10:00", close: "21:00", closed: false },
  tue: { open: "10:00", close: "21:00", closed: false },
  wed: { open: "10:00", close: "21:00", closed: false },
  thu: { open: "10:00", close: "21:00", closed: false },
  fri: { open: "10:00", close: "23:00", closed: false },
  sat: { open: "11:00", close: "23:00", closed: false },
  sun: { open: "11:00", close: "21:00", closed: false },
};

const STORAGE_KEY = "admin_settings";

export default function AdminSettingsPage() {
  const [hours, setHours] = useState<HoursSettings>(DEFAULT_HOURS);
  const [welcomeTitle, setWelcomeTitle] = useState("");
  const [welcomeText, setWelcomeText] = useState("");
  const [showSavedHours, setShowSavedHours] = useState(false);
  const [showSavedWelcome, setShowSavedWelcome] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved) {
      try {
        const parsed = JSON.parse(saved);

        if (parsed.hours) setHours(parsed.hours);
        if (parsed.welcomeTitle) setWelcomeTitle(parsed.welcomeTitle);
        if (parsed.welcomeText) setWelcomeText(parsed.welcomeText);
      } catch (e) {
        console.error("Kunde inte ladda inställningar", e);
      }
    }
  }, []);

  const saveToStorage = (
    updatedHours: HoursSettings,
    updatedTitle: string,
    updatedText: string
  ) => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        hours: updatedHours,
        welcomeTitle: updatedTitle,
        welcomeText: updatedText,
      })
    );
  };

  const handleHourChange = (
    day: string,
    field: keyof DayHours,
    value: string | boolean
  ) => {
    setHours((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        [field]: value,
      },
    }));
  };

  const saveHours = () => {
    saveToStorage(hours, welcomeTitle, welcomeText);
    setShowSavedHours(true);
    setTimeout(() => setShowSavedHours(false), 3000);
  };

  const saveWelcomeText = () => {
    saveToStorage(hours, welcomeTitle, welcomeText);
    setShowSavedWelcome(true);
    setTimeout(() => setShowSavedWelcome(false), 3000);
  };

  return (
    <AdminPage title="Inställningar">
      <section className="admin-settings-page">
        <AdminSectionHead
          level={1}
          title="Öppettider & presentationstext"
          description="Hantera öppettider och textinnehåll för startsidan."
        />

        <section className="admin-settings-section">
          <AdminSectionHead
            level={2}
            title="Öppettider"
            description="Ställ in när restaurangen är öppen för beställningar."
          />

          <div className="settings-section-content">
            <div className="settings-hours-desktop">
              <div className="settings-hours-table-wrap">
                <table className="settings-hours-table">
                  <thead>
                    <tr>
                      <th>Dag</th>
                      <th>Öppnar</th>
                      <th>Stänger</th>
                      <th>Stängt</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(DAYS_MAP).map(([key, label]) => {
                      const dayData = hours[key] || DEFAULT_HOURS[key];

                      return (
                        <tr
                          key={key}
                          className={dayData.closed ? "settings-hours-closed" : ""}
                        >
                          <td>
                            <strong>{label}</strong>
                          </td>
                          <td>
                            <input
                              type="time"
                              value={dayData.open}
                              disabled={dayData.closed}
                              onChange={(e) =>
                                handleHourChange(key, "open", e.target.value)
                              }
                            />
                          </td>
                          <td>
                            <input
                              type="time"
                              value={dayData.close}
                              disabled={dayData.closed}
                              onChange={(e) =>
                                handleHourChange(key, "close", e.target.value)
                              }
                            />
                          </td>
                          <td>
                            <input
                              type="checkbox"
                              checked={dayData.closed}
                              onChange={(e) =>
                                handleHourChange(key, "closed", e.target.checked)
                              }
                            />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="settings-hours-mobile">
              <div className="settings-hours-list">
                {Object.entries(DAYS_MAP).map(([key, label]) => {
                  const dayData = hours[key] || DEFAULT_HOURS[key];

                  return (
                    <article
                      key={key}
                      className={`settings-hours-card ${
                        dayData.closed ? "settings-hours-closed" : ""
                      }`}
                    >
                      <h4 className="settings-hours-card-title">{label}</h4>

                      <div className="settings-hours-field">
                        <label htmlFor={`${key}-open`}>Öppnar</label>
                        <input
                          id={`${key}-open`}
                          type="time"
                          value={dayData.open}
                          disabled={dayData.closed}
                          onChange={(e) =>
                            handleHourChange(key, "open", e.target.value)
                          }
                        />
                      </div>

                      <div className="settings-hours-field">
                        <label htmlFor={`${key}-close`}>Stänger</label>
                        <input
                          id={`${key}-close`}
                          type="time"
                          value={dayData.close}
                          disabled={dayData.closed}
                          onChange={(e) =>
                            handleHourChange(key, "close", e.target.value)
                          }
                        />
                      </div>

                      <div className="settings-hours-checkbox-row">
                        <label htmlFor={`${key}-closed`}>Stängt</label>
                        <input
                          id={`${key}-closed`}
                          type="checkbox"
                          checked={dayData.closed}
                          onChange={(e) =>
                            handleHourChange(key, "closed", e.target.checked)
                          }
                        />
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>

            <div className="settings-save-row">
              <AdminButton preset="save" onClick={saveHours} />
              {showSavedHours && (
                <span className="settings-saved-msg">Inställningar sparade!</span>
              )}
            </div>
          </div>
        </section>

        <section className="admin-settings-section">
          <AdminSectionHead
            level={3}
            title="Välkommen-text"
            description="Denna text visas på startsidan bredvid öppettiderna."
          />

          <div className="settings-section-content">
            <div className="settings-welcome-fields">
              <div className="settings-welcome-field">
                <label htmlFor="welcome-title">Rubrik</label>
                <input
                  id="welcome-title"
                  type="text"
                  className="settings-welcome-input"
                  placeholder="Ex: Välkommen till Felino Pizza"
                  value={welcomeTitle}
                  onChange={(e) => setWelcomeTitle(e.target.value)}
                />
              </div>

              <div className="settings-welcome-field">
                <label htmlFor="welcome-text">Brödtext</label>
                <textarea
                  id="welcome-text"
                  className="settings-welcome-textarea"
                  placeholder="Skriv din välkomsttext här..."
                  value={welcomeText}
                  onChange={(e) => setWelcomeText(e.target.value)}
                />
              </div>
            </div>

            <div className="settings-save-row">
              <AdminButton preset="save" onClick={saveWelcomeText} />
              {showSavedWelcome && (
                <span className="settings-saved-msg">Text sparad!</span>
              )}
            </div>
          </div>
        </section>
      </section>
    </AdminPage>
  );
}