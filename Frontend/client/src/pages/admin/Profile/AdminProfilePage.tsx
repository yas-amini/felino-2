import AdminPage from "../../../components/admin/layout/AdminPage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faClock, faKey, faCalendar } from "@fortawesome/free-solid-svg-icons";
import Button from "../../../components/common/Button/Button";
import "./AdminProfilePage.css";

type Authorization = {
  id: number
  name: string
}

export default function AdminProfilePage() {

  const authorizations: Authorization[] = [
    {
      id: 1,
      name: "Roll: Admin"
    },
    {
      id: 2,
      name: "Schemahantering"
    },
    {
      id: 3,
      name: "Användarhantering"
    }
  ]

  const days = [
    { name: "Måndag", date: "10 mars", slots: ["09:00-12:00 (Bokad)", "13:00-16:00"], booked: [true, false] },
    { name: "Tisdag", date: "11 mars", slots: ["09:00-12:00 (Bokad)", "13:00-16:00 (Bokad)"], booked: [true, true] },
    { name: "Onsdag", date: "12 mars", slots: ["09:00-12:00", "13:00-16:00"], booked: [false, false] },
    { name: "Torsdag", date: "13 mars", slots: ["09:00-12:00", "13:00-16:00 (Bokad)"], booked: [false, true] },
    { name: "Fredag", date: "14 mars", slots: ["09:00-12:00 (Bokad)", "13:00-16:00"], booked: [true, false] },
  ];

  return (
    <AdminPage title="Användarsida">
      <div className="userpage-container">


        <section className="user-info-section">
          <h2>Profil</h2>
          <div className="profile-user-container">
            <div className="profile-user">
              <FontAwesomeIcon icon={faUsers} />
              <div>
                <h3 className="profile-name">Förnamn Efternamn</h3>
                <Button type="button" variant="ghost">Admin</Button>
                <div className="profile-info">
                  <p>admin-user</p>
                  <p>example@test.se</p>
                  <p>0705858877</p>
                  <p>Skapad 10 jan 2025</p>
                </div>
              </div>
              <div className="edit-profile">
                <Button type="button" variant="secondary">Redigera profil</Button>
                <Button type="button" variant="secondary">Byt email</Button>
              </div>
            </div>
            <div className="profile-login-info">
              <FontAwesomeIcon icon={faClock} />
              <p>Senaste inloggning: 24 februari 2024, 11:54</p>
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
              <p className="metatext">Senast ändrad 24 februari 2024</p>
            </div>
            <Button type="button" variant="secondary">Ändra</Button>
          </div>
        </section>
        <section className="user-authorization-section">
          <h3>Roll och Behörigheter</h3>
          <ul>
            {authorizations.map(authorization =>
              <li key={authorization.id}>
                {authorization.name}
              </li>
            )}
          </ul>
        </section>
        <section className="user-workcalendar-section">
          <div className="workcalendar-heading">
            <FontAwesomeIcon icon={faCalendar} />
            <h3>Passbokningar</h3>
          </div>
          <div className="workcalendar-toolbar">
            <button>Föregående vecka</button>
            <span>Vecka 11, 2026</span>
            <button>Nästa vecka</button>
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
    </AdminPage >
  );
}