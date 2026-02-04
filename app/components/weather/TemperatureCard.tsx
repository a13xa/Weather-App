import type { WeatherData } from "../../lib/types";
import { Card } from "../ui/Card";

interface TemperatureCardProps {
  weather: WeatherData;
  tempUnit: string;
}

export function TemperatureCard({ weather, tempUnit }: TemperatureCardProps) {
  return (
    <Card padding="lg">
      <p className="text-6xl font-medium text-gray-900 mb-2">
        {Math.round(weather.main.temp)}{tempUnit}
      </p>
      <p className="text-lg text-gray-600">
        Feels like {Math.round(weather.main.feels_like)}{tempUnit}
      </p>
    </Card>
  );
}
