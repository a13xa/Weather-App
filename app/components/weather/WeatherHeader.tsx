import { Link } from "react-router";
import { UnitToggle } from "../UnitToggle";
import type { WeatherData } from "../../lib/types";

interface WeatherHeaderProps {
  weather: WeatherData;
}

export function WeatherHeader({ weather }: WeatherHeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-4xl mx-auto px-6 py-6">
        <div className="flex items-center justify-between mb-4">
          <Link
            to="/"
            className="text-sm text-gray-600 hover:text-gray-900 inline-flex items-center"
          >
            ← Back to all cities
          </Link>
          <UnitToggle />
        </div>
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-gray-900">
              {weather.name}
            </h1>
            <p className="text-lg text-gray-600 capitalize mt-1">
              {weather.weather[0].description}
            </p>
          </div>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
            alt={weather.weather[0].description}
            className="w-24 h-24"
          />
        </div>
      </div>
    </header>
  );
}
