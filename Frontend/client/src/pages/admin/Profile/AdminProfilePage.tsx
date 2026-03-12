import AdminPage from "../../../components/admin/layout/AdminPage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faClock, faKey } from "@fortawesome/free-solid-svg-icons";
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
      </div>
    </AdminPage >
  );
}