import type { ReactNode } from "react";
import Container from "./Container";
import "./Page.css";

type PageProps = {
  children: ReactNode;
};

export default function Page({ children }: PageProps) {
  return (
    <section className="fpPage">
      <Container>{children}</Container>
    </section>
  );
}