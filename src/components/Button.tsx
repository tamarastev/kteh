import type { ButtonHTMLAttributes, ReactNode } from "react";
import "./Button.scss";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "outline" | "danger" | "ghost";
  fullWidth?: boolean;
}

export default function Button({
  children,
  variant = "primary",
  fullWidth = false,
  className = "",
  ...rest
}: ButtonProps) {
  const classes = [
    "hs-button",
    `hs-button--${variant}`,
    fullWidth ? "hs-button--full" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
