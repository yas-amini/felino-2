import { useState } from "react";
import { Outlet } from "react-router-dom";
import "./AdminLayout.css";
import AdminSidebar from "../components/admin/layout/AdminSidebar";
import AdminNoticeRail from "../components/admin/shared/AdminNoticeRail";
import AdminPageHeader from "../components/admin/layout/AdminPageHeader";
import { AdminQuickActionsProvider } from "../components/admin/shared/AdminQuickActionsContext";

export type TopbarState = {
  title?: string;
  rightImageSrc?: string;
  rightImageAlt?: string;
};

export type AdminLayoutContext = {
  setTopbar: (next: TopbarState) => void;
};

export default function AdminLayout() {
  const [topbar, setTopbar] = useState<TopbarState>({});

  return (
    <AdminQuickActionsProvider>
      <div className="admin">
        <AdminSidebar />

        <div className="admin-topbar-shell">
          <AdminNoticeRail />
          <AdminPageHeader title={topbar.title} />
        </div>

        <main className="admin-page">
          <Outlet context={{ setTopbar }} />
        </main>

        <footer className="admin-footer" />
      </div>
    </AdminQuickActionsProvider>
  );
}