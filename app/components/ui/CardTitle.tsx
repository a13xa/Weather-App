import type { ReactNode } from "react";

interface CardTitleProps {
  children: ReactNode;
}

export function CardTitle({ children }: CardTitleProps) {
  return (
    <h2 className="text-lg font-semibold text-gray-900 mb-4">
      {children}
    </h2>
  );
}
