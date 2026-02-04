import type { ReactNode } from "react";

interface StatsGridProps {
  children: ReactNode;
  columns?: 2 | 3;
}

export function StatsGrid({ children, columns = 2 }: StatsGridProps) {
  const gridClass = columns === 3 ? "md:grid-cols-3" : "md:grid-cols-2";

  return (
    <div className={`grid grid-cols-2 ${gridClass} gap-4`}>
      {children}
    </div>
  );
}
