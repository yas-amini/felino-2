import AdminPage from "../../../components/admin/layout/AdminPage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faClock } from "@fortawesome/free-solid-svg-icons";
import Button from "../../../components/common/Button/Button";
import "./AdminProfilePage.css";

export default function AdminProfilePage() {
  return (
    <AdminPage title="Användarsida">
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
      <p>Här ska vi la ha nå konto-halloj</p>
    </AdminPage >
  );
}