import type { ButtonHTMLAttributes } from "react";
import "./AdminButton.css";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost" | "danger";
  size?: "md" | "sm";
};

export default function AdminButton({
  variant = "primary",
  size = "md",
  className,
  ...props
}: Props) {
  const classes = [
    "fpAdminBtn",
    `fpAdminBtn--${variant}`,
    `fpAdminBtn--${size}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return <button className={classes} {...props} />;
}