import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  padding?: "sm" | "md" | "lg";
  marginBottom?: boolean;
}

export function Card({ children, className = "", padding = "md", marginBottom = true }: CardProps) {
  const paddingClasses = {
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
  };

  return (
    <div
      className={`bg-white border border-gray-200 rounded ${paddingClasses[padding]} ${
        marginBottom ? "mb-6" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}
