import type { ReactNode } from "react";
import "./AdminContainer.css";

type Props = {
  children: ReactNode;
  className?: string;
};

export default function AdminContainer({ children, className = "" }: Props) {
  return (
    <div className={["admin-container", className].join(" ")}>
      {children}
    </div>
  );
}