/**
 * =========================================================
 * HUR DU ANVÄNDER BUTTON
 * =========================================================
 *
 * Lägg till högst upp i filen: import { Button } from "@/components";
 * Skriv in detta där knappar ska vara..
 * EXEMPEL:
 * 
 * <Button>Klicka här</Button>
 *
 * SUBMIT:
 * <Button type="submit">Spara</Button>
 *
 * LÄNK:
 * <Button to="/varukorg">Till varukorg</Button>
 * =========================================================
 */

import React from "react";
import { Link } from "react-router-dom";
import "./Button.css";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";
type ButtonWidth = "auto" | "full";

type CommonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  width?: ButtonWidth;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
};

type ButtonAsButton = CommonProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    to?: never;
  };

type ButtonAsLink = CommonProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
    to: string;
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

function cx(...parts: Array<string | undefined | false>) {
  return parts.filter(Boolean).join(" ");
}

export default function Button(props: ButtonProps) {
  const {
    variant = "primary",
    size = "md",
    width = "auto",
    isLoading = false,
    leftIcon,
    rightIcon,
    className,
    children,
    ...rest
  } = props as ButtonProps;

  const classes = cx(
    "fpBtn",
    `fpBtn--${variant}`,
    `fpBtn--${size}`,
    width === "full" && "fpBtn--full",
    isLoading && "is-loading",
    className
  );

  const content = (
    <>
      {leftIcon ? <span className="fpBtn__icon">{leftIcon}</span> : null}
      <span className="fpBtn__label">{children}</span>
      {rightIcon ? <span className="fpBtn__icon">{rightIcon}</span> : null}
      {isLoading ? <span className="fpBtn__spinner" aria-hidden="true" /> : null}
    </>
  );

  // Link-variant (react-router)
  if ("to" in props && props.to) {
    const { to, onClick, ...linkRest } = rest as ButtonAsLink;
    return (
      <Link
        to={to}
        className={classes}
        onClick={(e) => {
          if (isLoading) {
            e.preventDefault();
            return;
          }
          onClick?.(e);
        }}
        aria-disabled={isLoading ? true : undefined}
        {...linkRest}
      >
        {content}
      </Link>
    );
  }

  // Native button (submit/click)
  const btnRest = rest as ButtonAsButton;
  return (
    <button
      className={classes}
      disabled={btnRest.disabled || isLoading}
      {...btnRest}
    >
      {content}
    </button>
  );
}