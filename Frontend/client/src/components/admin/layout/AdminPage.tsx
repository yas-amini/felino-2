import { type ReactNode } from "react";
import AdminContainer from "./AdminContainer";
import "./AdminPage.css";

type Props = {
  children: ReactNode;
  noCard?: boolean;
};

export default function AdminPage({
  children,
  noCard = false,
}: Props) {
  return (
    <section className="fpAdminPage">
      <AdminContainer>
        {noCard ? children : <div className="fpAdminCard">{children}</div>}
      </AdminContainer>
    </section>
  );
}