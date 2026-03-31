import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import AdminPage from "../../../components/admin/layout/AdminPage";
import AdminButton from "../../../components/admin/shared/AdminButton";
import { useAdminTopbar } from "../../../components/admin/useAdminTopbar";
import { getToken, removeToken } from "../../../utils/authStorage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsers,
  faClock,
  faKey,
  faCalendar,
  faUserEdit,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import "./AdminProfilePage.css";

type Authorization = {
  id: number;
  name: string;
};

type JwtPayload = {
  sub?: string;
  exp?: number;
  [key: string]: unknown;
};

function parseJwt(token: string): JwtPayload | null {
  try {
    const payloadBase64 = token.split(".")[1];
    const normalized = payloadBase64.replace(/-/g, "+").replace(/_/g, "/");
    const decoded = atob(normalized);
    return JSON.parse(decoded) as JwtPayload;
  } catch {
    return null;
  }
}

function getFirstStringClaim(
  payload: JwtPayload | null,
  claimKeys: string[],
  fallback: string
): string {
  if (!payload) return fallback;

  for (const key of claimKeys) {
    const value = payload[key];
    if (typeof value === "string" && value.trim().length > 0) {
      return value;
    }
  }

  return fallback;
}

function formatUnixDateTime(unixSeconds?: number): string {
  if (!unixSeconds) return "Okänd";

  const date = new Date(unixSeconds * 1000);

  return date.toLocaleString("sv-SE", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function AdminProfilePage() {
  useAdminTopbar("Användarsida");

  const navigate = useNavigate();
  const token = getToken();

  const payload = useMemo(() => {
    if (!token) return null;
    return parseJwt(token);
  }, [token]);

  const username = getFirstStringClaim(
    payload,
    [
      "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name",
      "unique_name",
      "name",
      "sub",
    ],
    "Okänd användare"
  );

  const role = getFirstStringClaim(
    payload,
    [
      "http://schemas.microsoft.com/ws/2008/06/identity/claims/role",
      "role",
    ],
    "Ingen roll"
  );

  const userId = getFirstStringClaim(
    payload,
    [
      "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier",
      "nameid",
    ],
    "Okänt id"
  );

  const expiresAt =
    typeof payload?.exp === "number"
      ? formatUnixDateTime(payload.exp)
      : "Okänd";

  const authorizations: Authorization[] = [
    {
      id: 1,
      name: `Roll: ${role}`,
    },
    {
      id: 2,
      name: "Schemahantering",
    },
    {
      id: 3,
      name: "Användarhantering",
    },
  ];

  const days = [
    {
      name: "Måndag",
      date: "10 mars",
      slots: ["09:00-12:00 (Bokad)", "13:00-16:00"],
      booked: [true, false],
    },
    {
      name: "Tisdag",
      date: "11 mars",
      slots: ["09:00-12:00 (Bokad)", "13:00-16:00 (Bokad)"],
      booked: [true, true],
    },
    {
      name: "Onsdag",
      date: "12 mars",
      slots: ["09:00-12:00", "13:00-16:00"],
      booked: [false, false],
    },
    {
      name: "Torsdag",
      date: "13 mars",
      slots: ["09:00-12:00", "13:00-16:00 (Bokad)"],
      booked: [false, true],
    },
    {
      name: "Fredag",
      date: "14 mars",
      slots: ["09:00-12:00 (Bokad)", "13:00-16:00"],
      booked: [true, false],
    },
  ];

  function handleLogout() {
    removeToken();
    navigate("/");
  }

  return (
    <AdminPage>
      <div className="userpage-layout">
        <div className="userpage-container">
          <section className="user-info-section">
            <div className="profile-user-container">
              <div className="profile-user">
                <FontAwesomeIcon icon={faUsers} />
                <div>
                  <h3 className="profile-name">{username}</h3>

                  <button
                    type="button"
                    className="fpAdminBtn fpAdminBtn--ghost fpAdminBtn--sm"
                  >
                    {role}
                  </button>

                  <div className="profile-info">
                    <p>Användarnamn: {username}</p>
                    <p>Användar-ID: {userId}</p>
                    <p>E-post: Ej tillgänglig ännu</p>
                    <p>Telefon: Ej tillgänglig ännu</p>
                  </div>
                </div>

                <div className="edit-profile">
                  <AdminButton type="button">
                    Redigera profil
                  </AdminButton>

                  <AdminButton type="button">
                    Byt email
                  </AdminButton>

                  <AdminButton variant="danger" type="button" onClick={handleLogout}>
                    Logga ut
                  </AdminButton>
                </div>
              </div>

              <div className="profile-login-info">
                <FontAwesomeIcon icon={faClock} />
                <p>Token giltig till: {expiresAt}</p>
              </div>
            </div>
          </section>

          <section className="user-security-section">
            <div className="security-header">
              <FontAwesomeIcon icon={faKey} />
              <h3>Säkerhet</h3>
            </div>

            <div className="change-password">
              <div>
                <p>Byt lösenord</p>
                <p className="metatext">
                  Funktion för lösenordsbyte byggs senare
                </p>
              </div>
              <AdminButton type="button">Ändra</AdminButton>
            </div>
          </section>

          <section className="user-authorization-section">
            <h3>Roll och Behörigheter</h3>
            <ul>
              {authorizations.map((authorization) => (
                <li key={authorization.id}>{authorization.name}</li>
              ))}
            </ul>
          </section>

          <section className="user-workcalendar-section">
            <div className="workcalendar-heading">
              <FontAwesomeIcon icon={faCalendar} />
              <h3>Passbokningar</h3>
            </div>

            <div className="workcalendar-toolbar">
              <button
                type="button"
                className="fpAdminBtn fpAdminBtn--ghost fpAdminBtn--md"
              >
                Föregående vecka
              </button>

              <span>Vecka 11, 2026</span>

              <button
                type="button"
                className="fpAdminBtn fpAdminBtn--ghost fpAdminBtn--md"
              >
                Nästa vecka
              </button>
            </div>

            <div className="workcalendar-list">
              {days.map((day) => (
                <div className="workcalendar-day" key={day.name}>
                  <div className="workcalendar-day-header">
                    <strong>{day.name}</strong>
                    <span>{day.date}</span>
                  </div>

                  <div className="workcalendar-slots">
                    {day.slots.map((slot, index) => (
                      <div
                        key={index}
                        className={`workcalendar-slot ${day.booked[index] ? "booked" : ""}`}
                      >
                        {slot}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <aside>
          <div className="user-create-edit">
            <FontAwesomeIcon icon={faUserPlus} />
            <p>Skapa användare</p>
          </div>
          <div className="user-create-edit">
            <FontAwesomeIcon icon={faUserEdit} />
            <p>Ändra användarrättigheter</p>
          </div>
        </aside>
      </div>
    </AdminPage>
  );
}