/* KNAPPGUIDE MED FÄRDIGA KODSNUTTAR FINNS I templates/AdminButtons.txt OCH förhandsvisas på AdminSettingsPage tills vi ska fixa den sidan*/

import type { ReactNode, ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFloppyDisk,
  faTrash,
  faPenToSquare,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import "./AdminButton.css";

type CommonProps = {
  variant?:
    | "primary"
    | "ghost"
    | "danger"
    | "cancel"
    | "icon-delete"
    | "icon-edit"
    | "icon-save"
    | "icon-toggle"
    | "icon-header";
  size?: "md" | "sm";
  preset?: "save" | "delete" | "edit" | "icon-save" | "toggle";
  className?: string;
  children?: ReactNode;
};

type ButtonProps = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    to?: never;
  };

type LinkProps = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
    to: string;
  };

type Props = ButtonProps | LinkProps;

export default function AdminButton({
  variant = "primary",
  size = "md",
  preset,
  className,
  children,
  ...props
}: Props) {
  let content = children;

  if (preset === "save") {
    content = (
      <>
        <FontAwesomeIcon icon={faFloppyDisk} />
        <span>Spara</span>
      </>
    );
    variant = "primary";
  }

  if (preset === "icon-save") {
    content = <FontAwesomeIcon icon={faFloppyDisk} />;
    variant = "icon-save";
  }

    if (preset === "toggle") {
    content = <FontAwesomeIcon icon={faChevronDown} />;
    variant = "icon-toggle";
  }

  if (preset === "delete") {
    content = <FontAwesomeIcon icon={faTrash} />;
    variant = "icon-delete";
  }

  if (preset === "edit") {
    content = <FontAwesomeIcon icon={faPenToSquare} />;
    variant = "icon-edit";
  }
  
  const classes = [
    "fpAdminBtn",
    `fpAdminBtn--${variant}`,
    `fpAdminBtn--${size}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if ("to" in props && props.to) {
    const { to, ...linkProps } = props;
    return (
      <Link to={to} className={classes} {...linkProps}>
        {content}
      </Link>
    );
  }

  const buttonProps = props as ButtonProps;

  return (
    <button
      type={buttonProps.type ?? "button"}
      className={classes}
      {...buttonProps}
    >
      {content}
    </button>
  );
}