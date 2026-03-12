import type { ReactNode } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faArrowsRotate,
  faPowerOff,
  faReceipt,
  faBullhorn,
  faUser,
  faHouse,
} from "@fortawesome/free-solid-svg-icons";

import AdminContainer from "./AdminContainer";
import AdminButton from "../shared/AdminButton";
import {
  AdminQuickActionsProvider,
  useAdminQuickActions,
} from "../shared/AdminQuickActionsContext";
import "./AdminPage.css";

type Props = {
  children: ReactNode;
  title?: string;
  noCard?: boolean;
};

function AdminPageContent({
  children,
  title,
  noCard,
}: {
  children: ReactNode;
  title?: string;
  noCard: boolean;
}) {
  const {
    openCreateProductModal,
    canCreateProduct,
    openCreateCampaignModal,
    canCreateCampaign,
  } = useAdminQuickActions();

  return (
    <section className="fpAdminPage">
      {title ? (
        <div className="fpAdminHeader">
          <h1 className="fpAdminTitle">{title}</h1>

          <div className="fpAdminActionsBlock">
            <span className="fpAdminActionsTitle">Snabbåtgärder</span>

            <div className="fpAdminActions">
              <AdminButton
                variant="icon-header"
                type="button"
                onClick={openCreateProductModal}
                disabled={!canCreateProduct}
                title={
                  canCreateProduct
                    ? "Lägg till produkt"
                    : "Lägg först till minst en kategori"
                }
                aria-label="Lägg till produkt"
              >
                <FontAwesomeIcon icon={faPlus} />
              </AdminButton>

              <AdminButton
                variant="icon-header"
                to="/"
                title="Till hemsidan"
                aria-label="Till hemsidan"
              >
                <FontAwesomeIcon icon={faHouse} />
              </AdminButton>

              <AdminButton
                variant="icon-header"
                type="button"
                title="Uppdatera beställningar"
                aria-label="Uppdatera beställningar"
              >
                <FontAwesomeIcon icon={faArrowsRotate} />
              </AdminButton>

              <AdminButton
                variant="icon-header"
                type="button"
                title="Stäng restaurang"
                aria-label="Stäng restaurang"
              >
                <FontAwesomeIcon icon={faPowerOff} />
              </AdminButton>

              <AdminButton
                variant="icon-header"
                to="/admin/orders"
                title="Till beställningar"
                aria-label="Till beställningar"
              >
                <FontAwesomeIcon icon={faReceipt} />
              </AdminButton>

              <AdminButton
                variant="icon-header"
                type="button"
                onClick={openCreateCampaignModal}
                disabled={!canCreateCampaign}
                title="Ny kampanj"
                aria-label="Ny kampanj"
              >
                <FontAwesomeIcon icon={faBullhorn} />
              </AdminButton>

              <AdminButton
                variant="icon-header"
                to="/admin/profile"
                title="Profil"
                aria-label="Profil"
              >
                <FontAwesomeIcon icon={faUser} />
              </AdminButton>
            </div>
          </div>
        </div>
      ) : null}

      <AdminContainer>
        {noCard ? children : <div className="fpAdminCard">{children}</div>}
      </AdminContainer>
    </section>
  );
}

export default function AdminPage({
  children,
  title,
  noCard = false,
}: Props) {
  return (
    <AdminQuickActionsProvider>
      <AdminPageContent title={title} noCard={noCard}>
        {children}
      </AdminPageContent>
    </AdminQuickActionsProvider>
  );
}