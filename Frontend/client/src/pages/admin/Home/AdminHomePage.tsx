import AdminPage from "../../../components/admin/layout/AdminPage";
import AdminSectionHead from "../../../components/admin/shared/AdminSectionHead";
import AdminHomeOverviewSummary from "../../../components/admin/home/AdminHomeOverviewSummary";
import AdminHomeToday from "../../../components/admin/home/AdminHomeToday";
import AdminHomeTodoList from "../../../components/admin/home/AdminHomeTodoList";
import "./AdminHomePage.css";

export default function AdminHomePage() {
  return (
    <AdminPage title="Översikt">
      <section className="admin-home-page">
        <AdminSectionHead
          level={1}
          title="Översikt"
          description="En enkel startsida för restaurangens adminpanel."
        />

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