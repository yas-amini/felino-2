import AdminPage from "../../../components/admin/layout/AdminPage";
import { useAdminTopbar } from "../../../components/admin/useAdminTopbar";
import AdminSectionHead from "../../../components/admin/shared/AdminSectionHead";
import AdminHomeOverviewSummary from "../../../components/admin/home/AdminHomeOverviewSummary";
import AdminHomeToday from "../../../components/admin/home/AdminHomeToday";
import AdminHomeTodoList from "../../../components/admin/home/AdminHomeTodoList";
import "./AdminHomePage.css";

export default function AdminHomePage() {
  useAdminTopbar("Översikt");

  return (
    <AdminPage>
      <section className="admin-home-page">
        <div className="admin-home-layout">
          <div className="admin-home-box admin-home-box--main">
            <section className="admin-home-section">
              <AdminSectionHead level={2} title="Senaste händelser" />

              <div className="admin-home-section-content">
                <AdminHomeToday />
              </div>
            </section>

            <section className="admin-home-section">
              <AdminSectionHead level={3} title="Statistik" />

              <div className="admin-home-section-content">
                <AdminHomeOverviewSummary />
              </div>
            </section>
          </div>

          <aside className="admin-home-box admin-home-box--side">
            <section className="admin-home-section">
              <AdminSectionHead level={2} title="Att göra" />

              <div className="admin-home-section-content">
                <AdminHomeTodoList />
              </div>
            </section>
          </aside>
        </div>
      </section>
    </AdminPage>
  );
}