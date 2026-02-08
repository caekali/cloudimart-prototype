import { ReactNode } from "react";

interface ButtonProps {
    className?:string,
  children: ReactNode;
  variant?: "primary" | "secondary";
  size?: "small" | "medium" | "large";
  onClick?: () => void;
}

export default function Button({
  className,
  children,
  variant = "primary",
  size = "small",
  onClick,
}: ButtonProps) {
  const baseStyles =
    "px-4 py-2 rounded font-semibold transition duration-200 ease-in-out";

  const variantStyles = {
    primary: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-md",
    secondary:
      "bg-gray-200 text-gray-800 hover:bg-gray-300 border border-gray-300",
  };

  const sizeStyles = {
    small: "text-sm px-3 py-1.5",
    medium: "text-base px-4 py-2",
    large: "text-lg px-6 py-3",
  };

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      {children}
    </button>
  );
}
