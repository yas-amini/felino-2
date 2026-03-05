import type { ReactNode } from "react";
import "./Container.css";

type ContainerProps = {
  children: ReactNode;
};

export default function Container({ children }: ContainerProps) {
  return <div className="fpContainer">{children}</div>;
}