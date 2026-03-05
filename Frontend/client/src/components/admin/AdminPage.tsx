import type { ReactNode } from "react";
import AdminContainer from "./AdminContainer";
import "./AdminPage.css";

type Props = {
  children: ReactNode;
  title?: string;
};

export default function AdminPage({ children, title }: Props) {
  return (
    <section className="fpAdminPage">
      {title ? <h1 className="fpAdminTitle">{title}</h1> : null}
      <AdminContainer>

        <div className="fpAdminCard">{children}</div>
      </AdminContainer>
    </section>
  );
}