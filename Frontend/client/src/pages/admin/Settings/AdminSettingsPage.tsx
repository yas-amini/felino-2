import { useState, useEffect } from "react";
import AdminPage from "../../../components/admin/layout/AdminPage";
import AdminButton from "../../../components/admin/shared/AdminButton";
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
  const [welcomeText, setWelcomeText] = useState("");
  const [showSavedHours, setShowSavedHours] = useState(false);
  const [showSavedWelcome, setShowSavedWelcome] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.hours) setHours(parsed.hours);
        if (parsed.welcomeText) setWelcomeText(parsed.welcomeText);
      } catch (e) {
        console.error("Kunde inte ladda inställningar", e);
      }
    }
  }, []);

  const saveToStorage = (updatedHours: HoursSettings, updatedText: string) => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ hours: updatedHours, welcomeText: updatedText })
    );
  };

  const handleHourChange = (day: string, field: keyof DayHours, value: any) => {
    setHours((prev) => ({
      ...prev,
      [day]: { ...prev[day], [field]: value },
    }));
  };

  const saveHours = () => {
    saveToStorage(hours, welcomeText);
    setShowSavedHours(true);
    setTimeout(() => setShowSavedHours(false), 3000);
  };

  const saveWelcomeText = () => {
    saveToStorage(hours, welcomeText);
    setShowSavedWelcome(true);
    setTimeout(() => setShowSavedWelcome(false), 3000);
  };

  return (
    <AdminPage title="Inställningar">
      <div className="admin-settings">
        {/* Öppettider Section */}
        <section className="admin-section">
          <h2>Öppettider</h2>
          <p className="muted">Ställ in när restaurangen är öppen för beställningar.</p>

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
                  <tr key={key} className={dayData.closed ? "settings-hours-closed" : ""}>
                    <td><strong>{label}</strong></td>
                    <td>
                      <input
                        type="time"
                        value={dayData.open}
                        disabled={dayData.closed}
                        onChange={(e) => handleHourChange(key, "open", e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="time"
                        value={dayData.close}
                        disabled={dayData.closed}
                        onChange={(e) => handleHourChange(key, "close", e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        checked={dayData.closed}
                        onChange={(e) => handleHourChange(key, "closed", e.target.checked)}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div className="settings-save-row">
            <AdminButton preset="save" onClick={saveHours} />
            {showSavedHours && <span className="settings-saved-msg">Inställningar sparade!</span>}
          </div>
        </section>

        {/* Welcome Text Section */}
        <section className="admin-section">
          <h2>Välkommen-text</h2>
          <p className="muted">Denna text visas på startsidan bredvid öppettiderna.</p>

          <textarea
            className="settings-welcome-textarea"
            placeholder="Skriv din välkomsttext här..."
            value={welcomeText}
            onChange={(e) => setWelcomeText(e.target.value)}
          />

          <div className="settings-save-row">
            <AdminButton preset="save" onClick={saveWelcomeText} />
            {showSavedWelcome && <span className="settings-saved-msg">Text sparad!</span>}
          </div>
        </section>
      </div>
    </AdminPage>
  );
}