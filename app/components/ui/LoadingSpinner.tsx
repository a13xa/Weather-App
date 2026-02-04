interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  color?: "gray" | "white";
}

export function LoadingSpinner({ size = "md", color = "gray" }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-6 w-6",
  };

  const colorClasses = {
    gray: "border-gray-300 border-t-gray-500",
    white: "border-white border-t-transparent",
  };

  return (
    <div
      className={`animate-spin ${sizeClasses[size]} border-2 ${colorClasses[color]} rounded-full`}
    />
  );
}
