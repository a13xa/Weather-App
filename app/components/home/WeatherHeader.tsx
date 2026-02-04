import { UnitToggle } from "../UnitToggle";
import { LoadingSpinner } from "../ui/LoadingSpinner";

interface WeatherHeaderProps {
  cityCount: number;
  isRevalidating: boolean;
}

export function WeatherHeader({ cityCount, isRevalidating }: WeatherHeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-20">
      <div className="px-6 py-4 relative">
        <div className="mb-2">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold text-gray-900">
              Weather Dashboard
            </h1>
            {isRevalidating && (
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <LoadingSpinner size="sm" />
                <span className="text-xs">Updating...</span>
              </div>
            )}
          </div>
        </div>
        <p className="text-sm text-gray-600">
          Current weather in {cityCount} cities worldwide
        </p>
        <div className="absolute right-6 top-1/2 -translate-y-1/2">
          <UnitToggle />
        </div>
      </div>
    </header>
  );
}
