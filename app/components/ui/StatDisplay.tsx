import type { ReactNode } from "react";

interface StatDisplayProps {
  label: string;
  value: ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
}

export function StatDisplay({ label, value, size = "lg" }: StatDisplayProps) {
  const sizeClasses = {
    sm: "text-sm",
    md: "text-xl",
    lg: "text-2xl",
    xl: "text-3xl",
  };

  return (
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className={`${sizeClasses[size]} font-medium text-gray-900`}>
        {value}
      </p>
    </div>
  );
}
