import type { ReactNode } from "react";
import AdminContainer from "./AdminContainer";
import AdminButton from "./AdminButton";
import "./AdminPage.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faArrowsRotate,
  faPowerOff,
  faReceipt,
  faBullhorn,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

type Props = {
  children: ReactNode;
  title?: string;
  noCard?: boolean;
};

export default function AdminPage({ children, title, noCard = false }: Props) {
  return (
    <section className="fpAdminPage">
      {title ? (
        <div className="fpAdminHeader">
          <h1 className="fpAdminTitle">{title}</h1>

          <div className="fpAdminActionsBlock">
            <span className="fpAdminActionsTitle">Snabbåtgärder</span>

            <div className="fpAdminActions">
              <AdminButton variant="icon-header" to="/admin/products/new" title="Ny produkt">
                <FontAwesomeIcon icon={faPlus} />
              </AdminButton>

              <AdminButton variant="icon-header" title="Uppdatera beställningar">
                <FontAwesomeIcon icon={faArrowsRotate} />
              </AdminButton>

              <AdminButton variant="icon-header" title="Stäng restaurang">
                <FontAwesomeIcon icon={faPowerOff} />
              </AdminButton>

              <AdminButton variant="icon-header" to="/admin/orders" title="Till beställningar">
                <FontAwesomeIcon icon={faReceipt} />
              </AdminButton>

              <AdminButton variant="icon-header" title="Ny kampanj">
                <FontAwesomeIcon icon={faBullhorn} />
              </AdminButton>

              <AdminButton variant="icon-header" to="/admin/profile" title="Profil">
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